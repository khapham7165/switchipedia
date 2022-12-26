import styled from 'styled-components/native'
import { IColors } from '@interfaces'

export const CARD_BORDER = '8px'
export const MIN_CARD_HEIGHT = '146px'
export const SHADOW_WIDTH = '3px'

export const View = styled.View``

export const Touchable = styled.TouchableWithoutFeedback``

export const ImageView = styled.View<IColors>`
  border-radius: 6px;
  background-color: ${({ colors }) => colors.text};
  flex: 0.2;
  min-width: 112px;
  align-items: center;
  justify-content: center;
  color: white;
`

export const ImageContent = styled.Image`
  width: 100%;
  flex: 1;
  border-radius: 6px;
`

export const ShadowView = styled.View<IColors>`
  background-color: ${({ colors }) => colors.background};
  border-radius: ${CARD_BORDER};
  margin-left: ${SHADOW_WIDTH};
  margin-top: ${SHADOW_WIDTH};
  min-height: ${MIN_CARD_HEIGHT};
  min-width: 122px;
`

export const CardView = styled.View<IColors & { isTouched: boolean }>`
  min-width: 120px;
  border-width: 2px;
  margin-right: ${({ isTouched }) => (isTouched ? '0' : SHADOW_WIDTH)};
  margin-bottom: ${({ isTouched }) => (isTouched ? '0' : SHADOW_WIDTH)};
  margin-top: ${({ isTouched }) => (isTouched ? '0' : '-' + SHADOW_WIDTH)};
  margin-left: ${({ isTouched }) => (isTouched ? '0' : '-' + SHADOW_WIDTH)};
  border-color: ${({ colors }) => colors.border};
  border-radius: ${CARD_BORDER};
  background-color: ${({ colors }) => colors.background};
  min-height: ${MIN_CARD_HEIGHT};
  padding: 2px;
  flex-direction: row;
  transition: all 0.1s;
`

export const ContentView = styled.View`
  gap: 8px;
  flex-direction: column;
  padding: 12px 16px;
  flex: 0.8;
`

export const TitleView = styled.View`
  min-height: 40px;
`

export const VerticalCardView = styled(CardView)<IColors & { sm: boolean }>`
  flex-direction: column;
  min-height: ${({ sm }) => (sm ? '232px' : '384px')};
`

export const VerticalImageView = styled(ImageView)<{ sm: boolean }>`
  min-height: ${({ sm }) => (sm ? '120px' : '240px')};
`

export const VerticalContentView = styled(ContentView)`
  gap: 12px;
  padding: 20px 16px;
`

export const VerticalTitleView = styled.View`
  gap: 4px;
`

export const IconContainerView = styled.View`
  width: 28px;
  align-items: center;
  justify-content: center;
`

export const TagsContainerView = styled.View`
  padding: 2px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 2px;
  flex-direction: row;
  flex-wrap: wrap;
`
