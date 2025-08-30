import React from 'react';
import { BarChart3, Download, TrendingUp, TrendingDown, Users, Bus, DollarSign, AlertTriangle } from 'lucide-react';
import StatCard from './StatCard';
import { students, buses, drivers, feeRecords, expenses } from './data/mockData';

export default function Reports() {
  const totalStudents = students.length;
  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const presentDrivers = drivers.filter(driver => driver.attendanceToday === 'present').length;
  const totalRevenue = feeRecords.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.monthlyFee, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingFees = feeRecords.filter(fee => fee.status !== 'paid').length;

  const reportsData = [
    {
      title: 'Daily Transport Report',
      description: 'Student attendance, driver attendance, and route efficiency',
      date: 'Today',
      type: 'daily'
    },
    {
      title: 'Monthly Financial Report',
      description: 'Fee collection, expenses, and profit analysis',
      date: 'February 2024',
      type: 'financial'
    },
    {
      title: 'Bus Maintenance Report',
      description: 'Maintenance schedules, costs, and vehicle condition',
      date: 'Last 30 days',
      type: 'maintenance'
    },
    {
      title: 'Route Optimization Report',
      description: 'Route efficiency and fuel consumption analysis',
      date: 'Last week',
      type: 'routes'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Reports & Analytics</h3>
          <p className="text-sm text-gray-600">Comprehensive transport system analysis</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          change="12%"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Buses"
          value={activeBuses}
          change="100%"
          changeType="neutral"
          icon={Bus}
          color="green"
        />
        <StatCard
          title="Revenue"
          value={`$${totalRevenue}`}
          change="8%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Pending Fees"
          value={pendingFees}
          change="2"
          changeType="negative"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800">Financial Overview</h4>
          <div className="flex space-x-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">Monthly</button>
            <button className="text-sm font-medium text-blue-600">Yearly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">${totalExpenses}</p>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">${totalRevenue - totalExpenses}</p>
            <p className="text-sm text-gray-600">Net Profit</p>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Available Reports</h4>
        
        <div className="space-y-4">
          {reportsData.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">{report.title}</h5>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Generated: {report.date}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    View Report
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}