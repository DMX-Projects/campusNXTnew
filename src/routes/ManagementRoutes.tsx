import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/RegistorModule/HR_Management/Dashboard";
import Employeedatabase from "../pages/RegistorModule/HR_Management/Employeedatabase";
import LeavePolicy from "../pages/RegistorModule/HR_Management/Leave&policy";
import PayrollManagement from "../pages/RegistorModule/HR_Management/Payrollmanagement";
import Requirementmanagement from "../pages/RegistorModule/HR_Management/Requirementmanagement";

const CommonRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/hr/dashboard" element={<Dashboard />} />
      <Route path="/hr/employee-database" element={<Employeedatabase />} />
      <Route path="/hr/leave-policy" element={<LeavePolicy />} />
      <Route path="/hr/payroll" element={<PayrollManagement />} />
      <Route path="/hr/recruitment" element={<Requirementmanagement />} />
    </Routes>
  );
};

export default CommonRoutes;