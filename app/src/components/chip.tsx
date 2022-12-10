import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components/native'
import { AppContext } from '../contexts'
import { COLORS } from '../styles'
import { Button } from './button'
import { Text } from './text'

type BadgeProps = {
  children?: ReactNode
}

export const CustomButton = styled(Button)`
  flex: 0;
`

export const Chip = (props: BadgeProps) => {
  const { colors } = useContext(AppContext)
  const Container = styled.View`
    min-width: 60px;
    height: 32px;
    border-radius: 4px;
    padding: 0px 8px;
    border: 2px solid ${colors.border};
    background-color: ${colors.background};
    color: ${colors.text};
    align-items: center;
    justify-content: center;
    margin: 2px;
  `

  return (
    <Container>
      <Text b3>{props.children}</Text>
    </Container>
  )
}
