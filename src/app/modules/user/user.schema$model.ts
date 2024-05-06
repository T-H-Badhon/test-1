import { Schema, model } from 'mongoose'
import { TPassHistory, TUser } from './user.interface'

const passHistorySchema = new Schema<TPassHistory>({
  password: {
    type: String,
  },
  passwordUsedAt: {
    type: Date,
  },
})

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      default: '2023-12-27T08:51:24.747+00:00',
    },
    passHistory: [passHistorySchema],
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<TUser>('User', userSchema)
