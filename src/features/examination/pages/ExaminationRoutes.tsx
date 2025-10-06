import React from 'react';
import { Routes, Route } from 'react-router-dom';

const ExaminationDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Examination Dashboard</h1>
    <p className="text-gray-600">Examination management functionality will be implemented here.</p>
  </div>
);

const ExaminationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ExaminationDashboard />} />
      <Route path="/dashboard" element={<ExaminationDashboard />} />
    </Routes>
  );
};

export default ExaminationRoutes;

