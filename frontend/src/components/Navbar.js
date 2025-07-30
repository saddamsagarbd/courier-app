// src/components/Navbar.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // Common menu items for all roles
  const commonMenu = [
    { path: "/", label: "Home" },
    { path: "/profile", label: "Profile" },
  ];

  // Role-specific menu items
  const roleBasedMenu = {
    admin: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/users", label: "Manage Users" },
      { path: "/parcels", label: "All Parcels" },
      { path: "/reports", label: "Reports" },
    ],
    agent: [
      { path: "/assigned-parcels", label: "My Deliveries" },
      { path: "/map", label: "Delivery Map" },
    ],
    customer: [
      { path: "/book-parcel", label: "Book Parcel" },
      { path: "/my-parcels", label: "My Parcels" },
    ],
  };

  const currentMenu = [
    ...commonMenu,
    ...(user?.role ? roleBasedMenu[user.role] : []),
  ];

  return (
    <nav>
      <div className="logo">CourierSystem</div>
      <ul>
        {currentMenu.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
        {user && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
