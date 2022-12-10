import { createContext } from 'react'
import { THEME } from '../constants'
import { AppTheme } from '../interfaces'

export const AppContext = createContext({
  colors: THEME[AppTheme.Light],
})
