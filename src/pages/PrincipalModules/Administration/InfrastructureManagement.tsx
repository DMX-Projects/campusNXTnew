<<<<<<< Updated upstream
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [activeTab, setActiveTab] = useState<string>('block-management');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-600">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-700 dark:text-gray-300"
              />
            </div>
            <button
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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

      {/* Quick Stats Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-8">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Quick Infrastructure Stats
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Real-time overview of infrastructure metrics</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
          <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Blocks className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">12</div>
            <div className="text-xs text-indigo-100">Blocks</div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Building2 className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">248</div>
            <div className="text-xs text-blue-100">Fixed Assets</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Wrench className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">15</div>
            <div className="text-xs text-green-100">Maintenance</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <ShoppingCart className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">28</div>
            <div className="text-xs text-orange-100">New Orders</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Package className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">156</div>
            <div className="text-xs text-purple-100">Stock Items</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">42</div>
            <div className="text-xs text-pink-100">Vendors</div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">98%</div>
            <div className="text-xs text-cyan-100">Efficiency</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Warehouse className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">₹2.4L</div>
            <div className="text-xs text-teal-100">Monthly Cost</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-lg p-3 text-white text-center hover:shadow-lg transition-shadow duration-300">
            <Settings className="w-6 h-6 mx-auto mb-1" />
            <div className="text-lg font-bold">5</div>
            <div className="text-xs text-red-100">Active Issues</div>
          </div>
        </div>
      </div>

      {/* Navigation Helper */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Module:</div>
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center">
            {getCurrentTab().icon}
            <span className="ml-2">{getCurrentTab().label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureManagement;
=======
import React from 'react'

const InfrastructureManagement = () => {
  return (
    <div>InfrastructureManagement</div>
  )
}

export default InfrastructureManagement
>>>>>>> Stashed changes
