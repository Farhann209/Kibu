'use client'
import React, { useEffect, useState } from 'react'; // Importing React hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import { Card, CardBody, Image, Button } from "@nextui-org/react"; // Importing UI components from NextUI
import { RangeCalendar } from "@nextui-org/react"; // Importing RangeCalendar component from NextUI
import { today, getLocalTimeZone, parseDate } from '@internationalized/date'; // Importing date utilities from internationalized date package

const AdminCalendarPage = () => {
  // State to store the list of listings, selected dates for each listing, and closed dates
  const [listingList, setListingList] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [closedDates, setClosedDates] = useState({});

  // Fetch listings when the component mounts
  useEffect(() => {
    fetchListing();
  }, []);

  // Function to fetch listing details from the server
  const fetchListing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
      setListingList(response.data); // Updating the listingList state with the fetched data

      // Initialize closedDates state from the database
      const initialClosedDates = {};
      response.data.forEach(listing => {
        initialClosedDates[listing._id] = new Set(
          listing.listingBookedDates.map(date => new Date(date).toDateString())
        );
      });
      setClosedDates(initialClosedDates); // Set the closed dates for each listing
    } catch (error) {
      console.error("Failed to fetch listings:", error); // Log any error that occurs during the fetch
    }
  };

  // Function to handle date range changes for a specific listing
  const handleDateRangeChange = (listingId, range) => {
    setSelectedDates((prev) => ({
      ...prev,
      [listingId]: range, // Update the selected date range for the specific listing
    }));
  };

  // Function to update booking dates (either close or open dates)
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

    // Collect all dates within the selected range
    while (currentDate <= endDate) {
      datesToUpdate.push(currentDate.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update the closedDates state based on the action (close or open dates)
    const updatedClosedDates = new Set(closedDates[listing._id] || []);
    if (action === 'close') {
      datesToUpdate.forEach(date => updatedClosedDates.add(date));
    } else {
      datesToUpdate.forEach(date => updatedClosedDates.delete(date));
    }
    setClosedDates((prev) => ({
      ...prev,
      [listing._id]: updatedClosedDates, // Update the closed dates for the specific listing
    }));

    try {
      const updatedDates = Array.from(updatedClosedDates);

      // Update the listing in the backend with the new closed dates
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}listing/${listing._id}`, {
        listingBookedDates: updatedDates
      });
      fetchListing(); // Refresh listings to update calendars
    } catch (error) {
      console.error(`Failed to ${action} dates:`, error); // Log any error that occurs during the update
    }
  };

  // Function to check if a date is unavailable for booking
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
