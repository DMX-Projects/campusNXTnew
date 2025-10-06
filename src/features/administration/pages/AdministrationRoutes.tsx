import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AdministrationDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Administration Dashboard</h1>
    <p className="text-gray-600">Administration management functionality will be implemented here.</p>
  </div>
);

const AdministrationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdministrationDashboard />} />
      <Route path="/dashboard" element={<AdministrationDashboard />} />
    </Routes>
  );
};

export default AdministrationRoutes;

