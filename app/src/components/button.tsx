import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../styles'
import { Text } from './text'
import styled from 'styled-components/native'
import { useMemo } from 'react'

type ButtonProps = TouchableWithoutFeedbackProps & {
  btnType?: 'primary' | 'secondary' | 'link'
  iconOnly?: boolean
  icon?: any
  active?: boolean
  loading?: boolean
  disabled?: boolean
}

const Touchable = styled.TouchableWithoutFeedback`
  cursor: pointer;
`

export const Button = (props: ButtonProps) => {
  const { active, btnType = 'primary', disabled = false } = props

  const [isTouch, setIsTouch] = useState(false)

  return (
    <Touchable
      {...props}
      onPressIn={(e) => {
        setIsTouch(true)
        props.onPressIn?.(e)
      }}
      onPressOut={(e) => {
        setIsTouch(false)
        props.onPressOut?.(e)
      }}
    >
      <View
        style={
          btnType !== 'link' && {
            backgroundColor: props.disabled
              ? COLORS.DISABLED
              : isTouch || active
              ? COLORS.GOJI_BERRY
              : COLORS.BLACK_BERRY,
            padding: active ? 2 : 1,
            borderRadius: 4,
          }
        }
      >
        <View
          style={
            disabled
              ? (styles[`${btnType}Disabled`] as StyleProp<ViewStyle>)
              : (styles[btnType] as StyleProp<ViewStyle>)
          }
        >
          <Text
            style={{
              color: (props.disabled
                ? styles[`${btnType}Disabled`]
                : styles[btnType]
              ).color,
            }}
            b1={btnType !== 'link'}
            b2={btnType === 'link'}
          >
            {props.children}
          </Text>
        </View>
      </View>
    </Touchable>
  )
}

const defaultButtonTypeStyle: TouchableWithoutFeedbackProps['style'] = {
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderRadius: 4,
}

const styles = StyleSheet.create({
  primary: {
    ...defaultButtonTypeStyle,
    backgroundColor: COLORS.BLACK_BERRY,
    color: COLORS.WHITE,
    borderColor: COLORS.BLACK_BERRY,
  },
  secondary: {
    ...defaultButtonTypeStyle,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK_BERRY,
    borderColor: COLORS.BLACK_BERRY,
  },
  primaryDisabled: {
    ...defaultButtonTypeStyle,
    color: COLORS.WHITE,
    backgroundColor: COLORS.DISABLED,
    borderColor: COLORS.DISABLED,
  },
  secondaryDisabled: {
    ...defaultButtonTypeStyle,
    color: COLORS.DISABLED,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.DISABLED,
  },
  link: { backgroundColor: COLORS.WHITE, color: COLORS.BLACK_BERRY },
  linkDisabled: { color: COLORS.DISABLED },
})

export const HugButton = styled(Button)`
  width: 100;
`
