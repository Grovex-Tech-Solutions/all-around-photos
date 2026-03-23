import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  sendOrderConfirmationEmail,
  sendOwnerOrderNotificationEmail,
} from '@/lib/email';

const STRIPE_API_VERSION: Stripe.LatestApiVersion = '2026-02-25.clover';

async function handleCompletedCheckout(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<void> {
  const customerEmail =
    session.customer_details?.email || session.customer_email;

  if (!customerEmail) {
    console.warn(
      '[Webhook] Checkout completed without customer email:',
      session.id
    );
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  const order = {
    sessionId: session.id,
    customerEmail,
    customerName: session.customer_details?.name,
    amountTotal: session.amount_total,
    currency: session.currency,
    items: lineItems.data.map(item => ({
      description: item.description || 'Stripe line item',
      quantity: item.quantity || 1,
      amountTotal: item.amount_total,
    })),
  };

  try {
    await Promise.all([
      sendOrderConfirmationEmail(order),
      sendOwnerOrderNotificationEmail(order),
    ]);
  } catch (emailError) {
    console.error('[Webhook] Email notification failed:', emailError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!key || !webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook service not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(key, {
      apiVersion: STRIPE_API_VERSION,
    });

    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 401 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('[Webhook] Checkout session completed:', session.id);
        await handleCompletedCheckout(stripe, session);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('[Webhook] Charge refunded:', charge.id);
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        console.log('[Webhook] Dispute created:', dispute.id);
        break;
      }

      default:
        console.log('[Webhook] Unhandled event type:', event.type);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('signature')) {
        console.error('Webhook signature verification failed');
        return NextResponse.json(
          { error: 'Webhook signature verification failed' },
          { status: 401 }
        );
      }
      console.error('Webhook error:', err.message);
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
