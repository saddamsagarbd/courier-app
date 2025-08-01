import { emitParcelStatusUpdate } from "../config/socketHelper.js";
import Parcel from "../models/Parcel.js";
import User from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";

function generateTrackingNumber() {
  return "TRK" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export const createParcel = async (req, res) => {
  try {
    const parcel = new Parcel({
      ...req.body,
      userId: req.user.id,
      trackingNumber: generateTrackingNumber(),
      status: "pending",
    });

    await parcel.save();

    // TODO: Trigger email notification

    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getBookingByUser = async (req, res) => {
  try {
    const query = { userId: req.user.id };

    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ message: "User not found" });

    const projection =
      "trackingNumber pickupAddress recipientName recipientPhone dimensions codAmount specialInstructions deliveryAddress parcelSize parcelType status paymentMethod createdAt";

    const [totalBooking, parcels] = await Promise.all([
      Parcel.countDocuments(query),
      Parcel.find(query)
        .select(projection)
        .sort({ createdAt: -1 })
        .lean()
        .maxTimeMS(5000),
    ]);

    res.status(200).json({
      status: true,
      totalBooking,
      parcels,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const bookedParcels = async (req, res) => {
  try {
    const statuses = [
      "assigned",
      "picked-up",
      "in-transit",
      "delivered",
      "failed",
    ];
    const { status } = req.query;

    const parcels = status
      ? status === "assigned"
        ? await Parcel.find({ status })
        : await Parcel.find({ status: { $in: statuses } })
      : await Parcel.find();
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch parcels" });
  }
};

export const getParcelById = async (req, res) => {
  const { id } = req.params;
  try {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch parcel" });
  }
};

export const assignAgent = async (req, res) => {
  const { id } = req.params;
  const { agentId } = req.body;

  try {
    const parcel = await Parcel.findById(id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    parcel.assignedAgent = agentId;
    parcel.status = "assigned";
    await parcel.save();

    const user = await User.findById(parcel.userId);

    // Send Email
    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: "Delivery Agent Assigned",
        text: `Dear ${user.name},\n\n a delivery agent has been assigned for your parcel ${parcel.trackingNumber}.`,
        html: `<p>Hi <strong>${user.name}</strong>,</p><p>a delivery agent has been assigned for your parcel ${parcel.trackingNumber}.</p>`,
      });
    }

    // Send SMS
    // if (user?.phone) {
    //   await sendSMS(user.phone, `Agent assigned to your parcel ${parcel.trackingId}`);
    // }

    res.status(200).json({ message: "Agent assigned successfully", parcel });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign agent", error: err });
  }
};

export const updateParcelStatus = async (req, res) => {
  const { id } = req.params;
  const { status, location } = req.body;

  try {
    const currentLocation = {
      lat: location.latitude,
      lng: location.longitude,
      updatedAt: new Date(),
    }
    const updatedParcel = await Parcel.findByIdAndUpdate(
      id,
      { status, currentLocation },
      { new: true }
    );

    emitParcelStatusUpdate(id, updatedParcel.status, updatedParcel.currentLocation || "");

    const user = await User.findById(updatedParcel.userId);

    if(updatedParcel.status === "delivered"){

      const greeting = `Dear ${user.name},\n`;

      const text = `Dear ${user.name},\n
      We are pleased to inform you that your parcel with tracking number ${updatedParcel.trackingNumber} has been successfully delivered.\n
      Thank you for choosing our services.\n\n
      Best regards,
      Courier App`;

      const html = `
        <p>Dear <strong>${user.name}</strong>,</p>
        <p>We are pleased to inform you that your parcel with tracking number <strong>${updatedParcel.trackingNumber}</strong> has been successfully delivered.</p>
        <p>Thank you for choosing our services.</p>
        <p>Best regards,<br/>Courier App</p>
      `;
    }

    if(updatedParcel.status === "failed"){      

      const greeting = `Dear ${user.name},\n`;

      const text = `We regret to inform you that the delivery of your parcel with tracking number ${updatedParcel.trackingNumber} was unsuccessful.

      Please contact our customer support for further assistance.

      Thank you for your understanding.

      Best regards,
      [Your Company Name]`;

      const html = `
        <p>Dear <strong>${user.name}</strong>,</p>
        <p>We regret to inform you that the delivery of your parcel with tracking number <strong>${updatedParcel.trackingNumber}</strong> was unsuccessful.</p>
        <p>Please contact our customer support for further assistance.</p>
        <p>Thank you for your understanding.</p>
        <p>Best regards,<br/>[Your Company Name]</p>
      `;

    }

    // Send Email
    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: "Delivery Agent Assigned",
        text: greeting + text,
        html: html,
      });
    }

    // Send SMS
    // if (user?.phone) {
    //   await sendSMS(user.phone, text);
    // }

    res
      .status(200)
      .json({ message: "Parcel Status updated successfully", updatedParcel });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err });
  }
};
export const getParcelLocation = async (req, res) => {
  const { parcelId } = req.params;
  const parcel = await Parcel.findById(parcelId);

  if (!parcel || !parcel.currentLocation) {
    return res.status(404).json({ message: "No location data" });
  }

  res.json(parcel.currentLocation);
};
