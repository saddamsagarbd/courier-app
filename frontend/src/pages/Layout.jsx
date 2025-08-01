import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLE_CONFIG } from "../config/roleConfig";
import { Outlet } from "react-router-dom";

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

export default function Layout() {
  const { user, logout } = useContext(AuthContext);

  const role = user?.role || "customer";
  const config = ROLE_CONFIG[role];
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}
