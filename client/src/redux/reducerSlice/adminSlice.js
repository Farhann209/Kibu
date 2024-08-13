import { createSlice } from '@reduxjs/toolkit'

// Initial state for the admin slice of the Redux store
const initialState = { 
    isLoggedIn: false,   // Tracks if the admin is logged in
    token: '',           // Stores the authentication token
    adminDetails: {}     // Stores the details of the logged-in admin
}

// Create a slice for managing admin-related state
const adminSlice = createSlice({
  name: 'admin',         // Name of the slice
  initialState: initialState,  // Initial state for the slice
  reducers: {
    
    // Action to set admin login details after successful login
    setAdminLoginDetails(state, action) {
      const { admin, token } = action.payload;  // Extract admin details and token from the action payload
      return {
        ...state,          // Keep the existing state
        isLoggedIn: true,  // Set the login status to true
        token,             // Store the authentication token
        adminDetails: admin // Store the admin details
      }
    },

    // Action to log out the admin
    logoutAdmin(state, actions) {
        return initialState // Reset the state to the initial values, effectively logging out the admin
    },
  },
})

// Export the action creators for use in components
export const { setAdminLoginDetails, logoutAdmin } = adminSlice.actions

// Export the reducer to be used in the Redux store
export default adminSlice.reducer
