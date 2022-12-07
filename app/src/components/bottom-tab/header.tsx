import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../styles'
import styled from 'styled-components/native'
import { Text } from '../text'
import { AntDesign } from '@expo/vector-icons'
import { Button } from '../button'

const Row = styled.View`
  padding: 22px 8px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${COLORS.WHITE};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${COLORS.BLACK_BERRY};
  gap: 32px;
`

const LeftItem = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`

const CenterItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const RightItem = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`

export const BottomTabHeader = (props: BottomTabHeaderProps) => {
  const { route, navigation, options } = props
  return (
    <Row>
      <LeftItem>
        <Button btnType="link" onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={17} color="black" /> Back
        </Button>
      </LeftItem>
      <CenterItem>
        <Text h6>{props.route.name}</Text>
      </CenterItem>
      <RightItem>
        <Button btnType="link" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
      </RightItem>
    </Row>
  )
}
