'use client'
import React, { useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useFormik } from 'formik';
import { DateRangePicker } from "@nextui-org/date-picker";
import { differenceInCalendarDays } from 'date-fns';

const BookForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      numberOfNights: '',
      pax: '',
      email: '',
      number: '',
      expiry: '',
      cvc: '',
      name: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [focus, setFocus] = useState('');

  const handleInputFocus = (evt) => {
    setFocus(evt.target.name);
  }

  const handleDateChange = (range) => {
    const { startDate, endDate } = range;
    console.log("Date Range:", range);
    const start = startDate?.toDate();
    const end = endDate?.toDate();
    const numberOfNights = start && end ? differenceInCalendarDays(end, start) : '';
    formik.setValues({
      ...formik.values,
      numberOfNights,
    });
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        <Card className="self-center max-w-full w-[340px]">
          <CardBody className="overflow-hidden">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <Input
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                isRequired
                label="Full Name"
                placeholder="Enter your name"
              />
              <DateRangePicker
                label="Stay duration"
                className="max-w-xs"
                onChange={handleDateChange}
                aria-label="Date range picker"
              />
              <Input
                name="numberOfNights"
                type="text"
                readOnly
                value={formik.values.numberOfNights}
                label="Number of Nights"
                placeholder="Number of nights"
              />
              <Input
                name="pax"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.pax}
                isRequired
                label="Pax"
                placeholder="Enter number of guests"
              />
              <Input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                isRequired
                label="Email"
                placeholder="Enter your email"
              />

              <div className="flex flex-col m-3">
                <Cards
                  number={formik.values.number}
                  expiry={formik.values.expiry}
                  cvc={formik.values.cvc}
                  name={formik.values.name}
                  focused={focus}
                />
                <div className="flex flex-col mt-2">
                  <Input
                    className="shadow-lg rounded-xl"
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    maxLength='16'
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onFocus={handleInputFocus}
                  />
                  <Input
                    className="mt-2 shadow-lg rounded-xl"
                    type="text"
                    name="name"
                    placeholder="Cardholder's Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onFocus={handleInputFocus}
                  />
                  <div className="flex mt-2">
                    <Input
                      className="w-44 shadow-lg rounded-xl"
                      type="text"
                      name="expiry"
                      placeholder="Expiry date"
                      value={formik.values.expiry}
                      onChange={formik.handleChange}
                      onFocus={handleInputFocus}
                    />
                    <Input
                      className="ml-1 w-28 shadow-lg rounded-xl"
                      type="text"
                      name="cvc"
                      placeholder="CVV"
                      value={formik.values.cvc}
                      onChange={formik.handleChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
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

export default BookForm;
