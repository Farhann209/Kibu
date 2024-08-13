import React from 'react';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { LuClock3, LuClock2, LuClock12, LuUsers, LuClipboardList } from "react-icons/lu";
import { PiPawPrint, PiTrashBold } from "react-icons/pi";
import { IoMoonOutline, IoKeyOutline } from "react-icons/io5";
import { TbBalloonOff, TbSmokingNo, TbBulbOff } from "react-icons/tb";
import { MdOutlineNoPhotography } from "react-icons/md";

// The HouseRules component receives 'thisListingDetails' as props, which contains details about the listing
const HouseRules = ({ thisListingDetails }) => {
  // Modal state management using NextUI's useDisclosure hook
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside"); // Sets scroll behavior for the modal

  return (
    <div className='mt-2'>
      {/* Heading for the House Rules section */}
      <h1 className='my-3 text-2xl'><strong>House Rules</strong></h1>
      
      {/* Conditional rendering based on the listing's location */}
      {thisListingDetails.listingLocation === 'Nayabazar' ? (
        <div>
          {/* Displaying house rules specific to Nayabazar */}
          <ul className='mb-2'>Check-in: 2:00 PM - 11:00 PM </ul>
          <ul className='mb-2'>Checkout before 12:00 PM</ul>
          <ul>{thisListingDetails.listingPax} guests maximum</ul>
          <Button variant='light' onPress={onOpen} className='w-[22%] h-8'><u>Show more</u>〉</Button>
        </div>
      ) : (
        <div>
          {/* Displaying house rules specific to Boudha */}
          <ul className='mb-2'>Check-in after 3:00 pm</ul>
          <ul className='mb-2'>Checkout before 12:00 PM</ul>
          <ul>{thisListingDetails.listingPax} guests maximum</ul>
          <Button variant='light' onPress={onOpen} className='w-[22%] h-8'><u>Show more</u>〉</Button>
        </div>
      )}
      
      {/* Modal to show detailed house rules */}
      <Modal size='2xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* Conditional rendering inside the modal based on the listing's location */}
              {thisListingDetails.listingLocation === 'Nayabazar' ? (
                <div>
                  <h1 className='text-3xl'><strong>House Rules</strong></h1>
                  <p>You'll be staying in someone's home, so please treat it with care and respect.</p>

                  {/* Check-in and Check-out details */}
                  <h2 className='mt-3 text-xl'><strong>Checking in and out</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><LuClock2 /></p>
                    <p>Check-in: 2:00 PM - 11:00 PM</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start mb-5'>
                    <p className='mt-1 mr-1'><LuClock12 /></p>
                    <p>Checkout before 12:00 PM</p>
                  </div> 

                  {/* Rules during stay */}
                  <h2 className='text-xl'><strong>During your stay</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><LuUsers /></p>
                    <p>{thisListingDetails.listingPax} guests maximum</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><PiPawPrint /></p>
                    <p>No pets allowed</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><IoMoonOutline /></p>
                    <p>Quiet hours <br /><p className='text-sm text-gray-500 -mt-5'><br /> 10:00 PM - 8:00 AM</p></p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbBalloonOff /></p>
                    <p>No parties or events</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><MdOutlineNoPhotography /></p>
                    <p>No commercial photography</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbSmokingNo /></p>
                    <p>No smoking</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' /> 
                  <div className='justify-start mb-5'>
                    <div className='flex'>
                      <p className='mt-1 mr-1'><LuClipboardList /></p>
                      <h2><strong>Additional Rules</strong></h2>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500 ml-5'>
                        1. If the sheets and towels are left stained, an additional cleaning fee is required depending on what has been stained. Even upon washing if the stains don't wash off, guests are required to pay for the stained item.
                        <br />
                        2. Rooms on the first and second floors are not accessible.
                      </p>
                    </div>
                  </div> 
                  
                  {/* Rules before leaving */}
                  <h2 className='text-xl'><strong>Before you leave</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><PiTrashBold /></p>
                    <p>Throw trash away</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbBulbOff /></p>
                    <p>Turn things off</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><IoKeyOutline /></p>
                    <p>Return keys</p>
                  </div> 
                </div>
              ) : ( // Modal content for Boudha listings
                <div>
                  <h1 className='text-3xl'><strong>House Rules</strong></h1>
                  <p>You'll be staying in someone's home, so please treat it with care and respect.</p>

                  {/* Check-in and Check-out details */}
                  <h2 className='mt-3 text-xl'><strong>Checking in and out</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><LuClock3 /></p>
                    <p>Check-in after 3:00 PM</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start mb-5'>
                    <p className='mt-1 mr-1'><LuClock12 /></p>
                    <p>Checkout before 12:00 PM</p>
                  </div> 

                  {/* Rules during stay */}
                  <h2 className='text-xl'><strong>During your stay</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><LuUsers /></p>
                    <p>{thisListingDetails.listingPax} guests maximum</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><PiPawPrint /></p>
                    <p>No pets allowed</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><IoMoonOutline /></p>
                    <p>Quiet hours <br /><p className='text-sm text-gray-500 -mt-5'><br /> 10:00 PM - 7:00 AM</p></p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbBalloonOff /></p>
                    <p>No parties or events</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><MdOutlineNoPhotography /></p>
                    <p>No commercial photography</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbSmokingNo /></p>
                    <p>No smoking</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' /> 
                  <div className='justify-start mb-5'>
                    <div className='flex'>
                      <p className='mt-1 mr-1'><LuClipboardList /></p>
                      <h2><strong>Additional Rules</strong></h2>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500 ml-5'>
                        1. If anything in the unit is damaged, a certain amount of compensation needs to be made depending on the item.
                        <br />
                        2. The occupancy should not be exceeded
                      </p>
                    </div>
                  </div> 
                  
                  {/* Rules before leaving */}
                  <h2 className='text-xl'><strong>Before you leave</strong></h2>
                  <div className='flex justify-start mt-3'>
                    <p className='mt-1 mr-1'><PiTrashBold /></p>
                    <p>Throw trash away</p>
                  </div>
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><TbBulbOff /></p>
                    <p>Turn things off</p>
                  </div> 
                  <hr className='my-5 mx-10 w-[90%]' />
                  <div className='flex justify-start'>
                    <p className='mt-1 mr-1'><IoKeyOutline /></p>
                    <p>Return keys</p>
                  </div> 
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HouseRules;
