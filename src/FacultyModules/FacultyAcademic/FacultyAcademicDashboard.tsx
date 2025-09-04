// FacultyDashboard.tsx
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Bell, 
  TrendingUp, 
  FileText, 
  Video, 
  BarChart3,
  AlertCircle,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

interface FacultyInfo {
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  subjects: string[];
}

interface ClassSchedule {
  id: string;
  subject: string;
  class: string;
  section: string;
  time: string;
  room: string;
  type: 'lecture' | 'practical' | 'tutorial';
  studentsEnrolled: number;
}

interface QuickStat {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface RecentActivity {
  id: string;
  activity: string;
  timestamp: string;
  type: 'attendance' | 'grading' | 'material' | 'announcement';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
}

const FacultyDashboard: React.FC = () => {
  // Faculty Information
  const [facultyInfo] = useState<FacultyInfo>({
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering',
    designation: 'Associate Professor',
    email: 'rajesh.kumar@college.edu',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems']
  });

  // Today's Classes
  const [todaysClasses] = useState<ClassSchedule[]>([
    {
      id: '1',
      subject: 'Data Structures',
      class: 'BTech CSE',
      section: '3A',
      time: '09:00 - 10:00',
      room: 'Room 204',
      type: 'lecture',
      studentsEnrolled: 60
    },
    {
      id: '2',
      subject: 'Algorithms',
      class: 'BTech CSE',
      section: '3B',
      time: '11:00 - 12:00',
      room: 'Room 205',
      type: 'lecture',
      studentsEnrolled: 58
    },
    {
      id: '3',
      subject: 'Database Lab',
      class: 'BTech CSE',
      section: '3A',
      time: '14:00 - 16:00',
      room: 'Lab 301',
      type: 'practical',
      studentsEnrolled: 30
    }
  ]);

  // Recent Activities
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      activity: 'Marked attendance for Data Structures - 3A',
      timestamp: '2 hours ago',
      type: 'attendance'
    },
    {
      id: '2',
      activity: 'Uploaded study material for Algorithms',
      timestamp: '4 hours ago',
      type: 'material'
    },
    {
      id: '3',
      activity: 'Graded assignments for Database Systems',
      timestamp: '1 day ago',
      type: 'grading'
    },
    {
      id: '4',
      activity: 'Posted announcement for upcoming test',
      timestamp: '2 days ago',
      type: 'announcement'
    }
  ]);

  // Notifications
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Faculty Meeting',
      message: 'Department meeting scheduled for tomorrow at 3 PM',
      type: 'info',
      timestamp: '1 hour ago'
    },
    {
      id: '2',
      title: 'Syllabus Deadline',
      message: 'Please update syllabus completion by Friday',
      type: 'warning',
      timestamp: '3 hours ago'
    },
    {
      id: '3',
      title: 'Student Feedback',
      message: 'New student feedback received for your classes',
      type: 'success',
      timestamp: '1 day ago'
    }
  ]);

  // Quick Statistics
  const quickStats: QuickStat[] = [
    {
      label: 'Classes Today',
      value: todaysClasses.length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Total Students',
      value: todaysClasses.reduce((sum, cls) => sum + cls.studentsEnrolled, 0),
      icon: <Users className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Pending Tasks',
      value: 8,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Avg Attendance',
      value: '85%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getCurrentClass = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5); // HH:MM format
    
    return todaysClasses.find(cls => {
      const [startTime, endTime] = cls.time.split(' - ');
      return currentTimeStr >= startTime && currentTimeStr <= endTime;
    });
  };

  const getNextClass = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    return todaysClasses.find(cls => {
      const [startTime] = cls.time.split(' - ');
      return currentTimeStr < startTime;
    });
  };

  const currentClass = getCurrentClass();
  const nextClass = getNextClass();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <Users className="w-4 h-4 text-blue-600" />;
      case 'grading': return <FileText className="w-4 h-4 text-green-600" />;
      case 'material': return <BookOpen className="w-4 h-4 text-purple-600" />;
      case 'announcement': return <MessageSquare className="w-4 h-4 text-orange-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {facultyInfo.name.split(' ')[1]}!</h1>
            <p className="text-gray-600 mt-1">
              {facultyInfo.designation} • {facultyInfo.department}
            </p>
            <p className="text-sm text-gray-500">Current Time: {currentTime}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Employee ID: {facultyInfo.employeeId}</p>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current/Next Class */}
          {(currentClass || nextClass) && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                {currentClass ? 'Current Class' : 'Next Class'}
              </h2>
              
              {currentClass && (
                <div className="border border-green-200 bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800 font-medium">Live Now</span>
                  </div>
                  <h3 className="font-semibold text-lg text-green-800">{currentClass.subject}</h3>
                  <p className="text-green-700">
                    {currentClass.class} - Section {currentClass.section} • {currentClass.room}
                  </p>
                  <p className="text-green-600 text-sm">
                    {currentClass.time} • {currentClass.studentsEnrolled} students
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Mark Attendance
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Start Online Class
                    </button>
                  </div>
                </div>
              )}

              {nextClass && (
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-blue-800">{nextClass.subject}</h3>
                  <p className="text-blue-700">
                    {nextClass.class} - Section {nextClass.section} • {nextClass.room}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {nextClass.time} • {nextClass.studentsEnrolled} students
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Schedule
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Full Timetable
              </button>
            </div>

            {todaysClasses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todaysClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
                      <p className="text-gray-600 text-sm">
                        {cls.class} - Section {cls.section}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {cls.room} • {cls.studentsEnrolled} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{cls.time}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        cls.type === 'lecture' ? 'bg-blue-100 text-blue-800' :
                        cls.type === 'practical' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {cls.type.charAt(0).toUpperCase() + cls.type.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Mark Attendance', icon: <Users className="w-5 h-5" />, color: 'bg-blue-600' },
                { label: 'Upload Material', icon: <BookOpen className="w-5 h-5" />, color: 'bg-green-600' },
                { label: 'Create Assignment', icon: <FileText className="w-5 h-5" />, color: 'bg-purple-600' },
                { label: 'Schedule Class', icon: <Video className="w-5 h-5" />, color: 'bg-red-600' },
                { label: 'Grade Students', icon: <BarChart3 className="w-5 h-5" />, color: 'bg-yellow-600' },
                { label: 'Send Message', icon: <MessageSquare className="w-5 h-5" />, color: 'bg-indigo-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-opacity`}
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notifications
              </h2>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                {notifications.length}
              </span>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`border-l-4 rounded-r-lg p-3 ${getNotificationColor(notification.type)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Notifications
            </button>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Activities
            </h2>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{activity.activity}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Activities
            </button>
          </div>

          {/* My Subjects */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              My Subjects
            </h2>

            <div className="space-y-3">
              {facultyInfo.subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">{subject}</span>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
