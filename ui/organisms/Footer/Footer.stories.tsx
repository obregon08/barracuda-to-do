import { Meta, Story } from "@storybook/react"

import Footer from "./Footer"

export default {
  title: "ui/organisms/Footer",
  component: Footer,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <Footer {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
