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

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect home index to users page */}
      <Route index element={<Navigate to="users" replace />} />
      
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

      {/* Generic pages */}
      <Route
        path="holiday-list"
        element={
          <GenericListPage
            title="Holiday List"
            description="Manage institutional holidays and breaks"
            addPath="holiday-list/add"
          />
        }
      />
      <Route
        path="holiday-calendar"
        element={
          <GenericListPage
            title="Holiday Calendar"
            description="View and manage holiday calendar"
            addPath="holiday-calendar/add"
          />
        }
      />
      <Route
        path="topics"
        element={
          <GenericListPage
            title="Topics"
            description="Manage course topics and curriculum"
            addPath="topics/add"
          />
        }
      />
      <Route
        path="lessons"
        element={
          <GenericListPage
            title="Lessons"
            description="Manage lesson plans and materials"
            addPath="lessons/add"
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
          <GenericListPage
            title="Affiliation"
            description="Manage institutional affiliations"
            addPath="affiliation/add"
          />
        }
      />
      <Route
        path="my-calendar"
        element={<PlacementCalendar />}
      />
      <Route path="inbox" element={<Inbox />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="events" element={<Events />} />
      <Route path="calendar" element={<PlacementCalendar />} />
      <Route path="*" element={<Navigate to="users" replace />} />
    </Routes>
  );
};

export default HomeRoutes;