const express = require('express')
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionctrl')
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router()

//routes
//add transaction
router.post('/add-transaction',authenticateToken, addTransaction)

//edit transaction
router.post('/edit-transaction',authenticateToken, editTransaction)

//delete transaction
router.post('/delete-transaction',authenticateToken, deleteTransaction)

//get transaction
router.post('/get-transaction',authenticateToken, getAllTransaction)


module.exports = router