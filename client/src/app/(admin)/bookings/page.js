'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { IoTrashBinSharp } from "react-icons/io5";

const Page = () => {
  const [bookingList, setBookingList] = useState([]);
  const [listingList, setListingList] = useState([]); // Initialize the listingList state

  useEffect(() => {
    fetchBooking();
    fetchListing();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails`);
      setBookingList(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data); // Set the fetched listings to the state
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const deleteBooking = async (_id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails/${_id}`);
      fetchBooking(); // Refresh bookings after deletion
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const getListingImage = (roomID) => {
    const listing = listingList.find(listing => listing.listingNumber === roomID);
    if (listing && listing.listingImages && listing.listingImages.length > 0) {
      return `${process.env.NEXT_PUBLIC_API_URL}listing-image/${listing.listingNumber}/${listing.listingImages[0]}`;
    }
    return 'https://via.placeholder.com/250'; // Placeholder image if no image is found
  };

  return (
    <div>
      {bookingList.length > 0 ? (
        bookingList.map((booking) => (
          <Card key={booking._id} className="py-4 flex flex-row justify-between items-center m-3">
            <div className="flex flex-col pl-4">
              <CardHeader className="pb-0 pt-2 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Booking Details</p>
                <small className="text-default-500">Room: {booking.roomID}</small>
                <h4 className="font-bold text-large">Guest: {booking.guestName}</h4>
              </CardHeader>
              <CardBody className="py-2">
                <p>Start Date: {new Date(booking.date.start).toLocaleDateString()}</p>
                <p>End Date: {new Date(booking.date.end).toLocaleDateString()}</p>
                <p>Guests: {booking.pax}</p>
                <p>Email: {booking.email}</p>
              </CardBody>
            </div>
            <div className="flex flex-col items-center pr-4">
              <Image
                alt="Room image"
                className="object-cover rounded-xl"
                src={getListingImage(booking.roomID)}
                width={250}
              />
              <IoTrashBinSharp
                onClick={() => deleteBooking(booking._id)}
                size={24}
                className="mt-2 cursor-pointer text-red-500"
              />
            </div>
          </Card>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Page;
