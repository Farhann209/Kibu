'use client'
import GuestForm from '@/components/guestForm/page'
import Sidebar from '@/components/sidebar/page'
import React from 'react'
import {useSelector} from 'react-redux'

const page = () => {
  const value = useSelector(state=>state.counter)
  return (
    <div>
        <GuestForm/>

    </div>
  )
}

export default page