const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path")
const connectDb = require("./config/connectDb");

dotenv.config();

connectDb();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

//user routes
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction routes
app.use("/api/v1/transactions", require('./routes/transactionRoutes'))

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});