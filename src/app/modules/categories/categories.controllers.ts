import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { categoryServices } from './categories.services'

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body
  const id = req.user._id

  const result = await categoryServices.createCategory(categoryData, id)

  response(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

const getAll = catchAsync(async (req, res) => {
  const result = await categoryServices.getAll()
  response(res, {
    statusCode: 200,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

export const categoryControllers = {
  createCategory,
  getAll,
}
