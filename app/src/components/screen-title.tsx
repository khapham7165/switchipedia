import React from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { Text } from './text'

type ScreenTitleProps = ViewProps

const Container = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 12px;
`

export const ScreenTitle = (props: ScreenTitleProps) => {
  return (
    <Container {...props}>
      <Text h2>{props.children}</Text>
    </Container>
  )
}
