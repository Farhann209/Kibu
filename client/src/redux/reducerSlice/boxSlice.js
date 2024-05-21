import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    width : 50,
    height : 50,
    backgroundColor : 'red'
}

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeHeight(state) {
      state.height = state.height + 1
    }
}
})

export const { changeHeight } = boxSlice.actions
export default boxSlice.reducer