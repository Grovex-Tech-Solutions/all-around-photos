import { z } from 'zod';

export const customOrderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number'),
  itemType: z.enum(['hoodie', 'tshirt', 'coaster', 'other']),
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1').max(250, 'Quantity is too high'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  referenceUrl: z.union([z.literal(''), z.string().url('Reference link must be a valid URL')]).optional().default(''),
  budget: z.enum(['100-250', '250-500', '500-1000', '1000+']),
  timeline: z.enum(['1-2-weeks', '2-4-weeks', '1-2-months', 'flexible']),
});

export type CustomOrderInput = z.infer<typeof customOrderSchema>;
