import React, { useState } from 'react';
import { BarChart, Download, Calendar, TrendingUp, Users, Book, IndianRupee, FileText } from 'lucide-react';
import { dashboardStats, bookIssues, books, members, fines } from './Data/mockData';

export default function Reports() {
  const [reportType, setReportType] = useState('circulation');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    { id: 'circulation', name: 'Circulation Report', icon: TrendingUp },
    { id: 'inventory', name: 'Inventory Report', icon: Book },
    { id: 'members', name: 'Membership Report', icon: Users },
    { id: 'financial', name: 'Financial Report', icon: IndianRupee },
    { id: 'overdue', name: 'Overdue Report', icon: FileText }
  ];

  const generateMockData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      issues: Math.floor(Math.random() * 100) + 50,
      returns: Math.floor(Math.random() * 90) + 45,
      fines: Math.floor(Math.random() * 500) + 200
    }));
  };

  const chartData = generateMockData();

  const renderCirculationReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800">Books Issued</h4>
          <p className="text-2xl font-bold text-blue-900 mt-1">{dashboardStats.booksIssued}</p>
          <p className="text-sm text-blue-600">+12.5% from last month</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800">Books Returned</h4>
          <p className="text-2xl font-bold text-green-900 mt-1">221</p>
          <p className="text-sm text-green-600">+8.3% from last month</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-orange-800">Renewals</h4>
          <p className="text-2xl font-bold text-orange-900 mt-1">45</p>
          <p className="text-sm text-orange-600">+23.1% from last month</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-800">Avg. Loan Period</h4>
          <p className="text-2xl font-bold text-purple-900 mt-1">12.3</p>
          <p className="text-sm text-purple-600">days</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Circulation Trends</h3>
        <div className="h-64 flex items-end space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col justify-end h-48 space-y-1">
                <div 
                  className="bg-blue-500 rounded-t"
                  style={{ height: `${(data.issues / 150) * 100}%` }}
                  title={`Issues: ${data.issues}`}
                ></div>
                <div 
                  className="bg-green-500"
                  style={{ height: `${(data.returns / 150) * 100}%` }}
                  title={`Returns: ${data.returns}`}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Issues</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Returns</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800">Total Books</h4>
          <p className="text-2xl font-bold text-blue-900 mt-1">{dashboardStats.totalBooks}</p>
          <p className="text-sm text-blue-600">Across all categories</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800">Available</h4>
          <p className="text-2xl font-bold text-green-900 mt-1">1,016</p>
          <p className="text-sm text-green-600">81.3% of collection</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-800">Currently Issued</h4>
          <p className="text-2xl font-bold text-red-900 mt-1">{dashboardStats.booksIssued}</p>
          <p className="text-sm text-red-600">18.7% of collection</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Collection by Category</h3>
        <div className="space-y-3">
          {['Fiction', 'Technology', 'Science', 'History', 'Biography'].map((category, index) => {
            const percentage = [35, 25, 20, 12, 8][index];
            return (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800">Fines Collected</h4>
          <p className="text-2xl font-bold text-green-900 mt-1">₹{dashboardStats.finesCollected.toFixed(2)}</p>
          <p className="text-sm text-green-600">This month</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-800">Outstanding Fines</h4>
          <p className="text-2xl font-bold text-yellow-900 mt-1">₹342.75</p>
          <p className="text-sm text-yellow-600">Pending collection</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800">Annual Revenue</h4>
          <p className="text-2xl font-bold text-blue-900 mt-1">₹14,970</p>
          <p className="text-sm text-blue-600">Projected</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h3>
        <div className="h-48 flex items-end space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-500 rounded-t"
                style={{ height: `${(data.fines / 500) * 100}%` }}
                title={`Revenue: ₹${data.fines}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    switch (reportType) {
      case 'circulation': return renderCirculationReport();
      case 'inventory': return renderInventoryReport();
      case 'financial': return renderFinancialReport();
      default: return renderCirculationReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart className="h-6 w-6 text-blue-600" />
            Reports & Analytics
          </h2>
          <p className="text-gray-600">Generate and view library reports</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Types Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                reportType === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{type.name}</p>
            </button>
          );
        })}
      </div>

      {/* Report Content */}
      {renderReport()}

      {/* Recent Reports */}Pending Fines

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Monthly Circulation Report - December 2024', date: '2024-12-01', size: '2.3 MB' },
            { name: 'Inventory Status Report', date: '2024-11-28', size: '1.8 MB' },
            { name: 'Financial Summary - Q4 2024', date: '2024-11-25', size: '945 KB' },
            { name: 'Overdue Books Report', date: '2024-11-20', size: '1.2 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{report.name}</p>
                  <p className="text-xs text-gray-500">Generated on {new Date(report.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{report.size}</span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}