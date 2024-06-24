import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    token: '',
    guestDetails: {}
}

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuestDetails(state, action) {
      const { guest, token } = action.payload;
      return {
        ...state,
        token,
        guestDetails: guest

       }
    },
  },
})

export const { setGuestDetails } = guestSlice.actions
export default guestSlice.reducer
