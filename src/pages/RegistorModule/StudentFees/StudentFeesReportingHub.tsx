

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  IndianRupee, 
  Users, 
  TrendingUp, 
  Sun,
  Moon,
  Search,
  Eye,
  FileSpreadsheet,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'collection' | 'analysis' | 'financial' | 'student';
  parameters: string[];
  sampleData?: any[];
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface ReportParams {
  dateRange: DateRange;
  course?: string;
  semester?: string;
  paymentStatus?: string;
  feeType?: string;
}

// Centralized theme
const theme = {
  background: 'bg-gray-100 dark:bg-gray-900',
  headerBg: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
  cardBg: 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700',
  text: 'text-gray-900 dark:text-white',
  textSecondary: 'text-gray-600 dark:text-gray-400',
  border: 'border-gray-200 dark:border-gray-700',
  input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400',
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    disabled: 'bg-gray-400 cursor-not-allowed'
  },
  icon: 'text-gray-400 dark:text-gray-600'
};

const StudentFeesReportingHub: React.FC = () => {

  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null);
  const [reportParams, setReportParams] = useState<ReportParams>({
    dateRange: { startDate: '', endDate: '' }
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewData, setPreviewData] = useState<any[] | null>(null);

  // Sample Report Templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'collection-summary',
      title: 'Fee Collection Summary',
      description: 'Overview of total fees collected, outstanding, and defaulters',
      icon: <IndianRupee className="w-6 h-6" />,
      category: 'collection',
      parameters: ['dateRange'],
      sampleData: [
        { metric: 'Total Collectible', value: 2850000 },
        { metric: 'Collected', value: 2130000 },
        { metric: 'Outstanding', value: 720000 },
        { metric: 'Defaulters', value: 156 }
      ]
    },
    {
      id: 'defaulter-list',
      title: 'Defaulter List',
      description: 'List of students with outstanding payments',
      icon: <AlertCircle className="w-6 h-6" />,
      category: 'student',
      parameters: ['dateRange', 'course', 'semester'],
      sampleData: [
        { student: 'John Smith', course: 'B.Tech CSE', semester: '5', outstanding: 15000 },
        { student: 'Emily Davis', course: 'MBA', semester: '3', outstanding: 8500 },
        { student: 'Michael Chen', course: 'B.Sc Physics', semester: '2', outstanding: 12000 }
      ]
    },
    {
      id: 'payment-analysis',
      title: 'Payment Mode Analysis',
      description: 'Distribution of collections by payment mode (Cash, Online, etc.)',
      icon: <PieChart className="w-6 h-6" />,
      category: 'analysis',
      parameters: ['dateRange'],
      sampleData: [
        { mode: 'Online', amount: 1250000 },
        { mode: 'Cash', amount: 550000 },
        { mode: 'Cheque/DD', amount: 330000 }
      ]
    },
    {
      id: 'monthly-trends',
      title: 'Monthly Collection Trends',
      description: 'Month-wise fee collection vs target analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      category: 'financial',
      parameters: ['dateRange'],
      sampleData: [
        { month: 'Apr', collected: 180000, target: 200000 },
        { month: 'May', collected: 220000, target: 250000 },
        { month: 'Jun', collected: 280000, target: 300000 }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Reports' },
    { id: 'collection', label: 'Collection Reports' },
    { id: 'analysis', label: 'Analysis Reports' },
    { id: 'financial', label: 'Financial Reports' },
    { id: 'student', label: 'Student Reports' }
  ];

  const filteredReports = reportTemplates.filter(
    (report) =>
      (selectedCategory === 'all' || report.category === selectedCategory) &&
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = async () => {
    if (!selectedReport) return;
    setIsGenerating(true);
    setTimeout(() => {
      setPreviewData(selectedReport.sampleData || []);
      setIsGenerating(false);
    }, 1000);
  };

  const renderPreviewData = () => {
    if (!previewData || !selectedReport) return null;

    return (
      <div className={`mt-6 p-4 rounded-lg border ${theme.cardBg}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.text}`}>
          Report Preview: {selectedReport.title}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme.border}`}>
                {Object.keys(previewData[0] || {}).map((key) => (
                  <th key={key} className={`text-left p-2 font-medium ${theme.textSecondary}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.slice(0, 5).map((row, index) => (
                <tr key={index} className={`border-b ${theme.border}`}>
                  {Object.values(row).map((value: any, cellIndex) => (
                    <td key={cellIndex} className={`p-2 ${theme.textSecondary}`}>
                      {typeof value === 'number' && value > 1000 
                        ? `₹${value.toLocaleString()}` 
                        : String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {previewData.length > 5 && (
            <p className={`text-sm mt-2 ${theme.textSecondary}`}>
              Showing 5 of {previewData.length} records
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme.background}`}>
      {/* Header */}
      <div className={`border-b ${theme.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className={`text-2xl font-bold ${theme.text}`}>
                Student Fees Reporting Hub
              </h1>
              <p className={`text-sm ${theme.textSecondary}`}>
                Generate comprehensive financial reports for auditing and analysis
              </p>
            </div>
           
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Search className={`w-5 h-5 ${theme.icon}`} />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full md:w-64 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? theme.button.primary
                    : theme.button.secondary
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className={`p-6 rounded-lg border cursor-pointer transition-all hover:shadow-md ${theme.cardBg}`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300`}>
                  {report.icon}
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>{report.title}</h3>
              <p className={`text-sm ${theme.textSecondary}`}>{report.description}</p>
            </div>
          ))}
        </div>

        {/* Report Parameters Form */}
        {selectedReport && (
          <div className={`mt-8 p-6 rounded-lg border ${theme.cardBg}`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.text}`}>
              Generate Report: {selectedReport.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedReport.parameters.includes('dateRange') && (
                <div className="flex flex-col">
                  <label className={`text-sm mb-1 ${theme.textSecondary}`}>Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={reportParams.dateRange.startDate}
                      onChange={(e) => setReportParams({
                        ...reportParams,
                        dateRange: { ...reportParams.dateRange, startDate: e.target.value }
                      })}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${theme.input}`}
                    />
                    <input
                      type="date"
                      value={reportParams.dateRange.endDate}
                      onChange={(e) => setReportParams({
                        ...reportParams,
                        dateRange: { ...reportParams.dateRange, endDate: e.target.value }
                      })}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${theme.input}`}
                    />
                  </div>
                </div>
              )}
              {selectedReport.parameters.includes('course') && (
                <div className="flex flex-col">
                  <label className={`text-sm mb-1 ${theme.textSecondary}`}>Course</label>
                  <input
                    type="text"
                    value={reportParams.course || ''}
                    onChange={(e) => setReportParams({ ...reportParams, course: e.target.value })}
                    className={`px-3 py-2 rounded-lg border text-sm ${theme.input}`}
                  />
                </div>
              )}
              {selectedReport.parameters.includes('semester') && (
                <div className="flex flex-col">
                  <label className={`text-sm mb-1 ${theme.textSecondary}`}>Semester</label>
                  <input
                    type="text"
                    value={reportParams.semester || ''}
                    onChange={(e) => setReportParams({ ...reportParams, semester: e.target.value })}
                    className={`px-3 py-2 rounded-lg border text-sm ${theme.input}`}
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  isGenerating ? theme.button.disabled : theme.button.primary
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
              {previewData && (
                <>
                  <button className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${theme.button.secondary}`}>
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${theme.button.secondary}`}>
                    <Eye className="w-4 h-4" />
                    Detailed View
                  </button>
                </>
              )}
            </div>

            {renderPreviewData()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFeesReportingHub;