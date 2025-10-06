import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AcademicsDashboard = React.lazy(() => import('./AcademicsDashboard'));
const Students = React.lazy(() => import('./Students'));
const Faculty = React.lazy(() => import('./Faculty'));
const Courses = React.lazy(() => import('./Courses'));
const Timetable = React.lazy(() => import('./Timetable'));

const AcademicsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AcademicsDashboard />} />
      <Route path="/dashboard" element={<AcademicsDashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/timetable" element={<Timetable />} />
    </Routes>
  );
};

export default AcademicsRoutes;

