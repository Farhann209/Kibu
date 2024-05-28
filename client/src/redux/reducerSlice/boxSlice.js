import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    width : 50,
    height : 50,
    backgroundColor : 'red',
    borderRadius: '0%',
    right: 0,
    top: 0
}

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeWidth(state){
      if(state.borderRadius === '50%'){
        const newWidth = state.width + 5
        state.width = newWidth
        state.height = newWidth
      }
      else {
        state.width = state.width + 5
      }
    },

    changeHeight(state) {
      if(state.borderRadius === '50%'){
        const newHeight = state.height + 5
        state.width = newHeight
        state.height = newHeight
      }
      else {
        state.height = state.height + 5
      }
    },
    changeShape(state){
      if(state.borderRadius === '0%'){
        state.borderRadius = '50%'
        state.width = state.height
      }
      else if (state.borderRadius === '50%'){
        state.borderRadius = '0%'
        state.width = state.height
      }
    },
    changeBackgroundColor(state, actions){
      state.backgroundColor = actions.payload
    },
    shiftPosition(state, actions){
      const {value, type} = actions.payload
      if(type === 'horizontal'){
        state.right = value
        state.top = 0
      }
      else{
        state.top = value
        state.right = 0
      }
    }
}
})

export const { changeHeight, changeWidth, changeShape, changeBackgroundColor, shiftPosition } = boxSlice.actions
export default boxSlice.reducer