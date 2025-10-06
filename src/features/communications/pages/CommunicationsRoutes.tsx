import React from 'react';
import { Routes, Route } from 'react-router-dom';

const CommunicationsDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Communications Dashboard</h1>
    <p className="text-gray-600">Communications management functionality will be implemented here.</p>
  </div>
);

const CommunicationsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CommunicationsDashboard />} />
      <Route path="/dashboard" element={<CommunicationsDashboard />} />
    </Routes>
  );
};

export default CommunicationsRoutes;

