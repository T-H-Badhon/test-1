import { Types } from 'mongoose'

export type TLoginUser = {
  username: string
  password: string
}

export type TtokenInfo = {
  _id: Types.ObjectId
  role: 'user' | 'admin'
  email: string
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
}
