import { NextRequest, NextResponse } from 'next/server';
import { customOrderSchema } from '@/lib/validations/custom-order';
import { sendQuoteRequestNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const referenceId = `CO-${Date.now()}`;

    // Validate the request body
    const validatedData = customOrderSchema.parse(body);


    // Send email notification (using existing email service)
    await sendQuoteRequestNotification({
      id: referenceId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: 'Custom Order',
      projectDescription: [
        `Item type: ${validatedData.itemType}`,
        `Quantity: ${validatedData.quantity}`,
        validatedData.referenceUrl ? `Reference URL: ${validatedData.referenceUrl}` : null,
        '',
        validatedData.description,
      ].filter(Boolean).join('\n'),
      location: 'N/A',
      timeline: validatedData.timeline,
      budget: validatedData.budget,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Order request received', referenceId },
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
