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

  // Sample reports data
  const availableReports: Report[] = [
    {
      id: 'RPT001', title: 'Monthly Occupancy Report', 
      description: 'Detailed room occupancy statistics by block and room type',
      type: 'Operational', category: 'occupancy', status: 'Ready',
      dateGenerated: '2025-08-31', generatedBy: 'System', downloadFormat: 'PDF', size: '2.3 MB'
    },
    {
      id: 'RPT002', title: 'Fee Collection Summary', 
      description: 'Complete overview of fee payments, dues, and defaulters',
      type: 'Operational', category: 'financial', status: 'Ready',
      dateGenerated: '2025-08-31', generatedBy: 'Finance Team', downloadFormat: 'Excel', size: '1.8 MB'
    },
    {
      id: 'RPT003', title: 'Maintenance Expense Analysis', 
      description: 'Monthly maintenance costs breakdown by category and block',
      type: 'Operational', category: 'maintenance', status: 'Ready',
      dateGenerated: '2025-08-30', generatedBy: 'Maintenance Team', downloadFormat: 'PDF', size: '3.1 MB'
    },
    {
      id: 'RPT004', title: 'Student Attendance Trends', 
      description: 'Semester-wise attendance patterns and analytics',
      type: 'Analytical', category: 'student', status: 'Ready',
      dateGenerated: '2025-08-29', generatedBy: 'Academic Team', downloadFormat: 'Excel', size: '4.2 MB'
    },
    {
      id: 'RPT005', title: 'Inventory Utilization Report', 
      description: 'Asset usage, consumption patterns, and replacement schedules',
      type: 'Operational', category: 'inventory', status: 'Ready',
      dateGenerated: '2025-08-29', generatedBy: 'Inventory Manager', downloadFormat: 'CSV', size: '890 KB'
    },
    {
      id: 'RPT006', title: 'Revenue Growth Analysis', 
      description: 'Year-over-year revenue comparison and growth trends',
      type: 'Analytical', category: 'financial', status: 'Generating',
      generatedBy: 'Finance Team'
    },
    {
      id: 'RPT007', title: 'Student Demographics Report', 
      description: 'Comprehensive student profile analysis by branch and semester',
      type: 'Analytical', category: 'student', status: 'Ready',
      dateGenerated: '2025-08-28', generatedBy: 'Admin Team', downloadFormat: 'PDF', size: '5.7 MB'
    },
    {
      id: 'RPT008', title: 'Policy Compliance Overview', 
      description: 'Disciplinary actions, violations, and compliance metrics',
      type: 'Strategic', category: 'student', status: 'Ready',
      dateGenerated: '2025-08-27', generatedBy: 'Warden Office', downloadFormat: 'Excel', size: '2.9 MB'
    },
    {
      id: 'RPT009', title: 'Budget Utilization Report', 
      description: 'Quarterly budget allocation vs actual expenditure analysis',
      type: 'Strategic', category: 'financial', status: 'Scheduled',
      generatedBy: 'Finance Team'
    },
    {
      id: 'RPT010', title: 'Hostel Performance Dashboard', 
      description: 'Overall hostel KPI metrics and performance indicators',
      type: 'Strategic', category: 'occupancy', status: 'Ready',
      dateGenerated: '2025-08-31', generatedBy: 'Management', downloadFormat: 'PDF', size: '6.4 MB'
    }
  ];

  // Sample report requests
  const reportRequests: ReportRequest[] = [
    {
      id: 'REQ001', reportType: 'Custom Fee Analysis', requestedBy: 'Principal',
      requestDate: '2025-08-31', dateRange: { from: '2025-07-01', to: '2025-08-31' },
      status: 'In Progress', filters: ['Block A', 'Block B', 'Overdue payments']
    },
    {
      id: 'REQ002', reportType: 'Room Allocation Efficiency', requestedBy: 'Secretary',
      requestDate: '2025-08-30', dateRange: { from: '2025-06-01', to: '2025-08-30' },
      status: 'Completed'
    },
    {
      id: 'REQ003', reportType: 'Student Behavior Analytics', requestedBy: 'Chairman',
      requestDate: '2025-08-29', dateRange: { from: '2025-01-01', to: '2025-08-29' },
      status: 'Pending', filters: ['Disciplinary actions', 'Late entries', 'Complaints']
    }
  ];

  const filteredReports = availableReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-secondary-500 text-white';
      case 'Generating': return 'bg-accent-500 text-white';
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
      case 'Completed': return 'bg-secondary-500 text-white';
      case 'In Progress': return 'bg-accent-500 text-white';
      case 'Pending': return 'bg-gray-500 text-white';
      case 'Failed': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  // Analytics data
  const totalReports = availableReports.length;
  const readyReports = availableReports.filter(r => r.status === 'Ready').length;
  const generatingReports = availableReports.filter(r => r.status === 'Generating').length;
  const scheduledReports = availableReports.filter(r => r.status === 'Scheduled').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="">
        
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
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Available Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Reports</h3>
                <p className="text-3xl font-bold text-primary-600">{totalReports}</p>
                <p className="text-sm text-gray-600">Available for download</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Download</h3>
                <p className="text-3xl font-bold text-secondary-600">{readyReports}</p>
                <p className="text-sm text-gray-600">Completed reports</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-accent-600">{generatingReports}</p>
                <p className="text-sm text-gray-600">Currently generating</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Scheduled</h3>
                <p className="text-3xl font-bold text-blue-600">{scheduledReports}</p>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
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
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{report.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.description}</p>

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
                          <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300">
                            Download {report.downloadFormat}
                          </button>
                          <button className="bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </>
                      )}
                      {report.status === 'Generating' && (
                        <button disabled className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
                          Generating...
                        </button>
                      )}
                      {report.status === 'Scheduled' && (
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300">
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

        {/* Report Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Generation Trends</h3>
                <div className="space-y-3">
                  {['Operational', 'Analytical', 'Strategic'].map((type) => {
                    const count = availableReports.filter(r => r.type === type).length;
                    const percentage = Math.round((count / totalReports) * 100);
                    return (
                      <div key={type}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{type}:</span>
                          <span className="font-medium">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
                <div className="space-y-2">
                  {['financial', 'student', 'occupancy', 'maintenance', 'inventory'].map((category) => {
                    const count = availableReports.filter(r => r.category === category).length;
                    return (
                      <div key={category} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{category}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Formats</h3>
                <div className="space-y-2">
                  {['PDF', 'Excel', 'CSV'].map((format) => {
                    const count = availableReports.filter(r => r.downloadFormat === format).length;
                    return (
                      <div key={format} className="flex justify-between text-sm">
                        <span className="text-gray-600">{format}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Report Activity</h3>
              <div className="space-y-4">
                {availableReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{report.title}</h4>
                      <p className="text-sm text-gray-600">
                        {report.status === 'Ready' ? 'Generated' : report.status} 
                        {report.dateGenerated && ` on ${new Date(report.dateGenerated).toLocaleDateString('en-IN')}`}
                        {report.generatedBy && ` by ${report.generatedBy}`}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generate Custom Report Tab */}
        {activeTab === 'generate' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Custom Report</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>Select Report Type</option>
                    <option>Occupancy Analysis</option>
                    <option>Financial Summary</option>
                    <option>Student Performance</option>
                    <option>Maintenance Overview</option>
                    <option>Inventory Audit</option>
                    <option>Custom Analytics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="From Date"
                    />
                    <input
                      type="date"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="To Date"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filters</label>
                  <div className="space-y-2">
                    {['Block A', 'Block B', 'Block C', 'Block D', 'Block E'].map((block) => (
                      <label key={block} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">{block}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                  <div className="flex gap-4">
                    {['PDF', 'Excel', 'CSV'].map((format) => (
                      <label key={format} className="flex items-center">
                        <input type="radio" name="format" className="mr-2" />
                        <span className="text-sm text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                  <input
                    type="text"
                    placeholder="Enter custom report title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the purpose and scope of this report"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm text-gray-700">Download immediately</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm text-gray-700">Email when ready</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="delivery" className="mr-2" />
                      <span className="text-sm text-gray-700">Schedule for later</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
                    Generate Report
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors duration-300">
                    Save as Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Requests Tab */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Report Requests</h2>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                New Request
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.reportType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.requestedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(request.dateRange.from).toLocaleDateString('en-IN')} - {new Date(request.dateRange.to).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRequestStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-primary-600 hover:text-primary-900">View</button>
                          <button className="text-secondary-600 hover:text-secondary-900">Edit</button>
                          {request.status === 'Completed' && (
                            <button className="text-accent-600 hover:text-accent-900">Download</button>
                          )}
                        </div>
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
