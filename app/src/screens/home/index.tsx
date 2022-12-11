import React from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { BodyView, Text } from '../../components'
import { TopSwitches } from './top-switches'

type HomeProps = ViewProps

const Container = styled(BodyView)`
  padding: 16px 12px;
`
export const Home = (props: HomeProps) => {
  return (
    <Container {...props}>
      <Text h1>Hi there!</Text>
      <Text h2>Latest</Text>
      <TopSwitches />
    </Container>
  )
}
