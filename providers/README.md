## Providers

**DEFINITION**: A file that contains code to fetch data and returns that to a component.
The sole purpose of the file is to fetch the data and "provide" it to a component.
Side effects should be very limited.
It can be a React hook, an HOC (Higher Order Component) or a container component.

### 1. React Hook (preferred way to fetch and share data in this project):

**WHY IS RECOMMENDED**: Hooks are an official React way of persisting state between re-renders. It's very simple to use
and reason about.

**WHAT IS A REACT HOOK?**: A React Hook is a function that lets you use state and other React features without writing a class.

We use react hooks in 2 different ways:

1. A provider hook that fetches content using SWR (https://swr.vercel.app/) and keeps it in "state" (local browser memory)
   until the page is refreshed. It persists data between component re-renders.
2. A provider hook that shares local data between components and keeps it in "state" (local browser memory)
   until the page is refreshed. It persists data between component re-renders. This is an alternative to Redux.
   It implements the Observer pattern (https://en.wikipedia.org/wiki/Observer_pattern)

SWR (stale-while-revalidate) will present stale data to the component while re-fetches data (or "revalidates").
Every so often (when user clicks on the page, or moves the mouse every X seconds), NextJS will fire a request to
revalidate the data. If there are no changes, it responds with status "304 Not Modified" in 1ms
(yes, one milisecond, very fast thanks to standard browser caching mechanism and NextJS use of ETags).
If you have multiple components using the same hook to fetch data, it won't fire multiple requests per instance.
The hook combines the requests and provides the data to the components at once.

Once you refresh the page, the provider has to fetch the data again.

No HTML or styling allowed here.

### 2. HOC (not recommended):

**WHY NOT RECOMMENDED**: If you need to fetch data from **ONE or SEVERAL places** to "configure" children components (pass the data as props),
it would be better to fetch the data from the actual component, most likely an ["organism"](../ui/organisms/README.md).

An HOC is a higher-order component. It's a function that takes a component and returns a new component.
A provider HOC takes a component, fetches data and passes that data as a prop to the component.

Minimal HTML allowed here, only for bare structure to pass props. No styling allowed here.

**Naming convention for HOC**: Name always starts with the word: "with". ie. "withStates" would be a
HOC that provides a list of the 50 US states to the component.

**Example implementation inspired by: https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/**

```tsx
// file: /providers/withHasScrolled.tsx
// any component wrapped in `withHasScrolled(MyComponent)` will receive `hasScrolled` as a prop.
// This HOC will detect when the user has scrolled the page.

import { FunctionComponent, useEffect, useState } from "react"

export type WithHasScrolledProps = {
  hasScrolled?: boolean
}

export type initialProps = {
  getInitialProps?: any
}

/* Based on https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/ */
export function withHasScrolled<T extends WithHasScrolledProps = WithHasScrolledProps>(
  WrappedComponent: initialProps & React.ComponentType<T>
): FunctionComponent {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component"

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithHasScrolled = (props: Omit<T, keyof WithHasScrolledProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const [hasScrolled, setHasScrolled] = useState(false)

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    useEffect(() => {
      handleScroll() // on page load
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent hasScrolled={hasScrolled} {...(props as T)} />
  }

  ComponentWithHasScrolled.displayName = `withHasScrolled(${displayName})`

  if (WrappedComponent.getInitialProps) {
    ComponentWithHasScrolled.getInitialProps = (ctx) => {
      return WrappedComponent.getInitialProps(ctx)
    }
  }
  return ComponentWithHasScrolled
}
```

### 3. Container Component (not recommended):

[comment]: <> (**WHEN TO USE**: If you need to fetch data from **several places** to "configure" children components &#40;pass the data as props&#41;)

**WHY NOT RECOMMENDED**: If you need to fetch data from **ONE or SEVERAL places** to "configure" children components (pass the data as props),
it would be better to fetch the data from the actual component, most likely an ["organism"](../ui/organisms/README.md).

A Container Component is similar to an HOC in the sense that it fetches data and passes it down to children components
via props. There are architectural differences between an HOC and a Container component outside the scope of this readme.

## Resources:

- React Hooks: https://reactjs.org/docs/hooks-intro.html
- SWR: https://swr.vercel.app/
- Observer Pattern: https://en.wikipedia.org/wiki/Observer_pattern
- Example HOC: https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
