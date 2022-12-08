import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Text } from '../components'
import { getHttp } from '../utils'
import { SwitchData } from '../interfaces'

type SwitchListProps = any
export const SwitchList = (props: SwitchListProps) => {
  const [switches, setSwitches] = useState<SwitchData[]>()

  const fetchSwitches = useCallback(async () => {
    const data = await getHttp('/switch/all')
    if (data.error) {
      // handle error
      return
    }
    setSwitches(data)
  }, [])

  useEffect(() => {
    fetchSwitches()
  }, [])

  return (
    <ScrollView>
      {switches?.map((item) => (
        <Text key={item._id}>{item.title}</Text>
      ))}
    </ScrollView>
  )
}
