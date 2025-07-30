import Parcel from "../models/Parcel.js";
import User from "../models/User.js";

export const createParcel = async (req, res) => {
    try {
        const {
            pickupAddress,
            deliveryAddress,
            parcelSize,
            parcelType,
            paymentType,
            codAmount
        } = req.body;

        const parcel = await Parcel.create({
            customer: req.user.id, // from auth middleware
            pickupAddress,
            deliveryAddress,
            parcelSize,
            parcelType,
            paymentType,
            codAmount: paymentType === "cod" ? codAmount : 0
        });

        res.status(201).json({
            status: true,
            message: "Parcel booking created successfully",
            parcel
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getBookingByUser = async (req, res) => {
    try {

        const query = { customer: req.user.id };

        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.status(404).json({ message: "User not found" });

        const projection = "pickupAddress deliveryAddress parcelSize parcelType status createdAt";

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
