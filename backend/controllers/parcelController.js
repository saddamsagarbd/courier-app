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
};

export const bookedParcels = async (req, res) => {
  try {
    // const parcels = await Parcel.find({ status: "pending" });
    const {status} = req.query;

    const parcels = status
      ? await Parcel.find({ status })
      : await Parcel.find();
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch parcels" });
  }
};
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch parcels" });
  }
};

export const assignAgent = async (req, res) => {
  const { id } = req.params;
  const { agentId } = req.body;

  try {
    const parcel = await Parcel.findById(id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    console.log(parcel);

    parcel.assignedAgent = agentId;
    parcel.status = "assigned";
    await parcel.save();

    res.status(200).json({ message: "Agent assigned successfully", parcel });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign agent", error: err });
  }
};
