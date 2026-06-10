import { Resend } from 'resend';
import env from '../config/env.js';
import logger from '../utils/logger.js';

const resend = new Resend(env.RESEND_API_KEY);

// Escape HTML entities to prevent malformed email HTML
const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Defense in depth: strip CR/LF and other control characters from any value
// that is placed into an email header (subject line). The validator already
// removes these, but the email layer must never trust its caller — this
// guarantees no header injection even if sendContactEmail is invoked directly.
// eslint-disable-next-line no-control-regex
const sanitizeHeader = (str) => String(str).replace(/[\x00-\x1F\x7F]/g, ' ').trim();

export const sendContactEmail = async (data) => {
  const { firstName, lastName, email, phone, service, message } = data;

  const html = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>
      ${service ? `<tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${escapeHtml(service)}</td></tr>` : ''}
      ${message ? `<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${escapeHtml(message)}</td></tr>` : ''}
    </table>
  `;

  const result = await resend.emails.send({
    from: `Bixihomes Website <${env.RESEND_FROM_EMAIL}>`,
    to: [env.CONTACT_EMAIL_TO],
    replyTo: sanitizeHeader(email),
    subject: sanitizeHeader(`New Estimate Request from ${firstName} ${lastName}`),
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  logger.info('Contact email sent', { id: result.data.id });
  return result.data;
};
