import { IColors } from '@interfaces'
import styled from 'styled-components/native'

export const Touchable = styled.TouchableWithoutFeedback``

export const Container = styled.View<IColors & { enabled: boolean }>`
  width: 44px;
  height: 28px;
  padding: 4px;
  border: 2px solid ${({ colors }) => colors.border};
  border-radius: 40px;
  transition: all 0.3s;
`
