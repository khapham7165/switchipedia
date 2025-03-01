import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { Card, CardProps, Text } from '@components'
import { AppContext } from '@contexts'
import { SwitchData } from '@interfaces'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '@constants'
import { SWITCH_IMAGE_URL } from '@utils'

type SwitchCardProps = CardProps & {
  item?: SwitchData
}

const SwitchItem = styled(Card)``

export const SwitchCard = (props: SwitchCardProps) => {
  const { item, loading } = props
  const { colors } = useContext(AppContext)
  const navigation = useNavigation()

  return item ? (
    <SwitchItem
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
      imageSrc={{ uri: SWITCH_IMAGE_URL + '/'+  item?.photos?.[0] }}
      onPress={() =>
        navigation.navigate(SCREEN.SWITCH_DETAIL, { id: item._id })
      }
      {...props}
    />
  ) : (
    <></>
  )
}
