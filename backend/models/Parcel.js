import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // assigned by admin
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    parcelType: {
      type: String,
      enum: ["document", "box", "fragile", "others"],
      required: true,
    },
    parcelSize: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "prepaid"],
      required: true,
    },
    codAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Picked Up",
        "In Transit",
        "Delivered",
        "Failed",
      ],
      default: "Pending",
    },
    currentLocation: {
      lat: Number,
      lng: Number,
    },
    qrCode: String, // Optional (for bonus)
    barcode: String, // Optional (for bonus)
  },
  { timestamps: true }
);

export default mongoose.model("Parcel", parcelSchema);
