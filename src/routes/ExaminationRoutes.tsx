// src/routes/ExaminationRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import examination components
import AssessmentTests from "../pages/examination/pages/AssessmentTests";
import ExamEvaluations from "../pages/examination/pages/ExamEvalutions";
import ExamTimeTable from "../pages/examination/pages/ExamTimeTable";
import HallTickets from "../pages/examination/pages/HallTickets";
import MarksList from "../pages/examination/pages/MarksList";
import Reports from "../pages/examination/pages/Reports";
import SeatingPlan from "../pages/examination/pages/SeatingPlan";
import StudentAttendance from "../pages/examination/pages/StudentAttendance";
import InvigilatorManagement from "../pages/examination/pages/Invisgilator";
import CondonationManager from "../pages/examination/pages/CondonationList";
import DetainedStudentsManager from "../pages/examination/pages/DetainedList";
import ExamAttendanceManager from "../pages/examination/pages/ExamAttendance";
import ResultAnalyticsDashboard from "../pages/examination/pages/ExamResults";
import ExamInbox from "../pages/examination/pages/ExamInbox";
import ExamEvaluation from "../pages/examination/pages/ExamEvaluation";
import Dashboard from "../FacultyModules/Examination/Dashboard";
import ExamTimetable from "../FacultyModules/Examination/ExamTimetablefaculty";
import FacultyInvigilationDuties from "../FacultyModules/Examination/FacultyInvigilation";
import ExamAttendanceSystem from "../FacultyModules/Examination/FacultyStudenceattendance";
import FacultyExamEvaluation from "../FacultyModules/Examination/ExamEvalutionfaculty";
import FacultyMarksList from "../FacultyModules/Examination/FacultyMarksList";
import ExamResultsPage from "../FacultyModules/Examination/ExamResultsfaculty";
import FacultyRaiseticket from "../FacultyModules/Examination/FacultyRaiseticket";
import StudentDashboard from "../StudentModules/Examination/StudentDashboard";
import StudentExamSchedule from "../StudentModules/Examination/StudentExamSchedule";
import StudentHallticket from "../StudentModules/Examination/StudentHallticket";
import StudentExamAttendance from "../StudentModules/Examination/StudentExamAttendance";
import StudentExamResult from "../StudentModules/Examination/StudentExamResult";
import StudentRaiseTicket from "../StudentModules/Examination/StudentRaiseTicket";
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
