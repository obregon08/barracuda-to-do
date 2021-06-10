import DayjsUtils from "@date-io/dayjs"
import { KeyboardDatePicker, KeyboardDatePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Dayjs } from "dayjs"
import { FunctionComponent } from "react"

export interface DatePickerProps extends Omit<KeyboardDatePickerProps, "onChange"> {
  onChange?: (event: {
    target: {
      name: string
      value: string
    }
  }) => void
}

const DatePicker: FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
  const { name, onChange } = props

  const handleOnChange = (date: Dayjs | Date, _?: string) => {
    const event = {
      target: {
        name,
        value: date ? date.toString() : "",
      },
    }
    onChange(event)
  }

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <KeyboardDatePicker
        {...props}
        onChange={handleOnChange}
        inputVariant="outlined"
        disableToolbar
        InputLabelProps={{
          shrink: true,
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
