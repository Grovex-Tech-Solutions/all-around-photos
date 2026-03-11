import { CustomOrderInput } from './validations/custom-order';
import { DroneQuoteInput } from './validations/drone-quote';
import { ContactInput } from './validations/contact';

export function generateCustomOrderEmail(data: CustomOrderInput): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: sans-serif; color: #333; }
      .header { background: #1f1f1f; color: #fff; padding: 20px; }
      .content { padding: 20px; background: #f5f5f5; }
      .field { margin: 10px 0; }
      .label { font-weight: bold; color: #dc2626; }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>New Custom Order Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${data.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> ${data.email}
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${data.phone}
      </div>
      <div class="field">
        <span class="label">Style:</span> ${data.style}
      </div>
      <div class="field">
        <span class="label">Budget:</span> $${data.budget}
      </div>
      <div class="field">
        <span class="label">Timeline:</span> ${data.timeline}
      </div>
      <div class="field">
        <span class="label">Description:</span>
        <p>${data.description.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

export function generateDroneQuoteEmail(data: DroneQuoteInput): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: sans-serif; color: #333; }
      .header { background: #1f1f1f; color: #fff; padding: 20px; }
      .content { padding: 20px; background: #f5f5f5; }
      .field { margin: 10px 0; }
      .label { font-weight: bold; color: #dc2626; }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>New Drone Services Quote Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${data.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> ${data.email}
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${data.phone}
      </div>
      ${data.company ? `<div class="field"><span class="label">Company:</span> ${data.company}</div>` : ''}
      <div class="field">
        <span class="label">Property Type:</span> ${data.propertyType}
      </div>
      <div class="field">
        <span class="label">Services:</span> ${data.serviceType.join(', ')}
      </div>
      <div class="field">
        <span class="label">Timeline:</span> ${data.timeline}
      </div>
      <div class="field">
        <span class="label">Budget:</span> $${data.budget}
      </div>
      ${data.notes ? `<div class="field"><span class="label">Notes:</span><p>${data.notes.replace(/\n/g, '<br>')}</p></div>` : ''}
    </div>
  </body>
</html>
  `.trim();
}

export function generateContactEmail(data: ContactInput): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: sans-serif; color: #333; }
      .header { background: #1f1f1f; color: #fff; padding: 20px; }
      .content { padding: 20px; background: #f5f5f5; }
      .field { margin: 10px 0; }
      .label { font-weight: bold; color: #dc2626; }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${data.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> ${data.email}
      </div>
      <div class="field">
        <span class="label">Subject:</span> ${data.subject}
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}
