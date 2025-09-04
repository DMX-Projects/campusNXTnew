 // StudentDashboard.tsx - COMPLETE FUNCTIONAL VERSION
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  User, 
  BookOpen, 
  ClipboardList, 
  BarChart2, 
  Bell, 
  TrendingUp,
  Clock,
  Award,
  FileText,
  Eye,
  Download,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Target
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  semester: string;
  credits: number;
  attendance: number;
  grade: string;
  instructor: string;
  totalClasses: number;
  attendedClasses: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  marks?: number;
  totalMarks?: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface Exam {
  id: string;
  subject: string;
  subjectCode: string;
  date: string;
  time: string;
  duration: string;
  type: 'midterm' | 'final' | 'quiz';
  venue: string;
}

const StudentDashboard: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    department: 'Computer Science Engineering',
    semester: '5th Semester',
    batch: '2022-2026',
    section: 'A',
    cgpa: 8.45,
    sgpa: 8.72,
    profileImage: '/api/placeholder/150/150'
  });

  // Current Semester Courses
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      semester: '5',
      credits: 4,
      attendance: 92,
      grade: 'A',
      instructor: 'Dr. Rajesh Kumar',
      totalClasses: 45,
      attendedClasses: 41
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CS302',
      semester: '5',
      credits: 3,
      attendance: 88,
      grade: 'A-',
      instructor: 'Prof. Priya Sharma',
      totalClasses: 40,
      attendedClasses: 35
    },
    {
      id: '3',
      name: 'Operating Systems',
      code: 'CS303',
      semester: '5',
      credits: 4,
      attendance: 95,
      grade: 'A+',
      instructor: 'Dr. Amit Singh',
      totalClasses: 42,
      attendedClasses: 40
    },
    {
      id: '4',
      name: 'Computer Networks',
      code: 'CS304',
      semester: '5',
      credits: 3,
      attendance: 85,
      grade: 'B+',
      instructor: 'Dr. Neha Gupta',
      totalClasses: 38,
      attendedClasses: 32
    }
  ]);

  // Assignments
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Binary Tree Implementation',
      subject: 'Data Structures',
      dueDate: '2025-09-10',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Database Design Project',
      subject: 'DBMS',
      dueDate: '2025-09-15',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Process Scheduling Algorithm',
      subject: 'Operating Systems',
      dueDate: '2025-09-08',
      status: 'submitted'
    },
    {
      id: '4',
      title: 'Socket Programming',
      subject: 'Computer Networks',
      dueDate: '2025-08-30',
      status: 'graded',
      marks: 18,
      totalMarks: 20
    }
  ]);

  // Upcoming Exams
  const [upcomingExams] = useState<Exam[]>([
    {
      id: '1',
      subject: 'Data Structures and Algorithms',
      subjectCode: 'CS301',
      date: '2025-09-20',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'midterm',
      venue: 'Room 101'
    },
    {
      id: '2',
      subject: 'Database Management Systems',
      subjectCode: 'CS302',
      date: '2025-09-22',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'midterm',
      venue: 'Room 203'
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Mid-term Exam Schedule Released',
      message: 'The mid-term examination schedule for all subjects has been published. Please check your exam dates.',
      type: 'info',
      date: '2025-09-03T10:00:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Assignment Submission Reminder',
      message: 'Your Data Structures assignment is due in 2 days. Please submit before the deadline.',
      type: 'warning',
      date: '2025-09-02T14:30:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Fee Payment Confirmation',
      message: 'Your semester fee payment has been successfully processed.',
      type: 'success',
      date: '2025-09-01T09:15:00Z',
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      title: 'Low Attendance Alert',
      message: 'Your attendance in Computer Networks is below 90%. Please attend classes regularly.',
      type: 'error',
      date: '2025-08-31T16:20:00Z',
      read: false,
      priority: 'high'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'overview' | 'courses' | 'assignments' | 'exams'>('overview');

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const avgAttendance = Math.round(courses.reduce((sum, course) => sum + course.attendance, 0) / courses.length);
    const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
    const unreadNotifications = notifications.filter(n => !n.read).length;
    
    return {
      totalCourses: courses.length,
      totalCredits,
      avgAttendance,
      pendingAssignments,
      unreadNotifications,
      upcomingExams: upcomingExams.length
    };
  }, [courses, assignments, notifications, upcomingExams]);

  // Get notification type styling
  const getNotificationStyle = (type: string, priority: string) => {
    const baseStyle = "border-l-4 ";
    switch (type) {
      case 'success': return baseStyle + 'border-green-500 bg-green-50';
      case 'warning': return baseStyle + 'border-yellow-500 bg-yellow-50';
      case 'error': return baseStyle + 'border-red-500 bg-red-50';
      default: return baseStyle + 'border-blue-500 bg-blue-50';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-800';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {studentInfo.name}</h1>
              <div className="text-gray-600 space-y-1">
                <p>Roll: {studentInfo.rollNumber} | Reg: {studentInfo.registrationNumber}</p>
                <p>{studentInfo.department} | {studentInfo.semester} | Section {studentInfo.section}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">CGPA: {studentInfo.cgpa}</div>
              <div className="text-sm text-gray-600">Current SGPA: {studentInfo.sgpa}</div>
            </div>
            
            <div className="relative">
              <button 
                onClick={markAllAsRead}
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Bell className="w-6 h-6 text-blue-600" />
                {stats.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {stats.unreadNotifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalCourses}</div>
              <div className="text-sm text-gray-600">Enrolled Courses</div>
              <div className="text-xs text-blue-600">{stats.totalCredits} Total Credits</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgAttendance}%</div>
              <div className="text-sm text-gray-600">Average Attendance</div>
              <div className={`text-xs ${getAttendanceColor(stats.avgAttendance)}`}>
                {stats.avgAttendance >= 75 ? 'Good Standing' : 'Below Minimum'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <ClipboardList className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</div>
              <div className="text-sm text-gray-600">Pending Assignments</div>
              <div className="text-xs text-orange-600">
                {stats.pendingAssignments > 0 ? 'Action Required' : 'All Caught Up'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.upcomingExams}</div>
              <div className="text-sm text-gray-600">Upcoming Exams</div>
              <div className="text-xs text-purple-600">Next 30 Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4" /> },
            { id: 'exams', label: 'Exams', icon: <FileText className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Today's Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Data Structures - CS301</div>
                      <div className="text-sm text-blue-700">10:00 AM - 11:00 AM | Room 204 | Dr. Rajesh Kumar</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Notifications */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Mark All as Read
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notifications.slice(0, 5).map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        getNotificationStyle(notification.type, notification.priority)
                      } ${!notification.read ? '' : 'opacity-75'}`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <div className="text-xs text-gray-500">
                              {new Date(notification.date).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <div className="mt-2">
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'courses' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Semester Courses</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Course Code</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Course Name</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Credits</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Instructor</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Attendance</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">{course.code}</td>
                        <td className="border border-gray-300 px-4 py-3">{course.name}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{course.credits}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{course.instructor}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className={`font-medium ${getAttendanceColor(course.attendance)}`}>
                            {course.attendance}%
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {course.attendedClasses}/{course.totalClasses}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'assignments' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Subject: {assignment.subject}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    {assignment.marks !== undefined && (
                      <div className="text-sm font-medium text-green-600">
                        Score: {assignment.marks}/{assignment.totalMarks}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'exams' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Examinations</h3>
              <div className="space-y-4">
                {upcomingExams.map(exam => (
                  <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{exam.subject}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>Code: {exam.subjectCode}</div>
                          <div>Date: {new Date(exam.date).toLocaleDateString()}</div>
                          <div>Time: {exam.time}</div>
                          <div>Duration: {exam.duration}</div>
                          <div>Venue: {exam.venue}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exam.type === 'final' ? 'bg-red-100 text-red-800' :
                        exam.type === 'midterm' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {exam.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
