import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '@contexts'
import { BodyView, Text, Switch } from '@components'
import { AppTheme } from '@interfaces'
import { Container, SettingItem, SettingsView } from './style'
import { getData, storeData } from '@utils'
import { STORE } from '@constants'

type SettingsProps = {
  data?: any
}

export const Settings = (props: SettingsProps) => {
  const { colors, setTheme, theme } = useContext(AppContext)
  const [themeSet, setThemeSet] = useState<null | undefined | string>()

  useEffect(() => {
    getData(STORE.THEME).then(setThemeSet)
  }, [])

  return (
    <BodyView>
      <Container colors={colors}>
        <Text h2>Dark Mode</Text>
        <SettingsView>
          <SettingItem colors={colors}>
            <Text b2>Enable</Text>
            <Switch
              onTouch={(value) => {
                const themeChange = value ? AppTheme.Dark : AppTheme.Light
                setTheme(themeChange)
                storeData(STORE.THEME, themeChange)
              }}
              defaultValue={theme === themeSet ? false : true}
            />
          </SettingItem>
        </SettingsView>
      </Container>
    </BodyView>
  )
}
