import User from "../models/User.js";
import Parcel from "../models/Parcel.js";

export const dashBoardStates = async (req, res) => {
  try {
    const isUser = !!req.user?.id;
    const query = isUser ? { assignedAgent: req.user.id } : {};
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
    const [totalAssigned] = await Promise.all([Parcel.countDocuments(query)]);

    res.json({
      totalAssigned,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};
