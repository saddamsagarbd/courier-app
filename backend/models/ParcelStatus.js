import mongoose from "mongoose";

const parcelStatusSchema = new mongoose.Schema({
  parcel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parcel",
    required: true,
  },
  status: {
    type: String,
    enum: ["Picked Up", "In Transit", "Delivered", "Failed"],
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Usually agent
  },
  location: {
    lat: Number,
    lng: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ParcelStatus", parcelStatusSchema);
