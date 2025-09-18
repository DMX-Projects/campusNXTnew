
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components

import LibrarySearch from "../pages/ChairpersonModule/Library/Librarysearch";
import Categories from "../pages/ChairpersonModule/Library/Categories";
import OverDues from "../pages/ChairpersonModule/Library/OverDues";
import Alerts from "../pages/ChairpersonModule/Library/Alerts";
import BookIssueReturn from "../pages/ChairpersonModule/Library/BookIssueReturn";
import BookList from "../pages/ChairpersonModule/Library/BookList";
import Dashboard from "../pages/ChairpersonModule/Library/Dashboard";
import LateFee from "../pages/ChairpersonModule/Library/LateFee";
import RaiseTicket from "../pages/ChairpersonModule/Library/RaiseTicket"; 
import Inbox from "../pages/ChairpersonModule/Library/Inbox";
import  Reports from "../pages/ChairpersonModule/Library/Reports";
import BookReservation from "../pages/ChairpersonModule/Library/BookReservation";

import SearchBook from "../pages/StudentModules/Library/Faculty/SearchBook";
// import RequestBookIssue from "../StudentModules/Library/Faculty/RequestBookIssue";
import OverdueBooks from "../pages/StudentModules/Library/Faculty/OverDueBooks";
import BookReservationStatus from "../pages/StudentModules/Library/Faculty/BookReservationStatus";
import FacultyDashboard from "../pages/StudentModules/Library/Faculty/FacultyDashboard";
import MyIssuedBooks from "../pages/StudentModules/Library/Faculty/MyIssueBooks";
import RenewalRequests from "../pages/StudentModules/Library/Faculty/RenewalRequests";
import MyBorrowedBooks from "../pages/StudentModules/Library/Faculty/MyBorrowedBooks";
import RequestBookIssue from "../pages/StudentModules/Library/Faculty/RequestBookIssue";



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
        <Route path="faculty/renewal-request" element={<RenewalRequests/>}/>
        <Route path="faculty/myborrowed-books" element={<MyBorrowedBooks/>}/>



       

      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
};

export default LibraryRoutes;