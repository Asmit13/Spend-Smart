import React, { useEffect, useState } from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import Spline from "@splinetool/react-spline";
import axios from "axios";

const MasterCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionsData, setTransactions] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    balance: 1000,
    budget: 5000,
    totalIncome: 10000,
    totalExpense: 5000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      setUserData((prevData) => ({
        ...prevData,
        username: decodedPayload.email,
      }));
    }
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const formData = {
        frequency: "",
        selectedDate: [],
        type: "all",
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
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  // Pagination Logic
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactionsData?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactionsData?.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleUserDataChange = (field, value) => {
    setUserData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Load User Data from Local Storage
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  // Calculations
  const profitValue = userData.totalIncome - userData.totalExpense;
  const profitPercentage =
    userData.totalIncome > 0
      ? ((profitValue / userData.totalIncome) * 100).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex items-center justify-center p-6 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="animated-blob absolute bg-indigo-700 w-32 h-32 rounded-full opacity-60"></div>
        <div className="animated-blob absolute bg-purple-600 w-48 h-48 rounded-full opacity-50"></div>
        <div className="animated-blob absolute bg-blue-800 w-40 h-40 rounded-full opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl p-6 space-y-6 relative z-10 flex flex-row">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-lg font-semibold">{`Hello, ${userData?.username}`}</div>
            <button
              onClick={toggleDialog}
              className="text-blue-500 hover:text-blue-300 transition-all duration-200"
            >
              <FiCreditCard className="text-xl" />
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-xl text-white font-semibold">
              Balance: $
              <input
                type="number"
                value={userData.balance}
                onChange={(e) =>
                  handleUserDataChange("balance", parseFloat(e.target.value))
                }
                className="bg-transparent text-white border-b-2 border-gray-500 focus:outline-none"
              />
            </div>
            <div className="text-sm text-gray-400">
              Budget: $
              <input
                type="number"
                value={userData.budget}
                onChange={(e) =>
                  handleUserDataChange("budget", parseFloat(e.target.value))
                }
                className="bg-transparent text-gray-400 border-b-2 border-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-sm">{`Total Income: $${userData.totalIncome}`}</div>
            <div className="text-white text-sm">{`Total Expense: $${userData.totalExpense}`}</div>
            <div className="text-white text-sm">
              Profit: ${profitValue} ({profitPercentage}%)
            </div>
          </div>

          {/* Transactions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:scale-105 transform transition-all duration-300"
              >
                <div>
                  <div className="text-white text-sm font-semibold">
                    {transaction.category}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {transaction.description}
                  </div>
                </div>
                <div className="text-white text-lg font-semibold">
                  {transaction.type === "expense" ? "-" : "+"}${transaction.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Section (Spline) */}
        <div className="w-1/3 flex flex-col justify-center items-center h-auto m-10 overflow-y-auto">
          <div className="h-[70vh] w-[62vh] bg-gray-800/0 mb-10 rounded-xl shadow-lg flex justify-center items-start">
            <Spline
              scene="https://prod.spline.design/SeqooMO-xIu8AsUe/scene.splinecode"
              className="absolute -top-20 left-96   items-start"
            />   <div className="absolute bottom-4 right-4 bg-slate-600 text-white px-6 py-2 rounded-lg shadow-lg text-lg font-semibold flex items-center space-x-2">
            <span>Sorting Visualizer</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterCard;
