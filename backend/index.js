import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// CORS options configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

// CORS middleware
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//api's
app.use("/api/auth", userRoute)

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`server running at port ${PORT}`);
});
