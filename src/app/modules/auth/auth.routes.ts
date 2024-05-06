import express from 'express'
import validate from '../../middlewares/ValidationFunction'
import { userValidationSchema } from '../user/user.validation'
import {
  changePasswordValidationSchema,
  loginValidationSchema,
} from './auth.validation'
import { authControllers } from './auth.controllers'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/register',
  validate(userValidationSchema),
  authControllers.registerUser,
)
router.post(
  '/login',
  validate(loginValidationSchema),
  authControllers.loginUser,
)

router.post(
  '/change-password',
  auth('admin', 'user'),
  validate(changePasswordValidationSchema),
  authControllers.changePassword,
)

export const authRoutes = router
