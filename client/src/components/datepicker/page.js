import React, {useState} from "react";
import { DateRangePicker } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@nextui-org/react";
import { ImUsers } from "react-icons/im";
import { GrAddCircle} from "react-icons/gr";
import { GrSubtractCircle } from "react-icons/gr";
import Link from "next/link";

export default function ChooseDate() {
  let [numberAdult, setNumberAdult] = useState(0)  //hamile number define garda useState lagayer garne
    // here setNumber is function usestate ko features anusar number paxi set thaper setNumber lekhnu paro
    const incrementAdult = ()=> {
        if (numberAdult===4) return;
        setNumberAdult(numberAdult + 1) //setNumber ma j pass garyo tai output aauxa
    }
  
        
        const decrementAdult = ()=> {
            if (numberAdult===0) return;
            setNumberAdult(numberAdult - 1)
        }

        let [numberKids, setNumberKids] = useState(0)  //hamile number define garda useState lagayer garne
    // here setNumber is function usestate ko features anusar number paxi set thaper setNumber lekhnu paro
    const incrementKids = ()=> {
        if (numberKids===2) return;
        setNumberKids(numberKids + 1) //setNumber ma j pass garyo tai output aauxa
    }
  
        
        const decrementKids = ()=> {
            if (numberKids===0) return;
            setNumberKids(numberKids - 1)
        }
  return (
    <div className="flex justify-center bg-gray-200 h-20 shadow-xl">
    {/* Container for DateRangePicker and Dropdown */}
    <div className="flex gap-7 w-[70%] pt-3">
      {/* DateRangePicker Section */}
      <div className="w-[60%] bg-transparent">
        <DateRangePicker 
          label="Stay duration"
          visibleMonths={2}
          classNames={{
            label: "text-gray-700",
          }}
        />
      </div>

      {/* Dropdown Section */}
      <div className="w-[50%]">
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="w-full h-12 mt-1 flex items-center justify-between bg-gray-100 border border-white-300 rounded-md shadow-md hover:bg-gray-200"
            >
              <ImUsers className="text-xl text-gray-700 " /> 
              <p className="pr-[35%]">Select rooms and guests</p> 
            </Button>
          </DropdownTrigger>

          <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownSection title="Actions" showDivider>
              <DropdownItem
              >
                <div className="flex gap-10">

                  <div className="border-r-2 border-black pr-5">
                  <span className="text-base"> Room 1</span>
                    </div>
                  <div className="border-r-2 border-black">
                    <span className="text-base p-5"> Adults</span>
                    <br/>
                    <span className="text-xs text-gray-500 pr-8">Ages 12 or more</span>
                    <br/>
                    <div className="flex justify-col">
                      <div><button className="mt-2 mr-2 text-xl" onClick={decrementAdult}><GrSubtractCircle /></button></div>
                      <div className="m-1 border border-gray-300 w-8 text-xl pl-2">{numberAdult }</div>
                      <div> <button onClick={incrementAdult} className="m-2 text-xl"><GrAddCircle /></button></div>
                    </div>
                    </div>
                  <div>
                  <span className="text-base pl-4"> Children</span>
                    <br/>
                    <span className="text-xs text-gray-500 pl-4">Ages 1 - 11</span>
                    <br/>
                    <div className="flex justify-col">
                      <div><button className="mt-2 mr-2 text-xl" onClick={decrementKids}><GrSubtractCircle /></button></div>
                      <div className="m-1 border border-gray-300 w-8 text-xl pl-2">{numberKids}</div>
                      <div> <button onClick={incrementKids} className="m-2 text-xl"><GrAddCircle /></button></div>
                    </div>
                  </div>

                </div>
              </DropdownItem>
              
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
  );
}
