import express from 'express'
import { categoryControllers } from './categories.controllers'
import validate from '../../middlewares/ValidationFunction'
import { categoryValidationSchema } from './categories.validation'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/',
  auth('admin'),
  validate(categoryValidationSchema),
  categoryControllers.createCategory,
)
router.get('/', categoryControllers.getAll)

export const CategoryRoutes = router
