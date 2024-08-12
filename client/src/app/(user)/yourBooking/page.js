'use client'
import React, { useState, useEffect } from 'react';
import { Input, Card, CardBody, CardHeader, Image, Button } from "@nextui-org/react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomNavBar from '@/components/userNavBar/page';

const BookingSearchPage = () => {
  const [guestName, setGuestName] = useState('');
  const [bookings, setBookings] = useState([]);
  const [listingList, setListingList] = useState([]); // Adding listingList state
  const router = useRouter();

  useEffect(() => {
    // Fetch listings once the component mounts
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error fetching listings.');
    }
  };

  const handleSearch = async () => {
    if (!guestName.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}booking/search`, {
        params: { guestName }
      });

      if (response.status === 200) {
        setBookings(response.data);
      } else {
        toast.error(response.data.msg || "No bookings found.");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error searching bookings:", error);
      toast.error("Error searching bookings.");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails/${bookingId}`);
      if (response.status === 200) {
        toast.success("Booking deleted successfully.");
        
        // Manually update the bookings state to remove the deleted booking
        setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== bookingId));
      } else {
        toast.error(response.data.msg || "Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking.");
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
        <div>
            <CustomNavBar/>
        </div>
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Find Your Booking</h2>
            <div className="flex items-center">
                <Input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name"
                aria-label="Guest Name"
                className="mr-4"
                />
                <Button color="primary" onClick={handleSearch}>
                Search Booking
                </Button>
            </div>

            {bookings.length > 0 && (
                <div className="mt-6">
                {bookings.map((booking) => (
                    <Card key={booking._id} className="mb-4 flex flex-row justify-between items-center p-4">
                    <div className="flex flex-col w-2/3">
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
                    <div className="flex flex-col items-center w-1/3">
                        <Image
                        alt="Room Image"
                        className="object-cover rounded-xl mb-2"
                        src={getListingImage(booking.roomID)}
                        width={250}
                        />
                        <Button
                        className="mt-2"
                        color="danger"
                        onClick={() => handleDelete(booking._id)}
                        >
                        Delete Booking
                        </Button>
                    </div>
                    </Card>
                ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default BookingSearchPage;
