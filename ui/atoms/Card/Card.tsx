import { Card as MuiCard, CardContent, CardHeader } from "@material-ui/core"
import { FunctionComponent, ReactNode } from "react"
import styled from "styled-components"

const SCard = styled(MuiCard)`
  display: flex;
  background: ${({ theme }) => theme.colors.white} 0% 0% no-repeat padding-box;
  border-radius: 4px;
  flex-direction: row;
`

const SHeader = styled(CardHeader)`
  background: ${({ theme }) => theme.colors.primary} 0% 0% no-repeat;
  border-radius: 4px 4px 0px 0px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  font-family: ${({ theme }) => theme.fontFamilies[0]};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.padding.small};
  padding-left: ${({ theme }) => theme.padding.medium};
  display: flex;
  align-items: center;
`
const SDetails = styled.div`
  width: 100%;
`
const SCardContent = styled(CardContent)`
  flex: 1;
  padding: 4px !important;
  overflow-x: hidden;
`

type Props = {
  header: ReactNode | string
  children: ReactNode | string
}

const Card: FunctionComponent<Props> = ({ header, children }: Props) => (
  <SCard>
    <SDetails>
      <SHeader as="h3">{header}</SHeader>
      <SCardContent>{children}</SCardContent>
    </SDetails>
  </SCard>
)

export default Card
