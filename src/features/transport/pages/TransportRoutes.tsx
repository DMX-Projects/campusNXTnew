import React from 'react';
import { Routes, Route } from 'react-router-dom';

const TransportDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Transport Dashboard</h1>
    <p className="text-gray-600">Transport management functionality will be implemented here.</p>
  </div>
);

const TransportRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TransportDashboard />} />
      <Route path="/dashboard" element={<TransportDashboard />} />
    </Routes>
  );
};

export default TransportRoutes;

