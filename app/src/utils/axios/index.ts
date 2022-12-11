import axios, { AxiosError } from 'axios'
import Constants from 'expo-constants'

const BACK_END_URL = Constants?.expoConfig?.extra?.backendUrl

export const getHttp = async (url?: string) => {
  const { data } = await axios.get(`${BACK_END_URL}${url || '/'}`)

  return data
}
