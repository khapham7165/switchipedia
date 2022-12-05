import React from 'react'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, SplashScreen, BottomTab } from './src/components'
import { Components } from './src/screens'
import { APP_FONTS } from './src/configs'

const Tab = createBottomTabNavigator()

const { Navigator, Screen } = Tab
const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts(APP_FONTS)

  if (!fontsLoaded) return <SplashScreen />

  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTab {...props} />}>
        <Screen name="Home" component={Home} />
        <Screen name="Components" component={Components} />
      </Navigator>
    </NavigationContainer>
  )
}
