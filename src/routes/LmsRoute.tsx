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
import ApprovalStudent from '../StudentModules/LMS/ApprovalStudent';
import AttendanceStudent from '../StudentModules/LMS/AttendanceStudent';
import ChatWithMentorStudent from '../StudentModules/LMS/ChatWithMentorStudent';
import CodeCompilerStudent from '../StudentModules/LMS/CodeCompilerStudent';
import HallTicketStudent from '../StudentModules/LMS/HallTicketStudent';
import NoticeboardStudent from '../StudentModules/LMS/NoticeboardStudent';
import OnlineTestStudent from '../StudentModules/LMS/OnlineTestStudent';
import ProjectsStudent from '../StudentModules/LMS/ProjectsStudent';
import ResultsStudent from '../StudentModules/LMS/ResultsStudent';
import SemesterPrepStudent from '../StudentModules/LMS/SemesterPrepStudent';
import StudyMaterialStudent from '../StudentModules/LMS/StudyMaterialStudent';
import TimetableStudent from '../StudentModules/LMS/TimetableStudent';
import MailLMSStudent from '../StudentModules/LMS/MailLMSStudent';
{/* Faculty LMS Dashboard */}
import FacultyMail from '../FacultyModules/LMS/Mail';
import FacultySemesterprep from '../FacultyModules/LMS/Semesterprep';
import FacultyStudyMaterial from '../FacultyModules/LMS/StudyMaterial';
import FacultyProjects from '../FacultyModules/LMS/Projects';
import FacultyPlacementCorner from '../FacultyModules/LMS/PlacementCorner';
import FacultyOnlineTest from '../FacultyModules/LMS/OnlineTest';
import FacultyTimetable from '../FacultyModules/LMS/Timetable';
import FacultyAttendance from '../FacultyModules/LMS/Attendance';
import FacultyResults from '../FacultyModules/LMS/ResultsLMS';
import FacultyChatWithMentor from '../FacultyModules/LMS/ChatWithMentor';
import FacultyApprovalLMS from '../FacultyModules/LMS/ApprovalLMS';
import FacultyLibraryLMS from '../FacultyModules/LMS/LibraryLMS';
import FacultyCampusCalendarLMS from '../FacultyModules/LMS/CampusCalendarLMS';
import FacultyCollegeContactLMS from '../FacultyModules/LMS/CollegeContactLMS';
import FacultyAlumniLMS from '../FacultyModules/LMS/AlumniLMS';
import FacultyFeePaymentLMS from '../FacultyModules/LMS/FeePaymentLMS';
import FacultyHallTicketComponent from '../FacultyModules/LMS/HallTicket';
import FacultyNoticeBoardLMS from '../FacultyModules/LMS/NoticeboardLMS';
import FacultyCollegeWallLMS from '..//FacultyModules/LMS/CollegewallLMS'
import FacultyRaiseTicketLMS from '../FacultyModules/LMS/RaiseTicketLMS'
const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default LMS Dashboard */}
      <Route index element={<Mail />} />

      {/* LMS Routes */}
      <Route path="mail" element={<Mail />} />
      <Route path="folder" element={<Folder />} />
      <Route path="semester-prep" element={<Semesterprep />} />
      <Route path="study-material" element={<StudyMaterial />} />
      <Route path="projects" element={<Projects />} />
      <Route path="placement-corner" element={<PlacementCorner />} />
      <Route path="online-test" element={<OnlineTest />} />
      <Route path="time-table" element={<Timetable />} />
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

      {/*Student LMS Routes */}
      <Route path="student/approval" element={<ApprovalStudent />} />
      <Route path="student/attendance" element={<AttendanceStudent />} />
      <Route path="student/chat-mentor" element={<ChatWithMentorStudent />} />
      <Route path="student/code-compiler" element={<CodeCompilerStudent />} />
      <Route path="student/hall-ticket" element={<HallTicketStudent />} />
      <Route path="student/notice-board" element={<NoticeboardStudent />} />
      <Route path="student/online-test" element={<OnlineTestStudent />} />
      <Route path="student/projects" element={<ProjectsStudent />} />
      <Route path="student/results" element={<ResultsStudent />} />
      <Route path="student/semester-prep" element={<SemesterPrepStudent />} />
      <Route path="student/study-material" element={<StudyMaterialStudent />} />
      <Route path="student/time-table" element={<TimetableStudent />} />
      <Route path="student/mail" element={<MailLMSStudent />} />

      {/*Faculty LMS Routes */}
      <Route path="Faculty/mail" element={<FacultyMail />} />
      <Route path="Faculty/semester-prep" element={<FacultySemesterprep />} />
      <Route path="Faculty/study-material" element={<FacultyStudyMaterial />} />
      <Route path="Faculty/projects" element={<FacultyProjects />} />
      <Route path="Faculty/placement-corner" element={<FacultyPlacementCorner />} />
      <Route path="Faculty/online-test" element={<FacultyOnlineTest />} />
      <Route path="Faculty/time-table" element={<FacultyTimetable />} />
      <Route path="Faculty/attendance" element={<FacultyAttendance />} />
      <Route path="Faculty/results" element={<FacultyResults />} />
      <Route path="Faculty/chat-mentor" element={<FacultyChatWithMentor />} />
      <Route path="Faculty/approval" element={<FacultyApprovalLMS />} />
      <Route path="Faculty/library" element={<FacultyLibraryLMS />} />
      <Route path="Faculty/campus-calendar" element={<FacultyCampusCalendarLMS />} />
      <Route path="Faculty/alumni" element={<FacultyAlumniLMS />} />
      <Route path="Faculty/college-contact" element={<FacultyCollegeContactLMS />} />
      <Route path="Faculty/fee-payment" element={<FacultyFeePaymentLMS />} />
      <Route path="Faculty/hall-ticket" element={<FacultyHallTicketComponent />} />
      <Route path="Faculty/notice-board" element={<FacultyNoticeBoardLMS />} />
      <Route path="Faculty/college-wall" element={<FacultyCollegeWallLMS />} />
      <Route path="Faculty/raise-ticket" element={<FacultyRaiseTicketLMS />} />

    </Routes>
  );
};

export default PlacementsRoutes;
