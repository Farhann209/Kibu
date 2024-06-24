'use client'
import React from 'react'
import Image from 'next/image'
import RoomCardThamel from '@/components/roomCard/page'
import { Grid, GridItem } from '@chakra-ui/react'
import CustomNavBar from '@/components/bookingPageNavBar/page'
import ChooseDate from '@/components/datepicker/page'
import {Button, ButtonGroup, Link} from "@nextui-org/react";

const page = () => {
    const bookRoomsThamel =[
        {id: 'F1', roomName: 'Cosy room near Thamel in a quiet neighborhood', roomImage:'/roomImagesThamel/F1.jpg' },
        {id: 'S1', roomName: 'Studio apartment 10 minutes from Thamel', roomImage:'/roomImagesThamel/S1.jpg' },
        {id: 'S2', roomName: 'Sunlit room with balcony near Thamel!', roomImage: '/roomImagesThamel/S2.jpg' },
        {id: 'S3', roomName: 'Huge Apartment for 3! 10 minutes from Thamel', roomImage: '/roomImagesThamel/S3.jpg' },
        {id: 'S4', roomName: 'Cosy room 10 minutes from Thamel!', roomImage:'/roomImagesThamel/S4.jpg' },
        {id: 'T1', roomName: 'Bright and airy room 10 mins. from Thamel', roomImage:'/roomImagesThamel/T1.jpg' },
        {id: 'T2', roomName: 'Studio apartment 10 minutes from Thamel', roomImage:'/roomImagesThamel/T2.jpg' },
        {id: 'T3', roomName: 'Top floor room with view (10 mins. from Thamel)', roomImage:'/roomImagesThamel/T3.jpg' },
        {id: 'S23', roomName: 'Beautiful 2 Bedroom apt. with balcony near Thamel', roomImage:'/roomImagesThamel/S2:3.jpg' },
        {id: 'T12', roomName: 'Spacious 2 bedroom apt. with terrace near Thamel', roomImage:'/roomImagesThamel/T1:2.jpg' },
    ]
  return (
    <div>
        <div>
        <CustomNavBar/>
      </div>
      <div> 
        <ChooseDate/>

      </div>
      <div className='mb-2 flex justify-between pt-3'>
        <div className='ml-4'>
        <ButtonGroup>
        <Button className='border-r border-black hover:bg-blue-400 font-semibold'>
        <Link href={'../bookRoomsThamel'} className='text-black'> Nayabazar </Link>
        </Button>
        <Button className='hover:bg-blue-400 font-semibold'>
        <Link href={'../bookRoomsBoudha'} className='text-black'> Boudha </Link>
        </Button>
        </ButtonGroup>
        </div>
        <div className='mr-4'>
          <Button color='primary' className='font-semibold'>Checkout</Button>
        </div>
      </div>
      <div>
        <Grid templateColumns='repeat(4, 1fr)' className="ml-4" gap={2}>
              {bookRoomsThamel.map((item)=> 
              
                  <GridItem>
                  <RoomCardThamel item={item}/>
                  </GridItem>)}
        </Grid> 
      </div>
   
    </div>
  )
}

export default page