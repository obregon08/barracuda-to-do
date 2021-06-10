import MockAdapter from "axios-mock-adapter"
import { FunctionComponent, useEffect } from "react"

import api from "./api" // This is an AxiosInstance

interface IProps {
  children: any
  mock: (adapter: MockAdapter) => void
}

const apiMock = new MockAdapter(api)

const AxiosMock: FunctionComponent<IProps> = ({ children, mock }: IProps) => {
  useEffect(() => {
    mock(apiMock)
    return () => {
      apiMock.reset()
    }
  })
  return children
}

export default AxiosMock
