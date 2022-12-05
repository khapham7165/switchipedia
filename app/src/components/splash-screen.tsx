import React from 'react'
import { CenteredView } from './view'
import { COLORS } from '../../Styles'
import { Text } from 'react-native'

type SplashScreenProps = {
  data?: any
}

export const SplashScreen = (props: SplashScreenProps) => {
  return (
    <CenteredView style={{ backgroundColor: COLORS.GOJI_BERRY }}>
      <Text
        style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.BLACK_BERRY }}
      >
        Switchipedia...
      </Text>
    </CenteredView>
  )
}
