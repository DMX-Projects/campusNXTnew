import React from 'react';
import { Routes, Route } from 'react-router-dom';

const LMSDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">LMS Dashboard</h1>
    <p className="text-gray-600">Learning Management System functionality will be implemented here.</p>
  </div>
);

const LMSRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LMSDashboard />} />
      <Route path="/dashboard" element={<LMSDashboard />} />
    </Routes>
  );
};

export default LMSRoutes;

