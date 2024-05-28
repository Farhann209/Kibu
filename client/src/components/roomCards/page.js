'use client'
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function RoomCard() {
  return (
    <div>
    <Card className="ml-2 pl-1 w-[24%]">
      <div>
        <div>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="F1"
            className="object-cover rounded-xl"
            src={'/roomImages/S3.jpg'}
            width={270}
          />
        </CardBody>
        </div>
        <div>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        </div>
      </div>
      </Card>
    </div>
  );
}
