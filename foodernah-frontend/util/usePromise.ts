import { useState, useEffect } from 'react'

export const usePromise = <T>(promise: () => Promise<T>): T | null => {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    promise().then(value => setValue(value))
  }, [])

  return value
}
