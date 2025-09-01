import React from 'react';
import { Routes, Route,  } from 'react-router-dom';

// Import placement components
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
import PlacementResults from '../pages/Placements/PlacementResults';
import Reports from '../pages/Placements/Reports';
import NotifyStu from '../pages/Placements/NotifyStu';
import ScheduleTest from '../pages/Placements/ScheduleTest';

const PlacementsRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Placements Dashboard */}
      

      {/* Placements Routes */}
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
      <Route path="placements-results" element={<PlacementResults />} />
      <Route path="placement-reports" element={<Reports />} />
      <Route path="notify-students" element={<NotifyStu />} />
      <Route path="schedule-test" element={<ScheduleTest />} />

    </Routes>
  );
};

export default PlacementsRoutes;
