import { Checkbox, FormControl, FormControlLabel, InputLabel } from "@material-ui/core"
import { Dayjs } from "dayjs"
import { Form, Formik } from "formik"
import { useTranslation } from "next-i18next"
import { FunctionComponent, useState } from "react"
import styled from "styled-components"
import * as Yup from "yup"

import theme from "../../../core/theme"
import BootstrapInput from "../../atoms/BootstrapInput/BootstrapInput"
import Box from "../../atoms/Box/Box"
import Button from "../../atoms/Button/Button"
import SGrid from "../../atoms/SGrid/SGrid"
import Text from "../../atoms/Text/Text"

type ToDoCreateProps = {
  headerText: string
  onSave: (ToDo) => void
  onCancel: () => void
  date: Dayjs
}

const SInputLabel = styled(InputLabel)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

const ToDoForm: FunctionComponent<ToDoCreateProps> = ({ headerText, date, onSave, onCancel }: ToDoCreateProps) => {
  const { t } = useTranslation("common")

  const Schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    dueDate: Yup.date().required(t("required")),
  })

  return (
    <Formik
      initialValues={{
        title: "",
        dueDate: date,
        done: false,
      }}
      validationSchema={Schema}
      onSubmit={onSave}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <SGrid container item width="100%">
            <Text as="h2" ff={2} fontSize={4} fontWeight="normal" alignSelf="center">
              {headerText}
            </Text>
          </SGrid>
          <SGrid container item mt="sm">
            <FormControl fullWidth error={Boolean(errors.title && touched.title)}>
              <SInputLabel shrink htmlFor="bootstrap-input">
                {t("title")}
              </SInputLabel>
              <BootstrapInput
                name="title"
                id="title"
                type="title"
                value={values.title}
                onChange={handleChange}
                fullWidth
                autoFocus
              />
              {errors.title && touched.title ? (
                <Text small pt="xs" color={theme.colors.alertRedText}>
                  <i className="fas fa-exclamation-circle" /> {errors.title}
                </Text>
              ) : null}
            </FormControl>
          </SGrid>

          <FormControlLabel
            control={<Checkbox name="done" id="done" value={values.done} onChange={handleChange} color="primary" />}
            label={`${t("done")}?`}
          />

          <SGrid container mt="sm">
            <Box>
              <Button variant="contained" color="primary" type="submit" id="save-btn">
                {t("save")}
              </Button>
            </Box>
            <Box ml="sm">
              <Button variant="contained" color="default" type="button" onClick={onCancel} id="cancel-btn">
                {t("cancel")}
              </Button>
            </Box>
          </SGrid>
        </Form>
      )}
    </Formik>
  )
}

export default ToDoForm
