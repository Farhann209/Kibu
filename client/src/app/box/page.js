'use client'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Input} from "@nextui-org/react";
import { changeHeight, changeWidth, changeShape, changeBackgroundColor, shiftPosition } from '@/redux/reducerSlice/boxSlice';

const Box = () => {
    const {backgroundColor, height, width, borderRadius, right, top} = useSelector(state => state.box)
    const dispatch = useDispatch()
    const generateArea = () => {
      if(borderRadius === '50%'){
        return ('Area of the circle = ', Math.PI * (width/2) ** 2) 
      }
      else if (borderRadius === '0%') {
        return ('Area of the rectangle = ', height*width)
      }
    }
  return (
    <div className='flex items-center flex-col p-20'>
    <div style={{backgroundColor, height, width, borderRadius, right, top, position:'relative', margin:'200px' }}>
    </div>
    {generateArea()}
    <Button onClick={()=> dispatch(shiftPosition({value: 100, type: 'horizontal'}))}>Left</Button>
    <Button onClick={()=> dispatch(shiftPosition({value: 0, type: 'horizontal'}))}>Center</Button>
    <Button onClick={()=> dispatch(shiftPosition({value: -100, type: 'horizontal'}))}>Right</Button>
    <Button onClick={()=> dispatch(shiftPosition({value: -100, type: 'vertical'}))}>Top</Button>
    <Button onClick={()=> dispatch(shiftPosition({value: 100, type: 'vertical'}))}>Bottom</Button>


    <Button onClick={()=>dispatch(changeWidth()) }>+Width</Button>
    <Button onClick={()=> dispatch(changeHeight())}>+Height</Button>
    <Button  onClick={()=> dispatch(changeShape())}>Change shape</Button>
    <Input onChange={(e)=>dispatch(changeBackgroundColor(e.target.value)) } placeholder='Enter color'/>
    </div>
  )
}

export default Box