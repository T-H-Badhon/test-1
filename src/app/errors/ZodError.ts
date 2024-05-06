import { ZodError, ZodIssue } from 'zod'

export const ZodErrorMessageGenerator = (err: ZodError): string => {
  //  = err.issues.map((issue:ZodIssue)=>errorMessage+" "+issue.path[issue.path.length-1]+issue.message)
  let errorMessage: string = ''
  err.issues.forEach(
    (issue: ZodIssue) =>
      (errorMessage =
        errorMessage +
        `${issue?.path[issue.path.length - 1]} is ${issue.message}. `),
  )
  return errorMessage
}

// errorMessage + `${issue?.path[issue.path.length - 1]} ${issue.message}`,
