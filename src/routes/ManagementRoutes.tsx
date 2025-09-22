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

    </Routes>
  );
};

export default CommonRoutes;