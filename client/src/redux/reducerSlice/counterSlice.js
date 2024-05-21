import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.value = state.value + 1
    },
    decrement(state) {
      state.value = state.value - 1
    },
    reset(state){
        state.value = 0
    }
  },
})

export default counterSlice.reducer