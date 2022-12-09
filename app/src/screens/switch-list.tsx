import React, { useEffect } from 'react'
import { BodyView, Card } from '../components'
import { useFetch } from '../hooks'
import { SwitchData } from '../interfaces'
import { capitalize } from 'lodash'
import styled from 'styled-components/native'
import { useWindowDimensions } from 'react-native'
import { BREAK_POINT } from '../constants'

const Container = styled(BodyView)`
  align-items: center;
`

const ItemsContainer = styled.View`
  padding: 20px 16px;
  max-width: 1920px;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`
const SwitchesList = styled.ScrollView``

const SwitchItem = styled(Card)``

const CardContainer = styled.View`
  padding: 4px;
  flex: 1 1 400px;
`

type SwitchListProps = any

export const SwitchList = (props: SwitchListProps) => {
  const { width } = useWindowDimensions()
  const [
    fetchSwitches,
    { data: switches, loading: fetchSwitchLoading, error: fetchSwitchError },
  ] = useFetch('/switch/all')

  useEffect(() => {
    fetchSwitches()
  }, [])

  return (
    <SwitchesList>
      <Container>
        <ItemsContainer>
          {(fetchSwitchLoading
            ? [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }]
            : switches
          )?.map((item: SwitchData) => (
            <CardContainer key={item._id}>
              <SwitchItem
                loading={fetchSwitchLoading}
                type={width > BREAK_POINT.LAPTOP ? 'vertical' : 'horizontal'}
                title={`${item.brand && capitalize(item.brand.name) + ' - '}${
                  item.title
                }`}
                description={item.notes}
              />
            </CardContainer>
          ))}
        </ItemsContainer>
      </Container>
    </SwitchesList>
  )
}
