import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import { space, SpaceProps } from "styled-system"

import { align, bold } from "../Text/Text"

export const hyperlink = css<{ textColor?: string }>`
  color: ${({ textColor }) => textColor || themeGet("colors.primary")};
  text-decoration: none;
`

export type HyperlinkProps = {
  bold?: boolean
  id?: string
  align?: "center" | "left" | "right"
  textColor?: string
  href?: string
  tabIndex?: number
  onClick?: (e: any) => any
} & SpaceProps

export const Hyperlink = styled.a<HyperlinkProps>`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${bold}
  ${align}

  ${hyperlink}

  ${space}
`

Hyperlink.displayName = "Hyperlink"
Hyperlink.defaultProps = {
  bold: true,
}

export default Hyperlink
