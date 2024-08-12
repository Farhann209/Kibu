import { createSlice } from '@reduxjs/toolkit'

const initialState = { 

    listingDetails: {}
}

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setListingDetails(state, action) {
      const { listing } = action.payload;
      return {
        ...state,
        listingDetails: listing

       }
    },
  },
})

export const { setListingDetails } = listingSlice.actions
export default listingSlice.reducer
