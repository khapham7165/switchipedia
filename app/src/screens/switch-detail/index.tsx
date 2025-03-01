import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { BodyView, Chip, Skeleton, Text } from '@components'
import { AppContext } from '@contexts'
import { useFetch } from '@hooks'
import { capitalize } from 'lodash'
import {
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons'
import styled from 'styled-components/native'
import { SWITCH_IMAGE_URL } from '@utils'

const Container = styled(BodyView)`
  padding: 16px 12px;
`

const Section = styled.View`
  margin-bottom: 24px;
`

const SectionTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const SpecGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -8px;
`

const SpecItem = styled.View`
  width: 50%;
  padding: 8px;
`

const SpecCard = styled.View<{ colors: any }>`
  background-color: ${({ colors }) => colors.background};
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ colors }) => colors.border};
  padding: 12px;
  height: 110px;
`

const ImageGallery = styled.ScrollView`
  margin-bottom: 16px;
`

const ImageContainer = styled.View<{ colors: any }>`
  width: 300px;
  height: 300px;
  margin-right: 12px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ colors }) => colors.border};
  background-color: ${({ colors }) => colors.background};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ImageContent = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 16px;
`

const ActionButton = styled.TouchableOpacity<{
  colors: any
  primary?: boolean
}>`
  background-color: ${({ colors, primary }) =>
    primary ? colors.buttonPrimary : colors.button};
  padding: 12px 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border-width: 2px;
  border-color: ${({ colors }) => colors.border};
`

const ButtonsRow = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`

const ScoreCard = styled.View<{ colors: any }>`
  background-color: ${({ colors }) => colors.background};
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ colors }) => colors.border};
  padding: 16px;
  margin-bottom: 16px;
`

const ScoreItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`

const ScoreBar = styled.View<{ score: number; colors: any }>`
  height: 8px;
  width: 200px;
  background-color: ${({ colors }) => colors.disabled};
  border-radius: 4px;
  overflow: hidden;
`

const ScoreBarFill = styled.View<{ score: number; colors: any }>`
  height: 100%;
  width: ${({ score }) => `${score}%`};
  background-color: ${({ colors, score }) => colors.switchActive};
  border-radius: 4px;
