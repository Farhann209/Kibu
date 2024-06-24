'use client'
import CustomNavBar from '@/components/bookingPageNavBar/page'
import ChooseDate from '@/components/datepicker/page'
import React from 'react'
import {Button, ButtonGroup, Link} from "@nextui-org/react";
import { RoomCardBoudha } from '@/components/roomCard/page'
import { Grid, GridItem } from '@chakra-ui/react'

const page = () => {
  const bookRoomsBoudha = [
    {id: '01', roomName: 'Entire serviced apartment in Kathmandu, Nepal', roomImage:'/roomImagesBoudha/01.jpg' },
    {id: '02', roomName: 'Cosy 2BHK apartment at Boudha at Kibu Apartments', roomImage:'/roomImagesBoudha/02.jpg' },
    {id: '03', roomName: 'Stunning and spacious 2BHK apartment at Boudha', roomImage: '/roomImagesBoudha/03.jpg' },
    {id: '04', roomName: 'Groovy studio at Boudha - with private balcony', roomImage: '/roomImagesBoudha/04.jpg' },
    {id: '05', roomName: 'Gorgeous and spacious apartment at Boudha', roomImage:'/roomImagesBoudha/05.jpg' },
    {id: '06', roomName: 'Serene Tibetan style 2BHK unit at Boudha', roomImage:'/roomImagesBoudha/06.jpg' },
    {id: '07', roomName: 'Entire serviced apartment in Kathmandu, Nepal', roomImage:'/roomImagesBoudha/07.jpg' },
    {id: '08', roomName: 'Traditional and Modern Oasis: Cosy place in Boudha', roomImage:'/roomImagesBoudha/08.jpg' },
    {id: '09', roomName: 'Charming -Spacious and Central 2BHK unit at Boudha', roomImage:'/roomImagesBoudha/09.jpg' }
  ]

  return (
    <div>
      <div>
        <CustomNavBar/>
      </div>
      <div>
        <ChooseDate/>
      </div>
      <div className='mb-2 flex justify-between	pt-3'>
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
        <div className='mr-7'>
          <Button color='primary' className='font-semibold'>Checkout</Button>
        </div>
      </div>
      <div className='ml-2'>
      <Grid templateColumns='repeat(3, 1fr)' className="m-2" gap={4}>
           {bookRoomsBoudha.map((item)=> 
              <GridItem>
              <RoomCardBoudha item={item}/>
              </GridItem>)}
        </Grid> 
      </div>
    </div>
  )
}

export default page