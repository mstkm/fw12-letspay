import { createSlice } from "@reduxjs/toolkit";
// import {loginAction} from '../actions/auth'

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      state.token = payload
    },
    logoutUser: (state, action) => {
      state.token = null
      state.firstName = null
      state.lastName = null
      state.email = null
      state.password = null
    }
  },
  extraReducers: (build) => {
    // build.addCase(loginAction.fulfilled, (state, {payload}) => {
    //   state.token = payload
    // })
  }
})

export const {loginUser, logoutUser} = authReducer.actions

export default authReducer.reducer
