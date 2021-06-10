import { Meta, Story } from "@storybook/react"
import dayjs from "dayjs"

import DatePicker, { DatePickerProps } from "./DatePicker"

export default {
  title: "ui/atoms/DatePicker",
  component: DatePicker,
  argTypes: {},
} as Meta

const Template: Story = (args: DatePickerProps, { globals }) => <DatePicker {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {
  value: dayjs(),
}
