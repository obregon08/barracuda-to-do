/* eslint-disable react/jsx-props-no-spreading */
import "dayjs/locale/es"
import "dayjs/locale/fr"

import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles"
import { StylesProvider as MaterialStylesProvider } from "@material-ui/styles"
import dayjs from "dayjs"
import { NextComponentType, NextPageContext } from "next"
import App from "next/app"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import { appWithTranslation } from "next-i18next"
import { useEffect } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

import { AppProvider } from "../core/AppContext"
import ErrorBoundary from "../core/ErrorBoundary"
import GlobalStyle from "../core/GlobalStyle"
import theme from "../core/theme"
import { pageview } from "../lib/analytics"
import { init } from "../lib/sentry"
import ToastClose from "../ui/atoms/ToastClose/ToastClose"
import ToastContainer from "../ui/molecules/ToastContainer/ToastContainer"

declare global {
  interface Window {
    dataLayer: any
    hj: any
  }
}

export type AnyOtherProp = {
  [x: string]: any
}

init()

const AppWithContext = (props: { Component: NextComponentType<NextPageContext, any>; pageProps: any }) => {
  const { Component, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    Router.events.on("routeChangeComplete", pageview)

    return () => {
      Router.events.off("routeChangeComplete", pageview)
    }
  }, [])

  useEffect(() => {
    dayjs.locale(router.locale)
  }, [router.locale])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <MaterialThemeProvider theme={theme.mui}>
        <MaterialStylesProvider injectFirst>
          <StyledThemeProvider theme={theme}>
            <AppProvider>
              <GlobalStyle />
              <ErrorBoundary>
                <Component {...pageProps} />
                <ToastContainer
                  autoClose={false}
                  hideProgressBar
                  closeOnClick={false}
                  closeButton={<ToastClose />}
                  draggable={false}
                />
              </ErrorBoundary>
            </AppProvider>
          </StyledThemeProvider>
        </MaterialStylesProvider>
      </MaterialThemeProvider>
    </>
  )
}

export class MyApp extends App {
  render() {
    return <AppWithContext {...this.props} />
  }
}

export default appWithTranslation(MyApp)
