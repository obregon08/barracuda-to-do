import { Box } from "@material-ui/core"
import { FunctionComponent } from "react"
import styled from "styled-components"

import Branding from "../../molecules/Branding/Branding"
import LanguageSwitcher from "../../molecules/LanguageSwitcher/LanguageSwitcher"

const HeaderComponent = styled(Box)`
  display: flex;
  align-items: center;

  ${({ theme }) => `
    background: ${theme.colors.darkBlue};
    color: ${theme.colors.lightGray};
  `}
`

const Header: FunctionComponent = () => (
  <HeaderComponent>
    <Branding />
    <LanguageSwitcher />
  </HeaderComponent>
)

export default Header
