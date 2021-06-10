import { Meta, Story } from "@storybook/react"

import Header from "./Header"

export default {
  title: "ui/organisms/Header",
  component: Header,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <Header {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
