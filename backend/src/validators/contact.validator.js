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

// Strip HTML tags to prevent stored XSS.
const stripHtml = (str) => str.replace(/<[^>]*>/g, '');

// Strip ASCII control characters, including CR/LF and NUL. CR/LF in a value
// that later lands in an email header (e.g. the subject line) is the classic
// email header-injection vector, so we neutralize it at the validation layer.
// NUL bytes are dropped to defeat null-byte truncation tricks.
// eslint-disable-next-line no-control-regex
const stripControlChars = (str) => str.replace(/[\x00-\x1F\x7F]/g, '');

// Collapse runs of internal whitespace into a single space so a value can't
// smuggle large blocks of layout-breaking whitespace.
const normalizeWhitespace = (str) => str.replace(/\s{2,}/g, ' ');

// Single-line sanitized string (names, etc.): strip control chars, strip HTML,
// collapse whitespace, trim. No newlines survive here.
const sanitizedString = (maxLen) =>
  z
    .string()
    .transform((s) => normalizeWhitespace(stripHtml(stripControlChars(s))).trim())
    .pipe(z.string().min(1).max(maxLen));

// Multi-line sanitized string (message body): preserve newlines for
// readability but still strip every other control character and all HTML.
// eslint-disable-next-line no-control-regex
const stripControlCharsKeepNewlines = (str) =>
  str.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, '');

const optionalMultilineString = (maxLen) =>
  z
    .string()
    .transform((s) => stripHtml(stripControlCharsKeepNewlines(s)).trim())
    .pipe(z.string().max(maxLen))
    .optional()
    .or(z.literal(''));

export const contactSchema = z.object({
  firstName: sanitizedString(50),
  lastName: sanitizedString(50),
  // Reject any whitespace/control characters in the email outright (a valid
  // address never contains them) before the format check — this stops
  // header injection via the Reply-To address.
  email: z
    .string()
    .trim()
    .max(254)
    .refine((val) => !/\s/.test(val), { message: 'Invalid email address' })
    .pipe(z.string().email('Invalid email address')),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((val) => val.replace(/\D/g, '').length >= 10, {
      message: 'Phone number must have at least 10 digits',
    })
    .refine((val) => /^[\d\s()+.\-]+$/.test(val), {
      message: 'Phone number contains invalid characters',
    }),
  service: z.enum(SERVICE_OPTIONS).optional(),
  message: optionalMultilineString(2000),
});
