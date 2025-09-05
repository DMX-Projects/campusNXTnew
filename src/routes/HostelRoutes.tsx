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

      {/* Catch all → Redirect back to dashboard */}
      <Route path="*" element={<Navigate to="/hostel/dashboard" replace />} />
    </Routes>
  );
};

export default HostelRoutes;
