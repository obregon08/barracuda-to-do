import React, { useEffect } from "react"
import * as nextImage from "next/image"

import { StylesProvider as MaterialStylesProvider, ThemeProvider as MaterialThemeProvider } from "@material-ui/styles"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import GlobalStyle from "../core/GlobalStyle"
import theme from "../core/theme"
import { I18nextProvider } from "react-i18next"
import { i18nInit } from "./i18init"
import { withNextRouter } from "storybook-addon-next-router"

// Workaround for `next/Image`. Also see change in main.js
// see https://stackoverflow.com/questions/64622746/how-to-mock-next-js-image-component-in-storybook
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />
  },
})

// Global decorator to apply the styles to all stories

const withThemeProvider = (Story, context) => (
  <MaterialThemeProvider theme={theme.mui}>
    <MaterialStylesProvider injectFirst>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Story {...context} />
      </StyledThemeProvider>
    </MaterialStylesProvider>
  </MaterialThemeProvider>
)

const withI18n = (Story, context) => {
  useEffect(() => {
    i18nInit.changeLanguage(context.globals.locale)
  }, [context.globals.locale])

  return (
    <I18nextProvider i18n={i18nInit}>
      <Story {...context} locale={context.globals.locale} />
    </I18nextProvider>
  )
}

export const decorators = [withThemeProvider, withI18n, withNextRouter()]

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "🇺🇸", title: "English" },
        { value: "fr", right: "🇫🇷", title: "Français" },
        { value: "es", right: "🇪🇸", title: "Español" },
      ],
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
