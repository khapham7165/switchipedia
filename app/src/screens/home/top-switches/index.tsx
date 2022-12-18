import React, { useCallback, useEffect } from 'react'
import { useWindowDimensions, ViewProps } from 'react-native'
import { Text } from '@components'
import { useFetch } from '@hooks'
import { SwitchData, SwitchType } from '@interfaces'
import { SwitchCard } from '../../switch-list/switch-card'
import { Container, SwitchCardContainer, ScrollView } from './style'
import { SCREEN } from '../../../constants/screens'
import { useNavigation } from '@react-navigation/native'

type TopSwitchesProps = ViewProps & {
  title?: string
  type?: SwitchType
  lgCards?: boolean
  horizontalScroll?: boolean
  verticalCards?: boolean
}

export const TopSwitches = (props: TopSwitchesProps) => {
  const {
    title,
    type,
    lgCards,
    horizontalScroll = false,
    verticalCards = false,
  } = props
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  const [
    fetchTopSwitches,
    { data: topSwitchesData, loading: topSwitchesLoading },
  ] = useFetch('/switch/top-home', { type, amount: type ? 3 : 5 })

  useEffect(() => {
    fetchTopSwitches()
  }, [])

  const renderSwitches = useCallback(
    () =>
      (topSwitchesData
        ? topSwitchesData
        : [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }]
      ).map((item: SwitchData) => (
        <SwitchCardContainer
          key={item._id}
          lgCards={lgCards}
          verticalCards={verticalCards}
        >
          <SwitchCard
            onPress={() => navigation.navigate(SCREEN.SWITCH_DETAIL)}
            sm={!lgCards}
            type={verticalCards ? 'vertical' : 'horizontal'}
            item={item}
            loading={topSwitchesLoading}
          />
        </SwitchCardContainer>
      )),
    [topSwitchesData, topSwitchesLoading, width]
  )

  return (
    <Container>
      <Text h2>{title}</Text>
      <ScrollView horizontal={horizontalScroll}>{renderSwitches()}</ScrollView>
    </Container>
  )
}
