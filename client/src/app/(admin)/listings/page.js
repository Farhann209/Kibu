'use client'

import React, { useEffect, useState } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for making HTTP requests
import AddListing from '@/components/addNewListing/page'; // Importing the AddListing component
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"; // Importing UI components from NextUI
import { RiUser3Fill } from "react-icons/ri"; // Importing an icon for user display
import { Grid, GridItem } from '@chakra-ui/react'; // Importing Grid components from Chakra UI
import { IoTrashBinSharp } from "react-icons/io5"; // Importing an icon for delete action

const Page = () => {
    // State to store the list of listings
    const [listingList, setListingList] = useState([]);

    // Fetch the listings when the component mounts
    useEffect(() => {
        fetchListing();
    }, []);

    // Function to fetch listing details from the server
    const fetchListing = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}listing`);
            setListingList(data); // Update the listingList state with the fetched data
        } catch (error) {
            console.error('Error fetching listings:', error); // Log any errors that occur during the fetch
        }
    };

    // Callback function to refresh the listings after a new listing is added
    const handleNewListing = () => {
        fetchListing(); // Re-fetch the listings
    };

    // Function to delete a listing by its listing number
    const deleteListing = async (listingNumber) => {
        const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}listing/` + listingNumber);
        if (data) {
            fetchListing(); // Re-fetch the listings after deletion
        }
    };

    return (
        <div>
            {/* Add New Listing button positioned at the top-right */}
            <div className='flex justify-end mt-3'>
                <AddListing onNewListing={handleNewListing} />
            </div>

            {/* Displaying the listings in a grid layout */}
            <div>
                <Grid templateColumns='repeat(3, 1fr)' className="ml-4" gap={2}>
                    {listingList.length > 0 && listingList.map((item) => {
                        return (
                            <GridItem className='w-[97%]' key={item._id}>
                                <Card style={{ height: '95%', width: '100%' }} className="m-3">
                                    {/* Display the listing image */}
                                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl"
                                            src={`${process.env.NEXT_PUBLIC_API_URL}listing-image/${item.listingNumber}/${item.listingImages[0]}`}
                                            width={'auto'}
                                        />
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        {/* Listing details */}
                                        <h4 className="font-bold text-large">{item.listingDescription}</h4>
                                        <div className='flex items-center mt-1'>
                                            <small className="text-default-500"><RiUser3Fill /></small>
                                            <small className="text-default-500">: {item.listingPax}</small>
                                        </div>
                                        <small className="text-default-500">Type: {item.listingCategory}</small>
                                        <small className="text-default-500">Location: {item.listingLocation}</small>
                                        <div className='mt-3 flex justify-between items-center'>
                                            {/* Delete button */}
                                            <p className="cursor-pointer" onClick={() => deleteListing(item.listingNumber)}>
                                                <IoTrashBinSharp className="text-red-500 hover:text-red-700" />
                                            </p>                                            
                                            {/* Display the listing price */}
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

export default Page;
