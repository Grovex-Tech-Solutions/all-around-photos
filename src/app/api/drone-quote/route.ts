import { NextRequest, NextResponse } from 'next/server';
import { droneQuoteSchema } from '@/lib/validations/drone-quote';
import { sendQuoteRequestNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = droneQuoteSchema.parse(body);

    // Send email notification (using existing email service)
    await sendQuoteRequestNotification({
      id: `drone-${Date.now()}`,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      serviceType: 'Drone Services',
      projectDescription: validatedData.propertyAddress,
      location: validatedData.propertyAddress,
      timeline: validatedData.timeline,
      budget: validatedData.budget,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Quote request received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Drone quote error:', error);

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
