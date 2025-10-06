import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthLegacy as useAuth } from '../hooks/useAuthLegacy';
import { FullPageLoader } from '../components/shared/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  fallbackPath = '/login',
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <FullPageLoader text="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // For now, skip permission-based access check as legacy context doesn't have it
  // This can be enhanced later when migrating to the new auth system

  return <>{children}</>;
};

export default ProtectedRoute;

