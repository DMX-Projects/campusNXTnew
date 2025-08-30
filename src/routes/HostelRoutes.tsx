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
// import HostelGeoFencing from "../pages/Hostel/HostelGeoFencing";
// import HostelReports from "../pages/Hostel/HostelReports";
// import HostelTickets from "../pages/Hostel/HostelTickets";
// import HostelTransfer from "../pages/Hostel/HostelTransfer";

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
      <Route path="fees" element={<HostelFeeDues />} />
      <Route path="inout" element={<HostelInOut />} /> 
       <Route path="permissions" element={<HostelPermissions />} />
        <Route path="inventory" element={<HostelInventory />} />
      {/* <Route path="geo-fencing" element={<HostelGeoFencing />} />
      <Route path="transfer" element={<HostelTransfer />} />
      <Route path="reports" element={<HostelReports />} />
      <Route path="tickets" element={<HostelTickets />} />   */}

      {/* Catch all → Redirect back to dashboard */}
      <Route path="*" element={<Navigate to="/hostel/dashboard" replace />} />
    </Routes>
  );
};

export default HostelRoutes;
