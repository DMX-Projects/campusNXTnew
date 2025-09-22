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
import { HODDashboard } from "../pages/HODModules/Administration/HODDashboard";
import { CircularMemos } from "../pages/HODModules/Administration/CircularMemos";
import { DepartmentalBudgeting } from "../pages/HODModules/Administration/DepartmentalBudgeting";
import { DepartmentalReports } from "../pages/HODModules/Administration/DepartmentalReports";
import { DepartmentalResources } from "../pages/HODModules/Administration/DepartmentalResources";
import { PurchaseRequisitions } from "../pages/HODModules/Administration/PurchaseRequisitions";
import HODRaiseTicket from "../pages/HODModules/Administration/HODRaiseTicket";

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
      <Route path="/hod/dashboard" element={<HODDashboard />} />
      <Route path="/hod/circulars-memos" element={<CircularMemos />} />
      <Route path="/hod/departmental-budgeting" element={<DepartmentalBudgeting />} />
      <Route path="/hod/departmental-reports" element={<DepartmentalReports />} />
      <Route path="/hod/departmental-resources" element={<DepartmentalResources />} />
      <Route path="/hod/purchase-requisitions" element={<PurchaseRequisitions />} />
      <Route path="/raise-ticket" element={<HODRaiseTicket />} />

    </Routes>
  );
};

export default CommonRoutes;