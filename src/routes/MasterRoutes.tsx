import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentTimetable from '../pages/HODModules/Academics/Timetable/CreateTimetable';
import AcademicCalendar from '../pages/MasterMOdule/AcademicCalendar';
const MasterRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/create/timetable" element={<DepartmentTimetable />} />
        <Route path="/academic/calendar" element={<AcademicCalendar />} />
    </Routes>
  );
};

export default MasterRoutes;