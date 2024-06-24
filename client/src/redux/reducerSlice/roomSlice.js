import toast from 'react-hot-toast';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favItems: []
}


export const roomSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addFavItems: (state, actions) => {

        state.favItems.push(actions.payload)
        toast.success('added to cart')
    },
  },
})


export const { addFavItems } = roomSlice.actions

export default roomSlice.reducer