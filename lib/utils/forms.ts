import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

export const recoverySchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const serviceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tag: z.string(),
  price: z.number().min(0, 'Price must be positive'),
  isSubscribed: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RecoveryFormData = z.infer<typeof recoverySchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;