// src/components/ProtectedRoute.js
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <div>Loading...</div>; // Or a spinner
    }

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;