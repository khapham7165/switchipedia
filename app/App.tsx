import React from 'react'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import {
  SplashScreen,
  BottomTab,
  BottomTabHeader,
  Image,
  Text,
} from './src/components'
import { Components, SwitchList } from './src/screens'
import { APP_FONTS } from './src/configs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { SCREEN } from './src/constants'

const Tab = createBottomTabNavigator()
const { Navigator, Screen } = Tab

const TitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const IconView = styled(Image)`
  height: 24px;
  width: 24px;
  margin-right: 12px;
`

export default function App() {
  const [fontsLoaded] = useFonts(APP_FONTS)

  if (!fontsLoaded) return <SplashScreen />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator tabBar={(props) => <BottomTab {...props} />}>
          <Screen
            name={SCREEN.HOME}
            component={SwitchList}
            options={{
              header: (props) => (
                <BottomTabHeader
                  {...props}
                  leftButton={false}
                  rightButton={false}
                  title={
                    <TitleView>
                      <IconView source={require('./assets/icon.png')} />
                      <Text numberOfLines={1} h3>
                        Switchipedia
                      </Text>
                    </TitleView>
                  }
                />
              ),
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
    </SafeAreaView>
  )
}
