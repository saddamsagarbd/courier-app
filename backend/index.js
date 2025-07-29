import dotenv from "dotenv";
dotenv.config({ path: './.env', quiet: true });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connA } from "./config/db-conn.js";

// Validate critical env vars
['MONGO_URI'].forEach(variable => {
  if (!process.env[variable]) throw new Error(`Missing ${variable} in .env`);
});

const app = express();

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
app.use("/api/auth", authRoute);

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
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
export default app;