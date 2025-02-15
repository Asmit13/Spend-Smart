import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

// Register all the necessary chart elements
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const ExpenseIncomeCharts = ({ transactions }) => {
  const incomeData = transactions.filter((t) => t.type === "income");
  const expenseData = transactions.filter((t) => t.type === "expense");

  const groupedData = transactions.reduce((acc, t) => {
    const date = new Date(t.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      acc[date].income += t.amount;
    } else if (t.type === "expense") {
      acc[date].expense += t.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(groupedData);
  const incomeValues = labels.map((date) => groupedData[date].income);
  const expenseValues = labels.map((date) => groupedData[date].expense);

  // Bar Chart Data (Income vs Expense per Day)
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        backgroundColor: "#4ade80", // Green color for income
        borderRadius: 6, // Rounded corners for bars
        barThickness: 32, // Thin bars
        borderWidth: 1, // Add border around bars
        borderColor: "#34d399", // Light green border
      },
      {
        label: "Expense",
        data: expenseValues,
        backgroundColor: "#f87171", // Red color for expense
        borderRadius: 6, // Rounded corners for bars
        barThickness: 32, // Thin bars
        borderWidth: 1, // Add border around bars
        borderColor: "#fb7185", // Light red border
      },
    ],
  };

  // Pie Chart Data (Income vs Expense Distribution)
  const totalIncome = incomeData.reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = expenseData.reduce((acc, t) => acc + t.amount, 0);

  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  const tooltipOptions = {
    callbacks: {
      title: (tooltipItem) => `${tooltipItem[0].label}`,
      label: (tooltipItem) => {
        const value = tooltipItem.raw;
        return `Amount: $${value.toFixed(2)}`;
      },
    },
    backgroundColor: "#2e3b4e",
    titleColor: "#fff",
    bodyColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mb-5">
      {/* Bar Chart - Daily Income vs Expense */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-full h-96 clip-shape">
        <h2 className="text-xl font-bold text-white mb-4">
          Income vs Expenses Per Day
        </h2>
        <Bar
          data={barChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: tooltipOptions,
              legend: { position: "top", align: "end" },
            },
          }}
        />
      </div>

      {/* Pie Chart - Income vs Expense Distribution & Categories */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-full h-96 clip-shape">
        <h2 className="text-xl font-bold text-white mb-4">
          Income vs Expense Distribution & Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-72">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                rotation: Math.PI / 4,
                plugins: { legend: { position: "top", align: "start" } },
              }}
            />
          </div>
          <div className="relative p-6 rounded-xl  w-full h-72 overflow-hidden group">
  {/* Gradient Blobs with Blur Effect */}
  <div className="absolute inset-0 flex items-center justify-center z-0  backdrop-blur-2xl">
    <div className="animated-blob absolute bg-indigo-500 w-22 h-32 rounded-full opacity-60"></div>
    <div className="animated-blob absolute bg-purple-600 w-48 h-48 rounded-full opacity-50"></div>
    <div className="animated-blob absolute bg-blue-500 w-40 h-40 rounded-full opacity-40"></div>
  </div>

  {/* Card Content with Frosted Glass Effect */}
  <div className="relative h-full w-full z-10 backdrop-blur-lg bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-lg transition-all duration-500  group-hover:shadow-2xl">
    <h2 className="text-xl font-semibold mb-4 text-white hover:text-indigo-300 transition-all">Summary</h2>
    <p className="text-gray-300 hover:bg-green-500/20 p-2 rounded-md transition-colors duration-300">
  Total Transactions: {transactions.length}
</p>
    <p className="text-green-400 hover:bg-green-500/20 p-2 rounded-md transition-colors duration-300">
      Total Income: ₹ 
      {transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0)
        .toFixed(2)}
    </p>
    <p className="text-red-400 hover:bg-red-500/20 p-2 rounded-md transition-colors duration-300">
      Total Expenses: ₹ 
      {transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)
        .toFixed(2)}
    </p>
  </div>

  {/* Add CSS for Blobs Animation */}
  <style jsx>{`
    .animated-blob {
      animation: floatAnimation 10s ease-in-out infinite;
    }
    
    @keyframes floatAnimation {
      0% {
        transform: translateY(0px) translateX(0px) scale(1);
      }
      25% {
        transform: translateY(-20px) translateX(5px) scale(1);
      }
      70% {
        transform: translateY(20px) translateX(-8px) scale(1);
      }
        100% {
        transform: translateY(0px) translateX(0px) scale(1);
      }
    }
  `}</style>
</div>


        </div>
      </div>
    </div>
  );
};

export default ExpenseIncomeCharts;
