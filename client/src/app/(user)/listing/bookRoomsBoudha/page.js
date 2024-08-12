'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, GridItem } from '@chakra-ui/react'
import { Button, ButtonGroup, Link, Image } from "@nextui-org/react"
import CustomNavBar from '@/components/bookingNavBar/page'
import ChooseDate from '@/components/datepicker/page'
import { Card, CardHeader, CardBody } from "@nextui-org/card"
import { RiUser3Fill } from "react-icons/ri"
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [listingList, setListingList] = useState([])

  useEffect(() => {
    fetchListing()
  }, [])

  const fetchListing = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`)
      setListingList(data)
    } catch (error) {
      console.error('Error fetching listings:', error)
    }
  }

  return (
    <div>
      <div>
        <CustomNavBar />
      </div>
      <div className='mb-2 flex justify-between pt-3'>
        <div className='ml-4'>
          <ButtonGroup>
            <Button className='border-r border-black hover:bg-blue-400 font-semibold'>
              <Link href={'../listing'} className='text-black'> Nayabazar </Link>
            </Button>
            <Button className='hover:bg-blue-400 font-semibold'>
              <Link href={'../listing/bookRoomsBoudha'} className='text-black'> Boudha </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <Grid templateColumns='repeat(3, 1fr)' className="ml-4" gap={1}>
          {listingList.filter(item => item.listingLocation === 'Boudha').map((item) => (
            <GridItem className='w-[100%]' key={item._id}>
              <Link href={`/listing/${item._id}`}>
                <Card style={{ height: '92%' }} className="m-3">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_API_URL}listing-image/${item.listingNumber}/${item.listingImages[0]}`}
                      width={400}
                      height={'auto'} // Ensure height is set for the Image component
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <h4 className="font-bold text-large">{item.listingDescription}</h4>
                    <div className='flex items-center mt-1'>
                      <small className="text-default-500"><RiUser3Fill /></small>
                      <small className="text-default-500">: {item.listingPax}</small>
                    </div>
                    <div>
                      <small className="text-default-500">Type: {item.listingCategory}</small> <br/>
                      <small className="text-default-500">Location: {item.listingLocation}</small>
                    </div>
                    <div className='mt-3'>
                      <p className="text-lg uppercase font-bold">${item.listingPrice}</p>
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
