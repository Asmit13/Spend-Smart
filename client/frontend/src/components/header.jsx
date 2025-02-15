"use client";

import { useState } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Navtab from "./ui/navtab.tsx"

import useAuth from "../utils/useAuth";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = useAuth();

  const handlelogout = () => {
    localStorage.removeItem("authToken"); // or sessionStorage.removeItem("token")
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <>
    <header className=" backdrop-blur-2xl  bg-transparent bg-opacity-50 text-gray-200  shadow-md fixed top-0 w-full z-50">
       <Navtab  />
    </header>
    
    </>
  );
}
