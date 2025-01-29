import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiTrash } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Mastercard from "./mastercard"



export const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [userLocation, setUserLocation] = useState("");
 

  const navigate = useNavigate();

  // Detect location using the browser
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
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


  // Fetching token from localStorage
  const token = localStorage.getItem("authToken");
  const capitalizeWords = str => str.replace(/\b\w/g, char => char.toUpperCase());


  useEffect(() => {
    const fetchTransactions = async () => {
      const formData = {
        frequency: "11", // You can modify this as needed
        selectedDate: [], // If you need to pass specific date range, update this
        type: "all", // Modify this as needed to filter by type
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/transactions/get-transaction",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(response.data);
        console.log("Fetched transactions:", response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

 

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/transactions/delete-transaction",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Transaction deleted successfully:", response.data);
      navigate(0)
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  
  const handleDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };


  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };


  


  


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
        Income & Expense Tracker
      </h1>

      <Mastercard />


      {transactions.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No transactions found. Add your income or expenses to get started!
        </div>
      ) : (
        <div className="space-y-4">
  {transactions.map((transaction) => (
    <div
      key={transaction._id}
      className={`p-6 rounded-lg shadow-md flex items-center justify-between bg-gradient-to-r ${
        transaction.type === "income"
          ? "from-green-500 to-green-700"
          : "from-red-500 to-red-700"
      } transition transform hover:scale-[103%] hover:shadow-lg`}
    >
      {/* Left Section: Basic Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-8">
        <div
          className="text-lg font-semibold truncate"
          style={{ minWidth: "150px" }}
        >{transaction.description.toUpperCase()}
            
        </div>
        <div className="text-sm text-gray-200" style={{ minWidth: "120px" }}>
          {moment(transaction.date).format("LL")}
        </div>
      </div>

      {/* Middle Section: Additional Details */}
      <div
        className="text-sm"
        style={{ textAlign: "start", minWidth: "100px" }}
      >
        <span className="text-white">₹{transaction.amount.toFixed(2)}</span>
      </div>

      <div
        className="text-sm"
        style={{ textAlign: "start", minWidth: "100px" }}
      >
        <span
          className={`${
            transaction.type === "income"
              ? "text-green-200"
              : "text-red-200"
          } font-medium`}
        >
          {transaction.type.charAt(0).toUpperCase() +
            transaction.type.slice(1)}
        </span>
      </div>

      <div
        className="text-sm truncate"
        style={{ textAlign: "start", minWidth: "120px" }}
      >
        <span className="font-semibold text-gray-100">Category:</span>{" "}
        <span className="text-white">{transaction.category}</span>
      </div>

      <div
        className="text-sm truncate"
        style={{ textAlign: "start", minWidth: "150px" }}
      >
        <span className="font-semibold text-gray-100">Payment Mode:</span>{" "}
        <span className="text-white">
          {transaction.paymentMethod || "N/A"}
        </span>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => handleDelete(transaction._id)}
          className="text-red-200 hover:text-red-700 hover:bg-red-300 p-2 rounded-md transition flex items-center space-x-1"
        >
          <CiTrash className="h-6 w-6" />
          <span className="hidden sm:block text-sm">Delete</span>
        </button>
        <button
          onClick={() => handleDetails(transaction)}
          className="text-blue-200 hover:text-blue-700 hover:bg-blue-300 p-2 rounded-md transition flex items-center space-x-1"
        >
          <IoIosInformationCircle className="h-6 w-6" />
          <span className="hidden sm:block text-sm">Details</span>
        </button>
      </div>
    </div>


        ))}
      </div>
      )}

      {!isOpen && transactions.length > 0 && (
        <div className="mt-8 text-gray-300 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p>Total Transactions: {transactions.length}</p>
          <p>
            Total Income: ₹
            {transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}
          </p>
          <p>
            Total Expenses: ₹
            {transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      )}

      {/* Dialog Component from Headless UI */}
     <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
    <DialogPanel className="max-w-lg w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <DialogTitle className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Transaction Details
      </DialogTitle>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-4 py-2 font-semibold text-lg">Field</th>
              <th className="text-left px-4 py-2 font-semibold text-lg">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Description */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Description</td>
              <td className="px-4 py-2">{selectedTransaction?.description.toUpperCase() || "N/A"}</td>
            </tr>

            {/* Amount */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Amount</td>
              <td className="px-4 py-2">{`₹${selectedTransaction?.amount?.toFixed(2) || "0.00"}`}</td>
            </tr>

            {/* Type */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Type</td>
              <td className="px-4 py-2">
                <span
                  className={`${
                    selectedTransaction?.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {selectedTransaction?.type
                    ? selectedTransaction?.type.charAt(0).toUpperCase() + selectedTransaction?.type.slice(1)
                    : <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                    N/A
                  </span>}
                </span>
              </td>
            </tr>

            {/* Category */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Category</td>
              <td className="px-4 py-2">{selectedTransaction?.category || <span className="px-3 py-1 bg-blue-700/30 backdrop-blur-2xl text-gray-300 rounded-full text-xs">
                      N/A
                    </span>}</td>
            </tr>

            {/* Payment Method */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Payment Method</td>
              <td className="px-4 py-2">{selectedTransaction?.paymentMethod || <span className="px-3 py-1 bg-green-700/30 backdrop-blur-2xl text-gray-300 rounded-full text-xs">
                      N/A
                    </span>}</td>
            </tr>

            {/* Tags */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Tags</td>
              <td className="px-4 py-2">
                <div className="flex gap-2 flex-wrap">
                  {selectedTransaction?.tags?.length ? (
                    selectedTransaction.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs"
                      >
                        {capitalizeWords(tag)}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                      N/A
                    </span>
                  )}
                </div>
              </td>
            </tr>

            {/* Payer/Payee */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Payer/Payee</td>
              <td className="px-4 py-2">{selectedTransaction?.payerPayee || "Not Provided"}</td>
            </tr>

            {/* Location */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Location</td>
              <td className="px-4 py-2">{selectedTransaction?.location || "Location not provided"}</td>
            </tr>

            {/* Created/Updated At */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">Created/Updated At</td>
              <td className="px-4 py-2">
                {selectedTransaction?.updatedAt
                  ? new Date(selectedTransaction?.createdAt).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleCloseDialog}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </DialogPanel>
  </div>
</Dialog>


    </div>
  );
};

export default Dashboard;
