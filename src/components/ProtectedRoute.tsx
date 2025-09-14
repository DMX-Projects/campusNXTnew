import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const getRedirectPath = (role: string): string => {
  switch (role?.toLowerCase()) {
    case "student":
      return "/academics/student-dashboard";
    case "faculty":
      return "/academics/faculty-dashboard";
    case "admin":
      return "/administration/admin-dashboard";
    case "hostel":
      return "/hostel/student-dashboard";
    default:
      return "/"; 
  }
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const userRole = user?.role || "";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={getRedirectPath(userRole)} replace />;
  }

  // ✅ User is allowed → render the page
  return <>{children}</>;
};

export default ProtectedRoute;
