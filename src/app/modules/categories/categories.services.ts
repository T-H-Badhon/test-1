import { Types } from 'mongoose'
import { TCategory } from './categories.interface'
import Category from './categories.schema&model'

const createCategory = async (categoryData: TCategory, id: Types.ObjectId) => {
  categoryData.createdBy = id
  const newCategory = await Category.create(categoryData)
  const result = await Category.findById(newCategory._id).select('-__v')
  return result
}

const getAll = async () => {
  const result = await Category.find({}, { __v: 0 }).populate({
    path: 'createdBy',
    select: '_id username email role',
  })

  return {
    categories: result,
  }
}

export const categoryServices = {
  createCategory,
  getAll,
}
