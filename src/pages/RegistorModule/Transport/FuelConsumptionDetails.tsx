import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Fuel, 
  TrendingUp, 
  Calendar, 
  Car,
  MapPin,
  Clock,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';

const FuelConsumptionDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sample fuel consumption data based on the screenshot
  const fuelData = {
    totalConsumption: '2,450L',
    avgEfficiency: '8.5 km/L',
    monthlyCost: '₹',
    efficiency: '+5.8%',
    vehicles: [
      { id: 'BUS-001', consumption: '890L', color: 'blue' },
      { id: 'BUS-002', consumption: '820L', color: 'purple' },
      { id: 'VAN-001', consumption: '420L', color: 'green' },
      { id: 'BUS-003', consumption: '750L', color: 'orange' }
    ]
  };

  const monthlyTrend = [
    { month: 'Jan', consumption: 2200, cost: 3520 },
    { month: 'Feb', consumption: 2350, cost: 3760 },
    { month: 'Mar', consumption: 2450, cost: 3920 },
    { month: 'Apr', consumption: 2380, cost: 3808 },
    { month: 'May', consumption: 2520, cost: 4032 }
  ];

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
                <Fuel className="w-6 h-6 mr-3 text-blue-500" />
                Fuel Consumption Analysis
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • Detailed fuel consumption report
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
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
                <Fuel className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                +2.3%
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Consumption
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {fuelData.totalConsumption}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                {fuelData.efficiency}
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Avg Efficiency
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {fuelData.avgEfficiency}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full dark:bg-orange-900/30 dark:text-orange-400">
                +1.2%
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Monthly Cost
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {fuelData.monthlyCost}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Active
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Vehicles
            </h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {fuelData.vehicles.length}
            </p>
          </div>
        </div>

        {/* Vehicle Breakdown */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Car className="w-5 h-5 mr-2 text-blue-500" />
            Vehicle-wise Fuel Consumption
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fuelData.vehicles.map((vehicle, index) => (
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
                  <div className={`w-3 h-3 rounded-full ${
                    vehicle.color === 'blue' ? 'bg-blue-500' :
                    vehicle.color === 'purple' ? 'bg-purple-500' :
                    vehicle.color === 'green' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}></div>
                </div>
                <p className="text-2xl font-bold">{vehicle.consumption}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monthly consumption
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend Table */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
         
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Consumption (L)</th>
                  <th className="text-left py-3 px-4 font-semibold">Cost (₹)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTrend.map((month, index) => (
                  <tr key={month.month} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4 font-medium">{month.month}</td>
                    <td className="py-3 px-4">{month.consumption.toLocaleString()}L</td>
                    <td className="py-3 px-4">₹{month.cost.toLocaleString()}</td>

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

export default FuelConsumptionDetails;
