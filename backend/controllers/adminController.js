import User from "../models/User.js";
import Parcel from "../models/Parcel.js";

export const dashBoardStates = async (req, res) => {
  try {
    
    const isUser = !!req.user?.id;
    const query = isUser ? { userId: req.user.id } : {};
    const status = isUser
      ? [
          "pending",
          "assigned",
          "picked-up",
          "in-transit",
          "delivered",
          "failed",
        ]
      : ["pending", "in-transit"];
    const [totalParcels, activeAgents, pendingCOD] = await Promise.all([
      Parcel.countDocuments(query),
      User.countDocuments({ role: "agent", status: "active" }), // or your flag
      Parcel.aggregate([
        {
          $match: {
            paymentMethod: "cod",
            status: { $in: status },
          },
        },
        { $group: { _id: null, total: { $sum: "$codAmount" } } },
      ]),
    ]);

    res.json({
      totalParcels,
      activeAgents,
      pendingCOD: pendingCOD[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};
