import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      state.token = payload.token
    },
    logoutUser: (state, action) => {
      state.token = null
    }
  }
})

export const {loginUser, logoutUser} = authReducer.actions

export default authReducer.reducer
