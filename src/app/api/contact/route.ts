import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { generateContactEmail } from '@/lib/email-templates';
import { sendQuoteRequestNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Generate email content
    const emailHtml = generateContactEmail(validatedData);

    // Send email notification
    await sendQuoteRequestNotification({
      id: `contact-${Date.now()}`,
      name: validatedData.name,
      email: validatedData.email,
      serviceType: 'Contact Form',
      projectDescription: validatedData.message,
      location: 'N/A',
      timeline: 'Not specified',
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
