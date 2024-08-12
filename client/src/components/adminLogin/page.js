'use client'
import React from "react";
import { Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useFormik } from 'formik';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAdminLoginDetails } from "@/redux/reducerSlice/adminSlice";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const formikLogin = useFormik({
    initialValues: {
      phoneNumber: '',
      password: ''
    },
    onSubmit: values => {
      loginAdmin(values);
    },
  });

  const loginAdmin = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, requestOptions);
    const data = await response.json();

    if (response.status === 200) {
        dispatch(setAdminLoginDetails(data))
        toast.success(data.msg);
        router.push('/adminDashboard');
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <div className=" p-8">
      <Card className="w-full max-w-sm">
        <CardBody>
          <div className=" mb-4">
            <h2 className="text-center text-2xl font-bold underline">Admin Login</h2>
          </div>
          <form onSubmit={formikLogin.handleSubmit} className="flex flex-col gap-4">
            <Input
              name="phoneNumber"
              onChange={formikLogin.handleChange}
              value={formikLogin.values.phoneNumber}
              isRequired
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <Input
              name="password"
              onChange={formikLogin.handleChange}
              value={formikLogin.values.password}
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
