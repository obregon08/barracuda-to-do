type Event = {
  action: string
  category: string
  label?: string
  value?: string
}

const isDev = process.env.NODE_ENV === "development"

export const pageview = (url: string): void => {
  if (isDev) {
    console.log("pageview", url)
    return
  }

  if (typeof window !== "undefined" && Object.keys(window.dataLayer).length) {
    window.dataLayer.push({
      event: "pageview",
      page: { path: url },
    })
  }
}

export const event = ({ action, category, label, value }: Event): void => {
  if (isDev) {
    // console.log('event', { action, category, label, value });
    return
  }

  if (typeof window !== "undefined") {
    window.dataLayer.push({
      category,
      event: action,
      label,
      value,
    })
  }
}

export const hj = (action: string): void => {
  if (isDev) {
    // console.log('event', action);
    return
  }

  if (typeof window !== "undefined" && typeof window.hj === "function") {
    window.hj(action)
  }
}
