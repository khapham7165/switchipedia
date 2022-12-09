import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../styles'
import { Text } from './text'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Skeleton } from './skeleton'

type CardType = 'horizontal' | 'vertical'

type CardProps = {
  type?: CardType
  info?: string
  title?: string
  description?: string
  imageSrc?: ImageSourcePropType
  loading?: boolean
}

const CARD_BORDER = '8px'
const MIN_CARD_HEIGHT = '146px'
const SHADOW_WIDTH = '3px'

const ImageView = styled.View`
  border-radius: 6px;
  background-color: ${COLORS.BLACK_BERRY};
  flex: 0.2;
  min-width: 112px;
  align-items: center;
  justify-content: center;
  color: white;
`

const ShadowView = styled.View`
  background-color: ${COLORS.BLACK_BERRY};
  border-radius: ${CARD_BORDER};
  margin-left: ${SHADOW_WIDTH};
  margin-top: ${SHADOW_WIDTH};
  min-height: ${MIN_CARD_HEIGHT};
  min-width: 122px;
`

const CardView = styled.View`
  min-width: 120px;
  border-width: 2px;
  margin-right: ${SHADOW_WIDTH};
  margin-bottom: ${SHADOW_WIDTH};
  margin-top: -${SHADOW_WIDTH};
  margin-left: -${SHADOW_WIDTH};
  border-color: ${COLORS.BLACK_BERRY};
  border-radius: ${CARD_BORDER};
  background-color: ${COLORS.WHITE};
  min-height: ${MIN_CARD_HEIGHT};
  padding: 2px;
  flex-direction: row;
`

const ContentView = styled.View`
  gap: 8px;
  flex-direction: column;
  padding: 12px 16px;
  flex: 0.8;
`

const TitleView = styled.View`
  min-height: 40px;
`

const VerticalCardView = styled(CardView)`
  flex-direction: column;
  min-width: 100%;
`

const VerticalImageView = styled(ImageView)`
  min-height: 240px;
`

const VerticalContentView = styled(ContentView)`
  gap: 12px;
  padding: 20px 16px;
  min-height: 148px;
`

const VerticalTitleView = styled.View`
  gap: 4px;
`

const IconContainerView = styled.View`
  width: 28px;
  align-items: center;
  justify-content: center;
`
export const Card = (props: CardProps) => {
  const {
    type = 'horizontal',
    info,
    title,
    description,
    imageSrc,
    loading,
  } = props

  const renderByType = (type: CardType) => {
    switch (type) {
      case 'horizontal':
        return (
          <CardView
            style={{
              borderColor: loading ? COLORS.DISABLED : COLORS.BLACK_BERRY,
            }}
          >
            <ImageView>
              {loading ? (
                <Skeleton />
              ) : imageSrc ? (
                <Image source={imageSrc} />
              ) : (
                <Entypo name="image" size={32} color={COLORS.WHITE} />
              )}
            </ImageView>
            <ContentView>
              <Text l4 numberOfLines={1}>
                {loading ? <Skeleton /> : info}
              </Text>
              <TitleView>
                <Text h6 numberOfLines={2} ellipsizeMode="tail">
                  {loading ? <Skeleton /> : title}
                </Text>
              </TitleView>
              <Text p2 numberOfLines={2} ellipsizeMode="tail">
                {loading ? <Skeleton /> : description}
              </Text>
            </ContentView>
            <IconContainerView>
              <AntDesign
                name="right"
                size={12.5}
                color={loading ? COLORS.DISABLED : COLORS.BLACK_BERRY}
              />
            </IconContainerView>
          </CardView>
        )

      case 'vertical':
        return (
          <VerticalCardView
            style={{
              borderColor: loading ? COLORS.DISABLED : COLORS.BLACK_BERRY,
            }}
          >
            <VerticalImageView>
              {loading ? (
                <Skeleton />
              ) : imageSrc ? (
                <Image source={imageSrc} />
              ) : (
                <Entypo name="image" size={32} color={COLORS.WHITE} />
              )}
            </VerticalImageView>
            <VerticalContentView>
              <VerticalTitleView>
                <Text h4 numberOfLines={1} ellipsizeMode="tail">
                  {loading ? <Skeleton /> : title}
                </Text>
                <Text h6 numberOfLines={1}>
                  {loading ? <Skeleton /> : info}
                </Text>
              </VerticalTitleView>
              <Text p1 numberOfLines={2} ellipsizeMode="tail">
                {loading ? <Skeleton /> : description}
              </Text>
            </VerticalContentView>
          </VerticalCardView>
        )
      default:
        break
    }
  }

  return (
    <ShadowView
      style={{
        backgroundColor: loading ? COLORS.DISABLED : COLORS.BLACK_BERRY,
      }}
    >
      {renderByType(type)}
    </ShadowView>
  )
}
