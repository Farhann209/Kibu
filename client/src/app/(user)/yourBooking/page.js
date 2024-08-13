'use client'
import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import { Input, Card, CardBody, CardHeader, Image, Button } from "@nextui-org/react"; // Import UI components from NextUI
import { IoTrashBinSharp } from "react-icons/io5"; // Import trash bin icon from react-icons
import { useRouter } from 'next/navigation'; // Import router for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import toast from 'react-hot-toast'; // Import toast for displaying notifications
import CustomNavBar from '@/components/userNavBar/page'; // Import custom navigation bar

const BookingSearchPage = () => {
  const [guestName, setGuestName] = useState(''); // State to store the guest's name input
  const [bookings, setBookings] = useState([]); // State to store the list of bookings
  const [listingList, setListingList] = useState([]); // State to store the list of listings

  const router = useRouter(); // Initialize the router for navigation

  // useEffect hook to fetch listings when the component mounts
  useEffect(() => {
    fetchListing(); // Call the function to fetch listings
  }, []);

  // Function to fetch listings from the API
  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data); // Set the fetched listings to the state
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error fetching listings.'); // Display an error toast if fetching fails
    }
  };

  // Function to handle the search operation
  const handleSearch = async () => {
    if (!guestName.trim()) { // Check if the guest's name input is not empty
      toast.error("Please enter your name."); // Display an error toast if the name is empty
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}booking/search`, {
        params: { guestName } // Send the guest's name as a parameter
      });

      if (response.status === 200) { // Check if the response is successful
        setBookings(response.data); // Set the fetched bookings to the state
      } else {
        toast.error(response.data.msg || "No bookings found."); // Display an error toast if no bookings are found
        setBookings([]); // Clear the bookings state if none are found
      }
    } catch (error) {
      console.error("Error searching bookings:", error);
      toast.error("Error searching bookings."); // Display an error toast if the search fails
    }
  };

  // Function to handle the deletion of a booking
  const handleDelete = async (bookingId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails/${bookingId}`);
      if (response.status === 200) { // Check if the deletion was successful
        toast.success("Booking deleted successfully."); // Display a success toast

        // Manually update the bookings state to remove the deleted booking
        setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== bookingId));
      } else {
        toast.error(response.data.msg || "Failed to delete booking."); // Display an error toast if deletion fails
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking."); // Display an error toast if an error occurs during deletion
    }
  };

  // Function to get the image for a specific room ID
  const getListingImage = (roomID) => {
    const listing = listingList.find(listing => listing.listingNumber === roomID); // Find the listing by room ID
    if (listing && listing.listingImages && listing.listingImages.length > 0) {
      return `${process.env.NEXT_PUBLIC_API_URL}listing-image/${listing.listingNumber}/${listing.listingImages[0]}`; // Return the URL of the first image
    }
    return 'https://via.placeholder.com/250'; // Return a placeholder image if no image is found
  };

  return (
    <div>
      {/* Custom Navigation Bar */}
      <div>
        <CustomNavBar/>
      </div>
      
      {/* Search Section */}
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Find Your Booking</h2>
        <div className="flex items-center">
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)} // Update guestName state on input change
            placeholder="Enter your name"
            aria-label="Guest Name"
            className="mr-4"
          />
          <Button color="primary" onClick={handleSearch}> {/* Trigger search on click */}
            Search Booking
          </Button>
        </div>

        {/* Display Bookings */}
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
                    <p>Start Date: {new Date(booking.date.start).toLocaleDateString()}</p> {/* Display start date */}
                    <p>End Date: {new Date(booking.date.end).toLocaleDateString()}</p> {/* Display end date */}
                    <p>Guests: {booking.pax}</p> {/* Display number of guests */}
                    <p>Email: {booking.email}</p> {/* Display guest's email */}
                  </CardBody>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <Image
                    alt="Room Image"
                    className="object-cover rounded-xl mb-2"
                    src={getListingImage(booking.roomID)} // Get and display the room image
                    width={250}
                  />
                  <Button
                    className="mt-2"
                    color="danger"
                    onClick={() => handleDelete(booking._id)} // Trigger booking deletion on click
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
