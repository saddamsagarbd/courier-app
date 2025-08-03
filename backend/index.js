import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { connA } from "./config/db-conn.js";
import cookieParser from "cookie-parser";
import { initSocket } from "./config/socket.js";
import { socketHandler } from "./config/socketHandler.js";

// Validate critical env vars after config load
["MONGO_URI", "JWT_SECRET_KEY", "PORT"].forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`Missing ${variable} in .env`);
    process.exit(1);
  }
});

const app = express();

// Security middleware
app.use(helmet());
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Create HTTP server and Socket.IO with auth
const server = http.createServer(app);
const io = initSocket(server, process.env.FRONTEND_URL);
socketHandler(io);

// DB connection
connA()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });


// Routes
import authRoute from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoute.js";
import agentRoutes from "./routes/agentRoutes.js";

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// API routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/parcels", parcelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Force shutdown after timeout");
    process.exit(1);
  }, 5000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export { app, io };
export default server;