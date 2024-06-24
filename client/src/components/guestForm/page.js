'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'; // Ensure CSS is imported
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setGuestDetails } from '@/redux/reducerSlice/guestSlice';
import { useDispatch } from "react-redux";

export default function GuestForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  
  const formik = useFormik({
    initialValues: {
      roomID: '',
      date: {
        start: null,
        end: null
      },
      guestName: '',
      pax: '',
      email: '',
      // number: '',
      // expiry: '',
      // cvc: '',
      // creditCardName: '',
    },
    onSubmit: async (values) => {
      await confirmBooking(values);
    },
  });

  const confirmBooking = async (values) => {
    const startDate = new Date(values.date.start);
    const endDate = new Date(values.date.end);
  
    const formattedValues = {
      ...values,
      date: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    };
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedValues)
    };
  
    const response = await fetch('http://localhost:8000/bookingDetails', requestOptions);
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
  
  return (
    <div className="flex flex-col w-full">
      <Card className="self-center max-w-full w-[340px]">
        <CardBody className="overflow-hidden">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="date">Stay duration</label>
            <DateRangePicker
              id="date"
              name="date"
              visibleMonths={2}
              onChange={(value) => formik.setFieldValue('date', value)}
              value={formik.values.date}
              isRequired
              aria-label='Select Stay Duration'
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
              type="text"
              onChange={formik.handleChange}
              value={formik.values.pax}
              required
              placeholder="Enter number of guests"
              isRequired
              aria-label="Number of guests"
            />

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
  );
}
