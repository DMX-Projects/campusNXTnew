import React, { useState } from 'react';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'Operational' | 'Analytical' | 'Strategic';
  category: string;
  dateGenerated?: string;
  generatedBy?: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  downloadFormat?: 'PDF' | 'Excel' | 'CSV';
  size?: string;
  scheduledDate?: string;
  detailedDescription?: string;
  parameters?: string[];
  dataPoints?: number;
  lastAccessed?: string;
}

interface ReportRequest {
  id: string;
  reportType: string;
  requestedBy: string;
  requestDate: string;
  dateRange: {
    from: string;
    to: string;
  };
  filters?: string[];
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
}

const ReportsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reports' | 'analytics' | 'generate' | 'requests'>('reports');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'occupancy' | 'financial' | 'maintenance' | 'student' | 'inventory'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedScheduledReport, setSelectedScheduledReport] = useState<Report | null>(null);

  // Sample reports data with additional details
  const availableReports: Report[] = [
    {
      id: 'RPT001', 
      title: 'Monthly Occupancy Report', 
      description: 'Detailed room occupancy statistics by block and room type',
      type: 'Operational', 
      category: 'occupancy', 
      status: 'Ready',
      dateGenerated: '2025-08-31', 
      generatedBy: 'System', 
      downloadFormat: 'PDF', 
      size: '2.3 MB',
      detailedDescription: 'Comprehensive analysis of room occupancy rates across all hostel blocks. Includes vacancy rates, peak occupancy periods, room type preferences, and capacity utilization metrics.',
      parameters: ['Block-wise occupancy', 'Room type analysis', 'Vacancy trends', 'Peak periods'],
      dataPoints: 1250,
      lastAccessed: '2025-09-01'
    },
    {
      id: 'RPT002', 
      title: 'Fee Collection Summary', 
      description: 'Complete overview of fee payments, dues, and defaulters',
      type: 'Operational', 
      category: 'financial', 
      status: 'Ready',
      dateGenerated: '2025-08-31', 
      generatedBy: 'Finance Team', 
      downloadFormat: 'Excel', 
      size: '1.8 MB',
      detailedDescription: 'Detailed financial report covering fee collection status, outstanding dues, payment patterns, and defaulter analysis with recovery recommendations.',
      parameters: ['Payment status', 'Outstanding dues', 'Defaulter list', 'Recovery analysis'],
      dataPoints: 890,
      lastAccessed: '2025-08-31'
    },
    {
      id: 'RPT003', 
      title: 'Maintenance Expense Analysis', 
      description: 'Monthly maintenance costs breakdown by category and block',
      type: 'Operational', 
      category: 'maintenance', 
      status: 'Ready',
      dateGenerated: '2025-08-30', 
      generatedBy: 'Maintenance Team', 
      downloadFormat: 'PDF', 
      size: '3.1 MB',
      detailedDescription: 'Comprehensive maintenance cost analysis including preventive maintenance, emergency repairs, vendor performance, and cost optimization opportunities.',
      parameters: ['Cost breakdown', 'Vendor analysis', 'Block-wise expenses', 'Maintenance types'],
      dataPoints: 456,
      lastAccessed: '2025-08-30'
    },
    {
      id: 'RPT009', 
      title: 'Budget Utilization Report', 
      description: 'Quarterly budget allocation vs actual expenditure analysis',
      type: 'Strategic', 
      category: 'financial', 
      status: 'Scheduled',
      generatedBy: 'Finance Team',
      scheduledDate: '2025-09-15',
      detailedDescription: 'Strategic financial report analyzing budget allocation efficiency, expenditure patterns, and variance analysis for better financial planning.',
      parameters: ['Budget allocation', 'Expenditure analysis', 'Variance reporting', 'Financial planning']
    },
    // NEW STUDENT AND INVENTORY REPORTS FROM IMAGES
    {
      id: 'RPT010',
      title: 'Student Attendance Trends',
      description: 'Semester-wise attendance patterns and analytics',
      type: 'Analytical',
      category: 'student',
      status: 'Ready',
      dateGenerated: '2025-08-29',
      generatedBy: 'Academic Team',
      downloadFormat: 'Excel',
      size: '4.2 MB',
      detailedDescription: 'Comprehensive semester-wise analysis of attendance patterns across branches and courses, highlighting trends, anomalies, and at-risk cohorts for targeted interventions.',
      parameters: ['Semester patterns', 'Branch comparison', 'Anomaly detection', 'At-risk cohorts'],
      dataPoints: 2400,
      lastAccessed: '2025-09-04'
    },
    {
      id: 'RPT011',
      title: 'Student Demographics Report',
      description: 'Comprehensive student profile analysis by branch and semester',
      type: 'Analytical',
      category: 'student',
      status: 'Ready',
      dateGenerated: '2025-08-28',
      generatedBy: 'Admin Team',
      downloadFormat: 'PDF',
      size: '5.7 MB',
      detailedDescription: 'Comprehensive demographic profiling including gender distribution, domicile segments, admission categories, and semester-wise composition for strategic planning.',
      parameters: ['Branch distribution', 'Semester mix', 'Admission categories', 'Diversity metrics'],
      dataPoints: 3100,
      lastAccessed: '2025-09-04'
    },
    {
      id: 'RPT012',
      title: 'Policy Compliance Overview',
      description: 'Disciplinary actions, violations, and compliance metrics',
      type: 'Strategic',
      category: 'student',
      status: 'Ready',
      dateGenerated: '2025-08-27',
      generatedBy: 'Warden Office',
      downloadFormat: 'Excel',
      size: '2.9 MB',
      detailedDescription: 'Strategic view of code-of-conduct compliance, violation categories, severity levels, and trend analysis to inform preventive measures and policy updates.',
      parameters: ['Violation categories', 'Severity trends', 'Repeat offenders', 'Corrective actions'],
      dataPoints: 975,
      lastAccessed: '2025-09-04'
    },
    {
      id: 'RPT013',
      title: 'Inventory Utilization Report',
      description: 'Asset usage, consumption patterns, and replacement schedules',
      type: 'Operational',
      category: 'inventory',
      status: 'Ready',
      dateGenerated: '2025-08-29',
      generatedBy: 'Inventory Manager',
      downloadFormat: 'CSV',
      size: '890 KB',
      detailedDescription: 'Operational insights into asset utilization rates, consumption trends, lifecycle status, and proactive replacement scheduling for optimal inventory management.',
      parameters: ['Utilization rates', 'Consumption trends', 'Lifecycle stages', 'Replacement schedules'],
      dataPoints: 1680,
      lastAccessed: '2025-09-04'
    }
  ];

  // Sample report requests
  const reportRequests: ReportRequest[] = [
    {
      id: 'REQ001', 
      reportType: 'Custom Fee Analysis', 
      requestedBy: 'Principal',
      requestDate: '2025-08-31', 
      dateRange: { from: '2025-07-01', to: '2025-08-31' },
      status: 'In Progress', 
      filters: ['Block A', 'Block B', 'Overdue payments']
    },
    {
      id: 'REQ002', 
      reportType: 'Room Allocation Efficiency', 
      requestedBy: 'Secretary',
      requestDate: '2025-08-30', 
      dateRange: { from: '2025-06-01', to: '2025-08-30' },
      status: 'Completed'
    }
  ];

  const filteredReports = availableReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle download functionality
  const handleDownload = (report: Report) => {
    const downloadData = {
      reportId: report.id,
      title: report.title,
      format: report.downloadFormat,
      size: report.size,
      generatedBy: report.generatedBy,
      dateGenerated: report.dateGenerated,
      downloadTime: new Date().toISOString()
    };

    const dataStr = JSON.stringify(downloadData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.${report.downloadFormat?.toLowerCase() || 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`${report.title} has been downloaded successfully!`);
  };

  const handleViewDetails = (report: Report) => {
    setViewingReport(report);
  };

  const handleViewSchedule = (report: Report) => {
    setSelectedScheduledReport(report);
    setShowScheduleModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-500 text-white';
      case 'Generating': return 'bg-yellow-500 text-white';
      case 'Scheduled': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Operational': return 'bg-blue-100 text-blue-800';
      case 'Analytical': return 'bg-green-100 text-green-800';
      case 'Strategic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500 text-white';
      case 'In Progress': return 'bg-yellow-500 text-white';
      case 'Pending': return 'bg-gray-500 text-white';
      case 'Failed': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const totalReports = availableReports.length;
  const readyReports = availableReports.filter(r => r.status === 'Ready').length;
  const generatingReports = availableReports.filter(r => r.status === 'Generating').length;
  const scheduledReports = availableReports.filter(r => r.status === 'Scheduled').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'reports', label: 'Available Reports' },
            { key: 'analytics', label: 'Report Analytics' },
            { key: 'generate', label: 'Generate Custom Report' },
            { key: 'requests', label: 'Report Requests' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Report Details Modal */}
        {viewingReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">{viewingReport.title}</h2>
                  <button
                    onClick={() => setViewingReport(null)}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{viewingReport.detailedDescription || viewingReport.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Report Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(viewingReport.type)}`}>
                          {viewingReport.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium capitalize">{viewingReport.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(viewingReport.status)}`}>
                          {viewingReport.status}
                        </span>
                      </div>
                      {viewingReport.dataPoints && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Data Points:</span>
                          <span className="font-medium">{viewingReport.dataPoints.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Generation Details</h4>
                    <div className="space-y-2 text-sm">
                      {viewingReport.dateGenerated && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Generated:</span>
                          <span className="font-medium">{new Date(viewingReport.dateGenerated).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                      {viewingReport.generatedBy && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Generated By:</span>
                          <span className="font-medium">{viewingReport.generatedBy}</span>
                        </div>
                      )}
                      {viewingReport.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">File Size:</span>
                          <span className="font-medium">{viewingReport.size}</span>
                        </div>
                      )}
                      {viewingReport.downloadFormat && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Format:</span>
                          <span className="font-medium">{viewingReport.downloadFormat}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {viewingReport.parameters && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Report Parameters</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewingReport.parameters.map((param, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {viewingReport.status === 'Ready' && (
                    <button
                      onClick={() => handleDownload(viewingReport)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                    >
                      Download {viewingReport.downloadFormat}
                    </button>
                  )}
                  <button
                    onClick={() => setViewingReport(null)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && selectedScheduledReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">Report Schedule</h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{selectedScheduledReport.title}</h3>
                  <p className="text-gray-600 text-sm">{selectedScheduledReport.description}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-blue-800">Scheduled Generation</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheduled Date:</span>
                      <span className="font-medium">
                        {selectedScheduledReport.scheduledDate 
                          ? new Date(selectedScheduledReport.scheduledDate).toLocaleDateString('en-IN')
                          : 'September 15, 2025'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Generated By:</span>
                      <span className="font-medium">{selectedScheduledReport.generatedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      alert('Schedule has been updated successfully!');
                      setShowScheduleModal(false);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Modify Schedule
                  </button>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Reports</h3>
                <p className="text-3xl font-bold text-blue-600">{totalReports}</p>
                <p className="text-sm text-gray-600">Available for download</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Download</h3>
                <p className="text-3xl font-bold text-green-600">{readyReports}</p>
                <p className="text-sm text-gray-600">Completed reports</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-yellow-600">{generatingReports}</p>
                <p className="text-sm text-gray-600">Currently generating</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Scheduled</h3>
                <p className="text-3xl font-bold text-purple-600">{scheduledReports}</p>
                <p className="text-sm text-gray-600">Upcoming reports</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search reports by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Categories' },
                    { key: 'occupancy', label: 'Occupancy' },
                    { key: 'financial', label: 'Financial' },
                    { key: 'maintenance', label: 'Maintenance' },
                    { key: 'student', label: 'Student' },
                    { key: 'inventory', label: 'Inventory' },
                  ].map((category) => (
                    <button
                      key={category.key}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.key
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                      }`}
                      onClick={() => setSelectedCategory(category.key as any)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-gray-800">{report.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{report.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type:</span>
                        <span className={`px-2 py-1 text-xs rounded ${getTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                      {report.dateGenerated && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Generated:</span>
                          <span className="font-medium">{new Date(report.dateGenerated).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                      {report.generatedBy && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">By:</span>
                          <span className="font-medium">{report.generatedBy}</span>
                        </div>
                      )}
                      {report.size && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Size:</span>
                          <span className="font-medium">{report.size}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {report.status === 'Ready' && (
                        <>
                          <button 
                            onClick={() => handleDownload(report)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
                          >
                            Download {report.downloadFormat}
                          </button>
                          <button 
                            onClick={() => handleViewDetails(report)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-300"
                          >
                            View
                          </button>
                        </>
                      )}
                      {report.status === 'Generating' && (
                        <button disabled className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                          Generating...
                        </button>
                      )}
                      {report.status === 'Scheduled' && (
                        <button 
                          onClick={() => handleViewSchedule(report)}
                          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
                        >
                          View Schedule
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Report Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Custom Report</h2>
            <p className="text-gray-600">Custom report generation form coming soon...</p>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Report Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.reportType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsManagement;
