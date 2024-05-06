import mongoose, { Types } from 'mongoose'
import { TReview } from './review.interface'
import Review from './review.shema&model'
import { updateCourse } from './review.utilities'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const giveReview = async (reviewData: TReview, id: Types.ObjectId) => {
  reviewData.createdBy = id
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newReview = await Review.create([reviewData], { session })

    if (!newReview.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'review giving failed!')
    }

    const updatedCourse = await updateCourse(newReview[0], session) //update course for new review

    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course rivew failed!')
    }
    await session.commitTransaction()
    await session.endSession()

    const result = await Review.findById(newReview[0]._id)
      .select('-__v')
      .populate({
        path: 'createdBy',
        select: '_id username email role',
      })
    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to review course')
  }
}

export const reviewServices = {
  giveReview,
}
