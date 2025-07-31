import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { dashBoardStates } from "../controllers/adminController.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, dashBoardStates);

export default router;
