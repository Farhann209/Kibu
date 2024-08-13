'use client'  // This indicates that the component is a client-side component for Next.js.

import React from "react";  // Import React to use JSX.
import { Listbox, ListboxItem } from "@nextui-org/react";  // Import Listbox and ListboxItem components from @nextui-org/react.
import { IoBedOutline } from "react-icons/io5";  // Import the IoBedOutline icon from react-icons.
import { SlCalender } from "react-icons/sl";  // Import the SlCalender icon from react-icons.
import { PiUsersThree } from "react-icons/pi";  // Import the PiUsersThree icon from react-icons.
import { MdOutlineSpaceDashboard } from "react-icons/md";  // Import the MdOutlineSpaceDashboard icon from react-icons.
import { cn } from "@nextui-org/react";  // Import the cn utility for combining class names from @nextui-org/react.
import { useRouter } from "next/navigation";  // Import useRouter from next/navigation for navigation.


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
  const router = useRouter();  // Initialize the useRouter hook to enable navigation.

  // Function to handle navigation when a ListboxItem is clicked.
  const handleNavigation = (href) => {
    router.push(href);  // Navigate to the specified href.
  };

  return (
    <Listbox
      aria-label="User Menu"  // ARIA label for accessibility.
      className="m-2 mt-4 mr-6 p-2 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"  // Styling for the Listbox.
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}  // Classes applied to each ListboxItem.
    >

      {/* ListboxItem for Bookings */}
      <ListboxItem
        onClick={() => handleNavigation('/bookings') }  // Navigate to '/bookings' when clicked.
        key="bookings"  // Unique key for the item.
        endContent={<ItemCounter number={''} />}  // Display the counter at the end (currently empty).
        startContent={
          <IconWrapper className="bg-success/10"> 
            <PiUsersThree />  {/* Display the PiUsersThree icon */}
          </IconWrapper>
        }
      >
       Bookings  {/* Label for the ListboxItem */}
      </ListboxItem>
     
      {/* ListboxItem for Listing */}
      <ListboxItem
        onClick={() => handleNavigation('/listings') }  // Navigate to '/listings' when clicked.
        key="listing"  // Unique key for the item.
        endContent={<ItemCounter number={17} />}  // Display the counter at the end with the number 17.
        startContent={
          <IconWrapper className="bg-success/10"> 
            <IoBedOutline />  {/* Display the IoBedOutline icon */}
          </IconWrapper>
        }
      >
       Listing  {/* Label for the ListboxItem */}
      </ListboxItem>

      {/* ListboxItem for Calendar */}
      <ListboxItem
        onClick={() => handleNavigation('/calender') }  // Navigate to '/calender' when clicked.
        key="calender"  // Unique key for the item.
        startContent={
          <IconWrapper className="bg-success/10"> 
            <SlCalender />  {/* Display the SlCalender icon */}
          </IconWrapper>
        }
      >
       Calender  {/* Label for the ListboxItem */}
      </ListboxItem>
    </Listbox>
  );
}
