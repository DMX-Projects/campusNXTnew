import React from 'react';
import { Routes, Route } from 'react-router-dom';

const PlacementsDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Placements Dashboard</h1>
    <p className="text-gray-600">Placements management functionality will be implemented here.</p>
  </div>
);

const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PlacementsDashboard />} />
      <Route path="/dashboard" element={<PlacementsDashboard />} />
    </Routes>
  );
};

export default PlacementsRoutes;

