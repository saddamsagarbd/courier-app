import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLE_CONFIG } from "../config/roleConfig";
import axios from "axios";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const role = user?.role || "customer";
  const config = ROLE_CONFIG[role];

  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const fetchDashboardStats = async () => {
    try {
      const url =
        role === "admin"
          ? `${process.env.REACT_APP_API_BASE_URL}/admin/dashboard`
          : role === "admin"
          ? `${process.env.REACT_APP_API_BASE_URL}/dashboard`
          : `${process.env.REACT_APP_API_BASE_URL}/agent/dashboard`;
      const { data } = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatsData(data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🏠 Dashboard loaded");
    fetchDashboardStats();
  }, []);

  return (
    <>
      <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          config.stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={stat.label}
              value={statsData ? statsData[stat.key] : 0}
              color={stat.color}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;
