const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/index");
const globalErrorhandler = require("./middlewares/errorHandlerMiddleware");
const CustomError = require("./utils/customError");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

app.use(cors());
app.use(express.json());

// API routes and 404 error handling
app.use("/api", routes);

app.use("*name", (req, res, next) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

// app error handling
app.use(globalErrorhandler);

// Creating Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on : ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
