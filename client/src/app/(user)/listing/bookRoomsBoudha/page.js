'use client'
import React, { useEffect, useState } from 'react' // Import necessary hooks from React
import axios from 'axios' // Import axios for HTTP requests
import { Grid, GridItem } from '@chakra-ui/react' // Import Grid components from Chakra UI
import { Button, ButtonGroup, Link, Image } from "@nextui-org/react" // Import UI components from NextUI
import CustomNavBar from '@/components/bookingNavBar/page' // Import custom navigation bar
import { Card, CardHeader, CardBody } from "@nextui-org/card" // Import Card components from NextUI
import { RiUser3Fill } from "react-icons/ri" // Import user icon from react-icons
import { useRouter } from 'next/navigation' // Import router for navigation

const Page = () => {
  const router = useRouter() // Initialize the router for navigation
  const [listingList, setListingList] = useState([]) // State to hold the list of listings

  // useEffect hook to fetch the listings when the component mounts
  useEffect(() => {
    fetchListing() // Call the function to fetch listings
  }, [])

  // Function to fetch listings from the API
  const fetchListing = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`)
      setListingList(data) // Set the fetched listings to the state
    } catch (error) {
      console.error('Error fetching listings:', error) // Log any errors during the fetch
    }
  }

  return (
    <div>
      {/* Custom Navigation Bar */}
      <div>
        <CustomNavBar />
      </div>

      {/* Button Group for selecting locations */}
      <div className='mb-2 flex justify-between pt-3'>
        <div className='ml-4'>
          <ButtonGroup>
            <Button className='border-r border-black hover:bg-blue-400 font-semibold'>
              <Link href={'../listing'} className='text-black'> Nayabazar </Link> {/* Link to Nayabazar listings */}
            </Button>
            <Button className='hover:bg-blue-400 font-semibold'>
              <Link href={'../listing/bookRoomsBoudha'} className='text-black'> Boudha </Link> {/* Link to Boudha listings */}
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Grid displaying the filtered listings */}
      <div>
        <Grid templateColumns='repeat(3, 1fr)' className="ml-4" gap={1}>
          {listingList.filter(item => item.listingLocation === 'Boudha').map((item) => ( // Filter listings by location 'Boudha'
            <GridItem className='w-[100%]' key={item._id}>
              <Link href={`/listing/${item._id}`}> {/* Link to the specific listing's detail page */}
                <Card style={{ height: '92%' }} className="m-3">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_API_URL}listing-image/${item.listingNumber}/${item.listingImages[0]}`}
                      width={400}
                      height={'auto'} // Set image width and height
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <h4 className="font-bold text-large">{item.listingDescription}</h4> {/* Listing description */}
                    <div className='flex items-center mt-1'>
                      <small className="text-default-500"><RiUser3Fill /></small> {/* User icon */}
                      <small className="text-default-500">: {item.listingPax}</small> {/* Display the number of guests (Pax) */}
                    </div>
                    <div>
                      <small className="text-default-500">Type: {item.listingCategory}</small> <br/> {/* Listing category */}
                      <small className="text-default-500">Location: {item.listingLocation}</small> {/* Listing location */}
                    </div>
                    <div className='mt-3'>
                      <p className="text-lg uppercase font-bold">${item.listingPrice}</p> {/* Listing price */}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Page
