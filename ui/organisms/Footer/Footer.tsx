import { Box } from "@material-ui/core"
import { useTranslation } from "next-i18next"
import { FunctionComponent } from "react"
import styled from "styled-components"

import Hyperlink from "../../atoms/Hyperlink/Hyperlink"
import NextHyperlink from "../../atoms/NextHyperlink/NextHyperlink"
import SGrid from "../../atoms/SGrid/SGrid"
import Text from "../../atoms/Text/Text"

const FooterComponent = styled(Box)`
  display: flex;
  align-items: center;
  height: 50px;

  ${({ theme }) => `
    font-size: ${theme.fontSizes[1]};
    background: ${theme.colors.lightGray};
    color: ${theme.colors.darkGray};
  `}
`

const Footer: FunctionComponent = () => {
  const { t } = useTranslation("common")

  return (
    <FooterComponent>
      <SGrid container pl="md" pr="md">
        <SGrid item xs={12} sm={12} md align={["center", "center", "left"]}>
          <Text fontSize={1} ff={2}>
            © {new Date().getFullYear()} Barracuda To-Do
          </Text>
        </SGrid>
        <SGrid item xs md alignSelf="center" align={["center", "center", "right"]}>
          <NextHyperlink href="/support">{t("support")}</NextHyperlink>
        </SGrid>
      </SGrid>
    </FooterComponent>
  )
}

export default Footer
