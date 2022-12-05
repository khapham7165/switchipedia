import React from 'react'
import { ScrollView } from 'react-native'
import { BodyView, Button, Card, CardType, Text } from '@components'

export const Components = () => {
  return (
    <ScrollView>
      <BodyView>
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

        <Button>Primary Button</Button>
        <Button active>Active Primary Button</Button>
        <Button disabled>Disabled Primary Button</Button>

        <Button btnType={'secondary'}>Secondary Button</Button>
        <Button active btnType={'secondary'}>
          Active Secondary Button
        </Button>
        <Button disabled btnType={'secondary'}>
          Disabled Secondary Button
        </Button>

        <Button loading>Button</Button>
        <Button disabled loading>
          Button
        </Button>
        <Button btnType="secondary" disabled loading>
          Button
        </Button>

        <Card
          type={CardType.Horizontal}
          title="Horizontal Card Title"
          description="Horizontal Card Description"
          info="Horizontal Card Info"
        />
        <Card
          type={CardType.Vertical}
          title="Vertical Card Title"
          description="Vertical Card Description"
          info="Vertical Card Info"
        />
      </BodyView>
    </ScrollView>
  )
}
