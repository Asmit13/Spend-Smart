const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        require: true,
    },
    amount:{
        type:Number,
        required:[true, "amount is required"]
    },
    type:{
        type:String,
        required:[true, "type is required"]
    },
    category:{
        type:String,
        required:[true, "cat is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    paymentMethod: {
        type: String,
        enum: ["UPI", "Cash", "Debit Card", "Credit Card"],
        default: "Cash",
      },
      tags: {
        type: [String], // Array of tags
        default: [],
      },
      payerPayee: {
        type: String,
        trim: true,
        default: "Not Provided",
      },
      location: {
        type: String,
        default: "Location not provided",
      },
    date:{
        type:Date,
        required:[true,"date is required"]
    }
}, {timestamps:true})

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;