import mongoose from 'mongoose'

export const MongooseErrorMessageGenerator = (
  err: mongoose.Error.ValidationError,
): string => {
  return err.message
}
