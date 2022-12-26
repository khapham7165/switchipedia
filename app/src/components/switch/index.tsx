import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Animated, TouchableWithoutFeedbackProps } from 'react-native'
import { AppContext } from '@contexts'
import { Touchable, Container } from './style'

type SwitchProps = TouchableWithoutFeedbackProps & {
  onTouch?: (value: boolean) => void
  defaultValue?: boolean
}

export const Switch = (props: SwitchProps) => {
  const { colors } = useContext(AppContext)
  const { onTouch, defaultValue = false } = props
  const [enabled, setEnabled] = useState<boolean>(defaultValue)
  const circleAnimatedValue = useMemo(() => new Animated.Value(0), [])

  const circleAnimated = useCallback(() => {
    circleAnimatedValue.setValue(!enabled ? 1 : 0)
    Animated.timing(circleAnimatedValue, {
      toValue: !enabled ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [enabled])

  useEffect(() => {
    circleAnimated()
  }, [enabled])

  return (
    <Touchable
      {...props}
      onPress={useCallback(() => {
        setEnabled((prev) => {
          onTouch && onTouch(!prev)
          return !prev
        })
      }, [setEnabled, onTouch, enabled])}
    >
      <Container enabled={enabled} colors={colors}>
        <Animated.View
          style={
            {
              borderRadius: 24,
              height: 16,
              width: 16,
              borderWidth: 2,
              borderStyle: 'solid',
              borderColor: enabled ? colors.switchActive : colors.border,
              backgroundColor: enabled
                ? colors.switchActive
                : colors.background,
              transition: 'all 0.3s',
              transform: [
                {
                  translateX: circleAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 16],
                  }),
                },
              ],
            } as any
          }
        />
      </Container>
    </Touchable>
  )
}
