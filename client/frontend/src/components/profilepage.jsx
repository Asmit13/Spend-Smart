import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, User } from "lucide-react";
import axios from "axios"
import { FaDev } from "react-icons/fa";



export default function UserProfile() {
    const [transactions, setTransactions] = useState([])
     const [userData, setUserData] = useState({
        username: "",
      });
    const token = localStorage.getItem("authToken");
    
  useEffect(() => {
    const fetchTransactions = async () => {
      const formData = {
        frequency: "", // You can modify this as needed
        selectedDate: [], // If you need to pass specific date range, update this
        type: "all", // Modify this as needed to filter by type
      };

    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      setUserData((prevData) => ({
        ...prevData,
        username: decodedPayload.email,
      }));
    }

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

  const totalIncome = transactions?.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0) || 0;
  const totalExpenses = transactions?.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0) || 0;
  const profitLoss = totalIncome - totalExpenses;
  const profitLossPercentage = totalIncome > 0 ? ((profitLoss / totalIncome) * 100).toFixed(2) : "0.00";
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-900 p-6">
      {/* Profile Card */}
      <motion.div
        className="flex flex-col md:flex-row items-center bg-gray-800/60 backdrop-blur-lg text-white p-6 rounded-3xl shadow-lg w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Left: Profile Image */}
        <motion.div
          className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md"
          whileHover={{ opacity:0.8 }}
        >
          <img
            src="avatar3.png"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right: User Details */}
        <motion.div className="flex flex-col justify-center mt-6 md:mt-0 md:ml-8 text-center md:text-left">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {userData.username} <Sparkles size={20} className="text-yellow-400 animate-pulse" />
          </h2>
          <p className="text-blue-400 text-sm">Role: Just a Normal User</p>
          <p className="mt-2 text-gray-300 flex items-center gap-2">
            <User size={18} /> Joined: {transactions[0]?.date.split("T")[0]}
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
          <button
      className="gap-2 opacity-20 hover:opacity-100 mt-4 relative box-border inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-0 bg-gradient-to-r from-sky-500 to-blue-600 px-4 font-mono leading-none text-white no-underline shadow-[rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,rgba(58,65,111,0.5)_0_-3px_0_inset] transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] focus:shadow-[#3c4fe0_0_0_0_1.5px_inset,rgba(45,35,66,0.4)_0_2px_4px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#3c4fe0_0_-3px_0_inset] active:translate-y-0.5 active:shadow-[#3c4fe0_0_3px_7px_inset]"
      role="button"
      onClick={(e)=>{window.open("https://www.linkedin.com/in/piyushpatelcodes/", '_blank')}}
    >
      Connect With   <FaDev size={25}  />
    </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid mb-8 grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full max-w-4xl">
        {/* Income Card */}
        <motion.div
          className="bg-green-600 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4"
          whileHover={{ scale: 1.05 }}
        >
          <TrendingUp size={40} />
          <div>
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-3xl font-bold">
            ₹{totalIncome} 
      {profitLossPercentage > 0 && (
        <span className="text-sm font-medium opacity-80"> ({profitLossPercentage}% in Profit)</span>
      )}
    </p>
          </div>
        </motion.div>

       {/* Expenses Card */}
<motion.div
  className="bg-red-500 text-white p-5 rounded-2xl shadow-lg flex items-center gap-4"
  whileHover={{ scale: 1.05 }}
>
  <TrendingDown size={40} />
  <div>
    <h3 className="text-lg font-semibold">Total Expenses</h3>
    <p className="text-3xl font-bold">
    ₹{totalExpenses} 
      {profitLossPercentage < 0 && (
        <span className="text-sm font-medium opacity-80"> ({-profitLossPercentage}% in Loss)</span>
      )}
    </p>
  </div>
</motion.div>

      </div>
    </div>
  );
}
