import { useCallback, useState } from 'react'
import { getHttp } from '../utils'

export const useFetch: (
  url: string,
  query?: Record<string, any>
) => [() => void, { data: any; loading?: boolean; error?: string }] = (
  url,
  query
) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const getData = useCallback(() => {
    setLoading(true)
    getHttp(url, query)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => setError(error.message))
  }, [url, setLoading, setData, getHttp])

  return [getData, { data, loading, error }]
}
