import Inbox from '../pages/Academics/Courses/inbox';
import StudentAttendance from '../pages/Academics/Courses/Studentsattendence'
import AttendanceManagement from '../components/Modules/AttendanceManagement'
import Timetable from '../pages/Academics/timetable/TimeTable';
import StudentLeave from '../pages/Academics/StudentLeaves/StudentLeaves';
import AcademicCalender from '../pages/Academics/AcademicCalender/AcademicCalender';
import SubjectsAndSyllabus from '../pages/Academics/SubjectandSyllabus/SubjectSyllabus';
import StudentExamprepation from '../pages/Academics/StudentExamprepration/StudentExamprep';
import StudyMaterialPage from '../pages/Academics/StudyMaterial/StudyMaterial';
import StudentProject from '../pages/Academics/StudentProject/StudentProject';
import StudentAppruval from '../pages/Academics/StudentAppruval/StudentAppruval';
// import AcademicDashboard from '../pages/Academics/AcademicDashboar/AcademicDashboard';
import AcademicFaculty from '../pages/Academics/AcademicFaculty/AcademicFaculty';
import OnlineTest from '../pages/Academics/OnlineTest/OnlineTest';
import CodingAssesment from '../pages/Academics/OnlineTest/codingAssesment'
import FacultyFeedback from '../pages/Academics/FacultyFeedback/FacultyFeedback';
import SyllabusTrackingDashboard from '../pages/Academics/SyllabusTracking/SyllabusTracking';
import ScheduleOnlineClass from '../pages/Academics/Scheduleonlineclass/Scheduleonlineclass';
import Reports from '../pages/Academics/Reports/Reports';
import RaiseTicket from '../pages/Academics/RiseTicket/RiseTicket'

import FacultyInbox from '../FacultyModules/FacultyAcademic/FacultyInbox';
import Announcement from '../FacultyModules/FacultyAcademic/Announcement';
import FacultyStudentAttendance from '../FacultyModules/FacultyAcademic/StudentAttendence';
import TimeTableFaculty from '../FacultyModules/FacultyAcademic/TimeTableFaculty';
import FacultyCalender from '../FacultyModules/FacultyAcademic/calenderFaculty';
import FacultySubjectsSyllabus from '../FacultyModules/FacultyAcademic/FacultySubjectsSyllabus';
import FacultyStudyMaterial from '../FacultyModules/FacultyAcademic/FacultyStudyMaterial';
import FacultyStudentProject from '../FacultyModules/FacultyAcademic/StudentProject';
import FacultyOnlineTest from '../FacultyModules/FacultyAcademic/FacultyOnlineTest';
import ScheduleOnlinclass from '../FacultyModules/FacultyAcademic/ScheduleOnlinclass';
import FacultyReports from '../FacultyModules/FacultyAcademic/FacultyReports';
import FacultyRiseTicket  from '../FacultyModules/FacultyAcademic/FacultyRiseticket'
// import FacultyDashboard from '../FacultyModules/Examination/Dashboard';


// student login 

import AcademicstudentDashboard from '../FacultyModules/FacultyAcademic/StudentDashboard'
import StudentfeeManagement from '../FacultyModules/FacultyAcademic/studentFeeManagement';
import StudentRecordsResults from '../FacultyModules/FacultyAcademic/StudentRecords&Results';
import StudentClassSchedule from '../FacultyModules/FacultyAcademic/StudentClassSchedule';
import StudentCourseAcademic from '../FacultyModules/FacultyAcademic/StudentCourse';
import StudentAssigment from '../FacultyModules/FacultyAcademic/StudentAssigment';
import StudentExam from '../FacultyModules/FacultyAcademic/StudentExam';
import StudentProfile from '../FacultyModules/FacultyAcademic/StudentProfile';
import StudentStudyMaterial from '../FacultyModules/FacultyAcademic/StudentStudyMaterial';

import React from 'react';
import { Routes, Route} from 'react-router-dom';

const AcademicsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Home Route */}
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
      {/* <Route path="academic-dashboard" element={<AcademicDashboard />} /> */}
      <Route path="faculty" element={<AcademicFaculty />} />
      <Route path="online-tests" element={<OnlineTest />} />
      <Route path="coding-assessment" element={<CodingAssesment />} />
      <Route path="faculty-feedback" element={<FacultyFeedback />} />
      <Route path="syllabus-tracking" element={<SyllabusTrackingDashboard />} />
      <Route path="schedule-online-class" element={<ScheduleOnlineClass />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/raise-ticket" element={<RaiseTicket />} />


      {/* Academic login Faculty Routes */}




      <Route path="/faculty-inbox" element={<FacultyInbox />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/faculty-studentattendance" element={<FacultyStudentAttendance />} />
      <Route path='/faculty-timetable' element ={<TimeTableFaculty />} />
      <Route path='/faculty-calendar' element ={<FacultyCalender />} />
      <Route path='/faculty-subjects-syllabus' element ={<FacultySubjectsSyllabus />} />
      <Route path='/faculty-StudyMaterial' element ={<FacultyStudyMaterial/>}/>
      <Route path='/faculty-studentprojects' element ={<FacultyStudentProject/>}/>
      <Route path='/faculty-FacultyOnlineTest' element ={<FacultyOnlineTest/>}/>
      <Route path='/faculty-schedule-onlineclass' element ={<ScheduleOnlinclass/>}/>
      <Route path='/faculty-FacultyReports' element ={<FacultyReports/>}/>
      <Route path='/faculty-raiseticket' element={<FacultyRiseTicket />} />







    {/* //student login */}


    <Route path="/student-dashboard" element={<AcademicstudentDashboard />} />
    <Route path="/student-feemanagement" element={<StudentfeeManagement />} />
    <Route path="/student-recordsresults" element={<StudentRecordsResults />} />
    <Route path="/student-classschedule" element={<StudentClassSchedule />} />
    <Route path="/student-courses" element={<StudentCourseAcademic />} />
    <Route path="/student-assignments" element={<StudentAssigment />} />
    <Route path="/student-exams" element={<StudentExam />} />
    <Route path="/student-profile" element={<StudentProfile />} />
    <Route path="/student-studymaterial" element={<StudentStudyMaterial />} />
    <Route path="/my-attendance" element={<AttendanceManagement />} />

      {/* <Route path="/dashboard" element={<FacultyDashboard />} /> */}

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
