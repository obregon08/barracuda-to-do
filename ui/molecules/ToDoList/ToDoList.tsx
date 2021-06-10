import { Checkbox, FormControlLabel } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import Timeline from "@material-ui/lab/Timeline"
import TimelineConnector from "@material-ui/lab/TimelineConnector"
import TimelineContent from "@material-ui/lab/TimelineContent"
import TimelineItem from "@material-ui/lab/TimelineItem"
import TimelineSeparator from "@material-ui/lab/TimelineSeparator"
import { useTranslation } from "next-i18next"
import { FunctionComponent, MouseEventHandler } from "react"
import styled from "styled-components"

import { ToDo } from "../../../providers/useToDos"
import Box from "../../atoms/Box/Box"
import Button from "../../atoms/Button/Button"
import SGrid from "../../atoms/SGrid/SGrid"
import Text from "../../atoms/Text/Text"

const STimelineItem = styled(TimelineItem)`
  &:before {
    display: none;
  }
`
const MutedText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray};
`
type ToDoListProps = {
  data: ToDo[]
  onToggleToDo: (todo: ToDo, e: any) => void
  onDelete: (ToDo) => void
}

const ToDoList: FunctionComponent<ToDoListProps> = ({ data, onToggleToDo, onDelete }: ToDoListProps) => {
  const { t } = useTranslation("common")
  return (
    <Box mt="sm" data-test-id="to-do-list">
      {data && data.length ? (
        data.map((todo) => (
          <SGrid container key={todo.id} data-test-id="list-item">
            <SGrid item xs={10}>
              <FormControlLabel
                control={<Checkbox color="primary" checked={todo.done} onClick={(e) => onToggleToDo(todo, e)} />}
                label={todo.done ? <s>{todo.title}</s> : todo.title}
              />
            </SGrid>
            <SGrid item xs={2}>
              <Button variant="text" onClick={() => onDelete(todo)}>
                <DeleteIcon />
              </Button>
            </SGrid>
          </SGrid>
        ))
      ) : (
        <MutedText>{t("noTasks")}</MutedText>
      )}
    </Box>
  )
}

export default ToDoList
