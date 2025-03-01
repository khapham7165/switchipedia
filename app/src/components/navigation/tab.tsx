import React, { useCallback, useContext } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Text } from '../text'
import { AppContext } from '@contexts'
import { SCREEN } from '@constants'

const CARD_BORDER = '8px'
const MIN_TAB_HEIGHT = '72px'
const SHADOW_WIDTH = '6px'
const SHADOW_HEIGHT = '8px'
const ICON_SIZE = 20

export const BottomTab = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props
  const { colors } = useContext(AppContext)

  const ShadowView = styled.View`
    background-color: ${colors.shadow};
    border-radius: ${CARD_BORDER};
    margin-left: ${SHADOW_WIDTH};
    margin-top: ${SHADOW_HEIGHT};
    min-height: ${MIN_TAB_HEIGHT};
    min-width: 122px;
  `

  const TabView = styled.View`
    border-width: 2px;
    margin-right: ${SHADOW_WIDTH};
    margin-bottom: ${SHADOW_HEIGHT};
    margin-top: -${SHADOW_HEIGHT};
    margin-left: -${SHADOW_WIDTH};
    border-color: ${colors.border};
    border-radius: ${CARD_BORDER};
    background-color: ${colors.background};
    min-height: ${MIN_TAB_HEIGHT};
    padding: 2px;
    flex-direction: row;
  `

  const TabItemView = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
  `

  const Container = styled.View`
    background-color: ${colors.body};
  `

  const mapNameToIcon = useCallback(
    (name?: string, active?: boolean) => {
      switch (name) {
        case SCREEN.HOME:
          return active ? (
            <Ionicons name="home" size={ICON_SIZE} color={colors.text} />
          ) : (
            <Ionicons
              name="home-outline"
              size={ICON_SIZE}
              color={colors.text}
            />
          )
        case SCREEN.SETTINGS:
          return active ? (
            <Ionicons name="settings" size={ICON_SIZE} color={colors.text} />
          ) : (
            <Ionicons
              name="settings-outline"
              size={ICON_SIZE}
              color={colors.text}
            />
          )
        case SCREEN.SWITCH_LIST: {
          return active ? (
            <MaterialCommunityIcons
              name="view-list"
              size={24}
              color={colors.text}
            />
          ) : (
            <MaterialCommunityIcons
              name="view-list-outline"
              size={24}
              color={colors.text}
            />
          )
        }
        case SCREEN.COMPONENTS:
          return active ? (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={ICON_SIZE}
              color={colors.text}
            />
          ) : (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={ICON_SIZE}
              color={colors.text}
            />
          )
        default:
          return <Text>{name}</Text>
      }
    },
    [colors]
  )

  return (
    <Container>
      <ShadowView>
        <TabView>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name

            const isFocused = state.index === index

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true } as any)
              }
            }

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }

            return (
              <TabItemView
                activeOpacity={1}
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                {mapNameToIcon(label as string, isFocused)}
              </TabItemView>
            )
          })}
        </TabView>
      </ShadowView>
    </Container>
  )
}
