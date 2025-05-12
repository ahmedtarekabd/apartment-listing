import { z } from 'zod'

export const apartmentSchema = z.object({
  unit_name: z.string().min(1).max(100),
  unit_number: z.string().min(1).max(10),
  description: z.string().min(1).max(500),
  project: z.string().min(1).max(100),
  price: z.coerce.number().positive(),
  images: z.array(z.string()),
  address: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
})

export type ApartmentSchema = z.infer<typeof apartmentSchema>
