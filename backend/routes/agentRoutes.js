import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { dashBoardStates, getAgents } from "../controllers/agentController.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, dashBoardStates);
router.get("/get-agents", authMiddleware, getAgents);

export default router;
