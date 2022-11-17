import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  StyleSheet,
  View,
} from 'react-native'
import {
  Button as AntButton,
  ButtonProps as AtnButtonProps,
  Image,
} from 'antd-mobile'
import React, { useState } from 'react'
import { COLORS } from '../Styles'
import { Text } from './text'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { s } from '../Styles'

type ButtonProps = AtnButtonProps & {
  type?: 'primary' | 'secondary' | 'icon' | 'link'
  disabled?: boolean
  iconOnly?: boolean
  icon?: any
  leftIcon?: boolean
  rightIcon?: boolean
  active?: boolean
}

export const Button = (props: ButtonProps) => {
  const { leftIcon = true, rightIcon = true, active } = props

  const [isTouch, setIsTouch] = useState(false)
  return (
    <View
      style={{
        backgroundColor: isTouch ? COLORS.GOJI_BERRY : COLORS.BLACK_BERRY,
        padding: active ? 2 : 1,
        borderRadius: 4,
      }}
    >
      <AntButton
        {...props}
        onMouseUp={() => {
          setIsTouch(false)
        }}
        onMouseDown={() => {
          setIsTouch(true)
        }}
        style={{
          ...styles.primary,
        }}
      >
        <View style={styles.container}>
          {leftIcon && <ArrowLeftOutlined />}
          <Text b1>{props.children}</Text>
          {rightIcon && <ArrowRightOutlined />}
        </View>
      </AntButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primary: {
    borderRadius: 4,
    minWidth: 358,
    minHeight: 56,
    color: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLACK_BERRY,
    borderWidth: 2,
    borderColor: COLORS.BLACK_BERRY,
  },
})
