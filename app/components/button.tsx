import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  Button as AntButton,
  ButtonProps as AtnButtonProps,
  Image,
} from 'antd-mobile'
import React, { CSSProperties, useState } from 'react'
import { COLORS } from '../Styles'
import { Text } from './text'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

type ButtonProps = AtnButtonProps & {
  btnType?: 'primary' | 'secondary'
  disabled?: boolean
  iconOnly?: boolean
  icon?: any
  leftIcon?: boolean
  rightIcon?: boolean
  active?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    leftIcon = true,
    rightIcon = true,
    active,
    btnType = 'primary',
  } = props

  const [isTouch, setIsTouch] = useState(false)

  return (
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
      <AntButton
        {...props}
        onMouseDown={() => {
          setIsTouch(true)
        }}
        onMouseUp={() => {
          setIsTouch(false)
        }}
        style={props.disabled ? styles[`${btnType}Disabled`] : styles[btnType]}
      >
        <View style={styles.content}>
          {leftIcon && <ArrowLeftOutlined />}
          <Text b1>{props.children}</Text>
          {rightIcon && <ArrowRightOutlined />}
        </View>
      </AntButton>
    </View>
  )
}

const defaultButtonTypeStyle: any = {
  minWidth: 358,
  minHeight: 56,
  borderWidth: 2,
  opacity: 1,
  borderRadius: 4,
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
