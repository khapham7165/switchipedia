import { IColors } from '@interfaces'
import styled from 'styled-components/native'

export const SkeletonView = styled.View<IColors>`
  background-color: ${({ colors }) => colors.disabled};
  border-radius: 4px;
  flex-direction: 'row';
  flex: 1;
`
