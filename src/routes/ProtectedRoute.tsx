import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

interface ProtectedRouteProps {
    children: React.ReactNode;
    provider: 'gmail' | 'outlook';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, provider }) => {
    const location = useLocation();
    
    const authenticated = isAuthenticated(provider);

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
