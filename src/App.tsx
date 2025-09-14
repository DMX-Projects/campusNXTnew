import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute, { getRedirectPath } from "./components/ProtectedRoute";
import ModuleDashboard from "./components/ModuleDashboard";
import { NavigationProvider } from "./contexts/NavigationContext";

// Import all module routes
import HomeRoutes from "./routes/HomeRoutes";
import PlacementRoutes from "./routes/PlacementsRoute";
import LmsRoute from "./routes/LmsRoute";
import LibraryRoutes from "./routes/LibraryRoutes";
import HostelRoutes from "./routes/HostelRoutes";
import CommunicationRoutes from "./routes/CommunicationRoutes";
import AcademicsRoutes from "./routes/AcademicsRoutes";
import TransportRoutes from "./routes/TransportRoutes";
import AdministrationRoutes from "./routes/AdministrationRoutes";
import ExaminationRoutes from "./routes/ExaminationRoutes";
import ParentRoutes from "./routes/ParentRoutes";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Root path: redirect if logged in */}
      <Route
        path="/"
        element={
          isAuthenticated && user ? (
            <Navigate to={getRedirectPath(user.role)} replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            user ? (
              <Navigate to={getRedirectPath(user.role)} replace />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* Module Routes */}
        <Route path="/home/*" element={<HomeRoutes />} />
        <Route path="/academics/*" element={<AcademicsRoutes />} />
        <Route path="/administration/*" element={<AdministrationRoutes />} />
        <Route path="/examination/*" element={<ExaminationRoutes />} />
        <Route path="/placements/*" element={<PlacementRoutes />} />
        <Route path="/lms/*" element={<LmsRoute />} />
        <Route path="/library/*" element={<LibraryRoutes />} />
        <Route path="/transport/*" element={<TransportRoutes />} />
        <Route path="/hostel/*" element={<HostelRoutes />} />
        <Route path="/parent/*" element={<ParentRoutes />} />
        <Route path="/communications/*" element={<CommunicationRoutes />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <NavigationProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <AppRoutes />
            </div>
          </NavigationProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
