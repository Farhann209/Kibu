'use client'
import Sidebar from '@/components/sidebar/page'
import React from 'react'

const page = () => {
  const value = useSelector(state=>state.counter)
  return (
    <div>
        <Sidebar/>

    </div>
  )
}

export default page