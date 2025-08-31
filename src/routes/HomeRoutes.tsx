import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "../pages/HomeTabPages/Home/HomePage";

import { UsersPage } from "../pages/HomeTabPages/Users/UsersPage";
import { AddUserPage } from "../pages/HomeTabPages/Users/AddUserPage";
import { EditUserPage } from "../pages/HomeTabPages/Users/EditUserPage";
import { RolesPage } from "../pages/HomeTabPages/Roles/RolesPage";
import { AddRolesPage } from "../pages/HomeTabPages/Roles/AddRolesPage";
import { EditRolesPage } from "../pages/HomeTabPages/Roles/EditRolesPage";
import { DepartmentsPage } from "../pages/HomeTabPages/Departments/DepartmentsPage";
import { AddDepartmentsPage } from "../pages/HomeTabPages/Departments/AddDepartmentsPage";
import { EditDepartmentsPage } from "../pages/HomeTabPages/Departments/EditDepartmentsPage";
import { CoursesPage } from "../pages/HomeTabPages/Courses/CoursesPage";
import { AddCoursesPage } from "../pages/HomeTabPages/Courses/AddCoursesPage";
import { EditCoursesPage } from "../pages/HomeTabPages/Courses/EditCoursesPage";
import { ClientsPage } from "../pages/HomeTabPages/Clients/ClientsPage";
import { AddClientsPage } from "../pages/HomeTabPages/Clients/AddClientsPage";
import { EditClientsPage } from "../pages/HomeTabPages/Clients/EditClientsPage";
import { InstitutionsPage } from "../pages/HomeTabPages/Institutions/InstitutionsPage";
import { ProgramsPage } from "../pages/HomeTabPages/Programs/ProgramsPage";
import { GenericListPage } from "../pages/HomeTabPages/Common/GenericListPage";
import Events from "../pages/HomeTabPages/Events/Events";
import Notifications from "../pages/HomeTabPages/Notifications/Notifications";
import Inbox from "../pages/HomeTabPages/Inbox/Inbox";
import PlacementCalendar from "../pages/HomeTabPages/Calender/Calender";
import { HolidayManager } from "../pages/HomeTabPages/HolidayList/HolidayManager";
import { HolidayCalendar } from "../pages/HomeTabPages/HolidayCalender/HolidayCalender";
import { TopicManager } from "../pages/HomeTabPages/Topic/TopicManager";
import {LessonManager} from "../pages/HomeTabPages/Lessons/LessonManager";
import {AffiliationsManager} from "../pages/HomeTabPages/Affiliations/AffiliationsManager";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect home index to users page */}
      {/* <Route index element={<HomePage />} /> */}
      <Route index element={<Navigate to="dashboard" replace />} />

      {/* <Route index element={<Navigate to="users" replace />} /> */}

      {/* Dashboard/Home overview page */}
      <Route path="dashboard" element={<HomePage />} />

      {/* Users routes */}
      <Route path="users" element={<UsersPage />} />
      <Route path="users/add" element={<AddUserPage />} />
      <Route path="users/edit/:id" element={<EditUserPage />} />

      {/* Other main sections */}
      <Route path="roles" element={<RolesPage />} />
      <Route path="roles/add" element={<AddRolesPage />} />
      <Route path="roles/edit/:id" element={<EditRolesPage />} />
      <Route path="departments" element={<DepartmentsPage />} />
      <Route path="departments/add" element={<AddDepartmentsPage />} />
      <Route path="departments/edit/:id" element={<EditDepartmentsPage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="courses/add" element={<AddCoursesPage />} />
      <Route path="courses/edit/:id" element={<EditCoursesPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="clients/add" element={<AddClientsPage />} />
      <Route path="clients/edit/:id" element={<EditClientsPage />} />
      <Route path="institutions" element={<InstitutionsPage />} />
      <Route path="programs" element={<ProgramsPage />} />

      
      <Route path="holiday-list" element={<HolidayManager />} />
      <Route path="holiday-calendar" element={<HolidayCalendar />} />
      <Route path="topics" element={<TopicManager />} />
      {/* Generic pages */}
      <Route
        path="lessons"
        element={
          <LessonManager
          />
        }
      />
      <Route
        path="academic-year"
        element={
          <GenericListPage
            title="Academic Year"
            description="Manage academic year settings"
            addPath="academic-year/add"
          />
        }
      />
      <Route
        path="affiliation"
        element={
          <AffiliationsManager
          />
        }
      />
      <Route path="my-calendar" element={<PlacementCalendar />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="events" element={<Events />} />
      <Route path="calendar" element={<PlacementCalendar />} />
      <Route path="*" element={<Navigate to="users" replace />} />
    </Routes>
  );
};

export default HomeRoutes;
