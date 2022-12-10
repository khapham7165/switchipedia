import { AppTheme } from '../interfaces'
import { COLORS } from '../styles'

export const THEME = {
  [AppTheme.Light]: {
    text: COLORS.TEXT,
    border: COLORS.BLACK_BERRY,
    background: COLORS.WHITE,
    primaryButton: COLORS.BLACK_BERRY,
    textPrimaryButton: COLORS.WHITE,
    shadow: COLORS.BLACK_BERRY,
    disabled: COLORS.DISABLED,
    body: COLORS.WHITE,
    active: COLORS.GOJI_BERRY,
    button: COLORS.WHITE,
    buttonPrimary: COLORS.BLACK_BERRY,
    borderButtonPrimary: COLORS.BLACK_BERRY,
    title: COLORS.BLACK_BERRY,
    header: COLORS.BLACK_BERRY,
  },
  [AppTheme.Dark]: {
    text: COLORS.DARK_TEXT,
    border: COLORS.DARK_BACKGROUND,
    background: COLORS.DARK_BODY,
    primaryButton: COLORS.WHITE,
    textPrimaryButton: COLORS.TEXT,
    shadow: COLORS.DARK_BACKGROUND,
    disabled: COLORS.DISABLED,
    body: COLORS.DARK_BODY,
    active: COLORS.WHITE,
    button: COLORS.BLACK_BERRY,
    buttonPrimary: COLORS.WHITE,
    borderButtonPrimary: COLORS.DARK_BACKGROUND,
    title: COLORS.DARK_BACKGROUND,
    header: COLORS.DARK_TEXT,
  },
}
