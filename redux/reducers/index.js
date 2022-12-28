import { combineReducers } from "@reduxjs/toolkit";
import auth from './auth';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: 'auth',
  storage
}

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth)
})

export default reducer
