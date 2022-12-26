import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import {
  SplashScreen,
  BottomTab,
  Header,
  Image,
  Text,
  BodyView,
} from '@components'
import { APP_FONTS } from '@configs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { SCREEN, STORE, THEME } from '@constants'
import { AppTheme } from '@interfaces'
import { AppContext } from '@contexts'
import { SwitchList, Components, Settings, Home, SwitchDetail } from '@screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getData } from './src/utils/storage'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

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
  const [theme, setTheme] = useState<AppTheme>()
  const [colors, setColors] = useState(THEME[AppTheme.Dark])
  const [fontsLoaded] = useFonts(APP_FONTS)

  useEffect(() => {
    theme && setColors(THEME[theme])
  }, [theme, setColors])

  useEffect(() => {
    getData(STORE.THEME).then((value) =>
      setTheme((value as AppTheme) || AppTheme.Light)
    )
  }, [])

  const HomeStack = () => (
    <Stack.Navigator initialRouteName={SCREEN.HOME}>
      <Stack.Screen
        name={SCREEN.HOME}
        component={Home}
        options={{
          header: (props) => (
            <Header
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
      <Stack.Screen
        name={SCREEN.SWITCH_DETAIL}
        component={SwitchDetail}
        options={{
          header: (props) => <Header {...props} title={SCREEN.SWITCH_DETAIL} />,
        }}
      />
    </Stack.Navigator>
  )
  if (!fontsLoaded || !theme) return <SplashScreen />
  return (
    <AppContext.Provider value={{ colors, setTheme, theme }}>
      <BodyView>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Navigator tabBar={(props) => <BottomTab {...props} />}>
              <Screen
                name={SCREEN.HOME}
                component={HomeStack}
                options={{ headerShown: false }}
              />
              <Screen
                name={SCREEN.SWITCH_LIST}
                component={SwitchList}
                options={{
                  header: (props) => <Header {...props} leftButton={false} />,
                }}
              />
              <Screen
                name={SCREEN.COMPONENTS}
                component={Components}
                options={{
                  header: (props) => <Header {...props} leftButton={false} />,
                }}
              />
              <Screen
                name={SCREEN.SETTINGS}
                component={Settings}
                options={{
                  header: (props) => <Header {...props} leftButton={false} />,
                }}
              />
            </Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </BodyView>
    </AppContext.Provider>
  )
}
