// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { connA } from "./config/db-conn.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//API routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Connect DB
connA()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
