import React from 'react';
import { Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Grid, GridItem } from '@chakra-ui/react';
import { RiMore2Fill } from "react-icons/ri";

const ImageGrid = ({ thisListingDetails }) => {
  // Modal control using the NextUI hook for managing the modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  return (
    <div>
      {/* Modal component to display all images in a grid when opened */}
      <>
        <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className='grid grid-cols-3 gap-4 my-2'>
                  {/* Loop through all listing images and display them in the modal */}
                  {thisListingDetails.listingImages && thisListingDetails.listingImages.map((item, index) => (
                    <Image
                      key={index}
                      alt="Listing Image"
                      className="object-cover rounded-xl"
                      src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${item}`}
                      width={400}
                      height={180} // Set the height for the Image component
                    />
                  ))}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>

      <div className='flex justify-center'>
        {/* Grid layout to display a selected set of images */}
        <Grid
          w='[100%]'
          h='auto'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(4, 1fr)'
          gap={3}
          className='rounded-3xl'
        >
          {/* First large image spanning two rows and two columns */}
          <GridItem rowSpan={2} colSpan={2}>
            {thisListingDetails?.listingImages && thisListingDetails.listingImages.length > 0 && (
              <Image
                alt="Listing Image"
                className="object-cover rounded-xl"
                src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${thisListingDetails.listingImages[0]}`}
              />
            )}
          </GridItem>

          {/* Other smaller images */}
          <GridItem colSpan={1}>
            {thisListingDetails?.listingImages && thisListingDetails.listingImages.length > 1 && (
              <Image
                alt="Listing Image"
                className="object-cover rounded-xl"
                src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${thisListingDetails.listingImages[1]}`}
              />
            )}
          </GridItem>
          <GridItem colSpan={1}>
            {thisListingDetails?.listingImages && thisListingDetails.listingImages.length > 2 && (
              <Image
                alt="Listing Image"
                className="object-cover rounded-xl"
                src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${thisListingDetails.listingImages[2]}`}     
              />
            )}
          </GridItem>
          <GridItem colSpan={1}>
            {thisListingDetails?.listingImages && thisListingDetails.listingImages.length > 3 && (
              <Image
                alt="Listing Image"
                className="object-cover rounded-xl"
                src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${thisListingDetails.listingImages[3]}`}      
              />
            )}
          </GridItem>

          {/* The last image, with a button overlay to view all photos */}
          <GridItem colSpan={1} className='relative overflow-hidden'>
            {thisListingDetails?.listingImages && thisListingDetails.listingImages.length > 4 && (
              <Image
                alt="Listing Image"
                className="object-cover rounded-xl"
                src={`http://localhost:8000/listing-image/${thisListingDetails.listingNumber}/${thisListingDetails.listingImages[4]}`}             
              />
            )}
            {/* Button to open the modal and view all images */}
            <Button variant='flat' onPress={onOpen} className='w-[auto] h-7 border-black absolute bottom-6 right-2 z-10'> 
              <RiMore2Fill size={15} /> All Photos
            </Button>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export default ImageGrid;
