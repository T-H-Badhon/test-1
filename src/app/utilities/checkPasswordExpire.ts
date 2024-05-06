export const isPasswordExpaired = (passwordChangedAt: Date, iat: number) => {
  const passwordChanged = new Date(passwordChangedAt).getTime() / 1000

  return passwordChanged > iat
}
