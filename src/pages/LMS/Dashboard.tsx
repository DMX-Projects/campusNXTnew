import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Award,
  Bell,
  ChevronRight,
  Upload,
  BarChart3,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

// StatsCard Component
const StatsCard = ({ title, value, icon: Icon, change, trend, color = "blue" }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center">
              <span
                className={`text-sm font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[color]} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// RecentActivity Component
const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false);

  const activities = [
    { id: 1, type: "assignment", title: "Data Structures Assignment Submitted", student: "Priya Sharma", course: "Computer Science - Semester 3", time: "2 hours ago", status: "completed", avatar: "PS" },
    { id: 2, type: "exam", title: "Mid-Term Mathematics Exam", student: "Rahul Kumar", course: "Engineering Mathematics - Semester 2", time: "4 hours ago", status: "in-progress", avatar: "RK" },
    { id: 3, type: "course", title: "New Course Material Uploaded", student: "Dr. Anjali Gupta", course: "Machine Learning Fundamentals", time: "1 day ago", status: "update", avatar: "AG" },
    { id: 4, type: "grade", title: "Physics Lab Report Graded", student: "Amit Patel", course: "Physics Laboratory - Semester 1", time: "2 days ago", status: "graded", avatar: "AP" },
    { id: 5, type: "discussion", title: "Discussion Forum Post", student: "Sneha Reddy", course: "Database Management Systems", time: "3 days ago", status: "discussion", avatar: "SR" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      case "update": return "bg-blue-100 text-blue-800";
      case "graded": return "bg-purple-100 text-purple-800";
      case "discussion": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          {showAll ? "Show Less" : "View All"} 
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {(showAll ? activities : activities.slice(0, 4)).map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.student}</p>
              <p className="text-xs text-gray-500">{activity.course}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// UpcomingEvents Component
const UpcomingEvents = () => {
  const events = [
    { id: 1, title: "Final Examinations Begin", date: "2025-03-15", time: "09:00 AM", type: "exam" },
    { id: 2, title: "Faculty Meeting", date: "2025-03-12", time: "02:00 PM", type: "meeting" },
    { id: 3, title: "Cultural Fest Registration", date: "2025-03-10", time: "10:00 AM", type: "event" },
    { id: 4, title: "Project Submission Deadline", date: "2025-03-18", time: "11:59 PM", type: "deadline" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <Link 
          to="calendar"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Calendar
        </Link>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// QuickActions Component
// QuickActions Component
const QuickActions = () => {
  const fileInputRef = React.useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const actions = [
    { title: "Create Assignment", icon: Plus, color: "bg-blue-500 hover:bg-blue-600", description: "Add new assignment", link: "assignments"},
    { title: "Upload Material", icon: Upload, color: "bg-purple-500 hover:bg-purple-600", description: "Share resources", onClick: handleUploadClick },
    { title: "Generate Report", icon: BarChart3, color: "bg-indigo-500 hover:bg-indigo-600", description: "Analytics & reports", onClick: () => alert("Generate Report Clicked") },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const ButtonContent = (
            <>
              <action.icon className="h-5 w-5 mx-auto mb-2" />
              <span className="text-xs font-medium">{action.title}</span>
            </>
          );

          return action.link ? (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm flex flex-col items-center`}
              title={action.description}
            >
              {ButtonContent}
            </Link>
          ) : (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm`}
              title={action.description}
            >
              {ButtonContent}
            </button>
          );
        })}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" />
    </div>
  );
};


// Announcements Component
const Announcements = () => {
  const announcements = [
    { id: 1, title: "Holiday Notice - Holi Festival", content: "College will remain closed on March 13-14 for Holi celebrations.", date: "2025-03-08", author: "Principal Office" },
    { id: 2, title: "Library Timing Extended", content: "Library hours extended till 10 PM during exam season.", date: "2025-03-07", author: "Library Department" },
    { id: 3, title: "Workshop on AI/ML", content: "Free workshop on Artificial Intelligence and Machine Learning.", date: "2025-03-06", author: "CSE Department" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="text-sm font-medium text-gray-900 mb-1">{announcement.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{announcement.content}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{announcement.author}</span>
              <span>•</span>
              <span>{announcement.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { title: "Total Students", value: "2,847", icon: Users, change: "+12%", trend: "up", color: "blue" },
    { title: "Active Courses", value: "156", icon: BookOpen, change: "+3%", trend: "up", color: "green" },
    { title: "Faculty Members", value: "89", icon: GraduationCap, change: "+1%", trend: "up", color: "purple" },
    { title: "Active Exams", value: "12", icon: Award, change: "+25%", trend: "up", color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">LMS Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, here's what's happening at your college</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Semester</p>
              <p className="font-semibold text-gray-900">Spring 2025</p>
            </div>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => <StatsCard key={index} {...stat} />)}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Recent Activity + Announcements */}
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
            <Announcements />
          </div>

          {/* Right side: Events + Quick Actions */}
          <div className="space-y-6">
            <UpcomingEvents />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
