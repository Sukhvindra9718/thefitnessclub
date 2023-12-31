const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/dbConnect");
const Error = require("./Middlewares/Error");


// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});


// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({ path: "./config/config.env"});
} 


// Connect to MongoDB
connectDB();

// Use Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieParser());

// Define a route to get all cookies

// Import all routes
app.use("/api/v1", require("./Routes/GymOwnerRoutes"));
app.use("/api/v1/trainer", require("./Routes/TrainerRoutes"));
app.use("/api/v1/trainee", require("./Routes/TraineeRoutes"));

app.get("/password/reset/:token", (req, res) => {
  res.sendFile(__dirname + "/resetpassword.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  process.kill(process.pid, "SIGINT");
});

app.use(Error);