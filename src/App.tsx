import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAuth } from "./features/auth/hooks/useAuth";
import { useAppDispatch } from "./store/hooks";
import { loadUserFromStorage } from "./store/slices/authSlice";
import Layout from "./layouts/Layout";
import Login from "./features/auth/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { getRedirectPath } from "./utils/auth";

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

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load user from localStorage on app start
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
      
      {/* Root path redirect */}
      <Route
        path="/"
        element={
          isAuthenticated && user ? (
            <Navigate to={getRedirectPath(user.role)} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected routes */}
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
    <Provider store={store}>
      <Router>
        <AppInitializer>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <AppRoutes />
          </div>
        </AppInitializer>
      </Router>
    </Provider>
  );
}

export default App;
