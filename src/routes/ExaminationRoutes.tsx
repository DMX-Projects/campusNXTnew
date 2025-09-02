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
           {/* Catch all for invalid examination routes */}
      <Route path="*" element={<Navigate to="/examination" replace />} />
    </Routes>
  );
};

export default ExaminationRoutes;
