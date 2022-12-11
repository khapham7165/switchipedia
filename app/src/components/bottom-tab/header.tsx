import { BottomTabHeaderProps as NativeProps } from '@react-navigation/bottom-tabs'
import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components/native'
import { Text } from '../text'
import { AntDesign } from '@expo/vector-icons'
import { Button } from '../button'
import { SCREEN } from '../../constants'
import { Image } from '../image'
import { AppContext } from '../../contexts'

type BottomTabHeaderProps = NativeProps & {
  leftButton?: boolean
  rightButton?: boolean
  title?: string | ReactNode
}

export const BottomTabHeader = (props: BottomTabHeaderProps) => {
  const {
    route,
    navigation,
    options,
    leftButton = true,
    rightButton = true,
    title,
  } = props

  const { colors } = useContext(AppContext)

  const Row = styled.View`
    padding: 12px 8px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${colors.background};
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: ${colors.border};
    gap: 32px;
    height: 58px;
  `

  const LeftItem = styled.View`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    background-color: ${colors.background};
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
    background-color: ${colors.background};
  `

  return (
    <Row>
      <LeftItem>
        {leftButton && (
          <Button btnType="link" onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={17} color={colors.text} />
            Back
          </Button>
        )}
      </LeftItem>
      <CenterItem>
        {title ? title : <Text h6>{props.route.name}</Text>}
      </CenterItem>
      <RightItem>
        {rightButton && (
          <Button btnType="link" onPress={() => navigation.jumpTo(SCREEN.HOME)}>
            <Image
              style={{ tintColor: colors.text }}
              icon
              source={require('../../../assets/icon.png')}
            />
          </Button>
        )}
      </RightItem>
    </Row>
  )
}
