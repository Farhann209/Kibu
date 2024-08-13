import React from 'react';
import { FaDollarSign, FaCalendarCheck, FaKey, FaWifi, FaParking } from 'react-icons/fa';
import { RiHotelBedFill } from 'react-icons/ri';
import { MdPets } from "react-icons/md";

const BenefitsDiv = () => {
  return (
    <div className="bg-[#e2e8f0] text-gray-800 py-16">
      {/* Container for the entire section */}
      <div className="container mx-auto text-center">
        {/* Heading of the section */}
        <h3 className="text-sm uppercase tracking-widest text-gray-600 mb-2">
          KIBU Home & Apartments
        </h3>
        <h1 className="text-4xl font-bold mb-4">
          The Best Offers Are Right Here
        </h1>
        <p className="text-lg mb-12 text-gray-600">
          Enjoy these extras at no additional cost when you book directly through our website. Book direct and save!
        </p>

        {/* Grid layout for the benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {/* Each benefit is wrapped in a flex container to align items vertically */}
          <div className="flex flex-col items-center">
            <FaDollarSign className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Best Price Guarantee</h2>
          </div>
          <div className="flex flex-col items-center">
            <FaCalendarCheck className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Flexible Bookings</h2>
          </div>
          <div className="flex flex-col items-center">
            <FaKey className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Early Check-In</h2>
            <p className="text-sm text-gray-500 mt-2">(subject to availability)</p>
          </div>
          <div className="flex flex-col items-center">
            <RiHotelBedFill className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Late Check-Out</h2>
            <p className="text-sm text-gray-500 mt-2">(subject to availability)</p>
          </div>
          <div className="flex flex-col items-center">
            <FaWifi className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Free Wi-Fi</h2>
            <p className="text-sm text-gray-500 mt-2">(high speed Wi-Fi)</p>
          </div>
          <div className="flex flex-col items-center">
            <FaParking className="text-gray-600 text-4xl mb-4" />
            <h2 className="text-xl font-semibold">Parking</h2>
            <p className="text-sm text-gray-500 mt-2">(in-house parking space available)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsDiv;
