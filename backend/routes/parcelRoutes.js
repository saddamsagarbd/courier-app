import express from "express";
import { createParcel } from "../controllers/parcelController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/book", auth(["customer"]), createParcel);
router.get("/my-bookings", auth(["customer"]), getBookingByUser);

export default router;
