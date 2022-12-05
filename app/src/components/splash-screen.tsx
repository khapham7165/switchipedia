import React from 'react'
import { CenteredView } from './view'
import { COLORS } from '../styles'
import { Text } from 'react-native'

type SplashScreenProps = {
  data?: any
}

export const SplashScreen = (props: SplashScreenProps) => {
  return (
    <CenteredView style={{ backgroundColor: COLORS.BLACK_BERRY }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.WHITE }}>
        Switchipedia
      </Text>
    </CenteredView>
  )
}
