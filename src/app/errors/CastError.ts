import mongoose from 'mongoose'

export const CastErrorMessageGenerator = (
  err: mongoose.Error.CastError,
): string => {
  const errorMessage = `${err.value} is not a valid ID!`

  return errorMessage
}
