import { Router } from 'express'
import {
  BestCourseRoutes,
  CoursesRoutes,
} from '../modules/course/course.routes'
import { CategoryRoutes } from '../modules/categories/categories.routes'
import { ReviewRoutes } from '../modules/Review/review.routes'
import { authRoutes } from '../modules/auth/auth.routes'
const router = Router()

const moduleRoutes = [
  {
    path: '/courses',
    route: CoursesRoutes,
  },
  {
    path: '/course',
    route: BestCourseRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
