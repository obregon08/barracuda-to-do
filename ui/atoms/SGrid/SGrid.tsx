import { Grid, GridProps } from "@material-ui/core"
import styled from "styled-components"
import {
  alignSelf,
  AlignSelfProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

import { align, AlignProps, pointer } from "../Text/Text"

export type SGridProps = {
  pointer?: boolean
} & SpaceProps &
  WidthProps &
  HeightProps &
  MaxWidthProps &
  DisplayProps &
  GridProps &
  AlignSelfProps &
  AlignProps &
  FlexboxProps

export const SGrid = styled(({ pointer: _pointer, maxWidth: _maxWidth, alignSelf, forwardRef, ...rest }) => (
  <Grid ref={forwardRef} {...rest} />
))<SGridProps>`
  ${width} ${height} ${maxWidth} ${display} ${space} ${align} ${pointer} ${alignSelf} ${flexbox};
  position: relative;
  z-index: 100;
`

SGrid.displayName = "SGrid"

export default SGrid
