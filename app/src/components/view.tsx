import React from 'react'
import { useContext } from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { AppContext } from '@contexts'
import { IColors } from '@interfaces'

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Container = styled.View<IColors>`
  background-color: ${({ colors }) => colors.body};
  height: 100%;
`

export const BodyView = (props: ViewProps) => {
  const { colors } = useContext(AppContext)

  return <Container colors={colors} {...props} />
}
