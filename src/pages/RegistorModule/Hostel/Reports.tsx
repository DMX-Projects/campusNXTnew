import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building2, 
  Clock,
  Eye,
  X,
  Play,
  FileSpreadsheet,
  File,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle,
  Search,
  Share,
  Calendar as CalendarIcon,
  Settings,
  Info
} from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportParameters, setReportParameters] = useState({});
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewingReport, setViewingReport] = useState(null);

  // Pre-defined report templates
  const reportTemplates = [
    {
      id: 1,
      name: 'Semester Fee Collection Summary',
      description: 'Comprehensive overview of fee collection status across all blocks',
      category: 'Financial',
      icon: DollarSign,
      color: 'green',
      parameters: ['dateRange', 'semester', 'block'],
      estimatedTime: '2-3 minutes',
      lastGenerated: '2024-09-18',
      popularity: 95,
      generatedBy: 'Admin',
      fileSize: '2.4 MB',
      format: 'PDF, Excel',
      description_detailed: 'This report provides a comprehensive analysis of fee collection across all hostel blocks. It includes detailed breakdowns by semester, payment status, and outstanding amounts. The report helps identify collection trends and areas requiring attention.',
      sampleData: {
        totalExpected: 2850000,
        totalCollected: 2340000,
        totalPending: 510000,
        collectionRate: 82.1,
        lastUpdated: '2024-09-19 14:30:00'
      }
    },
    {
      id: 2,
      name: 'Block-wise Defaulter List',
      description: 'Detailed list of students with pending fee payments by block',
      category: 'Financial',
      icon: AlertCircle,
      color: 'red',
      parameters: ['block', 'minimumAmount', 'dateRange'],
      estimatedTime: '1-2 minutes',
      lastGenerated: '2024-09-19',
      popularity: 88,
      generatedBy: 'Finance Team',
      fileSize: '1.8 MB',
      format: 'PDF, Excel, CSV',
      description_detailed: 'Comprehensive list of students with outstanding fee payments organized by hostel blocks. Includes contact information, payment history, and recommended actions for collection.',
      sampleData: {
        totalDefaulters: 34,
        totalAmount: 680000,
        criticalCases: 12,
        lastUpdated: '2024-09-19 16:45:00'
      }
    },
    {
      id: 3,
      name: 'Annual Occupancy Trends',
      description: 'Year-over-year occupancy analysis and trends',
      category: 'Occupancy',
      icon: TrendingUp,
      color: 'blue',
      parameters: ['year', 'block'],
      estimatedTime: '3-4 minutes',
      lastGenerated: '2024-09-15',
      popularity: 78,
      generatedBy: 'Operations Team',
      fileSize: '3.2 MB',
      format: 'PDF, PowerPoint',
      description_detailed: 'Analyzes occupancy patterns across multiple years to identify trends, seasonal variations, and capacity optimization opportunities. Includes predictive insights for future planning.',
      sampleData: {
        avgOccupancy: 85.5,
        peakOccupancy: 96.2,
        lowOccupancy: 67.8,
        lastUpdated: '2024-09-15 10:15:00'
      }
    },
    {
      id: 4,
      name: 'Maintenance Expense Analysis',
      description: 'Breakdown of maintenance costs by category and time period',
      category: 'Operational',
      icon: Activity,
      color: 'orange',
      parameters: ['dateRange', 'block', 'expenseCategory'],
      estimatedTime: '2-3 minutes',
      lastGenerated: '2024-09-17',
      popularity: 72,
      generatedBy: 'Maintenance Team',
      fileSize: '1.9 MB',
      format: 'PDF, Excel',
      description_detailed: 'Detailed analysis of maintenance expenses categorized by type, urgency, and block. Helps in budget planning and identifying cost-saving opportunities.',
      sampleData: {
        totalExpenses: 245000,
        preventive: 145000,
        reactive: 100000,
        lastUpdated: '2024-09-17 09:20:00'
      }
    },
    {
      id: 5,
      name: 'Student Occupancy Report',
      description: 'Current student allocation and room utilization',
      category: 'Occupancy',
      icon: Users,
      color: 'purple',
      parameters: ['block', 'roomType', 'academicYear'],
      estimatedTime: '1-2 minutes',
      lastGenerated: '2024-09-19',
      popularity: 91,
      generatedBy: 'Admin',
      fileSize: '2.1 MB',
      format: 'PDF, Excel',
      description_detailed: 'Current snapshot of student accommodation across all blocks with detailed room allocation, vacancy status, and utilization metrics.',
      sampleData: {
        totalStudents: 456,
        totalRooms: 320,
        utilization: 89.2,
        lastUpdated: '2024-09-19 18:00:00'
      }
    },
    {
      id: 6,
      name: 'Monthly Revenue Dashboard',
      description: 'Monthly revenue breakdown with comparisons',
      category: 'Financial',
      icon: BarChart3,
      color: 'indigo',
      parameters: ['month', 'year', 'includeComparisons'],
      estimatedTime: '2-3 minutes',
      lastGenerated: '2024-09-16',
      popularity: 85,
      generatedBy: 'Finance Team',
      fileSize: '2.8 MB',
      format: 'PDF, Excel, PowerPoint',
      description_detailed: 'Monthly financial performance analysis with year-over-year comparisons, revenue streams breakdown, and forecast projections.',
      sampleData: {
        currentMonth: 1250000,
        previousMonth: 1180000,
        growth: 5.9,
        lastUpdated: '2024-09-16 12:30:00'
      }
    }
  ];

  const categories = ['All', 'Financial', 'Occupancy', 'Operational'];

  const filteredReports = reportTemplates.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || categoryFilter === 'All' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGeneratedReport({
      ...selectedReport,
      parameters: reportParameters,
      generatedAt: new Date().toISOString(),
      data: generateSampleData(selectedReport.id)
    });
    
    setGeneratingReport(false);
  };

  const generateSampleData = (reportId) => {
    // Generate sample data based on report type
    switch (reportId) {
      case 1: // Fee Collection Summary
        return {
          totalExpected: 2850000,
          totalCollected: 2340000,
          totalPending: 510000,
          collectionRate: 82.1,
          blockBreakdown: [
            { block: 'Block A - Boys', expected: 950000, collected: 820000, pending: 130000 },
            { block: 'Block B - Girls', expected: 720000, collected: 630000, pending: 90000 },
            { block: 'Block C - Mixed', expected: 0, collected: 0, pending: 0 },
            { block: 'Block D - PG', expected: 680000, collected: 610000, pending: 70000 },
            { block: 'Block E - Faculty', expected: 500000, collected: 280000, pending: 220000 }
          ]
        };
      case 2: // Defaulter List
        return {
          totalDefaulters: 34,
          totalAmount: 680000,
          criticalCases: 12,
          defaulters: [
            { name: 'Rahul Sharma', room: 'A-101', amount: 25000, days: 45 },
            { name: 'Priya Patel', room: 'B-205', amount: 14000, days: 32 },
            { name: 'Amit Kumar', room: 'C-302', amount: 35000, days: 67 }
          ]
        };
      default:
        return { message: 'Sample report data generated successfully' };
    }
  };

  // Enhanced download function with responsive design
  const handleDownloadReport = (report, format = 'pdf') => {
    // Generate sample data for download
    let content = '';
    let mimeType = '';
    let extension = '';

    switch (format.toLowerCase()) {
      case 'pdf':
        content = generatePDFContent(report);
        mimeType = 'application/pdf';
        extension = 'pdf';
        break;
      case 'excel':
      case 'xlsx':
        content = generateExcelContent(report);
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        extension = 'xlsx';
        break;
      case 'csv':
        content = generateCSVContent(report);
        mimeType = 'text/csv';
        extension = 'csv';
        break;
      default:
        content = JSON.stringify(report, null, 2);
        mimeType = 'application/json';
        extension = 'json';
    }

    // Create blob and download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const filename = `${report.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.${extension}`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message (optional)
    alert(`Report "${report.name}" downloaded as ${format.toUpperCase()}`);
  };

  const generatePDFContent = (report) => {
    return `%PDF-1.4
Report: ${report.name}
Generated: ${new Date().toLocaleString()}
Description: ${report.description}

This is a sample PDF content for demonstration purposes.
In a real application, you would use a PDF generation library like jsPDF or PDFKit.`;
  };

  const generateExcelContent = (report) => {
    const csvData = [
      ['Report Name', report.name],
      ['Generated', new Date().toLocaleString()],
      ['Category', report.category],
      ['Description', report.description],
      [''],
      ['Sample Data:'],
      ...Object.entries(report.sampleData || {}).map(([key, value]) => [key, value])
    ];

    return csvData.map(row => row.join(',')).join('\n');
  };

  const generateCSVContent = (report) => {
    const csvData = [
      ['Field', 'Value'],
      ['Report Name', report.name],
      ['Generated', new Date().toLocaleString()],
      ['Category', report.category],
      ['Description', report.description],
      ...Object.entries(report.sampleData || {}).map(([key, value]) => [key, value])
    ];

    return csvData.map(row => row.join(',')).join('\n');
  };

  const ReportCard = ({ report }) => {
  const IconComponent = report.icon;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6 hover:shadow-xl transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${report.color}-100 dark:bg-${report.color}-900/30 group-hover:scale-110 transition-transform`}>
          <IconComponent className={`w-6 h-6 text-${report.color}-600 dark:text-${report.color}-400`} />
        </div>
        <div className="text-right">
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-${report.color}-100 text-${report.color}-800 dark:bg-${report.color}-900 dark:text-${report.color}-200`}>
            {report.category}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {report.name}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {report.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{report.estimatedTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          <span>{report.popularity}% popular</span>
        </div>
      </div>

      {/* Action Buttons - Smaller Size */}
      <div className="flex flex-col sm:flex-row gap-1 pt-3 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setViewingReport(report)}
          className="flex items-center justify-center gap-1 px-2 py-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs"
        >
          <Eye className="w-3 h-3" />
          <span className="hidden sm:inline">View Details</span>
          <span className="sm:hidden">View</span>
        </button>
        
        <div className="flex gap-1">
          <button
            onClick={() => handleDownloadReport(report, 'pdf')}
            className="flex items-center justify-center gap-1 px-2 py-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs flex-1 sm:flex-none"
          >
            <File className="w-3 h-3" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => handleDownloadReport(report, 'xlsx')}
            className="flex items-center justify-center gap-1 px-2 py-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-xs flex-1 sm:flex-none"
          >
            <FileSpreadsheet className="w-3 h-3" />
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
        
        <button
          onClick={() => {
            setReportParameters({});
            setSelectedReport(report);
          }}
          className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
        >
          <Play className="w-3 h-3" />
          <span className="hidden sm:inline">Generate</span>
          <span className="sm:hidden">Run</span>
        </button>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-400">
          Last: {report.lastGenerated}
        </span>
        <div className="flex gap-1">
          {report.parameters.map((param, index) => (
            <div key={index} className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

  // Enhanced Report Detail Modal
  const ReportDetailModal = ({ report, onClose }) => {
    if (!report) return null;

    const IconComponent = report.icon;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-xl rounded-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{report.name}</h3>
                    <p className="text-blue-100 text-sm">{report.category} Report</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Report Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Generation Time</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.estimatedTime}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Popularity</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.popularity}%</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <File className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">File Size</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.fileSize}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Last Generated</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.lastGenerated}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Generated By</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.generatedBy}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Export Formats</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{report.format}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Report Description
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{report.description_detailed}</p>
              </div>

              {/* Parameters */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Required Parameters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.parameters.map((param, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm rounded-full font-medium"
                    >
                      {param.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Data Preview */}
              {report.sampleData && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Data Preview
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(report.sampleData).map(([key, value], index) => (
                        <div key={index} className="text-center">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {typeof value === 'number' && key.includes('Amount') ? 
                              `₹${value.toLocaleString()}` : 
                              typeof value === 'number' && key.includes('Rate') ?
                              `${value}%` :
                              value
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Actions */}
            <div className="bg-slate-50 dark:bg-slate-700 px-6 py-4 border-t border-slate-200 dark:border-slate-600">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDownloadReport(report, 'pdf')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <File className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report, 'xlsx')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Download Excel
                  </button>
                  {report.format.includes('CSV') && (
                    <button
                      onClick={() => handleDownloadReport(report, 'csv')}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Download CSV
                    </button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setReportParameters({});
                      setSelectedReport(report);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ParameterModal = () => {
    if (!selectedReport) return null;

    const parameterOptions = {
      dateRange: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              placeholder="Start Date"
              value={reportParameters.startDate || ''}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              onChange={(e) => setReportParameters(prev => ({ ...prev, startDate: e.target.value }))}
            />
            <input
              type="date"
              placeholder="End Date"
              value={reportParameters.endDate || ''}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              onChange={(e) => setReportParameters(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </div>
      ),
      block: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Hostel Block</label>
          <select
            value={reportParameters.block || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, block: e.target.value }))}
          >
            <option value="">All Blocks</option>
            <option value="block-a">Block A - Boys</option>
            <option value="block-b">Block B - Girls</option>
            <option value="block-c">Block C - Mixed</option>
            <option value="block-d">Block D - PG</option>
            <option value="block-e">Block E - Faculty</option>
          </select>
        </div>
      ),
      semester: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Semester</label>
          <select
            value={reportParameters.semester || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, semester: e.target.value }))}
          >
            <option value="">Select Semester</option>
            <option value="spring-2024">Spring 2024</option>
            <option value="fall-2024">Fall 2024</option>
            <option value="spring-2025">Spring 2025</option>
          </select>
        </div>
      ),
      minimumAmount: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Minimum Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter minimum amount"
            value={reportParameters.minimumAmount || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, minimumAmount: e.target.value }))}
          />
        </div>
      ),
      year: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Year</label>
          <select
            value={reportParameters.year || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, year: e.target.value }))}
          >
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      ),
      month: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Month</label>
          <select
            value={reportParameters.month || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, month: e.target.value }))}
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      ),
      roomType: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Room Type</label>
          <select
            value={reportParameters.roomType || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, roomType: e.target.value }))}
          >
            <option value="">All Room Types</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
            <option value="suite">Suite</option>
          </select>
        </div>
      ),
      academicYear: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Academic Year</label>
          <select
            value={reportParameters.academicYear || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, academicYear: e.target.value }))}
          >
            <option value="">Select Academic Year</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
          </select>
        </div>
      ),
      expenseCategory: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Expense Category</label>
          <select
            value={reportParameters.expenseCategory || ''}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            onChange={(e) => setReportParameters(prev => ({ ...prev, expenseCategory: e.target.value }))}
          >
            <option value="">All Categories</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="cleaning">Cleaning</option>
            <option value="repairs">General Repairs</option>
            <option value="preventive">Preventive Maintenance</option>
          </select>
        </div>
      ),
      includeComparisons: (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Include Comparisons</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="includeComparisons"
                value="yes"
                checked={reportParameters.includeComparisons === 'yes'}
                className="text-blue-600"
                onChange={(e) => setReportParameters(prev => ({ ...prev, includeComparisons: e.target.value }))}
              />
              <span className="text-slate-700 dark:text-slate-300">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="includeComparisons"
                value="no"
                checked={reportParameters.includeComparisons === 'no'}
                className="text-blue-600"
                onChange={(e) => setReportParameters(prev => ({ ...prev, includeComparisons: e.target.value }))}
              />
              <span className="text-slate-700 dark:text-slate-300">No</span>
            </label>
          </div>
        </div>
      )
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <selectedReport.icon className={`w-6 h-6 text-${selectedReport.color}-600`} />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedReport.name}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Configure report parameters</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {selectedReport.parameters.map(param => (
                <div key={param}>
                  {parameterOptions[param] || (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                        {param.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${param}`}
                        value={reportParameters[param] || ''}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        onChange={(e) => setReportParameters(prev => ({ ...prev, [param]: e.target.value }))}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">Estimated Generation Time</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{selectedReport.estimatedTime}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={generatingReport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {generatingReport ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReportPreviewModal = () => {
    if (!generatedReport) return null;

    const handleExport = (format) => {
      handleDownloadReport(generatedReport, format);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <generatedReport.icon className={`w-6 h-6 text-${generatedReport.color}-600`} />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{generatedReport.name}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Generated on {new Date(generatedReport.generatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleExport('pdf')}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <File className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button
                  onClick={() => handleExport('xlsx')}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline">Excel</span>
                </button>
                <button
                  onClick={() => setGeneratedReport(null)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sample Report Content */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
              {generatedReport.id === 1 && ( // Fee Collection Summary
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">₹{(generatedReport.data.totalCollected / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Collected</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">₹{(generatedReport.data.totalExpected / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Expected</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">₹{(generatedReport.data.totalPending / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Pending</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">{generatedReport.data.collectionRate}%</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Collection Rate</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Block</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Expected</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Collected</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Pending</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedReport.data.blockBreakdown.map((block, index) => (
                          <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="py-3 px-4 text-slate-900 dark:text-white">{block.block}</td>
                            <td className="py-3 px-4 text-right text-slate-700 dark:text-slate-300">₹{block.expected.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-green-600">₹{block.collected.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-red-600">₹{block.pending.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-slate-700 dark:text-slate-300">
                              {block.expected > 0 ? ((block.collected / block.expected) * 100).toFixed(1) : '0'}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {generatedReport.id === 2 && ( // Defaulter List
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">{generatedReport.data.totalDefaulters}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Defaulters</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">₹{(generatedReport.data.totalAmount / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Amount Due</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-yellow-600">{generatedReport.data.criticalCases}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Critical Cases</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Student Name</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Room</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Amount Due</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-700 dark:text-slate-300">Days Overdue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedReport.data.defaulters.map((defaulter, index) => (
                          <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                            <td className="py-3 px-4 text-slate-900 dark:text-white">{defaulter.name}</td>
                            <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{defaulter.room}</td>
                            <td className="py-3 px-4 text-right text-red-600 font-semibold">₹{defaulter.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                defaulter.days > 60 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                defaulter.days > 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                              }`}>
                                {defaulter.days} days
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Default preview for other reports */}
              {generatedReport.id > 2 && (
                <div className="text-center py-12">
                  <generatedReport.icon className={`w-16 h-16 text-${generatedReport.color}-600 mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Report Generated Successfully</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Your {generatedReport.name} has been generated and is ready for export.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Generation Complete
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
    {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Available</p>
                <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{reportTemplates.length}</p>
              </div>
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Generated</p>
                <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">12</p>
              </div>
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Popular</p>
                <p className="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400">Fee Report</p>
              </div>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Avg Time</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">2.5m</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => {
              const count = category === 'All' 
                ? reportTemplates.length 
                : reportTemplates.filter(r => r.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category === 'All' ? '' : category)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    (categoryFilter === '' && category === 'All') || categoryFilter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {category}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    (categoryFilter === '' && category === 'All') || categoryFilter === category
                      ? 'bg-blue-500 text-blue-100'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <div className="col-span-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-12 text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Reports Found</h3>
              <p className="text-slate-600 dark:text-slate-400">
                No reports match your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Recent Reports */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Recently Generated</h2>
          <div className="space-y-3">
            {reportTemplates.slice(0, 5).map(report => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${report.color}-100 dark:bg-${report.color}-900/30`}>
                    <report.icon className={`w-4 h-4 text-${report.color}-600 dark:text-${report.color}-400`} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{report.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Generated on {report.lastGenerated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewingReport(report)}
                    className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDownloadReport(report, 'pdf')}
                    className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ParameterModal />
      <ReportPreviewModal />
      <ReportDetailModal report={viewingReport} onClose={() => setViewingReport(null)} />
    </div>
  );
};

export default Reports;