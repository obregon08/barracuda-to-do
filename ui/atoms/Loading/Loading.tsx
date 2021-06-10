import { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"

const ldsRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  text-align: center;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: 7px;
    width: 36px;
    height: 36px;
    margin: 10px auto;
    border: 4px solid #0379ce;
    border-radius: 50%;
    animation: ${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #0379ce transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const Loading: FunctionComponent = () => (
  <Wrapper>
    <div />
    <div />
    <div />
  </Wrapper>
)

export default Loading
