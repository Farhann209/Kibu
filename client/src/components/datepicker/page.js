import React from "react";
import {DateRangePicker} from "@nextui-org/react";
//also create the number of guests and room here 
export default function ChooseDate() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-start gap-10 border border-black rounded-lg w-[70%]">
      <div className="flex w-[35%] h-[15%] pl-2 pt-4 flex-wrap md:flex-nowrap gap-4">
      <DateRangePicker 
        label="Stay duration"
        visibleMonths={2}
      />
      </div> 

      <div className="flex w-[35%] flex-wrap md:flex-nowrap gap-4 bg-black">

      </div>

      </div>
    </div>
  );
}
