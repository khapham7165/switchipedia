import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import {
  SplashScreen,
  BottomTab,
  BottomTabHeader,
  Image,
  Text,
  BodyView,
} from './src/components'
import { APP_FONTS } from './src/configs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { SCREEN, THEME } from './src/constants'
import { AppTheme } from './src/interfaces'
import { AppContext } from './src/contexts'
import { SwitchList, Components, Settings, Home } from './src/screens'

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
  const [theme, setTheme] = useState<AppTheme>(AppTheme.Light)
  const [colors, setColors] = useState(THEME[AppTheme.Dark])
  const [fontsLoaded] = useFonts(APP_FONTS)

  useEffect(() => {
    setColors(THEME[theme])
  }, [theme, setColors])

  if (!fontsLoaded) return <SplashScreen />
  return (
    <AppContext.Provider value={{ colors, setTheme, theme }}>
      <BodyView>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Navigator tabBar={(props) => <BottomTab {...props} />}>
              <Screen
                name={SCREEN.HOME}
                component={Home}
                options={{
                  header: (props) => (
                    <BottomTabHeader
                      {...props}
                      leftButton={false}
                      rightButton={false}
                      title={
                        <TitleView>
                          <IconView
                            style={{ tintColor: colors.header }}
                            source={require('./assets/icon.png')}
                          />
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
                name={SCREEN.SWITCH_LIST}
                component={SwitchList}
                options={{
                  header: (props) => (
                    <BottomTabHeader {...props} leftButton={false} />
                  ),
                }}
              />
              <Screen
                name={SCREEN.COMPONENTS}
                component={Components}
                options={{
                  header: (props) => (
                    <BottomTabHeader {...props} leftButton={false} />
                  ),
                }}
              />
              <Screen
                name={SCREEN.SETTINGS}
                component={Settings}
                options={{
                  header: (props) => (
                    <BottomTabHeader {...props} leftButton={false} />
                  ),
                }}
              />
            </Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </BodyView>
    </AppContext.Provider>
  )
}
