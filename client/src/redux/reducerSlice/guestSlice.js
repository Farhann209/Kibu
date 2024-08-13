import { createSlice } from '@reduxjs/toolkit'

// Initial state for the guest slice of the Redux store
const initialState = { 
    token: '',            // Stores the authentication token (if needed for guest interactions)
    guestDetails: {}      // Stores details about the guest (e.g., name, booking info)
}

// Create a slice for managing guest-related state
const guestSlice = createSlice({
  name: 'guest',          // Name of the slice
  initialState,           // Initial state for the slice
  reducers: {
    
    // Action to set guest details after a guest has booked or provided their info
    setGuestDetails(state, action) {
      const { guest, token } = action.payload;  // Extract guest details and token from the action payload
      return {
        ...state,          // Keep the existing state
        token,             // Store the token (useful if you have guest-specific sessions)
        guestDetails: guest // Store the guest's details (e.g., booking information)
      }
    },
  },
})

// Export the action creator for setting guest details
export const { setGuestDetails } = guestSlice.actions

// Export the reducer to be used in the Redux store
export default guestSlice.reducer
