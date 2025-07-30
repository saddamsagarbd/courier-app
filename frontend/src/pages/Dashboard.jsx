// src/components/Dashboard.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLE_CONFIG, MOCK_DATA } from "../config/roleConfig";

const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

const QuickActions = ({ actions }) => (
  <div className="mb-6">
    <h3 className="text-md font-medium mb-3">Quick Actions</h3>
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <a
          key={action.path}
          href={action.path}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
        >
          {action.name}
        </a>
      ))}
    </div>
  </div>
);

const RecentActivities = ({ activities }) => (
  <div className="mt-8">
    <h3 className="font-medium mb-3">Recent Activity</h3>
    <ul className="space-y-2">
      {activities.map((activity, i) => (
        <li
          key={i}
          className="text-sm text-gray-600 border-b pb-2 last:border-0"
        >
          {activity}
        </li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  if (user === null) return <div>Loading...</div>;

  const role = user?.role || "customer";
  const config = ROLE_CONFIG[role];
  const data = MOCK_DATA[role];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {config.dashboardTitle}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.name} ({role})
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <QuickActions actions={config.quickActions} />

          <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.stats.map((stat) => (
              <StatCard
                key={stat.key}
                label={stat.label}
                value={data[stat.key]}
                color={stat.color}
              />
            ))}
          </div>

          <RecentActivities activities={config.recentActivities} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
