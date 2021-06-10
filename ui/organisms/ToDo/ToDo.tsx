import { Container } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import AddIcon from "@material-ui/icons/Add"
import dayjs, { Dayjs } from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import { FunctionComponent, useState } from "react"

import useTodos, { create, remove, update } from "../../../providers/useToDos"
import Button from "../../atoms/Button/Button"
import Card from "../../atoms/Card/Card"
import Loading from "../../atoms/Loading/Loading"
import SGrid from "../../atoms/SGrid/SGrid"
import MiniCalendar from "../../molecules/MiniCalendar/MiniCalendar"
import ToDoForm from "../../molecules/ToDoForm/ToDoForm"
import ToDoList from "../../molecules/ToDoList/ToDoList"
import { useTranslation } from "next-i18next"

dayjs.extend(LocalizedFormat)

const ToDo: FunctionComponent = () => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(new Date()))
  const { data, isLoading, mutate } = useTodos(selectedDate)

  const { t } = useTranslation("common")

  const handleToggleToDo = async (todo, e) => {
    await update({ ...todo, done: e.target.checked })
    mutate()
  }

  const handleDelete = async (todo) => {
    if (confirm(t("areYouSure"))) {
      await remove(todo)
      mutate()
    }
  }
  const handleCreate = async (todo) => {
    await create(todo)
    mutate()
    setIsCreateFormVisible(false)
  }

  return (
    <Container maxWidth="sm">
      <Card
        header={
          <MiniCalendar
            date={selectedDate}
            onDateChange={(date) => {
              setSelectedDate(date)
            }}
          />
        }
      >
        <CardContent>
          {selectedDate && !isCreateFormVisible ? (
            <div>
              {t("showingTasks")} {selectedDate.format("L")}
            </div>
          ) : null}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {isCreateFormVisible ? (
                <ToDoForm
                  headerText={t("createTask")}
                  onSave={handleCreate}
                  onCancel={() => setIsCreateFormVisible(false)}
                  date={selectedDate}
                />
              ) : (
                <ToDoList data={data} onToggleToDo={handleToggleToDo} onDelete={handleDelete} />
              )}
            </>
          )}

          {!isCreateFormVisible && (
            <SGrid item align="right" mt="sm">
              <Button variant="contained" color="primary" onClick={() => setIsCreateFormVisible(true)}>
                <AddIcon />
              </Button>
            </SGrid>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default ToDo
