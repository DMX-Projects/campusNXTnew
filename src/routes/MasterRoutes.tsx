import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentTimetable from '../pages/HODModules/Academics/Timetable/CreateTimetable';
import AcademicCalendar from '../pages/MasterMOdule/AcademicCalendar';
import DataManagement from '../pages/PrincipalModules/Administration/DataManagement';
const MasterRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/create/timetable" element={<DepartmentTimetable />} />
        <Route path="/academic/calendar" element={<AcademicCalendar />} />
      <Route path="/home/data-management" element={<DataManagement />} />

    </Routes>
  );
};

export default MasterRoutes;