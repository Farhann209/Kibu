'use client'
import React from "react";
import {Card, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { Grid, GridItem } from '@chakra-ui/react'

export default function RoomCardThamel() {
  return (
    
  <div>
    <div>
    <Grid templateColumns='repeat(4, 1fr)' className="m-2 w-[100%]" gap={3} >
      {/* F1 card */}
    <GridItem>
        <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="F1"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/F1.jpeg'
              width={270}
            />
          </CardBody>
          <CardFooter className=" flex-col items-start">
            <h1 className="font-bold text-large mb-2">Cosy room near Thamel in a quiet neighborhood</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* S1 card */}
    <GridItem>
        <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="S1"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/S1.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Studio apartment 10 minutes from Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* S2 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="S2"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/S2.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Sunlit room with balcony near Thamel!</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* S3 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="S3"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/S3.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Huge Apartment for 3! 10 minutes from Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>
    
    {/* S4 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="S4"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/S4.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Cosy room 10 minutes from Thamel!</h1>
          </CardFooter>
        </Card>
    </GridItem>
    
    {/* T1 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="T1"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/T1.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Bright and airy room 10 mins. from Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* T2 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="T2"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/T2.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Studio apartment 10 minutes from Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* T3 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="T3"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/T3.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Top floor room with view (10 mins. from Thamel)</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* S2 and S3 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="S2:3"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/S2:3.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Beautiful 2 Bedroom apt. with balcony near Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>

    {/* T1 and T3 card */}
    <GridItem>
    <Card className="w-[95%] h-[100%]">
          <CardBody className="overflow-visible py-2">
            <Image
              alt="T1:2"
              className="object-cover rounded-xl"
              src= '/roomImagesThamel/T1:2.jpg'
              width={270}
            />
          </CardBody>
          <CardFooter className="flex-col items-start">
            <h1 className="font-bold text-large mb-2">Spacious 2 bedroom apt. with terrace near Thamel</h1>
          </CardFooter>
        </Card>
    </GridItem>
    </Grid>
    </div>
  </div>
  );
}
