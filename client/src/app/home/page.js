'use client'
import React from 'react';
import CustomNavBar from '@/components/navbar/page';
import Image from 'next/image';
import ChooseDate from '@/components/datepicker/page';

const page = () => {
  return (
    <div>
        <div>
        <CustomNavBar/>
        </div>
        <div>
        <ChooseDate/>
        <Image src={require('../../components/backgroundImages/S3 home.jpg')} className="w-[100%] h-[30%]"/>
        </div>
        <div>

        </div>
    </div>
  )
}

export default page