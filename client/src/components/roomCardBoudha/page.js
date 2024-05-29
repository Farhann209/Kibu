'use client'
import React from "react";
import {Card, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { Grid, GridItem } from '@chakra-ui/react'

export default function RoomCardBoudha() {
  return (
    
  <div>
    <div>
    <Grid templateColumns='repeat(3, 1fr)' className="m-2 w-[100%]" gap={3} >
      {/* 01 card */}
    <GridItem>
        <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="01"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/01.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className=" flex-col items-start">
            <h1 className="font-bold text-large mb-2">Entire serviced apartment in Kathmandu, Nepal</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 02 card */}
    <GridItem>
        <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="02"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/02.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Cosy 2BHK apartment at Boudha at Kibu Apartments</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 03 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="03"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/03.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Stunning and spacious 2BHK apartment at Boudha</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 04 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="04"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/04.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Groovy studio at Boudha - with private balcony</h1>
          </CardFooter>
        </Card>
    </GridItem>
    
    {/* 05 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="05"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/05.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Gorgeous and spacious apartment at Boudha</h1>
          </CardFooter>
        </Card>
    </GridItem>
    
    {/* 06 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="06"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/06.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Serene Tibetan style 2BHK unit at Boudha</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 07 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="07"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/07.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Entire serviced apartment in Kathmandu, Nepal</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 08 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="08"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/08.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Traditional and Modern Oasis: Cosy place in Boudha</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* 09 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="09"
              className="object-cover rounded-xl"
              src= '/roomImagesBoudha/09.jpg'
              width={370}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Charming -Spacious and Central 2BHK unit at Boudha</h1>
          </CardFooter>
        </Card>
    </GridItem>
    </Grid>
    </div>
  </div>
  );
}
