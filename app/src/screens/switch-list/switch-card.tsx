import { capitalize } from 'lodash'
import React, { useContext, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { Card, Text } from '../../components'
import { BREAK_POINT } from '../../constants'
import { AppContext } from '../../contexts'
import { useFetch } from '../../hooks'
import { SwitchData } from '../../interfaces'

type SwitchCardProps = {
  item?: SwitchData
  loading?: boolean
}

const CardContainer = styled.View`
  padding: 4px;
  flex: 1 1 400px;
`
const SwitchItem = styled(Card)``

export const SwitchCard = (props: SwitchCardProps) => {
  const { item, loading } = props
  const { width } = useWindowDimensions()
  const { colors } = useContext(AppContext)

  const [fetchImage, { data: imageData, loading: imageLoading }] = useFetch(
    `/switch/image?path=${item?.photos?.[0]}`
  )

  useEffect(() => {
    if (item?.photos?.[0]) fetchImage()
  }, [fetchImage, item])

  return item ? (
    <CardContainer
      style={{
        maxWidth: width > BREAK_POINT.TABLET ? 358 : undefined,
      }}
      key={item._id}
    >
      <SwitchItem
        imageLoading={imageLoading}
        loading={loading}
        type={width > BREAK_POINT.TABLET ? 'vertical' : 'horizontal'}
        title={
          <>
            <Text style={{ color: colors.title }}>
              {item.brand && capitalize(item.brand.name) + ' '}
              <Text>{item.title}</Text>
            </Text>
          </>
        }
        description={item.notes}
        tags={[capitalize(item.switchType?.name)]}
        imageSrc={imageData && { uri: imageData }}
      />
    </CardContainer>
  ) : (
    <></>
  )
}
