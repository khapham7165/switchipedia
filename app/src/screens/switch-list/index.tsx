import React, { useEffect } from 'react'
import { BodyView, ScreenTitle, Text } from '../../components'
import { useFetch } from '../../hooks'
import { SwitchData } from '../../interfaces'
import styled from 'styled-components/native'
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

const ScreenTitleView = styled(ScreenTitle)`
  padding-left: 4px;
  padding-right: 4px;
`
type SwitchListProps = any

export const SwitchList = (props: SwitchListProps) => {
  const [
    fetchSwitches,
    { data: switches, loading: fetchSwitchLoading, error: fetchSwitchError },
  ] = useFetch('/switch/all')

  useEffect(() => {
    fetchSwitches()
  }, [fetchSwitches])

  return (
    <SwitchesList>
      <Container>
        <ItemsContainer>
          <ScreenTitleView>Home</ScreenTitleView>
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
