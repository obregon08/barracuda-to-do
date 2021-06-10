import { Meta, Story } from "@storybook/react"

import Branding from "./Branding"

export default {
  title: "ui/molecules/Branding",
  component: Branding,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <Branding {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
