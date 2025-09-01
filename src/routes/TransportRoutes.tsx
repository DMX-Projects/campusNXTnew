import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your transport components
import Dashboard from "../pages/Transport/Dashboard";
import FleetManagement from "../pages/Transport/FleetManagement";
import RouteManagement from "../pages/Transport/RouteManagement";
import StudentTransport from "../pages/Transport/StudentTransport"; 
import DriverManagement from "../pages/Transport/DriverManagement";
import DriverDetails from "../pages/Transport/DriverDetails";
import Documents from "../pages/Transport/Documents";
import Expenses from "../pages/Transport/Expenses";
import FeeDetails from "../pages/Transport/FeeDetails";
import LiveLocation from "../pages/Transport/LiveLocation";
import Reports from "../pages/Transport/Reports";
import StaffList from "../pages/Transport/StaffList";
import StudentsList from "../pages/Transport/StudentsList";
import Tickets from "../pages/Transport/Tickets";
import AddFaculty from "../pages/Transport/Components/addfaculty";
import Inbox from "../pages/Transport/Inbox";
import AddStudent from "../pages/Transport/Components/addstudent";

const TransportRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route - shows Dashboard component */}
      <Route index element={<Dashboard />} />
      
      {/* Match NavigationContext sidebar paths exactly */}
      <Route path="inbox" element={<Inbox />} /> {/* Use Inbox component when you have it */}
      <Route path="bus-details" element={<FleetManagement />} />
      <Route path="student-list" element={<StudentsList />} />
      <Route path="faculty" element={<StaffList />} />
      <Route path="fee-details" element={<FeeDetails />} />
      <Route path="driver-details" element={<DriverDetails />} />
      <Route path="expense" element={<Expenses />} />
      <Route path="live-location" element={<LiveLocation />} />
      <Route path="vehicle-documents" element={<Documents />} />
      <Route path="reports" element={<Reports />} />
      <Route path="raise-ticket" element={<Tickets />} />
      <Route path="add-faculty" element={<AddFaculty />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="add-student" element={<AddStudent />} />

      {/* Additional routes for your existing components */}
      <Route path="fleet-management" element={<FleetManagement />} />
      <Route path="route-management" element={<RouteManagement />} />
      <Route path="driver-management" element={<DriverManagement />} />
      <Route path="student-transport" element={<StudentTransport />} />
      <Route path="documents" element={<Documents />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="tickets" element={<Tickets />} />
      
      {/* Catch all - redirect to transport root */}
      <Route path="*" element={<Navigate to="/transport" replace />} />
    </Routes>
  );
};

export default TransportRoutes;