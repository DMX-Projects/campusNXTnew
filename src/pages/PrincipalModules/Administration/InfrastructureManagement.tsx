
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Wrench,
  History,
  ShoppingCart,
  Package,
  Warehouse,
  Users,
  TrendingUp,
  Sun,
  Moon,
  Calendar,
  BarChart3,
  Settings,
  Blocks
} from 'lucide-react';

// Import your existing components - correct component names
import BlockManagement from '../../../pages/RegistorModule/Infrastructure/BlockManagement';
import FixedAssessment from '../../../pages/RegistorModule/Infrastructure/FixedAssesment';
import MaintenanceCosts from '../../../pages/RegistorModule/Infrastructure/MaintenanceCosts';
import ManagementHistory from '../../../pages/RegistorModule/Infrastructure/ManagementHistory';
import NewAssetPurchase from '../../../pages/RegistorModule/Infrastructure/NewAssetPurchase';
import PurchaseManagement from '../../../pages/RegistorModule/Infrastructure/PurchaseManagement';
import { StockControl } from '../../../pages/RegistorModule/Infrastructure/StockControl';
import StockManagement from '../../../pages/RegistorModule/Infrastructure/StockManagement';
import VendorManagement from '../../../pages/RegistorModule/Infrastructure/VendorManagement';

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  description: string;
}

const InfrastructureManagement: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>('block-management');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const tabs: TabConfig[] = [
    {
      id: 'block-management',
      label: 'Block Management',
      icon: <Blocks className="w-5 h-5" />,
      component: BlockManagement,
      description: 'Manage college blocks, buildings, and physical infrastructure'
    },
    {
      id: 'fixed-assessment',
      label: 'Fixed Assessment',
      icon: <Building2 className="w-5 h-5" />,
      component: FixedAssessment,
      description: 'Assess and evaluate fixed assets and infrastructure'
    },
    {
      id: 'maintenance-costs',
      label: 'Maintenance Costs',
      icon: <Wrench className="w-5 h-5" />,
      component: MaintenanceCosts,
      description: 'Track and manage maintenance expenses'
    },
    {
      id: 'management-history',
      label: 'Management History',
      icon: <History className="w-5 h-5" />,
      component: ManagementHistory,
      description: 'View infrastructure management history and logs'
    },
    {
      id: 'new-asset-purchase',
      label: 'New Asset Purchase',
      icon: <ShoppingCart className="w-5 h-5" />,
      component: NewAssetPurchase,
      description: 'Purchase new assets and equipment'
    },
    {
      id: 'purchase-management',
      label: 'Purchase Management',
      icon: <Package className="w-5 h-5" />,
      component: PurchaseManagement,
      description: 'Manage all purchase orders and procurement'
    },
    {
      id: 'stock-control',
      label: 'Stock Control',
      icon: <BarChart3 className="w-5 h-5" />,
      component: StockControl,
      description: 'Control and monitor stock levels'
    },
    {
      id: 'stock-management',
      label: 'Stock Management',
      icon: <Warehouse className="w-5 h-5" />,
      component: StockManagement,
      description: 'Comprehensive stock and inventory management'
    },
    {
      id: 'vendor-management',
      label: 'Vendor Management',
      icon: <Users className="w-5 h-5" />,
      component: VendorManagement,
      description: 'Manage vendors and supplier relationships'
    }
  ];

  const getCurrentTab = () => {
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  };

  const ActiveComponent = getCurrentTab().component;

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300 ease-in-out';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex-1 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-blue-500" />
              Infrastructure Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive management of college infrastructure, blocks, assets, and vendor relationships
            </p>
          </div>
        </div>

        {/* Current Tab Info */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              {getCurrentTab().icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {getCurrentTab().label}
              </h2>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {getCurrentTab().description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap min-w-max ${
                activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[600px] overflow-hidden">
          <div className="h-full">
            <React.Suspense 
              fallback={
                <div className="flex items-center justify-center h-96">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading {getCurrentTab().label}...</p>
                  </div>
                </div>
              }
            >
              <ActiveComponent />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureManagement;
