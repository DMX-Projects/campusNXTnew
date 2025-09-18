import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Hostel pages/components
import HostelDashboard from "../pages/ChairpersonModule/Hostel/HostelDashboard";
import HostelInbox from "../pages/ChairpersonModule/Hostel/HostelInbox";
import HostelDetails from "../pages/ChairpersonModule/Hostel/HostelDetails";
import HostelStudentsList from "../pages/ChairpersonModule/Hostel/HostelStudentsList";
import HostelFacultyList from "../pages/ChairpersonModule/Hostel/HostelFacultyList";
import HostelFeeDues from "../pages/ChairpersonModule/Hostel/HostelFee_Dues";
import HostelInOut from "../pages/ChairpersonModule/Hostel/HostelInOut";
import HostelPermissions from "../pages/ChairpersonModule/Hostel/Hostel_Permissions";
import HostelInventory from "../pages/ChairpersonModule/Hostel/HostelInventory";
import GeofencingManagement from "../pages/ChairpersonModule/Hostel/GeofencingManagement";
// import HostelGeoFencing from "../pages/Hostel/HostelGeoFencing";
import HostelReports from "../pages/ChairpersonModule/Hostel/HostelReports";
import HostelTickets from "../pages/ChairpersonModule/Hostel/HostelTickets";
// import HostelTickets from "../pages/Hostel/HostelTickets";
// import HostelTransfer from "../pages/Hostel/HostelTransfer";

// Existing Student Modules
import StudentHostelInbox from "../pages/StudentModules/Hostel/HostelInbox"
import MyRoomPage from "../pages/StudentModules/Hostel/MyRoomPage";
import MyHostelPermissions from "../pages/StudentModules/Hostel/MyHostelPermissions";
import FeePaymentsPage from "../pages/StudentModules/Hostel/FeePaymentPage";
import MessServicesPage from "../pages/StudentModules/Hostel/MessServicesPage";
import MyAttendancePage from "../pages/StudentModules/Hostel/MyAttendancePage";
import NoticesPage from "../pages/StudentModules/Hostel/NoticesPage";


// New Student Modules - Room & Application
import ApplyForHostelPage from "../pages/StudentModules/Hostel/ApplyForHostelPage";
import RoomDetailsHistoryPage from "../pages/StudentModules/Hostel/RoomDetailsHistoryPage";
import RequestRoomChangePage from "../pages/StudentModules/Hostel/RequestRoomChangePage";

// New Student Modules - Leave & Movement
import ApplyForLeavePage from "../pages/StudentModules/Hostel/ApplyForLeavePage";
import GenerateQRGatePassPage from "../pages/StudentModules/Hostel/GenerateQRGatePassPage";
import TrackLeaveReturnPage from "../pages/StudentModules/Hostel/TrackLeaveReturnPage";

// New Student Modules - Fee Management
import ViewFeeDetailsPage from "../pages/StudentModules/Hostel/ViewFeeDetailsPage";
import PayOnlinePage from "../pages/StudentModules/Hostel/PayOnlinePage";
import DownloadReceiptsPage from "../pages/StudentModules/Hostel/DownloadReceiptsPage";

// New Student Modules - Complaints & Feedback
import SubmitComplaintPage from "../pages/StudentModules/Hostel/SubmitComplaintPage";
import TrackComplaintStatusPage from "../pages/StudentModules/Hostel/TrackComplaintStatusPage";
import GiveFeedbackPage from "../pages/StudentModules/Hostel/GiveFeedbackPage";

// New Student Modules - Visitors
import PreRegisterVisitorPage from "../pages/StudentModules/Hostel/PreRegisterVisitorPage";
import VisitorLogsPage from "../pages/StudentModules/Hostel/VisitorLogsPage";

// New Student Modules - Dashboard
import HostelDashboardPage from "../pages/StudentModules/Hostel/HostelDashboardPage";

//Warden module routes
import BuildingAndBlocks from "../pages/WardenModules/Hostel/Hostel_Setup/BuildingAndBlocks";
import AddNewHostel from "../pages/WardenModules/Components/AddNewHostel";
import CreatePolicies from "../pages/WardenModules/Components/CreatePolicies";
import RulesAndPolicies from "../pages/WardenModules/Hostel/Hostel_Setup/RulesAndPolicies";
import RoomAllotment from "../pages/WardenModules/Hostel/Occupancy_Rooms/RoomAllotment";
import ChangeRoomRequests from "../pages/WardenModules/Hostel/Occupancy_Rooms/ChangeRoomRequests";
import HostelApplications from "../pages/WardenModules/Hostel/ApplictionAndRooms/HostelApplications";
import LeaveRequests from "../pages/WardenModules/Hostel/ApplictionAndRooms/LeaveRequests";
import EntryExitLogs from "../pages/WardenModules/Hostel/ApplictionAndRooms/EntryExitLogs";
import FeeCollection from "../pages/WardenModules/Hostel/FeeManagement/FeeCollection";
import StudentFeeDetail from "../pages/WardenModules/Hostel/FeeManagement/StudentFeesDetail";
import FeesReport from "../pages/WardenModules/Hostel/FeeManagement/FeesReport";
import Complaints from "../pages/WardenModules/Hostel/ComplaintAndDicipline/Complaints";
import DisciplineCases from "../pages/WardenModules/Hostel/ComplaintAndDicipline/DisciplineCases";
import ConductReport from "../pages/WardenModules/Hostel/ComplaintAndDicipline/ConductReport";
import VisitorApproval from "../pages/WardenModules/Hostel/Visitors/VisitorApproval";
import VisitorLogs from "../pages/WardenModules/Hostel/Visitors/VisitorLogs";
import OccupencyAndFeesReport from "../pages/WardenModules/Hostel/Reports/OccupencyAndFeesReport";
import ComplaintsAndDiscipline from "../pages/WardenModules/Hostel/Reports/ComplaintsAndDisciplineReport";
import Notification from "../pages/WardenModules/Hostel/Notification";

const HostelRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default → Redirect /hostel to /hostel/student-dashboard for students */}
      <Route index element={<Navigate to="student-dashboard" replace />} />

      {/* Admin/Warden Hostel pages */}
      <Route path="dashboard" element={<HostelDashboard />} />
      <Route path="inbox" element={<HostelInbox />} />  
      <Route path="details" element={<HostelDetails />} />
      <Route path="students" element={<HostelStudentsList />} />
      <Route path="faculty" element={<HostelFacultyList />} />
      <Route path="fee-details" element={<HostelFeeDues />} />
      <Route path="out-time" element={<HostelInOut />} /> 
      <Route path="student-permissions" element={<HostelPermissions />} />
      <Route path="inventory" element={<HostelInventory />} />
      <Route path="geo-fencing" element={<GeofencingManagement />} />
      <Route path="reports" element={<HostelReports />} />
      <Route path="raise-ticket" element={<HostelTickets />} />

      {/* Student Hostel Dashboard */}
      <Route path="student-dashboard" element={<HostelDashboardPage />} />

      {/* Student Room & Application Routes */}
      <Route path="room/apply" element={<ApplyForHostelPage />} />
      <Route path="room/details" element={<RoomDetailsHistoryPage />} />
      <Route path="room/change-request" element={<RequestRoomChangePage />} />

      {/* Student Leave & Movement Routes */}
      <Route path="leave/apply" element={<ApplyForLeavePage />} />
      <Route path="leave/gate-pass" element={<GenerateQRGatePassPage />} />
      <Route path="leave/status" element={<TrackLeaveReturnPage />} />

      {/* Student Fee Management Routes */}
      <Route path="fees/details" element={<ViewFeeDetailsPage />} />
      <Route path="fees/pay" element={<PayOnlinePage />} />
      <Route path="fees/receipts" element={<DownloadReceiptsPage />} />

      {/* Student Complaints & Feedback Routes */}
      <Route path="complaints/new" element={<SubmitComplaintPage />} />
      <Route path="complaints/status" element={<TrackComplaintStatusPage />} />
      <Route path="complaints/feedback" element={<GiveFeedbackPage />} />

      {/* Student Visitor Management Routes */}
      <Route path="visitors/register" element={<PreRegisterVisitorPage />} />
      <Route path="visitors/logs" element={<VisitorLogsPage />} />

      {/* Student Notifications */}
      <Route path="notifications" element={<NoticesPage />} />

      {/* Legacy Student Routes (keeping for backward compatibility) */}
      <Route path="student/inbox" element={<StudentHostelInbox />} />
      <Route path="student/my-room" element={<MyRoomPage />} />
      <Route path="student/student-permissions" element={<MyHostelPermissions />} />
      <Route path="student/fee-details" element={<FeePaymentsPage />} />
      <Route path="student/mess-services" element={<MessServicesPage />} />
      <Route path="student/attendance" element={<MyAttendancePage />} />
      <Route path="student/notices" element={<NoticesPage />} />


      {/* Catch all → Redirect back to student dashboard */}
      <Route path="*" element={<Navigate to="/hostel/student-dashboard" replace />} />

      {/* <Route path="geo-fencing" element={<HostelGeoFencing />} />
      <Route path="transfer" element={<HostelTransfer />} />
      <Route path="reports" element={<HostelReports />} />*/}
      <Route path="raise-ticket" element={<HostelTickets />} />

      //Warden module routes
      <Route path="/setup/buildings-and-blocks" element={<BuildingAndBlocks />} />
      <Route path="/add-new-hostel" element={<AddNewHostel />} />
      <Route path="/create-policies" element={<CreatePolicies />} />
      <Route path="/setup/rules" element={<RulesAndPolicies />} />
      <Route path="/rooms/allotment" element={<RoomAllotment />} />
      <Route path="/rooms/change-requests" element={<ChangeRoomRequests />} />
      <Route path="/applications/new" element={<HostelApplications />} />
      <Route path="applications/leave" element={<LeaveRequests />} />
      <Route path="applications/logs" element={<EntryExitLogs />} />
      <Route path="/fees/collection" element={<FeeCollection />} />
      <Route path="/fees/student-details/:studentId" element={<StudentFeeDetail />} />
      <Route path="/fees/reports" element={<FeesReport />} />
      <Route path="/complaints/list" element={<Complaints />} />
      <Route path="/complaints/discipline" element={<DisciplineCases />} />
      <Route path="complaints/reports" element={<ConductReport />} />
      <Route path="/visitors/approvals" element={<VisitorApproval />} />
      <Route path="/visitors/logs/warden" element={<VisitorLogs />} />
      <Route path="/reports/occupancy" element={<OccupencyAndFeesReport />} />
      <Route path="/reports/complaints" element={<ComplaintsAndDiscipline />} />
      <Route path="/notifications" element={<Notification />} />
      {/* Catch all → Redirect back to dashboard */}
      <Route path="*" element={<Navigate to="/hostel/dashboard" replace />} />

    </Routes>
  );
};

export default HostelRoutes;
