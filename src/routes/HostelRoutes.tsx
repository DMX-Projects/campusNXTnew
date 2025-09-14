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
import StudentHostelInbox from "../StudentModules/Hostel/HostelInbox"
import MyRoomPage from "../StudentModules/Hostel/MyRoomPage";
import MyHostelPermissions from "../StudentModules/Hostel/MyHostelPermissions";
import FeePaymentsPage from "../StudentModules/Hostel/FeePaymentPage";
import MessServicesPage from "../StudentModules/Hostel/MessServicesPage";
import MyAttendancePage from "../StudentModules/Hostel/MyAttendancePage";
import NoticesPage from "../StudentModules/Hostel/NoticesPage";

//Warden module routes
import BuildingAndBlocks from "../WardenModules/Hostel/Hostel_Setup/BuildingAndBlocks";
import AddNewHostel from "../WardenModules/Components/AddNewHostel";
import CreatePolicies from "../WardenModules/Components/CreatePolicies";
import RulesAndPolicies from "../WardenModules/Hostel/Hostel_Setup/RulesAndPolicies";
import RoomAllotment from "../WardenModules/Hostel/Occupancy_Rooms/RoomAllotment";
import ChangeRoomRequests from "../WardenModules/Hostel/Occupancy_Rooms/ChangeRoomRequests";
import HostelApplications from "../WardenModules/Hostel/ApplictionAndRooms/HostelApplications";
import LeaveRequests from "../WardenModules/Hostel/ApplictionAndRooms/LeaveRequests";
import EntryExitLogs from "../WardenModules/Hostel/ApplictionAndRooms/EntryExitLogs";
import FeeCollection from "../WardenModules/Hostel/FeeManagement/FeeCollection";
import StudentFeeDetail from "../WardenModules/Hostel/FeeManagement/StudentFeesDetail";
import FeesReport from "../WardenModules/Hostel/FeeManagement/FeesReport";
import Complaints from "../WardenModules/Hostel/ComplaintAndDicipline/Complaints";
import DisciplineCases from "../WardenModules/Hostel/ComplaintAndDicipline/DisciplineCases";
import ConductReport from "../WardenModules/Hostel/ComplaintAndDicipline/ConductReport";
import VisitorApproval from "../WardenModules/Hostel/Visitors/VisitorApproval";
import VisitorLogs from "../WardenModules/Hostel/Visitors/VisitorLogs";
import OccupencyAndFeesReport from "../WardenModules/Hostel/Reports/OccupencyAndFeesReport";
import ComplaintsAndDiscipline from "../WardenModules/Hostel/Reports/ComplaintsAndDisciplineReport";
import Notification from "../WardenModules/Hostel/Notification";
const HostelRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default → Redirect /hostel to /hostel/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      {/* Hostel pages */}
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
      <Route path="student/inbox" element={<StudentHostelInbox />} />
      <Route path="student/my-room" element={<MyRoomPage />} />
      <Route path="student/student-permissions" element={<MyHostelPermissions />} />
      <Route path="student/fee-details" element={<FeePaymentsPage />} />
      <Route path="student/mess-services" element={<MessServicesPage />} />
      <Route path="student/attendance" element={<MyAttendancePage />} />
      <Route path="student/notices" element={<NoticesPage />} />

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
      <Route path="/visitors/logs" element={<VisitorLogs />} />
      <Route path="/reports/occupancy" element={<OccupencyAndFeesReport />} />
      <Route path="/reports/complaints" element={<ComplaintsAndDiscipline />} />
      <Route path="/notifications" element={<Notification />} />
      {/* Catch all → Redirect back to dashboard */}
      <Route path="*" element={<Navigate to="/hostel/dashboard" replace />} />
    </Routes>
  );
};

export default HostelRoutes;
