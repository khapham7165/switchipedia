import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'antd-mobile'
import { useFonts } from 'expo-font'

export default function App() {
  const [fontsLoaded] = useFonts({
    Satoshi: require('./assets/fonts/satoshi.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Satoshi' }}>
        Open up App.tsx to start working on your app!
      </Text>
      <Button style={styles.button} color="primary">
        Ant btn
      </Button>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Satoshi',
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'orange',
    fontFamily: 'Satoshi',
  },
})
