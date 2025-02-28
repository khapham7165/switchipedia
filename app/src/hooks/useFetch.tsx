import { useCallback, useState } from 'react'
import { getHttp } from '@utils'

export const useFetch: (
  url: string,
  initialQuery?: Record<string, any>
) => [(newQuery?: Record<string, any>) => void, { data: any; loading?: boolean; error?: string }] = (
  url,
  initialQuery
) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const getData = useCallback((newQuery?: Record<string, any>) => {
    setLoading(true)
    // Use newQuery if provided, otherwise fall back to initialQuery
    const queryToUse = newQuery !== undefined ? newQuery : initialQuery
    
    getHttp(url, queryToUse)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(error.message)
      })
  }, [url, initialQuery])

  return [getData, { data, loading, error }]
}