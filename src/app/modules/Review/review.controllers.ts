import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { reviewServices } from './review.services'

const giveReview = catchAsync(async (req, res) => {
  const reviewData = req.body
  const id = req.user._id

  const result = await reviewServices.giveReview(reviewData, id)

  response(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

export const reviewControllers = {
  giveReview,
}
