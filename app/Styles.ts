import { StyleSheet } from 'react-native'

export const COLORS = {
  GOJI_BERRY: '#fc2865',
  BLACK_BERRY: '#000022',
  TEXT: '#1e1d1f',
  DISABLED: '#cacacc',
  WHITE: '#fdfdfd',
  LINK: '#4c90ed',
  SUCCESS: '#27ae60',
  WARNING: '#f7cb45',
  ERROR: '#eb4242',
}

export const s = StyleSheet.create({
  // padding
  p2: {
    padding: 2,
  },
  p4: {
    padding: 4,
  },
  p8: {
    padding: 8,
  },
  p12: {
    padding: 12,
  },
  p16: {
    padding: 16,
  },
  p20: {
    padding: 20,
  },
  p24: {
    padding: 24,
  },
  p32: {
    padding: 32,
  },

  // conner
  connerNil: {
    borderRadius: 0,
  },
  connerSm: {
    borderRadius: 2,
  },
  connerMd: {
    borderRadius: 4,
  },
  connerLg: {
    borderRadius: 8,
  },

  // stroke
  strokeSm: {
    borderWidth: 1,
    borderColor: COLORS.BLACK_BERRY,
  },
  strokeMd: {
    borderWidth: 2,
    borderColor: COLORS.BLACK_BERRY,
  },
  strokeLg: {
    borderWidth: 4,
  },
})
