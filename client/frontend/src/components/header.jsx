'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="backdrop-blur-2xl bg-zinc-800 bg-opacity-50 text-gray-200  shadow-md fixed top-0 w-full z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Sorting Visualizer App</span>
            <img
              alt="Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold text-gray-200 hover:text-green-500 hover:bg-zinc-100/10 p-2 rounded-lg ">
            Home
          </a>
          <a href="/add-transaction" className="text-sm font-semibold text-gray-200 hover:text-green-500 hover:bg-zinc-100/10 p-2 rounded-lg ">
            Add Transaction
          </a>
          <a href="/dashboard" className="text-sm font-semibold text-gray-200 hover:text-green-500 hover:bg-zinc-100/10 p-2 rounded-lg ">
          Dashboard
          </a>
          <a href="/about" className="text-sm font-semibold text-gray-200 hover:text-green-500 hover:bg-zinc-100/10 p-2 rounded-lg ">
            About
          </a>
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-gray-800 px-6 py-6 sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200 hover:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              <a
                href="/"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-gray-700"
              >
                Home
              </a>
              <a
                href="/sorting"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-gray-700"
              >
                add Transaction
              </a>
              <a
                href="/about"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-200 hover:bg-gray-700"
              >
                About
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
