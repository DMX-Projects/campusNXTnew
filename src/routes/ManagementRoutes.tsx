import React from "react";
import { Route, Routes } from "react-router-dom";


//infrastructure Routes
import InventoryTable from "../pages/RegistorModule/Infrastructure/StockControl";
import InfrastructureStockManagement from "../pages/RegistorModule/Infrastructure/StockManagement";
import AssetManagement from "../pages/RegistorModule/Infrastructure/FixedAssesment";
import NewPurchaseKanban from "../pages/RegistorModule/Infrastructure/NewAssetPurchase";
import PurchaseManagement from "../pages/RegistorModule/Infrastructure/PurchaseManagement";
import MaintenanceCosts from "../pages/RegistorModule/Infrastructure/MaintenanceCosts";
import VendorManagement from "../pages/RegistorModule/Infrastructure/VendorManagement";
import ManagementHistory from "../pages/RegistorModule/Infrastructure/ManagementHistory";
import TransportDashboard from "../pages/RegistorModule/Transport/TransportDashboard";
import FleetandStaffOverview from "../pages/RegistorModule/Transport/FleetandStaffOverview";
import FinancialControlandApprovals from "../pages/RegistorModule/Transport/FinancialControlandApprovals";
import MasterConfiguration from "../pages/RegistorModule/Transport/MasterConfiguration";
import TransportReports from "../pages/RegistorModule/Transport/TransportReports";

import FinancialsAndFees from "../pages/RegistorModule/Hostel/FinancialsAndFees";
import ConfigurationAndRules from "../pages/RegistorModule/Hostel/ConfigurationAndRules";
import InfrastructureOverview from "../pages/RegistorModule/Hostel/InfrastructureOverview";
import StaffAndRoles from "../pages/RegistorModule/Hostel/StaffAndRoles";
import Reports from "../pages/RegistorModule/Hostel/Reports";
import AdmissionDashboard from "../pages/RegistorModule/Admission/RegistrarDashboard";
import CAPAdmin from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/CAPAdmin";
import SeatAllotmentPhaseI from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseI";
import SeatAllotmentPhaseII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseII";
import SeatAllotmentPhaseIII from "../pages/RegistorModule/Admission/AdminssionProcess/CAPAdmission/SeatAllotmentPhaseIII";
import ManagementAdmissionProcess from "../pages/RegistorModule/Admission/AdminssionProcess/ManagementAdmission/ManagementAdmissionProcess";
import SpotAdmissionMerit from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionMerit";
import SpotAdmissionFCFS from "../pages/RegistorModule/Admission/AdminssionProcess/SpotAdmission/SpotAdmissionFCFS";  
import FinancialApprovals from "../pages/PrincipalModules/Administration/FinancialApprovals";
import FacultyAndStaffOversight from "../pages/PrincipalModules/Administration/FacultyAndStaffOversight";
import CircularsAndEventManagement from "../pages/PrincipalModules/Administration/CircularsAndEventManagement";
import InfrastructureReports from "../pages/PrincipalModules/Administration/InfrastructureReports";
import DashBoard from "../pages/PrincipalModules/Administration/DashBoard"; 
import Dashboard from "../pages/StudentModules/Adminstration/Dashboard";
import MyProfile from "../pages/StudentModules/Adminstration/MyProfile";
import Finance from "../pages/StudentModules/Adminstration/Finance";
import Notifications from "../pages/StudentModules/Adminstration/Notification";
const CommonRoutes: React.FC = () => {
  return (
    <Routes>
            <Route path="/infrastructure-management/inventory/stock-control" element={<InventoryTable/>}/>
            <Route path="/infrastructure-management/inventory/stock-management" element={<InfrastructureStockManagement/>}/>
            <Route path="/infrastructure-management/asset/fixed-assets" element={<AssetManagement/>}/>
            <Route path="/infrastructure-management/asset/new-purchase" element={<NewPurchaseKanban/>}/>
            <Route path="/infrastructure-management/purchase" element={<PurchaseManagement/>}/>
            <Route path="/infrastructure-management/maintenance-costs/income-expenditure" element={<MaintenanceCosts/>}/>
            <Route path="/infrastructure-management/maintenance-costs/vendor-management" element={<VendorManagement/>}/>
            <Route path="/infrastructure-management/maintenance-costs/history" element={<ManagementHistory/>}/>
            <Route path="/transport/fleet-staff" element={<FleetandStaffOverview />} />
      <Route path="/transport/financial-control" element={<FinancialControlandApprovals />} />
      <Route path="/transport/master-configuration" element={<MasterConfiguration />} />
      <Route path="/transport/reports" element={<TransportReports />} />

      <Route path="financials-fees" element={<FinancialsAndFees />} />
      <Route path="configuration-rules" element={<ConfigurationAndRules />} />
      <Route path="infrastructure-overview" element={<InfrastructureOverview />} />
      <Route path="staff-roles" element={<StaffAndRoles />} />
      <Route path="infra-reports" element={<Reports />} />
      <Route path="/Admission/dashboard" element={<AdmissionDashboard />} />
      <Route path="/admission-process/cap" element={<CAPAdmin />} />
      <Route path="/admission-process/seat-allotment/phase-1" element={<SeatAllotmentPhaseI />} />
      <Route path="/admission-process/seat-allotment/phase-2" element={<SeatAllotmentPhaseII />} />
      <Route path="/admission-process/seat-allotment/phase-3" element={<SeatAllotmentPhaseIII />} />
      <Route path="/admission-process/management-quota" element={<ManagementAdmissionProcess />} />
      <Route path="/admission-process/spot-admission/merit-based" element={<SpotAdmissionMerit />} />
      <Route path="/admission-process/spot-admission/first-come" element={<SpotAdmissionFCFS />} />
      <Route path="/principal/financial-approvals" element={<FinancialApprovals />} />
      <Route path="/principal/faculty-staff" element={<FacultyAndStaffOversight />} />
      <Route path="/principal/circulars-events" element={<CircularsAndEventManagement />} />
      <Route path="/principal/infrastructure-reports" element={<InfrastructureReports />} />
      <Route path="/principal/dashboard" element={<DashBoard />} />
       <Route path="/student/dashboard" element={<Dashboard />} />
       <Route path="/student/profile" element={<MyProfile />} />
        <Route path="/student/finance" element={<Finance />} />
        <Route path="/student/notifications" element={<Notifications/>} />
       
      

    </Routes>
  );
};

export default CommonRoutes;