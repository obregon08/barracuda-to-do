import { Menu, MenuItem } from "@material-ui/core"
import { useRouter } from "next/router"
import { FunctionComponent, useState } from "react"
import styled from "styled-components"

import { ReactComponent as LangIcon } from "../../../public/icons/language_switch.svg"
import Button from "../../atoms/Button/Button"
import Text from "../../atoms/Text/Text"
import dayjs from "dayjs"

const LanguageSwitchIcon = styled(({ fillColor, ...rest }) => <LangIcon {...rest} />)<{ fillColor?: string }>`
  fill: ${({ theme, fillColor }) => fillColor || theme.colors.offWhite};
`
const LanguageSwitchButton = styled(Button)`
  height: 48px;
`

export type Props = {
  fillColor?: string
}

const LanguageSwitcher: FunctionComponent<Props> = ({ fillColor }: Props) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSwitchLanguage = (locale) => {
    router.push(router.pathname, router.pathname, { locale })
    dayjs.locale(locale)
    handleClose()
  }

  return (
    <>
      <LanguageSwitchButton onClick={handleClick}>
        <LanguageSwitchIcon fillColor={fillColor} />
      </LanguageSwitchButton>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSwitchLanguage("en")}>
          <Text fontWeight={router.locale === "en" ? "bolder" : "regular"}>English</Text>
        </MenuItem>
        <MenuItem onClick={() => handleSwitchLanguage("es")}>
          <Text fontWeight={router.locale === "es" ? "bolder" : "regular"}>Español</Text>
        </MenuItem>
        <MenuItem onClick={() => handleSwitchLanguage("fr")}>
          <Text fontWeight={router.locale === "fr" ? "bolder" : "regular"}>Français</Text>
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
