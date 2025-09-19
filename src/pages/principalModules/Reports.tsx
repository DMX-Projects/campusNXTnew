import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  User,
  Building,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  View,
} from 'lucide-react';

// Type definitions
interface Report {
  id: string;
  reportName: string;
  department: string;
  submittedBy: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Approved' | 'Rejected';
  reportType: string;
  fileSize?: string;
  description?: string;
}

const Reports: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Theme toggle state
  const [isDark, setIsDark] = useState(() => {
    // Initialize based on user's system preference or saved setting
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Sample data and constants here (departments, reportTypes, sampleReports) unchanged
  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Information Technology',
    'Mathematics',
    'Physics',
    'Chemistry',
  ];

  const reportTypes = [
    'Academic Performance',
    'Student Progress',
    'Faculty Evaluation',
    'Course Completion',
    'Examination Results',
    'Research Progress',
    'Laboratory Report',
    'Project Status',
  ];

  const sampleReports: Report[] = [
    {
      id: '1',
      reportName: 'Semester End Academic Report',
      department: 'Computer Science',
      submittedBy: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      status: 'Approved',
      reportType: 'Academic Performance',
      fileSize: '2.4 MB',
      description: 'Comprehensive analysis of student performance for Fall 2023',
    },
    {
      id: '2',
      reportName: 'Faculty Development Report',
      department: 'Electronics',
      submittedBy: 'Prof. Michael Chen',
      date: '2024-01-14',
      status: 'Reviewed',
      reportType: 'Faculty Evaluation',
      fileSize: '1.8 MB',
      description: 'Quarterly faculty development and training progress',
    },
    {
      id: '3',
      reportName: 'Student Progress Analysis',
      department: 'Mechanical',
      submittedBy: 'Dr. Emily Williams',
      date: '2024-01-13',
      status: 'Pending',
      reportType: 'Student Progress',
      fileSize: '3.1 MB',
      description: 'Mid-semester student academic progress evaluation',
    },
    {
      id: '4',
      reportName: 'Research Project Updates',
      department: 'Information Technology',
      submittedBy: 'Prof. David Kumar',
      date: '2024-01-12',
      status: 'Approved',
      reportType: 'Research Progress',
      fileSize: '4.2 MB',
      description: 'Ongoing research projects and their current status',
    },
    {
      id: '5',
      reportName: 'Laboratory Equipment Status',
      department: 'Physics',
      submittedBy: 'Dr. Lisa Zhang',
      date: '2024-01-11',
      status: 'Rejected',
      reportType: 'Laboratory Report',
      fileSize: '1.5 MB',
      description: 'Current status and maintenance needs of lab equipment',
    },
    {
      id: '6',
      reportName: 'Course Completion Statistics',
      department: 'Mathematics',
      submittedBy: 'Prof. Robert Taylor',
      date: '2024-01-10',
      status: 'Pending',
      reportType: 'Course Completion',
      fileSize: '2.8 MB',
      description: 'Statistical analysis of course completion rates',
    },
  ];

  // Filter logic unchanged except dateRange is unused in filter here (can be implemented)
  const filteredReports = sampleReports.filter((report) => {
    const matchesDepartment = selectedDepartment === 'all' || report.department === selectedDepartment;
    const matchesReportType = selectedReportType === 'all' || report.reportType === selectedReportType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSearch =
      searchTerm === '' ||
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesReportType && matchesStatus && matchesSearch;
  });

  const totalReports = sampleReports.length;
  const pendingReports = sampleReports.filter((r) => r.status === 'Pending').length;
  const reviewedReports = sampleReports.filter((r) => r.status === 'Reviewed').length;
  const approvedReports = sampleReports.filter((r) => r.status === 'Approved').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'Reviewed':
        return <Eye className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-600';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-600';
      case 'Reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600';
    }
  };

  // Theme classes updated with dark variants
  const themeClasses = {
    main: 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
    card: 'bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    cardSecondary: 'bg-gray-100 dark:bg-gray-700',
    input:
      'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400',
    button:
      'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    text: 'text-gray-600 dark:text-gray-300',
    textSecondary: 'text-blue-600 dark:text-blue-400',
    border: 'border-gray-200 dark:border-gray-700',
    tableHeader: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200',
    tableRow: 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700',
    iconColor: 'text-blue-500 dark:text-blue-400',
    themeButton:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${themeClasses.main} p-4 lg:p-6`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Theme toggle */}
        <div className="flex justify-end mb-4">
          {/* <button
            className={`${themeClasses.themeButton} px-4 py-2 rounded-md`}
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button> */}
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <FileText className={`w-8 h-8 ${themeClasses.iconColor}`} />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Academic Reports</h1>
              <p className={`text-sm ${themeClasses.text} mt-1`}>
                Here the principal can see all the Academic reports sent by the HOD&apos;s of different Departments
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`${themeClasses.card} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text}`}>Total Reports</p>
                <p className="text-2xl font-bold">{totalReports}</p>
              </div>
              <FileText className={`w-8 h-8 ${themeClasses.iconColor}`} />
            </div>
          </div>

          <div className={`${themeClasses.card} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text}`}>Pending</p>
                <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">{pendingReports}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
            </div>
          </div>

          <div className={`${themeClasses.card} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text}`}>Reviewed</p>
                <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">{reviewedReports}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          <div className={`${themeClasses.card} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text}`}>Approved</p>
                <p className="text-2xl font-bold text-green-500 dark:text-green-400">{approvedReports}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`${themeClasses.card} rounded-lg p-4 mb-6`}>
          <div className="flex items-center gap-2 mb-4">
            <Filter className={`w-5 h-5 ${themeClasses.iconColor}`} />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Types</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={`w-full px-3 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text}`} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 ${themeClasses.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className={`${themeClasses.card} rounded-lg overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${themeClasses.tableHeader}`}>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Report Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Department</th>
                  <th className="px-4 py-3 text-left font-semibold">Submitted By</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className={`${themeClasses.tableRow} border-t ${themeClasses.border} transition-colors duration-200`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium">{report.reportName}</div>
                        <div className={`text-sm ${themeClasses.text}`}>{report.reportType}</div>
                        {report.fileSize && <div className={`text-xs ${themeClasses.text}`}>{report.fileSize}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Building className={`w-4 h-4 ${themeClasses.iconColor}`} />
                        {report.department}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <User className={`w-4 h-4 ${themeClasses.iconColor}`} />
                        {report.submittedBy}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-4 h-4 ${themeClasses.iconColor}`} />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          report.status,
                        )}`}
                      >
                        {getStatusIcon(report.status)}
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className={`p-2 ${themeClasses.button} rounded-lg hover:bg-opacity-80 transition-colors`}
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button className="p-2 rounded-lg" title="More Actions">
                          <View className={`w-4 h-4 ${themeClasses.iconColor}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className={`text-center py-8 ${themeClasses.text}`}>
              <FileText className={`w-12 h-12 mx-auto mb-3 ${themeClasses.text} opacity-50`} />
              <p>No reports found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`mt-6 ${themeClasses.card} rounded-lg p-4`}>
          <p className={`text-sm ${themeClasses.text}`}>
            <strong>Note:</strong> The Academic Reports page will show a list of reports submitted by HODs from different departments. At
            the top, filters like Department, Report Type, and Date Range. Below, a table view lists each report with columns such as Report
            Name, Department, Submitted By, Date, and Status. On the right side of each row, a Download button allows the Principal to
            instantly download the report in PDF/Excel. A quick summary card section at the top (e.g., Total Reports, Pending, Reviewed) gives
            an overview, making the page both informative and action-focused.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
