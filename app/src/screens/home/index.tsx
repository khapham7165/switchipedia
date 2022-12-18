import React from 'react'
import { ScrollView, ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { BodyView, Text } from '@components'
import { SwitchType } from '@interfaces'
import { TopSwitches } from './top-switches'

type HomeProps = ViewProps

const Container = styled(BodyView)`
  padding: 16px 12px;
`
export const Home = (props: HomeProps) => {
  return (
    <ScrollView>
      <Container {...props}>
        <Text h1>Welcome back!</Text>
        <TopSwitches
          title={'Latest'}
          lgCards
          verticalCards={true}
          horizontalScroll={true}
        />
        <TopSwitches
          title={'Newest Linear Switches'}
          type={SwitchType.Linear}
        />
        <TopSwitches
          title={'Newest Tactile Switches'}
          type={SwitchType.Tactile}
        />
      </Container>
    </ScrollView>
  )
}
