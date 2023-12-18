const express = require("express");
const app = express();
require("dotenv").config();
// const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(userRoutes);
// app.use(transactionRoutes);

module.exports = app;
