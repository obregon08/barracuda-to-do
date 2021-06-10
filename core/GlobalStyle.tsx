import { themeGet } from "@styled-system/theme-get"
import { createGlobalStyle } from "styled-components"

import fonts from "./fonts"

const GlobalStyle = createGlobalStyle`
 /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: ${themeGet("textFont")};
    vertical-align: baseline;
    -webkit-font-smoothing: antialiased;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* End Reset */
  html {
    box-sizing: border-box;
    color: ${themeGet("text")};
    background-color: ${themeGet("background")};
    font-size: ${themeGet("fontSizes.1")}px;
    font-family: ${themeGet("headingFont")};
    ${themeGet("mediaQueries.md")} {
      font-size: ${themeGet("fontSizes.2")}px;
    }
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html, body, #__next {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  /* For Modal */
  [data-reach-dialog-overlay] {
    z-index: 2;
  }
 
 .Toastify__toast-container {
   position: fixed;
   z-index: 100000;
   top: 20px;
   right: 20px;
 }
  
  ${fonts}
`

export default GlobalStyle
