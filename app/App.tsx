import React from 'react'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import {
  Text,
  SplashScreen,
  BottomTab,
  BottomTabHeader,
  BodyView,
} from './src/components'
import { Components } from './src/screens'
import { APP_FONTS } from './src/configs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()
const { Navigator, Screen } = Tab
const Home = () => {
  return (
    <BodyView>
      <Text>Home</Text>
    </BodyView>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts(APP_FONTS)

  if (!fontsLoaded) return <SplashScreen />

  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTab {...props} />}>
        <Screen
          name="Home"
          component={Home}
          options={{
            header: (props) => <BottomTabHeader {...props} />,
          }}
        />
        <Screen
          name="Components"
          component={Components}
          options={{
            header: (props) => <BottomTabHeader {...props} />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}
