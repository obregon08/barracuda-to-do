import { Meta, Story } from "@storybook/react"

import MiniCalendar, { MiniCalendarProps } from "./MiniCalendar"
import dayjs from "dayjs"

export default {
  title: "ui/molecules/MiniCalendar",
  component: MiniCalendar,
  argTypes: {},
} as Meta

const Template: Story = (args: MiniCalendarProps, { globals }) => <MiniCalendar {...args} {...globals} />

export const Default = Template.bind({})
Default.args = {
  date: dayjs(),
  onDateChange: () => {},
}
