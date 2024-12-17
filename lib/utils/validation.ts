import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must be less than 500 characters'),
  tag: z.string()
    .refine(val => ['Clinical', 'Laboratory', 'Analytics', 'Pharmacy', 'Research'].includes(val), {
      message: 'Invalid category selected'
    }),
  imageUrl: z.string()
    .url('Please enter a valid URL')
    .refine(url => url.startsWith('https://'), {
      message: 'URL must use HTTPS'
    }),
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(10000, 'Price cannot exceed $10,000'),
  isSubscribed: z.boolean(),
  lastUpdate: z.string().datetime(),
});

export const categorySchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be less than 200 characters'),
  icon: z.string()
    .refine(val => ['Clinical', 'Laboratory', 'Analytics', 'Pharmacy', 'Research'].includes(val), {
      message: 'Invalid icon selected'
    }),
});