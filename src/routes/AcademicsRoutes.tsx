
import Course from '../pages/Academics/Courses/CoursesPage';
import FacultyLeaves from '../pages/Academics/Courses/FacultyLeaves';
import Inbox from '../pages/Academics/Courses/inbox';
import StudentAttendance from '../pages/Academics/Courses/Studentsattendence'
import { UsersPage } from '../pages/Academics/Users/UsersPage';
import { EditUserPage } from '../pages/Academics/Users/EditUserPage';
import { AddUserPage } from '../pages/Academics/Users/AddUserPage';
import { InstitutionsPage } from '../pages/Academics/Institutions/InstitutionsPage';
import { ProgramsPage } from '../pages/Academics/Programs/ProgramsPage';
import { RolesPage } from '../pages/Academics/Roles/RolesPage';
import Timetable from '../pages/Academics/timetable/TimeTable';
import StudentLeave from '../pages/Academics/StudentLeaves/StudentLeaves';
import AcademicCalender from '../pages/Academics/AcademicCalender/AcademicCalender';
import SubjectsAndSyllabus from '../pages/Academics/SubjectandSyllabus/SubjectSyllabus';
import StudentExamprepation from '../pages/Academics/StudentExamprepration/StudentExamprep';
import StudyMaterialPage from '../pages/Academics/StudyMaterial/StudyMaterial';
import StudentProject from '../pages/Academics/StudentProject/StudentProject';
import StudentAppruval from '../pages/Academics/StudentAppruval/StudentAppruval'

import React from 'react';
import { Routes, Route} from 'react-router-dom';

const AcademicsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Home Route */}

      <Route index element={<UsersPage />} />
      <Route path = 'users' element = {<UsersPage />} />
      <Route path = '/editUserPage' element = {<EditUserPage />} />
      <Route path = '/addUserPage' element = {<AddUserPage />} />
      <Route path = '/institutions' element = {<InstitutionsPage />} />
      <Route path = '/programs' element = {<ProgramsPage />} />
      <Route path = '/roles' element = {<RolesPage />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/faculty-leaves" element={<FacultyLeaves />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/student-attendance" element={<StudentAttendance />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="student-leaves" element={<StudentLeave />} />
      <Route path="academic-calendar" element={<AcademicCalender />} />
      <Route path="subjects-syllabus" element={<SubjectsAndSyllabus />} />
      <Route path="exam-preparation" element={<StudentExamprepation />} />
      <Route path="study-material" element={<StudyMaterialPage />} />
      <Route path="student-projects" element={<StudentProject />} />
      <Route path="student-approval" element={<StudentAppruval />} />


      {/* Users Routes
      <Route path="users" element={<Users />} />
      <Route path="users/add" element={<AddUser />} />
      <Route path="users/edit/:id" element={<EditUser />} />
      <Route path="users/profile/:id" element={<UserProfile />} />
      
      {/* Settings Routes */}
      {/* <Route path="settings" element={<Settings />} />
      <Route path="settings/general" element={<GeneralSettings />} />
      <Route path="settings/security" element={<SecuritySettings />} /> */}
      
      {/* Reports Routes */}
      {/* <Route path="reports" element={<Reports />} />
      <Route path="analytics" element={<Analytics />} /> */}
      
      {/* Catch all for invalid home routes */}
       {/* <Route path="*" element={<Navigate to="/home" replace />} />  */}
    </Routes>
  );
};

export default AcademicsRoutes;
