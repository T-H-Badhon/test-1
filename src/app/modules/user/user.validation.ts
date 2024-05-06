import { z } from 'zod'

export const userValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'username is required!',
    }),
    email: z.string({ required_error: 'email is required!' }).email({
      message: 'Not a valid email',
    }),
    password: z.string({ required_error: 'password is required' }).refine(
      (password) => {
        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

        return alphanumericRegex.test(password)
      },
      {
        message:
          'password must be alpaneumeric (*example: password123) and minimum 6 characters long',
      },
    ),
    role: z.enum(['admin', 'user']).optional(), // role has default value 'user' so I make it optional.
  }),
})
