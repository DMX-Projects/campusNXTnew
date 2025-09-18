import React, { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('semester');
  const [showExportForm, setShowExportForm] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const performanceData = {
    labels: ['Computer Networks', 'Database Management', 'Operating Systems', 'Software Engineering', 'Web Technologies'],
    scores: [82, 76, 89, 78, 85]
  };

  const attendanceData = {
    present: 85,
    absent: 10,
    late: 5
  };

  const handleExport = () => {
    alert(`Exporting ${reportType} report for ${dateRange} in ${exportFormat.toUpperCase()} format`);
    setShowExportForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="performance">Performance Report</option>
            <option value="attendance">Attendance Report</option>
            <option value="grades">Grade Distribution</option>
            <option value="comparison">Comparative Analysis</option>
          </select>

          {/* Open Export Form */}
          <button 
            onClick={() => setShowExportForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Export Form Modal */}
      {showExportForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Report</h3>

            <div className="space-y-4">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="performance">Performance Report</option>
                  <option value="attendance">Attendance Report</option>
                  <option value="grades">Grade Distribution</option>
                  <option value="comparison">Comparative Analysis</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="semester">This Semester</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowExportForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semester">This Semester</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Performance Chart Visualization</p>
                <p className="text-sm text-gray-500">Interactive charts would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Subject-wise Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Performance</h3>
            <div className="space-y-4">
              {performanceData.labels.map((subject, index) => (
                <div key={subject} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 flex-1">{subject}</span>
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{width: `${performanceData.scores[index]}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">
                      {performanceData.scores[index]}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Exams</span>
                <span className="text-lg font-bold text-gray-900">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Students Evaluated</span>
                <span className="text-lg font-bold text-gray-900">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="text-lg font-bold text-green-600">78.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pass Rate</span>
                <span className="text-lg font-bold text-blue-600">91%</span>
              </div>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Present</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${attendanceData.present}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{attendanceData.present}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Absent</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: `${attendanceData.absent}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{attendanceData.absent}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Late</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: `${attendanceData.late}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{attendanceData.late}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Exam evaluation completed</p>
                  <p className="text-xs text-gray-500">Computer Networks - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Hall tickets generated</p>
                  <p className="text-xs text-gray-500">December 2024 session - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Marks uploaded</p>
                  <p className="text-xs text-gray-500">Database Management - 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
