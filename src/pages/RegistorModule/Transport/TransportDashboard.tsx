import React from 'react';
import { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  Car, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  MapPin,
  Clock,
  Plus,
  CheckCircle,
  Wrench,
  GraduationCap,
  Shield,
  Activity,
  X,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  FileText
} from 'lucide-react';

const TransportDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activities, setActivities] = useState([
    { id: 1, type: 'Vehicle Inspection', vehicle: 'BUS-001', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Route Assignment', driver: 'John Smith', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'Fuel Request', amount: '₹350', time: '6 hours ago', status: 'approved' },
    { id: 4, type: 'Maintenance Alert', vehicle: 'VAN-015', time: '1 day ago', status: 'urgent' }
  ]);

  // Enhanced KPI metrics based on transport management requirements
  const dashboardMetrics = [
    { 
      title: 'Total Monthly Expense', 
      value: '₹127,450', 
      icon: DollarSign, 
      color: 'blue', 
      change: '+12.3%',
      changeType: 'increase',
      subtitle: 'vs last month'
    },
    { 
      title: 'Active Vehicles', 
      value: '189', 
      subtitle: '/ 245 total',
      icon: Car, 
      color: 'green', 
      change: '56 in workshop',
      changeType: 'neutral',
      status: 'operational'
    },
    { 
      title: 'Enrolled Students', 
      value: '3,247', 
      icon: GraduationCap, 
      color: 'purple', 
      change: '+156',
      changeType: 'increase',
      subtitle: 'this semester'
    },
    { 
      title: 'Compliance Alerts', 
      value: '3', 
      icon: Shield, 
      color: 'red', 
      change: 'documents expiring',
      changeType: 'urgent',
      subtitle: 'within 30 days'
    }
  ];

  // Mock data for charts
  const expenseData = [
    { month: 'Apr', amount: 98500 },
    { month: 'May', amount: 105200 },
    { month: 'Jun', amount: 118900 },
    { month: 'Jul', amount: 124300 },
    { month: 'Aug', amount: 119700 },
    { month: 'Sep', amount: 127450 }
  ];

  const vehicleStatusData = [
    { status: 'Active', count: 189, color: '#10B981' },
    { status: 'In Workshop', count: 56, color: '#F59E0B' },
    { status: 'Maintenance', count: 8, color: '#EF4444' }
  ];

  const handleScheduleInspection = (formData) => {
    const newActivity = {
      id: activities.length + 1,
      type: 'Vehicle Inspection',
      vehicle: formData.vehicle,
      time: 'Just now',
      status: 'scheduled'
    };
    setActivities([newActivity, ...activities]);
  };

  const handleAddDriver = (formData) => {
    const newActivity = {
      id: activities.length + 1,
      type: 'New Driver Added',
      driver: formData.name,
      time: 'Just now',
      status: 'active'
    };
    setActivities([newActivity, ...activities]);
  };

  const handleCreateRoute = (formData) => {
    const newActivity = {
      id: activities.length + 1,
      type: 'Route Created',
      route: formData.name,
      time: 'Just now',
      status: 'active'
    };
    setActivities([newActivity, ...activities]);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'inspection', label: 'Schedule Inspection', icon: Calendar },
    { id: 'driver', label: 'Add Driver', icon: Users },
    { id: 'route', label: 'Create Route', icon: MapPin }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Reduced Header */}
        <div className="p-6 pb-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transport Command Center
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Administrative dashboard for comprehensive transport operations management
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full flex items-center space-x-2 text-xs ${
              isDark ? 'bg-gray-800 text-green-400' : 'bg-green-50 text-green-600'
            }`}>
              <Activity className="w-3 h-3" />
              <span className="font-medium">System Online</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? `border-blue-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}`
                        : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Smaller KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const isIncrease = metric.changeType === 'increase';
                  const isUrgent = metric.changeType === 'urgent';
                  
                  return (
                    <div key={index} className={`relative p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border ${
                      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    } ${isUrgent ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}>
                      {/* Top section with icon and change indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          metric.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          metric.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                          metric.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        {metric.changeType !== 'neutral' && (
                          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                            isIncrease ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            isUrgent ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {isIncrease && <ChevronUp className="w-3 h-3" />}
                            {isUrgent && <AlertTriangle className="w-3 h-3" />}
                            <span>{metric.change}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Main metric */}
                      <div className="mb-2">
                        <div className="flex items-baseline space-x-2">
                          <h3 className="text-xl font-bold">{metric.value}</h3>
                          {metric.subtitle && (
                            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {metric.subtitle}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {metric.title}
                        </p>
                      </div>
                      
                      {/* Progress bar for active vehicles */}
                      {metric.title === 'Active Vehicles' && (
                        <div className="mt-2">
                          <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="h-1.5 bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: '77%' }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">77% operational capacity</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Smaller Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Expense Trends Chart */}
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    Monthly Expense Trends
                  </h3>
                  <div className="h-40 flex items-end justify-between space-x-2">
                    {expenseData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 ${
                          isDark ? 'bg-blue-600' : 'bg-blue-500'
                        }`} 
                        style={{ 
                          height: `${(data.amount / 130000) * 120}px`,
                          minHeight: '15px'
                        }}>
                        </div>
                        <span className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {data.month}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          ₹{(data.amount / 1000).toFixed(0)}k
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Status Pie Chart */}
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Car className="w-4 h-4 mr-2 text-green-500" />
                    Fleet Status Overview
                  </h3>
                  <div className="flex items-center justify-center h-40">
                    <div className="relative w-32 h-32">
                      {/* Simple pie chart representation */}
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 relative">
                        <div className={`absolute inset-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>
                      </div>
                      {/* Center text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold">245</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Fleet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {vehicleStatusData.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-xs font-medium">{item.count}</span>
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Quick Actions */}
                <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Plus className="w-4 h-4 mr-2 text-blue-500" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <ActionButton
                      onClick={() => setActiveTab('inspection')}
                      icon={Calendar}
                      title="Schedule Vehicle Inspection"
                      subtitle="Plan routine maintenance checks"
                      color="blue"
                      isDark={isDark}
                    />
                    <ActionButton
                      onClick={() => setActiveTab('driver')}
                      icon={Users}
                      title="Add New Driver"
                      subtitle="Register qualified personnel"
                      color="green"
                      isDark={isDark}
                    />
                    <ActionButton
                      onClick={() => setActiveTab('route')}
                      icon={MapPin}
                      title="Create New Route"
                      subtitle="Design efficient pathways"
                      color="purple"
                      isDark={isDark}
                    />
                  </div>
                </div>

                {/* Enhanced Recent Activities */}
                <div className={`lg:col-span-2 p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-500" />
                      Recent Activities
                    </div>
                    <button className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}>
                      View All
                    </button>
                  </h3>
                  <div className="space-y-3">
                    {activities.map((activity, index) => (
                      <ActivityCard 
                        key={index} 
                        activity={activity} 
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Mini Fleet Map Preview */}
              <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                  Fleet Location Overview
                </h3>
                <div className={`h-24 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Interactive map integration pending
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Centered Forms */}
          {activeTab === 'inspection' && (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center mb-6">
                    <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mr-3">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Schedule Vehicle Inspection</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Plan and organize routine maintenance checks for your fleet
                      </p>
                    </div>
                  </div>
                  <InspectionForm onSubmit={handleScheduleInspection} isDark={isDark} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'driver' && (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center mb-6">
                    <div className="p-2.5 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mr-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Add New Driver</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Register qualified personnel to expand your driver pool
                      </p>
                    </div>
                  </div>
                  <DriverForm onSubmit={handleAddDriver} isDark={isDark} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'route' && (
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center mb-6">
                    <div className="p-2.5 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mr-3">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Create New Route</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Design efficient pathways for optimal transport operations
                      </p>
                    </div>
                  </div>
                  <RouteForm onSubmit={handleCreateRoute} isDark={isDark} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Action Button Component
const ActionButton = ({ onClick, icon: Icon, title, subtitle, color, isDark }) => (
  <button 
    onClick={onClick}
    className={`w-full p-3 text-left rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-[1.02] hover:shadow-sm ${
      color === 'blue' ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' :
      color === 'green' ? 'border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' :
      'border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-start space-x-3">
        <div className={`p-1.5 rounded-lg ${
          color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
          color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
          'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {subtitle}
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  </button>
);

// Enhanced Activity Card Component
const ActivityCard = ({ activity, isDark }) => (
  <div className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:shadow-sm ${
    activity.status === 'completed' ? 'border-green-500 bg-green-50 dark:bg-green-900/10' :
    activity.status === 'pending' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' :
    activity.status === 'approved' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' :
    activity.status === 'scheduled' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10' :
    activity.status === 'active' ? 'border-green-500 bg-green-50 dark:bg-green-900/10' :
    'border-red-500 bg-red-50 dark:bg-red-900/10'
  }`}>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <p className="font-semibold text-sm">{activity.type}</p>
          <StatusBadge status={activity.status} />
        </div>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {activity.vehicle && `Vehicle: ${activity.vehicle}`}
          {activity.driver && `Driver: ${activity.driver}`}
          {activity.amount && `Amount: ${activity.amount}`}
          {activity.route && `Route: ${activity.route}`}
        </p>
      </div>
      <div className="text-right">
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          {activity.time}
        </p>
      </div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
    status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
    status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
    status === 'approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
    status === 'scheduled' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
    status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

// Enhanced Inline Form Components
const InspectionForm = ({ onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    vehicle: '',
    date: '',
    type: 'routine',
    inspector: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      vehicle: '',
      date: '',
      type: 'routine',
      inspector: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Vehicle <span className="text-red-500">*</span></label>
          <select
            value={formData.vehicle}
            onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          >
            <option value="">Select Vehicle</option>
            <option value="BUS-001">BUS-001 - School Bus</option>
            <option value="BUS-002">BUS-002 - School Bus</option>
            <option value="VAN-001">VAN-001 - Transport Van</option>
            <option value="VAN-002">VAN-002 - Transport Van</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Inspection Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Inspection Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="routine">Routine Inspection</option>
            <option value="safety">Safety Inspection</option>
            <option value="maintenance">Pre-Maintenance Check</option>
            <option value="compliance">Compliance Inspection</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Inspector</label>
          <input
            type="text"
            value={formData.inspector}
            onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
            placeholder="Enter inspector name"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Additional Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Enter any additional notes or special requirements"
          rows={3}
          className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule Inspection</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ vehicle: '', date: '', type: 'routine', inspector: '', notes: '' })}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 font-semibold ${
            isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

const DriverForm = ({ onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    phone: '',
    email: '',
    experience: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      license: '',
      phone: '',
      email: '',
      experience: '',
      address: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">License Type <span className="text-red-500">*</span></label>
          <select
            value={formData.license}
            onChange={(e) => setFormData({ ...formData, license: e.target.value })}
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            required
          >
            <option value="">Select License Type</option>
            <option value="CDL-A">CDL-A (Commercial Driver's License A)</option>
            <option value="CDL-B">CDL-B (Commercial Driver's License B)</option>
            <option value="CDL-C">CDL-C (Commercial Driver's License C)</option>
            <option value="Regular">Regular Driver's License</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Years of Experience</label>
        <select
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select experience level</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter complete address"
          rows={2}
          className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none ${
            isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>Add Driver</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ name: '', license: '', phone: '', email: '', experience: '', address: '' })}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 font-semibold ${
            isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

const RouteForm = ({ onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    distance: '',
    stops: '',
    duration: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      startLocation: '',
      endLocation: '',
      distance: '',
      stops: '',
      duration: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Route Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter route name (e.g., Downtown-Campus Route)"
          className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
            isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Start Location <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.startLocation}
            onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
            placeholder="Enter starting point"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">End Location <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.endLocation}
            onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
            placeholder="Enter destination"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Distance (km) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={formData.distance}
            onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
            placeholder="0"
            min="0"
            step="0.1"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Number of Stops <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={formData.stops}
            onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
            placeholder="0"
            min="0"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Duration (minutes) <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="0"
            min="0"
            className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Route Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the route, key landmarks, or special instructions"
          rows={3}
          className={`w-full p-3 rounded-lg border-2 transition-colors focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none ${
            isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <MapPin className="w-4 h-4" />
          <span>Create Route</span>
        </button>
        <button
          type="button"
          onClick={() => setFormData({ name: '', startLocation: '', endLocation: '', distance: '', stops: '', duration: '', description: '' })}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 font-semibold ${
            isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default TransportDashboard;
