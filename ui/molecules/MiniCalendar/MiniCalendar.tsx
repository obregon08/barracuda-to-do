import DateFnsUtils from "@date-io/date-fns"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import dayjs, { Dayjs } from "dayjs"
import weekday from "dayjs/plugin/weekday"
import { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"

import Box from "../../atoms/Box/Box"
import Button from "../../atoms/Button/Button"
import Text from "../../atoms/Text/Text"

dayjs.extend(weekday)

const MiniCalendarWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 0 10px;
`
const DayButton = styled(({ isActiveDay, ...rest }) => <Button {...rest} />)<{ isActiveDay: boolean }>`
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, isActiveDay }) => (isActiveDay ? theme.colors.orange : "transparent")};
  min-width: auto;
  flex: 1;

  &:hover {
    ${({ theme, isActiveDay }) =>
      isActiveDay &&
      `
      background-color: ${theme.colors.orange};
    `}
  }
`
const SKeyboardDatePicker = styled(KeyboardDatePicker)`
  margin-top: 0;

  & > div {
    &:before {
      border-bottom: 1px solid #fff;
    }
    &:after {
      border-bottom: none;
    }
  }

  input {
    color: #fff;
  }

  button {
    svg {
      path {
        color: #fff;
      }
    }
  }
`
const WeekDayText = styled(Text)`
  text-transform: capitalize;
`

export type MiniCalendarProps = {
  date: Dayjs
  onDateChange: (date: Dayjs) => void
}

const MiniCalendar: FunctionComponent<MiniCalendarProps> = ({ date, onDateChange }: MiniCalendarProps) => {
  const days = [0, 1, 2, 3, 4, 5, 6]
  const [dayNumbers, setDayNumbers] = useState<Dayjs[] | null>(null)

  const handleDateChange = (date: Date | null) => {
    onDateChange(dayjs(date))
  }

  const processWeekDay = () => {
    const today = dayjs(date)
    const dayNums = []
    days.map((_day, i) => {
      dayNums.push(today.weekday(i))
    })
    setDayNumbers(dayNums)
  }

  useEffect(() => {
    processWeekDay()
  }, [date])

  return (
    <MiniCalendarWrapper data-test-id="minicalendar">
      <Box display="flex" p="xs">
        <Box display="flex" width="100%">
          <Text as="h1" fontSize={22}>
            {date.format("MMMM")}
          </Text>
        </Box>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SKeyboardDatePicker
            margin="normal"
            format="MM/dd/yyyy"
            value={date}
            onChange={handleDateChange}
            id="minicalendar-input"
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box display="flex">
        {dayNumbers &&
          days.map((day, i) => (
            <Box
              key={day}
              px="sm"
              pl={i === 0 ? 0 : "sm"}
              pr={i === days.length - 1 ? 0 : "sm"}
              flex={1}
              display="flex"
              flexDirection="column"
            >
              <WeekDayText align="center" bold>
                {dayNumbers[i].format("dd")}
              </WeekDayText>
              <DayButton
                variant="contained"
                size="small"
                isActiveDay={dayNumbers && dayNumbers[i].format("L") === date.format("L")}
                color="primary"
                onClick={() => onDateChange(dayNumbers[i])}
              >
                {dayNumbers[i].format("D")}
              </DayButton>
            </Box>
          ))}
      </Box>
    </MiniCalendarWrapper>
  )
}

export default MiniCalendar
