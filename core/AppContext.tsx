import { createContext, FunctionComponent, ReactElement, ReactNode, useState } from "react"

type Session = {
  data: any
}

type Store = {
  data: any
}

type AppContextProps = {
  session: Session | undefined
  updateSession(Session): void
  store: Store | undefined
  updateStore(Store): void
}

const AppContext = createContext<AppContextProps>({
  session: undefined,
  updateSession: () => undefined,
  store: undefined,
  updateStore: () => undefined,
})

interface AppProviderProps {
  children: ReactNode
}

const AppProvider: FunctionComponent<AppProviderProps> = ({ children }: AppProviderProps): ReactElement => {
  const initialState = { data: {} }
  const [store, setStore] = useState<Store>({ data: {} })
  const [session, setSession] = useState<Session>(() => {
    try {
      const item = window.sessionStorage.getItem("session")
      return item ? JSON.parse(item) : initialState
    } catch (error) {
      return initialState
    }
  })

  const updateSession = (newSession: Session) => {
    const newState = { data: newSession }
    setSession(newState)
    window.sessionStorage.setItem("session", JSON.stringify(newState))
  }

  const updateStore = (newStore: Store) => {
    const newState = { data: newStore }
    setStore(newState)
  }

  return <AppContext.Provider value={{ session, updateSession, store, updateStore }}>{children}</AppContext.Provider>
}

export { AppProvider }
export default AppContext
