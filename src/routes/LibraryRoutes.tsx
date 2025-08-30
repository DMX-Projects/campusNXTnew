
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components

import LibrarySearch from "../Pages/Library/Librarysearch";
import Categories from "../Pages/Library/Categories";
import OverDues from "../Pages/Library/OverDues";
import Alerts from "../Pages/Library/Alerts";
import BookIssueReturn from "../Pages/Library/BookIssueReturn";
import BookList from "../Pages/Library/BookList";
import Dashboard from "../Pages/Library/Dashboard";
import LateFee from "../Pages/Library/LateFee";
import RaiseTicket from "../Pages/Library/RaiseTicket"; 



const LibraryRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Administration Dashboard */}


      {/* Administration Sub-Routes */}
      <Route index element={<Dashboard />} />
      <Route path="library-search" element={<LibrarySearch />} />
        <Route path="categories" element={<Categories />} />
        <Route path="over-dues" element={<OverDues />} />
        <Route path="alerts" element={<Alerts/>} />
        <Route path="Bookissuereturn" element={<BookIssueReturn />} />
        <Route path="BookList" element={<BookList/>} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="LateFee" element={<LateFee/>} />
        {/* <Route path="MockData" element={<   mockData/>} />   */}
        <Route path="raise-ticket" element={<RaiseTicket/>} />

      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
};

export default LibraryRoutes;