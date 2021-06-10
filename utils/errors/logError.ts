/* eslint-disable no-console */
import * as Sentry from "@sentry/node"
import { ErrorInfo } from "react"

const logError = (error: Error, errorInfo: ErrorInfo | Record<string, any>): void => {
  if (process.env.NODE_ENV === "production") {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })

      Sentry.captureException(error)
    })
  } else {
    console.error(error)
    Object.keys(errorInfo).forEach((key) => {
      console.error(key, errorInfo[key])
    })
  }
}

export default logError
