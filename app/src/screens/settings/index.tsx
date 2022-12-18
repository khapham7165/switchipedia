import React, { useContext } from 'react'
import { AppContext } from '@contexts'
import { BodyView, Text, Switch } from '@components'
import { AppTheme } from '@interfaces'
import { Container, SettingItem, SettingsView } from './style'

type SettingsProps = {
  data?: any
}

export const Settings = (props: SettingsProps) => {
  const { colors, setTheme, theme } = useContext(AppContext)

  return (
    <BodyView>
      <Container colors={colors}>
        <Text h2>Dark Mode</Text>
        <SettingsView>
          <SettingItem colors={colors}>
            <Text b2>Enable</Text>
            <Switch
              onTouch={(value) =>
                setTheme(value ? AppTheme.Dark : AppTheme.Light)
              }
              defaultValue={theme === AppTheme.Light ? false : true}
            />
          </SettingItem>
        </SettingsView>
      </Container>
    </BodyView>
  )
}
