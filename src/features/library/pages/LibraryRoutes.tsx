import React from 'react';
import { Routes, Route } from 'react-router-dom';

const LibraryDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Library Dashboard</h1>
    <p className="text-gray-600">Library management functionality will be implemented here.</p>
  </div>
);

const LibraryRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LibraryDashboard />} />
      <Route path="/dashboard" element={<LibraryDashboard />} />
    </Routes>
  );
};

export default LibraryRoutes;

