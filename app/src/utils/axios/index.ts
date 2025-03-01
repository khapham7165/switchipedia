import axios from 'axios'
import Constants from 'expo-constants'

export const BACK_END_URL = Constants?.expoConfig?.extra?.backendUrl
export const SWITCH_IMAGE_URL = Constants?.expoConfig?.extra?.switchImageUrl

function encodeQueryData(data?: Record<string, any>) {
  if (!data) return ''

  const ret = []
  for (const d in data)
    data[d] &&
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  return '?' + ret.join('&')
}

export const getHttp = async (url?: string, query?: Record<string, any>) => {
  const getUrl = `${BACK_END_URL}${(url ?? '/') + encodeQueryData(query)}`
  const { data } = await axios.get(getUrl)

  return data
}
