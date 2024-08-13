'use client'
import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenuItem, NavbarMenu, Link, Button, DropdownItem,
  DropdownTrigger, Dropdown, DropdownMenu, Image
} from "@nextui-org/react";
import { ChevronDown } from "./navIcons.jsx";

export default function CustomNavBar() {
  // State to manage whether the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Array of menu items for the navigation bar
  const menuItems = [
    "Overview",
    "Accomodations",
    "Facilities",
    "Direct Benefits",
    "Reviews",
    "Contact",
    "Book Now",
  ];

  // Icon to be used in dropdowns
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  }

  return (
    <Navbar
      isBordered // Adds a border to the Navbar
      isMenuOpen={isMenuOpen} // Controls the state of the menu
      onMenuOpenChange={setIsMenuOpen} // Toggles the menu state
      className="bg-transparent" // Sets background as transparent
    >
      {/* Toggle button for small screens */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      {/* Navbar brand (Logo and Name) */}
      <NavbarBrand className="text-black">
        <Link href="../">
          <Image 
            src="/logo.jpg"  // Path to the logo image
            alt="KIBU Logo" 
            width={36} 
            height={36} 
            className="mr-2" // Adds margin to the right
          />
          <p className="font-bold text-black">KIBU</p>  {/* Text beside the logo */}
        </Link>
      </NavbarBrand>

      {/* Navbar items for larger screens */}
      <NavbarContent className="hidden sm:flex gap-6 justify-center">
        {/* Link to the Overview page */}
        <NavbarItem>
          <Link color="foreground" href={"../"}>
            Overview
          </Link>
        </NavbarItem>

        {/* Dropdown for Accommodations */}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple // Disables the ripple effect
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                endContent={icons.chevron} // Adds the chevron icon
                variant="light"
              >
                <p className="text-base">Accomodations</p>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          {/* Dropdown menu with two options */}
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

        {/* Other navigation items */}
        <NavbarItem>
          <Link color="foreground" href={"../benefits"}>
            Direct Benefits
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href={"../yourBooking"}>
            Your Booking
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile view menu */}
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
