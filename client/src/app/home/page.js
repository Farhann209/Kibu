'use client'
import React, {useState} from 'react';
import CustomNavBar from '@/components/navbar/page';
import Image from 'next/image';
import ChooseDate from '@/components/datepicker/page';


const page = () => {
  let [number, setNumber] = useState(0)  //hamile number define garda useState lagayer garne
  // here setNumber is function usestate ko features anusar number paxi set thaper setNumber lekhnu paro
  const increment = ()=> {
      if (number===4) return;
      setNumber(number + 1) //setNumber ma j pass garyo tai output aauxa
  }

      
      const decrement = ()=> {
          if (number===0) return;
          setNumber(number - 1)
      }

  return (
    <div>
        <div>
        <CustomNavBar/>
        </div>
        <div>
        <div className="relative w-full h-[100vh]">
        <Image
          src={require('../../components/backgroundImages/S3 home.jpg')}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div>
          <ChooseDate />
        </div>
        </div>
        </div>
        
        <div>
          acascas
        </div>
    </div>
  )
}

export default page