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
        <ChooseDate/>
        <Image src={require('../../components/backgroundImages/S3 home.jpg')} className="w-[100%] h-[30%]"/>
        </div>

        <div>
        <div className="flex justify-col">
                      <div> <button onClick={increment}>+</button></div>
                      <div>{number}</div>
                      <div><button onClick={decrement}>-</button></div>
                    </div>
        </div>
    </div>
  )
}

export default page