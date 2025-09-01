// pages/Reports.tsx
import React, { useState, useRef } from 'react';
import { 
  ChartBarIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('placement-summary');
  const [dateRange, setDateRange] = useState('current-year');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const reportTypes = [
    {
      id: 'placement-summary',
      title: 'Placement Summary Report',
      description: 'Overall placement statistics and trends',
      icon: ChartBarIcon,
      metrics: ['Total Placed: 234', 'Placement Rate: 87%', 'Avg Package: ₹8.2L']
    },
    {
      id: 'company-analysis',
      title: 'Company-wise Analysis',
      description: 'Detailed company participation and hiring data',
      icon: PresentationChartLineIcon,
      metrics: ['Companies: 67', 'Top Recruiter: TCS', 'Highest Package: ₹45L']
    },
    {
      id: 'department-report',
      title: 'Department Performance',
      description: 'Department-wise placement performance',
      icon: UsersIcon,
      metrics: ['CS: 94.7%', 'IT: 90.0%', 'EC: 85.0%']
    },
    {
      id: 'student-details',
      title: 'Student Details Report',
      description: 'Individual student placement records',
      icon: DocumentTextIcon,
      metrics: ['Records: 450', 'Placed: 234', 'Pending: 216']
    }
  ];

  const quickStats = [
    { label: 'Total Students', value: '450', change: '+5%', trend: 'up' },
    { label: 'Placed Students', value: '234', change: '+12%', trend: 'up' },
    { label: 'Active Companies', value: '67', change: '+8%', trend: 'up' },
    { label: 'Avg Package', value: '₹8.2L', change: '+15%', trend: 'up' }
  ];

  // Sample data for different report types
  const reportData = {
    'placement-summary': {
      title: 'Placement Summary Report',
      data: [
        { department: 'Computer Science', totalStudents: 120, placed: 114, placementRate: '94.7%', avgPackage: '₹9.8L' },
        { department: 'Information Technology', totalStudents: 100, placed: 90, placementRate: '90.0%', avgPackage: '₹8.5L' },
        { department: 'Electronics & Communication', totalStudents: 80, placed: 68, placementRate: '85.0%', avgPackage: '₹7.2L' },
        { department: 'Mechanical Engineering', totalStudents: 90, placed: 72, placementRate: '80.0%', avgPackage: '₹6.8L' },
        { department: 'Civil Engineering', totalStudents: 60, placed: 45, placementRate: '75.0%', avgPackage: '₹6.2L' }
      ]
    },
    'company-analysis': {
      title: 'Company-wise Analysis Report',
      data: [
        { company: 'TCS', studentsHired: 45, avgPackage: '₹7.5L', roles: 'Software Developer, Analyst' },
        { company: 'Infosys', studentsHired: 38, avgPackage: '₹8.2L', roles: 'Software Engineer, Consultant' },
        { company: 'Wipro', studentsHired: 32, avgPackage: '₹7.8L', roles: 'Developer, Support Engineer' },
        { company: 'Accenture', studentsHired: 28, avgPackage: '₹9.1L', roles: 'Consultant, Analyst' },
        { company: 'Microsoft', studentsHired: 8, avgPackage: '₹45.0L', roles: 'Software Engineer' }
      ]
    },
    'department-report': {
      title: 'Department Performance Report',
      data: [
        { department: 'Computer Science', batch2024: '96%', batch2023: '94%', batch2022: '92%', trend: 'up' },
        { department: 'Information Technology', batch2024: '90%', batch2023: '88%', batch2022: '85%', trend: 'up' },
        { department: 'Electronics & Communication', batch2024: '85%', batch2023: '82%', batch2022: '80%', trend: 'up' },
        { department: 'Mechanical Engineering', batch2024: '80%', batch2023: '78%', batch2022: '75%', trend: 'up' },
        { department: 'Civil Engineering', batch2024: '75%', batch2023: '70%', batch2022: '68%', trend: 'up' }
      ]
    },
    'student-details': {
      title: 'Student Details Report',
      data: [
        { name: 'Rahul Sharma', rollNo: 'CS21001', department: 'CSE', cgpa: '8.9', company: 'Microsoft', package: '₹45.0L', status: 'Placed' },
        { name: 'Priya Patel', rollNo: 'IT21002', department: 'IT', cgpa: '9.2', company: 'Google', package: '₹42.0L', status: 'Placed' },
        { name: 'Amit Kumar', rollNo: 'EC21003', department: 'ECE', cgpa: '8.1', company: 'TCS', package: '₹7.5L', status: 'Placed' },
        { name: 'Sneha Gupta', rollNo: 'ME21004', department: 'ME', cgpa: '8.5', company: '-', package: '-', status: 'Pending' },
        { name: 'Arjun Singh', rollNo: 'CE21005', department: 'CE', cgpa: '7.8', company: 'Infosys', package: '₹8.2L', status: 'Placed' }
      ]
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setReportGenerated(true);
    setIsGenerating(false);
    
    // Auto-download Excel file
    downloadExcel();
  };

  const downloadExcel = () => {
    const currentReport = reportData[selectedReport as keyof typeof reportData];
    
    // Create CSV content
    let csvContent = `${currentReport.title}\nGenerated on: ${new Date().toLocaleDateString()}\nDate Range: ${dateRange}\n\n`;
    
    if (selectedReport === 'placement-summary') {
      csvContent += 'Department,Total Students,Placed,Placement Rate,Average Package\n';
      currentReport.data.forEach((row: any) => {
        csvContent += `${row.department},${row.totalStudents},${row.placed},${row.placementRate},${row.avgPackage}\n`;
      });
    } else if (selectedReport === 'company-analysis') {
      csvContent += 'Company,Students Hired,Average Package,Roles\n';
      currentReport.data.forEach((row: any) => {
        csvContent += `${row.company},${row.studentsHired},${row.avgPackage},"${row.roles}"\n`;
      });
    } else if (selectedReport === 'department-report') {
      csvContent += 'Department,Batch 2024,Batch 2023,Batch 2022,Trend\n';
      currentReport.data.forEach((row: any) => {
        csvContent += `${row.department},${row.batch2024},${row.batch2023},${row.batch2022},${row.trend}\n`;
      });
    } else if (selectedReport === 'student-details') {
      csvContent += 'Name,Roll Number,Department,CGPA,Company,Package,Status\n';
      currentReport.data.forEach((row: any) => {
        csvContent += `${row.name},${row.rollNo},${row.department},${row.cgpa},${row.company},${row.package},${row.status}\n`;
      });
    }

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedReport}_${dateRange}_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (!reportGenerated) {
      alert('Please generate a report first!');
      return;
    }
    downloadExcel();
  };

  const handlePrint = () => {
    if (!reportGenerated) {
      alert('Please generate a report first!');
      return;
    }
    
    const printWindow = window.open('', '_blank');
    const currentReport = reportData[selectedReport as keyof typeof reportData];
    
    let printContent = `
      <html>
        <head>
          <title>${currentReport.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .meta { color: #666; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .status-placed { color: #059669; font-weight: bold; }
            .status-pending { color: #dc2626; font-weight: bold; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${currentReport.title}</div>
            <div class="meta">Generated on: ${new Date().toLocaleDateString()}</div>
            <div class="meta">Date Range: ${dateRange}</div>
          </div>
    `;

    if (selectedReport === 'placement-summary') {
      printContent += `
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Students</th>
              <th>Placed</th>
              <th>Placement Rate</th>
              <th>Average Package</th>
            </tr>
          </thead>
          <tbody>
      `;
      currentReport.data.forEach((row: any) => {
        printContent += `
          <tr>
            <td>${row.department}</td>
            <td>${row.totalStudents}</td>
            <td>${row.placed}</td>
            <td>${row.placementRate}</td>
            <td>${row.avgPackage}</td>
          </tr>
        `;
      });
      printContent += `</tbody></table>`;
    } else if (selectedReport === 'student-details') {
      printContent += `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Department</th>
              <th>CGPA</th>
              <th>Company</th>
              <th>Package</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
      `;
      currentReport.data.forEach((row: any) => {
        printContent += `
          <tr>
            <td>${row.name}</td>
            <td>${row.rollNo}</td>
            <td>${row.department}</td>
            <td>${row.cgpa}</td>
            <td>${row.company}</td>
            <td>${row.package}</td>
            <td class="status-${row.status.toLowerCase()}">${row.status}</td>
          </tr>
        `;
      });
      printContent += `</tbody></table>`;
    }

    printContent += `
        </body>
      </html>
    `;

    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const renderReportPreview = () => {
    if (!reportGenerated) {
      return (
        <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600">No Report Generated</p>
            <p className="text-sm text-gray-500">Click "Generate Report" to view data</p>
          </div>
        </div>
      );
    }

    const currentReport = reportData[selectedReport as keyof typeof reportData];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{currentReport.title}</h3>
          <p className="opacity-90">Data generated for {dateRange} period</p>
        </div>

        <div className="overflow-x-auto">
          {selectedReport === 'placement-summary' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placement Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Package</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReport.data.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.totalStudents}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.placed}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {row.placementRate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{row.avgPackage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport === 'company-analysis' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Hired</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReport.data.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.studentsHired}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{row.avgPackage}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.roles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport === 'department-report' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch 2024</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch 2023</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch 2022</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReport.data.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.batch2024}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.batch2023}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.batch2022}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">Improving</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedReport === 'student-details' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReport.data.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.rollNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.cgpa}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{row.package}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {row.status === 'Placed' ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-600">Placed</span>
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="w-4 h-4 text-red-500 mr-1" />
                            <span className="text-sm text-red-600">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button 
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <PrinterIcon className="w-5 h-5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select 
              value={selectedReport}
              onChange={(e) => {
                setSelectedReport(e.target.value);
                setReportGenerated(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {reportTypes.map(report => (
                <option key={report.id} value={report.id}>{report.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                setReportGenerated(false);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="current-year">Current Academic Year</option>
              <option value="last-year">Last Academic Year</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          {dateRange === 'custom' && (
            <div className="flex space-x-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input 
                  type="date"
                  value={customDateFrom}
                  onChange={(e) => setCustomDateFrom(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="date"
                  value={customDateTo}
                  onChange={(e) => setCustomDateTo(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
          <div className="flex items-end">
            <button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <EyeIcon className="w-5 h-5" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div 
              key={report.id} 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedReport === report.id 
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => {
                setSelectedReport(report.id);
                setReportGenerated(false);
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  selectedReport === report.id ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    selectedReport === report.id ? 'text-indigo-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="space-y-1">
                    {report.metrics.map((metric, idx) => (
                      <div key={idx} className="text-sm font-medium text-gray-700">
                        • {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={printRef}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.title} Preview
          </h2>
          <div className="flex items-center space-x-4">
            {reportGenerated && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Report Generated
              </span>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>Generated on: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        {renderReportPreview()}
      </div>
    </div>
  );
};

export default Reports;
