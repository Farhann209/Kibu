import React, { useEffect, useState } from 'react'; // Importing necessary React hooks
import { useFormik } from 'formik'; // Importing useFormik for form handling
import { Input, Button, Card, CardBody } from "@nextui-org/react"; // Importing components from NextUI
import { DateRangePicker } from "@nextui-org/date-picker"; // Importing DateRangePicker from NextUI
import toast from "react-hot-toast"; // Importing toast for notifications
import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { setGuestDetails } from '@/redux/reducerSlice/guestSlice'; // Importing Redux action
import { RangeCalendar } from "@nextui-org/react"; // Importing RangeCalendar from NextUI
import { today, getLocalTimeZone, parseDate } from '@internationalized/date'; // Importing date utilities
import * as Yup from 'yup'; // Importing Yup for validation

export default function GuestForm() {
  const dispatch = useDispatch(); // Getting the dispatch function from Redux
  const router = useRouter(); // Getting the router instance from Next.js
  const listingDetails = useSelector((state) => state.listing.listingDetails); // Getting listing details from Redux state

  // State to store the selected date range
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: today(getLocalTimeZone()), // Default start date is today
    end: today(getLocalTimeZone()).add({ days: 1 }), // Default end date is tomorrow
  });

  const [totalPrice, setTotalPrice] = useState(''); // State to store the total price

  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      roomID: listingDetails.listingNumber || '', // Pre-fill roomID with the listing number
      date: selectedDateRange, // Pre-fill date with selectedDateRange
      price: totalPrice, // Pre-fill price with totalPrice
      guestName: '', // Guest name
      pax: '', // Number of guests (pax)
      email: '', // Guest email
    },
    validationSchema: Yup.object({
      pax: Yup.number()
        .max(listingDetails.listingPax, `Number of guests must be ${listingDetails.listingPax} or less`)
        .required('Number of guests is required'), // Validation for number of guests
    }),
    onSubmit: async (values) => {
      await confirmBooking(values); // Call confirmBooking function on form submission
    },
  });

  // Effect to update form values when listing details or selected dates change
  useEffect(() => {
    formik.setFieldValue('roomID', listingDetails.listingNumber); // Set roomID in the form
    formik.setFieldValue('date', selectedDateRange); // Set date in the form
    calculatePrice(selectedDateRange.start, selectedDateRange.end); // Calculate the total price
  }, [listingDetails, selectedDateRange]);

  // Function to calculate the total price based on the selected date range
  const calculatePrice = (start, end) => {
    if (start && end && listingDetails.listingPrice) {
      const startDate = new Date(start); // Convert start date to Date object
      const endDate = new Date(end); // Convert end date to Date object
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate the number of nights

      if (nights >= 2) { // Ensure at least 2 nights are selected
        const price = `$${nights * listingDetails.listingPrice}`; // Calculate the total price
        setTotalPrice(price); // Set the total price
        formik.setFieldValue('price', price); // Set the price in the form
      } else {
        setTotalPrice('Minimum 2 nights required'); // Display message if less than 2 nights are selected
        formik.setFieldValue('price', 'Minimum 2 nights required'); // Set the message in the form
      }
    } else {
      setTotalPrice(''); // Clear the price if dates or price are not set
      formik.setFieldValue('price', ''); // Clear the price in the form
    }
  };

  // Function to handle booking confirmation
  const confirmBooking = async (values) => {
    const startDate = new Date(values.date.start); // Convert start date to Date object
    const endDate = new Date(values.date.end); // Convert end date to Date object

    const formattedValues = {
      ...values,
      date: {
        start: startDate.toISOString(), // Format start date as ISO string
        end: endDate.toISOString(), // Format end date as ISO string
      },
    };

    const requestOptions = {
      method: 'POST', // HTTP method
      headers: { 'Content-Type': 'application/json' }, // Request headers
      body: JSON.stringify(formattedValues), // Request body as JSON
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails`, requestOptions); // API request
    const data = await response.json(); // Parse JSON response

    if (response.status === 200) {
      toast.success(data.msg); // Show success message
      const payload = { guest: formattedValues, token: data.token }; // Prepare payload for Redux
      dispatch(setGuestDetails(payload)); // Dispatch guest details to Redux
      router.push('/bookingConfirmed'); // Navigate to booking confirmation page
    } else {
      toast.error(data.msg); // Show error message
    }
  };

  // Function to handle date range change
  const handleDateRangeChange = (range) => {
    if (!isDateRangeAvailable(range.start, range.end)) {
      toast.error("Selected dates include unavailable dates. Please choose a different range."); // Show error if dates are unavailable
    } else {
      setSelectedDateRange(range); // Update selected date range
      formik.setFieldValue('date', range); // Update date in the form
      calculatePrice(range.start, range.end); // Recalculate price
    }
  };

  // Function to check if the selected date range is available
  const isDateRangeAvailable = (start, end) => {
    return !listingDetails.listingBookedDates.some(bookedDate => {
      const booked = new Date(bookedDate);
      return (
        (new Date(start) <= booked && new Date(end) >= booked)
      );
    });
  };

  // Function to check if a date is unavailable (either in the past or booked)
  const isDateUnavailable = (date) => {
    const todayDate = today(getLocalTimeZone());
    const currentDate = parseDate(date.toString());
    const pastDateCheck = currentDate.compare(todayDate) < 0; // Check if the date is in the past

    const bookedDatesCheck = listingDetails.listingBookedDates.some(bookedDate => {
      const bookedISO = new Date(bookedDate).toISOString().split('T')[0];
      const booked = parseDate(bookedISO);
      return booked.compare(currentDate) === 0; // Check if the date is already booked
    });

    return pastDateCheck || bookedDatesCheck; // Return true if the date is unavailable
  };

  return (
    <div className='ml-3'>
      {/* Date selection calendar */}
      <div className="flex w-full gap-x-4 mb-3">
        <RangeCalendar 
          aria-label="Date (No Selection)"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          style={{ width: '100%' }}
          isDateUnavailable={isDateUnavailable} // Disable unavailable dates
        />
      </div>
      {/* Form for guest details */}
      <div className="flex flex-col w-full">
        <Card className="self-center max-w-full w-[340px]">
          <CardBody className="overflow-hidden">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="roomID">Room Number</label>
              <Input
                isDisabled
                id="roomID"
                name="roomID"
                type="text"
                value={formik.values.roomID}
                required
                aria-label="roomID"
              />

              <label htmlFor="date">Stay duration</label>
              <DateRangePicker
                id="date"
                name="date"
                visibleMonths={2}
                value={formik.values.date}
                onChange={handleDateRangeChange}
                isRequired
                aria-label='Select Stay Duration'
              />

              <label htmlFor="price">Total Price</label>
              <Input
                isDisabled
                id="price"
                name="price"
                type="text"
                value={formik.values.price}
                required
                placeholder="Price"
                isRequired
                aria-label="Price"
              />

              <label htmlFor="guestName">Full Name</label>
              <Input
                id="guestName"
                name="guestName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.guestName}
                required
                placeholder="Enter your name"
                isRequired
                aria-label="Full Name"
              />

              <label htmlFor="pax">Pax</label>
              <Input
                id="pax"
                name="pax"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.pax}
                required
                placeholder="Enter number of guests"
                isRequired
                aria-label="Number of guests"
                isInvalid={formik.errors.pax && formik.touched.pax}
              />
              {formik.errors.pax && formik.touched.pax && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.pax}</div> // Display error message if validation fails
              )}

              <label htmlFor="email">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                placeholder="Enter your email"
                isRequired
                aria-label="Email Address"
              />

              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" aria-label="Book">
                  Book
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
