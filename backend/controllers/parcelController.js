import Parcel from "../models/Parcel.js";
import User from "../models/User.js";

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
}
