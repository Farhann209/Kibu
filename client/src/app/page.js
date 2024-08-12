'use client'
import React from 'react';
import CustomNavBar from '@/components/userNavBar/page';
import Image from 'next/image';
import AdminLogin from '@/components/adminLogin/page';

const Page = () => {
  return (
    <div className="relative w-full h-[100vh]">
      <Image
        src="/S3 home.jpg"  // Correct path to the image in the public folder
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full">
        <CustomNavBar />
      </div>
      <div className="absolute bottom-4 right-4 w-72 p-4 ">
        <AdminLogin />
      </div>
    </div>
  );
};

export default Page;
