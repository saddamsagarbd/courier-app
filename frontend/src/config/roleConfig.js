export const ROLE_CONFIG = {
  admin: {
    dashboardTitle: "Admin Dashboard",
    stats: [
      { label: "Total Parcels", key: "totalParcels", color: "blue" },
      { label: "Active Agents", key: "activeAgents", color: "green" },
      { label: "Pending COD", key: "pendingCOD", color: "purple" },
    ],
    quickActions: [
      { name: "Manage Parcels", path: "/admin/parcels" },
      { name: "Manage Agents", path: "/admin/agents" },
      { name: "Reports", path: "/admin/reports" },
    ],
    recentActivities: [
      "New parcel assigned to Agent #123",
      "COD payment received for order #456",
      "New delivery agent registered",
    ],
  },
  agent: {
    dashboardTitle: "Delivery Agent Dashboard",
    stats: [
      { label: "Assigned Parcels", key: "assignedParcels", color: "blue" },
      { label: "Delivered Today", key: "deliveredToday", color: "green" },
      { label: "Pending", key: "pendingDeliveries", color: "yellow" },
    ],
    quickActions: [
      { name: "My Deliveries", path: "/agent/deliveries" },
      { name: "Delivery Map", path: "/agent/map" },
      { name: "Availability", path: "/agent/availability" },
    ],
    recentActivities: [
      "Picked up parcel #789 from customer",
      "Delivered parcel #101 to destination",
      "New parcel assigned to you",
    ],
  },
  customer: {
    dashboardTitle: "My Dashboard",
    stats: [
      { label: "Total Bookings", key: "totalBookings", color: "blue" },
      { label: "Delivered", key: "deliveredParcels", color: "green" },
      { label: "In Transit", key: "inTransitParcels", color: "yellow" },
    ],
    quickActions: [
      { name: "Book Parcel", path: "/book-parcel" },
      { name: "My Parcels", path: "/my-parcels" },
      { name: "Track Parcel", path: "/tracking" },
      { name: "Payment History", path: "/payments" },
    ],
    recentActivities: [
      "Parcel #789 picked up by agent",
      "Parcel #101 delivered successfully",
      "New parcel booking confirmed",
    ],
  },
};

// Mock data for demonstration
export const MOCK_DATA = {
  admin: {
    totalParcels: 42,
    activeAgents: 8,
    pendingCOD: "₹12,450",
  },
  agent: {
    assignedParcels: 5,
    deliveredToday: 3,
    pendingDeliveries: 2,
  },
  customer: {
    totalBookings: 7,
    deliveredParcels: 5,
    inTransitParcels: 2,
  },
};
