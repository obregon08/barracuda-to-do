import styled from "styled-components"
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  height,
  HeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from "styled-system"

export type BoxProps = SpaceProps &
  WidthProps &
  HeightProps &
  ColorProps &
  TextAlignProps &
  DisplayProps &
  FlexProps &
  FlexDirectionProps

const Box = styled.div<BoxProps>`
  ${space} ${width} ${height} ${color} ${textAlign} ${display} ${flex} ${flexDirection}
`

Box.displayName = "Box"

export default Box
