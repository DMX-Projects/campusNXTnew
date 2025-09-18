import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your transport components
import Dashboard from "../pages/ChairpersonModule/Transport/Dashboard";
import FleetManagement from "../pages/ChairpersonModule/Transport/FleetManagement";
import RouteManagement from "../pages/ChairpersonModule/Transport/RouteManagement";
import StudentTransport from "../pages/ChairpersonModule/Transport/StudentTransport"; 
import DriverManagement from "../pages/ChairpersonModule/Transport/DriverManagement";
import DriverDetails from "../pages/ChairpersonModule/Transport/DriverDetails";
import Documents from "../pages/ChairpersonModule/Transport/Documents";
import Expenses from "../pages/ChairpersonModule/Transport/Expenses";
import FeeDetails from "../pages/ChairpersonModule/Transport/FeeDetails";
import LiveLocation from "../pages/ChairpersonModule/Transport/LiveLocation";
import Reports from "../pages/ChairpersonModule/Transport/Reports";
import StaffList from "../pages/ChairpersonModule/Transport/StaffList";
import StudentsList from "../pages/ChairpersonModule/Transport/StudentsList";
import Tickets from "../pages/ChairpersonModule/Transport/Tickets";
import AddFaculty from "../pages/ChairpersonModule/Transport/Components/addfaculty";
import Inbox from "../pages/ChairpersonModule/Transport/Inbox";
import AddStudent from "../pages/ChairpersonModule/Transport/Components/addstudent";
import EditStudent from "../pages/ChairpersonModule/Transport/Components/editstudent";
import ViewDetailsStudent from "../pages/ChairpersonModule/Transport/Components/viewdetailsstudent";
// import BusDetail from "../StudentModules/Transport/Stubusdetail";
import StudentFeeDetail from "../pages/StudentModules/Transport/StudentFeeDetail";
import BusLiveLocation from "../pages/StudentModules/Transport/BusLiveLocation";
import StudentRaiseTicket from "../pages/StudentModules/Transport/StudentRaiseTicket";

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
      <Route path="edit-student/:id" element={<EditStudent />} />
      <Route path="view-student/:id" element={<ViewDetailsStudent />} />
      {/* <Route path="StuTransport/bus-details" element={<BusDetail />} /> */}
      <Route path="StuTransport/fee-details" element={<StudentFeeDetail />} />
      <Route path="StuTransport/live-location" element={<BusLiveLocation />} />
      <Route path="StuTransport/tickets" element={<StudentRaiseTicket />} />

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