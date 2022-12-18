import { IColors } from '@interfaces'
import styled from 'styled-components/native'

export const Container = styled.View<IColors>`
  padding: 16px 12px;
`

export const SettingsView = styled.View`
  margin-top: 16px;
`

export const SettingItem = styled.View<IColors>`
  height: 56px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${({ colors }) => colors.border};
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
