// Config store

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { persistStore } from 'redux-persist'

export const store = configureStore({
  reducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
