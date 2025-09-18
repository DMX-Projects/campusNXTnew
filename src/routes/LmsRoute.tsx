import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import placement components
import Mail from '../pages/ChairpersonModule/LMS/Mail';
import Folder from '../pages/ChairpersonModule/LMS/Folder';
import Semesterprep from '../pages/ChairpersonModule/LMS/Semesterprep';
import StudyMaterial from '../pages/ChairpersonModule/LMS/StudyMaterial';
import Projects from '../pages/ChairpersonModule/LMS/Projects';
import PlacementCorner from '../pages/ChairpersonModule/LMS/PlacementCorner';
import OnlineTest from '../pages/ChairpersonModule/LMS/OnlineTest';
import Timetable from '../pages/ChairpersonModule/LMS/Timetable';
import Results from '../pages/ChairpersonModule/LMS/ResultsLMS';
import ChatWithMentor from '../pages/ChairpersonModule/LMS/ChatWithMentor';
import ApprovalLMS from '../pages/ChairpersonModule/LMS/ApprovalLMS';
import LibraryLMS from '../pages/ChairpersonModule/LMS/LibraryLMS';
import CampusCalendarLMS from '../pages/ChairpersonModule/LMS/CampusCalendarLMS';
import CollegeContactLMS from '../pages/ChairpersonModule/LMS/CollegeContactLMS';
import AlumniLMS from '../pages/ChairpersonModule/LMS/AlumniLMS';
import FeePaymentLMS from '../pages/ChairpersonModule/LMS/FeePaymentLMS';
import HallTicketComponent from '../pages/ChairpersonModule/LMS/HallTicket';
import NoticeBoardLMS from '../pages/ChairpersonModule/LMS/NoticeboardLMS';
import CollegeWallLMS from '../pages/ChairpersonModule/LMS/CollegewallLMS'
import RaiseTicketLMS from '../pages/ChairpersonModule/LMS/RaiseTicketLMS'
import ApprovalStudent from '../pages/StudentModules/LMS/ApprovalStudent';
import AttendanceStudent from '../pages/StudentModules/LMS/AttendanceStudent';
import ChatWithMentorStudent from '../pages/StudentModules/LMS/ChatWithMentorStudent';
import CodeCompilerStudent from '../pages/StudentModules/LMS/CodeCompilerStudent';
import HallTicketStudent from '../pages/StudentModules/LMS/HallTicketStudent';
import NoticeboardStudent from '../pages/StudentModules/LMS/NoticeboardStudent';
import OnlineTestStudent from '../pages/StudentModules/LMS/OnlineTestStudent';
import ProjectsStudent from '../pages/StudentModules/LMS/ProjectsStudent';
import ResultsStudent from '../pages/StudentModules/LMS/ResultsStudent';
import SemesterPrepStudent from '../pages/StudentModules/LMS/SemesterPrepStudent';
import StudyMaterialStudent from '../pages/StudentModules/LMS/StudyMaterialStudent';
import TimetableStudent from '../pages/StudentModules/LMS/TimetableStudent';
import MailLMSStudent from '../pages/StudentModules/LMS/MailLMSStudent';
{/* Faculty LMS Dashboard */}
import FacultyMail from '../pages/FacultyModules/LMS/Mail';
import FacultySemesterprep from '../pages/FacultyModules/LMS/Semesterprep';
import FacultyStudyMaterial from '../pages/FacultyModules/LMS/StudyMaterial';
import FacultyProjects from '../pages/FacultyModules/LMS/Projects';
import FacultyPlacementCorner from '../pages/FacultyModules/LMS/PlacementCorner';
import FacultyOnlineTest from '../pages/FacultyModules/LMS/OnlineTest';
import FacultyTimetable from '../pages/FacultyModules/LMS/Timetable';
import FacultyAttendance from '../pages/FacultyModules/LMS/Attendance';
import FacultyResults from '../pages/FacultyModules/LMS/ResultsLMS';
import FacultyChatWithMentor from '../pages/FacultyModules/LMS/ChatWithMentor';
import FacultyApprovalLMS from '../pages/FacultyModules/LMS/ApprovalLMS';
import FacultyLibraryLMS from '../pages/FacultyModules/LMS/LibraryLMS';
import FacultyCampusCalendarLMS from '../pages/FacultyModules/LMS/CampusCalendarLMS';
import FacultyCollegeContactLMS from '../pages/FacultyModules/LMS/CollegeContactLMS';
import FacultyAlumniLMS from '../pages/FacultyModules/LMS/AlumniLMS';
import FacultyFeePaymentLMS from '../pages/FacultyModules/LMS/FeePaymentLMS';
import FacultyHallTicketComponent from '../pages/FacultyModules/LMS/HallTicket';
import FacultyNoticeBoardLMS from '../pages/FacultyModules/LMS/NoticeboardLMS';
import FacultyCollegeWallLMS from '../pages/FacultyModules/LMS/CollegewallLMS'
import FacultyRaiseTicketLMS from '../pages/FacultyModules/LMS/RaiseTicketLMS'
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
