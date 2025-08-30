import React from 'react';
import { Routes, Route,  } from 'react-router-dom';

// Import placement components
import PlacementDashboard from '../pages/Placements/Dashboard';
import Companies from '../pages/Placements/Placement_Companies/Companies';
import Inbox from '../pages/Placements/Inbox';
import Calendar from '../pages/Placements/Calender';
import Placementhistory from '../pages/Placements/PlacementHistory';
import EligibleStudentList from '../pages/Placements/Placement_Companies/EligibleStudentList';
import AssesmentTest from '../pages/Placements/AssesmentTest';
import Internships from '../pages/Placements/Internships';
import PlacedStuDetails from '../pages/Placements/PlacedStuDetails';
import PlacementCourses from '../pages/Placements/PlacementCourses';
import RaiseTicket from '../pages/Placements/RaiseTicket';
import ResumeManagement from '../pages/Placements/ResumeManagement';
import DriverRegistration from '../pages/Placements/Placement_Companies/DriverRegistration';


const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Placements Dashboard */}
      <Route index element={<PlacementDashboard />} />

      {/* Placements Routes */}
      <Route path="dashboard" element={<PlacementDashboard />} />
      <Route path="Placement_Companies/companies" element={<Companies />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="history" element={<Placementhistory />} />
      <Route path="Placement_Companies/eligible-students" element={<EligibleStudentList />} />
      <Route path="assesment-test" element={<AssesmentTest />} />
      <Route path="internships" element={<Internships />} />
      <Route path="placed-student-details" element={<PlacedStuDetails />} />
      <Route path="placement-courses" element={<PlacementCourses />} />
      <Route path="raise-ticket" element={<RaiseTicket />} />
      <Route path="resume-management" element={<ResumeManagement />} />
      <Route path="placement-Companies/driver-registration" element={<DriverRegistration />} />

    </Routes>
  );
};

export default PlacementsRoutes;
