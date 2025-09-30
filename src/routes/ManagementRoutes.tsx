import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HRDashboard from "../pages/RegistorModule/HR_Management/Dashboard";
import Employeedatabase from "../pages/RegistorModule/HR_Management/Employeedatabase";
import LeavePolicy from "../pages/RegistorModule/HR_Management/Leave&policy";
import PayrollManagement from "../pages/RegistorModule/HR_Management/Payrollmanagement";
import Requirementmanagement from "../pages/RegistorModule/HR_Management/Requirementmanagement";

import StudentfeeDashboard from "../pages/RegistorModule/StudentFees/StudentfeeDashboard";
import FeeStructureManagement from "../pages/RegistorModule/StudentFees/FeeStructureManagement";
import FeeMonitoringSystem from "../pages/RegistorModule/StudentFees/FeeMonitoringSystem";
import BulkOperationsInterface from "../pages/RegistorModule/StudentFees/BulkOperationsInterface";
import StudentFeesReportingHub from "../pages/RegistorModule/StudentFees/StudentFeesReportingHub";
import EmployeeLeaves from "../pages/PrincipalModules/Administration/Employee/EmployeeLeaves";
import AdmissionQuota from "../pages/RegistorModule/StudentFees/AdmissionQuota";


//infrastructure Routes
import { StockControl } from "../pages/RegistorModule/Infrastructure/StockControl";
import StockManagement from "../pages/RegistorModule/Infrastructure/StockManagement";
import AssetManagement from "../pages/RegistorModule/Infrastructure/FixedAssesment";
import NewPurchaseKanban from "../pages/RegistorModule/Infrastructure/NewAssetPurchase";
import PurchaseManagement from "../pages/RegistorModule/Infrastructure/PurchaseManagement";
import MaintenanceCosts from "../pages/RegistorModule/Infrastructure/MaintenanceCosts";
import VendorManagement from "../pages/RegistorModule/Infrastructure/VendorManagement";
import ManagementHistory from "../pages/RegistorModule/Infrastructure/ManagementHistory";
import TransportDashboard from "../pages/RegistorModule/Transport/TransportDashboard";
import FleetandStaffOverview from "../pages/RegistorModule/Transport/FleetandStaffOverview";
import FinancialControlandApprovals from "../pages/RegistorModule/Transport/FinancialControlandApprovals";
import FuelConsumptionDetails from "../pages/RegistorModule/Transport/FuelConsumptionDetails";
import VehicleCostAnalysisDetails from "../pages/RegistorModule/Transport/VehicleCostAnalysisDetails";
import InsuranceDetails from "../pages/RegistorModule/Transport/InsuranceDetails";
import DriverOvertimeDetails from "../pages/RegistorModule/Transport/DriverOvertimeDetails";
import RouteProfitabilityDetails from "../pages/RegistorModule/Transport/RouteProfitabilityDetails";
import AccidentAllocationDetails from "../pages/RegistorModule/Transport/AccidentAllocationDetails";
import MasterConfiguration from "../pages/RegistorModule/Transport/MasterConfiguration";
import TransportReports from "../pages/RegistorModule/Transport/TransportReports";

import AdministrationVerification from "../pages/RegistorModule/Admission/Verification/AdministrationVerification";
import StudentAcademicVerification from "../pages/RegistorModule/Admission/Verification/StudentAcademicVerification";
import TemporaryStudentLogin from "../pages/RegistorModule/Admission/StudentOnboarding/TemporaryStudentLogin";
import CommunicationHub from "../pages/RegistorModule/Admission/StudentOnboarding/CommunicationHub";
import PermanentStudentLoginPage from "../pages/RegistorModule/Admission/StudentOnboarding/PermanentStudentLogin";
import AdmissionReports from "../pages/RegistorModule/Admission/ReportsAndLogs/AdmissionReports";
import FeePaymentReports from "../pages/RegistorModule/Admission/ReportsAndLogs/FeePaymentReports";
import VerificationLogs from "../pages/RegistorModule/Admission/ReportsAndLogs/VerificationLogs";

