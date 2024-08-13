"use client";
import SideBar from "@/components/sidebar/page"; // Importing the Sidebar component
import { Image } from "@nextui-org/react"; // Importing UI components from NextUI
import React from "react";


const layout = ({ children }) => {
  return (
    <div className="max-h-screen">
      {/* Top part of the layout */}
      <div className='flex grid pl-52 absolute'>
        {/* This div is currently empty, could be used for additional elements */}
      </div> 
      
      {/* Main content area */}
      <div className="flex m-4">
        <div className="flex flex-col items-center">
          {/* Displaying the logo from the public folder */}
          <Image src="/logo.jpg" width={80} height={80} className="" />

          {/* Including the Sidebar component */}
          <SideBar />
        </div>
        
        {/* Area to display the child components passed to this layout */}
        <div className="w-4/5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
