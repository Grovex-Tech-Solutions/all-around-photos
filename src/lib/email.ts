// Email notification functionality for quote requests
// This is a stub implementation that can be extended with actual email service

interface QuoteRequestData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceType: string;
  sessionType?: string | null;
  projectDescription: string;
  location: string;
  preferredDate?: Date | null;
  alternateDate?: Date | null;
  timeline: string;
  budget?: string | null;
  specialRequirements?: string | null;
  petDetails?: string | null;
  createdAt: Date;
}

export async function sendQuoteRequestNotification(quoteRequest: QuoteRequestData): Promise<void> {
  // In a real implementation, this would integrate with an email service like:
  // - SendGrid
  // - AWS SES
  // - Nodemailer with SMTP
  // - Resend
  // - Postmark

  const emailContent = generateQuoteRequestEmail(quoteRequest);
  
  console.log('=== NEW QUOTE REQUEST NOTIFICATION ===');
  console.log('To: photographer@allaroundphotos.com');
  console.log('Subject:', emailContent.subject);
  console.log('Body:');
  console.log(emailContent.body);
  console.log('=====================================');

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // In production, you would implement actual email sending here:
  /*
  const emailService = getEmailService(); // Your chosen email service
  await emailService.send({
    to: process.env.PHOTOGRAPHER_EMAIL || 'photographer@allaroundphotos.com',
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.body
  });
  */
}

export async function sendQuoteResponseToClient(
  clientEmail: string,
  clientName: string,
  quoteDetails: {
    serviceType: string;
    quotedAmount?: number;
    message: string;
  }
): Promise<void> {
  const emailContent = generateQuoteResponseEmail(clientName, quoteDetails);
  
  console.log('=== QUOTE RESPONSE TO CLIENT ===');
  console.log('To:', clientEmail);
  console.log('Subject:', emailContent.subject);
  console.log('Body:');
  console.log(emailContent.body);
  console.log('===============================');

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 100));
}

function generateQuoteRequestEmail(quoteRequest: QuoteRequestData) {
  const subject = `New Quote Request: ${quoteRequest.serviceType} - ${quoteRequest.name}`;
  
  const formatDate = (date?: Date | null) => {
    if (!date) return 'Not specified';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const body = `
New Quote Request Received

Client Information:
- Name: ${quoteRequest.name}
- Email: ${quoteRequest.email}
- Phone: ${quoteRequest.phone || 'Not provided'}

Service Details:
- Service Type: ${quoteRequest.serviceType}
${quoteRequest.sessionType ? `- Session Type: ${quoteRequest.sessionType}` : ''}
- Location: ${quoteRequest.location}
- Timeline: ${quoteRequest.timeline}
${quoteRequest.budget ? `- Budget: ${quoteRequest.budget}` : ''}

Dates:
- Preferred Date: ${formatDate(quoteRequest.preferredDate)}
- Alternate Date: ${formatDate(quoteRequest.alternateDate)}

Project Description:
${quoteRequest.projectDescription}

${quoteRequest.specialRequirements ? `Special Requirements:
${quoteRequest.specialRequirements}` : ''}

${quoteRequest.petDetails ? `Pet Details:
${quoteRequest.petDetails}` : ''}

Request ID: ${quoteRequest.id}
Submitted: ${quoteRequest.createdAt.toLocaleString()}

Please respond to this quote request within 24 hours.
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Quote Request Received</h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${quoteRequest.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${quoteRequest.email}">${quoteRequest.email}</a></p>
        <p><strong>Phone:</strong> ${quoteRequest.phone ? `<a href="tel:${quoteRequest.phone}">${quoteRequest.phone}</a>` : 'Not provided'}</p>
      </div>

      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Service Details</h3>
        <p><strong>Service Type:</strong> ${quoteRequest.serviceType}</p>
        ${quoteRequest.sessionType ? `<p><strong>Session Type:</strong> ${quoteRequest.sessionType}</p>` : ''}
        <p><strong>Location:</strong> ${quoteRequest.location}</p>
        <p><strong>Timeline:</strong> ${quoteRequest.timeline}</p>
        ${quoteRequest.budget ? `<p><strong>Budget:</strong> ${quoteRequest.budget}</p>` : ''}
      </div>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Dates</h3>
        <p><strong>Preferred Date:</strong> ${formatDate(quoteRequest.preferredDate)}</p>
        <p><strong>Alternate Date:</strong> ${formatDate(quoteRequest.alternateDate)}</p>
      </div>

      <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Project Description</h3>
        <p style="white-space: pre-wrap;">${quoteRequest.projectDescription}</p>
      </div>

      ${quoteRequest.specialRequirements ? `
      <div style="background: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Special Requirements</h3>
        <p style="white-space: pre-wrap;">${quoteRequest.specialRequirements}</p>
      </div>
      ` : ''}

      ${quoteRequest.petDetails ? `
      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Pet Details</h3>
        <p style="white-space: pre-wrap;">${quoteRequest.petDetails}</p>
      </div>
      ` : ''}

      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; color: #6b7280; font-size: 14px;">
        <p><strong>Request ID:</strong> ${quoteRequest.id}</p>
        <p><strong>Submitted:</strong> ${quoteRequest.createdAt.toLocaleString()}</p>
        <p style="color: #dc2626;"><strong>Please respond within 24 hours.</strong></p>
      </div>
    </div>
  `;

  return { subject, body, html };
}

function generateQuoteResponseEmail(clientName: string, quoteDetails: any) {
  const subject = `Quote Response: ${quoteDetails.serviceType} Photography`;
  
  const body = `
Dear ${clientName},

Thank you for your interest in All Around Photos LLC!

${quoteDetails.message}

${quoteDetails.quotedAmount ? `Quoted Amount: $${quoteDetails.quotedAmount}` : ''}

We look forward to working with you and capturing your special moments.

Best regards,
All Around Photos LLC Team

Contact us:
Email: photographer@allaroundphotos.com
Phone: (555) 123-4567
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">Quote Response</h2>
      <p>Dear ${clientName},</p>
      <p>Thank you for your interest in All Around Photos LLC!</p>
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="white-space: pre-wrap;">${quoteDetails.message}</p>
        ${quoteDetails.quotedAmount ? `<p style="font-size: 18px; font-weight: bold; color: #1e40af;">Quoted Amount: $${quoteDetails.quotedAmount}</p>` : ''}
      </div>
      <p>We look forward to working with you and capturing your special moments.</p>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
        <p><strong>Best regards,</strong><br>All Around Photos LLC Team</p>
        <p style="color: #6b7280; font-size: 14px;">
          Email: <a href="mailto:photographer@allaroundphotos.com">photographer@allaroundphotos.com</a><br>
          Phone: <a href="tel:+15551234567">(555) 123-4567</a>
        </p>
      </div>
    </div>
  `;

  return { subject, body, html };
}