import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/jobs.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

// Load environment variables from .env file
dotenv.config();

const app = express();

const __dirname = path.resolve();  // Corrected to __dirname

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// CORS options configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Update as needed for production
  credentials: true
};

// CORS middleware
app.use(cors(corsOptions));

// MongoDB connection
connectDB();

// API routes
app.use("/api/auth", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/application", applicationRoute);

// Serve static files for the client
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
