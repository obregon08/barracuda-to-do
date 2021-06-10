import { MouseEvent } from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

export type TransparentButtonProps = {
  onClick?(event: MouseEvent<HTMLButtonElement>): void
  ariaLabel?: string
} & SpaceProps

const ButtonTransparent = styled.button<TransparentButtonProps>`
  background-color: ${({ theme }) => theme.colors.transparent};
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;

  ${space}
`

ButtonTransparent.displayName = "ButtonTransparent"

export default ButtonTransparent
