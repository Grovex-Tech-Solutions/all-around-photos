import { z } from 'zod';

export const droneQuoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number'),
  company: z.string().optional(),
  propertyAddress: z.string().min(10, 'Address must be at least 10 characters'),
  propertyType: z.enum([
    'residential',
    'commercial',
    'land',
    'development',
    'other',
  ]),
  serviceType: z.array(z.enum(['photography', 'video', 'mapping', 'inspection'])
  ).min(1, 'Select at least one service'),
  acreage: z.string().optional(),
  timeline: z.enum(['asap', '1-2-weeks', '1-month', 'flexible']),
  budget: z.enum(['175-250', '250-420', '420-750', '750+']),
  notes: z.string().optional(),
});

export type DroneQuoteInput = z.infer<typeof droneQuoteSchema>;
