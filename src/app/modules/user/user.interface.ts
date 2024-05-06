export type TPassHistory = {
  password: string
  passwordUsedAt: Date
}

export type TUser = {
  username: string
  email: string
  password: string
  passwordChangedAt?: Date
  passHistory?: TPassHistory[]
  role: 'admin' | 'user'
}
