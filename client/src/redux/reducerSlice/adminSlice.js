import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    isLoggedIn: false,
    token: '',
    adminDetails: {}
}

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState,
  reducers: {
    
    setAdminLoginDetails(state, action) {
      const { admin, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token,
        adminDetails: admin
       }
    },
    logoutAdmin(state, actions) {
        return initialState
    },
  },
})

export const { setAdminLoginDetails, logoutAdmin } = adminSlice.actions
export default adminSlice.reducer
