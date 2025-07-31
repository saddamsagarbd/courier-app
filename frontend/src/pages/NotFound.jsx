import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/dashboard"
        style={{ color: "#007bff", textDecoration: "underline" }}
      >
        Go back to Dashboard
      </Link>
    </div>
  );
}
