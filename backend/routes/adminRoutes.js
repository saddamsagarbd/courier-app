import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminOnly.js";
import { dashBoardStates } from "../controllers/adminController.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, adminOnly, dashBoardStates);

export default router;
