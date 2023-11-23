const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

app.use(express.json());
app.use(userRoutes);
app.use(transactionRoutes);

const port = process.env.PORT || 3000;
app.listen(port);
