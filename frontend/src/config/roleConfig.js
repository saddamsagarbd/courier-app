export const ROLE_CONFIG = {
  admin: {
    dashboardTitle: "Admin Dashboard",
    stats: [
      { label: "Total Parcels", key: "totalParcels", color: "blue" },
      { label: "Active Agents", key: "activeAgents", color: "green" },
      { label: "Pending COD", key: "pendingCOD", color: "purple" },
    ],
    quickActions: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manage Parcels", path: "/parcels" },
      { name: "Manage Agents", path: "/agents" },
      { name: "Reports", path: "/reports" },
    ],
    recentActivities: [],
  },
  agent: {
    dashboardTitle: "Delivery Agent Dashboard",
    stats: [{ label: "Assigned Percels", key: "totalAssigned", color: "blue" }],
    quickActions: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Assigned Parcels", path: "/assigned-parcels" },
      // { name: "Delivery Map", path: "/delivery-map" },
    ],
    recentActivities: [],
  },
  customer: {
    dashboardTitle: "My Dashboard",
    stats: [{ label: "Total Parcels", key: "totalParcels", color: "blue" }],
    quickActions: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Book Parcel", path: "/book-parcel" },
      { name: "My Parcels", path: "/my-parcels" },
      // { name: "Track Parcel", path: "/tracking" },
      // { name: "Payment History", path: "/payments" },
    ],
    recentActivities: [],
  },
};

// Mock data for demonstration
export const MOCK_DATA = {
  admin: {
    totalParcels: 42,
    activeAgents: 8,
    pendingCOD: "Tk. 12,450",
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
