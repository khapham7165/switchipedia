import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from './components'
import { useFonts } from 'expo-font'

export default function App() {
  const [fontsLoaded] = useFonts({
    // satoshi
    SatoshiLight: require('./assets/fonts/satoshi/Satoshi-Light.ttf'), // 300
    SatoshiLightItalic: require('./assets/fonts/satoshi/Satoshi-LightItalic.ttf'), // 300
    SatoshiRegular: require('./assets/fonts/satoshi/Satoshi-Regular.ttf'), // 400
    SatoshiItalic: require('./assets/fonts/satoshi/Satoshi-Italic.ttf'), // 400
    SatoshiMedium: require('./assets/fonts/satoshi/Satoshi-Medium.ttf'), // 500
    SatoshiMediumItalic: require('./assets/fonts/satoshi/Satoshi-MediumItalic.ttf'), // 500
    SatoshiVariable: require('./assets/fonts/satoshi/Satoshi-Variable.ttf'), // 600
    SatoshiVariableItalic: require('./assets/fonts/satoshi/Satoshi-VariableItalic.ttf'), // 600
    SatoshiBold: require('./assets/fonts/satoshi/Satoshi-Bold.ttf'), // 700
    SatoshiBoldItalic: require('./assets/fonts/satoshi/Satoshi-BoldItalic.ttf'), // 700
    SatoshiBlack: require('./assets/fonts/satoshi/Satoshi-Black.ttf'), // 900
    SatoshiBlackItalic: require('./assets/fonts/satoshi/Satoshi-BlackItalic.ttf'), // 900

    // roboto
    RobotoLight: require('./assets/fonts/roboto/Roboto-Light.ttf'), // 300
    RobotoLightItalic: require('./assets/fonts/roboto/Roboto-LightItalic.ttf'), // 300
    RobotoRegular: require('./assets/fonts/roboto/Roboto-Regular.ttf'), // 400
    RobotoItalic: require('./assets/fonts/roboto/Roboto-Italic.ttf'), // 400
    RobotoMedium: require('./assets/fonts/roboto/Roboto-Medium.ttf'), // 500
    RobotoMediumItalic: require('./assets/fonts/roboto/Roboto-MediumItalic.ttf'), // 500
    RobotoThin: require('./assets/fonts/roboto/Roboto-Thin.ttf'), // 600
    RobotoThinItalic: require('./assets/fonts/roboto/Roboto-ThinItalic.ttf'), // 600
    RobotoBold: require('./assets/fonts/roboto/Roboto-Bold.ttf'), // 700
    RobotoBoldItalic: require('./assets/fonts/roboto/Roboto-BoldItalic.ttf'), // 700
    RobotoBlack: require('./assets/fonts/roboto/Roboto-Black.ttf'), // 900
    RobotoBlackItalic: require('./assets/fonts/roboto/Roboto-BlackItalic.ttf'), // 900
  })

  if (!fontsLoaded) return <View>Loading fonts</View>
  return (
    <View style={styles.container}>
      <Text h1>This is Headline 1</Text>
      <Text h2>This is Headline 2</Text>
      <Text h3>This is Headline 3</Text>
      <Text h4>This is Headline 4</Text>
      <Text h5>This is Headline 5</Text>
      <Text h6>This is Headline 6</Text>

      <Text>This is Regular Text</Text>
      <Text bold>This is Bold Text</Text>
      <Text italic>This is Italic Text</Text>

      <Text p1>This is Paragraph 1</Text>
      <Text p2>This is Paragraph 2</Text>
      <Text p3>This is Paragraph 3</Text>

      <Text b1>This is Button 1</Text>
      <Text b2>This is Button 2</Text>
      <Text b3>This is Button 3</Text>
      <Text b3Sm>This is Button 3 Small</Text>

      <Text l1>This is Label 1</Text>
      <Text l2>This is Label 2</Text>
      <Text l3>This is Label 3</Text>
      <Text l4>This is Label 4</Text>
      <Text l5>This is Label 5</Text>
      <Button>Button</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})
