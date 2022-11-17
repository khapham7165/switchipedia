import React from 'react'
import {
  Text as NativeText,
  ViewProps,
  TextProps as NativeTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native'

type TextProps = NativeTextProps & {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean

  p1?: boolean
  p2?: boolean
  p3?: boolean

  b1?: boolean
  b2?: boolean
  b3?: boolean
  b3Sm?: boolean

  l1?: boolean
  l2?: boolean
  l3?: boolean
  l4?: boolean
  l5?: boolean

  bold?: boolean
  italic?: boolean
}

export const Text = (props: TextProps) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p1,
    p2,
    p3,
    b1,
    b2,
    b3,
    b3Sm,
    l1,
    l2,
    l3,
    l4,
    l5,
    bold,
    italic,
  } = props

  return (
    <NativeText
      {...props}
      style={{
        ...styles.default,
        ...(h1 && styles.h1),
        ...(h2 && styles.h2),
        ...(h3 && styles.h3),
        ...(h4 && styles.h4),
        ...(h5 && styles.h5),
        ...(h6 && styles.h6),
        ...(p1 && styles.p1),
        ...(p2 && styles.p2),
        ...(p3 && styles.p3),
        ...(b1 && styles.b1),
        ...(b2 && styles.b2),
        ...(b3 && styles.b3),
        ...(b3Sm && styles.b3Sm),
        ...(l1 && styles.l1),
        ...(l2 && styles.l2),
        ...(l3 && styles.l3),
        ...(l4 && styles.l4),
        ...(l5 && styles.l5),
        ...(bold && styles.bold),
        ...(italic && styles.italic),
      }}
    />
  )
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'SatoshiBlack',
    fontSize: 28,
    lineHeight: 35.84,
  },
  h2: {
    fontFamily: 'SatoshiBold',
    fontSize: 24,
    lineHeight: 31.68,
  },
  h3: {
    fontFamily: 'SatoshiMedium',
    fontSize: 22,
    lineHeight: 28.16,
    letterSpacing: 0.02,
  },
  h4: {
    fontFamily: 'SatoshiBold',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.02,
  },
  h5: {
    fontFamily: 'SatoshiBold',
    fontSize: 18,
    lineHeight: 22.32,
    letterSpacing: 0.02,
  },
  h6: {
    fontFamily: 'SatoshiMedium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.02,
  },

  p1: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.01,
  },
  p2: {
    fontSize: 14,
    lineHeight: 21.7,
    letterSpacing: 0.01,
  },
  p3: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.02,
  },

  default: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 24,
    color: 'inherit',
  },

  bold: {
    fontFamily: 'RobotoBold',
  },
  italic: {
    fontFamily: 'RobotoItalic',
  },

  b1: {
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 0.02,
    fontFamily: 'SatoshiMedium',
  },
  b2: {
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.02,
    fontFamily: 'SatoshiMedium',
  },
  b3: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0.02,
    fontFamily: 'SatoshiMedium',
  },
  b3Sm: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.02,
    fontFamily: 'SatoshiMedium',
  },

  l1: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.04,
    fontFamily: 'RobotoMedium',
  },
  l2: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.04,
    fontFamily: 'RobotoRegular',
  },
  l3: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.03,
    fontFamily: 'RobotoMedium',
  },
  l4: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.03,
    fontFamily: 'RobotoRegular',
  },
  l5: {
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.02,
    fontFamily: 'RobotoMedium',
  },
})
