import React from 'react';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Grid, GridItem } from '@chakra-ui/react'

const Amenities = ({ thisListingDetails }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const newAmenities = Array.isArray(thisListingDetails.listingAmenities) ? [...thisListingDetails.listingAmenities] : [];
  const displayAmenities = [...newAmenities.slice(0,6)]

  return (
    <div>
      <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {thisListingDetails.listingAmenities && thisListingDetails.listingAmenities.map((item)=>{
                return(
                    <li>{item}</li>
                )
              })}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div>
        <h2 className='mb-3'>
            <strong>What this place offers</strong>
        </h2>
        <Grid w={'100%'} templateColumns='repeat(2, 1fr)' gap={2} className='mt-1'>
          {displayAmenities && displayAmenities.map((item, index) => (
            <GridItem key={index} w={['100%']}>
              {item}
            </GridItem>
          ))}
        </Grid>
        <Button variant='ghost' onPress={onOpen} className='w-[22%] h-8 mt-2'>See all Amenities</Button>
        <hr className='mt-2 mx-16 w-[80%]'/>
      </div>
    </div>
  );
};

export default Amenities;
