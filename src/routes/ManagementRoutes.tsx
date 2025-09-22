import React from "react";
import { Route, Routes } from "react-router-dom";
import TransportDashboard from "../pages/RegistorModule/Transport/TransportDashboard";
import FleetandStaffOverview from "../pages/RegistorModule/Transport/FleetandStaffOverview";
import FinancialControlandApprovals from "../pages/RegistorModule/Transport/FinancialControlandApprovals";
import MasterConfiguration from "../pages/RegistorModule/Transport/MasterConfiguration";
import TransportReports from "../pages/RegistorModule/Transport/TransportReports";

const CommonRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/transport/dashboard" element={<TransportDashboard />} />
      <Route path="/transport/fleet-staff" element={<FleetandStaffOverview />} />
      <Route path="/transport/financial-control" element={<FinancialControlandApprovals />} />
      <Route path="/transport/master-configuration" element={<MasterConfiguration />} />
      <Route path="/transport/reports" element={<TransportReports />} />
    </Routes>
  );
};

export default CommonRoutes;