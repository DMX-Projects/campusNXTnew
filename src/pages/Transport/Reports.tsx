import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, TrendingDown, Users, Bus, DollarSign, AlertTriangle, FileText, Calendar, CheckCircle, X, ArrowLeft, PieChart, Activity } from 'lucide-react';

// Mock data
const students = Array.from({ length: 150 }, (_, i) => ({ id: i + 1, name: `Student ${i + 1}` }));
const buses = [
  { id: 1, status: 'active' },
  { id: 2, status: 'active' },
  { id: 3, status: 'maintenance' },
  { id: 4, status: 'active' }
];
const drivers = [
  { id: 1, attendanceToday: 'present' },
  { id: 2, attendanceToday: 'present' },
  { id: 3, attendanceToday: 'absent' }
];
const feeRecords = [
  { id: 1, monthlyFee: 2500, status: 'paid' },
  { id: 2, monthlyFee: 3000, status: 'paid' },
  { id: 3, monthlyFee: 2800, status: 'pending' }
];
const expenses = [
  { id: 1, amount: 5000 },
  { id: 2, amount: 3500 },
  { id: 3, amount: 2000 }
];

// Mock detailed report data
const getReportDetails = (reportType) => {
  const commonData = {
    daily: {
      metrics: [
        { label: 'Students Present', value: 142, total: 150, percentage: 95 },
        { label: 'Buses Active', value: 3, total: 4, percentage: 75 },
        { label: 'Routes Completed', value: 8, total: 8, percentage: 100 },
        { label: 'On-Time Performance', value: 87, total: 100, percentage: 87 }
      ],
      chartData: [
        { time: '6:00 AM', students: 35, buses: 2 },
        { time: '7:00 AM', students: 45, buses: 3 },
        { time: '8:00 AM', students: 62, buses: 4 },
        { time: '3:00 PM', students: 58, buses: 4 },
        { time: '4:00 PM', students: 42, buses: 3 }
      ]
    },
    financial: {
      metrics: [
        { label: 'Total Revenue', value: 8300, total: 10000, percentage: 83, currency: true },
        { label: 'Collection Rate', value: 95, total: 100, percentage: 95 },
        { label: 'Outstanding Fees', value: 1700, total: 10000, percentage: 17, currency: true },
        { label: 'Monthly Growth', value: 12, total: 100, percentage: 12 }
      ],
      chartData: [
        { month: 'Jan', revenue: 7800, expenses: 4200 },
        { month: 'Feb', revenue: 8300, expenses: 4500 },
        { month: 'Mar', revenue: 8100, expenses: 4300 },
        { month: 'Apr', revenue: 8600, expenses: 4400 }
      ]
    },
    maintenance: {
      metrics: [
        { label: 'Buses Operational', value: 3, total: 4, percentage: 75 },
        { label: 'Maintenance Cost', value: 2500, total: 5000, percentage: 50, currency: true },
        { label: 'Scheduled Services', value: 2, total: 4, percentage: 50 },
        { label: 'Emergency Repairs', value: 1, total: 4, percentage: 25 }
      ],
      chartData: [
        { bus: 'Bus 1', mileage: 15000, lastService: '2024-02-15' },
        { bus: 'Bus 2', mileage: 18500, lastService: '2024-02-10' },
        { bus: 'Bus 3', mileage: 22000, lastService: '2024-01-28' },
        { bus: 'Bus 4', mileage: 12000, lastService: '2024-02-20' }
      ]
    },
    routes: {
      metrics: [
        { label: 'Avg. Route Time', value: 45, total: 60, percentage: 75, unit: 'min' },
        { label: 'Fuel Efficiency', value: 12, total: 15, percentage: 80, unit: 'km/l' },
        { label: 'Route Optimization', value: 88, total: 100, percentage: 88 },
        { label: 'Student Satisfaction', value: 92, total: 100, percentage: 92 }
      ],
      chartData: [
        { route: 'Route A', distance: 25, students: 35, efficiency: 85 },
        { route: 'Route B', distance: 30, students: 42, efficiency: 78 },
        { route: 'Route C', distance: 22, students: 38, efficiency: 92 },
        { route: 'Route D', distance: 28, students: 35, efficiency: 80 }
      ]
    }
  };
  return commonData[reportType] || commonData.daily;
};

