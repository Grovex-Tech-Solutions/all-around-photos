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

interface SendEmailOptions {
  subject: string;
  html: string;
  text: string;
  to: string | string[];
  replyTo?: string;
}

interface OrderLineItem {
  description: string;
  quantity: number;
  amountTotal?: number | null;
}

interface OrderEmailData {
  sessionId: string;
  customerEmail: string;
  customerName?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  items: OrderLineItem[];
}

const DEFAULT_OWNER_EMAIL = 'photographer@allaroundphotos.com';
const DEFAULT_FROM_EMAIL =
  'All Around Photos LLC <noreply@allaroundphotosllc.net>';
const RESEND_API_URL = 'https://api.resend.com/emails';

function getOwnerEmail(): string {
  return process.env.PHOTOGRAPHER_EMAIL || DEFAULT_OWNER_EMAIL;
}

function getFromEmail(): string {
  return process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(date?: Date | null): string {
  if (!date) return 'Not specified';

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCurrency(amount?: number | null, currency = 'usd'): string {
  if (amount == null) return 'Not available';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

async function sendWithResend(
  options: SendEmailOptions,
  apiKey: string
): Promise<void> {
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getFromEmail(),
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Resend delivery failed (${response.status}): ${responseText}`
    );
  }
}

async function sendEmail(options: SendEmailOptions): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn(
      '[Email] RESEND_API_KEY not configured. Logging email payload instead of sending.'
    );
    console.log('[Email] To:', options.to);
    console.log('[Email] Subject:', options.subject);
    console.log('[Email] Reply-To:', options.replyTo ?? 'not set');
    console.log('[Email] Text body:\n', options.text);
    return;
  }

  await sendWithResend(options, resendApiKey);
}

function generateQuoteRequestEmail(quoteRequest: QuoteRequestData) {
  const subject = `New Quote Request: ${quoteRequest.serviceType} - ${quoteRequest.name}`;

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

${
  quoteRequest.specialRequirements
    ? `Special Requirements:
${quoteRequest.specialRequirements}`
    : ''
}

${
  quoteRequest.petDetails
    ? `Pet Details:
${quoteRequest.petDetails}`
    : ''
}

Request ID: ${quoteRequest.id}
Submitted: ${quoteRequest.createdAt.toLocaleString()}

Please respond to this quote request within 24 hours.
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New Quote Request Received</h2>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(quoteRequest.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(quoteRequest.email)}">${escapeHtml(quoteRequest.email)}</a></p>
        <p><strong>Phone:</strong> ${quoteRequest.phone ? `<a href="tel:${escapeHtml(quoteRequest.phone)}">${escapeHtml(quoteRequest.phone)}</a>` : 'Not provided'}</p>
      </div>

      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Service Details</h3>
        <p><strong>Service Type:</strong> ${escapeHtml(quoteRequest.serviceType)}</p>
        ${quoteRequest.sessionType ? `<p><strong>Session Type:</strong> ${escapeHtml(quoteRequest.sessionType)}</p>` : ''}
        <p><strong>Location:</strong> ${escapeHtml(quoteRequest.location)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(quoteRequest.timeline)}</p>
        ${quoteRequest.budget ? `<p><strong>Budget:</strong> ${escapeHtml(quoteRequest.budget)}</p>` : ''}
      </div>

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Dates</h3>
        <p><strong>Preferred Date:</strong> ${formatDate(quoteRequest.preferredDate)}</p>
        <p><strong>Alternate Date:</strong> ${formatDate(quoteRequest.alternateDate)}</p>
      </div>

      <div style="background: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Project Description</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(quoteRequest.projectDescription)}</p>
      </div>

      ${
        quoteRequest.specialRequirements
          ? `
      <div style="background: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Special Requirements</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(quoteRequest.specialRequirements)}</p>
      </div>
      `
          : ''
      }

      ${
        quoteRequest.petDetails
          ? `
      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Pet Details</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(quoteRequest.petDetails)}</p>
      </div>
      `
          : ''
      }

      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; color: #6b7280; font-size: 14px;">
        <p><strong>Request ID:</strong> ${escapeHtml(quoteRequest.id)}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(quoteRequest.createdAt.toLocaleString())}</p>
        <p style="color: #dc2626;"><strong>Please respond within 24 hours.</strong></p>
      </div>
    </div>
  `;

  return { subject, body, html };
}

function generateQuoteResponseEmail(
  clientName: string,
  quoteDetails: {
    serviceType: string;
    quotedAmount?: number;
    message: string;
  }
) {
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
Email: ${getOwnerEmail()}
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">Quote Response</h2>
      <p>Dear ${escapeHtml(clientName)},</p>
      <p>Thank you for your interest in All Around Photos LLC!</p>
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="white-space: pre-wrap;">${escapeHtml(quoteDetails.message)}</p>
        ${quoteDetails.quotedAmount ? `<p style="font-size: 18px; font-weight: bold; color: #1e40af;">Quoted Amount: $${quoteDetails.quotedAmount}</p>` : ''}
      </div>
      <p>We look forward to working with you and capturing your special moments.</p>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
        <p><strong>Best regards,</strong><br>All Around Photos LLC Team</p>
        <p style="color: #6b7280; font-size: 14px;">
          Email: <a href="mailto:${escapeHtml(getOwnerEmail())}">${escapeHtml(getOwnerEmail())}</a>
        </p>
      </div>
    </div>
  `;

  return { subject, body, html };
}

function generateOrderConfirmationEmail(order: OrderEmailData) {
  const customerName = order.customerName || 'there';
  const subject = `Your All Around Photos order is confirmed`;
  const itemLines = order.items
    .map(
      item =>
        `- ${item.description} × ${item.quantity}${item.amountTotal != null ? ` — ${formatCurrency(item.amountTotal, order.currency || 'usd')}` : ''}`
    )
    .join('\n');

  const text = `
Hi ${customerName},

Thanks for your order with All Around Photos LLC.

Order summary:
${itemLines || '- Stripe payment completed'}

Total: ${formatCurrency(order.amountTotal, order.currency || 'usd')}
Stripe session: ${order.sessionId}

If you have any questions, just reply to this email.
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">Order confirmed</h2>
      <p>Hi ${escapeHtml(customerName)},</p>
      <p>Thanks for your order with All Around Photos LLC.</p>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Order summary</h3>
        <ul>
          ${
            order.items
              .map(
                item =>
                  `<li>${escapeHtml(item.description)} × ${item.quantity}${item.amountTotal != null ? ` — ${escapeHtml(formatCurrency(item.amountTotal, order.currency || 'usd'))}` : ''}</li>`
              )
              .join('') || '<li>Stripe payment completed</li>'
          }
        </ul>
        <p><strong>Total:</strong> ${escapeHtml(formatCurrency(order.amountTotal, order.currency || 'usd'))}</p>
        <p><strong>Stripe session:</strong> ${escapeHtml(order.sessionId)}</p>
      </div>
      <p>If you have any questions, just reply to this email.</p>
    </div>
  `;

  return { subject, text, html };
}

function generateOwnerOrderNotificationEmail(order: OrderEmailData) {
  const subject = `New paid order: ${order.customerEmail}`;
  const text = `
A Stripe checkout session completed.

Customer: ${order.customerName || 'Not provided'}
Email: ${order.customerEmail}
Session: ${order.sessionId}
Total: ${formatCurrency(order.amountTotal, order.currency || 'usd')}

Items:
${order.items.map(item => `- ${item.description} × ${item.quantity}`).join('\n') || '- No line items returned by Stripe'}
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New paid order received</h2>
      <p><strong>Customer:</strong> ${escapeHtml(order.customerName || 'Not provided')}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(order.customerEmail)}">${escapeHtml(order.customerEmail)}</a></p>
      <p><strong>Stripe session:</strong> ${escapeHtml(order.sessionId)}</p>
      <p><strong>Total:</strong> ${escapeHtml(formatCurrency(order.amountTotal, order.currency || 'usd'))}</p>
      <h3 style="color: #374151;">Items</h3>
      <ul>
        ${order.items.map(item => `<li>${escapeHtml(item.description)} × ${item.quantity}</li>`).join('') || '<li>No line items returned by Stripe</li>'}
      </ul>
    </div>
  `;

  return { subject, text, html };
}

export async function sendQuoteRequestNotification(
  quoteRequest: QuoteRequestData,
  overrides?: {
    html?: string;
    replyTo?: string;
  }
): Promise<void> {
  const emailContent = generateQuoteRequestEmail(quoteRequest);

  await sendEmail({
    to: getOwnerEmail(),
    subject: emailContent.subject,
    html: overrides?.html || emailContent.html,
    text: emailContent.body,
    replyTo: overrides?.replyTo || quoteRequest.email,
  });
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

  await sendEmail({
    to: clientEmail,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.body,
    replyTo: getOwnerEmail(),
  });
}

export async function sendOrderConfirmationEmail(
  order: OrderEmailData
): Promise<void> {
  const emailContent = generateOrderConfirmationEmail(order);

  await sendEmail({
    to: order.customerEmail,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
    replyTo: getOwnerEmail(),
  });
}

export async function sendOwnerOrderNotificationEmail(
  order: OrderEmailData
): Promise<void> {
  const emailContent = generateOwnerOrderNotificationEmail(order);

  await sendEmail({
    to: getOwnerEmail(),
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
    replyTo: order.customerEmail,
  });
}
