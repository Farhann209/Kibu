import React, {useState} from "react";
import { DateRangePicker } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@nextui-org/react";
import { ImUsers } from "react-icons/im";
import { GrAddCircle} from "react-icons/gr";
import { GrSubtractCircle } from "react-icons/gr";
import Link from "next/link";

export default function ChooseDate() {
  const [numberAdult, setNumberAdult] = useState(0);
  const [numberKids, setNumberKids] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // State to control dropdown visibility

  const incrementAdult = ()=> {
    if (numberAdult===4) return;
    setNumberAdult(numberAdult + 1);
  }

  const decrementAdult = ()=> {
    if (numberAdult===0) return;
    setNumberAdult(numberAdult - 1);
  }

  const incrementKids = ()=> {
    if (numberKids===2) return;
    setNumberKids(numberKids + 1);
  }

  const decrementKids = ()=> {
    if (numberKids===0) return;
    setNumberKids(numberKids - 1);
  }

  const update = () => {
    setDropdownOpen(false);  // Close the dropdown when the update button is clicked
  }

  return (
    <div className="flex justify-center bg-gray-200 h-20 shadow-xl">
      <div className="flex gap-7 w-[70%] pt-3">
        <div className="w-[60%] bg-transparent">
          <DateRangePicker 
            label="Stay duration"
            visibleMonths={2}
            classNames={{
              label: "text-gray-700",
            }}
          />
        </div>
        <div className="w-[50%]">
          <Dropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(true)} closeOnSelect={false}>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                className="w-full h-12 mt-1 flex items-center justify-between bg-gray-100 border border-white-300 rounded-md shadow-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}  // Toggle dropdown visibility
              >
                <ImUsers className="text-xl text-gray-700 " /> 
                <p className="pr-[35%]">Select rooms and guests</p> 
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
              <DropdownSection title="Actions" showDivider>
                <DropdownItem>
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
                        <div>
                          <button className="mt-2 mr-2 text-xl" onClick={(e) => { e.stopPropagation(); decrementAdult(); }}>
                            <GrSubtractCircle />
                          </button>
                        </div>
                        <div className="m-1 border border-gray-300 w-8 text-xl pl-2">{numberAdult}</div>
                        <div>
                          <button onClick={(e) => { e.stopPropagation(); incrementAdult(); }} className="m-2 text-xl">
                            <GrAddCircle />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="text-base pl-4"> Children</span>
                      <br/>
                      <span className="text-xs text-gray-500 pl-4">Ages 1 - 11</span>
                      <br/>
                      <div className="flex justify-col">
                        <div>
                          <button className="mt-2 mr-2 text-xl" onClick={(e) => { e.stopPropagation(); decrementKids(); }}>
                            <GrSubtractCircle />
                          </button>
                        </div>
                        <div className="m-1 border border-gray-300 w-8 text-xl pl-2">{numberKids}</div>
                        <div>
                          <button onClick={(e) => { e.stopPropagation(); incrementKids(); }} className="m-2 text-xl">
                            <GrAddCircle />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Button onClick={update} color="primary">Update</Button>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
