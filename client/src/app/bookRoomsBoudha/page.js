'use client'
import CustomNavBar from '@/components/bookNavBar/page'
import React from 'react'
import Image from 'next/image';
import ChooseDate from '@/components/datepicker/page';
import {Button, ButtonGroup, Link} from "@nextui-org/react";
import RoomCardBoudha from '@/components/roomCardBoudha/page';

const page = () => {
  return (
    <div>
      <div>
      <CustomNavBar/>
      </div>
      <div>
      <ChooseDate/>
      </div>
      <div className='flex justify-center pt-3'>
      <ButtonGroup>
      <Button className='border-r border-black hover:bg-blue-400 font-semibold'>
      <Link href={'../bookRoomsThamel'} className='text-black'> Nayabazar </Link>
      </Button>
      <Button className='hover:bg-blue-400 font-semibold'>
      <Link href={'../bookRoomsBoudha'} className='text-black'> Boudha </Link>
      </Button>
      </ButtonGroup>
      </div>
      <div className='mt-4'>
        <RoomCardBoudha/>
      </div>
    </div>
  )
}

export default page