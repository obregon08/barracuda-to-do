import { FunctionComponent } from "react"
import styled from "styled-components"

import Footer from "../../organisms/Footer/Footer"
import Header from "../../organisms/Header/Header"
import ToDo from "../../organisms/ToDo/ToDo"

const Main = styled("main")`
  display: flex;
  flex: 1;
  align-items: flex-start; // use "center" to vertical align in the middle of the page
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: ${({ theme }) => theme.colors.offWhite};
  height: 100%;
`

const ToDoTemplate: FunctionComponent = () => (
  <>
    <Header />

    <Main>
      <ToDo />
    </Main>

    <Footer />
  </>
)

export default ToDoTemplate
