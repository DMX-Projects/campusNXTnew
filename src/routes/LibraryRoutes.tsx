
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components

import LibrarySearch from "../pages/Library/Librarysearch";
import Categories from "../pages/Library/Categories";
import OverDues from "../pages/Library/OverDues";
import Alerts from "../pages/Library/Alerts";
import BookIssueReturn from "../pages/Library/BookIssueReturn";
import BookList from "../pages/Library/BookList";
import Dashboard from "../pages/Library/Dashboard";
import LateFee from "../pages/Library/LateFee";
import RaiseTicket from "../pages/Library/RaiseTicket"; 
import Inbox from "../pages/Library/Inbox";
import  Reports from "../pages/Library/Reports";
import BookReservation from "../pages/Library/BookReservation";

import SearchBook from "../StudentModules/Library/Faculty/SearchBook";
import RequestBookIssue from "../StudentModules/Library/Faculty/RequestBookIssue";
import OverdueBooks from "../StudentModules/Library/Faculty/OverDueBooks";
import BookReservationStatus from "../StudentModules/Library/Faculty/BookReservationStatus";
import FacultyDashboard from "../StudentModules/Library/Faculty/FacultyDashboard";
import MyIssuedBooks from "../StudentModules/Library/Faculty/MyIssueBooks";



const LibraryRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Administration Dashboard */}


      {/* Administration Sub-Routes */}
      <Route index element={<Dashboard />} />
      <Route path="library-search" element={<LibrarySearch />} />
        <Route path="categories" element={<Categories />} />
        <Route path="overdue-list" element={<OverDues />} />
        <Route path="alerts" element={<Alerts/>} />
        <Route path="book-issue" element={<BookIssueReturn />} />
        <Route path="list-of-books" element={<BookList/>} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="late-fee" element={<LateFee/>} />
        {/* <Route path="MockData" element={<   mockData/>} />   */}
        <Route path="raise-ticket" element={<RaiseTicket/>} />
        <Route path="inbox" element={<Inbox/>} />
        <Route path="reports" element={<Reports/>}/>
        <Route path="book-reservation" element={<BookReservation/>}/>
        <Route path="Search-book" element={<SearchBook/>}/>
        <Route  path="request-book" element={<RequestBookIssue/>}/>
        <Route path="over-due-books" element={<OverdueBooks/>}/>
        <Route path="faculty/book-reservation" element={<BookReservationStatus/>}/>
        <Route path="faculty/dashboard" element={<FacultyDashboard/>}/>
        <Route path="faculty/book-issue" element={<MyIssuedBooks/>}/>



       

      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
};

export default LibraryRoutes;