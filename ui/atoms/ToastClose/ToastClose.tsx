import { FunctionComponent, MouseEvent } from "react"
import styled from "styled-components"

export const StyledCloseButton = styled("a")``

type ToastCloseProps = {
  closeToast?(event?: MouseEvent<HTMLButtonElement>): void
}

export const ToastClose: FunctionComponent<ToastCloseProps> = ({ closeToast }: ToastCloseProps) => (
  <StyledCloseButton onClick={() => closeToast()} />
)

ToastClose.defaultProps = {
  closeToast: (): void => undefined,
}

export default ToastClose
