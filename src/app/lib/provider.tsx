'use client'
import {NextUIProvider} from '@nextui-org/system'
import { Provider } from "react-redux"
//import store from "../store/store"
import { store, persistor } from "../store/store"
import { PersistGate } from "redux-persist/integration/react"

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </NextUIProvider>
        </Provider>
    )
}