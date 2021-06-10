import { Meta, Story } from "@storybook/react"

import LanguageSwitcher from "./LanguageSwitcher"

export default {
  title: "ui/molecules/LanguageSwitcher",
  component: LanguageSwitcher,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <LanguageSwitcher {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
