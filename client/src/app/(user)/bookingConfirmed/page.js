'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import CustomNavBar from '@/components/bookingNavBar/page';
import Link from 'next/link'; // Importing Link from Next.js for page navigation

const BookingConfirmationPage = () => {
  // Extract guestDetails from the Redux store, which contains information about the booking
  const guestDetails = useSelector(state => state.guest.guestDetails); 
  const bookerName = guestDetails.guestName; // Get the name of the person who made the booking

  const router = useRouter(); // Hook to programmatically navigate to different pages

  // Calculate the number of nights booked based on the start and end dates
  const startDate = new Date(guestDetails.date.start); // Convert the start date string to a Date object
  const endDate = new Date(guestDetails.date.end); // Convert the end date string to a Date object
  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate the difference in days by converting milliseconds to days

  // Function to handle the navigation to the booking details page
  const handleViewBooking = () => {
    router.push('/view-booking'); // Navigate to the booking details page
  };

  return (
    <div>
      <div>
        <CustomNavBar/> {/* Include the custom navigation bar at the top of the page */}
      </div>
      <div className="p-6 w-[80%] mx-auto bg-white shadow-lg rounded-lg mt-6 border border-black">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2> {/* Display a heading for the confirmation message */}
        <p className="mb-4">
          Dear {bookerName}, thank you for booking with us. Your booking has been confirmed.
        </p> {/* Personalized greeting to the booker with confirmation message */}
        <p className="mb-4">
          You have booked for {nights} {nights > 1 ? 'nights' : 'night'}. {/* Display the number of nights based on the calculation */}
          <br />
          Check-in: {startDate.toLocaleDateString()} {/* Convert and display the start date in a readable format */}
          <br />
          Check-out: {endDate.toLocaleDateString()} {/* Convert and display the end date in a readable format */}
        </p>
        <p>
          You can view your booking details again by going to our page "Your Booking" and searching for your booking using the name you provided.
        </p> {/* Instruction for the user to view their booking details later */}
        <Link href="../yourBooking"> {/* Link to navigate the user to the "Your Booking" page */}
          <Button className="mb-4 mt-3" color="primary">
            View Booking
          </Button> {/* Button for viewing the booking details */}
        </Link>
        <p>
          If you have any other queries, please message us on WhatsApp at 
          <a href="https://wa.me/9779841530670" target="_blank" rel="noopener noreferrer" className="text-blue-500"> +977-9841530670</a>.
        </p> {/* Contact information for the user to reach out for further inquiries */}
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
