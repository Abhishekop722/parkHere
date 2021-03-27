import { createContext } from "react"


const ReduxContext = createContext({})

export const ReduxProvider = ReduxContext.Provider
export const ReduxConsumer = ReduxContext.Consumer
export default ReduxContext