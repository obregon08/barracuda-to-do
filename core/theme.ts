import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import { darken } from "polished"
import { DefaultTheme } from "styled-components"

export const createMediaQuery = (s: string): string => `@media screen and (min-width:${s})`

const addAliases = (arr: string[] | number[], aliases: string[]) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i]
      },
    })
  )

export const breakpoints = ["480px", "768px", "992px", "1220px"]

export const mediaQueries = breakpoints.map(createMediaQuery)

const aliases = ["sm", "md", "lg"]

addAliases(breakpoints, aliases)
addAliases(mediaQueries, aliases)

export const space = [0, 4, 8, 16, 32, 64, 128]
const spaceAliases = [
  "none",
  "xxs",
  "xs", // 8
  "sm", // 16
  "md", // 32
  "lg", // 64
  "xl",
]

addAliases(space, spaceAliases)

export const headingFont = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
export const textFont = `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif` // default NextJS

export const fontSizes = [12, 14, 16, 18, 20, 24, 32, 38, 40, 48, 56, 72]
export const fontFamilies = [
  headingFont,
  textFont,
  `"WTMannaSans,Arial,Arial Unicode MS,sans-serif"`,
  `'Heebo', sans-serif`,
  `"Sofia"`,
  `"Sacramento", cursive`,
  `"PT Sans"`,
]

export const light = 300
export const normal = 400
export const bold = 600
export const bolder = 700
export const boldest = 900

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
  light,
  normal,
  bold,
  bolder,
  boldest,
}

export const lineHeights = {
  comfortable: 1.75,
  standard: 1.5,
  display: 1.25,
  compact: 1,
}

const letterSpacings = {
  normal: "normal",
  caps: "0.025em",
}

// color palette
const alertBlue = "#cce5ff"
const alertBlueText = "#004085"
const alertGreen = "#e3fcef"
const alertGreenText = "#177f4b"
const alertRed = "#fde2e3"
const alertRedText = "#dc0000"
const alertYellow = "#fff3cd"
const alertYellowText = "#856404"
const black = "#070707"
const white = "#fff"
const offWhite = "#f0f0ef"
const lighterBlue = "#f9fdff"
const lightBlue = "#158AE0"
const blue = "#386195"
const darkBlue = "#263147"
const steelBlue = "#527B89"
const orange = "#f26522"
const orangeRed = "#D33F12"
const lightPeach = "#fee0ce"
const lighterPeach = "#fbf1ee"
const lightestPeach = "#fef7ef"
const darkPeach = "#DA7E65"
const darkerPeach = "#D33F12"
const lightGray = "#e7e6e4"
const borderGray = "#E1E1E1"
const gray = "#626568"
const darkGray = "#373433"
const green = "#126E5C"
const red = "#EB003B"
const yellow = "#F8E71C"
const purple = "#A8A8CD"
const darkPurple = "#7073A6"
const darkPurpleSecondary = "#454555"
const purpleSecondary = "#AAAABC"
const transparent = "#00000000"
const lightPink = "#FBF1EE"
const paleRed = "#DA7E65"
const lightPurple = "#EBECFF"
const errorContainer = "rgba(199,0,0, .1)"
const formErrorText = "#C70000"
const tableBorderGray = "#E0E0E0"
const actionGray = "#C8C8D3"

const attentionRed = "#B00020"
const attentionGray = "#707070"

// color alias
const primary = blue
const primaryDark = darken(0.1, primary)
const secondary = steelBlue
const secondaryDark = darken(0.1, secondary)
const warning = attentionRed
const attention = attentionGray

export const colors = {
  alertBlue,
  alertBlueText,
  alertGreen,
  alertGreenText,
  alertRed,
  alertRedText,
  alertYellow,
  alertYellowText,
  black,
  white,
  offWhite,
  lighterBlue,
  lightBlue,
  blue,
  darkBlue,
  steelBlue,
  orange,
  orangeRed,
  lightPeach,
  lighterPeach,
  lightestPeach,
  darkPeach,
  darkerPeach,
  lightGray,
  borderGray,
  gray,
  darkGray,
  green,
  red,
  primary,
  primaryDark,
  secondary,
  transparent,
  yellow,
  purple,
  darkPurple,
  darkPurpleSecondary,
  purpleSecondary,
  lightPink,
  paleRed,
  lightPurple,
  errorContainer,
  formErrorText,
  tableBorderGray,
  actionGray,
  attentionGray,
}

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = [0, 4, 8]
export const radius = "0px"

export const maxContainerWidth = "1280px"

// boxShadows
export const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`,
]

// animation easing curves
const easeInOut = "cubic-bezier(0.5, 0, 0.25, 1)"
const easeOut = "cubic-bezier(0, 0, 0.25, 1)"
const easeIn = "cubic-bezier(0.5, 0, 1, 1)"

const timingFunctions = {
  easeInOut,
  easeOut,
  easeIn,
}

// animation duration
export const duration = {
  fast: `150ms`,
  normal: `300ms`,
  slow: `450ms`,
  slowest: `600ms`,
}

// animation delay
const transitionDelays = {
  small: `60ms`,
  medium: `160ms`,
  large: `260ms`,
  xLarge: `360ms`,
}

const padding = {
  tiny: "5px",
  small: "10px",
  medium: "15px",
  large: "25px",
  xLarge: "45px",
}

const margin = {
  ...padding,
}

const shared = {
  breakpoints,
  mediaQueries,
  space,
  headingFont,
  textFont,
  fontSizes,
  fontFamilies,
  fontWeights,
  lineHeights,
  letterSpacings,
  colors,
  primary,
  secondary,
  secondaryDark,
  radii,
  radius,
  boxShadows,
  maxContainerWidth,
  timingFunctions,
  duration,
  transitionDelays,
  padding,
  margin,
  warning,
  attention,
  primaryDark,
}

type MyTheme = {
  mui: any
  [k: string]: any
}

const theme: DefaultTheme & MyTheme = {
  mui: createMuiTheme({
    // https://material-ui.com/customization/default-theme/?expand-path=$.typography
    typography: {
      fontFamily: fontFamilies[1],
      fontSize: fontSizes[1],
      button: {
        fontFamily: fontFamilies[1],
      },
    },
    palette: {
      primary: {
        main: shared.primary,
      },
      secondary: {
        main: shared.secondary,
        dark: shared.secondaryDark,
      },
      warning: {
        main: shared.warning,
        light: shared.attention,
      },
    },
    shape: {
      borderRadius: 0,
    },
  }),
  ...shared,
}

export default theme
