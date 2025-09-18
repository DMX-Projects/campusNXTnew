import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage } from "../pages/ChairpersonModule/HomeTabPages/Home/HomePage";

import { UsersPage } from "../pages/ChairpersonModule/HomeTabPages/Users/UsersPage";
import { AddUserPage } from "../pages/ChairpersonModule/HomeTabPages/Users/AddUserPage";
import { EditUserPage } from "../pages/ChairpersonModule/HomeTabPages/Users/EditUserPage";
import { RolesPage } from "../pages/ChairpersonModule/HomeTabPages/Roles/RolesPage";
import { AddRolesPage } from "../pages/ChairpersonModule/HomeTabPages/Roles/AddRolesPage";
import { EditRolesPage } from "../pages/ChairpersonModule/HomeTabPages/Roles/EditRolesPage";
import { DepartmentsPage } from "../pages/ChairpersonModule/HomeTabPages/Departments/DepartmentsPage";
import { AddDepartmentsPage } from "../pages/ChairpersonModule/HomeTabPages/Departments/AddDepartmentsPage";
import { EditDepartmentsPage } from "../pages/ChairpersonModule/HomeTabPages/Departments/EditDepartmentsPage";
import { CoursesPage } from "../pages/ChairpersonModule/HomeTabPages/Courses/CoursesPage";
import { AddCoursesPage } from "../pages/ChairpersonModule/HomeTabPages/Courses/AddCoursesPage";
import { EditCoursesPage } from "../pages/ChairpersonModule/HomeTabPages/Courses/EditCoursesPage";
import { ClientsPage } from "../pages/ChairpersonModule/HomeTabPages/Clients/ClientsPage";
import { AddClientsPage } from "../pages/ChairpersonModule/HomeTabPages/Clients/AddClientsPage";
import { EditClientsPage } from "../pages/ChairpersonModule/HomeTabPages/Clients/EditClientsPage";
import { InstitutionsPage } from "../pages/ChairpersonModule/HomeTabPages/Institutions/InstitutionsPage";
import { AddInstitutionsPage } from "../pages/ChairpersonModule/HomeTabPages/Institutions/AddInstitutionsPage";
import { EditInstitutionsPage } from "../pages/ChairpersonModule/HomeTabPages/Institutions/EditInstitutionsPage";
import { ProgramsPage } from "../pages/ChairpersonModule/HomeTabPages/Programs/ProgramsPage";
import { AddProgramsPage } from "../pages/ChairpersonModule/HomeTabPages/Programs/AddProgramsPage";
import { EditProgramsPage } from "../pages/ChairpersonModule/HomeTabPages/Programs/EditProgramsPage";
import { GenericListPage } from "../pages/ChairpersonModule/HomeTabPages/Common/GenericListPage";
import Events from "../pages/ChairpersonModule/HomeTabPages/Events/Events";
import Notifications from "../pages/ChairpersonModule/HomeTabPages/Notifications/Notifications";
import Inbox from "../pages/ChairpersonModule/HomeTabPages/Inbox/Inbox";
import PlacementCalendar from "../pages/ChairpersonModule/HomeTabPages/Calender/Calender";
import  {HolidaysManager}  from "../pages/ChairpersonModule/HomeTabPages/HolidayList/HolidaysManager";
import { HolidayCalendar } from "../pages/ChairpersonModule/HomeTabPages/HolidayCalender/HolidayCalender";
import { TopicManager } from "../pages/ChairpersonModule/HomeTabPages/Topic/TopicManager";
import {LessonManager} from "../pages/ChairpersonModule/HomeTabPages/Lessons/LessonManager";
import {AffiliationsManager} from "../pages/ChairpersonModule/HomeTabPages/Affiliations/AffiliationsManager";

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
      <Route path="institutions/add" element={<AddInstitutionsPage />} />
      <Route path="institutions/edit/:id" element={<EditInstitutionsPage />} />
      <Route path="programs" element={<ProgramsPage />} />
      <Route path="programs/add" element={<AddProgramsPage />} />
      <Route path="programs/edit/:id" element={<EditProgramsPage />} />
      {/* Holiday and Calendar */}
      <Route path="holiday-list" element={<HolidaysManager />} />
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
