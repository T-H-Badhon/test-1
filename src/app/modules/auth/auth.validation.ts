import { z } from 'zod'

export const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .refine(
        (password) => {
          const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

          return alphanumericRegex.test(password)
        },
        {
          message:
            'password must be alpaneumeric and minimum 6 characters long',
        },
      ),
  }),
})
