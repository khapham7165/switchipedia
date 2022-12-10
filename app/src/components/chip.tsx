import React, { ReactNode } from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../styles'
import { Button } from './button'
import { Text } from './text'

type BadgeProps = {
  children?: ReactNode
}

export const Container = styled.View`
  min-width: 60px;
  height: 32px;
  border-radius: 4px;
  padding: 0px 8px;
  border: 2px solid ${COLORS.BLACK_BERRY};
  background-color: ${COLORS.WHITE};
  color: ${COLORS.BLACK_BERRY};
  align-items: center;
  justify-content: center;
  margin: 2px;
`

export const CustomButton = styled(Button)`
  flex: 0;
`

export const Chip = (props: BadgeProps) => {
  return (
    <Container>
      <Text b3>{props.children}</Text>
    </Container>
  )
}
