import nodemailer from 'nodemailer';
import env from '../config/env.js';
import logger from '../utils/logger.js';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return transporter;
};

// Escape HTML entities to prevent malformed email HTML
const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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

  const mailOptions = {
    from: `"Bixihomes Website" <${env.SMTP_USER}>`,
    to: env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `New Estimate Request from ${firstName} ${lastName}`,
    html,
  };

  const info = await getTransporter().sendMail(mailOptions);
  logger.info('Contact email sent', { messageId: info.messageId });
  return info;
};
