import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  UserCheck,
  ChevronRight,
  Activity,
  GraduationCap,
  MapPin,
  Timer,
  Zap,
  Target,
  Award
} from 'lucide-react';

interface FacultyInfo {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  subjects: string[];
}

interface TimetableEntry {
  id: string;
  subject: string;
  class: string;
  section: string;
  facultyId: string;
  schedule: string;
  room: string;
  totalStudents: number;
  startTime: string;
  endTime: string;
  days: string[];
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
}

interface AttendanceRecord {
  id?: string;
  studentId: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent' | 'Leave';
  markedAt: string;
  location?: string;
}

interface QuickStat {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: string;
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

const API_BASE_URL = 'http://localhost:3001';

// Building icon component (if not available)
const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Current faculty ID - default to FAC001
  const currentFacultyId = "FAC001";

  const defaultFacultyInfo: FacultyInfo = {
    id: "FAC001",
    name: "Dr. Rajesh Kumar",
    employeeId: "FAC001",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    email: "rajesh.kumar@college.edu",
    subjects: ["Data Structures", "Algorithms", "Database Systems", "Computer Networks"]
  };

  // Fetch all data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Set default faculty info immediately
        setFacultyInfo(defaultFacultyInfo);

        // Fetch timetables for current faculty
        try {
          const timetableResponse = await fetch(`${API_BASE_URL}/timetables?facultyId=${currentFacultyId}`);
          if (timetableResponse.ok) {
            const timetableData = await timetableResponse.json();
            setTimetable(timetableData);
          } else {
            console.warn('Failed to fetch timetables, using empty array');
            setTimetable([]);
          }
        } catch (err) {
          console.warn('Error fetching timetables:', err);
          setTimetable([]);
        }

        // Fetch all students
        try {
          const studentsResponse = await fetch(`${API_BASE_URL}/students`);
          if (studentsResponse.ok) {
            const studentsData = await studentsResponse.json();
            setStudents(studentsData);
          } else {
            console.warn('Failed to fetch students, using empty array');
            setStudents([]);
          }
        } catch (err) {
          console.warn('Error fetching students:', err);
          setStudents([]);
        }

        // Fetch recent attendance records
        try {
          const today = new Date().toISOString().split('T')[0];
          const attendanceResponse = await fetch(`${API_BASE_URL}/attendance?date=${today}`);
          if (attendanceResponse.ok) {
            const attendanceData = await attendanceResponse.json();
            setAttendance(attendanceData);
          } else {
            console.warn('Failed to fetch attendance, using empty array');
            setAttendance([]);
          }
        } catch (err) {
          console.warn('Error fetching attendance:', err);
          setAttendance([]);
        }

