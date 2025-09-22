import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Users, 
  BarChart3, 
  Search, 
  ChevronDown, 
  ChevronRight,
  User,
  Clock,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  AlertCircle,
  Award,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';

const FacultyAndStaffOversight = () => {
  const [activeTab, setActiveTab] = useState('leave');
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science');
  const [expandedLeave, setExpandedLeave] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  // Sample leave requests data
  const leaveRequests = [
    {
      id: 'LR001',
      facultyName: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      designation: 'Associate Professor',
      leaveType: 'Medical Leave',
      startDate: '2024-09-25',
      endDate: '2024-09-30',
      duration: 6,
      reason: 'Minor surgery and recovery period',
      hodComments: 'Recommended for approval. Dr. Johnson has arranged for substitute classes and all coursework is up to date.',
      status: 'pending',
      appliedDate: '2024-09-18',
      contactDuringLeave: '+91-9876543210',
      medicalCertificate: true,
      priority: 'high'
    },
    {
      id: 'LR002',
      facultyName: 'Prof. Michael Chen',
      department: 'Mechanical Engineering',
      designation: 'Professor',
      leaveType: 'Academic Conference',
      startDate: '2024-10-05',
      endDate: '2024-10-08',
      duration: 4,
      reason: 'International Conference on Advanced Manufacturing - presenting research paper',
      hodComments: 'Strongly recommended. This conference will benefit both faculty development and institutional reputation.',
      status: 'pending',
      appliedDate: '2024-09-16',
      contactDuringLeave: 'prof.chen@institute.edu',
      medicalCertificate: false,
      priority: 'medium'
    },
    {
      id: 'LR003',
      facultyName: 'Dr. Emily Rodriguez',
      department: 'Chemistry',
      designation: 'Assistant Professor',
      leaveType: 'Personal Leave',
      startDate: '2024-09-28',
      endDate: '2024-10-02',
      duration: 5,
      reason: 'Family wedding and personal commitments',
      hodComments: 'Approved by department. Classes have been rescheduled and lab sessions covered.',
      status: 'pending',
      appliedDate: '2024-09-15',
      contactDuringLeave: '+91-9876543211',
      medicalCertificate: false,
      priority: 'low'
    }
  ];

  // Sample attendance data
  const attendanceData = {
    'Computer Science': {
      overall: 92,
      monthlyData: [
        { month: 'Apr', percentage: 95 },
        { month: 'May', percentage: 88 },
        { month: 'Jun', percentage: 92 },
        { month: 'Jul', percentage: 89 },
        { month: 'Aug', percentage: 94 },
        { month: 'Sep', percentage: 90 }
      ],
      facultyCount: 15,
      absentToday: 2,
      presentToday: 13
    },
    'Mechanical Engineering': {
      overall: 89,
      monthlyData: [
        { month: 'Apr', percentage: 91 },
        { month: 'May', percentage: 85 },
        { month: 'Jun', percentage: 88 },
        { month: 'Jul', percentage: 92 },
        { month: 'Aug', percentage: 87 },
        { month: 'Sep', percentage: 91 }
      ],
      facultyCount: 12,
      absentToday: 1,
      presentToday: 11
    },
    'Chemistry': {
      overall: 94,
      monthlyData: [
        { month: 'Apr', percentage: 96 },
        { month: 'May', percentage: 92 },
        { month: 'Jun', percentage: 95 },
        { month: 'Jul', percentage: 93 },
        { month: 'Aug', percentage: 97 },
        { month: 'Sep', percentage: 91 }
      ],
      facultyCount: 10,
      absentToday: 0,
      presentToday: 10
    },
    'Mathematics': {
      overall: 91,
      monthlyData: [
        { month: 'Apr', percentage: 89 },
        { month: 'May', percentage: 93 },
        { month: 'Jun', percentage: 90 },
        { month: 'Jul', percentage: 88 },
        { month: 'Aug', percentage: 95 },
        { month: 'Sep', percentage: 92 }
      ],
      facultyCount: 8,
      absentToday: 1,
      presentToday: 7
    }
  };

  // Sample staff directory
  const staffDirectory = [
    {
      id: 'ST001',
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      designation: 'Associate Professor',
      email: 'sarah.johnson@institute.edu',
      phone: '+91-9876543210',
      address: '123 Faculty Colony, Bengaluru',
      qualification: 'Ph.D. Computer Science',
      experience: '8 years',
      joiningDate: '2016-07-15',
      specialization: 'Machine Learning, Data Science',
      status: 'active',
      rating: 4.8
    },
    {
      id: 'ST002',
      name: 'Prof. Michael Chen',
      department: 'Mechanical Engineering',
      designation: 'Professor',
      email: 'michael.chen@institute.edu',
      phone: '+91-9876543211',
      address: '456 Staff Quarters, Bengaluru',
      qualification: 'Ph.D. Mechanical Engineering',
      experience: '15 years',
      joiningDate: '2009-08-20',
      specialization: 'Manufacturing, Robotics',
      status: 'active',
      rating: 4.9
    },
    {
      id: 'ST003',
      name: 'Dr. Emily Rodriguez',
      department: 'Chemistry',
      designation: 'Assistant Professor',
      email: 'emily.rodriguez@institute.edu',
      phone: '+91-9876543212',
      address: '789 Academic Complex, Bengaluru',
      qualification: 'Ph.D. Organic Chemistry',
      experience: '5 years',
      joiningDate: '2019-06-10',
      specialization: 'Organic Synthesis, Green Chemistry',
      status: 'active',
      rating: 4.7
    },
    {
      id: 'ST004',
      name: 'Dr. John Smith',
      department: 'Mathematics',
      designation: 'Professor',
      email: 'john.smith@institute.edu',
      phone: '+91-9876543213',
      address: '321 Campus View, Bengaluru',
      qualification: 'Ph.D. Applied Mathematics',
      experience: '12 years',
      joiningDate: '2012-03-15',
      specialization: 'Statistics, Numerical Analysis',
      status: 'active',
      rating: 4.6
    }
  ];

  const departments = ['Computer Science', 'Mechanical Engineering', 'Chemistry', 'Mathematics'];

  const toggleExpandLeave = (id) => {
    setExpandedLeave(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLeaveAction = async (id, action) => {
    setProcessingAction(id + '_' + action);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${action} leave request ${id}`);
      setProcessingAction(null);
      // Here you would typically update the state to reflect the change
    }, 1000);
  };

  const filteredStaff = staffDirectory.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Medical Leave':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800';
      case 'Academic Conference':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      case 'Personal Leave':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300 border border-gray-200 dark:border-gray-800';
    }
  };

  const LeaveRequestCard = ({ request }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 mb-6 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div 
        className="p-6 cursor-pointer hover:bg-dark to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-slate-750 dark:hover:to-slate-700 transition-all duration-300"
        onClick={() => toggleExpandLeave(request.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                  {request.facultyName}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {request.department} • {request.designation}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLeaveTypeColor(request.leaveType)}`}>
                {request.leaveType}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(request.priority)}`}>
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
              </span>
              {request.medicalCertificate && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                  Medical Certificate Attached
                </span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{request.startDate} to {request.endDate}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{request.duration} days</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              expandedLeave[request.id] 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
            }`}>
              {expandedLeave[request.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          </div>
        </div>
      </div>

      {expandedLeave[request.id] && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-dark-to-br from-slate-50 to-blue-50 dark:from-slate-750 dark:to-slate-800">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  Reason for Leave
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-lg">
                  {request.reason}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <MessageSquare size={16} className="text-green-600" />
                  HOD Recommendation
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-lg">
                  {request.hodComments}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1">
                  <Calendar size={14} />
                  Applied Date
                </span>
                <p className="text-slate-600 dark:text-slate-400">{request.appliedDate}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1">
                  <Phone size={14} />
                  Emergency Contact
                </span>
                <p className="text-slate-600 dark:text-slate-400">{request.contactDuringLeave}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-1">
                  <AlertCircle size={14} />
                  Priority Level
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-600">
              <button
                onClick={() => handleLeaveAction(request.id, 'approve')}
                disabled={processingAction === request.id + '_approve'}
                className="flex-1 bg-dark-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <CheckCircle size={18} />
                {processingAction === request.id + '_approve' ? 'Processing...' : 'Approve Request'}
              </button>
              <button
                onClick={() => handleLeaveAction(request.id, 'reject')}
                disabled={processingAction === request.id + '_reject'}
                className="flex-1 bg-dark-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <XCircle size={18} />
                {processingAction === request.id + '_reject' ? 'Processing...' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AttendanceChart = ({ data }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-blue-600" />
        Monthly Attendance Trend
      </h3>
      <div className="space-y-4">
        {data.monthlyData.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-10">
              {item.month}
            </span>
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-8 relative overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  item.percentage >= 90 
                    ? 'bg-gradient-to-r from-green-400 to-green-500' 
                    : item.percentage >= 80 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                    : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ 
                  width: `${item.percentage}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-800 dark:text-slate-200">
                {item.percentage}%
              </span>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              item.percentage >= 90 ? 'bg-green-500' : item.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );

  const StaffProfile = ({ staff, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Staff Profile
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-200"
            >
              <XCircle size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User size={40} className="text-white" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{staff.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{staff.designation}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{staff.department}</p>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <Award size={16} className="text-yellow-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {staff.rating}/5.0 Rating
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={16} className="text-blue-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Email</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.email}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={16} className="text-green-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Phone</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.phone}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin size={16} className="text-red-500 mt-0.5" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Address</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.address}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap size={16} className="text-purple-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Qualification</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.qualification}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={16} className="text-orange-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Experience</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.experience}</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-750 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={16} className="text-teal-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Joining Date</span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-7">{staff.joiningDate}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-750 dark:to-slate-800 p-4 rounded-xl">
              <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                <Award size={16} className="text-blue-600" />
                Specialization
              </h5>
              <p className="text-sm text-slate-700 dark:text-slate-300">{staff.specialization}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
    {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold">{leaveRequests.length}</p>
              </div>
              <Calendar className="text-blue-200" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Staff</p>
                <p className="text-3xl font-bold">{staffDirectory.length}</p>
              </div>
              <UserCheck className="text-green-200" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Departments</p>
                <p className="text-3xl font-bold">{departments.length}</p>
              </div>
              <Users className="text-purple-200" size={32} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Attendance</p>
                <p className="text-3xl font-bold">92%</p>
              </div>
              <BarChart3 className="text-orange-200" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('leave')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'leave'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Leave Approval Queue</span>
              <span className="sm:hidden">Leave</span>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'attendance'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <BarChart3 size={18} />
              <span className="hidden sm:inline">Attendance Summary</span>
              <span className="sm:hidden">Attendance</span>
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'staff'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Users size={18} />
              <span className="hidden sm:inline">Staff Directory</span>
              <span className="sm:hidden">Staff</span>
            </button>
          </div>
        </div>

        {/* Leave Approval Queue */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <Calendar className="text-blue-600" size={28} />
                Pending Leave Requests
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <AlertCircle size={16} />
                <span>{leaveRequests.length} requests pending</span>
              </div>
            </div>
            {leaveRequests.length > 0 ? (
              leaveRequests.map(request => (
                <LeaveRequestCard key={request.id} request={request} />
              ))
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <Calendar size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">No Pending Requests</h3>
                <p className="text-slate-500 dark:text-slate-500">All leave requests have been processed</p>
              </div>
            )}
          </div>
        )}

        {/* Attendance Summary */}
        {activeTab === 'attendance' && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <BarChart3 className="text-green-600" size={28} />
                Department Attendance Overview
              </h2>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department:</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Overall Attendance</h3>
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {attendanceData[selectedDepartment].overall}%
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    attendanceData[selectedDepartment].overall >= 90 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {attendanceData[selectedDepartment].overall >= 90 ? 'Excellent' : 'Good'}
                  </span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total Faculty</h3>
                  <Users className="text-blue-500" size={20} />
                </div>
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {attendanceData[selectedDepartment].facultyCount}
                </span>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Present Today</h3>
                  <UserCheck className="text-green-500" size={20} />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    {attendanceData[selectedDepartment].presentToday}
                  </span>
                  <span className="text-sm text-slate-500">
                    of {attendanceData[selectedDepartment].facultyCount}
                  </span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Absent Today</h3>
                  <UserX className="text-red-500" size={20} />
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-3xl font-bold ${
                    attendanceData[selectedDepartment].absentToday === 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attendanceData[selectedDepartment].absentToday}
                  </span>
                  {attendanceData[selectedDepartment].absentToday === 0 && (
                    <span className="text-sm text-green-500 font-semibold">Perfect!</span>
                  )}
                </div>
              </div>
            </div>

            <AttendanceChart data={attendanceData[selectedDepartment]} />
          </div>
        )}

        {/* Staff Directory */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <Users className="text-purple-600" size={28} />
                Staff Directory
              </h2>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStaff.map(staff => (
                <div
                  key={staff.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-600"
                  onClick={() => setSelectedStaff(staff)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate text-lg">
                        {staff.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                        {staff.designation}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Award size={12} className="text-yellow-500" />
                        <span className="text-xs text-slate-500">{staff.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {staff.department}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        staff.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Mail size={12} />
                      <span className="truncate">{staff.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock size={12} />
                      <span>{staff.experience} experience</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      <span className="font-semibold">Specialization:</span> {staff.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <Users size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">No Staff Found</h3>
                <p className="text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Staff Profile Modal */}
        {selectedStaff && (
          <StaffProfile 
            staff={selectedStaff} 
            onClose={() => setSelectedStaff(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default FacultyAndStaffOversight;