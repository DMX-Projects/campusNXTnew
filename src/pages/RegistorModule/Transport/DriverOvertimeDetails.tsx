import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Calendar, 
  Car,
  MapPin,
  TrendingUp,
  DollarSign,
  Download,
  AlertCircle,
  CheckCircle,
  User
} from 'lucide-react';

const DriverOvertimeDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const overtimeData = {
    totalAmount: '₹680',
    totalHours: 24,
    avgRate: '₹28.33/hr',
    drivers: 3,
    overtimeRecords: [
      { 
        driverId: 'DRV-001', 
        name: 'Rajesh Kumar', 
        hours: 12, 
        rate: 30, 
        amount: '₹360', 
        date: '2024-01-13',
        vehicle: 'BUS-001',
        reason: 'Emergency route coverage'
      },
      { 
        driverId: 'DRV-003', 
        name: 'Suresh Patel', 
        hours: 8, 
        rate: 25, 
        amount: '₹200', 
        date: '2024-01-13',
        vehicle: 'VAN-001',
        reason: 'Late evening pickup'
      },
      { 
        driverId: 'DRV-005', 
        name: 'Amit Singh', 
        hours: 4, 
        rate: 30, 
        amount: '₹120', 
        date: '2024-01-13',
        vehicle: 'BUS-002',
        reason: 'Extra shift coverage'
      }
    ]
  };

  const monthlyOvertimeStats = [
    { month: 'Nov', hours: 18, amount: 540 },
    { month: 'Dec', hours: 22, amount: 660 },
    { month: 'Jan', hours: 24, amount: 680 }
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
                <Users className="w-6 h-6 mr-3 text-orange-500" />
                Driver Overtime Details
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Request ID: {requestId} • Driver overtime compensation tracking
              </p>
            </div>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Timesheet
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Current
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Amount
            </h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {overtimeData.totalAmount}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Hours
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Total Hours
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {overtimeData.totalHours}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                Average
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Avg Rate
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {overtimeData.avgRate}
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Drivers
            </h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {overtimeData.drivers}
            </p>
          </div>
        </div>

        {/* Overtime Records */}
        <div className={`p-6 rounded-xl shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-500" />
            Overtime Records
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className="text-left py-3 px-4 font-semibold">Driver</th>
                  <th className="text-left py-3 px-4 font-semibold">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold">Hours</th>
                  <th className="text-left py-3 px-4 font-semibold">Rate</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody>
                {overtimeData.overtimeRecords.map((record) => (
                  <tr key={record.driverId} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-sm text-gray-500">{record.driverId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{record.vehicle}</td>
                    <td className="py-3 px-4">{record.hours} hrs</td>
                    <td className="py-3 px-4">₹{record.rate}/hr</td>
                    <td className="py-3 px-4 font-semibold text-orange-600 dark:text-orange-400">{record.amount}</td>
                    <td className="py-3 px-4 text-sm">{record.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Statistics */}
        <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Monthly Overtime Statistics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {monthlyOvertimeStats.map((stat, index) => (
              <div key={stat.month} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg">{stat.month} 2024</h4>
                  {index > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      stat.hours > monthlyOvertimeStats[index - 1].hours
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {stat.hours > monthlyOvertimeStats[index - 1].hours ? '↑' : '↓'}
                      {Math.abs(stat.hours - monthlyOvertimeStats[index - 1].hours)} hrs
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hours:</span>
                    <span className="font-semibold">{stat.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold text-orange-600">₹{stat.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverOvertimeDetails;
