import React from 'react';
import { Image } from "@nextui-org/react";
import Link from 'next/link';

const Map = ({ thisListingDetails }) => {
  return (
    <div>
      {/* Conditionally render the map based on the listing location */}
      {thisListingDetails.listingLocation === 'Nayabazar' ? (
        <div>
          {/* Link to the Nayabazar location on Google Maps */}
          <Link href={'https://maps.app.goo.gl/T9DJh97ZhSjpckwD9'}>
            <Image
              alt="Nayabazar Location Map"
              className="object-cover rounded-xl"
              src={'/Nayabazar.jpg'}  // Image of Nayabazar location
              width={1000}
              height={'auto'}
            />
          </Link>
        </div>
      ) : (
        <div>
          {/* Link to the Boudha location on Google Maps */}
          <Link href={'https://maps.app.goo.gl/t7MpvwVZN9MGfnKx5'}>
            <Image
              alt="Boudha Location Map"
              className="object-cover rounded-xl"
              src={'/Boudha.jpg'}  // Image of Boudha location
              width={1000}
              height={'auto'} // Ensure height is set for the Image component
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Map;
