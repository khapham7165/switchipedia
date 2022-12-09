import React, { useCallback, useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from '../styles'

type SkeletonProps = {
  height?: number | string
  width?: number | string
  duration?: number
}

const SkeletonView = styled.View`
  background-color: ${COLORS.DISABLED};
  border-radius: 4px;
`

export const Skeleton = (props: SkeletonProps) => {
  const { height = '100%', width = '100%', duration } = props
  const circleAnimatedValue = useMemo(() => new Animated.Value(0), [])

  const circleAnimated = useCallback(() => {
    circleAnimatedValue.setValue(0)
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: duration || 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated()
      }, 1000)
    })
  }, [])

  useEffect(() => {
    circleAnimated()
  }, [])

  return (
    <SkeletonView style={{ width, height }}>
      <Animated.View
        style={{
          width: '10%',
          height: '100%',
          backgroundColor: COLORS.WHITE,
          opacity: 0.5,
          transform: [
            {
              translateX: circleAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 1000],
              }),
            },
          ],
        }}
      />
    </SkeletonView>
  )
}
