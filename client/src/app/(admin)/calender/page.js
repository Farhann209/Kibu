'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate } from '@internationalized/date';

const AdminCalendarPage = () => {
  const [listingList, setListingList] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [closedDates, setClosedDates] = useState({});

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data);

      // Initialize closedDates state from the database
      const initialClosedDates = {};
      response.data.forEach(listing => {
        initialClosedDates[listing._id] = new Set(listing.listingBookedDates.map(date => new Date(date).toDateString()));
      });
      setClosedDates(initialClosedDates);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  const handleDateRangeChange = (listingId, range) => {
    setSelectedDates((prev) => ({
      ...prev,
      [listingId]: range,
    }));
  };

  const updateBookingDates = async (listing, action) => {
    const selectedRange = selectedDates[listing._id];
    if (!selectedRange || !selectedRange.start || !selectedRange.end) {
      alert("Select a date range.");
      return;
    }

    const { start, end } = selectedRange;
    let currentDate = new Date(start);
    const endDate = new Date(end);
    const datesToUpdate = [];

    while (currentDate <= endDate) {
      datesToUpdate.push(currentDate.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const updatedClosedDates = new Set(closedDates[listing._id] || []);
    if (action === 'close') {
      datesToUpdate.forEach(date => updatedClosedDates.add(date));
    } else {
      datesToUpdate.forEach(date => updatedClosedDates.delete(date));
    }
    setClosedDates((prev) => ({
      ...prev,
      [listing._id]: updatedClosedDates,
    }));

    try {
      const updatedDates = Array.from(updatedClosedDates);

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}listing/${listing._id}`, {
        listingBookedDates: updatedDates
      });
      fetchListing(); // Refresh listings to update calendars
    } catch (error) {
      console.error(`Failed to ${action} dates:`, error);
    }
  };

  const isDateUnavailable = (listingId, date) => {
    const parsedDate = parseDate(date.toString());

    // Automatically close dates that are before today
    if (parsedDate.compare(today(getLocalTimeZone())) < 0) {
      return true;
    }

    // Check if the date is in the closed dates set
    return closedDates[listingId]?.has(new Date(parsedDate).toDateString());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Listing Calendars</h2>
      {listingList.map((listing) => (
        <Card key={listing._id} className="mb-4">
          {/* Listing Number and Location */}
          <h3 className="text-lg font-semibold p-4">{listing.listingNumber} - {listing.listingLocation}</h3>

          <div className="flex flex-row items-center ml-3">
            {/* Listing Image */}
            <div className="flex-1 h-full">
              {listing.listingImages && listing.listingImages.length > 0 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}listing-image/${listing.listingNumber}/${listing.listingImages[0]}`}
                  alt={`Image of ${listing.listingNumber}`}
                  className="w-full h-auto object-cover rounded-xl"
                />
              ) : (
                <Image
                  src="default-image-url" // Replace with a default image URL if needed
                  alt="Default"
                  className="w-full h-auto object-cover rounded-xl"
                />
              )}
            </div>
            <div className="flex-1 pl-4 h-full mr-1">
              <CardBody className="h-full">
                <RangeCalendar
                  aria-label={`Calendar for ${listing.listingNumber}`}
                  value={selectedDates[listing._id] || {
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({ days: 1 })
                  }}
                  onChange={(range) => handleDateRangeChange(listing._id, range)}
                  isDateUnavailable={(date) => isDateUnavailable(listing._id, date)}
                  className="w-full h-full"
                />
                <div className="mt-4 flex justify-end gap-2">
                  <Button color="danger" onClick={() => updateBookingDates(listing, 'close')}>
                    Close Dates
                  </Button>
                  <Button color="success" onClick={() => updateBookingDates(listing, 'open')}>
                    Open Dates
                  </Button>
                </div>
              </CardBody>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminCalendarPage;
