import React from "react";
import { Route, Routes } from "react-router-dom";

import TransportDashboard from "../pages/RegistorModule/Transport/TransportDashboard";
import FleetandStaffOverview from "../pages/RegistorModule/Transport/FleetandStaffOverview";
import FinancialControlandApprovals from "../pages/RegistorModule/Transport/FinancialControlandApprovals";
import MasterConfiguration from "../pages/RegistorModule/Transport/MasterConfiguration";
import TransportReports from "../pages/RegistorModule/Transport/TransportReports";

import FinancialsAndFees from "../pages/RegistorModule/Hostel/FinancialsAndFees";
import ConfigurationAndRules from "../pages/RegistorModule/Hostel/ConfigurationAndRules";
import InfrastructureOverview from "../pages/RegistorModule/Hostel/InfrastructureOverview";
import StaffAndRoles from "../pages/RegistorModule/Hostel/StaffAndRoles";
import Reports from "../pages/RegistorModule/Hostel/Reports";
import AdmissionDashboard from "../pages/RegistorModule/Admission/RegistrarDashboard";
import CAPAdmin from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/CAPAdmin";
import SeatAllotmentPhaseI from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseI";
import SeatAllotmentPhaseII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseII";
import SeatAllotmentPhaseIII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseIII";
import ManagementAdmissionProcess from "../pages/RegistorModule/Admission/AdminssionProcess/ManagementAdmission/ManagementAdmissionProcess";
import SpotAdmissionMerit from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionMerit";
import SpotAdmissionFCFS from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionFCFS";  
import FinancialApprovals from "../pages/PrincipalModules/Administration/FinancialApprovals";
import FacultyAndStaffOversight from "../pages/PrincipalModules/Administration/FacultyAndStaffOversight";
import CircularsAndEventManagement from "../pages/PrincipalModules/Administration/CircularsAndEventManagement";
import InfrastructureReports from "../pages/PrincipalModules/Administration/InfrastructureReports";
import DashBoard from "../pages/PrincipalModules/Administration/DashBoard"; 
import Dashboard from "../pages/TempStudentModule/Dashboard";
import ApplicationStatus from "../pages/TempStudentModule/ApplicationStatus";
import FeePayment from "../pages/TempStudentModule/FeePayment";
import DocumentUpload from "../pages/TempStudentModule/DocumentUpload";
import OnboardingForm from "../pages/TempStudentModule/OnboardingForm";
import Notifications from "../pages/TempStudentModule/Notifications";


const CommonRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/transport/dashboard" element={<TransportDashboard />} />
      <Route path="/transport/fleet-staff" element={<FleetandStaffOverview />} />
      <Route path="/transport/financial-control" element={<FinancialControlandApprovals />} />
      <Route path="/transport/master-configuration" element={<MasterConfiguration />} />
      <Route path="/transport/reports" element={<TransportReports />} />

      <Route path="financials-fees" element={<FinancialsAndFees />} />
      <Route path="configuration-rules" element={<ConfigurationAndRules />} />
      <Route path="infrastructure-overview" element={<InfrastructureOverview />} />
      <Route path="staff-roles" element={<StaffAndRoles />} />
      <Route path="infra-reports" element={<Reports />} />
      <Route path="/Admission/dashboard" element={<AdmissionDashboard />} />
      <Route path="/admission-process/cap" element={<CAPAdmin />} />
      <Route path="/admission-process/seat-allotment/phase-1" element={<SeatAllotmentPhaseI />} />
      <Route path="/admission-process/seat-allotment/phase-2" element={<SeatAllotmentPhaseII />} />
      <Route path="/admission-process/seat-allotment/phase-3" element={<SeatAllotmentPhaseIII />} />
      <Route path="/admission-process/management-quota" element={<ManagementAdmissionProcess />} />
      <Route path="/admission-process/spot-admission/merit-based" element={<SpotAdmissionMerit />} />
      <Route path="/admission-process/spot-admission/first-come" element={<SpotAdmissionFCFS />} />
      <Route path="/principal/financial-approvals" element={<FinancialApprovals />} />
      <Route path="/principal/faculty-staff" element={<FacultyAndStaffOversight />} />
      <Route path="/principal/circulars-events" element={<CircularsAndEventManagement />} />
      <Route path="/principal/infrastructure-reports" element={<InfrastructureReports />} />
      <Route path="/principal/dashboard" element={<DashBoard />} />
      <Route path="/temporary-student/dashboard" element={<Dashboard />} />
      <Route path="/temporary-student/application-status" element={<ApplicationStatus />} />
      <Route path="/temporary-student/fee-payment" element={<FeePayment />} />
      <Route path="/temporary-student/document-upload" element={<DocumentUpload />} />
      <Route path="/temporary-student/onboarding-form" element={<OnboardingForm />} />
      <Route path="/temporary-student/notifications" element={<Notifications />} />

    </Routes>
  );
};

export default CommonRoutes;