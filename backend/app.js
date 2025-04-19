import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRouter from "./routes/auth.routes.js"; // Import auth routes
import userRouter from "./routes/user.routes.js"; // Import user routes

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

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello,this is our homepage!");
});

// Import routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
