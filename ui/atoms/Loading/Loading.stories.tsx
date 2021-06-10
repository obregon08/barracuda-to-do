import { Meta, Story } from "@storybook/react"

import { Unknown } from "../../../core/constants"
import Loading from "./Loading"

export default {
  title: "ui/atoms/Loading",
  component: Loading,
  argTypes: {},
} as Meta

const Template: Story = (args: Unknown, { globals }) => <Loading {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
