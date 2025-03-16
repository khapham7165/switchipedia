import { BodyView, Card, Text, Button, Chip } from '@components'
import React from 'react'
import { ScrollView } from 'react-native'

export const Components = () => {
  return (
    <ScrollView>
      <BodyView>
        <Text h1>Headline 1</Text>
        <Text h2>Headline 2</Text>
        <Text h3>Headline 3</Text>
        <Text h4>Headline 4</Text>
        <Text h5>Headline 5</Text>
        <Text h6>Headline 6</Text>

        <Text>Regular Text</Text>
        <Text bold>Bold Text</Text>
        <Text italic>Italic Text</Text>

        <Text p1>Paragraph 1</Text>
        <Text p2>Paragraph 2</Text>
        <Text p3>Paragraph 3</Text>

        <Text b1>Button 1</Text>
        <Text b2>Button 2</Text>
        <Text b3>Button 3</Text>
        <Text b3Sm>Button 3 Small</Text>

        <Text l1>Label 1</Text>
        <Text l2>Label 2</Text>
        <Text l3>Label 3</Text>
        <Text l4>Label 4</Text>
        <Text l5>Label 5</Text>

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
          type={'horizontal'}
          title="Horizontal Card Title"
          description="Horizontal Card Description"
          info="Horizontal Card Info"
        />
        <Card
          type={'vertical'}
          title="Vertical Card Title"
          description="Vertical Card Description"
          info="Vertical Card Info"
        />
        <Card loading />
        <Card type={'vertical'} loading />
        <Chip>Chip</Chip>
      </BodyView>
    </ScrollView>
  )
}
