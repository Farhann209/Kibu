'use client'
import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenuItem, NavbarMenu, Link, Button, DropdownItem,
  DropdownTrigger, Dropdown, DropdownMenu, Image
} from "@nextui-org/react";
import { ChevronDown } from "./navIcons.jsx";

export default function CustomNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Overview",
    "Accomodations",
    "Facilities",
    "Direct Benefits",
    "Reviews",
    "Contact",
    "Book Now",
  ];

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  }

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarBrand className="text-black">
        <Link href="../">
        <Image 
            src="/logo.jpg" 
            alt="KIBU Logo" 
            width={36} 
            height={36} 
            className="mr-2"
          />
        <p className="font-bold text-black">KIBU</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6 justify-center">
        <NavbarItem>
          <Link color="foreground" href={"../"}>
            Overview
          </Link>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                endContent={icons.chevron}
                variant="light"
              >
                <p className="text-base">Accomodations</p>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
             <DropdownItem
              key="Nayabazar"
              description="Nayabazar is a residential are just 10 minutes walk away from Thamel"
            >
              <Link color="foreground" href={'../listing'}>
                <b>Nayabazar</b>
              </Link>
            </DropdownItem>

            <DropdownItem
              key="Boudha"
              description="Located 5 minutes away from the heart of Kathmandu's Buddhism and the famous Boudha Stupa"
            >
              <Link color="foreground" href={'../listing/bookRoomsBoudha'}>
                <b>Boudha</b>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link color="foreground" href={"../benefits"}>
            Direct Benefits
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href={"../yourBooking"}>
            Your Booking
          </Link>
        </NavbarItem>
      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 1 ? "warning" : index === menuItems.length - 1 ? "blue" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
