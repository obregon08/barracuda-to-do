/* eslint-disable react/jsx-props-no-spreading */
import Text from "./Text"

export default {
  title: "ui/atoms/Text",
  component: Text,
  argTypes: {
    color: { control: "color" },
  },
}

const Template = (args) => (
  <Text {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </Text>
)

export const Regular = Template.bind({})
Regular.args = {
  ...Text.defaultProps,
}
