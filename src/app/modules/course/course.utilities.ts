import { TCourse, TDetails, TTag } from './course.interface'
import Course from './course.schema&model'

export const durationCalculator = (start: string, end: string) => {
  const startDate: Date = new Date(start)
  const endDate: Date = new Date(end)

  const timeDifferenceInMiliSecond: number =
    endDate.getTime() - startDate.getTime()

  const weeks: number = Math.ceil(
    timeDifferenceInMiliSecond / (1000 * 60 * 60 * 24 * 7),
  )

  return weeks
}

export const updateDuration = async (
  id: string,
  updateData: Partial<TCourse>,
) => {
  if (updateData.startDate && updateData.endDate) {
    updateData.durationInWeeks = durationCalculator(
      updateData.startDate,
      updateData.endDate,
    )
  } else if (updateData.startDate) {
    const previousData = await Course.findById(id)

    if (previousData) {
      updateData.durationInWeeks = durationCalculator(
        updateData.startDate,
        previousData.endDate,
      )
    } else {
      throw new Error('Update unSuccesfull !')
    }
  } else if (updateData.endDate) {
    const previousData = await Course.findById(id)

    if (previousData) {
      updateData.durationInWeeks = durationCalculator(
        previousData.startDate,
        updateData.endDate,
      )
    } else {
      throw new Error('Update unSuccesfull !')
    }
  }
}

export const updateObjectSimplifer = (details: Partial<TDetails>) => {
  const simplifiedData: Record<string, unknown> = {}

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      simplifiedData[`details.${key}`] = value
    }
  }

  return simplifiedData
}

export const arraySimplifier = async (id: string, tags: [TTag]) => {
  const deletedTagsName = tags
    .filter((tag) => tag.isDeleted === true)
    .map((tag) => tag.name)
  const updatedTags = tags.filter((tag) => tag.isDeleted === false)
  const updatedTagsName = updatedTags.map((tag) => tag.name)
  const courseData = await Course.findById(id)

  const currentTags = courseData?.tags

  currentTags?.forEach((tag) => {
    if (
      !deletedTagsName.includes(tag.name) &&
      !updatedTagsName.includes(tag.name)
    ) {
      updatedTags.push(tag)
    }
  })

  return updatedTags
}

export const queryFilter = (query: Record<string, unknown>) => {
  const filter = { ...query }
  const nonFilterFields = [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
    'tags',
    'level',
  ]

  nonFilterFields.forEach((field) => delete filter[field])

  if (query.maxPrice && query.minPrice) {
    const price = {
      price: {
        $gte: Number(query.minPrice),
        $lte: Number(query.maxPrice),
      },
    }
    filter['price'] = price.price
  }

  if (query.startDate) {
    const sDate = query.startDate
    const startDate = {
      startDate: { $gte: sDate },
    }
    filter['startDate'] = startDate.startDate
  }
  if (query.endDate) {
    const eDate = query.endDate
    const endDate = {
      endDate: { $lte: eDate },
    }
    filter['endDate'] = endDate.endDate
  }

  if (query.tags) {
    filter['tags.name'] = query.tags
  }
  if (query.level) {
    filter['details.level'] = query.level
  }

  return filter
}

export const querySort = (query: Record<string, unknown>) => {
  if (query.sortOrder === 'desc') {
    const sort = `-${query.sortBy}`

    return sort
  }
  return query.sortBy
}

export const queryPagination = (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 2

  const skip = limit * (page - 1)

  return {
    skip,
    limit,
  }
}
