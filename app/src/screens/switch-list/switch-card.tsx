import { capitalize } from 'lodash'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import { Card, CardProps, Text } from '@components'
import { AppContext } from '@contexts'
import { useFetch } from '@hooks'
import { SwitchData } from '@interfaces'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '@constants'

type SwitchCardProps = CardProps & {
  item?: SwitchData
}

const SwitchItem = styled(Card)``

export const SwitchCard = (props: SwitchCardProps) => {
  const { item, loading } = props
  const { colors } = useContext(AppContext)
  const navigation = useNavigation()

  const [fetchImage, { data: imageData, loading: imageLoading }] = useFetch(
    `/switch/image?path=${item?.photos?.[0]}`
  )

  useEffect(() => {
    if (item?.photos?.[0]) fetchImage()
  }, [fetchImage, item])

  return item ? (
    <SwitchItem
      imageLoading={imageLoading}
      loading={loading}
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
      onPress={() =>
        navigation.navigate(SCREEN.SWITCH_DETAIL as never, { id: item._id } as never)
      }
      {...props}
    />
  ) : (
    <></>
  )
}
