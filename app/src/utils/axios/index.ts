import axios, { AxiosError } from 'axios'
import Constants from 'expo-constants'

const BACK_END_URL = Constants?.expoConfig?.extra?.backendUrl

export const getHttp = async (url?: string) => {
  try {
    const { data } = await axios.get(`${BACK_END_URL}${url || '/'}`)
    return data
  } catch (error: any) {
    console.log('fetching error :>> ', error.message)

    return {
      error: error.message,
    }
  }
}