`

type SwitchDetailProps = {
  route: any
  navigation: any
}

export const SwitchDetail = ({ route, navigation }: SwitchDetailProps) => {
  const { colors } = useContext(AppContext)
  const switchId = route?.params?.id || ''

  const [isFavorite, setIsFavorite] = useState(false)

  const [fetchSwitchDetails, { data: switchDetails, loading }] = useFetch(
    `/switch/id/${switchId}`
  )

  useEffect(() => {
    if (switchId) {
      fetchSwitchDetails()
    }
  }, [switchId])

  if (loading) {
    return (
      <Container>
        <Section>
          <Skeleton height={300} />
        </Section>
        <Section>
          <Skeleton height={40} width={200} />
          <View style={{ height: 12 }} />
          <Skeleton height={80} />
        </Section>
        <Section>
          <Skeleton height={40} width={150} />
          <View style={{ height: 12 }} />
          <Skeleton height={150} />
        </Section>
      </Container>
    )
  }

  const renderSpecs = () => {
    const specs = switchDetails?.specs?.[0] || {}

    const specItems = [
      {
        title: 'Actuation',
        value: `${specs.actuation || '--'}g`,
        icon: 'arrow-down',
      },
      {
        title: 'Bottom Out',
        value: `${specs.bottomOut || '--'}g`,
        icon: 'arrow-down-circle',
      },
      {
        title: 'Pre-Travel',
        value: `${specs.preTravel || '--'}mm`,
        icon: 'arrow-up',
      },
      {
        title: 'Total Travel',
        value: `${specs.totalTravel || '--'}mm`,
        icon: 'arrow-up-circle',
      },
      {
        title: 'Spring',
        value: capitalize(specs.spring) || '--',
        icon: 'menu',
      },
      {
        title: 'Stem Material',
        value: capitalize(specs.stemMaterial) || '--',
        icon: 'cube-outline',
      },
      {
        title: 'Top Housing',
        value: capitalize(specs.housingTopMaterial) || '--',
        icon: 'square-rounded-outline',
      },
      {
        title: 'Bottom Housing',
        value: capitalize(specs.housingBottomMaterial) || '--',
        icon: 'square-rounded',
      },
    ]

    return (
      <SpecGrid>
        {specItems.map((item, index) => (
          <SpecItem key={index}>
            <SpecCard colors={colors}>
              <Row>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={colors.text}
                />
                <Text b3 style={{ marginLeft: 8 }}>
                  {item.title}
                </Text>
              </Row>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text h4 numberOfLines={2}>
                  {item.value}
                </Text>
              </View>
            </SpecCard>
          </SpecItem>
        ))}
      </SpecGrid>
    )
  }

  const renderImages = () => {
    if (!switchDetails?.photos?.length) {
      return (
        <ImageContainer colors={colors}>
          <MaterialCommunityIcons
            name="image-off"
            size={48}
            color={colors.text}
          />
          <Text p2 style={{ marginTop: 8 }}>
            No images available
          </Text>
        </ImageContainer>
      )
    }

    return (
      <ImageGallery horizontal showsHorizontalScrollIndicator={false}>
        {switchDetails.photos.map((photo: string, index: number) => (
          <ImageContainer key={index} colors={colors}>
            <ImageContent source={{ uri: SWITCH_IMAGE_URL + '/' + photo }} />
          </ImageContainer>
        ))}
      </ImageGallery>
    )
  }

  const renderThereminGoatScore = () => {
    const scores = switchDetails?.thereminGoatScores || {}

    if (!scores || !Object.keys(scores).length) {
      return null
    }

    const scoreItems = [
      { title: 'Push Feel', score: scores.pushFeel },
      { title: 'Sound', score: scores.sound },
      { title: 'Wobble', score: scores.wobble },
      { title: 'Context', score: scores.context },
      { title: 'Other', score: scores.other },
      { title: 'Total', score: scores.total, isTotal: true },
    ].filter((item) => item.score !== undefined)

    if (!scoreItems.length) return null

    return (
      <Section>
        <SectionTitle>
          <MaterialCommunityIcons
            name="scoreboard"
            size={24}
            color={colors.header}
          />
          <Text h4 style={{ marginLeft: 8 }}>
            Theremin Goat Scores
          </Text>
        </SectionTitle>

        <ScoreCard colors={colors}>
          {scoreItems.map((item, index) => (
            <ScoreItem key={index}>
              <Text style={{ flexShrink: 0 }} b2>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ScoreBar score={item.score} colors={colors}>
                  <ScoreBarFill score={item.score} colors={colors} />
                </ScoreBar>
                <Text
                  b3
                  style={{
                    marginLeft: 8,
                    width: 40,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {item.score}
                </Text>
              </View>
            </ScoreItem>
          ))}

          {scores.scoreCardLink && (
            <TouchableOpacity style={{ marginTop: 8 }}>
              <Text b3 style={{ color: colors.switchActive }}>
                View Full Score Card →
              </Text>
            </TouchableOpacity>
          )}
        </ScoreCard>
      </Section>
    )
  }

  return (
    <ScrollView>
      <Container>
        {/* Header with title and type */}
        <Section>
          <Text h2>
            {switchDetails?.brand?.name && capitalize(switchDetails.brand.name)}{' '}
            {switchDetails?.title}
          </Text>

          <TagsContainer>
            {switchDetails?.switchType?.name && (
              <Chip>{capitalize(switchDetails.switchType.name)}</Chip>
            )}
            {switchDetails?.mount && (
              <Chip>Pin: {capitalize(switchDetails.mount)}</Chip>
            )}
            {switchDetails?.factoryLubed === 'yes' && (
              <Chip>Factory Lubed</Chip>
            )}
          </TagsContainer>

          <ButtonsRow>
            <ActionButton
              colors={colors}
              primary
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <AntDesign
                name={isFavorite ? 'heart' : 'hearto'}
                size={20}
                color={isFavorite ? colors.title : colors.textPrimaryButton}
                style={{ marginRight: 8 }}
              />
              <Text b2 style={{ color: colors.textPrimaryButton }}>
                {isFavorite ? 'Saved' : 'Save'}
              </Text>
            </ActionButton>

            <ActionButton colors={colors}>
              <MaterialCommunityIcons
                name="compare"
                size={20}
                color={colors.text}
                style={{ marginRight: 8 }}
              />
              <Text b2>Compare</Text>
            </ActionButton>
          </ButtonsRow>
        </Section>

        {/* Images gallery */}
        <Section>
          <SectionTitle>
            <Ionicons name="images" size={24} color={colors.header} />
            <Text h4 style={{ marginLeft: 8 }}>
              Gallery
            </Text>
          </SectionTitle>
          {renderImages()}
        </Section>

        {/* Switch specs */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons
              name="table"
              size={24}
              color={colors.header}
            />
            <Text h4 style={{ marginLeft: 8 }}>
              Specifications
            </Text>
          </SectionTitle>
          {renderSpecs()}
        </Section>

        {/* Theremin Goat Score if available */}
        {renderThereminGoatScore()}

        {/* Description/Notes */}
        <Section>
          <SectionTitle>
            <Octicons name="note" size={24} color={colors.header} />
            <Text h4 style={{ marginLeft: 8 }}>
              Description
            </Text>
          </SectionTitle>

          <View
            style={{
              padding: 16,
              backgroundColor: colors.background,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: colors.border,
            }}
          >
            <Text p1>
              {switchDetails?.notes || 'No description available.'}
            </Text>
          </View>
        </Section>

        {/* Manufacturer info */}
        <Section>
          <SectionTitle>
            <MaterialCommunityIcons
              name="factory"
              size={24}
              color={colors.header}
            />
            <Text h4 style={{ marginLeft: 8 }}>
              Manufacturer
            </Text>
          </SectionTitle>

          <View
            style={{
              padding: 16,
              backgroundColor: colors.background,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: colors.border,
            }}
          >
            <Text h5>
              {capitalize(switchDetails?.manufacturer?.name) || 'Unknown'}
            </Text>
            {switchDetails?.brand?.name !==
              switchDetails?.manufacturer?.name && (
              <Text p2 style={{ marginTop: 4 }}>
                Brand: {capitalize(switchDetails?.brand?.name) || 'Unknown'}
              </Text>
            )}
          </View>
        </Section>
      </Container>
    </ScrollView>
  )
}
