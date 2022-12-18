import React, { useCallback, useContext, useEffect } from 'react'
import { useWindowDimensions, ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { Text } from '@components'
import { AppContext } from '@contexts'
import { useFetch } from '@hooks'
import { SwitchData, SwitchType } from '@interfaces'
import { SwitchCard } from '../switch-list/switch-card'

type TopSwitchesProps = ViewProps & {
  title?: string
  type?: SwitchType
  lgCards?: boolean
  horizontalScroll?: boolean
  verticalCards?: boolean
}

const ScrollView = styled.ScrollView`
  margin: 0 -12px;
  padding: 8px;
`

const Container = styled.View`
  margin-top: 24px;
`

const SwitchCardContainer = styled.View<{
  lgCards?: boolean
  verticalCards?: boolean
}>`
  width: ${({ verticalCards, lgCards }) =>
    !verticalCards ? '100%' : lgCards ? '356px' : '176px'};
  padding: 4px;
`

export const TopSwitches = (props: TopSwitchesProps) => {
  const {
    title,
    type,
    lgCards,
    horizontalScroll = false,
    verticalCards = false,
  } = props
  const { width } = useWindowDimensions()
  const { colors } = useContext(AppContext)

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
            onPress={() => console.log('press card :>> ')}
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
