import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../Styles'
import { Text } from './text'
import styled from 'styled-components/native'

type ButtonProps = TouchableWithoutFeedbackProps & {
  btnType?: 'primary' | 'secondary'
  iconOnly?: boolean
  icon?: any
  leftIcon?: boolean
  rightIcon?: boolean
  active?: boolean
  loading?: boolean
}

const ButtonContent = styled(View)`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
`

export const Button = (props: ButtonProps) => {
  const {
    leftIcon = true,
    rightIcon = true,
    active,
    btnType = 'primary',
  } = props

  const [isTouch, setIsTouch] = useState(false)

  return (
    <TouchableWithoutFeedback
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
        style={{
          backgroundColor: props.disabled
            ? COLORS.DISABLED
            : isTouch || active
            ? COLORS.GOJI_BERRY
            : COLORS.BLACK_BERRY,
          padding: active ? 2 : 1,
          borderRadius: 4,
        }}
      >
        <View
          style={
            props.disabled ? styles[`${btnType}Disabled`] : styles[btnType]
          }
        >
          <Text
            style={{
              color: (props.disabled
                ? styles[`${btnType}Disabled`]
                : styles[btnType]
              ).color,
            }}
            b1
          >
            {props.children}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const defaultButtonTypeStyle: TouchableWithoutFeedbackProps['style'] = {
  minWidth: 358,
  minHeight: 56,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  opacity: 1,
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
})
