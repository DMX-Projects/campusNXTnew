import React from 'react';
import { Routes, Route } from 'react-router-dom';

const HostelDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Hostel Dashboard</h1>
    <p className="text-gray-600">Hostel management functionality will be implemented here.</p>
  </div>
);

const HostelRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HostelDashboard />} />
      <Route path="/dashboard" element={<HostelDashboard />} />
    </Routes>
  );
};

export default HostelRoutes;

