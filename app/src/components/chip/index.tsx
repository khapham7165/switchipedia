import React, { ReactNode, useContext } from 'react'
import { AppContext } from '@contexts'
import { Text } from '@components'
import { Container } from './style'

type BadgeProps = {
  children?: ReactNode
}

export const Chip = (props: BadgeProps) => {
  const { colors } = useContext(AppContext)

  return (
    <Container colors={colors}>
      <Text b3>{props.children}</Text>
    </Container>
  )
}
