// src/routes/AdministrationRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components
import UploadStudentList from "../pages/administration/UploadStudentList";
import StudentEnquirySystem from "../pages/administration/StudentEnquirySystem";

import EmployeeAttendance from "../pages/administration/EmployeeAttendance";
import FacultyDetails from "../pages/administration/FacultyDetails";
import Admissions from "../pages/administration/Admissions";
import InventoryAssets from "../pages/administration/InventoryAssets";
import CampusCalendar from "../pages/administration/CampusCalendar";
import Payroll from "../pages/administration/Payroll";
import EmployeeLeaves from "../pages/administration/EmployeeLeaves";
import ClassroomDetails from "../pages/administration/ClassroomDetails";
import Appraisals from "../pages/administration/Appraisals";
import Visitors from "../pages/administration/Visitors";
import InvoicesReceipts from "../pages/administration/InvoicesReceipts";
import FeeManagement from "../pages/administration/FeeManagement";

const AdministrationRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Administration Dashboard 
      <Route index element={<div className="p-6">Administration Dashboard</div>} />*/}

      {/* Administration Sub-Routes */}
      <Route index element={<UploadStudentList />} />
      <Route path="upload-student-list" element={<UploadStudentList />} />
       <Route path="student-enquiry" element={<StudentEnquirySystem />} />
        <Route path="employee-attendance" element={<EmployeeAttendance />} />
      <Route path="faculty-details" element={<FacultyDetails />} />
      <Route path="admissions" element={<Admissions />} />
      <Route path="inventory-assets" element={<InventoryAssets />} />
      <Route path="campus-calendar" element={<CampusCalendar/>}/>
       <Route path="payroll" element={<Payroll />} />
      <Route path="employee-leaves" element={<EmployeeLeaves />} />
      <Route path="classroom-details" element={<ClassroomDetails />} />
      <Route path="appraisals" element={<Appraisals />} />
      <Route path="visitors" element={<Visitors />} />
      <Route path="invoices-receipts" element={<InvoicesReceipts />} />
      <Route path="fee-management" element={<FeeManagement/>}/>
      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/administration" replace />} />
    </Routes>
  );
};

export default AdministrationRoutes;
