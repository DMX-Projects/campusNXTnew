
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components

import Dashboard from "../Pages/Transport/Dashboard";
import FleetManagement from "../Pages/Transport/FleetManagement";
import RouteManagement from "../Pages/Transport/RouteManagement";
import StudentTransport from "../Pages/Transport/StudentTransport"; 
import DriverManagement from "../Pages/Transport/DriverManagement";
import DriverDetails from "../Pages/Transport/DriverDetails";
import Documents from "../Pages/Transport/Documents";
import Expenses from "../Pages/Transport/Expenses";
import FeeDetails from "../Pages/Transport/FeeDetails";
import LiveLocation from "../Pages/Transport/LiveLocation";
import Reports from "../Pages/Transport/Reports";
import StaffList from "../Pages/Transport/StaffList";
import StudentsList from "../Pages/Transport/StudentsList";
import Tickets from "../Pages/Transport/Tickets";




const TransportRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Administration Dashboard */}


      {/* Administration Sub-Routes */}
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="mockData" element={<mockData />} /> */}
        <Route path="fleet-management" element={<FleetManagement />} />
        <Route path="route-management" element={<RouteManagement />} />
      
        <Route path="driver-management" element={<DriverManagement />} />
        <Route path="student-transport" element={<StudentTransport />} />
        <Route path="StudentsList" element={<StudentTransport />} />
        <Route path="DriverDetails" element={<DriverDetails />} />
        <Route path="Documents" element={<Documents />} />
        <Route path="Expenses" element={<Expenses />} />
        <Route path="FeeDetails" element={<FeeDetails />} />
        <Route path="LiveLocation" element={<LiveLocation />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="staffList" element={<StaffList />} />
        <Route path="StudentList" element={<StudentsList/>} />
        <Route path="Tickets" element={<Tickets/>} />
    

      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/transport" replace />} />
    </Routes>
  );
};

export default TransportRoutes;