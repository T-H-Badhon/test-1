import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { matchPassword } from '../../utilities/matchPassword'
import { User } from '../user/user.schema$model'
import { TLoginUser, TtokenInfo } from './auth.interface'

import jwt from 'jsonwebtoken'
import { config } from '../../config/config'
import { Types } from 'mongoose'
import { hashedPassword } from '../../utilities/hashedPassword'
import {
  isUsedBefore,
  timeFormater,
} from '../../utilities/checkedPasswordHistory'
import { TPassHistory, TUser } from '../user/user.interface'

const registerUser = async (userData: TUser) => {
  userData.password = await hashedPassword(userData.password)
  userData.passwordChangedAt = new Date()
  const user = await User.create(userData)

  const result = await User.findById(user._id).select(
    '-password -__v -passwordChangedAt -passHistory',
  )

  return result
}

const loginUser = async (loginCredential: TLoginUser) => {
  const { username, password } = loginCredential

  const loginUser = await User.findOne({ username }).select('+password')

  if (loginUser) {
    const isMatched = await matchPassword(password, loginUser.password)

    if (!isMatched) {
      throw new AppError(httpStatus.FORBIDDEN, 'password not matched')
    }

    const tokenInfo: TtokenInfo = {
      _id: loginUser._id,
      email: loginUser.email,
      role: loginUser.role,
    }
    const token = jwt.sign(tokenInfo, config.access_secrate as string, {
      expiresIn: '1h',
    })

    const user = await User.findById(loginUser._id).select(
      '-createdAt -updatedAt -__v -passwordChangedAt -passHistory',
    )
    const result = {
      user,
      token,
    }

    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }
}

const changePassword = async (
  currentPassword: string,
  newPassword: string,
  id: Types.ObjectId,
) => {
  const loginUser = await User.findById(id).select('+password')
  const isMatched = await matchPassword(
    currentPassword,
    loginUser?.password as string,
  )
  if (!isMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Current Passwore doesn't match!",
    )
  }

  if (currentPassword === newPassword) {
    const formattedDate = timeFormater(loginUser?.passwordChangedAt as Date)
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedDate.date} at ${formattedDate.time}).`,
      data: null,
    }
  }

  const isUsed = await isUsedBefore(
    newPassword,
    loginUser?.passHistory as TPassHistory[],
  )

  if (isUsed) {
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used ${isUsed}.`,
      data: null,
    }
  }

  const newPassHistory: TPassHistory = {
    password: loginUser?.password as string,
    passwordUsedAt: new Date(),
  }

  loginUser?.passHistory?.unshift(newPassHistory)

  if (loginUser?.passHistory && loginUser.passHistory.length > 2) {
    loginUser.passHistory.pop()
  }

  const newHashedPassword = await hashedPassword(newPassword)
  const user = await User.findByIdAndUpdate(
    id,
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      passHistory: loginUser?.passHistory,
    },
    { new: true },
  ).select('_id username email role createdAt updatedAt')
  return {
    success: true,
    statusCode: 200,
    message: 'Password changed successfully',
    data: user,
  }
}

export const authServices = {
  registerUser,
  loginUser,
  changePassword,
}
