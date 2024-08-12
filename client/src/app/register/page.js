'use client'
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, RadioGroup, Radio} from "@nextui-org/react";
import { useFormik } from 'formik';
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation";



export default function Main() {
  const router = useRouter()
  const [selected, setSelected] = React.useState("login");
  const formik = useFormik({
    initialValues: {
      guestFullName: '',
      date: '',
      numberOfNights: '',
      numberOfGuests: '',
      email: '',
      password: '',
      role: ''
    },
    onSubmit: values => {
      registerUser(values)
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      loginUser(values)
    },
  });

  const registerUser = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register`, requestOptions);
  const data = await response.json()
  if(response.status == '200'){
    toast.success(data.msg)
    setSelected('login')
  }else{
    toast.error(data.msg)
  }
  }

  const loginUser = async(values)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, requestOptions);
  const data = await response.json()
  if(response.status == '200'){
    toast.success(data.msg)
    router.push('/home')
  }else{
    toast.error(data.msg)
  }

  }

  return (
    <div className="flex flex-col w-full">
      <Card className="self-center max-w-full w-[340px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="sign-up" title="Sign up">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <Input
                name="guestFullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.guestFullName}
                isRequired label="Full Name" placeholder="Enter your name"/>
                <Input
                name="date"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.date}
                isRequired label="Date" placeholder="Enter your check-in date"/>
                <Input
                name="numberOfNights"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.numberOfNights}
                isRequired label="Stay duration" placeholder="Enter your number of nights"/>
                <Input
                name="numberOfGuests"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.numberOfGuests}
                isRequired label="Pax" placeholder="Enter number of guests"/>
                <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                isRequired label="email" placeholder="Enter your email" type="email"/>
                <Input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isRequired label="password" placeholder="Enter your password" type="password"/>

                <RadioGroup
                    label="Select role"
                    name="role"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <Radio value="user">Host</Radio>
                    <Radio value="merchant">Guest</Radio>
                  </RadioGroup>


                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Book
                  </Button>
                </div>
              </form>
            </Tab>
            
            <Tab key="login" title="Login">
              <form onSubmit={formikLogin.handleSubmit} className="flex flex-col gap-4 h-[300px]">
              <Input
                name="email"
                onChange={formikLogin.handleChange}
                value={formikLogin.values.email}
                isRequired label="email" placeholder="Enter your email" type="email"/>
              <Input
                name="password"
                onChange={formikLogin.handleChange}
                value={formikLogin.values.password}
                isRequired label="password" placeholder="Enter your password" type="password"/>

                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Sign Up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
