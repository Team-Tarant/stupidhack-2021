export type FoodernahError = {
  message: string
  status: number
}

export const error = (message: string, status: number = 500) => (
  e: any
): FoodernahError => {
  console.error(e)
  return {
    message,
    status,
  }
}
