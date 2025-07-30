import express from "express";
import {
  createParcel,
  getBookingByUser,
} from "../controllers/parcelController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/booking", authMiddleware, createParcel);
router.get("/my-bookings", authMiddleware, getBookingByUser);

export default router;
