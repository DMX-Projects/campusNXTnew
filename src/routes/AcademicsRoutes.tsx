import Inbox from '../pages/ChairpersonModule/Academics/Courses/inbox';
import StudentAttendance from '../pages/ChairpersonModule/Academics/Courses/Studentsattendence'
import AttendanceManagement from '../components/Modules/AttendanceManagement'
import Timetable from '../pages/ChairpersonModule/Academics/timetable/TimeTable';
// import StudentLeave from '../pages/Academics/StudentLeaves/StudentLeaves';
import AcademicCalender from '../pages/ChairpersonModule/Academics/AcademicCalender/AcademicCalender';
// import SubjectsAndSyllabus from '../pages/Academics/SubjectandSyllabus/SubjectSyllabus';
import StudentExamprepation from '../pages/ChairpersonModule/Academics/StudentExamprepration/StudentExamprep';
import StudyMaterialPage from '../pages/ChairpersonModule/Academics/StudyMaterial/StudyMaterial';
import StudentProject from '../pages/ChairpersonModule/Academics/StudentProject/StudentProject';
import StudentAppruval from '../pages/ChairpersonModule/Academics/StudentAppruval/StudentAppruval';
// import AcademicDashboard from '../pages/Academics/AcademicDashboar/AcademicDashboard';
import AcademicFaculty from '../pages/ChairpersonModule/Academics/AcademicFaculty/AcademicFaculty';
import OnlineTest from '../pages/ChairpersonModule/Academics/OnlineTest/OnlineTest';
import CodingAssesment from '../pages/ChairpersonModule/Academics/OnlineTest/codingAssesment'
import FacultyFeedback from '../pages/ChairpersonModule/Academics/FacultyFeedback/FacultyFeedback';
import SyllabusTrackingDashboard from '../pages/ChairpersonModule/Academics/SyllabusTracking/SyllabusTracking';
import ScheduleOnlineClass from '../pages/ChairpersonModule/Academics/Scheduleonlineclass/Scheduleonlineclass';
import Reports from '../pages/ChairpersonModule/Academics/Reports/Reports';
// import RaiseTicket from '../pages/Academics/RiseTicket/RiseTicket'

import FacultyInbox from '../pages/FacultyModules/FacultyAcademic/FacultyInbox';
import Announcement from '../pages/FacultyModules/FacultyAcademic/Announcement';
import FacultyStudentAttendance from '../pages/FacultyModules/FacultyAcademic/StudentAttendence';
import TimeTableFaculty from '../pages/FacultyModules/FacultyAcademic/TimeTableFaculty';
import FacultyCalender from '../pages/FacultyModules/FacultyAcademic/calenderFaculty';
import FacultySubjectsSyllabus from '../pages/FacultyModules/FacultyAcademic/FacultySubjectsSyllabus';
import FacultyStudyMaterial from '../pages/FacultyModules/FacultyAcademic/FacultyStudyMaterial';
import FacultyStudentProject from '../pages/FacultyModules/FacultyAcademic/StudentProject';
import FacultyOnlineTest from '../pages/FacultyModules/FacultyAcademic/FacultyOnlineTest';
import ScheduleOnlinclass from '../pages/FacultyModules/FacultyAcademic/ScheduleOnlinclass';
import FacultyReports from '../pages/FacultyModules/FacultyAcademic/FacultyReports';
import FacultyRiseTicket  from '../pages/FacultyModules/FacultyAcademic/FacultyRiseticket'
// import FacultyDashboard from '../FacultyModules/Examination/Dashboard';


// student login 

import AcademicstudentDashboard from '../pages/FacultyModules/FacultyAcademic/StudentDashboard'
import StudentfeeManagement from '../pages/FacultyModules/FacultyAcademic/studentFeeManagement';
import StudentRecordsResults from '../pages/FacultyModules/FacultyAcademic/StudentRecords&Results';
import StudentClassSchedule from '../pages/FacultyModules/FacultyAcademic/StudentClassSchedule';
import StudentCourseAcademic from '../pages/FacultyModules/FacultyAcademic/StudentCourse';
// import StudentAssigment from '../pages/FacultyModules/FacultyAcademic/StudentAssigment';
import StudentExam from '../pages/FacultyModules/FacultyAcademic/StudentExam';
import StudentProfile from '../pages/FacultyModules/FacultyAcademic/StudentProfile';
import StudentStudyMaterial from '../pages/FacultyModules/FacultyAcademic/StudentStudyMaterial';

<<<<<<< Updated upstream
=======



//HOD Login Routes
import FacultyDetails from '../pages/HODModules/Faculties/FacultyDetails'
import FacultyAttendanceAndFeedback from '../pages/HODModules/Faculties/FacultyAttendanceAndFeedback';
import FacultyLeaves from '../pages/HODModules/Faculties/FacultyLeaves';
import HODStudentAttendance from '../pages/HODModules/Students/HODStudentAttendance';
import HODStudentLeaveDetails from '../pages/HODModules/Students/HODStudentLeaveDetails';
import HODStudentProjects from '../pages/HODModules/Students/HODStudentProjects';
import HODReports from '../pages/HODModules/HODReports';
import HODCatPage from '../pages/HODModules/HODCatPage';

>>>>>>> Stashed changes
import React from 'react';
import { Routes, Route} from 'react-router-dom';

const AcademicsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Home Route */}
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/student-attendance" element={<StudentAttendance />} />
      <Route path="/timetable" element={<Timetable />} />
      {/* <Route path="student-leaves" element={<StudentLeave />} /> */}
      <Route path="academic-calendar" element={<AcademicCalender />} />
      {/* <Route path="subjects-syllabus" element={<SubjectsAndSyllabus />} /> */}
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
      {/* <Route path="/raise-ticket" element={<RaiseTicket />} /> */}


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
    {/* <Route path="/student-assignments" element={<StudentAssigment />} /> */}
    <Route path="/student-exams" element={<StudentExam />} />
    <Route path="/student-profile" element={<StudentProfile />} />
    <Route path="/student-studymaterial" element={<StudentStudyMaterial />} />
    <Route path="/my-attendance" element={<AttendanceManagement />} />

<<<<<<< Updated upstream
=======

    //Hod Route paths
    <Route path="/faculty/faculty-details" element={<FacultyDetails  />} />
    <Route path="/faculty/faculty-attendance" element={<FacultyAttendanceAndFeedback  />} />
    <Route path="/faculty/faculty-leave-requests" element={<FacultyLeaves  />} />
    <Route path="/hod/student-attendance" element={<HODStudentAttendance  />} />
    <Route path="/hod/student-leaves" element={<HODStudentLeaveDetails  />} />
    <Route path="/hod/student-projects" element={<HODStudentProjects />} />
    <Route path="/hod/reports" element={<HODReports  />} />
    <Route path="/hod/cat" element={<HODCatPage  />} />
>>>>>>> Stashed changes
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
