import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../../contexts/NavigationContext';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <NavigationProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarCollapsed ? 'w-12' : 'w-64'} transition-all duration-300 ease-in-out flex-shrink-0 hidden lg:block`}>
          <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className={`lg:hidden fixed inset-0 z-50 ${isSidebarCollapsed ? 'pointer-events-none' : ''}`}>
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ${
              isSidebarCollapsed ? 'opacity-0' : 'opacity-50'
            }`} 
            onClick={toggleSidebar}
          ></div>
          <div className={`relative flex flex-col w-64 transform transition-transform duration-300 ease-in-out ${
            isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
          }`}>
            <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
};

export default Layout;