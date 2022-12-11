import React, { useContext, useEffect } from 'react'
import { View, ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { AppContext } from '../../contexts'
import { useFetch } from '../../hooks'
import { SwitchData } from '../../interfaces'
import { SwitchCard } from '../switch-list/switch-card'

type TopSwitchesProps = ViewProps

const ScrollView = styled.ScrollView`
  margin: 0 -12px;
  padding: 8px;
`

const SwitchCardContainer = styled.View`
  width: 176px;
  padding: 4px;
`
export const TopSwitches = (props: TopSwitchesProps) => {
  const [
    fetchTopSwitches,
    { data: topSwitchesData, loading: topSwitchesLoading },
  ] = useFetch('/switch/top-home')

  const { colors } = useContext(AppContext)

  useEffect(() => {
    fetchTopSwitches()
  }, [])

  return (
    <View>
      <ScrollView horizontal>
        {topSwitchesData?.map((item: SwitchData) => (
          <SwitchCardContainer key={item._id}>
            <SwitchCard
              sm
              type={'vertical'}
              item={item}
              loading={topSwitchesLoading}
            />
          </SwitchCardContainer>
        ))}
      </ScrollView>
    </View>
  )
}
