import { z } from 'zod'

export const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z
      .number()
      .max(5, { message: 'rating must be between 1-5' })
      .min(1, { message: 'rating must be between 1-5' }),
    review: z.string(),
  }),
})
