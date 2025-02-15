"use client";

import React,{ useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, InfoIcon, Landmark, PieChart } from "lucide-react";

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: <Landmark size={18} />,
    route: "/"
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Inbox size={18} />,
    route: "/dashboard"
  },
  {
    id: "addtransaction",
    label: "Add",
    icon: <PieChart size={18} />,
    route: "/add-transaction"
  },
  {
    id: "about",
    label: "About",
    icon: <InfoIcon size={18} />,
    route: "/about"
  },
];

export default function FluidTabs() {
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.route === window.location.pathname)?.id || "home");
  const [touchedTab, setTouchedTab] = useState<string | null>(null);
  const [prevActiveTab, setPrevActiveTab] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTabClick = (tabId: string, tabroute:string) => {
    setPrevActiveTab(activeTab);
    setActiveTab(tabId);
    setTouchedTab(tabId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setTouchedTab(null);
      window.location.assign(tabroute);
    }, 600);
  };


  const handlelogout = () => {
    localStorage.removeItem("authToken"); // or sessionStorage.removeItem("token")
    window.location.href = "/login"; // Redirect to login page
  };

  const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

  return (
    <div className="ml-24 flex items-center justify-center py-4">
      
      <div className="relative flex w-full max-w-3xl space-x-2   overflow-hidden rounded-full bg-zinc-700 p-1 shadow-lg backdrop-blur-3xl bg-opacity-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className="absolute inset-y-0 my-1  rounded-full bg-white"
            initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
            animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${100 / tabs.length}%` }}
          />
        </AnimatePresence>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`relative z-10 flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-bold transition-colors duration-300 ${
              activeTab === tab.id ? "font-bold text-black" : "text-white"
            } ${touchedTab === tab.id ? "blur-sm" : ""}`}
            onClick={() => handleTabClick(tab.id, tab.route)}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span> 
          </motion.button>
        ))}
        
      </div>
      {localStorage.getItem("authToken") ? (
        <button
        className="-right-24 relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-rose-500 to-red-600 px-4 font-mono leading-none text-white no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,rgba(58,65,111,0.5)_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#b30000_0_-3px_0_inset] focus:shadow-[#b30000_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#b30000_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#b30000_0_3px_7px_inset]"
        role="button"
        onClick={(e)=>{handlelogout()}}
      >
        Log Out
      </button>
      ):(
        <button
        className="-right-24 relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-emerald-500 to-green-600 px-4 font-mono leading-none text-white no-underline shadow-[rgba(0,146,32,0.4)_0_2px_4px,rgba(0,142,32,0.3)_0_7px_13px_-3px,rgba(0,146,32,0.5)_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(0,146,32,0.4)_0_4px_8px,rgba(0,146,32,0.3)_0_7px_13px_-3px,#0d850d_0_-3px_0_inset] focus:shadow-[#0d850d_0_0_0_1.5px_inset,rgba(0,146,32,0.4)_0_2px_4px,rgba(0,146,32,0.3)_0_7px_13px_-3px,#b30000_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[##0d850d_0_3px_7px_inset]"
        role="button"
        onClick={(e)=>{handlelogout()}}
      >
        Log In
      </button>
      )}
      
    </div>
  );
}
