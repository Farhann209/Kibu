import { createSlice } from '@reduxjs/toolkit'

// Initial state for the listing slice of the Redux store
const initialState = { 
    listingDetails: {}  // Stores details about a specific listing (e.g., room or apartment information)
}

// Create a slice for managing listing-related state
const listingSlice = createSlice({
  name: 'listing',          // Name of the slice
  initialState,             // Initial state for the slice
  reducers: {

    // Action to set the details of a listing
    setListingDetails(state, action) {
      const { listing } = action.payload;  // Extract listing details from the action payload
      return {
        ...state,           // Keep the existing state
        listingDetails: listing // Store the listing's details (e.g., description, images, amenities)
      }
    },
  },
})

// Export the action creator for setting listing details
export const { setListingDetails } = listingSlice.actions

// Export the reducer to be used in the Redux store
export default listingSlice.reducer
