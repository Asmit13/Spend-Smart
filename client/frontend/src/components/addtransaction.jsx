import React, { useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import moment from "moment";
import { FiPlus, FiDollarSign, FiType, FiTag, FiCreditCard, FiMapPin, FiEdit3, FiPlusCircle } from "react-icons/fi";
import Profile from "./profilepage";
import {motion} from "framer-motion"
import { BiRupee } from "react-icons/bi";


export const AddTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    paymentMethod: "Cash",
    tags: "",
    payerPayee: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

   // Detect location using the browser and convert coordinates to address
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch the address using Nominatim (OpenStreetMap)
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then((response) => response.json())
            .then((data) => {
              // Extract the address from the API response
              const address = data.display_name;
              setUserLocation(address);

              // Automatically set location if not provided by the user
              setFormData((prevData) => ({
                ...prevData,
                location: prevData.location || address,
              }));
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setUserLocation("Unable to fetch address");
            });
        },
        (error) => {
          console.error("Error detecting location:", error);
          setUserLocation("Location not provided");
        }
      );
    } else {
      setUserLocation("Geolocation not supported");
    }
  }, []);


  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Extract token from localStorage
    const token = localStorage.getItem("authToken");

    // Get current location if not provided
    if (!formData.location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          formData.location = `Lat: ${latitude}, Long: ${longitude}`;
        },
        () => {
          formData.location = "Location not provided";
        }
      );
    }
    const finalLocation = formData.location || userLocation || "Location not provided";

    const transactionData = {
      ...formData,
      tags: formData.tags.split(","), 
      date: moment().toISOString(), 
      location: finalLocation,
    };

    try {
      const response = await fetch("https://spend-smart-3x86.vercel.app/api/v1/transactions/add-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("Transaction added successfully!");
        setFormData({
          amount: "",
          type: "",
          category: "",
          description: "",
          paymentMethod: "Cash",
          tags: "",
          payerPayee: "",
          location: "",
        });
        toggleDialog();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <motion.button
        onClick={toggleDialog}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-md hover:shadow-lg transition-all duration-1000 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mt-32 ml-32 m-3"
      >
        <FiPlus className="inline mr-2" />
        Add Transaction
      </motion.button>
      <Profile />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-6">
            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-gray-900 text-white p-8 shadow-lg transition-all">
              <Dialog.Title className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BiRupee className="text-blue-400" />
                Add Transaction
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amount & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <BiRupee />
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <FiType />
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>

                {/* Category & Payment Method */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <FiTag />
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Movies, Fun, Office, Work, Bank Fee, etc."
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <FiCreditCard />
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Credit Card">Credit Card</option>
                    </select>
                  </div>
                </div>

                {/* Tags & Payer/Payee */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <FiEdit3 />
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="To Display Purpose of Transaction. eg: Job Related,..."
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                     
                    /> 
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                      <FiMapPin />
                      Payer/Payee
                    </label>
                    <input
                      type="text"
                      name="payerPayee"
                      placeholder="Money From/To Whom"
                      value={formData.payerPayee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                    <FiEdit3 />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    required
                  ></textarea>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-1">
                    <FiMapPin />
                    Location [Leave blank to auto-fetch]
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave blank to auto-fetch"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 hover:text-green-400 py-3 flex gap-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-md hover:shadow-lg transition-all duration-200"
                    disabled={loading}
                  >   <FiPlusCircle className="text-green-300 mt-1 " />
                    {loading ? "Adding..." : "Add Transaction"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddTransaction;