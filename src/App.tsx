import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ModuleDashboard from './components/ModuleDashboard';
import PlaceholderPage from './components/PlaceholderPage';
import { NavigationProvider } from './contexts/NavigationContext';
import { useNavigate, useLocation } from 'react-router-dom';
// Import all route components
import HomeRoutes from './routes/HomeRoutes';
import PlacementRoutes from './routes/PlacementsRoute';
import LmsRoute from './routes/LmsRoute';
import LibraryRoutes from './routes/LibraryRoutes';
import HostelRoutes from './routes/HostelRoutes';
import CommunicationRoutes from './routes/CommunicationRoutes';
import AcademicsRoutes from './routes/AcademicsRoutes';
import TransportRoutes from './routes/TransportRoutes';
import AdministrationRoutes from './routes/AdministrationRoutes';
import ExaminationRoutes from './routes/ExaminationRoutes';
import ParentRoutes from './routes/ParentRoutes';
// import ParentRoutes from './routes/ParentRoutes'; // Uncomment when available

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user,loading  } = useAuth();
  if (loading) return <div>Loading...</div>; 

  const getRedirectPath = (userRole: string) => {
    if (userRole === 'Chairperson' || userRole === 'College Secretary') {
      return '/home';
    }
    if (userRole === 'Student') {
    return '/academics/dashboard';
  }
  if (userRole === 'Faculty') {
    return '/academics/dashboard';
  }
  if (userRole === 'warden') {
    return '/hostel/dashboard';
  }
    return '/academics';
  };

  return (
    <Routes>
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
        
        {/* Home Module Routes */}
        <Route path="/home/*" element={<HomeRoutes />} />
        
        {/* Academics Module Routes */}
        <Route path="/academics/dashboard" element={<ModuleDashboard module="Academics" />} />
        <Route path="/academics/*" element={<AcademicsRoutes />} />
        
        {/* Administration Module Routes */}
        <Route path="/administration/dashboard" element={<ModuleDashboard module="Administration" />} />
        <Route path="/administration/*" element={<AdministrationRoutes />} />
        
        {/* Examination Module Routes */}
        <Route path="/examination/dashboard" element={<ModuleDashboard module="Examination" />} />
        <Route path="/examination/*" element={<ExaminationRoutes />} />
        
        {/* Placement Module Routes */}
        <Route path="/placements/dashboard" element={<ModuleDashboard module="Placements" />} />
        <Route path="/placements/*" element={<PlacementRoutes />} />
        
        {/* LMS Module Routes */}
        <Route path="/lms/dashboard" element={<ModuleDashboard module="LMS" />} />
        <Route path="/lms/*" element={<LmsRoute />} />
        
        {/* Library Module Routes */}
        <Route path="/library/dashboard" element={<ModuleDashboard module="Library" />} />
        <Route path="/library/*" element={<LibraryRoutes />} />
        
        {/* Transport Module Routes */}
        <Route path="/transport/dashboard" element={<ModuleDashboard module="Transport" />} />
        <Route path="/transport/*" element={<TransportRoutes />} />
        
        {/* Hostel Module Routes */}
        <Route path="/hostel/dashboard" element={<ModuleDashboard module="Hostel" />} />
        <Route path="/hostel/*" element={<HostelRoutes />} />
        
        {/* Parent Module Routes */}
        <Route path="/parent/dashboard" element={<ModuleDashboard module="Parent" />} />
        {/* <Route path="/parent/*" element={<ParentRoutes />} /> */}
        <Route path="/parent/*" element={<ParentRoutes />} />
        
        {/* Communications Module Routes */}
        <Route path="/communications/dashboard" element={<ModuleDashboard module="Communications" />} />
        <Route path="/communications/*" element={<CommunicationRoutes />} />
      </Route>
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