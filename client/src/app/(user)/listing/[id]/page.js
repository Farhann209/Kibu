'use client'
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import GuestForm from '@/components/guestForm/page'; // Import the guest form component
import { useDispatch } from 'react-redux'; // Import useDispatch hook from Redux
import axios from 'axios'; // Import axios for making HTTP requests
import ImageGrid from '@/components/roomImageGrid/page'; // Import the image grid component
import AboutUS from '@/components/aboutUsModal/page'; // Import the About Us component
import Amenities from '@/components/amenitiesModal/page'; // Import the Amenities component
import HouseRules from '@/components/houseRules/page'; // Import the House Rules component
import Map from '@/components/maps/page'; // Import the Map component
import { setListingDetails } from '@/redux/reducerSlice/listingSlice'; // Import the setListingDetails action from the listing slice
import CustomNavBar from '@/components/bookingNavBar/page'; // Import the custom navigation bar component

const ListingDetails = ({ params }) => { 
  const dispatch = useDispatch(); // Initialize the dispatch function for Redux actions
  const [thisListingDetails, setThisListingDetails] = useState([]); // State to hold the details of the current listing

  // useEffect hook to fetch the listing details when the component mounts or when params.id changes
  useEffect(() => {
    if (params.id) {
      fetchThisListingDetails(); // Fetch the listing details if the ID is provided
    }
  }, []);

  // Function to fetch the listing details based on the ID from the params
  const fetchThisListingDetails = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing/${params.id}`);
    setThisListingDetails(data); // Update the state with the fetched listing details
    dispatch(setListingDetails({ listing: data })); // Dispatch an action to update the listing details in the Redux store
  }

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Bar */}
      <div className="mb-6">
        <CustomNavBar /> {/* Render the custom navigation bar */}
      </div>

      {/* Image Grid */}
      <div className="my-6">
        <ImageGrid thisListingDetails={thisListingDetails} /> {/* Render the image grid with the listing details */}
      </div>

      {/* Listing Description */}
      <div className="my-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {thisListingDetails?.listingDescription} {/* Display the listing description */}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left Column (About, Amenities, House Rules, Map) */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <AboutUS thisListingDetails={thisListingDetails}/> {/* Render the About Us section */}
          <div className="my-4 border-t border-gray-300"></div> {/* Divider */}
          <Amenities thisListingDetails={thisListingDetails}/> {/* Render the Amenities section */}
          <div className="my-4 border-t border-gray-300"></div> {/* Divider */}
          <HouseRules thisListingDetails={thisListingDetails}/> {/* Render the House Rules section */}
          <div className="my-4 border-t border-gray-300"></div> {/* Divider */}
          <Map thisListingDetails={thisListingDetails}/> {/* Render the Map section */}
        </div>

        {/* Right Column (Guest Form) */}
        <div className="flex-none w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <GuestForm /> {/* Render the Guest Form */}
        </div>
      </div>
    </div>
  )
}

export default ListingDetails;
