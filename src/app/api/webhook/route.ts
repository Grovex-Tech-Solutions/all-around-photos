import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialize Stripe to avoid build-time errors
function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(key, {
    apiVersion: '2024-11-20',
  });
}

export async function POST(request: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: 'Webhook service not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(key, {
      apiVersion: '2024-11-20',
    });

    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 401 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('[Webhook] Checkout session completed:', session.id);
        
        // TODO: Create order record in database
        // TODO: Decrement inventory for purchased items
        // TODO: Send confirmation email to customer
        
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('[Webhook] Charge refunded:', charge.id);
        
        // TODO: Update order status to refunded
        // TODO: Restore inventory
        // TODO: Send refund notification email
        
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        console.log('[Webhook] Dispute created:', dispute.id);
        
        // TODO: Notify admin of dispute
        
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
