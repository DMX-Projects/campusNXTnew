import React from "react";
import { Route, Routes } from "react-router-dom";


import  AcademicCalender  from "../pages/Components/AcademicCalender";
import CommonInbox from "../pages/Components/CommonInbox";
const CommonRoutes: React.FC = () => {
  return (
    <Routes> 
        <Route path="/academics/academic-calendar" element={<AcademicCalender />} />
        <Route path="/common/inbox" element={<CommonInbox />} />
    </Routes>
  );
};

export default CommonRoutes;