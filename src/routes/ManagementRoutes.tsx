import React from "react";
import { Route, Routes } from "react-router-dom";

//Admission Management Components
import AdmissionDashboard from "../pages/RegistorModule/Admission/RegistrarDashboard";
import CAPAdmin from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/CAPAdmin";
import SeatAllotmentPhaseI from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseI";
import SeatAllotmentPhaseII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseII";
import SeatAllotmentPhaseIII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseIII";
import ManagementAdmissionProcess from "../pages/RegistorModule/Admission/AdminssionProcess/ManagementAdmission/ManagementAdmissionProcess";
import SpotAdmissionMerit from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionMerit";
import SpotAdmissionFCFS from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionFCFS";
const CommonRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/Admission/dashboard" element={<AdmissionDashboard />} />
      <Route path="/admission-process/cap" element={<CAPAdmin />} />
      <Route path="/admission-process/seat-allotment/phase-1" element={<SeatAllotmentPhaseI />} />
      <Route path="/admission-process/seat-allotment/phase-2" element={<SeatAllotmentPhaseII />} />
      <Route path="/admission-process/seat-allotment/phase-3" element={<SeatAllotmentPhaseIII />} />
      <Route path="/admission-process/management-quota" element={<ManagementAdmissionProcess />} />
      <Route path="/admission-process/spot-admission/merit-based" element={<SpotAdmissionMerit />} />
      <Route path="/admission-process/spot-admission/first-come" element={<SpotAdmissionFCFS />} />
    </Routes>
  );
};

export default CommonRoutes;