import { Box } from "@material-ui/core"
import { FunctionComponent } from "react"
import styled from "styled-components"

import theme from "../../../core/theme"
import NextHyperlink from "../../atoms/NextHyperlink/NextHyperlink"
import Text from "../../atoms/Text/Text"

const BrandingWrapper = styled(Box)`
  color: ${({ theme }) => theme.colors.offWhite};
`
const Logo = styled("img")`
  height: 48px;
  width: 48px;
  margin-right: ${({ theme }) => theme.margin.large};
`
const SNextHyperlink = styled(NextHyperlink)`
  align-items: center;
  display: flex;

  &:hover {
    text-decoration: none;
  }
`

const Branding: FunctionComponent = () => (
  <BrandingWrapper display="flex" alignItems="center" width="100%">
    <SNextHyperlink href="/">
      <Logo src="/logo.png" alt="logo" />
      <Text as="h1" fontSize={3} ff={2} fontWeight="bold" color={theme.colors.offWhite}>
        Barracuda To-Do
      </Text>
    </SNextHyperlink>
  </BrandingWrapper>
)

export default Branding
