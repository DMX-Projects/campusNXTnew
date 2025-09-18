// src/routes/ExaminationRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import examination components
import AssessmentTests from "../pages/ChairpersonModule/examination/pages/AssessmentTests";
import ExamEvaluations from "../pages/ChairpersonModule/examination/pages/ExamEvalutions";
import ExamTimeTable from "../pages/ChairpersonModule/examination/pages/ExamTimeTable";
import HallTickets from "../pages/ChairpersonModule/examination/pages/HallTickets";
import MarksList from "../pages/ChairpersonModule/examination/pages/MarksList";
import Reports from "../pages/ChairpersonModule/examination/pages/Reports";
import SeatingPlan from "../pages/ChairpersonModule/examination/pages/SeatingPlan";
import StudentAttendance from "../pages/ChairpersonModule/examination/pages/StudentAttendance";
import InvigilatorManagement from "../pages/ChairpersonModule/examination/pages/Invisgilator";
import CondonationManager from "../pages/ChairpersonModule/examination/pages/CondonationList";
import DetainedStudentsManager from "../pages/ChairpersonModule/examination/pages/DetainedList";
import ExamAttendanceManager from "../pages/ChairpersonModule/examination/pages/ExamAttendance";
import ResultAnalyticsDashboard from "../pages/ChairpersonModule/examination/pages/ExamResults";
import ExamInbox from "../pages/ChairpersonModule/examination/pages/ExamInbox";
import ExamEvaluation from "../pages/ChairpersonModule/examination/pages/ExamEvaluation";
import Dashboard from "../pages/FacultyModules/Examination/Dashboard";
import ExamTimetable from "../pages/FacultyModules/Examination/ExamTimetablefaculty";
import FacultyInvigilationDuties from "../pages/FacultyModules/Examination/FacultyInvigilation";
import ExamAttendanceSystem from "../pages/FacultyModules/Examination/FacultyStudenceattendance";
import FacultyExamEvaluation from "../pages/FacultyModules/Examination/ExamEvalutionfaculty";
import FacultyMarksList from "../pages/FacultyModules/Examination/FacultyMarksList";
import ExamResultsPage from "../pages/FacultyModules/Examination/ExamResultsfaculty";
import FacultyRaiseticket from "../pages/FacultyModules/Examination/FacultyRaiseticket";
import StudentDashboard from "../pages/StudentModules/Examination/StudentDashboard";
import StudentExamSchedule from "../pages/StudentModules/Examination/StudentExamSchedule";
import StudentHallticket from "../pages/StudentModules/Examination/StudentHallticket";
import StudentExamAttendance from "../pages/StudentModules/Examination/StudentExamAttendance";
import StudentExamResult from "../pages/StudentModules/Examination/StudentExamResult";
import StudentRaiseTicket from "../pages/StudentModules/Examination/StudentRaiseTicket";
const ExaminationRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Examination Dashboard 
      <Route index element={<div className="p-6">Examination Dashboard</div>} />*/}

      {/* Examination Sub-Routes */}
      <Route index element={<AssessmentTests />} />
      <Route path="assessment-tests" element={<AssessmentTests />} />
      <Route path="exam-evaluations" element={<ExamEvaluations />} />
      <Route path="exam-time-table" element={<ExamTimeTable />} />
      <Route path="hall-tickets" element={<HallTickets />} />
      <Route path="marks-list" element={<MarksList />} />
      <Route path="reports" element={<Reports />} />
      <Route path="seating-plan" element={<SeatingPlan />} />
      <Route path="student-attendance" element={<StudentAttendance />} />
       <Route path="invisgilator" element={<InvigilatorManagement/>} />
       <Route path="condonation" element={<CondonationManager/>} />
       <Route path="detained" element={<DetainedStudentsManager/>} />
       <Route path="exam-attendance" element={<ExamAttendanceManager/>}/> 
       <Route path="exam-results" element={<ResultAnalyticsDashboard/>}/>
       <Route path="inbox" element={<ExamInbox/>}/>
       <Route path="exam-evaluation" element={<ExamEvaluation/>}/>
       <Route path="dashboard-faculty" element={<Dashboard/>}/>
       <Route path="examtimetable-faculty" element={<ExamTimetable/>}/>
       <Route path="invigilation-faculty" element={<FacultyInvigilationDuties/>}/>
       <Route path="studentattendance-faculty" element={<ExamAttendanceSystem/>}/>
       <Route path="examevalution-faculty" element={<FacultyExamEvaluation/>}/>
       <Route path="marklist-faculty" element={<FacultyMarksList/>}/>
       <Route path="examresults-faculty" element={<ExamResultsPage/>}/>
       <Route path="faculty-raiseticket" element={<FacultyRaiseticket/>}/>
       <Route path="student-dashboard" element={<StudentDashboard/>}/>
       <Route path="student-examtimetable" element={<StudentExamSchedule/>}/>
       <Route path="student-studenthallticket" element={<StudentHallticket/>}/>
       <Route path="student-examattendance" element={<StudentExamAttendance/>}/>
       <Route path="student-raiseticket" element={<StudentRaiseTicket/>}/>
       <Route path="student-examresult" element={<StudentExamResult/>}/>
           {/* Catch all for invalid examination routes */}
      <Route path="*" element={<Navigate to="/examination" replace />} />
    </Routes>
  );
};

export default ExaminationRoutes;
