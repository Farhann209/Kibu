import React from 'react'
import { Image } from "@nextui-org/react"
import Link from 'next/link'


const Map = ({thisListingDetails}) => {
  return (
    <div>
        {thisListingDetails.listingLocation === 'Nayabazar' ? (
        <div>
            <Link href={'https://maps.app.goo.gl/T9DJh97ZhSjpckwD9'}>
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={'/Nayabazar.jpg'}
                    width={1000}
                    height={'auto'}
                />
            </Link>
            
        </div>
        ):(
            <div>
                <Link href={'https://maps.app.goo.gl/t7MpvwVZN9MGfnKx5'}>
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={'/Boudha.jpg'}
                        width={1000}
                        height={'auto'} // Ensure height is set for the Image component
                    />
                </Link>
          </div>
        )}
    </div>
  )
}

export default Map