import React, { useState } from 'react';
import { 
  BarChart3, Home, Users, Calendar, Clock, 
  DollarSign, AlertTriangle, Bell, QrCode,
  CheckCircle, XCircle, TrendingUp, TrendingDown,
  MapPin, Phone, Mail, User, CalendarDays,
  Clock3, FileText, Star, Eye, Download,
  RefreshCw, Filter, Search, ArrowUpRight,
  ArrowDownRight, Activity, Zap, Shield
} from 'lucide-react';

interface DashboardStats {
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  totalLeaves: number;
  approvedLeaves: number;
  pendingLeaves: number;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  totalVisitors: number;
  completedVisits: number;
  pendingVisits: number;
  notifications: number;
  unreadNotifications: number;
}

interface RecentActivity {
  id: string;
  type: 'Application' | 'Leave' | 'Fee' | 'Complaint' | 'Visitor' | 'Notification';
  title: string;
  description: string;
  status: string;
  date: string;
  time: string;
  icon: string;
  color: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

const HostelDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'notifications'>('overview');

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Rahul Kumar',
    rollNumber: '2023CSE001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'rahul.kumar@college.edu.in',
    hostelId: 'H001',
    warden: 'Mr. Prakash Sharma',
    hostelName: 'Boys Hostel A',
    block: 'A Block',
    floor: 2,
    roomType: 'Double AC',
    monthlyFee: 5500,
    messFee: 3000,
    securityDeposit: 10000,
    totalFees: 19000,
    paidFees: 19000,
    pendingFees: 0,
    feeStatus: 'Paid',
    checkInTime: '22:30',
    checkOutTime: '06:30',
    emergencyContact: '+91-9876543211',
    bloodGroup: 'B+',
    hometown: 'Bangalore, Karnataka',
    allocatedDate: '2023-07-15',
    status: 'Active'
  };

  const dashboardStats: DashboardStats = {
    totalApplications: 3,
    approvedApplications: 2,
    pendingApplications: 1,
    totalLeaves: 5,
    approvedLeaves: 3,
    pendingLeaves: 2,
    totalFees: 19000,
    paidFees: 19000,
    pendingFees: 0,
    totalComplaints: 4,
    resolvedComplaints: 2,
    pendingComplaints: 2,
    totalVisitors: 6,
    completedVisits: 4,
    pendingVisits: 2,
    notifications: 8,
    unreadNotifications: 3
  };

  const recentActivities: RecentActivity[] = [
    {
      id: 'ACT001',
      type: 'Application',
      title: 'Hostel Application Approved',
      description: 'Your application for Boys Hostel A has been approved',
      status: 'Approved',
      date: '2025-01-15',
      time: '09:30',
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      id: 'ACT002',
      type: 'Leave',
      title: 'Leave Request Submitted',
      description: 'Home leave request for Jan 20-25 submitted',
      status: 'Pending',
      date: '2025-01-15',
      time: '14:20',
      icon: 'Clock',
      color: 'yellow'
    },
    {
      id: 'ACT003',
      type: 'Fee',
      title: 'Fee Payment Completed',
      description: 'Monthly fee payment of ₹9,000 completed',
      status: 'Paid',
      date: '2025-01-01',
      time: '10:15',
      icon: 'DollarSign',
      color: 'green'
    },
    {
      id: 'ACT004',
      type: 'Complaint',
      title: 'Complaint Resolved',
      description: 'AC maintenance complaint has been resolved',
      status: 'Resolved',
      date: '2025-01-14',
      time: '16:45',
      icon: 'AlertTriangle',
      color: 'blue'
    },
    {
      id: 'ACT005',
      type: 'Visitor',
      title: 'Visitor Approved',
      description: 'Visitor registration for Rajesh Kumar approved',
      status: 'Approved',
      date: '2025-01-19',
      time: '11:30',
      icon: 'Users',
      color: 'purple'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'QA001',
      title: 'Apply for Leave',
      description: 'Submit leave request',
      icon: 'Calendar',
      color: 'blue',
      path: '/hostel/leave/apply'
    },
    {
      id: 'QA002',
      title: 'Pay Fees',
      description: 'Make online payment',
      icon: 'DollarSign',
      color: 'green',
      path: '/hostel/fees/pay'
    },
    {
      id: 'QA003',
      title: 'Submit Complaint',
      description: 'Report an issue',
      icon: 'AlertTriangle',
      color: 'red',
      path: '/hostel/complaints/new'
    },
    {
      id: 'QA004',
      title: 'Register Visitor',
      description: 'Pre-register visitor',
      icon: 'Users',
      color: 'purple',
      path: '/hostel/visitors/register'
    },
    {
      id: 'QA005',
      title: 'Generate QR Pass',
      description: 'Create gate pass',
      icon: 'QrCode',
      color: 'indigo',
      path: '/hostel/leave/gate-pass'
    },
    {
      id: 'QA006',
      title: 'View Notifications',
      description: 'Check updates',
      icon: 'Bell',
      color: 'yellow',
      path: '/hostel/notifications'
    }
  ];

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      CheckCircle, Clock, DollarSign, AlertTriangle, Users, Bell, Calendar, QrCode
    };
    return icons[iconName] || CheckCircle;
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Application': return <FileText className="w-4 h-4" />;
      case 'Leave': return <Calendar className="w-4 h-4" />;
      case 'Fee': return <DollarSign className="w-4 h-4" />;
      case 'Complaint': return <AlertTriangle className="w-4 h-4" />;
      case 'Visitor': return <Users className="w-4 h-4" />;
      case 'Notification': return <Bell className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Application': return 'text-blue-600';
      case 'Leave': return 'text-yellow-600';
      case 'Fee': return 'text-green-600';
      case 'Complaint': return 'text-red-600';
      case 'Visitor': return 'text-purple-600';
      case 'Notification': return 'text-indigo-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Hostel Dashboard</h1>
                <p className="text-gray-600">Welcome back, {currentStudent.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Student Information Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentStudent.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{currentStudent.roomNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Hostel</p>
                <p className="font-medium">{currentStudent.hostelName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Warden</p>
                <p className="font-medium">{currentStudent.warden}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {quickActions.map((action) => {
              const IconComponent = getIconComponent(action.icon);
              return (
                <button
                  key={action.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Applications</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{dashboardStats.totalApplications}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">{dashboardStats.approvedApplications} approved</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-yellow-600">{dashboardStats.pendingApplications} pending</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Leaves</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{dashboardStats.totalLeaves}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">{dashboardStats.approvedLeaves} approved</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-yellow-600">{dashboardStats.pendingLeaves} pending</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Fees</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">₹{dashboardStats.totalFees.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">₹{dashboardStats.paidFees.toLocaleString()} paid</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-red-600">₹{dashboardStats.pendingFees.toLocaleString()} pending</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Complaints</h3>
            </div>
            <p className="text-2xl font-bold text-red-600">{dashboardStats.totalComplaints}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">{dashboardStats.resolvedComplaints} resolved</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-yellow-600">{dashboardStats.pendingComplaints} pending</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Visitors</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{dashboardStats.totalVisitors}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">{dashboardStats.completedVisits} completed</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-yellow-600">{dashboardStats.pendingVisits} pending</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Bell className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Notifications</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{dashboardStats.notifications}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-red-600">{dashboardStats.unreadNotifications} unread</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600">{dashboardStats.notifications - dashboardStats.unreadNotifications} read</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Status</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">Active</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-green-600">All systems operational</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-blue-600">Last updated: Now</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'activities', label: 'Recent Activities', icon: Activity },
              { key: 'notifications', label: 'Notifications', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Room Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Room Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Room Number</span>
                  <span className="font-medium">{currentStudent.roomNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-medium">{currentStudent.roomType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Block</span>
                  <span className="font-medium">{currentStudent.block}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Floor</span>
                  <span className="font-medium">{currentStudent.floor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Allocated Date</span>
                  <span className="font-medium">{new Date(currentStudent.allocatedDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStudent.status)}`}>
                    {currentStudent.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Fee Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-medium">₹{currentStudent.monthlyFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Mess Fee</span>
                  <span className="font-medium">₹{currentStudent.messFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-medium">₹{currentStudent.securityDeposit.toLocaleString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="font-bold text-lg">₹{currentStudent.totalFees.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Paid Amount</span>
                  <span className="font-medium text-green-600">₹{currentStudent.paidFees.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Amount</span>
                  <span className="font-medium text-red-600">₹{currentStudent.pendingFees.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStudent.feeStatus)}`}>
                    {currentStudent.feeStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(activity.date).toLocaleDateString('en-IN')}</span>
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                {
                  id: 'NOT001',
                  title: 'Room Allocation Confirmation',
                  message: 'Your room A-201 has been successfully allocated. Please collect keys from reception.',
                  type: 'Administrative',
                  priority: 'High',
                  date: '2025-01-15',
                  time: '09:30',
                  isRead: false
                },
                {
                  id: 'NOT002',
                  title: 'Mess Menu Update',
                  message: 'Weekly mess menu updated with special regional dishes. Check notice board for details.',
                  type: 'Mess',
                  priority: 'Medium',
                  date: '2025-01-14',
                  time: '08:15',
                  isRead: true
                },
                {
                  id: 'NOT003',
                  title: 'Maintenance Notice',
                  message: 'Water supply maintenance scheduled for Block A on Jan 17th, 6 AM - 8 AM.',
                  type: 'Maintenance',
                  priority: 'High',
                  date: '2025-01-13',
                  time: '16:45',
                  isRead: false
                }
              ].map((notification) => (
                <div key={notification.id} className={`p-4 border border-gray-200 rounded-lg ${!notification.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${!notification.isRead ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Bell className={`w-4 h-4 ${!notification.isRead ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${!notification.isRead ? 'text-blue-900' : 'text-gray-800'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {notification.priority}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(notification.date).toLocaleDateString('en-IN')}</span>
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                        <span className="text-gray-400">•</span>
                        <span>{notification.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDashboardPage;