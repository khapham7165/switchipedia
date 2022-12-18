import { Button } from '@components'
import { IColors } from '@interfaces'
import styled from 'styled-components/native'

export const CustomButton = styled(Button)`
  flex: 0;
`

export const Container = styled.View<IColors>`
  min-width: 60px;
  height: 32px;
  border-radius: 4px;
  padding: 0px 8px;
  border: 2px solid ${({ colors }) => colors.border};
  background-color: ${({ colors }) => colors.background};
  color: ${({ colors }) => colors.text};
  align-items: center;
  justify-content: center;
  margin: 2px;
`
