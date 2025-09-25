import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Car, 
  TrendingUp, 
  Calendar, 
  Wrench,
  MapPin,
  Clock,
  DollarSign,
  Download,
  AlertCircle,
  Users
} from 'lucide-react';

const VehicleCostAnalysisDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sample vehicle cost data based on the screenshot
  const costData = {
    totalCost: '₹45,230',
    vehicles: 12,
    avgCostPerVehicle: '₹3,769',
    highestCost: 'BUS-001 (₹5,240)',
    vehicleBreakdown: [
      { id: 'BUS-001', cost: '₹5,240', color: 'blue', type: 'Bus', status: 'Active' },
      { id: 'BUS-002', cost: '₹4,180', color: 'purple', type: 'Bus', status: 'Active' },
      { id: 'VAN-001', cost: '₹2,890', color: 'green', type: 'Van', status: 'Active' },
      { id: 'BUS-003', cost: '₹4,320', color: 'orange', type: 'Bus', status: 'Maintenance' }
    ]
  };

  const monthlyTrend = [
    { month: 'Jan', cost: 42800, vehicles: 12 },
    { month: 'Feb', cost: 44200, vehicles: 12 },
    { month: 'Mar', cost: 45230, vehicles: 12 },
    { month: 'Apr', cost: 43800, vehicles: 11 },
    { month: 'May', cost: 46100, vehicles: 13 }
  ];

  const maintenanceCosts = [
    { 
      vehicle: 'BUS-001', 
      serviceType: 'Engine Service',
      totalCost: '₹8,500',
      laborCost: '₹3,200',
      partsCost: '₹5,300',
      status: 'Completed',
      category: 'Major Repair'
    },
    { 
      vehicle: 'BUS-002', 
      serviceType: 'Oil Change & Filter',
      totalCost: '₹2,800',
      laborCost: '₹1,200',
      partsCost: '₹1,600',
      status: 'Completed',
      category: 'Routine Maintenance'
    },
    { 
      vehicle: 'VAN-001', 
      serviceType: 'Brake Pad Replacement',
      totalCost: '₹4,200',
      laborCost: '₹1,800',
      partsCost: '₹2,400',
      status: 'Completed',
      category: 'Safety Maintenance'
    },
    { 
      vehicle: 'BUS-003', 
      serviceType: 'Transmission Repair',
      totalCost: '₹6,800',
      laborCost: '₹2,500',
      partsCost: '₹4,300',
      status: 'In Progress',
      category: 'Major Repair'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Major Repair': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'Safety Maintenance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Routine Maintenance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/management/transport/financial-control')}
            className={`flex items-center mb-4 px-3 py-2 rounded-lg transition-colors ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Financial Control
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Car className="w-6 h-6 mr-3 text-green-500" />
                Vehicle Maintanence Cost Analysis
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • Comprehensive vehicle cost breakdown
              </p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Current
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Cost
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {costData.totalCost}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Active
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Vehicles
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {costData.vehicles}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                Average
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Avg Cost Per Vehicle
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {costData.avgCostPerVehicle}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                Highest
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Highest Cost
            </h3>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {costData.highestCost}
            </p>
          </div>
        </div>

        {/* Vehicle Breakdown */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Car className="w-5 h-5 mr-2 text-green-500" />
            Vehicle Cost Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {costData.vehicleBreakdown.map((vehicle, index) => (
              <div 
                key={vehicle.id}
                className={`p-4 rounded-lg border-l-4 ${
                  vehicle.color === 'blue' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  vehicle.color === 'purple' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' :
                  vehicle.color === 'green' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                  'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{vehicle.id}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-2xl font-bold">{vehicle.cost}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {vehicle.type} • Monthly cost
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Costs */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-orange-500" />
            Maintenance Costs
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold">Service Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Cost</th>
                  <th className="text-left py-3 px-4 font-semibold">Labor Cost</th>
                  <th className="text-left py-3 px-4 font-semibold">Parts Cost</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceCosts.map((maintenance, index) => (
                  <tr key={maintenance.vehicle} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4 font-medium">{maintenance.vehicle}</td>
                    <td className="py-3 px-4">{maintenance.serviceType}</td>
                    <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">{maintenance.totalCost}</td>
                    <td className="py-3 px-4">{maintenance.laborCost}</td>
                    <td className="py-3 px-4">{maintenance.partsCost}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(maintenance.category)}`}>
                        {maintenance.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(maintenance.status)}`}>
                        {maintenance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trend Table */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>

          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Cost</th>
                  <th className="text-left py-3 px-4 font-semibold">Vehicles</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg Cost/Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTrend.map((month, index) => (
                  <tr key={month.month} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4 font-medium">{month.month}</td>
                    <td className="py-3 px-4">₹{month.cost.toLocaleString()}</td>
                    <td className="py-3 px-4">{month.vehicles}</td>
                    <td className="py-3 px-4">₹{Math.round(month.cost / month.vehicles).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCostAnalysisDetails;
