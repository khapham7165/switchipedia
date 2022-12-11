import React, { ReactNode, useContext } from 'react'
import { ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'
import { Text } from './text'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Skeleton } from './skeleton'
import { Chip } from './chip'
import { AppContext } from '../contexts'

type CardType = 'horizontal' | 'vertical'

type CardProps = {
  type?: CardType
  info?: string
  title?: string | ReactNode
  description?: string
  imageSrc?: ImageSourcePropType
  loading?: boolean
  tags?: string[]
  imageLoading?: boolean
}

const CARD_BORDER = '8px'
const MIN_CARD_HEIGHT = '146px'
const SHADOW_WIDTH = '3px'

export const Card = (props: CardProps) => {
  const {
    imageLoading = false,
    type = 'horizontal',
    info,
    title,
    description,
    imageSrc,
    loading = false,
    tags = [],
  } = props

  const { colors } = useContext(AppContext)

  const ImageView = styled.View`
    border-radius: 6px;
    background-color: ${colors.text};
    flex: 0.2;
    min-width: 112px;
    align-items: center;
    justify-content: center;
    color: white;
  `

  const ImageContent = styled.Image`
    width: 100%;
    flex: 1;
    border-radius: 6px;
  `

  const ShadowView = styled.View`
    background-color: ${colors.background};
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
    border-color: ${colors.border};
    border-radius: ${CARD_BORDER};
    background-color: ${colors.background};
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

  const TagsContainerView = styled.View`
    padding: 2px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2px;
    flex-direction: row;
    flex-wrap: wrap;
  `

  const renderByType = (type: CardType) => {
    switch (type) {
      case 'horizontal':
        return (
          <CardView
            style={{
              borderColor: loading ? colors.disabled : colors.border,
            }}
          >
            <ImageView>
              {loading || imageLoading ? (
                <Skeleton />
              ) : imageSrc ? (
                <ImageContent source={imageSrc} />
              ) : (
                <Entypo
                  name="image"
                  size={32}
                  color={colors.textPrimaryButton}
                />
              )}
              <TagsContainerView>
                {loading ? (
                  <Skeleton />
                ) : (
                  tags.map((tag) => <Chip key={tag}>{tag}</Chip>)
                )}
              </TagsContainerView>
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
                color={loading ? colors.disabled : colors.text}
              />
            </IconContainerView>
          </CardView>
        )

      case 'vertical':
        return (
          <VerticalCardView
            style={{
              borderColor: loading ? colors.disabled : colors.border,
            }}
          >
            <VerticalImageView>
              {loading ? (
                <Skeleton />
              ) : imageSrc ? (
                <ImageContent source={imageSrc} />
              ) : (
                <Entypo
                  name="image"
                  size={32}
                  color={colors.textPrimaryButton}
                />
              )}
              <TagsContainerView>
                {loading ? (
                  <Skeleton />
                ) : (
                  tags.map((tag) => <Chip key={tag}>{tag}</Chip>)
                )}
              </TagsContainerView>
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
        backgroundColor: loading ? colors.disabled : colors.shadow,
      }}
    >
      {renderByType(type)}
    </ShadowView>
  )
}
