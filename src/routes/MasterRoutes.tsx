import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentTimetable from '../pages/HODModules/Academics/Timetable/CreateTimetable';
import AcademicCalendar from '../pages/MasterMOdule/AcademicCalendar';
import ConfigureFacultyLeave from '../pages/MasterMOdule/LeaveConfigure/ConfigureFacultyLeave';
import ConfigureStudentLeave from '../pages/MasterMOdule/LeaveConfigure/ConfigureStudentLeave';
const MasterRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/create/timetable" element={<DepartmentTimetable />} />
        <Route path="/academic/calendar" element={<AcademicCalendar />} />
        <Route path="/faculty/leave-configure" element={<ConfigureFacultyLeave />} />
        <Route path="/student/leave-configure" element={<ConfigureStudentLeave />} />

    </Routes>
  );
};

export default MasterRoutes;