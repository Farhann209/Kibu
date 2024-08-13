'use client'
import React from 'react';
import CustomNavBar from '@/components/userNavBar/page'; // Importing the custom navigation bar component
import Image from 'next/image'; // Importing the Next.js Image component for optimized image loading
import AdminLogin from '@/components/adminLogin/page'; // Importing the AdminLogin component

const Page = () => {
  return (
    <div className="relative w-full h-[100vh]">
      {/* Full-page background image */}
      <Image
        src="/S3 home.jpg"  // Path to the background image located in the public folder
        alt="Background Image" // Alt text for accessibility
        layout="fill" // The image will fill the entire container
        objectFit="cover" // The image will cover the container while maintaining aspect ratio
        className="w-full h-full" // Ensure the image takes up the full width and height of the container
      />
      
      {/* Navigation bar positioned at the top of the page */}
      <div className="absolute top-0 left-0 w-full">
        <CustomNavBar />
      </div>
      
      {/* Admin login form positioned at the bottom-right corner */}
      <div className="absolute bottom-4 right-4 w-72 p-4">
        <AdminLogin />
      </div>
    </div>
  );
};

export default Page;
