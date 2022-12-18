import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components/native'
import { AppContext } from '@contexts'
import { IColors } from '@interfaces'
import { Button } from './button'
import { Text } from './text'

type BadgeProps = {
  children?: ReactNode
}

export const CustomButton = styled(Button)`
  flex: 0;
`

const Container = styled.View<IColors>`
  min-width: 60px;
  height: 32px;
  border-radius: 4px;
  padding: 0px 8px;
  border: 2px solid ${({ colors }) => colors.border};
  background-color: ${({ colors }) => colors.background};
  color: ${({ colors }) => colors.text};
  align-items: center;
  justify-content: center;
  margin: 2px;
`

export const Chip = (props: BadgeProps) => {
  const { colors } = useContext(AppContext)

  return (
    <Container colors={colors}>
      <Text b3>{props.children}</Text>
    </Container>
  )
}
