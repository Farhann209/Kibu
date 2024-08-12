'use client'
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import GuestForm from '@/components/guestForm/page';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ImageGrid from '@/components/roomImageGrid/page';
import AboutUS from '@/components/aboutUsModal/page';
import Amenities from '@/components/amenitiesModal/page';
import HouseRules from '@/components/houseRules/page';
import Map from '@/components/maps/page';
import { setListingDetails } from '@/redux/reducerSlice/listingSlice';
import CustomNavBar from '@/components/bookingNavBar/page';

const ListingDetails = ({ params }) => { 
  const dispatch = useDispatch();
  const [thisListingDetails, setThisListingDetails] = useState([])

  useEffect(() => {
    if (params.id) {
      fetchThisListingDetails()
    }
  }, [])

  const fetchThisListingDetails = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing/${params.id}`)
    setThisListingDetails(data)
    dispatch(setListingDetails({ listing: data }));
  }

  return (
    <div className="container mx-auto p-4">
      {/* Navigation Bar */}
      <div className="mb-6">
        <CustomNavBar />
      </div>

      {/* Image Grid */}
      <div className="my-6">
        <ImageGrid thisListingDetails={thisListingDetails} />
      </div>

      {/* Listing Description */}
      <div className="my-6">
        <h1 className="text-3xl font-bold text-gray-800">{thisListingDetails?.listingDescription}</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left Column (About, Amenities, House Rules, Map) */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <AboutUS thisListingDetails={thisListingDetails}/>
          <div className="my-4 border-t border-gray-300"></div>
          <Amenities thisListingDetails={thisListingDetails}/>
          <div className="my-4 border-t border-gray-300"></div>
          <HouseRules thisListingDetails={thisListingDetails}/>
          <div className="my-4 border-t border-gray-300"></div>
          <Map thisListingDetails={thisListingDetails}/>
        </div>

        {/* Right Column (Guest Form) */}
        <div className="flex-none w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <GuestForm />
        </div>
      </div>
    </div>
  )
}

export default ListingDetails;
