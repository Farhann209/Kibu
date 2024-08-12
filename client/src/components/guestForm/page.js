import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setGuestDetails } from '@/redux/reducerSlice/guestSlice';
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, DateValue } from '@internationalized/date';
import * as Yup from 'yup';

export default function GuestForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const listingDetails = useSelector((state) => state.listing.listingDetails);

  const [selectedDateRange, setSelectedDateRange] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 1 }),
  });
  const [totalPrice, setTotalPrice] = useState('');

  const formik = useFormik({
    initialValues: {
      roomID: listingDetails.listingNumber || '',
      date: selectedDateRange,
      price: totalPrice,
      guestName: '',
      pax: '',
      email: '',
    },
    validationSchema: Yup.object({
      pax: Yup.number()
        .max(listingDetails.listingPax, `Number of guests must be ${listingDetails.listingPax} or less`)
        .required('Number of guests is required'),
    }),
    onSubmit: async (values) => {
      await confirmBooking(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue('roomID', listingDetails.listingNumber);
    formik.setFieldValue('date', selectedDateRange);
    calculatePrice(selectedDateRange.start, selectedDateRange.end);
  }, [listingDetails, selectedDateRange]);

  const calculatePrice = (start, end) => {
    if (start && end && listingDetails.listingPrice) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate the number of nights

      if (nights >= 2) { // Ensure at least 2 nights are selected
        const price = `$${nights * listingDetails.listingPrice}`; // Add $ sign to the calculated price
        setTotalPrice(price);
        formik.setFieldValue('price', price);
      } else {
        setTotalPrice('Minimum 2 nights required');
        formik.setFieldValue('price', 'Minimum 2 nights required');
      }
    } else {
      setTotalPrice('');
      formik.setFieldValue('price', '');
    }
  };

  const confirmBooking = async (values) => {
    const startDate = new Date(values.date.start);
    const endDate = new Date(values.date.end);

    const formattedValues = {
      ...values,
      date: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedValues),
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bookingDetails`, requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.msg);
      const payload = { guest: formattedValues, token: data.token };
      dispatch(setGuestDetails(payload));
      router.push('/bookingConfirmed');
    } else {
      toast.error(data.msg);
    }
  };

  const handleDateRangeChange = (range) => {
    if (!isDateRangeAvailable(range.start, range.end)) {
      toast.error("Selected dates include unavailable dates. Please choose a different range.");
    } else {
      setSelectedDateRange(range);
      formik.setFieldValue('date', range);
      calculatePrice(range.start, range.end);
    }
  };

  const isDateRangeAvailable = (start, end) => {
    return !listingDetails.listingBookedDates.some(bookedDate => {
      const booked = new Date(bookedDate);
      return (
        (new Date(start) <= booked && new Date(end) >= booked)
      );
    });
  };

  const isDateUnavailable = (date) => {
    const todayDate = today(getLocalTimeZone());
    const currentDate = parseDate(date.toString());
    const pastDateCheck = currentDate.compare(todayDate) < 0;

    const bookedDatesCheck = listingDetails.listingBookedDates.some(bookedDate => {
      const bookedISO = new Date(bookedDate).toISOString().split('T')[0];
      const booked = parseDate(bookedISO);
      return booked.compare(currentDate) === 0;
    });

    return pastDateCheck || bookedDatesCheck;
  };

  return (
    <div className='ml-3'>
      <div className="flex w-full gap-x-4 mb-3">
        <RangeCalendar 
          aria-label="Date (No Selection)"
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          style={{ width: '100%' }}
          isDateUnavailable={isDateUnavailable}
        />
      </div>
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
                <div className="text-red-500 text-sm mt-1">{formik.errors.pax}</div>
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
