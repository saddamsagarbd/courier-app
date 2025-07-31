import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trackingNumber: { type: String, required: true, unique: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientPhone: { type: String, required: true },
  parcelType: {
    type: String,
    enum: ["document", "package", "fragile", "perishable"],
    default: "document",
  },
  weight: { type: Number, required: true }, // in kg
  dimensions: { type: String }, // e.g., "10x10x10"
  paymentMethod: {
    type: String,
    enum: ["prepaid", "cod"],
    required: true,
  },
  codAmount: { type: Number, default: 0 },
  specialInstructions: { type: String },
  status: {
    type: String,
    enum: ["pending", "assigned", "picked-up", "in-transit", "delivered", "failed"],
    default: "pending",
  },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

parcelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Parcel = mongoose.model("Parcel", parcelSchema);
export default Parcel;
