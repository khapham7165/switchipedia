import styled from 'styled-components/native'

export const Container = styled.View`
  margin-top: 24px;
`

export const SwitchCardContainer = styled.View<{
  lgCards?: boolean
  verticalCards?: boolean
}>`
  width: ${({ verticalCards, lgCards }) =>
    !verticalCards ? '100%' : lgCards ? '356px' : '176px'};
  padding: 4px;
`

export const ScrollView = styled.ScrollView`
  margin: 0 -12px;
  padding: 8px;
`
