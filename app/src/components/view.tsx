import React from 'react'
import { useContext } from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { AppContext } from '../contexts'

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const BodyView = (props: ViewProps) => {
  const { colors } = useContext(AppContext)
  const Container = styled.View`
    background-color: ${colors.body};
    height: 100%;
  `
  return <Container {...props} />
}
