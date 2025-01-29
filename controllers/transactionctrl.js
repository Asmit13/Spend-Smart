const transactionModel = require('../models/transactionModel');
const moment = require('moment');

const getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;

        // Initialize the filter object
        let filter = {
            userid: req.user.userId, // Filter by userId from the authenticated token
        };

        // If no frequency is provided, skip date filtering (include all transactions)
        if (frequency && frequency !== 'custom') {
            filter.date = {
                $gt: moment().subtract(Number(frequency), 'd').toDate(),
            };
        } else if (selectedDate && selectedDate.length === 2) {
            // If custom date range is provided, filter by selected date range
            filter.date = {
                $gte: selectedDate[0],
                $lte: selectedDate[1],
            };
        }

        // Add the type filter if it's not "all"
        if (type !== 'all') {
            filter.type = type; // Only include the 'type' filter if it's not 'all'
        }

        // Fetch transactions using the filter
        const transactions = await transactionModel.find(filter).sort({ date: -1 }); // Sorting by date in descending order (latest first)

        res.status(200).json(transactions); // Send the filtered transactions as the response
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching transactions' });
    }
};



const addTransaction = async (req, res) => {
    try {
        const userId = req.user.userId;  // Extract the user ID from the decoded token
        const newTransaction = new transactionModel({
            ...req.body,  // Use the rest of the body data
            userid: userId  // Add the user ID to the transaction
        });

        await newTransaction.save();
        res.status(201).send("Transaction created!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const editTransaction = async(req, res) => {
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).send("Edited successfully!")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteTransaction = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Transaction ID is required" }); // RETURN to prevent further execution
      }
  
      const deletedTransaction = await transactionModel.findByIdAndDelete(id);
  
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" }); // RETURN if no transaction is found
      }
  
      return res.status(200).json({ message: "Transaction deleted successfully" }); // RETURN to end execution
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return res.status(500).json({ message: "Internal server error" }); // RETURN to ensure execution stops
    }
  };
  

module.exports = {getAllTransaction, addTransaction, editTransaction, deleteTransaction}