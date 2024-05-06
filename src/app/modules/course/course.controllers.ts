import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { courseServices } from './course.services'

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body
  const id = req.user._id

  const result = await courseServices.createCourse(courseData, id)

  response(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully',
    data: result,
  })
})

const getAll = catchAsync(async (req, res) => {
  const query = req.query
  const result = await courseServices.getAll(query)

  let message = 'No Course Found!'
  let statusCode = 404
  if (result.total != 0) {
    message = 'Courses retrieved successfully'
    statusCode = 200
  }

  response(res, {
    statusCode: statusCode,
    success: true,
    meta: {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 2,
      total: result.total || 0,
    },
    message: message,
    data: { courses: result.courses },
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.courseId
  const updateData = req.body
  const result = await courseServices.updateCourse(id, updateData)

  let statusCode = 404
  let message = 'No Course Found with this ID!'

  if (result?._id) {
    message = 'Course updated successfully'
    statusCode = 200
  }

  response(res, {
    statusCode: statusCode,
    success: true,
    message: message,
    data: result,
  })
})
const getCourseWithReviews = catchAsync(async (req, res) => {
  const id = req.params.courseId

  const result = await courseServices.getCourseWithReviews(id)

  let message = 'Course not Found with this ID'
  let statusCode = 404
  if (result?.course?._id) {
    message = 'Course and reviews retrieved successfully'
    statusCode = 200
  }
  response(res, {
    statusCode: statusCode,
    success: true,
    message: message,
    data: result,
  })
})
const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourse()

  response(res, {
    statusCode: 200,
    success: true,
    message: 'Best course retrieved successfully',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getAll,
  updateCourse,
  getCourseWithReviews,
  getBestCourse,
}
