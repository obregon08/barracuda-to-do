import { Meta, Story } from "@storybook/react"

import { Unknown } from "../../../core/constants"
import Card from "./Card"

export default {
  title: "ui/atoms/Card",
  component: Card,
  argTypes: {},
} as Meta

const Template: Story = (args: Unknown, { globals }) => <Card {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {
  header: "Hello",
  body: "This is a test",
}
