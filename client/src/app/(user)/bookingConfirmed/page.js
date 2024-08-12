'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import CustomNavBar from '@/components/bookingNavBar/page';

const BookingConfirmationPage = () => {
  // Extract guestDetails from the Redux state
  const guestDetails = useSelector(state => state.guest.guestDetails); 
  const bookerName = guestDetails.guestName; // Fixing the typo here

  const router = useRouter();

  // Calculate the number of nights
  const startDate = new Date(guestDetails.date.start);
  const endDate = new Date(guestDetails.date.end);
  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate the number of nights

  const handleViewBooking = () => {
    router.push('/view-booking'); // Replace with the correct path to the booking details page
  };

  return (
    <div>
      <div>
        <CustomNavBar/>
      </div>
      <div className="p-6 w-[80%] mx-auto bg-white shadow-lg rounded-lg mt-6 border border-black">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
        <p className="mb-4">
          Dear {bookerName}, thank you for booking with us. Your booking has been confirmed.
        </p>
        <p className="mb-4">
          You have booked for {nights} {nights > 1 ? 'nights' : 'night'}.
          <br />
          Check-in: {startDate.toLocaleDateString()} <br />
          Check-out: {endDate.toLocaleDateString()}
        </p>
        <p>
          You can view your booking details again by going to our page "Your Booking" and search for your booking using the name used to book the room.
        </p>
        <Button className="mb-4 mt-3" color="primary" onClick={handleViewBooking}>
          View Booking
        </Button>
        <p>
          If you have any other queries, please message us on WhatsApp at 
          <a href="https://wa.me/9779841530670" target="_blank" rel="noopener noreferrer" className="text-blue-500"> +977-9841530670</a>.
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
