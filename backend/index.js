import dotenv from "dotenv";
dotenv.config({ path: './.env', quiet: true });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { connA } from "./config/db-conn.js";

// Validate critical env vars
['MONGO_URI'].forEach(variable => {
  if (!process.env[variable]) throw new Error(`Missing ${variable} in .env`);
});

const app = express();
const server = http.createServer(app); 

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Example socket event
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Security middleware
app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection middleware
connA()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// Routes
import authRoute from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
app.use("/api/auth", authRoute);
app.use("/api/parcels", parcelRoutes);

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app };
// export default app;
export default server;