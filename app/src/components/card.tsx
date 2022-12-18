import React, { ReactNode, useContext, useState } from 'react'
import {
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
} from 'react-native'
import styled from 'styled-components/native'
import { Text } from './text'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Skeleton } from './skeleton'
import { Chip } from './chip'
import { AppContext } from '@contexts'
import { IColors } from '@interfaces'

type CardType = 'horizontal' | 'vertical'

export type CardProps = TouchableWithoutFeedbackProps & {
  type?: CardType
  info?: string
  title?: string | ReactNode
  description?: string
  imageSrc?: ImageSourcePropType
  loading?: boolean
  tags?: string[]
  imageLoading?: boolean
  sm?: boolean
}

const CARD_BORDER = '8px'
const MIN_CARD_HEIGHT = '146px'
const SHADOW_WIDTH = '3px'

const View = styled.View``

const Touchable = styled.TouchableWithoutFeedback``

const ImageView = styled.View<IColors>`
  border-radius: 6px;
  background-color: ${({ colors }) => colors.text};
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

const ShadowView = styled.View<IColors>`
  background-color: ${({ colors }) => colors.background};
  border-radius: ${CARD_BORDER};
  margin-left: ${SHADOW_WIDTH};
  margin-top: ${SHADOW_WIDTH};
  min-height: ${MIN_CARD_HEIGHT};
  min-width: 122px;
`

const CardView = styled.View<IColors & { isTouched: boolean }>`
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

const VerticalCardView = styled(CardView)<IColors & { sm: boolean }>`
  flex-direction: column;
  min-height: ${({ sm }) => (sm ? '232px' : '384px')};
`

const VerticalImageView = styled(ImageView)<{ sm: boolean }>`
  min-height: ${({ sm }) => (sm ? '120px' : '240px')};
`

const VerticalContentView = styled(ContentView)`
  gap: 12px;
  padding: 20px 16px;
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
    sm = false,
  } = props

  const { colors } = useContext(AppContext)
  const [isTouched, setIsTouched] = useState<boolean>(false)

  const renderByType = (type: CardType) => {
    switch (type) {
      case 'horizontal':
        return (
          <CardView
            isTouched={isTouched}
            colors={colors}
            style={{
              borderColor: loading ? colors.disabled : colors.border,
            }}
          >
            <ImageView colors={colors}>
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
              <Text l4 numberOfLines={1} ellipsizeMode="tail">
                {loading ? <Skeleton /> : info}
              </Text>
              <TitleView>
                <Text h6 numberOfLines={2} ellipsizeMode="tail">
                  {loading ? <Skeleton /> : title}
                </Text>
              </TitleView>
              {description && (
                <Text p2 numberOfLines={2} ellipsizeMode="tail">
                  {loading ? <Skeleton /> : description}
                </Text>
              )}
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
            isTouched={isTouched}
            colors={colors}
            sm={sm}
            style={{
              borderColor: loading ? colors.disabled : colors.border,
            }}
          >
            <VerticalImageView sm={sm} colors={colors}>
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
                <Text
                  h4={!sm}
                  h6={sm}
                  numberOfLines={sm ? 2 : 1}
                  ellipsizeMode="tail"
                >
                  {loading ? <Skeleton /> : title}
                </Text>
                {!sm && (
                  <Text h6 numberOfLines={1} ellipsizeMode="tail">
                    {loading ? <Skeleton /> : info}
                  </Text>
                )}
              </VerticalTitleView>
              {description && (
                <Text p1={!sm} p3={sm} numberOfLines={2} ellipsizeMode="tail">
                  {loading ? <Skeleton /> : description}
                </Text>
              )}
            </VerticalContentView>
          </VerticalCardView>
        )
      default:
        break
    }
  }

  return (
    <Touchable {...props}>
      <ShadowView
        colors={colors}
        style={{
          backgroundColor: loading ? colors.disabled : colors.shadow,
        }}
      >
        <View
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
        >
          {renderByType(type)}
        </View>
      </ShadowView>
    </Touchable>
  )
}