import FinancialsAndFees from "../pages/RegistorModule/Hostel/FinancialsAndFees";
import ConfigurationAndRules from "../pages/RegistorModule/Hostel/ConfigurationAndRules";
import InfrastructureOverview from "../pages/RegistorModule/Hostel/InfrastructureOverview";
import StaffAndRoles from "../pages/RegistorModule/Hostel/StaffAndRoles";
import Reports from "../pages/RegistorModule/Hostel/Reports";
import AdmissionDashboard from "../pages/RegistorModule/Admission/RegistrarDashboard";
import SeatAllotmentPhaseI from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseI";
import ManagementAdmissionProcess from "../pages/RegistorModule/Admission/AdminssionProcess/ManagementAdmission/ManagementAdmissionProcess";
import SpotAdmissionMerit from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionMerit";
import SpotAdmissionFCFS from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionFCFS";
import FinancialApprovals from "../pages/PrincipalModules/Administration/FinancialApprovals";
import CourseManagement  from "../pages/PrincipalModules/Administration/CourseManagement";
// import FacultyAndStaffOversight from "../pages/PrincipalModules/Administration/FacultyAndStaffOversight";
import CircularsAndEventManagement from "../pages/PrincipalModules/Administration/CircularsAndEventManagement";
import InfrastructureReports from "../pages/PrincipalModules/Administration/InfrastructureReports";
import DashBoard from "../pages/PrincipalModules/Administration/DashBoard";

import Dashboard from "../pages/StudentModules/Adminstration/Dashboard";
import MyProfile from "../pages/StudentModules/Adminstration/MyProfile";
import Finance from "../pages/StudentModules/Adminstration/Finance";
import Notifications from "../pages/StudentModules/Adminstration/Notification";


import { HODDashboard } from "../pages/HODModules/Administration/HODDashboard";
import HODDataManagement from "../pages/HODModules/Administration/HODDataManagement";
import { CircularMemos } from "../pages/HODModules/Administration/CircularMemos";
import { DepartmentalBudgeting } from "../pages/HODModules/Administration/DepartmentalBudgeting";
import { DepartmentalReports } from "../pages/HODModules/Administration/DepartmentalReports";
import { DepartmentalResources } from "../pages/HODModules/Administration/DepartmentalResources";
import { PurchaseRequisitions } from "../pages/HODModules/Administration/PurchaseRequisitions";
import HODRaiseTicket from "../pages/HODModules/Administration/HODRaiseTicket";

import TempStudentDashboard from "../pages/TempStudentModule/Dashboard";
import ApplicationStatus from "../pages/TempStudentModule/ApplicationStatus";
import FeePayment from "../pages/TempStudentModule/FeePayment";
import DocumentUpload from "../pages/TempStudentModule/DocumentUpload";
import OnboardingForm from "../pages/TempStudentModule/OnboardingForm";
import TempNotifications from "../pages/TempStudentModule/Notifications";

import BlockManagement from "../pages/RegistorModule/Infrastructure/BlockManagement";
import EmployeeAttendance from "../pages/PrincipalModules/Administration/Employee/EmployeeAttendance";
import StudentDetails from "../pages/PrincipalModules/Administration/StudentDetails";
import FacultyDetails from "../pages/PrincipalModules/Administration/FacultyDetails";
import StudentTransfers from "../pages/PrincipalModules/Administration/StudentTransfers";
import InfrastructureManagement from "../pages/PrincipalModules/Administration/InfrastructureManagement";
import RegistorEmployeeAttendance from "../pages/RegistorModule/HR_Management/RegistorEmployeeAttendance";
import RegistorEmployeeLeaves from "../pages/RegistorModule/HR_Management/RegistorEmployeeLeaves";  




