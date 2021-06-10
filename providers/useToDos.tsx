import useSWR, { SWRInfiniteConfigInterface } from "swr"

import api from "../services/api"
import fetcher, { useSWRResp } from "../services/fetcher"
import { Dayjs } from "dayjs"

export type ToDo = {
  id: number
  title: string
  dueDate: Date
  done: boolean
}

const useTodos = (date: Dayjs, swrOptions?: SWRInfiniteConfigInterface): useSWRResp => {
  const { data, error, ...rest } = useSWR(`/api/todos?date=${date.format("MM-DD-YYYY")}`, fetcher, swrOptions)

  return {
    data,
    isLoading: !error && !data,
    error,
    ...rest,
  }
}

export const create = (data: ToDo) => {
  return api.put(`/api/todos`, data)
}

export const update = (data: ToDo) => {
  return api.patch(`/api/todos`, data)
}

export const remove = (data: ToDo) => {
  return api.delete(`/api/todos?id=${data.id}`)
}

export default useTodos
