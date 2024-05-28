'use client'
import CustomNavBar from '@/components/bookNavBar/page'
import React from 'react'
import Image from 'next/image';
import ChooseDate from '@/components/datepicker/page';
import RoomCard from '@/components/roomCards/page';

const page = () => {
  return (
    <div>
      <div>
      <CustomNavBar/>
      </div>
      <div>
      <ChooseDate/>
      </div>
      <div className='mt-4'>
        <RoomCard/>
      </div>
    </div>
  )
}

export default page