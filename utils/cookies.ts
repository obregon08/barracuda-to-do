// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

import * as cookie from "js-cookie"

export const setCookie = (key: string, value: string): void => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 7,
      path: "/",
    })
  }
}

export const removeCookie = (key: string): void => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const getCookie = (key: string, req: any = null): string => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

export const cookieIsSet = (key: string): boolean => {
  return getCookie(key) !== undefined
}

const getCookieFromBrowser = (key: string): string => {
  return cookie.get(key)
}

const getCookieFromServer = (key: string, req: any): string => {
  if (!req) {
    return undefined
  }
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie.split(";").find((c: any) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split("=")[1]
}
