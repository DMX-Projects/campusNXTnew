import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { UnprotectedRoute } from './UnprotectedRoute';
import { FullPageLoader } from '../components/shared/Loader';
import Layout from '../components/Layout/Layout';

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import('../components/Login'));

// Import existing route files
const AcademicsRoutes = React.lazy(() => import('./AcademicsRoutes'));
const ExaminationRoutes = React.lazy(() => import('./ExaminationRoutes'));
const PlacementsRoutes = React.lazy(() => import('./PlacementsRoute'));
const LibraryRoutes = React.lazy(() => import('./LibraryRoutes'));
const HostelRoutes = React.lazy(() => import('./HostelRoutes'));
const TransportRoutes = React.lazy(() => import('./TransportRoutes'));
const AdministrationRoutes = React.lazy(() => import('./AdministrationRoutes'));
const LmsRoute = React.lazy(() => import('./LmsRoute'));
const CommunicationRoutes = React.lazy(() => import('./CommunicationRoutes'));
const MasterRoutes = React.lazy(() => import('./MasterRoutes'));
const ManagementRoutes = React.lazy(() => import('./ManagementRoutes'));
const ParentRoutes = React.lazy(() => import('./ParentRoutes'));
const HomeRoutes = React.lazy(() => import('./HomeRoutes'));
const CommonRoutes = React.lazy(() => import('./CommonRoutes'));

// Loading component for Suspense fallback
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <FullPageLoader text="Loading page..." />
  </div>
);

export const RouteConfig: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          }
        />

        {/* Protected Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Navigate to="/home/dashboard" replace />
              </ProtectedRoute>
            }
          />

          {/* Feature Routes */}
          <Route
            path="home/*"
            element={
              <ProtectedRoute>
                <HomeRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="academics/*"
            element={
              <ProtectedRoute>
                <AcademicsRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="examination/*"
            element={
              <ProtectedRoute>
                <ExaminationRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="placements/*"
            element={
              <ProtectedRoute>
                <PlacementsRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="library/*"
            element={
              <ProtectedRoute>
                <LibraryRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="hostel/*"
            element={
              <ProtectedRoute>
                <HostelRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="transport/*"
            element={
              <ProtectedRoute>
                <TransportRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="administration/*"
            element={
              <ProtectedRoute>
                <AdministrationRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="lms/*"
            element={
              <ProtectedRoute>
                <LmsRoute />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="communications/*"
            element={
              <ProtectedRoute>
                <CommunicationRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="master/*"
            element={
              <ProtectedRoute>
                <MasterRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="management/*"
            element={
              <ProtectedRoute>
                <ManagementRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="parent/*"
            element={
              <ProtectedRoute>
                <ParentRoutes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="common/*"
            element={
              <ProtectedRoute>
                <CommonRoutes />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Error Routes */}
        <Route path="*" element={<Navigate to="/home/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
