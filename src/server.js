const express = require("express");
const app = express();
require("dotenv").config();
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use(express.json());
app.use(userRoutes);
app.use(transactionRoutes);
app.use(categoryRoutes);

module.exports = app;
