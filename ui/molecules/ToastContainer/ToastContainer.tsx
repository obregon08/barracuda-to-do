/* eslint-disable react/jsx-props-no-spreading */

import { FunctionComponent } from "react"
import { ToastContainer, ToastContainerProps } from "react-toastify"
import styled from "styled-components"

import Hyperlink from "../../atoms/Hyperlink/Hyperlink"
import { StyledCloseButton } from "../../atoms/ToastClose/ToastClose"

export const toastProps = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

type WrappedToastContainerProps = ToastContainerProps & { className?: string }

export const WrappedToastContainer: FunctionComponent<WrappedToastContainerProps> = ({
  className,
  ...rest
}: WrappedToastContainerProps) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
)
WrappedToastContainer.defaultProps = {
  className: "",
}

export default styled(WrappedToastContainer).attrs({
  className: "Toastify__toast-container",
  toastClassName: "Toastify__toast",
  bodyClassName: "Toastify__toast-body",
})`
  .Toastify__toast-container {
  }
  .Toastify__toast {
    max-width: 400px;
    min-width: 300px;
    padding: 0;
    margin: ${({ theme }) => theme.space.sm}px 0 0 0;
    display: flex;
    flex-direction: row;
    position: relative;
    box-shadow: ${({ theme }) => theme.boxShadows[1]};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.primary};

    .Toastify__toast-body {
      margin-right: 0;
      margin-left: 45px;
      padding: 10px 40px 10px 10px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background: #fff;
      font-size: 14px;

      .Toastify__toast-icon {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        width: 45px;

        svg {
          fill: white;
        }
      }
    }

    & > button {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }

    &--info {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};

      .Toastify__toast-body {
        background: ${({ theme }) => theme.colors.lighterBlue};
      }

      button {
        svg {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }

    &--success {
      background: ${({ theme }) => theme.colors.alertGreenText};
      color: ${({ theme }) => theme.colors.alertGreenText};

      .Toastify__toast-body {
        background: ${({ theme }) => theme.colors.alertGreen};
      }

      button {
        svg {
          fill: ${({ theme }) => theme.colors.alertGreenText};
        }
      }
    }

    &--error {
      background: ${({ theme }) => theme.colors.alertRedText};
      color: ${({ theme }) => theme.colors.alertRedText};

      .Toastify__toast-body {
        background: ${({ theme }) => theme.colors.alertRed};
      }

      button {
        svg {
          fill: ${({ theme }) => theme.colors.alertRedText};
        }
      }
    }
  }

  .Toastify__toast-body {
    margin-right: ${({ theme }) => theme.space.sm}px;
    line-height: ${({ theme }) => theme.lineHeights.standard};
  }

  ${StyledCloseButton} {
    margin-left: auto;
  }
  ${Hyperlink} {
    color: inherit;
  }
`
