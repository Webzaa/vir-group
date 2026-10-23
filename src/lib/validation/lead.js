import { z } from 'zod';
/** Shared by the contact form (client) and /api/leads (server). The server is the authority. */
export const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid', 'landing_page', 'referrer'];

const phoneValidator = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-()]/g, ''))
  .refine(
    (v) => {
      if (!v) return false;
      if (v.startsWith('+91')) {
        return /^\+91[6-9]\d{9}$/.test(v);
      }
      if (/^[6-9]\d{9}$/.test(v)) {
        return true;
      }
      if (v.startsWith('+')) {
        return /^\+\d{7,15}$/.test(v);
      }
      return /^\d{7,15}$/.test(v);
    },
    { message: 'Enter a valid mobile number with country code.' }
  );

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(120)
    .regex(/^[a-zA-Z\s.'-]{2,120}$/, 'Name should only contain letters and spaces.'),
  email: z.string().trim().email('Enter a valid email address like name@example.com.').max(200),
  phone: phoneValidator,
  countryCode: z.string().optional().default('+91'),
  project: z.string().max(80).optional().default(''),
  subject: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().max(4000).optional().default('Contact enquiry from website.'),
  consent: z.boolean().optional().default(true),
  /** Honeypot: real users never fill this. */
  website: z.string().max(0).optional().default(''),
  attribution: z.record(z.string().max(2000)).optional().default({}),
});
