import { themeGet } from "@styled-system/theme-get"
import styled, { css, ThemeProps } from "styled-components"
import {
  alignSelf,
  AlignSelfProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  opacity,
  OpacityProps,
  space,
  SpaceProps,
} from "styled-system"

import { mq } from "../../../core/gridTheme"

type AlignOptions = "center" | "left" | "right"

export type AlignProps = {
  align?: AlignOptions | AlignOptions[]
}

export type TextProps = {
  bold?: boolean
  bolder?: boolean
  pointer?: boolean
  caps?: boolean
  small?: boolean
  fullWidth?: boolean
  noWrap?: boolean
  htmlFor?: string
  ff?: string | number // fontFamily
} & ColorProps &
  FontFamilyProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  SpaceProps &
  AlignProps &
  DisplayProps &
  OpacityProps &
  AlignSelfProps &
  ThemeProps<any>

export const noWrap = (props: TextProps): any => (props.noWrap ? { whiteSpace: "nowrap" } : null)

export const align = (props: TextProps): any => (props.align ? mq({ textAlign: props.align }) : null)

export const bold = (props: TextProps): any => (props.bold ? { fontWeight: props.theme.fontWeights.bold } : null)

export const pointer = (props: TextProps): any =>
  props.pointer
    ? `
  &:hover,
  &:active,
  &:active {
    cursor: pointer;
  }
`
    : null

export const bolder = (props: TextProps): any => (props.bolder ? { fontWeight: props.theme.fontWeights.bolder } : null)

export const caps = (props: TextProps): any =>
  props.caps
    ? {
        textTransform: "uppercase",
        letterSpacing: props.theme.letterSpacings.caps,
      }
    : null

const fullWidth = (props: TextProps) => (props.fullWidth ? { width: "100%" } : undefined)

const Text = styled.p<TextProps>`
  a,
  b,
  small {
    font-family: ${themeGet("textFont")};
  }

  ${(props) => {
    if (typeof props.ff !== "undefined") {
      if (typeof props.ff === "number" && typeof props.theme.fontFamilies[props.ff] !== "undefined") {
        return `font-family: ${props.theme.fontFamilies[props.ff]};`
      }
      return fontFamily(props)
    }
    return `font-family: ${props.theme.textFont};`
  }}

  ${align}
  ${bold}
  ${bolder}
  ${caps}
  ${bolder}
  ${pointer}
  ${alignSelf}

  font-size: ${({ theme }) => theme.fontSizes[1]}px;

  ${({ small, theme }) =>
    small &&
    css`
      font-size: ${theme.fontSizes[0]}px;

      ${theme.mediaQueries.md} {
        font-size: ${theme.fontSizes[1]}px;
      }
    `}

  ${fullWidth}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${space}
  ${noWrap}
  ${display}
  ${opacity}
`

Text.defaultProps = {
  bold: false,
  bolder: false,
  noWrap: false,
  caps: false,
  fullWidth: false,
  lineHeight: "standard",
}

export default Text
