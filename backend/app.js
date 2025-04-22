import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRouter from "./routes/auth.routes.js"; // Import auth routes
import userRouter from "./routes/user.routes.js"; // Import user routes
import geminiRouter from "./routes/gemini.routes.js"; // Import gemini routes

const app = express();

dotenv.config(); // Load environment variables from.env file

const port = process.env.PORT || 3000;

connectDB(); // Connect to MongoDB database

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);

// app.use(bodyParser.json());
app.use(cookieParser());
// Increase the file size limits for body parsing
app.use(express.json({ limit: '10mb' })); // for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
  res.send("Hello,this is our homepage!");
});

// Import routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/gemini", geminiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
