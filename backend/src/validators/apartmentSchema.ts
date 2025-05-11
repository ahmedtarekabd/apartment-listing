import { z } from 'zod'

export const apartmentsIdSchema = z.object({
  // Source: https://github.com/colinhacks/zod/discussions/330#:~:text=Nov%203%2C%202022-,How%20about%20this%3F,-z.preprocess(%0A%20%20Number
  id: z.preprocess(Number, z.number().positive()),
})

export const apartmentsSchema = z.object({
  id: apartmentsIdSchema.shape.id.optional(),
  unit_name: z.string().min(1).max(100),
  unit_number: z.string().min(1).max(10),
  description: z.string().min(1).max(500),
  price: z.number().positive(),
  images: z.array(z.string()).optional(),
  address: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
  created_at: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date()
  ),
  updated_at: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date()
  ),
  deleted_at: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
})

export const apartmentsArraySchema = z.array(apartmentsSchema)
