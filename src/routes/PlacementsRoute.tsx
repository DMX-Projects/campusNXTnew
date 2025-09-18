import React from 'react';
import { Routes, Route,  } from 'react-router-dom';

// Import placement components
import Companies from '../pages/ChairpersonModule/Placements/Placement_Companies/Companies';
import Inbox from '../pages/ChairpersonModule/Placements/Inbox';
import Calendar from '../pages/ChairpersonModule/Placements/Calender';
import Placementhistory from '../pages/ChairpersonModule/Placements/PlacementHistory';
import EligibleStudentList from '../pages/ChairpersonModule/Placements/Placement_Companies/EligibleStudentList';
import AssesmentTest from '../pages/ChairpersonModule/Placements/AssesmentTest';
import Internships from '../pages/ChairpersonModule/Placements/Internships';
import PlacedStuDetails from '../pages/ChairpersonModule/Placements/PlacedStuDetails';
import PlacementCourses from '../pages/ChairpersonModule/Placements/PlacementCourses';
import RaiseTicket from '../pages/ChairpersonModule/Placements/RaiseTicket';
import ResumeManagement from '../pages/ChairpersonModule/Placements/ResumeManagement';
import DriverRegistration from '../pages/ChairpersonModule/Placements/Placement_Companies/DriverRegistration';
import PlacementResults from '../pages/ChairpersonModule/Placements/PlacementResults';
import Reports from '../pages/ChairpersonModule/Placements/Reports';
import NotifyStu from '../pages/ChairpersonModule/Placements/NotifyStu';
import ScheduleTest from '../pages/ChairpersonModule/Placements/ScheduleTest';
{/* Student Placements Routes */}
import StudentPlacementDashboard from '../pages/StudentModules/Placements/StudentPlacementDashboard';
import StudentPlacementInbox from '../pages/StudentModules/Placements/StudentPlacementInbox';
import StudentPlacementCalendar from '../pages/StudentModules/Placements/StudentPlacementCalendar';
import StudentCompanyDrives from '../pages/StudentModules/Placements/StudentCompanyDrives';
import PlacementPrepMaterials from '../pages/StudentModules/Placements/PlacementPrepMaterials';
import PlacementMockTests from '../pages/StudentModules/Placements/PlacementMockTests';
import StudentIntershipsOrOffers from '../pages/StudentModules/Placements/StudentInternshipsOrOffers';
import StudentPlacementRaiseTicket from '../pages/StudentModules/Placements/StudentPlacementRaiseTicket';
import StudentResumeManager from '../pages/StudentModules/Placements/StudentResumeManager';
import StudentPlacementResult from '../pages/StudentModules/Placements/StudentPlacementResult';
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
{/* Student Placements Routes */}
      <Route path='student/dashboard' element={<StudentPlacementDashboard />} />
      <Route path='student/inbox' element={<StudentPlacementInbox />} />
      <Route path='student/placement-calendar' element={<StudentPlacementCalendar />} />
      <Route path='student/companies' element={<StudentCompanyDrives />} />
      <Route path='student/prep-materials' element={<PlacementPrepMaterials />} />
      <Route path='student/mock-tests' element={<PlacementMockTests />} />
      <Route path='student/internships-offers' element={<StudentIntershipsOrOffers />} />
      <Route path='student/raise-ticket' element={<StudentPlacementRaiseTicket />} />
      <Route path='student/resume-manager' element={<StudentResumeManager />} />
      <Route path='student/placement-results' element={<StudentPlacementResult />} />
    </Routes>
  );
};

export default PlacementsRoutes;
