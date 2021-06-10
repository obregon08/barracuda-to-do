import { AxiosRequestConfig } from "axios"
import { responseInterface } from "swr"

import api from "./api"

export type useSWRResp = {
  isLoading: boolean
  isError?: boolean
  error?: boolean
} & responseInterface<any, any>

const fetcher = async (url: string, options?: AxiosRequestConfig): Promise<any> => {
  const resp = await api.get(url, options)
  return resp.data
}

export default fetcher
