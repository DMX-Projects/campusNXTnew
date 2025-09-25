import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  FileText,
  Download,
  IndianRupee,
  Users,
  TrendingUp,
  Search,
  Eye,
  FileSpreadsheet,
  AlertCircle,
  BarChart3,
  PieChart,
  Filter,
  RefreshCw,
  Settings,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowLeft
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
  Program?: string;
  semester?: string;
  paymentStatus?: string;
  feeType?: string;
}

interface DashboardStats {
  totalCollectible: number;
  totalCollected: number;
  totalOutstanding: number;
  numberOfOverDue: number;
  collectionPercentage: number;
}

const StudentFeesReportingHub: React.FC = () => {
  const { isDark } = useTheme();

  const themeClasses = {
    light: {
      bg: 'bg-white',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      textMuted: 'text-slate-500',
      border: 'border-slate-200',
      button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      buttonSecondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      input: 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      shadow: 'shadow-sm'
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-slate-800',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-400',
      border: 'border-slate-700',
      button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
      input: 'bg-slate-700 border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400',
      shadow: 'shadow-sm shadow-black/20'
    }
  };
  const theme = themeClasses[isDark ? 'dark' : 'light'];

  // State
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportParams, setReportParams] = useState<ReportParams>({
    dateRange: { startDate: '', endDate: '' },
    Program: '',
    semester: '',
    paymentStatus: '',
    feeType: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewData, setPreviewData] = useState<any[] | null>(null);

  // Dashboard Stats
  const dashboardStats: DashboardStats = {
    totalCollectible: 2850000,
    totalCollected: 2130000,
    totalOutstanding: 720000,
    numberOfOverDue: 156,
    collectionPercentage: 74.7
  };

 
 
  // Enhanced Report Templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'collection-summary',
      title: 'Fee Collection Summary',
      description: 'Comprehensive overview of total fees collected, outstanding amounts, and Over Due statistics',
      icon: <IndianRupee className="w-6 h-6" />,
      category: 'collection',
      parameters: ['dateRange'],
      sampleData: [
        { metric: 'Total Collectible', value: 2850000, status: 'Target' },
        { metric: 'Amount Collected', value: 2130000, status: 'Received' },
        { metric: 'Outstanding Amount', value: 720000, status: 'Pending' },
        { metric: 'Over Due Count', value: 156, status: 'Critical' }
      ]
    },
    {
      id: 'Overdue-analysis',
      title: 'Defaulter Analysis Report',
      description: 'Detailed list of students with outstanding payments categorized by course and semester',
      icon: <AlertCircle className="w-6 h-6" />,
      category: 'student',
      parameters: ['dateRange', 'Program', 'semester'],
      sampleData: [
        { student: 'John Smith', Program: 'B.Tech CSE', semester: '5', outstanding: 15000, dueDate: '2024-03-15', status: 'Overdue' },
        { student: 'Emily Davis', Program: 'MBA Finance', semester: '3', outstanding: 8500, dueDate: '2024-03-20', status: 'Due Soon' },
        { student: 'Michael Chen', Program: 'B.Sc Physics', semester: '2', outstanding: 12000, dueDate: '2024-03-10', status: 'Overdue' },
        { student: 'Sarah Johnson', Program: 'M.Tech AI', semester: '4', outstanding: 22000, dueDate: '2024-03-25', status: 'Critical' }
      ]
    },
    {
      id: 'payment-analysis',
      title: 'Payment Mode Distribution',
      description: 'Analysis of fee collections by payment method with transaction success rates',
      icon: <PieChart className="w-6 h-6" />,
      category: 'analysis',
      parameters: ['dateRange'],
      sampleData: [
        { mode: 'Online UPI', amount: 850000, transactions: 1250, successRate: '98.5%' },
        { mode: 'Net Banking', amount: 400000, transactions: 320, successRate: '97.2%' },
        { mode: 'Cash Counter', amount: 550000, transactions: 890, successRate: '100%' },
        { mode: 'Cheque/DD', amount: 330000, transactions: 125, successRate: '94.8%' }
      ]
    },
    {
      id: 'monthly-trends',
      title: 'Monthly Collection Trends',
      description: 'Month-wise fee collection performance against targets with growth analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      category: 'financial',
      parameters: ['dateRange'],
      sampleData: [
        { month: 'January', collected: 280000, target: 300000, growth: '+12%', efficiency: '93.3%' },
        { month: 'February', collected: 320000, target: 350000, growth: '+14%', efficiency: '91.4%' },
        { month: 'March', collected: 420000, target: 400000, growth: '+31%', efficiency: '105%' },
        { month: 'April', collected: 380000, target: 420000, growth: '-9.5%', efficiency: '90.5%' }
      ]
    },
    {
      id: 'course-wise-analysis',
      title: 'Course-wise Fee Analysis',
      description: 'Department and course-specific fee collection with enrollment correlations',
      icon: <Users className="w-6 h-6" />,
      category: 'analysis',
      parameters: ['dateRange', 'course'],
      sampleData: [
        { Program: 'B.Tech Computer Science', enrolled: 240, collected: 180000, pending: 36000, rate: '83.3%' },
        { Program: 'MBA Finance', enrolled: 85, collected: 127500, pending: 12750, rate: '90.9%' },
        { Program: 'M.Tech AI/ML', enrolled: 45, collected: 90000, pending: 4500, rate: '95.2%' },
        { Program: 'B.Sc Physics', enrolled: 120, collected: 72000, pending: 18000, rate: '80.0%' }
      ]
    },
    {
      id: 'scholarship-report',
      title: 'Concession & Scholarship Report',
      description: 'Analysis of fee concessions, scholarships, and financial aid distributions',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'financial',
      parameters: ['dateRange', 'Program'],
      sampleData: [
        { type: 'Merit Scholarship', students: 45, amount: 225000, avgAmount: 5000 },
        { type: 'Need-based Aid', students: 32, amount: 192000, avgAmount: 6000 },
        { type: 'Sports Quota', students: 18, amount: 108000, avgAmount: 6000 },
        { type: 'Faculty Dependent', students: 12, amount: 84000, avgAmount: 7000 }
      ]
    }
  ];




  const categories = [
    { id: 'all', label: 'All Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'collection', label: 'Collection', icon: <IndianRupee className="w-4 h-4" /> },
    { id: 'analysis', label: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'financial', label: 'Financial', icon: <IndianRupee className="w-4 h-4" /> },
    { id: 'student', label: 'Student', icon: <Users className="w-4 h-4" /> }
  ];

  const filteredReports = reportTemplates.filter(
    (report) =>
      (selectedCategory === 'all' || report.category === selectedCategory) &&
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleReportClick = (report: ReportTemplate) => {
    setSelectedReport(report);
    setShowReportForm(true);
    setPreviewData(null);
    setReportParams({
      dateRange: { startDate: '', endDate: '' }
    });
  };

  const handleBackToReports = () => {
    setShowReportForm(false);
    setSelectedReport(null);
    setPreviewData(null);
  };

  const handleGenerateReport = async () => {
    if (!selectedReport) return;
    setIsGenerating(true);
    setTimeout(() => {
      setPreviewData(selectedReport.sampleData || []);
      setIsGenerating(false);
    }, 1500);
  };

  // Render Dashboard Stats
  const renderDashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1: Total Collectible */}
      <div className={`p-6 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${theme.textSecondary}`}>Total Collected</p>
            <p className={`text-2xl font-bold ${theme.text}`}>
              ₹{dashboardStats.totalCollected.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Amount Collected */}
      <div className={`p-6 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${theme.textSecondary}`}>Amount Collected</p>
            <p className={`text-2xl font-bold ${theme.text}`}>
              ₹{dashboardStats.totalCollected.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Card 3: Outstanding */}
      <div className={`p-6 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${theme.textSecondary}`}>Outstanding</p>
            <p className={`text-2xl font-bold ${theme.text}`}>
              ₹{dashboardStats.totalOutstanding.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Card 4: Defaulters */}
      <div className={`p-6 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${theme.textSecondary}`}>Over Due</p>
            <p className={`text-2xl font-bold ${theme.text}`}>
              {dashboardStats.numberOfOverDue}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );

  // Render Report Preview Table (8 rows sample)
  const renderPreviewData = () => {
    if (!previewData || !selectedReport) return null;
    return (
      <div className={`mt-8 p-6 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${theme.text}`}>Report Preview: {selectedReport.title}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            {previewData.length} Records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${theme.border}`}>
                {Object.keys(previewData[0] || {}).map((key) => (
                  <th key={key} className={`text-left p-4 font-semibold ${theme.text}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.slice(0, 8).map((row, index) => (
                <tr key={index} className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/30 ${theme.border}`}>
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    <td key={cellIndex} className={`p-4 ${theme.textSecondary}`}>
                      {key === 'status' ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          value === 'Overdue' || value === 'Critical'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : value === 'Due Soon' || value === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : value === 'Received' || value === 'Target'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {String(value)}
                        </span>
                      ) : typeof value === 'number' && value > 1000 ? (
                        <span className="font-medium">₹{value.toLocaleString()}</span>
                      ) : (
                        String(value)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {previewData.length > 8 && (
            <div className={`text-center py-4 ${theme.textSecondary}`}>
              <p className="text-sm">
                Showing 8 of {previewData.length} records &bull;
                <button className="ml-2 text-blue-500 hover:text-blue-600 font-medium">
                  View All Records
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };


  const handleExportToExcel = () => {
  if (!previewData || !selectedReport) return;
  const worksheet = XLSX.utils.json_to_sheet(previewData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, selectedReport.title);
  XLSX.writeFile(workbook, `${selectedReport.title}.xlsx`);
};

  // Render dynamic report form for each report template
  const renderReportForm = () => {
    if (!selectedReport || !showReportForm) return null;
    return (
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToReports}
          className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${theme.buttonSecondary}`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Reports
        </button>
        <div className={`p-8 rounded-lg border ${theme.shadow} ${theme.cardBg}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              {selectedReport.icon}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${theme.text}`}>{selectedReport.title}</h2>
              <p className={`text-sm mt-1 ${theme.textSecondary}`}>{selectedReport.description}</p>
            </div>
          </div>
          {/* Dynamic filters based on report parameters */}
          {selectedReport.parameters.includes('dateRange') && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-3 ${theme.text}`}>Select Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs mb-1 ${theme.textSecondary}`}>From</label>
                  <input
                    type="date"
                    value={reportParams.dateRange.startDate}
                    onChange={e =>
                      setReportParams(p => ({ ...p, dateRange: {...p.dateRange, startDate: e.target.value } }))
                    }
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${theme.textSecondary}`}>To</label>
                  <input
                    type="date"
                    value={reportParams.dateRange.endDate}
                    onChange={e =>
                      setReportParams(p => ({ ...p, dateRange: {...p.dateRange, endDate: e.target.value } }))
                    }
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
                  />
                </div>
              </div>
            </div>
          )}
          {selectedReport.parameters.includes('course') && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-3 ${theme.text}`}>Course/Program</label>
              <select
                value={reportParams.Program}
                onChange={e => setReportParams(p => ({ ...p, Program: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
              >
                <option value="">All Programs</option>
                <option value="btech">B.Tech</option>
                <option value="mba">MBA</option>
                <option value="mtech">M.Tech</option>
                <option value="bsc">B.Sc</option>
                <option value="msc">M.Sc</option>
              </select>
            </div>
          )}
          {selectedReport.parameters.includes('semester') && (
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-3 ${theme.text}`}>Semester</label>
              <select
                value={reportParams.semester}
                onChange={e => setReportParams(p => ({ ...p, semester: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
              >
                <option value="">All Semesters</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i+1} value={(i+1).toString()}>Semester {i+1}</option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-3 ${theme.text}`}>Payment Status</label>
            <select
              value={reportParams.paymentStatus}
              onChange={e => setReportParams(p => ({ ...p, paymentStatus: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="partial">Partially Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-3 ${theme.text}`}>Fee Type</label>
            <select
              value={reportParams.feeType}
              onChange={e => setReportParams(p => ({ ...p, feeType: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            >
              <option value="">All Fee Types</option>
              <option value="tuition">Tuition</option>
              <option value="hostel">Hostel</option>
              <option value="exam">Exam</option>
              <option value="library">Library</option>
              <option value="lab">Lab</option>
            </select>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-3 transition-all ${
                isGenerating ? 'opacity-50 cursor-not-allowed ' + theme.button : theme.button
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-5 h-5" />
                  Generate Report
                </>
              )}
            </button>
            {previewData && !isGenerating && (
              <>
                <button onClick={handleExportToExcel}   className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${theme.buttonSecondary}`}>
                  <Download className="w-5 h-5" /> Export to Excel
                </button>
           
      
              </>
            )}
          </div>
          {/* Progress */}
          {isGenerating && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${theme.text}`}>Generating Report...</span>
                <span className={`text-sm ${theme.textSecondary}`}>Processing data</span>
              </div>
            </div>
          )}
          {/* Table Preview */}
          {renderPreviewData()}
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
      {/* Header */}
      <div className={`border-b ${theme.border} ${theme.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className={`text-3xl font-bold ${theme.text}`}>Student Fees Reporting Hub</h1>
       
            </div>
          </div>
        </div>
      </div>

      {showReportForm
        ? renderReportForm()
        : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {renderDashboardStats()}

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
                  placeholder="Search report titles..."
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? theme.button : theme.buttonSecondary}`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredReports.map(report => (
                <div
                  key={report.id}
                  className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${theme.shadow} hover:shadow-lg hover:transform hover:scale-105 ${theme.cardBg}`}
                  onClick={() => handleReportClick(report)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">{report.icon}</div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>{report.title}</h3>
                  <p className={`text-sm mb-4 ${theme.textSecondary} line-clamp-3`}>
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${theme.textSecondary}`}>
                      {report.parameters.length} parameter{report.parameters.length !== 1 ? 's' : ''}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Generate →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default StudentFeesReportingHub;
