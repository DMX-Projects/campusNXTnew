  import React, { useState } from 'react';
  import { 
    FileText, 
    Download, 
    Search, 
    Calendar, 
    Filter,
    Users,
    TrendingUp,
    BookOpen,
    RefreshCw,
    ChevronDown
  } from 'lucide-react';
  import { useTheme } from '../../../../contexts/ThemeContext';
  interface ReportData {
    id: number;
    course: string;
    totalApplications: number;
    admitted: number;
    pending: number;
    rejected: number;
    admissionRate: string;
  }

  interface FilterState {
    reportType: string;
    academicYear: string;
    dateRange: {
      from: string;
      to: string;
    };
    course: string;
    status: string;
  }

  const AdmissionReports: React.FC = () => {
    const { isDark } = useTheme();
    
    const [filters, setFilters] = useState<FilterState>({
      reportType: '',
      academicYear: '',
      dateRange: { from: '', to: '' },
      course: '',
      status: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Mock data for demonstration
    const mockReportData: ReportData[] = [
      {
        id: 1,
        course: 'Computer Science Engineering',
        totalApplications: 1250,
        admitted: 180,
        pending: 45,
        rejected: 1025,
        admissionRate: '14.4%'
      },
      {
        id: 2,
        course: 'Mechanical Engineering',
        totalApplications: 980,
        admitted: 150,
        pending: 30,
        rejected: 800,
        admissionRate: '15.3%'
      },
      {
        id: 3,
        course: 'Electronics Engineering',
        totalApplications: 890,
        admitted: 120,
        pending: 25,
        rejected: 745,
        admissionRate: '13.5%'
      },
      {
        id: 4,
        course: 'Civil Engineering',
        totalApplications: 750,
        admitted: 100,
        pending: 20,
        rejected: 630,
        admissionRate: '13.3%'
      },
      {
        id: 5,
        course: 'Business Administration',
        totalApplications: 1100,
        admitted: 200,
        pending: 50,
        rejected: 850,
        admissionRate: '18.2%'
      }
    ];

    const reportTypes = [
      'Final Admission List by Course',
      'Category-wise Admission Summary',
      'Application Source Report',
      'Merit List Analysis',
      'Admission Timeline Report'
    ];

    const academicYears = [
      '2024-25',
      '2023-24',
      '2022-23',
      '2021-22'
    ];

    const courses = [
      'All Courses',
      'Computer Science Engineering',
      'Mechanical Engineering',
      'Electronics Engineering',
      'Civil Engineering',
      'Business Administration'
    ];

    const statusOptions = [
      'All Status',
      'Admitted',
      'Pending',
      'Rejected',
      'Waitlisted'
    ];

    const handleFilterChange = (field: string, value: string) => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setFilters(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof FilterState],
            [child]: value
          }
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };

    const generateReport = async () => {
      if (!filters.reportType) {
        alert('Please select a report type');
        return;
      }
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setReportData(mockReportData);
        setIsLoading(false);
      }, 2000);
    };

    // const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    //   if (reportData.length === 0) {
    //     alert('Please generate a report first');
    //     return;
    //   }
    //   // Simulate export functionality
    //   const fileName = `admission_report_${filters.reportType.toLowerCase().replace(/ /g, '_')}.${format === 'excel' ? 'xlsx' : format}`;
    //   alert(`Exporting report as ${fileName}`);
    // };
    const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    if (reportData.length === 0) {
      alert('Please generate a report first');
      return;
    }
    const fileBaseName = `admission_report_${filters.reportType.toLowerCase().replace(/ /g, '_')}`;

    switch (format) {
      case 'csv':
        exportCSV(reportData, `${fileBaseName}.csv`);
        break;
      case 'excel':
        exportExcel(reportData, `${fileBaseName}.xls`);
        break;
      case 'pdf':
        exportPDF(reportData);
        break;
    }
  };
  const exportCSV = (data: ReportData[], fileName: string) => {
    const csvContent = [
      ['Course', 'Total Applications', 'Admitted', 'Pending', 'Rejected', 'Admission Rate'],
      ...data.map(item => [
        item.course,
        item.totalApplications,
        item.admitted,
        item.pending,
        item.rejected,
        item.admissionRate
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.click();
  };
  const exportExcel = (data: any[], fileName: string) => {
    if (data.length === 0) return;
    const header = Object.keys(data[0]).map(h => `<th>${h}</th>`).join('');
    const rows = data.map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join('')}</tr>`).join('');

    const htmlTable = `<table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
    const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };
  const exportPDF = (data: any[], fileName: string) => {
    if (data.length === 0) return;

    // Prepare simple content as CSV-like string for PDF text
    const header = Object.keys(data[0]).join(' | ');
    const rows = data.map(row => Object.values(row).join(' | ')).join('\n');
    const pdfContent = `${header}\n${rows}`;

    // Create a Blob with the plain text and PDF mime type
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };


    const resetFilters = () => {
      setFilters({
        reportType: '',
        academicYear: '',
        dateRange: { from: '', to: '' },
        course: '',
        status: ''
      });
      setReportData([]);
    };

    const totalApplications = reportData.reduce((sum, item) => sum + item.totalApplications, 0);
    const totalAdmitted = reportData.reduce((sum, item) => sum + item.admitted, 0);
    const totalPending = reportData.reduce((sum, item) => sum + item.pending, 0);
    const overallAdmissionRate = totalApplications > 0 ? ((totalAdmitted / totalApplications) * 100).toFixed(1) : '0';

    return (
      <div className={`min-h-screen p-4 lg:p-8 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`rounded-lg shadow-sm border-l-4 border-blue-500 p-6 mb-8 ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className={`text-3xl font-bold mb-2 flex items-center ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <FileText className="w-8 h-8 text-blue-600 mr-3" />
                  Admission Reports
                </h1>
                {/* <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generate and export detailed reports on admission statistics and final lists.
                </p> */}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={resetFilters}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className={`rounded-lg shadow-sm mb-8 overflow-hidden transition-all duration-300 ${
            showFilters ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          } ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Report Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Report Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={filters.reportType}
                    onChange={(e) => handleFilterChange('reportType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select Report Type</option>
                    {reportTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Academic Year */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Academic Year
                  </label>
                  <select
                    value={filters.academicYear}
                    onChange={(e) => handleFilterChange('academicYear', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Course */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Course
                  </label>
                  <select
                    value={filters.course}
                    onChange={(e) => handleFilterChange('course', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {/* Date From */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date From
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => handleFilterChange('dateRange.from', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* Date To */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date To
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => handleFilterChange('dateRange.to', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Application Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generate Report Button */}
              <div className="mt-6">
                <button
                  onClick={generateReport}
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Generating Report...' : 'Generate Report'}
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {reportData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Applications
                    </p>
                    <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {totalApplications.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total Admitted
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {totalAdmitted.toLocaleString()}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Pending Review
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {totalPending.toLocaleString()}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              
              <div className={`rounded-lg shadow-sm p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Admission Rate
                    </p>
                    <p className="text-3xl font-bold text-purple-600">{overallAdmissionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          )}

          {/* Export Buttons */}
          {reportData.length > 0 && (
            <div className={`rounded-lg shadow-sm p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
                <h3 className={`text-lg font-semibold mb-4 sm:mb-0 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Export Options
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => exportReport('pdf')}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </button>
                  <button
                    onClick={() => exportReport('excel')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </button>
                  <button
                    onClick={() => exportReport('csv')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Report Table */}
          {reportData.length > 0 && (
            <div className={`rounded-lg shadow-sm overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {filters.reportType || 'Admission Report'} Results
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Showing {reportData.length} course(s) • Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Course
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Total Applications
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Admitted
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Pending
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Rejected
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Admission Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                    {reportData.map((row) => (
                      <tr key={row.id} className={`transition-colors ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {row.course}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                            {row.totalApplications.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isDark 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {row.admitted.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isDark 
                              ? 'bg-yellow-900/30 text-yellow-400' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {row.pending.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isDark 
                              ? 'bg-red-900/30 text-red-400' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {row.rejected.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {row.admissionRate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {reportData.length === 0 && !isLoading && (
            <div className={`rounded-lg shadow-sm p-12 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <FileText className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No Reports Generated
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Select your report parameters and click "Generate Report" to view admission statistics.
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Open Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className={`rounded-lg shadow-sm p-12 text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Generating Report
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Please wait while we compile your admission report data...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default AdmissionReports;
