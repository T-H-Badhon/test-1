import { Schema, model } from 'mongoose'
import { TCourse, TDetails, TTag } from './course.interface'

const TagsSchema = new Schema<TTag>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
})

const DetailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
})

const CourseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: { type: Number, required: true },
    tags: { type: [TagsSchema], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number, required: true },
    details: DetailsSchema,
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    totalRating: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

const Course = model<TCourse>('course', CourseSchema)

export default Course
