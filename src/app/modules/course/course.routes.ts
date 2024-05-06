import express from 'express'
import { courseControllers } from './course.controllers'
import validate from '../../middlewares/ValidationFunction'
import {
  courseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/',
  auth('admin'),
  validate(courseValidationSchema),
  courseControllers.createCourse,
)

router.get('/', courseControllers.getAll)

router.get('/:courseId/reviews', courseControllers.getCourseWithReviews)

router.put(
  '/:courseId',
  auth('admin'),
  validate(updateCourseValidationSchema),
  courseControllers.updateCourse,
)

export const CoursesRoutes = router

const router2 = express.Router()

router2.get('/best', courseControllers.getBestCourse)

export const BestCourseRoutes = router2
