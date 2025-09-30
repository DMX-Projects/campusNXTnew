import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentTimetable from '../pages/HODModules/Academics/Timetable/CreateTimetable';
import AcademicCalendar from '../pages/MasterMOdule/AcademicCalendar';
import ConfigureFacultyLeave from '../pages/MasterMOdule/LeaveConfigure/ConfigureFacultyLeave';
import ConfigureStudentLeave from '../pages/MasterMOdule/LeaveConfigure/ConfigureStudentLeave';
import DataManagement from '../pages/PrincipalModules/Administration/DataManagement';
import FeeStructure from '../pages/MasterMOdule/LeaveConfigure/FeeStructure';
const MasterRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/create/timetable" element={<DepartmentTimetable />} />
        <Route path="/academic/calendar" element={<AcademicCalendar />} />
        <Route path="/faculty/leave-configure" element={<ConfigureFacultyLeave />} />
        <Route path="/student/leave-configure" element={<ConfigureStudentLeave />} />
      <Route path="/home/data-management" element={<DataManagement />} />
      <Route path="/scholarship-registration" element={<FeeStructure />} />
    </Routes>
  );
};

export default MasterRoutes;