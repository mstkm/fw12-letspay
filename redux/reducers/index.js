import { combineReducers } from "@reduxjs/toolkit";
import auth from './auth';
import transfer from "./transfer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: 'auth',
  storage
}
const transferConfig = {
  key: 'auth',
  storage
}

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transfer: persistReducer(transferConfig, transfer)
})

export default reducer
