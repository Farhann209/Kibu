import React from 'react';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Grid, GridItem } from '@chakra-ui/react'

const Amenities = ({ thisListingDetails }) => {
  // Modal control hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  // Safely copy the amenities list from thisListingDetails; ensure it is an array
  const newAmenities = Array.isArray(thisListingDetails.listingAmenities) ? [...thisListingDetails.listingAmenities] : [];
  
  // Slice the array to display only the first 6 amenities on the main page
  const displayAmenities = [...newAmenities.slice(0, 6)];

  return (
    <div>
      {/* Modal for displaying all amenities */}
      <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* Listing all amenities within the modal */}
              {thisListingDetails.listingAmenities && thisListingDetails.listingAmenities.map((item, index) => {
                return (
                  <li key={index}>{item}</li> // Each amenity listed as a bullet point
                )
              })}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div>
        {/* Heading for the amenities section */}
        <h2 className='mb-3'>
            <strong>What this place offers</strong>
        </h2>
        {/* Grid to display the first 6 amenities */}
        <Grid w={'100%'} templateColumns='repeat(2, 1fr)' gap={2} className='mt-1'>
          {displayAmenities && displayAmenities.map((item, index) => (
            <GridItem key={index} w={['100%']}>
              {item} {/* Display each of the first 6 amenities */}
            </GridItem>
          ))}
        </Grid>
        {/* Button to open modal and see all amenities */}
        <Button variant='ghost' onPress={onOpen} className='w-[22%] h-8 mt-2'>See all Amenities</Button>
        <hr className='mt-2 mx-16 w-[80%]'/> {/* Horizontal rule for visual separation */}
      </div>
    </div>
  );
};

export default Amenities;
