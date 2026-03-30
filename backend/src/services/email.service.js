import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const sendContactEmail = async (data) => {
  const { firstName, lastName, email, phone, service, message } = data;

  const html = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      ${service ? `<tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${service}</td></tr>` : ''}
      ${message ? `<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message}</td></tr>` : ''}
    </table>
  `;

  const mailOptions = {
    from: `"Bixihomes Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `New Estimate Request from ${firstName} ${lastName}`,
    html,
  };

  const info = await getTransporter().sendMail(mailOptions);
  logger.info('Contact email sent', { messageId: info.messageId });
  return info;
};
