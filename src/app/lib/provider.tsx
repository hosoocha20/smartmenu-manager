'use client'

import { Provider } from "react-redux"
//import store from "../store/store"
import { store, persistor } from "../store/store"
import { PersistGate } from "redux-persist/integration/react"

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {children}
            </PersistGate>
            
        </Provider>
    )
}