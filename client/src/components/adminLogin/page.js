// Importing necessary components and hooks from React and other libraries
'use client'
import React from "react";
import { Input, Link, Button, Card, CardBody } from "@nextui-org/react"; // UI components from NextUI for input fields, buttons, and cards
import { useFormik } from 'formik'; // Formik for form handling
import toast from "react-hot-toast"; // Toast notifications for showing success or error messages
import { useRouter } from "next/navigation"; // Router for navigation
import { useDispatch } from "react-redux"; // Dispatch function for Redux actions
import { setAdminLoginDetails } from "@/redux/reducerSlice/adminSlice"; // Redux action for setting admin login details

// AdminLogin component for handling admin login functionality
export default function AdminLogin() {
  const dispatch = useDispatch(); // Initialize the dispatch function for Redux
  const router = useRouter(); // Initialize the router for navigation

  // Formik setup for managing the login form
  const formikLogin = useFormik({
    initialValues: {
      phoneNumber: '', // Initial value for phone number
      password: '' // Initial value for password
    },
    onSubmit: values => {
      loginAdmin(values); // Call the loginAdmin function when the form is submitted
    },
  });

  // Function to handle the admin login process
  const loginAdmin = async (values) => {
    const requestOptions = {
      method: 'POST', // HTTP method for sending data
      headers: { 'Content-Type': 'application/json' }, // Setting the content type to JSON
      body: JSON.stringify(values) // Convert form values to JSON format
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, requestOptions); // Sending a POST request to the login API
    const data = await response.json(); // Parsing the response data as JSON

    // Checking if the login was successful
    if (response.status === 200) {
        dispatch(setAdminLoginDetails(data)); // Save the admin login details in Redux store
        toast.success(data.msg); // Show a success toast message
        router.push('/bookings'); // Navigate to the admin dashboard
    } else {
      toast.error(data.msg); // Show an error toast message if login fails
    }
  };

  // JSX structure for the login form
  return (
    <div className="p-8">
      <Card className="w-full max-w-sm"> {/* Card component for the login form */}
        <CardBody>
          <div className="mb-4">
            <h2 className="text-center text-2xl font-bold underline">Admin Login</h2> {/* Login form title */}
          </div>
          <form onSubmit={formikLogin.handleSubmit} className="flex flex-col gap-4"> {/* Form submission handler using Formik */}
            <Input
              name="phoneNumber"
              onChange={formikLogin.handleChange} // Update form state on input change
              value={formikLogin.values.phoneNumber} // Set the input value from form state
              isRequired
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <Input
              name="password"
              onChange={formikLogin.handleChange} // Update form state on input change
              value={formikLogin.values.password} // Set the input value from form state
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password" // Input type set to password for security
            />
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary"> {/* Submit button for the form */}
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
