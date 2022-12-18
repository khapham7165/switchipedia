import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Animated } from 'react-native'
import { AppContext } from '@contexts'
import { SkeletonView } from './style'

type SkeletonProps = {
  height?: number | string
  width?: number | string
  duration?: number
}

export const Skeleton = (props: SkeletonProps) => {
  const { height = '100%', width = '100%', duration } = props
  const [movingWidth, setMovingWidth] = useState<number>(1000)
  const circleAnimatedValue = useMemo(() => new Animated.Value(0), [])
  const { colors } = useContext(AppContext)

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
  }, [circleAnimated])

  return (
    <SkeletonView
      colors={colors}
      onLayout={(event) => {
        const { width: compWidth } = event.nativeEvent.layout
        setMovingWidth(compWidth * 1.1)
      }}
      style={{ height, width }}
    >
      <Animated.View
        style={{
          width: '10%',
          height: '100%',
          backgroundColor: colors.body,
          opacity: 0.5,
          transform: [
            {
              translateX: circleAnimatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, movingWidth],
              }),
            },
          ],
        }}
      />
    </SkeletonView>
  )
}
