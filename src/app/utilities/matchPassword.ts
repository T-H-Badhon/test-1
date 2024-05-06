import bcrypt from 'bcrypt'
export const matchPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword)
}
