import { z } from 'zod';

// Matches the current frontend options and keeps legacy service names valid.
const SERVICE_OPTIONS = [
  'Roofing',
  'Siding',
  'Fascia & Gutters',
  'Window Replacement',
  'Fencing & Decking',
  'Repair & Renovation',
  'New Build',
  'Basement Development',
  'Bathroom Remodeling',
  'Garage Building',
  'Interior Finishing',
  'Fascia',
  'Gutters',
  'Home Renovation',
  'Flat Roofing',
  'Sloped Roofing',
  'Fencing',
  'Decking',
  'Outdoor Builds',
];

// Strip HTML tags to prevent stored XSS
const stripHtml = (str) => str.replace(/<[^>]*>/g, '');

// Sanitized string: trim whitespace, strip HTML
const sanitizedString = (maxLen) =>
  z.string().trim().transform(stripHtml).pipe(z.string().min(1).max(maxLen));

// Optional sanitized string: allow empty string or missing
const optionalSanitizedString = (maxLen) =>
  z.string().trim().transform(stripHtml).pipe(z.string().max(maxLen)).optional().or(z.literal(''));

export const contactSchema = z.object({
  firstName: sanitizedString(50),
  lastName: sanitizedString(50),
  email: z.string().trim().email('Invalid email address'),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => val.replace(/\D/g, '').length >= 10,
      { message: 'Phone number must have at least 10 digits' }
    ),
  service: z.enum(SERVICE_OPTIONS).optional(),
  message: optionalSanitizedString(2000),
});
