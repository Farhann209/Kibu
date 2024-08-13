'use client'
import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import axios from 'axios'; // Importing axios for making HTTP requests
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"; // Importing UI components from NextUI
import { IoTrashBinSharp } from "react-icons/io5"; // Importing an icon for the delete button

const Page = () => {
  // State to store the list of bookings and listings
  const [bookingList, setBookingList] = useState([]);
  const [listingList, setListingList] = useState([]); // State to store the list of listings

  // useEffect hook to fetch bookings and listings when the component mounts
  useEffect(() => {
    fetchBooking();
    fetchListing();
  }, []);

  // Function to fetch booking details from the server
  const fetchBooking = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails`);
      setBookingList(response.data); // Updating the bookingList state with the fetched data
    } catch (error) {
      console.error('Error fetching bookings:', error); // Log any error that occurs during the fetch
    }
  };

  // Function to fetch listing details from the server
  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data); // Updating the listingList state with the fetched data
    } catch (error) {
      console.error('Error fetching listings:', error); // Log any error that occurs during the fetch
    }
  };

  // Function to delete a booking by its ID
  const deleteBooking = async (_id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails/${_id}`);
      fetchBooking(); // Refresh the booking list after deletion
    } catch (error) {
      console.error('Error deleting booking:', error); // Log any error that occurs during the delete operation
    }
  };

  // Function to get the image of the listing by its room ID
  const getListingImage = (roomID) => {
    const listing = listingList.find(listing => listing.listingNumber === roomID); // Find the listing with the given roomID
    if (listing && listing.listingImages && listing.listingImages.length > 0) {
      return `${process.env.NEXT_PUBLIC_API_URL}listing-image/${listing.listingNumber}/${listing.listingImages[0]}`; // Return the URL of the first image in the listingImages array
    }
    return 'https://via.placeholder.com/250'; // Return a placeholder image if no image is found
  };

  return (
    <div>
      {/* Check if there are any bookings to display */}
      {bookingList.length > 0 ? (
        // Map over the bookingList array to display each booking in a Card component
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
                src={getListingImage(booking.roomID)} // Get the image for the current booking's room ID
                width={250}
              />
              <IoTrashBinSharp
                onClick={() => deleteBooking(booking._id)} // Delete the booking when the trash icon is clicked
                size={24}
                className="mt-2 cursor-pointer text-red-500"
              />
            </div>
          </Card>
        ))
      ) : (
        <p>No bookings found.</p> // Display a message if there are no bookings
      )}
    </div>
  );
};

export default Page;