        // Set default notifications
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Assignment Deadline',
            message: 'Database Systems assignment due tomorrow',
            type: 'warning',
            timestamp: new Date().toLocaleDateString()
          },
          {
            id: '2',
            title: 'Faculty Meeting',
            message: 'Department meeting scheduled for today at 3:00 PM',
            type: 'info',
            timestamp: new Date().toLocaleDateString()
          },
          {
            id: '3',
            title: 'Attendance Reminder',
            message: 'Please mark attendance for all your classes today',
            type: 'success',
            timestamp: new Date().toLocaleDateString()
          }
        ];
        setNotifications(mockNotifications);

      } catch (error) {
        console.error('Error in fetchData:', error);
        // Don't set error state, just log it and continue with defaults
        // setError('Failed to load some dashboard data. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentFacultyId]);

  // Get today's classes
  const todaysClasses = useMemo(() => {
    if (!timetable.length) return [];
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return timetable
      .filter(entry => entry.days.includes(today))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [timetable]);

  // Get students for faculty's classes
  const facultyStudents = useMemo(() => {
    const facultyClassSections = timetable.map(t => `${t.class}-${t.section}`);
    return students.filter(student => 
      facultyClassSections.includes(`${student.class}-${student.section}`)
    );
  }, [students, timetable]);

  // Calculate attendance statistics
  const attendanceStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(record => record.date === today);
    
    const totalClasses = todaysClasses.length;
    const classesWithAttendance = todaysClasses.filter(cls => 
      todayAttendance.some(att => att.subject === cls.subject && att.class === cls.class && att.section === cls.section)
    ).length;
    
    const totalPresent = todayAttendance.filter(record => record.status === 'Present').length;
    const totalAbsent = todayAttendance.filter(record => record.status === 'Absent').length;
    const totalLeave = todayAttendance.filter(record => record.status === 'Leave').length;
    const totalMarked = totalPresent + totalAbsent + totalLeave;
    
    const avgAttendance = totalMarked > 0 ? Math.round((totalPresent / totalMarked) * 100) : 85; // Default to 85%

    return {
      totalClasses,
      classesWithAttendance,
      avgAttendance,
      totalPresent,
      totalAbsent,
      totalLeave
    };
  }, [todaysClasses, attendance]);

  // Convert time format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get current class
  const getCurrentClass = () => {
    const now = new Date();
    const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    
    return todaysClasses.find(cls => {
      return currentTimeStr >= cls.startTime && currentTimeStr <= cls.endTime;
    });
  };

  // Get next class
  const getNextClass = () => {
    const now = new Date();
    const currentTimeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    
    return todaysClasses.find(cls => currentTimeStr < cls.startTime);
  };

  const currentClass = getCurrentClass();
  const nextClass = getNextClass();

  // Handle attendance navigation
  const handleMarkAttendance = (classInfo: TimetableEntry) => {
    navigate('/attendance', { 
      state: { 
        timetableId: classInfo.id,
        classInfo: classInfo,
        facultyId: currentFacultyId,
        facultyName: facultyInfo?.name
      } 
    });
  };

  // Quick Statistics with improved data
  const quickStats: QuickStat[] = [
    {
      label: 'Classes Today',
      value: todaysClasses.length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: todaysClasses.length > 0 ? `${attendanceStats.classesWithAttendance}/${todaysClasses.length} completed` : 'No classes'
    },
    {
      label: 'Total Students',
      value: facultyStudents.length,
      icon: <Users className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: `Across ${timetable.length} subjects`
    },
    {
      label: 'Avg Attendance',
      value: `${attendanceStats.avgAttendance}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: attendanceStats.avgAttendance >= 75 ? 'Good' : attendanceStats.avgAttendance >= 50 ? 'Average' : 'Low'
    },
    {
      label: 'Active Subjects',
      value: timetable.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: `${new Set(timetable.map(t => t.class)).size} different classes`
    }
  ];

  // Recent activities based on actual data
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      activity: `Marked attendance for ${attendance.length > 0 ? attendance[0].subject : 'recent class'}`,
      timestamp: attendance.length > 0 ? 'Today' : '2 hours ago',
      type: 'attendance'
    },
    {
      id: '2',
      activity: 'Uploaded study material for Database Systems',
      timestamp: '4 hours ago',
      type: 'material'
    },
    {
      id: '3',
      activity: 'Graded assignments for Computer Networks',
      timestamp: '1 day ago',
      type: 'grading'
    },
    {
      id: '4',
      activity: 'Posted announcement for upcoming test',
      timestamp: '2 days ago',
      type: 'announcement'
    }
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'grading': return <Award className="w-4 h-4 text-green-600" />;
      case 'material': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'announcement': return <MessageSquare className="w-4 h-4 text-orange-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-l-blue-500 bg-blue-50 text-blue-800';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50 text-yellow-800';
      case 'success': return 'border-l-green-500 bg-green-50 text-green-800';
      default: return 'border-l-gray-500 bg-gray-50 text-gray-800';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  // Don't show error state for faculty info since we have defaults
  // Only show error if absolutely no data can be loaded
  if (!facultyInfo) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load faculty information</h2>
          <p className="text-red-600 mb-4">Please check your connection and try again</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Reload Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome Back, {facultyInfo.name.split(' ').slice(-1)[0]}! 👋
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>{facultyInfo.designation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{facultyInfo.department}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-blue-100 text-sm">Current Time</p>
              <p className="text-2xl font-bold">{currentTime}</p>
              <p className="text-blue-100 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 font-medium mb-1">{stat.label}</p>
              {stat.trend && (
                <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block">
                  {stat.trend}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Enhanced Current/Next Class Alert */}
          {(currentClass || nextClass) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  {currentClass ? 'Live Class' : 'Next Class'}
                </h2>
              </div>
              
              <div className="p-6">
                {currentClass && (
                  <div className="border-2 border-green-200 bg-green-50 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-800 font-bold text-lg">LIVE NOW</span>
                      <Timer className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-bold text-2xl text-green-800 mb-2">{currentClass.subject}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-green-700">
                        <Users className="w-4 h-4" />
                        <span>{currentClass.class} - Section {currentClass.section}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <MapPin className="w-4 h-4" />
                        <span>{currentClass.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(currentClass.startTime)} - {formatTime(currentClass.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <Target className="w-4 h-4" />
                        <span>{currentClass.totalStudents} students</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => handleMarkAttendance(currentClass)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <UserCheck className="w-5 h-5" />
                        Mark Attendance
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                        <Video className="w-5 h-5" />
                        Start Online Class
                      </button>
                    </div>
                  </div>
                )}

                {nextClass && (
                  <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-6">
                    <h3 className="font-bold text-2xl text-blue-800 mb-2">{nextClass.subject}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Users className="w-4 h-4" />
                        <span>{nextClass.class} - Section {nextClass.section}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <MapPin className="w-4 h-4" />
                        <span>{nextClass.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(nextClass.startTime)} - {formatTime(nextClass.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <Target className="w-4 h-4" />
                        <span>{nextClass.totalStudents} students</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
              <div className="flex justify-between items-center text-white">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Calendar className="w-7 h-7" />
                  Today's Schedule
                </h2>
                <button 
                  onClick={() => navigate('/academics/faculty-timetable')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Full Timetable
                </button>
              </div>
            </div>

            <div className="p-6">
              {todaysClasses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No classes scheduled for today</h3>
                  <p className="text-gray-500">Take some time to plan your next lectures or review materials!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todaysClasses.map((cls, index) => {
                    const classStudents = students.filter(s => s.class === cls.class && s.section === cls.section);
                    const hasAttendance = attendance.some(att => 
                      att.subject === cls.subject && att.class === cls.class && att.section === cls.section
                    );
                    return (
                      <div 
                        key={cls.id} 
                        className="group relative bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
                        onClick={() => handleMarkAttendance(cls)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {cls.subject}
                                </h3>
                                <p className="text-gray-600 font-medium">
                                  {cls.class} - Section {cls.section}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{cls.room}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{classStudents.length} students</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasAttendance ? (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Attendance Marked</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-orange-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">Pending</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                              <p className="font-bold text-lg text-gray-900">
                                {formatTime(cls.startTime)}
                              </p>
                              <p className="text-gray-500 text-sm">
                                to {formatTime(cls.endTime)}
                              </p>
                            </div>
                            <div className="flex items-center justify-end">
                              <UserCheck className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Quick Actions Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Plus className="w-7 h-7" />
                Quick Actions
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigate('/academics/faculty-studentattendance')}
                  className="group flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-200 transition-colors mb-3">
                    <UserCheck className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Mark Attendance</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">Track student presence</span>
                </button>
                
                
                
                <button 
                  onClick={() => navigate('/academics/faculty-StudyMaterial')}
                  className="group flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="bg-purple-100 p-4 rounded-full group-hover:bg-purple-200 transition-colors mb-3">
                    <FileText className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Study Materials</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">Upload resources</span>
                </button>
                
                <button 
                  onClick={() => navigate('/academics/announcement')}
                  className="group flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="bg-orange-100 p-4 rounded-full group-hover:bg-orange-200 transition-colors mb-3">
                    <MessageSquare className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Announcements</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">Post updates</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Sidebar */}
        <div className="space-y-8">
          
          {/* Enhanced Notifications Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
              <div className="flex justify-between items-center text-white">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Bell className="w-6 h-6" />
                  Notifications
                </h2>
                <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
                  {notifications.length}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`border-l-4 rounded-r-xl p-4 ${getNotificationColor(notification.type)} transition-all duration-200 hover:shadow-md`}>
                    <h4 className="font-bold mb-2">{notification.title}</h4>
                    <p className="text-sm mb-2">{notification.message}</p>
                    <p className="text-xs opacity-75">{notification.timestamp}</p>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/notifications')}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                View All Notifications
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced Recent Activities Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Activity className="w-6 h-6" />
                Recent Activities
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.activity}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/activities')}
                className="w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                View All Activities
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced My Subjects Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                My Subjects
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {timetable.map((entry) => {
                  const classStudents = students.filter(s => s.class === entry.class && s.section === entry.section);
                  const hasAttendance = attendance.some(att => 
                    att.subject === entry.subject && att.class === entry.class && att.section === entry.section
                  );
                  return (
                    <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {entry.subject}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {entry.class} - Section {entry.section}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAttendance(entry);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-all"
                            title="Mark Attendance"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/subject/${entry.id}`, { state: { subject: entry } });
                            }}
                            className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-100 transition-all" 
                            title="View Subject Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{entry.schedule}</span>
                        <div className="flex items-center gap-4">
                          <span>{classStudents.length} students</span>
                          {hasAttendance && <CheckCircle className="w-3 h-3 text-green-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => navigate('/subjects')}
                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Manage All Subjects
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Enhanced Class Statistics Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-6 h-6" />
                Statistics
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Classes This Week</span>
                  </div>
                  <span className="font-bold text-xl text-blue-600">
                    {timetable.reduce((total, t) => total + t.days.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Avg Class Size</span>
                  </div>
                  <span className="font-bold text-xl text-green-600">
                    {Math.round(timetable.reduce((sum, t) => sum + t.totalStudents, 0) / timetable.length) || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">Total Students</span>
                  </div>
                  <span className="font-bold text-xl text-purple-600">{facultyStudents.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Active Subjects</span>
                  </div>
                  <span className="font-bold text-xl text-orange-600">{timetable.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;