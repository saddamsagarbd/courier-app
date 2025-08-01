import express from "express";
import {
  createParcel,
  getBookingByUser,
  bookedParcels,
  assignAgent,
  getAgents,
  updateParcelStatus,
  getParcelById,
  getParcelLocation,
} from "../controllers/parcelController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/booking", authMiddleware, createParcel);
router.get("/my-bookings", authMiddleware, getBookingByUser);
router.get("/booked", authMiddleware, bookedParcels);
router.get("/:id", authMiddleware, getParcelById);
router.get("/agents", authMiddleware, getAgents);
router.put("/:id/assign-agent", authMiddleware, assignAgent);
router.put("/:id/update-status", authMiddleware, updateParcelStatus);
router.put("/location/:parcelId", authMiddleware, getParcelLocation);

export default router;
