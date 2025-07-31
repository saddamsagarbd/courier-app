// App.js or main route file
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ParcelBooking from "./components/ParcelBooking";
import MyBookings from "./pages/MyBookings";
import ManageParcels from "./pages/ManageParcels";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/parcels" element={<ManageParcels />} />
            <Route path="/book-parcel" element={<ParcelBooking />} />
            <Route path="/my-parcels" element={<MyBookings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
