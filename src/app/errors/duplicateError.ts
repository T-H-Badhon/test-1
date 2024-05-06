// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DuplicateErrorMessageGenerator = (err: any) => {
  const firstProperty = Object.keys(err.keyValue)[0]

  return `${firstProperty} already exsist!`
}

// here only title is unique.
//So we can directly use "title already exsist!"
// But here i use dynamic system
