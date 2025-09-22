import React from "react";
import { Route, Routes } from "react-router-dom";
import CandidateVerification from "../pages/RegistorModule/Admission/Verification/CandidateVerification";
import DocumentVerification from "../pages/RegistorModule/Admission/Verification/DocumentVerification";
import AllotmentOrderGeneration from "../pages/RegistorModule/Admission/Verification/AllotmentOrderGeneration";
import TemporaryStudentLogin from "../pages/RegistorModule/Admission/StudentOnboarding/TemporaryStudentLogin";
import CommunicationHub from "../pages/RegistorModule/Admission/StudentOnboarding/CommunicationHub";
import PermanentStudentLoginPage from "../pages/RegistorModule/Admission/StudentOnboarding/PermanentStudentLogin";
import AdmissionReports from "../pages/RegistorModule/Admission/ReportsAndLogs/AdmissionReports";
import FeePaymentReports from "../pages/RegistorModule/Admission/ReportsAndLogs/FeePaymentReports";
import VerificationLogs from "../pages/RegistorModule/Admission/ReportsAndLogs/VerificationLogs";
const CommonRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="verification/candidate" element={<CandidateVerification />} />
           <Route path="/verification/document" element={<DocumentVerification />} />
              <Route path="/verification/allotment-order" element={<AllotmentOrderGeneration />} />
               <Route path="/student-onboarding/temp-login" element={<TemporaryStudentLogin />} />
  <Route path="/student-onboarding/communication-hub" element={<CommunicationHub />} />
  <Route path="/student-onboarding/activate-login" element={<PermanentStudentLoginPage />} />
   <Route path="/reports/admission" element={<AdmissionReports />} />
    <Route path="/reports/fee-payment" element={<FeePaymentReports />} />
       <Route path="/reports/verification-logs" element={<VerificationLogs />} />

    </Routes>
  );
};

export default CommonRoutes;