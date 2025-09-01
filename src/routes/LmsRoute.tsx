import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import placement components
import LMSDashboard from '../pages/LMS/Dashboard';
import CourseManagement from './../pages/LMS/CourseManagement';
import StudentManagement from './../pages/LMS/StudentManagement';
import FacultyManagement from './../pages/LMS/FacultyManagement';
import AcademicCalendar from './../pages/LMS/AcademicCalendar';
import AssignmentManagement from './../pages/LMS/AssignmentManagement';
import AttendanceManagement from './../pages/LMS/AttendanceManagement';
import GradeManagement from './../pages/LMS/GradeManagement';
import LibraryManagement from './../pages/LMS/LibraryManagement';
import Mail from '../pages/LMS/Mail';


const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Placements Dashboard */}
      <Route index element={<LMSDashboard />} />

      {/* Placements Routes */}
      <Route path="dashboard" element={<LMSDashboard />} />
       <Route path="courses" element={<CourseManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="faculty" element={<FacultyManagement />} />
              <Route path="calendar" element={<AcademicCalendar />} />
              <Route path="assignments" element={<AssignmentManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="grades" element={<GradeManagement />} />
              <Route path="library" element={<LibraryManagement />} />
              <Route path="mail" element={<Mail />} />
              

    </Routes>
  );
};

export default PlacementsRoutes;
