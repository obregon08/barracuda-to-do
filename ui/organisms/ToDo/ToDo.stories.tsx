import { Meta, Story } from "@storybook/react"

import ToDo from "./ToDo"
import dayjs from "dayjs"

export default {
  title: "ui/organisms/ToDo",
  component: ToDo,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <ToDo {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {}
