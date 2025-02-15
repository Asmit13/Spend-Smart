import React from "react";
import { FaRust, FaNodeJs, FaReact, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiMongodb } from "react-icons/si";
import ShinyText from "./ui/shinytext"
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";

export default function AboutUs() {
  return (
    <div className="  flex-col py-16 relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
  
      
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="relative z-10 p-6 max-w-3xl mx-auto text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl hover:text-emerald-400 transition-colors duration-200">
        <ShinyText text="ABOUT SPEND SMART"  disabled={false} speed={3} className='custom-class' />

        </h1>
        <p className="mt-4 text-lg leading-relaxed sm:mt-6">
          Spend Smart is your ultimate expense and income tracker, designed to
          help you take full control of your finances effortlessly. With an
          intuitive interface and powerful analytics, it allows you to track
          every penny, categorize expenses, and visualize your financial habits
          in real time. Whether you're setting monthly budgets, planning
          savings, or simply keeping an eye on where your money goes, Spend
          Smart makes it easy with interactive charts and detailed reports. Stay
          on top of your finances with smart insights, seamless logging, and a
          secure, user-friendly experience that empowers you to make informed
          financial decisions. Let Spend Smart be your guide to smarter spending
          and better financial{" "}
        </p>

        {/* MERN Stack Logos Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Technologies We Use</h2>
          <div className="flex justify-center space-x-6 mt-4 text-4xl">
            <SiMongodb className="text-green-500 hover:-translate-y-3 transition-all duration-500" title="Node.js" />
            <SiExpress title="Next.js" className="hover:-translate-y-3 transition-all duration-500" />
            <FaReact className="text-blue-600 hover:-translate-y-3 transition-all duration-500" title="React" />
            <FaNodeJs className="text-green-500 hover:-translate-y-3 transition-all duration-500" title="Node.js" />
            <SiNextdotjs title="Next.js" className="hover:-translate-y-3 transition-all duration-500" />
            <IoLogoJavascript className="text-amber-300 hover:-translate-y-3 transition-all duration-500" title="JavaScript" />
            <RiTailwindCssFill className="text-sky-400 hover:-translate-y-3 transition-all duration-500" title="Tailwind CSS" />
          </div>
        </div>
      </div>
      <ShinyText text="Developed By Asmit Aditya Singh!" disabled={false} speed={3}  className='custom-class' />

    </div>
  );
}
