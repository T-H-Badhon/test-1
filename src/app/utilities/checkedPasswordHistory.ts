import { TPassHistory } from '../modules/user/user.interface'
import { matchPassword } from './matchPassword'

export const timeFormater = (dateSting: Date) => {
  const date = dateSting.toISOString().split('T')[0]
  const time = dateSting.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return { date, time }
}

export const isUsedBefore = async (
  newPassword: string,
  passHistory: TPassHistory[],
) => {
  for (const pass of passHistory) {
    if (await matchPassword(newPassword, pass.password)) {
      const formattedDate = timeFormater(pass.passwordUsedAt)
      return `(last used on ${formattedDate.date} at ${formattedDate.time})`
    }
  }

  return false
}
