'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddListing from '@/components/addNewListing/page';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { RiUser3Fill } from "react-icons/ri";
import { Grid, GridItem } from '@chakra-ui/react';
import { IoTrashBinSharp } from "react-icons/io5";

const Page = () => {
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

    const handleNewListing = () => {
        fetchListing()
    }

    const deleteListing = async (listingNumber) =>{
        const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}listing/`+ listingNumber)
        if(data){
            fetchListing()
        }
    }
    

    return (
        <div>
            <div className='flex justify-end mt-3'>
                <AddListing onNewListing={handleNewListing} />
            </div>
            <div>
                <Grid templateColumns='repeat(3, 1fr)' className="ml-4" gap={2}>
                    {listingList.length > 0 && listingList.map((item) => {
                        return (
                            <GridItem className='w-[97%]' key={item._id}>
                                <Card style={{ height: '95%', width:'100%' }}  className="m-3">
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl"
                                            src= {`${process.env.NEXT_PUBLIC_API_URL}listing-image/${item.listingNumber}/${item.listingImages[0]}`}
                                            width={'auto'}
                                        />
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <h4 className="font-bold text-large">{item.listingDescription}</h4>
                                        <div className='flex items-center mt-1'>
                                            <small className="text-default-500"><RiUser3Fill /></small>
                                            <small className="text-default-500">: {item.listingPax}</small>
                                        </div>
                                        <small className="text-default-500">Type: {item.listingCategory}</small>
                                        <small className="text-default-500">Location: {item.listingLocation}</small>
                                        <div className='mt-3 flex justify-between items-center'>
                                            <p className="cursor-pointer" onClick={() => deleteListing(item.listingNumber)}>
                                                <IoTrashBinSharp className="text-red-500 hover:text-red-700" />
                                            </p>                                            
                                            <p className="text-lg uppercase font-bold">${item.listingPrice}</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}

export default Page
