import express from 'express'
import validate from '../../middlewares/ValidationFunction'
import { reviewValidationSchema } from './review.validation'
import { reviewControllers } from './review.controllers'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post(
  '/',
  auth('user'),
  validate(reviewValidationSchema),
  reviewControllers.giveReview,
)

export const ReviewRoutes = router
