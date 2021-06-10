import { TextField as MuiTextField } from "@material-ui/core"
import styled from "styled-components"

const TextField = styled(MuiTextField)``

TextField.defaultProps = {
  variant: "outlined",
}

export default TextField
