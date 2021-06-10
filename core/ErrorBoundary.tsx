import { Component, ErrorInfo, ReactNode } from "react"

import logError from "../utils/errors/logError"

type Props = {
  children?: ReactNode
}

type State = {
  error?: null | Error
  errorInfo?: null | ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log in reporting service
    logError(error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { children } = this.props
    const { errorInfo, error } = this.state

    if (errorInfo && process.env.NODE_ENV === "development") {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      )
    }

    if (errorInfo) {
      return <h2>Something went wrong.</h2>
    }

    return children
  }
}

export default ErrorBoundary
