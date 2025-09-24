import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  FileText,
  PieChart,
  Activity,
  DollarSign,
  Car,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  ChevronDown,
  Mail,
  User,
  Settings,
  Play,
  Pause,
  Trash2,
  Edit,
  Plus,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

const TransportReports = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { reportType } = useParams();
  const location = useLocation();
  
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportFilters, setReportFilters] = useState({
    vehicle: 'all',
    route: 'all',
    driver: 'all'
  });
  const [scheduleSettings, setScheduleSettings] = useState({
    frequency: 'weekly',
    day: 'monday',
    time: '09:00',
    email: '',
    format: 'pdf',
    reportName: '',
    reportType: ''
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'Vehicle Cost Weekly Report',
      reportType: 'vehicle-cost',
      frequency: 'weekly',
      day: 'monday',
      time: '09:00',
      email: 'admin@college.edu',
      format: 'pdf',
      isActive: true,
      nextRun: '2025-09-30 09:00',
      lastRun: '2025-09-23 09:00'
    },
    {
      id: 2,
      name: 'Route Profitability Monthly',
      reportType: 'route-profitability',
      frequency: 'monthly',
      day: '1',
      time: '08:00',
      email: 'finance@college.edu',
      format: 'excel',
      isActive: true,
      nextRun: '2025-10-01 08:00',
      lastRun: '2025-09-01 08:00'
    },
    {
      id: 3,
      name: 'Fuel Consumption Daily',
      reportType: 'fuel-consumption',
      frequency: 'daily',
      day: '',
      time: '07:30',
      email: 'operations@college.edu',
      format: 'both',
      isActive: false,
      nextRun: '2025-09-24 07:30',
      lastRun: '2025-09-22 07:30'
    }
  ]);

  // Report categories with their corresponding URL paths
  const reportCategories = [
    { 
      id: 'vehicle-cost', 
      title: 'Vehicle Cost Analysis', 
      icon: DollarSign, 
      description: 'Detailed cost breakdown by vehicle and route',
      path: 'vehicle-cost-report'
    },
    { 
      id: 'route-profitability', 
      title: 'Route Profitability', 
      icon: TrendingUp, 
      description: 'Revenue and cost analysis per route',
      path: 'route-profitability-report'
    },
    { 
      id: 'fuel-consumption', 
      title: 'Fuel Consumption Trend', 
      icon: Activity, 
      description: 'Fuel usage patterns and efficiency metrics',
      path: 'fuel-consumption-report'
    },
    { 
      id: 'accident-allocation', 
      title: 'Accident Allocation Summary', 
      icon: AlertTriangle, 
      description: 'Safety incidents and cost allocation',
      path: 'accident-allocation-report'
    },
    { 
      id: 'schedule', 
      title: 'Scheduled Reports', 
      icon: Clock, 
      description: 'Manage and view scheduled report configurations',
      path: 'schedule-report'
    }
  ];

  // Get current report based on URL parameter
  const getCurrentReportFromUrl = () => {
    if (!reportType) return 'vehicle-cost';
    
    const reportMap = {
      'vehicle-cost-report': 'vehicle-cost',
      'route-profitability-report': 'route-profitability',
      'fuel-consumption-report': 'fuel-consumption',
      'accident-allocation-report': 'accident-allocation',
      'schedule-report': 'schedule'
    };
    
    return reportMap[reportType] || 'vehicle-cost';
  };

  const [selectedReport, setSelectedReport] = useState(getCurrentReportFromUrl());

  // Update selected report when URL changes
  useEffect(() => {
    const newReport = getCurrentReportFromUrl();
    setSelectedReport(newReport);
    
    // Auto-open schedule modal if coming from another report with quick schedule
    if (newReport === 'schedule' && location.state?.openModal) {
      const { fromReport, fromReportTitle } = location.state;
      setScheduleSettings(prev => ({
        ...prev,
        reportName: fromReportTitle,
        reportType: fromReport
      }));
      setShowScheduleModal(true);
    }
    
    // Update schedule settings with current report name
    const currentReportCategory = reportCategories.find(cat => cat.id === newReport);
    if (currentReportCategory && newReport !== 'schedule') {
      setScheduleSettings(prev => ({
        ...prev,
        reportName: currentReportCategory.title,
        reportType: newReport
      }));
    }
  }, [reportType, location.state]);

  // Navigation function for report selection
  const handleReportSelection = (reportId) => {
    const report = reportCategories.find(r => r.id === reportId);
    if (report) {
      setSelectedReport(reportId);
      navigate(`/management/transport/reports/${report.path}`, { replace: true });
    }
  };

  // Sample data for all reports
  const allSampleData = {
    'vehicle-cost': {
      all: {
        totalCost: '₹45,230',
        vehicles: 12,
        avgCostPerVehicle: '₹3,769',
        highestCost: 'BUS-001 (₹5,240)',
        trend: '+8.2%'
      },
      'BUS-001': {
        totalCost: '₹5,240',
        vehicles: 1,
        avgCostPerVehicle: '₹5,240',
        highestCost: 'BUS-001 (₹5,240)',
        trend: '+12.1%'
      },
      'BUS-002': {
        totalCost: '₹4,180',
        vehicles: 1,
        avgCostPerVehicle: '₹4,180',
        highestCost: 'BUS-002 (₹4,180)',
        trend: '+6.3%'
      },
      'VAN-001': {
        totalCost: '₹2,890',
        vehicles: 1,
        avgCostPerVehicle: '₹2,890',
        highestCost: 'VAN-001 (₹2,890)',
        trend: '+3.7%'
      }
    },
    'route-profitability': {
      all: {
        totalRevenue: '₹67,890',
        totalCost: '₹45,230',
        profit: '₹22,660',
        profitMargin: '33.4%',
        trend: '+12.5%'
      },
      'Route A': {
        totalRevenue: '₹24,500',
        totalCost: '₹12,400',
        profit: '₹12,100',
        profitMargin: '49.4%',
        trend: '+18.2%'
      }
    },
    'fuel-consumption': {
      all: {
        totalConsumption: '2,450L',
        avgEfficiency: '8.5 km/L',
        monthlyCost: '₹3,920',
        efficiency: '+5.8%',
        trend: '-2.3%'
      }
    },
    'accident-allocation': {
      all: {
        totalIncidents: '12',
        totalCost: '₹8,450',
        avgCostPerIncident: '₹704',
        severity: 'Medium',
        trend: '-15.2%'
      }
    },
    'schedule': {
      all: {
        activeSchedules: '5',
        totalReports: '127',
        nextScheduled: 'Tomorrow 9:00 AM',
        lastGenerated: 'Today 8:30 AM',
        trend: '+15.2%'
      }
    }
  };

  // Get sample data based on current filters
  const getSampleData = () => {
    const currentData = allSampleData[selectedReport];
    if (!currentData) return {};

    if (reportFilters.vehicle !== 'all') {
      return currentData[reportFilters.vehicle] || currentData.all;
    }
    if (reportFilters.route !== 'all') {
      return currentData[reportFilters.route] || currentData.all;
    }
    if (reportFilters.driver !== 'all') {
      return currentData[reportFilters.driver] || currentData.all;
    }
    
    return currentData.all;
  };

  // Get chart data based on current report and filters
  const getChartData = () => {
    const baseData = {
      'vehicle-cost': [
        { name: 'BUS-001', value: 5240, color: '#3B82F6' },
        { name: 'BUS-002', value: 4180, color: '#8B5CF6' },
        { name: 'VAN-001', value: 2890, color: '#10B981' },
        { name: 'BUS-003', value: 4320, color: '#F59E0B' }
      ],
      'route-profitability': [
        { name: 'Route A', value: 12100, color: '#3B82F6' },
        { name: 'Route B', value: 10000, color: '#8B5CF6' },
        { name: 'Route C', value: 8000, color: '#10B981' },
        { name: 'Route D', value: 9500, color: '#F59E0B' }
      ],
      'fuel-consumption': [
        { name: 'BUS-001', value: 890, color: '#3B82F6' },
        { name: 'BUS-002', value: 820, color: '#8B5CF6' },
        { name: 'VAN-001', value: 420, color: '#10B981' },
        { name: 'BUS-003', value: 750, color: '#F59E0B' }
      ],
      'accident-allocation': [
        { name: 'Minor', value: 8, color: '#10B981' },
        { name: 'Major', value: 3, color: '#F59E0B' },
        { name: 'Critical', value: 1, color: '#EF4444' }
      ],
      'schedule': [
        { name: 'Daily Reports', value: 2, color: '#3B82F6' },
        { name: 'Weekly Reports', value: 2, color: '#10B981' },
        { name: 'Monthly Reports', value: 1, color: '#F59E0B' }
      ]
    };

    let data = baseData[selectedReport] || [];

    if (reportFilters.vehicle !== 'all') {
      data = data.filter(item => item.name === reportFilters.vehicle);
    }
    if (reportFilters.route !== 'all' && selectedReport === 'route-profitability') {
      data = data.filter(item => item.name === reportFilters.route);
    }

    return data;
  };

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Generate Report function with real functionality
  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      showToast('Generating report...', 'info');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportData = {
        type: selectedReport,
        title: reportCategories.find(cat => cat.id === selectedReport)?.title,
        dateRange,
        filters: reportFilters,
        generatedAt: new Date().toISOString(),
        data: getChartData(),
        metrics: getSampleData()
      };

      console.log('Generated Report Data:', reportData);
      showToast(`${reportData.title} report generated successfully!`, 'success');
      
    } catch (error) {
      console.error('Error generating report:', error);
      showToast('Failed to generate report. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export to PDF function
  const exportToPDF = async (reportData) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Add title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(reportData.title, 20, yPosition);
    yPosition += 15;

    // Add metadata
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${reportData.generatedAt}`, 20, yPosition);
    yPosition += 10;
    
    if (reportData.dateRange.start || reportData.dateRange.end) {
      doc.text(`Period: ${reportData.dateRange.start || 'Start'} to ${reportData.dateRange.end || 'End'}`, 20, yPosition);
      yPosition += 10;
    }

    // Add filters
    yPosition += 5;
    doc.setFont(undefined, 'bold');
    doc.text('Filters Applied:', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');
    
    Object.entries(reportData.filters).forEach(([key, value]) => {
      if (value !== 'all') {
        doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 25, yPosition);
        yPosition += 6;
      }
    });

    // Add metrics
    yPosition += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Key Metrics:', 20, yPosition);
    yPosition += 8;
    doc.setFont(undefined, 'normal');

    Object.entries(reportData.metrics).forEach(([key, value]) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      doc.text(`${formattedKey}: ${value}`, 25, yPosition);
      yPosition += 8;
    });

    // Add chart data
    if (reportData.data && reportData.data.length > 0) {
      yPosition += 10;
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont(undefined, 'bold');
      doc.text('Chart Data:', 20, yPosition);
      yPosition += 8;
      doc.setFont(undefined, 'normal');

      reportData.data.forEach((item) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        const value = selectedReport === 'fuel-consumption' ? `${item.value}L` :
                     selectedReport === 'accident-allocation' ? `${item.value} incidents` :
                     selectedReport === 'schedule' ? `${item.value} reports` :
                     `₹${item.value.toLocaleString()}`;
        doc.text(`${item.name}: ${value}`, 25, yPosition);
        yPosition += 8;
      });
    }

    // Save the PDF
    const filename = `${reportData.type}-report-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
  };

  // Export to Excel function
  const exportToExcel = async (reportData) => {
    const workbook = XLSX.utils.book_new();

    // Create summary sheet
    const summaryData = [
      ['Report Title', reportData.title],
      ['Generated At', reportData.generatedAt],
      ['Date Range Start', reportData.dateRange.start || 'N/A'],
      ['Date Range End', reportData.dateRange.end || 'N/A'],
      [''],
      ['Filters Applied', ''],
      ...Object.entries(reportData.filters).map(([key, value]) => [
        key.charAt(0).toUpperCase() + key.slice(1),
        value === 'all' ? 'All' : value
      ]),
      [''],
      ['Key Metrics', ''],
      ...Object.entries(reportData.metrics).map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        value
      ])
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Create data sheet
    if (reportData.data && reportData.data.length > 0) {
      const dataHeaders = ['Name', 'Value', 'Formatted Value'];
      const dataRows = reportData.data.map(item => [
        item.name,
        item.value,
        selectedReport === 'fuel-consumption' ? `${item.value}L` :
        selectedReport === 'accident-allocation' ? `${item.value} incidents` :
        selectedReport === 'schedule' ? `${item.value} reports` :
        `₹${item.value.toLocaleString()}`
      ]);

      const dataSheet = XLSX.utils.aoa_to_sheet([dataHeaders, ...dataRows]);
      XLSX.utils.book_append_sheet(workbook, dataSheet, 'Data');
    }

    // Save the Excel file
    const filename = `${reportData.type}-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  // Export function with real functionality
  const handleExport = async (format) => {
    try {
      setIsExporting(true);
      showToast(`Preparing ${format.toUpperCase()} export...`, 'info');
      
      const reportData = {
        type: selectedReport,
        title: reportCategories.find(cat => cat.id === selectedReport)?.title,
        dateRange,
        filters: reportFilters,
        data: getChartData(),
        metrics: getSampleData(),
        generatedAt: new Date().toLocaleString()
      };

      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (format === 'pdf') {
        await exportToPDF(reportData);
      } else if (format === 'excel') {
        await exportToExcel(reportData);
      }
      
      showToast(`Report exported to ${format.toUpperCase()} successfully!`, 'success');
      
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      showToast(`Failed to export to ${format.toUpperCase()}. Please try again.`, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Navigate to schedule management
  const handleScheduleReport = () => {
    navigate('/management/transport/reports/schedule-report', { replace: true });
  };

  // Quick schedule from current report
  const handleQuickSchedule = () => {
    const currentReportCategory = reportCategories.find(cat => cat.id === selectedReport);
    navigate('/management/transport/reports/schedule-report', { 
      replace: true,
      state: { 
        openModal: true,
        fromReport: selectedReport,
        fromReportTitle: currentReportCategory?.title 
      }
    });
  };

  // Handle schedule form submission
  const handleScheduleSubmit = async () => {
    try {
      if (!scheduleSettings.email) {
        showToast('Please enter an email address', 'error');
        return;
      }

      showToast('Creating scheduled report...', 'info');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const scheduleData = {
        id: Date.now(),
        name: `${scheduleSettings.reportName} - ${scheduleSettings.frequency}`,
        reportType: scheduleSettings.reportType || selectedReport,
        reportTitle: scheduleSettings.reportName,
        filters: reportFilters,
        dateRange,
        ...scheduleSettings,
        isActive: true,
        nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        lastRun: null,
        createdAt: new Date().toISOString()
      };

      // Add to scheduled reports
      setScheduledReports(prev => [...prev, scheduleData]);
      
      console.log('Scheduled Report Data:', scheduleData);
      
      setShowScheduleModal(false);
      showToast('Report scheduled successfully! You will receive email notifications.', 'success');
      
      // Reset schedule form
      setScheduleSettings(prev => ({
        ...prev,
        email: '',
        frequency: 'weekly',
        day: 'monday',
        time: '09:00',
        format: 'pdf'
      }));
      
    } catch (error) {
      console.error('Error scheduling report:', error);
      showToast('Failed to schedule report. Please try again.', 'error');
    }
  };

  // Handle schedule actions
  const handleScheduleAction = (action, scheduleId) => {
    setScheduledReports(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        switch (action) {
          case 'toggle':
            showToast(`Schedule ${schedule.isActive ? 'paused' : 'activated'}`, 'success');
            return { ...schedule, isActive: !schedule.isActive };
          case 'delete':
            showToast('Schedule deleted successfully', 'success');
            return null;
          default:
            return schedule;
        }
      }
      return schedule;
    }).filter(Boolean));
  };

  const clearFilters = () => {
    setReportFilters({ vehicle: 'all', route: 'all', driver: 'all' });
    setShowFilterPanel(false);
    showToast('Filters cleared successfully!', 'success');
  };

  const handleFilterChange = (filterType, value) => {
    setReportFilters(prev => ({ ...prev, [filterType]: value }));
    showToast(`Filter applied: ${filterType} = ${value}`, 'success');
  };

  // Render Schedule Report View
  const renderScheduleView = () => {
    const locationState = location.state;
    const contextReport = locationState?.fromReport;
    const contextReportTitle = locationState?.fromReportTitle;

    return (
      <div className="space-y-6">
        {/* Context Banner - if came from another report */}
        {contextReport && contextReport !== 'schedule' && (
          <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
            isDark ? 'bg-purple-900/20' : 'bg-purple-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">
                  <strong>Quick Schedule:</strong> Create a schedule for "{contextReportTitle}" report
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  You can also create schedules for other reports below
                </p>
              </div>
              <button
                onClick={() => {
                  setScheduleSettings(prev => ({
                    ...prev,
                    reportName: contextReportTitle,
                    reportType: contextReport
                  }));
                  setShowScheduleModal(true);
                }}
                className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Quick Schedule
              </button>
            </div>
          </div>
        )}

        {/* Schedule Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Scheduled Reports</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage automated report generation and delivery
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Schedule
            </button>
          </div>
        </div>

        {/* Scheduled Reports List */}
        <div className="space-y-4">
          {scheduledReports.map((schedule) => {
            const reportCategory = reportCategories.find(cat => cat.id === schedule.reportType);
            const ReportIcon = reportCategory?.icon || Clock;
            
            return (
              <div key={schedule.id} className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${schedule.isActive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <ReportIcon className={`w-4 h-4 ${schedule.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{schedule.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{reportCategory?.title}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        schedule.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {schedule.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Frequency:</span>
                        <p className="text-gray-600 dark:text-gray-400 capitalize">{schedule.frequency}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Format:</span>
                        <p className="text-gray-600 dark:text-gray-400">{schedule.format.toUpperCase()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                        <p className="text-gray-600 dark:text-gray-400 truncate">{schedule.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Next Run:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          {new Date(schedule.nextRun).toLocaleDateString()} at {schedule.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleScheduleAction('toggle', schedule.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        schedule.isActive
                          ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                          : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                      }`}
                      title={schedule.isActive ? 'Pause Schedule' : 'Activate Schedule'}
                    >
                      {schedule.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => handleScheduleAction('delete', schedule.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete Schedule"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {scheduledReports.length === 0 && (
            <div className="text-center py-16">
              <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                No Scheduled Reports
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                Create your first scheduled report to automate report generation and delivery. Choose from any of the available report types.
              </p>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center mx-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Schedule
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions for Report Types */}
        {scheduledReports.length > 0 && (
          <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h4 className="font-medium mb-3">Quick Schedule Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reportCategories.filter(cat => cat.id !== 'schedule').map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setScheduleSettings(prev => ({
                        ...prev,
                        reportName: category.title,
                        reportType: category.id
                      }));
                      setShowScheduleModal(true);
                    }}
                    className={`p-3 rounded-lg border transition-colors duration-200 text-left ${
                      isDark 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-blue-500 mb-2" />
                    <p className="text-sm font-medium">{category.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage.message} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          scheduleSettings={scheduleSettings}
          setScheduleSettings={setScheduleSettings}
          onSubmit={handleScheduleSubmit}
          isDark={isDark}
          reportCategories={reportCategories}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transport Reports
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive analytical reports for strategic planning and performance monitoring
            </p>
          </div>

          {/* Report Categories - Clickable tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {reportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleReportSelection(category.id)}
                  className={`p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedReport === category.id
                      ? isDark 
                        ? 'bg-blue-900/30 border-2 border-blue-500' 
                        : 'bg-blue-50 border-2 border-blue-500'
                      : isDark 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg ${
                      selectedReport === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{category.title}</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {selectedReport === 'schedule' ? (
              renderScheduleView()
            ) : (
              <>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                    Report Generator
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <button 
                        onClick={() => setShowFilterPanel(!showFilterPanel)}
                        className={`px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm flex items-center ${
                          showFilterPanel ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''
                        }`}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilterPanel ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className={`px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm ${
                          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                        }`}
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className={`px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm ${
                          isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                        }`}
                      />
                    </div>
                    <button 
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center text-sm"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Filter Panel */}
                {showFilterPanel && (
                  <div className={`mb-6 p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold">Filter Options</h4>
                      <button
                        onClick={clearFilters}
                        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Clear Filters
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Vehicle</label>
                        <select
                          value={reportFilters.vehicle}
                          onChange={(e) => handleFilterChange('vehicle', e.target.value)}
                          className={`w-full p-2 rounded border text-sm ${
                            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="all">All Vehicles</option>
                          <option value="BUS-001">BUS-001</option>
                          <option value="BUS-002">BUS-002</option>
                          <option value="VAN-001">VAN-001</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Route</label>
                        <select
                          value={reportFilters.route}
                          onChange={(e) => handleFilterChange('route', e.target.value)}
                          className={`w-full p-2 rounded border text-sm ${
                            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="all">All Routes</option>
                          <option value="Route A">Route A</option>
                          <option value="Route B">Route B</option>
                          <option value="Route C">Route C</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Driver</label>
                        <select
                          value={reportFilters.driver}
                          onChange={(e) => handleFilterChange('driver', e.target.value)}
                          className={`w-full p-2 rounded border text-sm ${
                            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="all">All Drivers</option>
                          <option value="John Smith">John Smith</option>
                          <option value="Sarah Johnson">Sarah Johnson</option>
                          <option value="Mike Davis">Mike Davis</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Interactive Chart Area */}
                  <div className={`p-4 rounded-lg border-2 border-dashed ${
                    isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-300 bg-gray-25'
                  }`}>
                    <div className="mb-4">
                      <h4 className="text-base font-medium mb-2">Interactive Chart</h4>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {reportCategories.find(cat => cat.id === selectedReport)?.title} Data
                      </p>
                    </div>
                    <div className="space-y-2">
                      {getChartData().map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: `${item.color}15` }}>
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-3" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="text-sm font-bold">
                            {selectedReport === 'fuel-consumption' ? `${item.value}L` :
                             selectedReport === 'accident-allocation' ? `${item.value} incidents` :
                             selectedReport === 'schedule' ? `${item.value} reports` :
                             `₹${item.value.toLocaleString()}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    {getChartData().length === 0 && (
                      <div className="text-center py-8">
                        <PieChart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500">No data available for selected filters</p>
                      </div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold mb-3">Key Metrics</h4>
                    {getSampleData() && Object.keys(getSampleData()).length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(getSampleData()).map(([key, value], index) => (
                          <div key={index} className={`p-3 rounded-lg flex justify-between items-center transition-all duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="text-sm font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-500">No metrics available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                  <button 
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm"
                  >
                    {isExporting ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Export to PDF
                  </button>
                  <button 
                    onClick={() => handleExport('excel')}
                    disabled={isExporting}
                    className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm"
                  >
                    {isExporting ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Export to Excel
                  </button>
                  <button 
                    onClick={handleQuickSchedule}
                    className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-sm"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Quick Schedule
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule Modal Component
const ScheduleModal = ({ isOpen, onClose, scheduleSettings, setScheduleSettings, onSubmit, isDark, reportCategories }) => {
  if (!isOpen) return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = scheduleSettings.email && validateEmail(scheduleSettings.email);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-lg w-full rounded-xl shadow-2xl ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Schedule Report</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Report Type
              </label>
              <select
                value={scheduleSettings.reportType}
                onChange={(e) => {
                  const selectedCategory = reportCategories.find(cat => cat.id === e.target.value);
                  setScheduleSettings({
                    ...scheduleSettings, 
                    reportType: e.target.value,
                    reportName: selectedCategory?.title || ''
                  });
                }}
                className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              >
                <option value="">Select Report Type</option>
                {reportCategories.filter(cat => cat.id !== 'schedule').map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Settings className="w-4 h-4 mr-1" />
                  Frequency
                </label>
                <select
                  value={scheduleSettings.frequency}
                  onChange={(e) => setScheduleSettings({...scheduleSettings, frequency: e.target.value})}
                  className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              {scheduleSettings.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Day of Week</label>
                  <select
                    value={scheduleSettings.day}
                    onChange={(e) => setScheduleSettings({...scheduleSettings, day: e.target.value})}
                    className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              )}

              {scheduleSettings.frequency !== 'weekly' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduleSettings.time}
                    onChange={(e) => setScheduleSettings({...scheduleSettings, time: e.target.value})}
                    className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                value={scheduleSettings.email}
                onChange={(e) => setScheduleSettings({...scheduleSettings, email: e.target.value})}
                placeholder="Enter email for report delivery"
                className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  scheduleSettings.email && !validateEmail(scheduleSettings.email) ? 'border-red-500' : ''
                }`}
              />
              {scheduleSettings.email && !validateEmail(scheduleSettings.email) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <select
                value={scheduleSettings.format}
                onChange={(e) => setScheduleSettings({...scheduleSettings, format: e.target.value})}
                className={`w-full p-3 rounded-lg border text-sm transition-colors ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              >
                <option value="pdf">PDF Only</option>
                <option value="excel">Excel Only</option>
                <option value="both">Both PDF & Excel</option>
              </select>
            </div>

            {scheduleSettings.reportName && (
              <div className={`p-3 rounded-lg text-xs ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                <strong>Summary:</strong> {scheduleSettings.reportName} will be generated {scheduleSettings.frequency} 
                {scheduleSettings.frequency === 'weekly' && ` on ${scheduleSettings.day}s`} at {scheduleSettings.time} 
                and sent to {scheduleSettings.email || '[email address]'} in {scheduleSettings.format.toUpperCase()} format.
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg border transition-colors duration-200 font-medium ${
                isDark 
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!isFormValid || !scheduleSettings.reportType}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Component with info type
const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
    <div className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden ${
      type === 'success' ? 'bg-green-600' : 
      type === 'error' ? 'bg-red-600' : 
      'bg-blue-600'
    }`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? <CheckCircle className="h-5 w-5 text-white" /> : 
             type === 'error' ? <AlertTriangle className="h-5 w-5 text-white" /> :
             <Clock className="h-5 w-5 text-white" />}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
  );

export default TransportReports;
