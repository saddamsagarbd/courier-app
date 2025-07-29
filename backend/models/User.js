// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "agent"],
      default: "customer",
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    address: String,
    is_active: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

userSchema.index({ name: 1, email: 1, phone: 1, is_active: 1 });

export default mongoose.model("User", userSchema);
