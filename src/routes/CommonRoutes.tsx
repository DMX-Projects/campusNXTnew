import React from "react";
import { Route, Routes } from "react-router-dom";


import  AcademicCalender  from "../pages/Components/AcademicCalender";
const CommonRoutes: React.FC = () => {
  return (
    <Routes> 
        <Route path="/academics/academic-calendar" element={<AcademicCalender />} />
    </Routes>
  );
};

export default CommonRoutes;