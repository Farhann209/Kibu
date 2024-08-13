'use client'  // This indicates the component is a client-side component for Next.js.

import React from "react";  // Import React to use JSX.
import { Listbox, ListboxItem } from "@nextui-org/react";  // Import Listbox and ListboxItem components from @nextui-org/react.
import { IoBedOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { cn } from "@nextui-org/react";  // Import the cn utility for combining class names from @nextui-org/react.
import { useRouter } from "next/navigation";

// A functional component that wraps children elements with specific styles.
export const IconWrapper = ({ children, className }) => (
    <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>
      {children}
    </div>
);

// A functional component that displays a counter number and an icon.
export const ItemCounter = ({ number }) => (
    <div className="flex items-center gap-1 text-default-400">
      <span className="text-small">{number}</span>
    </div>
);


export default function Sidebar() {  // The main Sidebar component.
  const router = useRouter();

  const handleNavigation = (href) => {
    router.push(href);
  };
  return (
    <Listbox
      aria-label="User Menu"  // ARIA label for accessibility.
      className="m-2 mt-4 mr-6 p-2 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"  // Styling for the Listbox.
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}  // Classes applied to each ListboxItem.
    >

      <ListboxItem
        onClick={()=> handleNavigation('/bookings') }
        key="bookings"  // Unique key for the item.
        endContent={<ItemCounter number={''} />}  // End content displaying the counter.
        startContent={
          <IconWrapper className="bg-success/10"> 
            <PiUsersThree />
          </IconWrapper>
        }
      >
       Bookings
      </ListboxItem>
     
      <ListboxItem
        onClick={()=> handleNavigation('/listings') }
        key="listing"  // Unique key for the item.
        endContent={<ItemCounter number={17} />}  // End content displaying the counter.
        startContent={
          <IconWrapper className="bg-success/10"> 
            <IoBedOutline />
          </IconWrapper>
        }
      >
       Listing
      </ListboxItem>

      <ListboxItem
        onClick={()=> handleNavigation('/calender') }
        key="calender"
        startContent={
          <IconWrapper className="bg-success/10"> 
            <SlCalender />
          </IconWrapper>
        }
      >
       Calender
      </ListboxItem>
    </Listbox>
  );
}
