import React from 'react';
import { Routes, Route } from 'react-router-dom';

const NotificationsDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications Dashboard</h1>
    <p className="text-gray-600">Notifications management functionality will be implemented here.</p>
  </div>
);

const NotificationsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NotificationsDashboard />} />
      <Route path="/dashboard" element={<NotificationsDashboard />} />
    </Routes>
  );
};

export default NotificationsRoutes;

