import { z } from 'zod';

export const customOrderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  style: z.enum(['streetwear', 'classic', 'artistic', 'custom']),
  budget: z.enum(['100-250', '250-500', '500-1000', '1000+']),
  timeline: z.enum(['1-2-weeks', '2-4-weeks', '1-2-months', 'flexible']),
  files: z
    .array(z.instanceof(File))
    .optional()
    .default([])
    .refine((files) => files.length <= 5, 'Maximum 5 files allowed'),
});

export type CustomOrderInput = z.infer<typeof customOrderSchema>;
