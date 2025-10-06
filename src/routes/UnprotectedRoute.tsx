import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthLegacy as useAuth } from '../hooks/useAuthLegacy';
import { FullPageLoader } from '../components/shared/Loader';

interface UnprotectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  children,
  redirectTo = '/dashboard',
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <FullPageLoader text="Loading..." />;
  }

  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default UnprotectedRoute;

