const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Link Routes
const PaymentFunctionRoute = require("./Routes/PaymentFunctionRoute.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use("/paymentFunction", PaymentFunctionRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
