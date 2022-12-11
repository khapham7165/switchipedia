import React, { useContext } from 'react'
import { Switch, View } from 'react-native'
import { AppContext } from '../../contexts'
import { BodyView, Text } from '../../components'
import styled from 'styled-components/native'
import { AppTheme, IColors } from '../../interfaces'

type SettingsProps = {
  data?: any
}

const Container = styled.View<IColors>`
  padding: 16px 12px;
`

const SettingsView = styled.View`
  margin-top: 16px;
`

const SettingItem = styled.View<IColors>`
  height: 56px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${({ colors }) => colors.border};
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Settings = (props: SettingsProps) => {
  const { colors, setTheme, theme } = useContext(AppContext)

  return (
    <BodyView>
      <Container colors={colors}>
        <Text h2>Dark Mode</Text>
        <SettingsView>
          <SettingItem colors={colors}>
            <Text b2>Dark Mode</Text>
            <Switch
              onValueChange={(value) =>
                setTheme(value ? AppTheme.Dark : AppTheme.Light)
              }
              value={theme === AppTheme.Light ? false : true}
            />
          </SettingItem>
        </SettingsView>
      </Container>
    </BodyView>
  )
}