const CommonRoutes: React.FC = () => {
  return (
    <Routes>


      <Route path="/hr/dashboard" element={<HRDashboard />} />
      <Route path="/hr/employee-database" element={<Employeedatabase />} />
      <Route path="/hr/employee-database/attendance" element={<RegistorEmployeeAttendance />} />
      <Route path="/hr/employee-database/leaves" element={<RegistorEmployeeLeaves />} />
      <Route path="/hr/leave-policy" element={<LeavePolicy />} />
      <Route path="/hr/payroll" element={<PayrollManagement />} />
      <Route path="/hr/recruitment" element={<Requirementmanagement />} />

      <Route path="/infrastructure-management/inventory/stock-control" element={<StockControl />} />
      <Route path="/infrastructure-management/inventory/stock-management" element={<StockManagement />} />
      <Route path="/infrastructure-management/asset/fixed-assets" element={<AssetManagement />} />
      <Route path="/infrastructure-management/asset/new-purchase" element={<NewPurchaseKanban />} />
      <Route path="/infrastructure-management/purchase" element={<PurchaseManagement />} />
      <Route path="/infrastructure-management/maintenance-costs/income-expenditure" element={<MaintenanceCosts />} />
      <Route path="/infrastructure-management/maintenance-costs/vendor-management" element={<VendorManagement />} />
      <Route path="/infrastructure-management/maintenance-costs/history" element={<ManagementHistory />} />
       <Route path="/infrastructure-management/infrastructure" element={<BlockManagement />} />

      <Route path="/transport/fleet-staff" element={<FleetandStaffOverview />} />
      <Route path="/transport/financial-control" element={<FinancialControlandApprovals />} />
      {/* Financial Control Detail Routes */}
      <Route path="/transport/financial-control/fuel-consumption/:requestId" element={<FuelConsumptionDetails />} />
      <Route path="/transport/financial-control/vehicle-cost-analysis/:requestId" element={<VehicleCostAnalysisDetails />} />
      <Route path="/transport/financial-control/insurance-details/:requestId" element={<InsuranceDetails />} />
<Route path="/transport/financial-control/driver-overtime/:requestId" element={<DriverOvertimeDetails />} />
<Route path="/transport/financial-control/route-profitability/:requestId" element={<RouteProfitabilityDetails />} />
<Route path="/transport/financial-control/accident-allocation/:requestId" element={<AccidentAllocationDetails />} />

      {/* Master Configuration Routes - Default to vehicle-master */}
      <Route path="/transport/master-configuration" element={<Navigate to="/management/transport/master-configuration/vehicle-master" replace />} />
      <Route path="/transport/master-configuration/vehicle-master" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/driver-master" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/route-master" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/vehicle-master/add-vehicle" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/vehicle-master/edit-vehicle/:id" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/driver-master/add-driver" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/driver-master/edit-driver/:id" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/route-master/add-route" element={<MasterConfiguration />} />
      <Route path="/transport/master-configuration/route-master/edit-route/:id" element={<MasterConfiguration />} />
      {/* Transport Reports Routes - Default redirect to vehicle-cost-report */}
      <Route path="/transport/reports" element={<Navigate to="/management/transport/reports/vehicle-cost-report" replace />} />
      <Route path="/transport/reports/:reportType" element={<TransportReports />} />
      <Route path="/transport/dashboard" element={<TransportDashboard />} />


      <Route path="financials-fees" element={<FinancialsAndFees />} />
      <Route path="configuration-rules" element={<ConfigurationAndRules />} />
      <Route path="infrastructure-overview" element={<InfrastructureOverview />} />
      <Route path="staff-roles" element={<StaffAndRoles />} />
      <Route path="infra-reports" element={<Reports />} />
      <Route path="/Admission/dashboard" element={<AdmissionDashboard />} />
      <Route path="/admission-process/seat-allotment/cap-phases" element={<SeatAllotmentPhaseI />} />
      <Route path="/admission-process/management-quota" element={<ManagementAdmissionProcess />} />
      <Route path="/admission-process/spot-admission/merit-based" element={<SpotAdmissionMerit />} />
      <Route path="/admission-process/spot-admission/first-come" element={<SpotAdmissionFCFS />} />
      <Route path="/principal/financial-approvals" element={<FinancialApprovals />} />
      {/* <Route path="/principal/faculty-staff" element={<FacultyAndStaffOversight />} /> */}
      <Route path="/principal/circulars-events" element={<CircularsAndEventManagement />} />
      <Route path="/principal/infrastructure-reports" element={<InfrastructureReports />} />
      <Route path="/principal/dashboard" element={<DashBoard />} />
      <Route path="/principal/employee/attendance" element={<EmployeeAttendance/>}/>
      <Route path="/principal/employee/leaves" element={<EmployeeLeaves/>}/>
       <Route path="/principal/student-details" element={<StudentDetails/>}/>
      <Route path="/principal/faculty-details" element={<FacultyDetails/>}/>
       <Route path="/principal/student-transfers" element={<StudentTransfers/>}/>
       <Route path="/principal/course-management" element={<CourseManagement/>}/>
      <Route path="/principal/infrastructure-management" element={<InfrastructureManagement/>}/>



     <Route path="/principal/infrastructure-reports/new-asset-requests" element={<InfrastructureReports />} />
     <Route path="/principal/infrastructure-reports/major-maintenance-requests" element={<InfrastructureReports />} />
     <Route path="/principal/infrastructure-reports/new-asset-requests/View/:id" element={<InfrastructureReports />} />
     <Route path="/principal/infrastructure-reports/major-maintenance-requests/View/:id" element={<InfrastructureReports />} />
     <Route path="/principal/infrastructure-reports" element={<InfrastructureReports />} />
    
       <Route path="/student/dashboard" element={<Dashboard />} />
       <Route path="/student/profile" element={<MyProfile />} />
        <Route path="/student/finance" element={<Finance />} />
        <Route path="/student/notifications" element={<Notifications/>} />
       
     
      <Route path="/hod/dashboard" element={<HODDashboard />} />
      <Route path="/hod/data-management" element={<HODDataManagement />} />
          <Route path="/hod/circulars-memos" element={<CircularMemos />} />
      <Route path="/hod/departmental-budgeting" element={<DepartmentalBudgeting />} />
      <Route path="/hod/departmental-reports" element={<DepartmentalReports />} />
      <Route path="/hod/student-transfers" element={<StudentTransfers />} />
      <Route path="/hod/departmental-resources" element={<DepartmentalResources />} />
      <Route path="/hod/purchase-requisitions" element={<PurchaseRequisitions />} />
      <Route path="/raise-ticket" element={<HODRaiseTicket />} />

      <Route path="/temporary-student/dashboard" element={<TempStudentDashboard />} />
      <Route path="/temporary-student/application-status" element={<ApplicationStatus />} />
      <Route path="/temporary-student/fee-payment" element={<FeePayment />} />
      <Route path="/temporary-student/document-upload" element={<DocumentUpload />} />
      <Route path="/temporary-student/onboarding-form" element={<OnboardingForm />} />
      <Route path="/temporary-student/notifications" element={<TempNotifications />} />

      <Route path="verification/candidate" element={<AdministrationVerification />} />
      <Route path="/verification/document" element={<StudentAcademicVerification />} />
      <Route path="/student-onboarding/temp-login" element={<TemporaryStudentLogin />} />
      <Route path="/student-onboarding/communication-hub" element={<CommunicationHub />} />
      <Route path="/list&logins" element={<PermanentStudentLoginPage />} />
      <Route path="/reports&logs" element={<AdmissionReports />} />
      <Route path="/reports/fee-payment" element={<FeePaymentReports />} />
      <Route path="/reports/verification-logs" element={<VerificationLogs />} />



      <Route path="/student-fees/dashboard" element={<StudentfeeDashboard />} />
      <Route path="/student-fees/fee-structure" element={<FeeStructureManagement />} />
      <Route path="/student-fees/collection-tracking" element={<FeeMonitoringSystem />} />
      <Route path="/student-fees/bulk-actions" element={<BulkOperationsInterface />} />
      <Route path="/student-fees/reports" element={<StudentFeesReportingHub />} />
      <Route path="/student-fees/admission-fee-collection" element={<AdmissionQuota />} />
    </Routes>
  );
};

export default CommonRoutes;

