import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthLegacy as useAuth } from '../../hooks/useAuthLegacy';
import { FullPageLoader } from '../shared/Loader';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (isLoading) {
    return <FullPageLoader text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;