import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Hostel pages/components
import HostelDashboard from "../pages/Hostel/HostelDashboard";
import HostelInbox from "../pages/Hostel/HostelInbox";
import HostelDetails from "../pages/Hostel/HostelDetails";
import HostelStudentsList from "../pages/Hostel/HostelStudentsList";
import HostelFacultyList from "../pages/Hostel/HostelFacultyList";
import HostelFeeDues from "../pages/Hostel/HostelFee_Dues";
import HostelInOut from "../pages/Hostel/HostelInOut";
import HostelPermissions from "../pages/Hostel/Hostel_Permissions";
import HostelInventory from "../pages/Hostel/HostelInventory";
import GeofencingManagement from "../pages/Hostel/GeofencingManagement";
// import HostelGeoFencing from "../pages/Hostel/HostelGeoFencing";
import HostelReports from "../pages/Hostel/HostelReports";
import HostelTickets from "../pages/Hostel/HostelTickets";
// import HostelTickets from "../pages/Hostel/HostelTickets";
// import HostelTransfer from "../pages/Hostel/HostelTransfer";

// Existing Student Modules
import StudentHostelInbox from "../StudentModules/Hostel/HostelInbox"
import MyRoomPage from "../StudentModules/Hostel/MyRoomPage";
import MyHostelPermissions from "../StudentModules/Hostel/MyHostelPermissions";
import FeePaymentsPage from "../StudentModules/Hostel/FeePaymentPage";
import MessServicesPage from "../StudentModules/Hostel/MessServicesPage";
import MyAttendancePage from "../StudentModules/Hostel/MyAttendancePage";
import NoticesPage from "../StudentModules/Hostel/NoticesPage";

// New Student Modules - Room & Application
import ApplyForHostelPage from "../StudentModules/Hostel/ApplyForHostelPage";
import RoomDetailsHistoryPage from "../StudentModules/Hostel/RoomDetailsHistoryPage";
import RequestRoomChangePage from "../StudentModules/Hostel/RequestRoomChangePage";

// New Student Modules - Leave & Movement
import ApplyForLeavePage from "../StudentModules/Hostel/ApplyForLeavePage";
import GenerateQRGatePassPage from "../StudentModules/Hostel/GenerateQRGatePassPage";
import TrackLeaveReturnPage from "../StudentModules/Hostel/TrackLeaveReturnPage";

// New Student Modules - Fee Management
import ViewFeeDetailsPage from "../StudentModules/Hostel/ViewFeeDetailsPage";
import PayOnlinePage from "../StudentModules/Hostel/PayOnlinePage";
import DownloadReceiptsPage from "../StudentModules/Hostel/DownloadReceiptsPage";

// New Student Modules - Complaints & Feedback
import SubmitComplaintPage from "../StudentModules/Hostel/SubmitComplaintPage";
import TrackComplaintStatusPage from "../StudentModules/Hostel/TrackComplaintStatusPage";
import GiveFeedbackPage from "../StudentModules/Hostel/GiveFeedbackPage";

// New Student Modules - Visitors
import PreRegisterVisitorPage from "../StudentModules/Hostel/PreRegisterVisitorPage";
import VisitorLogsPage from "../StudentModules/Hostel/VisitorLogsPage";

// New Student Modules - Dashboard
import HostelDashboardPage from "../StudentModules/Hostel/HostelDashboardPage";
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
    </Routes>
  );
};

export default HostelRoutes;
