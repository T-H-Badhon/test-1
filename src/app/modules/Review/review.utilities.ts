import { ClientSession } from 'mongodb'
import Course from '../course/course.schema&model'
import { TReview } from './review.interface'

export const updateCourse = async (
  newReview: TReview,
  session: ClientSession | undefined,
) => {
  const course = await Course.findById(newReview.courseId).select(
    'totalRating averageRating reviewCount',
  )

  if (course) {
    course.totalRating = course?.totalRating + newReview.rating
    course.reviewCount = course?.reviewCount + 1
    course.averageRating = parseFloat(
      (course?.totalRating / course?.reviewCount).toFixed(1),
    )
    const updatedCourse = await Course.findByIdAndUpdate(
      newReview.courseId,
      course,
      { new: true, session },
    )
    return updatedCourse
  }
}
