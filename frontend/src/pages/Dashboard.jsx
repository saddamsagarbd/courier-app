import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hi, {user?.name || 'User'}</span>
                <button
                    onClick={logout}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100 transition-colors"
                >
                Logout
                </button>
            </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stats Cards */}
                <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Total Projects</p>
                <p className="text-2xl font-bold mt-1">12</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-2xl font-bold mt-1">8</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-600">Pending</p>
                <p className="text-2xl font-bold mt-1">4</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <ul className="space-y-2">
                {['Updated project X', 'Completed task Y', 'Received new message'].map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 border-b pb-2 last:border-0">
                    {item}
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </main>
        </div>
    );
};

export default Dashboard;