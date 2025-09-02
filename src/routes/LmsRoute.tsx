import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import placement components
import Mail from '../pages/LMS/Mail';
import Folder from '../pages/LMS/Folder';
import Semesterprep from '../pages/LMS/Semesterprep';
import StudyMaterial from '../pages/LMS/StudyMaterial';
import Projects from '../pages/LMS/Projects';
import PlacementCorner from '../pages/LMS/PlacementCorner';
import OnlineTest from '../pages/LMS/OnlineTest';
import Timetable from '../pages/LMS/Timetable';
import Attendance from '../pages/LMS/Attendance';
import Results from '../pages/LMS/ResultsLMS';
import ChatWithMentor from '../pages/LMS/ChatWithMentor';
import ApprovalLMS from '../pages/LMS/ApprovalLMS';
import LibraryLMS from '../pages/LMS/LibraryLMS';
import CampusCalendarLMS from '../pages/LMS/CampusCalendarLMS';
import CollegeContactLMS from '../pages/LMS/CollegeContactLMS';
import AlumniLMS from '../pages/LMS/AlumniLMS';
import FeePaymentLMS from '../pages/LMS/FeePaymentLMS';
import HallTicketComponent from '../pages/LMS/HallTicket';
import NoticeBoardLMS from '../pages/LMS/NoticeboardLMS';
import CollegeWallLMS from '../pages/LMS/CollegewallLMS'
import RaiseTicketLMS from '../pages/LMS/RaiseTicketLMS'
const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Placements Dashboard */}
      <Route index element={<Mail />} />

      {/* Placements Routes */}
      <Route path="mail" element={<Mail />} />
      <Route path="folder" element={<Folder />} />
      <Route path="semester-prep" element={<Semesterprep />} />
      <Route path="study-material" element={<StudyMaterial />} />
      <Route path="projects" element={<Projects />} />
      <Route path="placement-corner" element={<PlacementCorner />} />
      <Route path="online-test" element={<OnlineTest />} />
      <Route path="time-table" element={<Timetable />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="results" element={<Results />} />
      <Route path="chat-mentor" element={<ChatWithMentor />} />
      <Route path="approval" element={<ApprovalLMS />} />
      <Route path="library" element={<LibraryLMS />} />
      <Route path="campus-calendar" element={<CampusCalendarLMS />} />
      <Route path="alumni" element={<AlumniLMS />} />
      <Route path="college-contact" element={<CollegeContactLMS />} />
      <Route path="fee-payment" element={<FeePaymentLMS />} />
      <Route path="hall-ticket" element={<HallTicketComponent />} />
      <Route path="notice-board" element={<NoticeBoardLMS />} />
      <Route path="college-wall" element={<CollegeWallLMS />} />
      <Route path="raise-ticket" element={<RaiseTicketLMS />} />

    </Routes>
  );
};

export default PlacementsRoutes;
