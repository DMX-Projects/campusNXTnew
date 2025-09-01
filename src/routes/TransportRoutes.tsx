import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your transport components
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