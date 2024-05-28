'use client'
import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle,
  NavbarMenuItem, NavbarMenu, Link, Button, DropdownItem,
  DropdownTrigger, Dropdown, DropdownMenu
} from "@nextui-org/react";
import { ChevronDown } from "./navIcons.jsx";

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

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
      className="bg-gray-200"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarBrand className="text-black">
        <Link href="../home">
        <AcmeLogo />
        <p className="font-bold text-black">KIBU</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6 justify-center">
        <NavbarItem>
          <Link color="foreground" href="#">
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
              <b>Nayabazar</b>
            </DropdownItem>
            <DropdownItem
              key="Boudha"
              description="located 5 minutes away from the heart of Kathmandu's buddhism and the famous Boudha stupa"
            >
              <b>Boudha</b>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link href="#" color="foreground">
            Facilities
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#">
            Reviews
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#">
            Direct Benefits
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
    
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
