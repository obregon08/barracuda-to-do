/* eslint-disable react/jsx-props-no-spreading */
import TextField from "./TextField"

export default {
  title: "ui/atoms/TextField",
  component: TextField,
  argTypes: {},
}

const Template = (args) => <TextField label="Sample" {...args} />

export const Default = Template.bind({})
Default.args = {
  ...TextField.defaultProps,
}
