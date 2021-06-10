import { Meta, Story } from "@storybook/react"

import ToDoTemplate from "./ToDoTemplate"

export default {
  title: "ui/templates/ToDoTemplate",
  component: ToDoTemplate,
  argTypes: {},
} as Meta

const Template: Story = (args, { globals }) => <ToDoTemplate {...args} {...globals} />

export const Default = Template.bind({})
Default.parameters = {
  layout: "fullscreen",
}
Default.args = {}
