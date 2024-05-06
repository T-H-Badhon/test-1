import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utilities/catchAsync'
import { AppError } from '../errors/AppError'
import { config } from '../config/config'
import { User } from '../modules/user/user.schema$model'
import { isPasswordExpaired } from '../utilities/checkPasswordExpire'
import { AuthError } from '../errors/AuthError'

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    let decoded
    try {
      decoded = jwt.verify(token, config.access_secrate as string) as JwtPayload
    } catch (err) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    const { _id, role, iat } = decoded as JwtPayload

    const loginUser = await User.findById(_id)

    if (!loginUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
    }

    if (
      loginUser.passwordChangedAt &&
      isPasswordExpaired(loginUser.passwordChangedAt, iat as number)
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Login Expired!. Please login again.',
      )
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
