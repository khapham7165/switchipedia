import React, { useEffect } from 'react'
import { BodyView, Card, Image } from '../../components'
import { useFetch } from '../../hooks'
import { SwitchData } from '../../interfaces'
import { capitalize } from 'lodash'
import styled from 'styled-components/native'
import { useWindowDimensions } from 'react-native'
import { BREAK_POINT } from '../../constants'
import { SwitchCard } from './switch-card'

const Container = styled(BodyView)`
  align-items: center;
`

const ItemsContainer = styled.View`
  padding: 8px;
  max-width: 1920px;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SwitchesList = styled.ScrollView``

type SwitchListProps = any

export const SwitchList = (props: SwitchListProps) => {
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
          )?.map((item: SwitchData) => {
            return (
              <SwitchCard
                key={item._id}
                item={item}
                loading={fetchSwitchLoading}
              />
            )
          })}
        </ItemsContainer>
      </Container>
    </SwitchesList>
  )
}
