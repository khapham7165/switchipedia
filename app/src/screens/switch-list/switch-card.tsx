import { capitalize } from 'lodash'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '../../components'
import { BREAK_POINT } from '../../constants'
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

  const [fetchImage, { data: imageData, loading: imageLoading }] = useFetch(
    `/switch/image?path=${item?.photos?.[0]}`
  )

  useEffect(() => {
    if (item?.photos?.[0]) fetchImage()
  }, [])

  return item ? (
    <CardContainer
      style={{
        maxWidth: width > BREAK_POINT.TABLET ? 358 : undefined,
      }}
      key={item._id}
    >
      <SwitchItem
        loading={loading}
        type={width > BREAK_POINT.TABLET ? 'vertical' : 'horizontal'}
        title={`${item.brand && capitalize(item.brand.name) + ' - '}${
          item.title
        }`}
        description={item.notes}
        tags={[capitalize(item.switchType?.name)]}
        imageSrc={imageData && { uri: imageData }}
      />
    </CardContainer>
  ) : (
    <></>
  )
}
