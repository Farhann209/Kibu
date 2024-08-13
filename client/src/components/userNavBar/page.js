'use client'  // This indicates that the component is a client-side component for Next.js.

import React from "react";  // Import React to use JSX.
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenuItem, NavbarMenu, Link, Button, DropdownItem,
  DropdownTrigger, Dropdown, DropdownMenu, Image
} from "@nextui-org/react";  // Import necessary components from @nextui-org/react.
import { ChevronDown } from "./navIcons.jsx";  // Import the ChevronDown icon for the dropdown.

export default function CustomNavBar() {  // The main component function for the custom navigation bar.
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);  // State to manage the menu toggle (open/close).

  // Array to store menu item names.
  const menuItems = [
    "Overview",
    "Accomodations",
    "Facilities",
    "Direct Benefits",
    "Reviews",
    "Contact",
    "Book Now",
  ];

  // Object to store icon components used in the navbar.
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,  // Chevron down icon for dropdowns.
  }

  return (
    <Navbar
      isBordered  // Enables a border around the navbar.
      isMenuOpen={isMenuOpen}  // Pass the menu state to the Navbar component.
      onMenuOpenChange={setIsMenuOpen}  // Updates the menu state when toggled.
      className="bg-white"  // Additional styling for the Navbar.
    >
      {/* Content for smaller screens, hidden on larger screens */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />  {/* Toggle button for the menu */}
      </NavbarContent>

      {/* Brand section with logo and title */}
      <NavbarBrand className="text-black">
        <Link href="../">
          <Image 
            src="/logo.jpg"  // Path to the logo image.
            alt="KIBU Logo"  // Alt text for accessibility.
            width={36} 
            height={36} 
            className="mr-2"  // Margin-right for spacing.
          />
          <p className="font-bold text-black">KIBU</p>  {/* Brand name text */}
        </Link>
      </NavbarBrand>

      {/* Content for larger screens */}
      <NavbarContent className="hidden sm:flex gap-6 justify-center">
        {/* Menu item for Overview */}
        <NavbarItem>
          <Link color="foreground" href={"../"}>
            Overview
          </Link>
        </NavbarItem>

        {/* Dropdown menu for Accomodations */}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple  // Disable ripple effect on the button.
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"  // Styling for the button.
                radius="sm"
                endContent={icons.chevron}  // Chevron icon at the end of the button.
                variant="light"
              >
                <p className="text-base">Accomodations</p>
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className="w-[340px]"  // Width of the dropdown menu.
            itemClasses={{
              base: "gap-4",
            }}
          >
            {/* Dropdown items for Nayabazar and Boudha */}
            <DropdownItem
              key="Nayabazar"
              description="Nayabazar is a residential area just 10 minutes walk away from Thamel"
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

        {/* Additional menu items */}
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

      {/* Content aligned to the right */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href={"../listing"}>
            <Button radius="full" className="text-black border border-white bg-transparent shadow-xl">
              <b>Book Now</b>  {/* Button for booking */}
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu for smaller screens */}
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
