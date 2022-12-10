import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native'
import React, { useContext, useState } from 'react'
import { Text } from './text'
import styled from 'styled-components/native'
import { useMemo } from 'react'
import { AppContext } from '../contexts'

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
  const { colors } = useContext(AppContext)
  const [isTouch, setIsTouch] = useState(false)

  const defaultButtonTypeStyle: TouchableWithoutFeedbackProps['style'] =
    useMemo(
      () => ({
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 4,
      }),
      []
    )

  const styles = StyleSheet.create({
    primary: {
      ...defaultButtonTypeStyle,
      backgroundColor: colors.buttonPrimary,
      color: colors.textPrimaryButton,
      borderColor: colors.borderButtonPrimary,
    },
    secondary: {
      ...defaultButtonTypeStyle,
      backgroundColor: colors.button,
      color: colors.text,
      borderColor: colors.border,
    },
    primaryDisabled: {
      ...defaultButtonTypeStyle,
      color: colors.textPrimaryButton,
      backgroundColor: colors.disabled,
      borderColor: colors.disabled,
    },
    secondaryDisabled: {
      ...defaultButtonTypeStyle,
      color: colors.disabled,
      backgroundColor: colors.button,
      borderColor: colors.disabled,
    },
    link: { backgroundColor: colors.background, color: colors.text },
    linkDisabled: { color: colors.disabled },
  })

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
              ? colors.disabled
              : isTouch || active
              ? colors.active
              : colors.shadow,
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

export const HugButton = styled(Button)`
  width: 100;
`
