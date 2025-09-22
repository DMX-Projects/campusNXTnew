import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
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
  ArrowLeft
} from 'lucide-react';

const TransportReports = () => {
  const { isDark } = useTheme();
  const [selectedReport, setSelectedReport] = useState('vehicle-cost');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentView, setCurrentView] = useState('reports'); // 'reports', 'schedule'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportFilters, setReportFilters] = useState({
    vehicle: 'all',
    route: 'all',
    driver: 'all'
  });
  const [toastMessage, setToastMessage] = useState(null);

  const reportCategories = [
    { 
      id: 'vehicle-cost', 
      title: 'Vehicle Cost Analysis', 
      icon: DollarSign, 
      description: 'Detailed cost breakdown by vehicle and route' 
    },
    { 
      id: 'route-profitability', 
      title: 'Route Profitability', 
      icon: TrendingUp, 
      description: 'Revenue and cost analysis per route' 
    },
    { 
      id: 'fuel-consumption', 
      title: 'Fuel Consumption Trend', 
      icon: Activity, 
      description: 'Fuel usage patterns and efficiency metrics' 
    },
    { 
      id: 'accident-allocation', 
      title: 'Accident Allocation Summary', 
      icon: AlertTriangle, 
      description: 'Safety incidents and cost allocation' 
    }
  ];

  // Comprehensive sample data for all combinations
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
      },
      'Route A': {
        totalCost: '₹12,400',
        vehicles: 3,
        avgCostPerVehicle: '₹4,133',
        highestCost: 'BUS-001 (₹5,240)',
        trend: '+9.8%'
      },
      'Route B': {
        totalCost: '₹8,750',
        vehicles: 2,
        avgCostPerVehicle: '₹4,375',
        highestCost: 'BUS-002 (₹4,180)',
        trend: '+7.2%'
      },
      'Route C': {
        totalCost: '₹6,200',
        vehicles: 2,
        avgCostPerVehicle: '₹3,100',
        highestCost: 'VAN-001 (₹2,890)',
        trend: '+4.1%'
      },
      'John Smith': {
        totalCost: '₹5,240',
        vehicles: 1,
        avgCostPerVehicle: '₹5,240',
        highestCost: 'BUS-001 (₹5,240)',
        trend: '+12.1%'
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
      },
      'Route B': {
        totalRevenue: '₹18,750',
        totalCost: '₹8,750',
        profit: '₹10,000',
        profitMargin: '53.3%',
        trend: '+15.8%'
      },
      'Route C': {
        totalRevenue: '₹14,200',
        totalCost: '₹6,200',
        profit: '₹8,000',
        profitMargin: '56.3%',
        trend: '+22.1%'
      },
      'BUS-001': {
        totalRevenue: '₹24,500',
        totalCost: '₹5,240',
        profit: '₹19,260',
        profitMargin: '78.6%',
        trend: '+25.3%'
      }
    },
    'fuel-consumption': {
      all: {
        totalConsumption: '2,450L',
        avgEfficiency: '8.5 km/L',
        monthlyCost: '₹3,920',
        efficiency: '+5.8%',
        trend: '-2.3%'
      },
      'BUS-001': {
        totalConsumption: '890L',
        avgEfficiency: '7.2 km/L',
        monthlyCost: '₹1,424',
        efficiency: '+4.2%',
        trend: '-1.8%'
      },
      'BUS-002': {
        totalConsumption: '820L',
        avgEfficiency: '7.8 km/L',
        monthlyCost: '₹1,312',
        efficiency: '+6.1%',
        trend: '-2.1%'
      },
      'VAN-001': {
        totalConsumption: '420L',
        avgEfficiency: '12.3 km/L',
        monthlyCost: '₹672',
        efficiency: '+8.9%',
        trend: '-1.2%'
      },
      'Route A': {
        totalConsumption: '1,200L',
        avgEfficiency: '8.1 km/L',
        monthlyCost: '₹1,920',
        efficiency: '+5.2%',
        trend: '-2.0%'
      }
    },
    'accident-allocation': {
      all: {
        totalIncidents: '12',
        totalCost: '₹8,450',
        avgCostPerIncident: '₹704',
        severity: 'Medium',
        trend: '-15.2%'
      },
      'BUS-001': {
        totalIncidents: '3',
        totalCost: '₹2,100',
        avgCostPerIncident: '₹700',
        severity: 'Low',
        trend: '-8.1%'
      },
      'Route A': {
        totalIncidents: '5',
        totalCost: '₹3,200',
        avgCostPerIncident: '₹640',
        severity: 'Medium',
        trend: '-12.3%'
      }
    }
  };

  // Get sample data based on current filters
  const getSampleData = () => {
    const currentData = allSampleData[selectedReport];
    if (!currentData) return {};

    // Check filters in priority order
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
      ]
    };

    let data = baseData[selectedReport] || [];

    // Filter data based on current filters
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

  const handleGenerateReport = () => {
    console.log('Generating report:', {
      type: selectedReport,
      dateRange,
      filters: reportFilters
    });
    const reportTitle = reportCategories.find(cat => cat.id === selectedReport)?.title;
    showToast(`${reportTitle} report generated successfully!`, 'success');
  };

  const handleExport = (format) => {
    showToast(`Report exported to ${format.toUpperCase()} successfully!`, 'success');
  };

  const handleScheduleReport = (data) => {
    console.log('Scheduling report:', data);
    showToast(`Report scheduled successfully for ${data.frequency} delivery!`, 'success');
    setCurrentView('reports');
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

  // Render Schedule Report Page
  if (currentView === 'schedule') {
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

        <div className="max-w-4xl mx-auto p-6">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('reports')}
              className={`flex items-center mb-4 px-4 py-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </button>
            
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Schedule Report
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Set up automated report delivery with custom scheduling
            </p>
          </div>

          {/* Schedule Form Card */}
          <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <ScheduleReportForm 
              onSchedule={handleScheduleReport}
              onCancel={() => setCurrentView('reports')}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render Reports Page
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

          {/* Report Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {reportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedReport(category.id)}
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
          {/* Report Generation */}
          <div className={`p-6 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Generate
                </button>
              </div>
            </div>

            {/* Dropdown Filter Panel */}
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
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to PDF
              </button>
              <button 
                onClick={() => handleExport('excel')}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </button>
              <button 
                onClick={() => setCurrentView('schedule')}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
    <div className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? <CheckCircle className="h-5 w-5 text-white" /> : <AlertTriangle className="h-5 w-5 text-white" />}
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

// Schedule Report Form Component
const ScheduleReportForm = ({ onSchedule, onCancel, isDark }) => {
  const [formData, setFormData] = useState({
    frequency: 'weekly',
    email: '',
    format: 'pdf',
    time: '09:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Frequency *</label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Format *</label>
          <select
            value={formData.format}
            onChange={(e) => setFormData({ ...formData, format: e.target.value })}
            className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email Recipients *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="admin@transport.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Delivery Time *</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
          required
        />
      </div>
      <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center font-medium"
        >
          <Clock className="w-5 h-5 mr-2" />
          Schedule Report
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 px-6 py-3 rounded-lg border transition-colors duration-200 font-medium ${
            isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransportReports;
