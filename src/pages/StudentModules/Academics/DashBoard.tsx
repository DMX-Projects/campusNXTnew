import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Sun, 
  Moon,
  GraduationCap,
  FileText,
  Target,
  Activity,
  Bell,
  ChevronRight,
  Plus,
  Eye
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

// Welcome Header Component
const WelcomeHeader = () => {
  const { isDarkMode } = useTheme();
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = 'Good Morning';
  if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
  else if (hour >= 17) greeting = 'Good Evening';

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{greeting}, Alex!</h1>
          <p className="text-blue-100 text-lg">Ready to tackle your academic goals today?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold">3rd</div>
          <div className="text-sm text-blue-100">Semester</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">CSE</div>
          <div className="text-sm text-blue-100">Department</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">8.4</div>
          <div className="text-sm text-blue-100">CGPA</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm text-blue-100">Attendance</div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component - FIXED VERSION
const StatsCard = ({ icon: Icon, title, value, change, color = "blue", trend = "up" }) => {
  const { isDarkMode } = useTheme();
  
  // Fixed color mapping with proper dark mode classes
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        light: "bg-blue-50 border-blue-200 text-blue-600",
        dark: "bg-slate-800 border-slate-700 text-blue-400"
      },
      green: {
        light: "bg-green-50 border-green-200 text-green-600", 
        dark: "bg-slate-800 border-slate-700 text-green-400"
      },
      purple: {
        light: "bg-purple-50 border-purple-200 text-purple-600",
        dark: "bg-slate-800 border-slate-700 text-purple-400"
      },
      orange: {
        light: "bg-orange-50 border-orange-200 text-orange-600",
        dark: "bg-slate-800 border-slate-700 text-orange-400"
      },
      red: {
        light: "bg-red-50 border-red-200 text-red-600",
        dark: "bg-slate-800 border-slate-700 text-red-400"
      }
    };
    
    return isDarkMode ? colorMap[color].dark : colorMap[color].light;
  };

  return (
    <div className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${getColorClasses(color)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium opacity-70 mb-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
              <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-white/50'}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Today's Schedule Component
const TodaySchedule = () => {
  const { isDarkMode } = useTheme();
  
  const todayClasses = [
    {
      id: 1,
      subject: "Data Structures",
      time: "09:00-10:00",
      room: "CS101",
      faculty: "Dr. Smith",
      status: "completed"
    },
    {
      id: 2,
      subject: "Database Management",
      time: "10:00-11:00",
      room: "CS102",
      faculty: "Prof. Johnson",
      status: "completed"
    },
    {
      id: 3,
      subject: "Software Engineering",
      time: "12:15-01:15",
      room: "CS104",
      faculty: "Prof. Davis",
      status: "upcoming"
    },
    {
      id: 4,
      subject: "Web Technologies Lab",
      time: "02:15-04:15",
      room: "Lab1",
      faculty: "Dr. Wilson",
      status: "upcoming"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Classes</h3>
        <Calendar className="w-5 h-5 text-blue-500" />
      </div>
      <div className="space-y-3">
        {todayClasses.map((classItem) => (
          <div key={classItem.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <div className={`w-3 h-3 rounded-full ${classItem.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{classItem.subject}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {classItem.time}
                </span>
                <span>{classItem.room}</span>
                <span>{classItem.faculty}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              classItem.status === 'completed' 
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            }`}>
              {classItem.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grade Overview Component
const GradeOverview = () => {
  const { isDarkMode } = useTheme();
  
  const subjects = [
    { name: "Data Structures", grade: "A", marks: "88/100", color: "bg-green-500" },
    { name: "Database Management", grade: "A-", marks: "82/100", color: "bg-blue-500" },
    { name: "Software Engineering", grade: "A", marks: "86/100", color: "bg-green-500" },
    { name: "Web Technologies", grade: "B+", marks: "78/100", color: "bg-yellow-500" },
    { name: "Computer Networks", grade: "A-", marks: "84/100", color: "bg-blue-500" }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Grades</h3>
        <Award className="w-5 h-5 text-purple-500" />
      </div>
      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-8 rounded-full ${subject.color}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{subject.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{subject.marks}</p>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800 dark:text-white">
              {subject.grade}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Upcoming Events Component
const UpcomingEvents = () => {
  const { isDarkMode } = useTheme();
  
  const events = [
    {
      id: 1,
      title: "Data Structures CAT",
      date: "Sep 25, 2024",
      time: "10:00 AM",
      type: "exam",
      color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
    },
    {
      id: 2,
      title: "IEEE Conference Presentation",
      date: "Oct 15, 2024",
      time: "2:00 PM",
      type: "event",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
    },
    {
      id: 3,
      title: "Software Engineering Lab",
      date: "Sep 20, 2024",
      time: "2:15 PM",
      type: "class",
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
    },
    {
      id: 4,
      title: "Project Submission",
      date: "Sep 30, 2024",
      time: "11:59 PM",
      type: "deadline",
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Events</h3>
        <Bell className="w-5 h-5 text-gray-500 dark:text-slate-400" />
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <div className={`p-2 rounded-lg ${event.color}`}>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{event.title}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                <span>{event.date}</span>
                <span>•</span>
                <span>{event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <WelcomeHeader />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={BookOpen}
              title="Total Courses"
              value="8"
              change="+2 this semester"
              color="blue"
            />
            <StatsCard
              icon={CheckCircle}
              title="Attendance Rate"
              value="85%"
              change="+5% from last week"
              color="green"
            />
            <StatsCard
              icon={Award}
              title="Current CGPA"
              value="8.4"
              change="+0.2 from last sem"
              color="purple"
            />
            <StatsCard
              icon={Clock}
              title="Pending Tasks"
              value="3"
              change="-2 completed today"
              color="orange"
            />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Today's Schedule */}
            <TodaySchedule />
            
            {/* Grade Overview */}
            <GradeOverview />
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <UpcomingEvents />
            
            {/* Performance Chart Placeholder */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Academic Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Semester Progress</span>
                    <span className="text-sm font-bold text-blue-600">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Assignment Completion</span>
                    <span className="text-sm font-bold text-green-600">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Attendance Goal</span>
                    <span className="text-sm font-bold text-purple-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
