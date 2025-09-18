// src/routes/AdministrationRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your administration components
import UploadStudentList from "../pages/ChairpersonModule/administration/UploadStudentList";
import StudentEnquirySystem from "../pages/ChairpersonModule/administration/StudentEnquirySystem";

import EmployeeAttendance from "../pages/ChairpersonModule/administration/EmployeeAttendance";
import FacultyDetails from "../pages/ChairpersonModule/administration/FacultyDetails";
import Admissions from "../pages/ChairpersonModule/administration/Admissions";
import InventoryAssets from "../pages/ChairpersonModule/administration/InventoryAssets";
import CampusCalendar from "../pages/ChairpersonModule/administration/CampusCalendar";
import Payroll from "../pages/ChairpersonModule/administration/Payroll";
import EmployeeLeaves from "../pages/ChairpersonModule/administration/EmployeeLeaves";
import ClassroomDetails from "../pages/ChairpersonModule/administration/ClassroomDetails";
import Appraisals from "../pages/ChairpersonModule/administration/Appraisals";
import Visitors from "../pages/ChairpersonModule/administration/Visitors";
import InvoicesReceipts from "../pages/ChairpersonModule/administration/InvoicesReceipts";
import LeaveType from "../pages/ChairpersonModule/administration/LeaveType"
import FeeTypesContent from "../pages/ChairpersonModule/administration/Feetype/FeeTypesContent";
import StudentForm from "../pages/StudentModules/Adminstration/StudentForm";
import FeeManagement from "../pages/StudentModules/Adminstration/FeeManagement";
import Mycertificates from "../pages/StudentModules/Adminstration/Mycertificates";
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
      <Route path="masters/fee-types" element={<FeeTypesContent />} />
      <Route path="masters/leave-types" element={<LeaveType />} />
      <Route path="student-form" element={<StudentForm/>}/>
      <Route path="fee-management" element={<FeeManagement/>}/>
      <Route path="my-certificates" element={<Mycertificates/>}/>

      {/* Catch all for invalid administration routes */}
      <Route path="*" element={<Navigate to="/administration" replace />} />
    </Routes>
  );
};

export default AdministrationRoutes;
