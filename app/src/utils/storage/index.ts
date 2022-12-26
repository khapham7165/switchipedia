import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (
  key: string,
  value: string | Record<string, any>
) => {
  const storedValue = typeof value === 'string' ? value : value.stringify()

  try {
    await AsyncStorage.setItem(key, storedValue)
  } catch (e) {
    console.error(
      `Error while storing key: ${key} | value: ${storedValue} :>> `,
      e
    )

    return null
  }
}

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.error(`Error while getting key: ${key} :>> `, e)

    return null
  }
}
