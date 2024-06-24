'use client'
import Image from 'next/image'
import React from 'react'
import {Card, CardFooter, CardBody, Button} from "@nextui-org/react";
import Link from 'next/link';
// import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addFavItems } from '@/redux/reducerSlice/roomSlice';


const RoomCardThamel = ({item}) => {
  
  const dispatch =useDispatch()
  // const addWishlist = ()=>{
  //   dispatch(addFavItems(item))

  // }
  
  return (
    <Card className="w-[95%] h-[100%]">
    {/* <FaHeart onClick={()=> addWishlist()}/> */}
    <Link href={"/bookRoomsThamel/"+item.id}>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card image"
              className="object-cover rounded-xl"
              src= {item.roomImage}
              width={270}
              height={300}
            />
          </CardBody>
          <CardFooter className=" flex-col items-start">
            <h1 className="font-bold text-large mb-2">{item.roomName}</h1>
          </CardFooter>
    </Link>
  </Card>

 
  )
}

export const RoomCardBoudha = ({item}) => {
  
  const dispatch =useDispatch()
  const addWishlist = ()=>{
    dispatch(addFavItems(item))

  }
  return (
    <Card className="w-[95%] h-[100%]">
    {/* <FaHeart onClick={()=> addWishlist()}/> */}
    <Link href={"/bookRoomsBoudha/"+item.id}>
          <CardBody className="ml-3 overflow-visible py-2">
            <Image
              alt="Card image"
              className="object-cover rounded-xl"
              src= {item.roomImage}
              width={340}
              height={300}
            />
          </CardBody>
          <CardFooter className=" flex-col items-start">
            <h1 className="font-bold text-large mb-2">{item.roomName}</h1>
          </CardFooter>
    </Link>
  </Card>

 
  )
}

export default RoomCardThamel