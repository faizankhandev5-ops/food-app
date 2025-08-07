const express = require("express"); // import express from "express";
const app = express(); // create an instance of express app
const cors = require("cors"); // import cors middleware
const morgan = require("morgan"); // import morgan middleware
const colors = require("colors"); // import colors middleware
const dotenv = require("dotenv"); // import dotenv middleware
const connectDb = require("./config/db");

const PORT = process.env.PORT || 8080; // define the port number

dotenv.config(); // load environment variables from .env file
connectDb(); // connect to the database
app.use(cors()); // enable CORS for all routes
app.use(express.json()); // parse JSON request bodies
app.use(morgan("dev")); // log HTTP requests in dev format

app.use("/api/v1/test", require("./routes/testRoute")); // use testRoute.js file for /api/v1/test route

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white); // log message when server is running
});

app.get("/", (req, res) => {
  res.json("abc");
});
