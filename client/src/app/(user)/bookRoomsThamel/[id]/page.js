'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import GuestForm from '@/components/guestForm/page';


const page = () => {
  return (
    <div className='flex m-2'>
       
    <h1 className='m-4 text-4xl text-green-600'><GuestForm/></h1>
    </div>
  )
}

export default page