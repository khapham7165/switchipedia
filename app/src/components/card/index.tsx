import React, { ReactNode, useCallback, useContext, useState } from 'react'
import {
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Skeleton, Chip, Text } from '@components'
import { AppContext } from '@contexts'
import {
  Touchable,
  CardView,
  ImageView,
  ImageContent,
  TagsContainerView,
  ContentView,
  TitleView,
  IconContainerView,
  VerticalCardView,
  VerticalImageView,
  VerticalContentView,
  VerticalTitleView,
  ShadowView,
} from './style'
import { debounce } from 'lodash'

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
    <Touchable
      onPressIn={() => setIsTouched(true)}
      onPressOut={() => setIsTouched(false)}
      {...props}
    >
      <ShadowView
        colors={colors}
        style={{
          backgroundColor: loading ? colors.disabled : colors.shadow,
        }}
      >
        {renderByType(type)}
      </ShadowView>
    </Touchable>
  )
}
