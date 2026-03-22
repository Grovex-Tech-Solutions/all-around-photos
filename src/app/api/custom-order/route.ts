import { NextRequest, NextResponse } from 'next/server';
import { customOrderSchema } from '@/lib/validations/custom-order';
import { generateCustomOrderEmail } from '@/lib/email-templates';
import { sendQuoteRequestNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = customOrderSchema.parse(body);

    // Generate email content
    const emailHtml = generateCustomOrderEmail(validatedData);

    // Send email notification (using existing email service)
    await sendQuoteRequestNotification(
      {
        id: `custom-${Date.now()}`,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceType: 'Custom Order',
        projectDescription: validatedData.description,
        location: 'N/A',
        timeline: validatedData.timeline,
        budget: validatedData.budget,
        createdAt: new Date(),
      },
      {
        html: emailHtml,
        replyTo: validatedData.email,
      }
    );

    return NextResponse.json(
      { success: true, message: 'Order request received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Custom order error:', error);

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process order request' },
      { status: 500 }
    );
  }
}
