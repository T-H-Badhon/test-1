import { TCourse } from './course.interface'
import Course from './course.schema&model'
import {
  arraySimplifier,
  durationCalculator,
  queryFilter,
  queryPagination,
  querySort,
  updateDuration,
  updateObjectSimplifer,
} from './course.utilities'
import Review from '../Review/review.shema&model'
import { Types } from 'mongoose'

const createCourse = async (courseData: TCourse, id: Types.ObjectId) => {
  if (!courseData.durationInWeeks) {
    const duration = durationCalculator(
      courseData.startDate,
      courseData.endDate,
    ) //calculate duration in week

    courseData.durationInWeeks = duration
  }
  courseData.createdBy = id

  const newCourse = await Course.create(courseData)
  const result = await Course.findById(newCourse._id, {
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
  })
  return result
}

const getAll = async (query: Record<string, unknown>) => {
  const filter = queryFilter(query)
  const sort = querySort(query)
  const pagination = queryPagination(query)

  const result = await Course.find(filter, {
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
  })
    .sort(sort as string)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .populate({
      path: 'createdBy',
      select: '_id username email role',
    })

  let total
  await Course.countDocuments(filter).then((count) => (total = count))
  return {
    courses: result,
    total,
  }
}

const updateCourse = async (id: string, updateData: Partial<TCourse>) => {
  if (updateData.startDate || updateData.endDate) {
    const duration = await updateDuration(id, updateData)
    if (typeof duration === 'number') {
      updateData.durationInWeeks = duration
    }
  }
  const { details, tags, ...remains } = updateData
  const updateSimplifiedData: Record<string, unknown> = { ...remains }
  if (details) {
    const simplifiedData = updateObjectSimplifer(details)
    await Course.findByIdAndUpdate(id, simplifiedData, {
      new: true,
    })
  }
  await Course.findByIdAndUpdate(id, updateSimplifiedData, {
    new: true,
  })

  if (tags && tags.length > 0) {
    const newTags = await arraySimplifier(id, tags)
    await Course.findByIdAndUpdate(id, { tags: newTags })
  }

  const finalUpdatedData = await Course.findById(id, {
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
  }).populate({
    path: 'createdBy',
    select: '_id username email role',
  })
  return finalUpdatedData
}

const getBestCourse = async () => {
  const bestCourse = await Course.find({})
    .sort({ averageRating: -1 })
    .limit(1)
    .select('-totalRating -__v')

  const { averageRating, reviewCount, _id } = bestCourse[0]
  const course = await Course.findById(_id, {
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
  }).populate({
    path: 'createdBy',
    select: '_id username email role',
  })
  const result = {
    course,
    averageRating,
    reviewCount,
  }
  return result
}

const getCourseWithReviews = async (id: string) => {
  const course = await Course.findById(id, {
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
  }).populate({
    path: 'createdBy',
    select: '_id username email role',
  })

  const reviews = await Review.find({ courseId: id }, { __v: 0 }).populate({
    path: 'createdBy',
    select: '_id username email role',
  })

  const result = {
    course,
    reviews,
  }

  return result
}

export const courseServices = {
  createCourse,
  getAll,
  updateCourse,
  getCourseWithReviews,
  getBestCourse,
}
