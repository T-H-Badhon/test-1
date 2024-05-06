import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const ReviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const Review = model<TReview>('review', ReviewSchema)

export default Review
