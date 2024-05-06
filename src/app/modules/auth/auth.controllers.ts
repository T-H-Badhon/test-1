import { Request, Response } from 'express'
import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { authServices } from './auth.services'

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await authServices.registerUser(userData)

  response(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginCredential = req.body

  const result = await authServices.loginUser(loginCredential)
  response(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body
  const id = req.user._id

  const result = await authServices.changePassword(
    currentPassword,
    newPassword,
    id,
  )

  response(res, result)
})

export const authControllers = {
  registerUser,
  loginUser,
  changePassword,
}
