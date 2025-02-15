import React, { useEffect, useState } from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import DevCard from "./devcard"
import Tooltip from "./ui/tooltip"

const MasterCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionsData, setTransactions] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const token = localStorage.getItem("authToken");

  const totalIncome = transactionsData?.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0) || 0;
  const totalExpenses = transactionsData?.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0) || 0;
  const profitLoss = totalIncome - totalExpenses;
  const profitLossPercentage = totalIncome > 0 ? ((profitLoss / totalIncome) * 100).toFixed(2) : "0.00";

  const [isDevcard, setisDevcard] = useState(false);

  const toggledevcard = () => {
    setisDevcard((prev) => !prev);
  };
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
        <div className="min-h-screen w-screen bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
          {/* Background Animated Blobs */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="animated-blob absolute bg-indigo-500 w-40 h-40 rounded-full opacity-50 blur-xl"></div>
            <div className="animated-blob absolute bg-purple-600 w-56 h-56 rounded-full opacity-40 blur-xl"></div>
            <div className="animated-blob absolute bg-blue-700 w-48 h-48 rounded-full opacity-30 blur-xl"></div>
          </div>
    
          {/* Main Glass Card */}
          <div className="w-full max-w-6xl bg-gray-900 bg-opacity-70 backdrop-blur-2xl rounded-xl shadow-2xl p-8 space-y-6 relative z-10 border border-gray-700 flex flex-row">
            {/* Left Section (Main Content) */}
            <div className="flex-1 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">{`Hello, ${userData?.username || "User"}`}</h1>
                <button
                  onClick={toggleDialog}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300"
                >
                    <Tooltip text="Dev Card!" position="left">

                  <FiCreditCard onClick={toggledevcard} className="text-white text-xl" />
                    </Tooltip>
                </button>
              
                 
                <DevCard
      isOpen={isDevcard}
      closePopup={toggledevcard}
      name="Piyush Patel"
      role="Full Stack Developer"
      experience={3}
      skills={["React", "Python", "Git"]}
      links={{
        linkedin: "https://www.linkedin.com/in/piyush-patel",
        github: "https://github.com/piyush-patel"}}
      /> 
      
              </div>
    
              {/* Transaction Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Income */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-all">
                  <p className="text-green-400 text-sm font-medium">Total Income</p>
                  <p className="text-white text-lg font-semibold">₹{totalIncome.toFixed(2)}</p>
                </div>
    
                {/* Expenses */}
                <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-all">
                  <p className="text-red-400 text-sm font-medium">Total Expenses</p>
                  <p className="text-white text-lg font-semibold">₹{totalExpenses.toFixed(2)}</p>
                </div>
    
                {/* Profit/Loss Value */}
                <div
                  className={` p-4 rounded-lg shadow-md hover:scale-105 transition-all ${
                    profitLoss >= 0 ? "bg-green-700" : "bg-red-700"
                  }`}
                >
                  <p className="text-gray-200 text-sm font-medium">Profit/Loss</p>
                  <p className="text-white text-lg font-semibold">₹{profitLoss.toFixed(2)}</p>
                </div>
    
                {/* Profit/Loss Percentage */}
                <div
                  className={`p-4 rounded-lg shadow-md hover:scale-105 transition-all ${
                    profitLoss >= 0 ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  <p className="text-gray-200 text-sm font-medium">Profit/Loss %</p>
                  <p className="text-white text-lg font-semibold">{profitLossPercentage}%</p>
                </div>
              </div>
    
              {/* Transactions List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:scale-105 transform transition-all duration-300"
                  >
                    <div>
                      <div className="text-white text-sm font-semibold">{transaction.category}</div>
                      <div className="text-gray-400 text-xs">{transaction.description}</div>
                    </div>
                    <div
                      className={`text-lg font-semibold ${
                        transaction.type === "expense" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}₹{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
    
              {/* Pagination */}
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
    
            {/* Right Section (Spline 3D Animation) */}
            <div className="w-1/3 flex flex-col justify-center items-center h-auto ml-10 overflow-hidden">
              <div className="h-[60vh] w-[50vh] bg-gray-800/0 rounded-xl shadow-lg flex justify-center items-start relative">
                <Spline
                  scene="https://prod.spline.design/SeqooMO-xIu8AsUe/scene.splinecode"
                  className="absolute -top-20 left-0 items-start"
                />
                <div className="absolute bottom-24 right-4 bg-slate-600 text-white px-6 py-2 rounded-lg shadow-lg text-lg font-semibold flex items-center space-x-2">
                  <span>Spend Smart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default MasterCard;