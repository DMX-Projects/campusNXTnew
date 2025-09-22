import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Centralized role → path mapping
const getRedirectPath = (role: string): string => {
  const normalizedRole = role?.trim().toLowerCase();
  console.log("role in getRedirectPath:", normalizedRole);

  switch (normalizedRole) {
    case "student":
      return "/academics/studentdashboard";
    case "hod":
      return "/academics/dashboard";
      case "principal":
      return "/academics/principal-dashboard";
    case "faculty":
      return "/academics/faculty-dashboard";
    case "registor":
    case "administration officer":
      return "/management/Admission/dashboard";
    case "hostel":
    case "hostel incharge":
    case "warden":
      return "/hostel/dashboard";
    case "chairperson":
    case "college secretary":
      return "/home";
    default:
      return "/dashboard";
  }
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const userRole = user?.role || "";
  const normalized = userRole.trim().toLowerCase();

  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(normalized)) {
    return <Navigate to={getRedirectPath(userRole)} replace />;
  }

  return <>{children}</>;
};

export { getRedirectPath };
export default ProtectedRoute;