// StatCard Component
const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600'
  };
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${changeColors[changeType]}`}>
              {changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : ''}{change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Report Viewer Component
const ReportViewer = ({ report, onClose }) => {
  const reportDetails = getReportDetails(report.type);

  const MetricCard = ({ metric }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
        <span className="text-xs text-gray-400">
          {metric.percentage}%
        </span>
      </div>
      <div className="flex items-end space-x-2">
        <span className="text-2xl font-bold text-gray-800">
          {metric.currency ? '₹' : ''}{metric.value.toLocaleString()}{metric.unit || ''}
        </span>
        {metric.total && (
          <span className="text-sm text-gray-500 pb-1">
            / {metric.currency ? '₹' : ''}{metric.total.toLocaleString()}{metric.unit || ''}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${metric.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const ChartSection = () => {
    if (report.type === 'daily') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity Overview</h4>
          <div className="space-y-4">
            {reportDetails.chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">{data.time}</span>
                <div className="flex space-x-4">
                  <span className="text-sm text-blue-600">Students: {data.students}</span>
                  <span className="text-sm text-green-600">Buses: {data.buses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (report.type === 'financial') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Revenue vs Expenses</h4>
          <div className="space-y-4">
            {reportDetails.chartData.map((data, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <span className="text-sm text-gray-500">
                    Profit: ₹{(data.revenue - data.expenses).toLocaleString()}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-green-600">Revenue</span>
                      <span>₹{data.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(data.revenue / 10000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-red-600">Expenses</span>
                      <span>₹{data.expenses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(data.expenses / 10000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (report.type === 'maintenance') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Bus Status Overview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportDetails.chartData.map((bus, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-700">{bus.bus}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    bus.mileage > 20000 ? 'bg-red-100 text-red-700' : 
                    bus.mileage > 15000 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {bus.mileage > 20000 ? 'High Mileage' : 
                     bus.mileage > 15000 ? 'Medium Mileage' : 'Good Condition'}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Mileage:</span>
                    <span>{bus.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Service:</span>
                    <span>{bus.lastService}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Routes chart
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Route Performance</h4>
        <div className="space-y-4">
          {reportDetails.chartData.map((route, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-700">{route.route}</h5>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  route.efficiency > 85 ? 'bg-green-100 text-green-700' : 
                  route.efficiency > 75 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {route.efficiency}% Efficiency
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800">{route.distance}</div>
                  <div>Distance (km)</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800">{route.students}</div>
                  <div>Students</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800">{route.efficiency}%</div>
                  <div>Efficiency</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 backdrop flex items-center justify-center p-4 z-[99999] m-0" 
         style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 bg-gray-50 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{report.title}</h2>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Key Metrics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reportDetails.metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Analysis</h3>
            <ChartSection />
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Report Summary</h4>
            <div className="prose prose-sm text-gray-600">
              <p>
                This {report.type} report provides comprehensive insights into the current 
                performance metrics and key indicators for the transportation management system. 
                The data shown reflects the period: <strong>{report.date}</strong>.
              </p>
              <p className="mt-3">
                Key highlights include operational efficiency metrics, financial performance 
                indicators, and actionable insights for process optimization. Regular monitoring 
                of these metrics ensures optimal service delivery and cost management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reports() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const totalStudents = students.length;
  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const presentDrivers = drivers.filter(driver => driver.attendanceToday === 'present').length;
  const totalRevenue = feeRecords.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + fee.monthlyFee, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingFees = feeRecords.filter(fee => fee.status !== 'paid').length;

  const reportsData = [
    {
      id: 1,
      title: 'Daily Transport Report',
      description: 'Student attendance, driver attendance, and route efficiency',
      date: 'Today',
      type: 'daily',
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'Monthly Financial Report',
      description: 'Fee collection, expenses, and profit analysis',
      date: 'February 2024',
      type: 'financial',
      size: '4.1 MB'
    },
    {
      id: 3,
      title: 'Bus Maintenance Report',
      description: 'Maintenance schedules, costs, and vehicle condition',
      date: 'Last 30 days',
      type: 'maintenance',
      size: '1.8 MB'
    },
    {
      id: 4,
      title: 'Route Optimization Report',
      description: 'Route efficiency and fuel consumption analysis',
      date: 'Last week',
      type: 'routes',
      size: '3.2 MB'
    }
  ];

  const handleExportAll = () => {
    setShowExportModal(true);
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          // Simulate download
          setTimeout(() => {
            const element = document.createElement('a');
            const file = new Blob(['All Reports Data...'], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'all_reports_export.zip';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            setShowExportModal(false);
            setExportProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  const handleDownloadReport = (report) => {
    // Simulate download process
    const element = document.createElement('a');
    const file = new Blob([`${report.title} - ${report.description}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${report.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message
    alert(`${report.title} downloaded successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={handleExportAll}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          change="12%"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Buses"
          value={activeBuses}
          change="100%"
          changeType="neutral"
          icon={Bus}
          color="green"
        />
        <StatCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          change="8%"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Pending Fees"
          value={pendingFees}
          change="2"
          changeType="negative"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h4 className="text-lg font-semibold text-gray-800">Financial Overview</h4>
          <div className="flex space-x-2">

            <button className="text-sm font-medium text-blue-600 px-3 py-1 bg-blue-50 rounded">Yearly</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{(totalRevenue - totalExpenses).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Net Profit</p>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Available Reports</h4>
        
        <div className="space-y-4">
          {reportsData.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-800 truncate">{report.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Generated: {report.date}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        Size: {report.size}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full lg:w-auto">
                  <button 
                    onClick={() => handleViewReport(report)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    View Report
                  </button>
                  <button 
                    onClick={() => handleDownloadReport(report)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium flex items-center justify-center space-x-1 w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export All Modal */}
      {showExportModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 backdrop flex items-center justify-center p-4 z-[99999] m-0" 
             style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isExporting ? 'Exporting Reports...' : 'Export Complete!'}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {isExporting 
                    ? 'Please wait while we prepare all your reports for download.' 
                    : 'All reports have been successfully exported and downloaded.'
                  }
                </p>
                {isExporting && (
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${exportProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{exportProgress}% complete</p>
                  </div>
                )}
                {!isExporting && (
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Download Started</span>
                  </div>
                )}
                {!isExporting && (
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Viewer Modal */}
      {selectedReport && (
        <ReportViewer report={selectedReport} onClose={handleCloseReport} />
      )}
    </div>
  );
}
