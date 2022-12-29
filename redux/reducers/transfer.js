import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  notes: null,
  pin: null,
  recipientId: null,
  date: null,
  time: null
}

const transferReducer = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    transfer: (state, {payload}) => {
      state.amount = payload.amount
      state.notes = payload.notes
      state.pin = payload.pin
      state.recipientId = payload.recipientId
      state.date = payload.date
      state.time = payload.time
    },
    transferLogout: (state, {payload}) => {
      state.amount = null
      state.notes = null
      state.pin = null
      state.recipientId = null
      state.date = null
      state.time = null
    },

  },
  extraReducers: (build) => {
    // build.addCase(loginAction.fulfilled, (state, {payload}) => {
    //   state.token = payload
    // })
  }
})

export const {transfer, transferLogout} = transferReducer.actions

export default transferReducer.reducer
