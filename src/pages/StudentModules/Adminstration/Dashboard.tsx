import React, { useState } from 'react';
import { 
  User, CreditCard, Bell, CheckCircle, AlertCircle, Calendar, BookOpen, 
  DollarSign, Clock, GraduationCap, Users, FileText, MapPin, Wifi,
  TrendingUp, Award, Coffee, Bus, Phone, Mail, Eye, EyeOff
} from 'lucide-react';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  
  // Sample data - replace with actual data from API
  const studentData = {
    name: "Arjun Kumar",
    rollNumber: "21CS001",
    course: "B.Tech Computer Science Engineering",
    semester: "5th Semester",
    batch: "2021-2025",
    profileImage: null,
    
    // Finance
    hasDues: true,
    nextFeeAmount: 45000,
    dueDate: "2024-10-15",
    walletBalance: 1250,
    
    // Academic
    currentGPA: 8.7,
    attendance: 87,
    minAttendanceRequired: 75,
    
    // Library
    booksIssued: 2,
    maxBooks: 5,
    libraryDues: 0,
    
    // Hostel (if applicable)
    hostelRoom: "A-205",
    hostelBlock: "A Block",
    messBalance: 850
  };

  const academicProgress = [
    { subject: "Data Structures", grade: "A", credits: 4 },
    { subject: "Database Systems", grade: "A-", credits: 3 },
    { subject: "Computer Networks", grade: "B+", credits: 4 },
    { subject: "Software Engineering", grade: "A", credits: 3 }
  ];

  const upcomingDeadlines = [
    {
      title: "Database Systems Assignment",
      date: "2024-09-25",
      type: "assignment",
      priority: "high"
    },
    {
      title: "Computer Networks Lab Report",
      date: "2024-09-27",
      type: "lab",
      priority: "medium"
    },
    {
      title: "Fee Payment Deadline",
      date: "2024-10-15",
      type: "finance",
      priority: "high"
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      subject: "Mid-semester exam schedule released for all subjects",
      timestamp: "2 hours ago",
      isUnread: true,
      type: "exam",
      priority: "high"
    },
    {
      id: 2,
      subject: "Fee payment deadline extended to Oct 15, 2024",
      timestamp: "1 day ago",
      isUnread: true,
      type: "finance",
      priority: "medium"
    },
    {
      id: 3,
      subject: "New course material uploaded for Data Structures",
      timestamp: "2 days ago",
      isUnread: true,
      type: "academic",
      priority: "low"
    },
    {
      id: 4,
      subject: "Hostel maintenance scheduled for next week",
      timestamp: "3 days ago",
      isUnread: false,
      type: "general",
      priority: "low"
    }
  ];

  const quickStats = [
    {
      label: "Current GPA",
      value: studentData.currentGPA,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      label: "Attendance",
      value: `${studentData.attendance}%`,
      icon: Clock,
      color: studentData.attendance >= studentData.minAttendanceRequired ? "text-green-600" : "text-red-600",
      bgColor: studentData.attendance >= studentData.minAttendanceRequired ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
    },
    {
      label: "Books Issued",
      value: `${studentData.booksIssued}/${studentData.maxBooks}`,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      label: "Semester",
      value: studentData.semester,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'exam':
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'finance':
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'academic':
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'general':
        return <Bell className="w-4 h-4 text-gray-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Profile Summary
                  </h3>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {studentData.name}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Roll Number</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {studentData.rollNumber}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {studentData.course}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Batch</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {studentData.batch}
                  </p>
                </div>

                {studentData.hostelRoom && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hostel</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {studentData.hostelRoom}, {studentData.hostelBlock}
                    </p>
                  </div>
                )}
              </div>

             
            </div>
          </div>

          {/* Finance Widget - Prominent */}
          <div className="lg:col-span-2">
            <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${
              studentData.hasDues 
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    studentData.hasDues 
                      ? 'bg-amber-100 dark:bg-amber-900/40' 
                      : 'bg-green-100 dark:bg-green-900/40'
                  }`}>
                    <CreditCard className={`w-6 h-6 ${
                      studentData.hasDues ? 'text-amber-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      Finance Status
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Fee payment overview
                    </p>
                  </div>
                </div>
                
                {studentData.hasDues ? (
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fee Status */}
                <div className="text-center">
                  {studentData.hasDues ? (
                    <div>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                        ₹{studentData.nextFeeAmount.toLocaleString()}
                      </p>
                      <p className="text-amber-700 dark:text-amber-300 mb-2">
                        Next Fee Amount Due
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">
                        Due: {formatDate(studentData.dueDate)}
                      </p>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Pay Now
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        No Dues
                      </p>
                      <p className="text-green-700 dark:text-green-300">
                        All payments are up to date
                      </p>
                    </div>
                  )}
                </div>

                {/* Wallet Balance */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mr-2">
                      Wallet Balance
                    </p>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {showBalance ? `₹${studentData.walletBalance}` : '₹••••'}
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                    Add Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Progress & Deadlines Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Academic Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Academic Progress
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current semester performance
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {academicProgress.map((subject, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {subject.subject}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {subject.credits} credits
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    subject.grade.startsWith('A') 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : subject.grade.startsWith('B')
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {subject.grade}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                View Detailed Report
              </button>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Upcoming Deadlines
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Important dates to remember
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {deadline.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDate(deadline.date)}
                      </p>
                      {getPriorityBadge(deadline.priority)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                View All Deadlines
              </button>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Recent Notifications
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Latest updates and announcements
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                  notification.isUnread 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium ${
                      notification.isUnread 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {notification.subject}
                    </p>
                    {getPriorityBadge(notification.priority)}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.timestamp}
                  </p>
                </div>
                {notification.isUnread && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
              View All Notifications
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        
           
           
      </div>
    </div>
  );
};

export default Dashboard;