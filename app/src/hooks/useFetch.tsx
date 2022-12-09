import { useCallback, useState } from 'react'
import { getHttp } from '../utils'

export const useFetch: (
  url: string
) => [() => void, { data: any; loading?: boolean; error?: string }] = (url) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const getData = useCallback(() => {
    setLoading(true)
    getHttp(url)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => setError(error.message))
  }, [url])

  return [getData, { data, loading, error }]
}
