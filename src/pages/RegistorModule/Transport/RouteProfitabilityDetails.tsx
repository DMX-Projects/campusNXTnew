import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Route, 
  TrendingUp, 
  Calendar, 
  Car,
  Users,
  DollarSign,
  Download,
  MapPin,
  Clock,
  Fuel,
  Wrench
} from 'lucide-react';

const RouteProfitabilityDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Sample route profitability data
  const routeData = {
    id: requestId,
    name: 'Route A',
    distance: '25 km',
    duration: '45 min',
    stops: 12,
    vehicles: 3,
    students: 85,
    revenue: {
      monthly: '₹45,200',
      quarterly: '₹1,35,600',
      annual: '₹5,42,400'
    },
    expenses: {
      fuel: '₹18,500',
      maintenance: '₹8,200',
      driverSalary: '₹12,000',
      insurance: '₹3,100',
      total: '₹32,800'
    },
    profit: {
      amount: '₹12,400',
      margin: '27.4%'
    },
    trends: [
      { month: 'Jan', revenue: 42800, expenses: 31200, profit: 11600 },
      { month: 'Feb', revenue: 44100, expenses: 32100, profit: 12000 },
      { month: 'Mar', revenue: 45200, expenses: 32800, profit: 12400 },
      { month: 'Apr', revenue: 43900, expenses: 31800, profit: 12100 },
      { month: 'May', revenue: 46500, expenses: 33200, profit: 13300 }
    ]
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
                <Route className="w-6 h-6 mr-3 text-green-500" />
                Route Profitability Analysis
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • {routeData.name} Performance Report
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
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Revenue
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Monthly Revenue
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {routeData.revenue.monthly}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                Expenses
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Expenses
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {routeData.expenses.total}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Profit
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Net Profit
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {routeData.profit.amount}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                Margin
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Profit Margin
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {routeData.profit.margin}
            </p>
          </div>
        </div>

        {/* Route Information */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            Route Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6" />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Distance</p>
              <p className="text-xl font-semibold">{routeData.distance}</p>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Duration</p>
              <p className="text-xl font-semibold">{routeData.duration}</p>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Car className="w-6 h-6" />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Vehicles</p>
              <p className="text-xl font-semibold">{routeData.vehicles}</p>
            </div>
            
            <div className="text-center">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6" />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Students</p>
              <p className="text-xl font-semibold">{routeData.students}</p>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            Expense Breakdown
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Fuel</p>
                  <p className="text-xl font-bold">{routeData.expenses.fuel}</p>
                </div>
                <Fuel className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Maintenance</p>
                  <p className="text-xl font-bold">{routeData.expenses.maintenance}</p>
                </div>
                <Wrench className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Driver Salary</p>
                  <p className="text-xl font-bold">{routeData.expenses.driverSalary}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Insurance</p>
                  <p className="text-xl font-bold">{routeData.expenses.insurance}</p>
                </div>
                <Car className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
            Monthly Performance Trend
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold">Expenses</th>
                  <th className="text-left py-3 px-4 font-semibold">Profit</th>
                  <th className="text-left py-3 px-4 font-semibold">Margin</th>
                </tr>
              </thead>
              <tbody>
                {routeData.trends.map((trend, index) => (
                  <tr key={trend.month} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4 font-medium">{trend.month}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">₹{trend.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">₹{trend.expenses.toLocaleString()}</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">₹{trend.profit.toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold">{((trend.profit / trend.revenue) * 100).toFixed(1)}%</td>
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

export default RouteProfitabilityDetails;
