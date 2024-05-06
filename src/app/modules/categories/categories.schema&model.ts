import { Schema, model } from 'mongoose'
import { TCategory } from './categories.interface'

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
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

const Category = model<TCategory>('category', CategorySchema)

export default Category
