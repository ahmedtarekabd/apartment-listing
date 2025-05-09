import { z } from 'zod'

export const apartmentsIdSchema = z.object({
  id: z.number().positive(),
})

export const apartmentsSchema = z.object({
  id: apartmentsIdSchema.shape.id.optional(),
  unit_name: z.string().min(1).max(100),
  unit_number: z.string().min(1).max(10),
  description: z.string().min(1).max(500),
  price: z.number().positive(),
})

export const apartmentsArraySchema = z.array(apartmentsSchema)
