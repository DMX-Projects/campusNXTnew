import React, { useState } from 'react';
import { 
  Bell, 
  BellOff, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Mail, 
  MailOpen,
  Archive,
  Trash2,
  Filter,
  Search,
  X,
  ChevronRight,
  Pin,
  Download,
  ExternalLink,
  Sparkles,
  Star,
  Zap,
  Shield,
  BookOpen,
  DollarSign,
  Home,
  Settings
} from 'lucide-react';

const Notifications = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sample notifications data with enhanced styling info
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🎓 Orientation Schedule Released",
      message: "Your orientation is scheduled for April 1st, 2024 at 9:00 AM in the Main Auditorium. Please arrive 30 minutes early and bring your admission letter. The session will cover campus tour, academic guidelines, and student services introduction. Lunch will be provided.",
      sender: "Admission Office",
      type: "orientation",
      priority: "high",
      timestamp: "2024-03-20T10:30:00Z",
      isRead: false,
      isPinned: true,
      hasAttachment: true,
      attachmentName: "Orientation_Schedule.pdf",
      category: "Academic",
      gradient: "from-purple-500 to-pink-500",
      icon: BookOpen
    },
    {
      id: 2,
      title: "📚 Class Commencement Date Confirmed",
      message: "Classes for the Fall 2024 semester will commence on April 8th, 2024. Your class schedule has been finalized and is available in the student portal. Please ensure you have completed all pre-enrollment requirements including fee payment and document submission.",
      sender: "Academic Office",
      type: "academic",
      priority: "high",
      timestamp: "2024-03-18T14:15:00Z",
      isRead: true,
      isPinned: false,
      hasAttachment: false,
      category: "Academic",
      gradient: "from-blue-500 to-cyan-500",
      icon: Calendar
    },
    {
      id: 3,
      title: "📋 Additional Documents Required",
      message: "We need additional documents from you to complete your enrollment process. Please upload your medical certificate and character certificate through the document upload portal by March 25th, 2024. Failure to submit these documents may delay your admission process.",
      sender: "Document Verification Team",
      type: "document",
      priority: "urgent",
      timestamp: "2024-03-17T09:20:00Z",
      isRead: false,
      isPinned: false,
      hasAttachment: false,
      category: "Documents",
      gradient: "from-red-500 to-orange-500",
      icon: AlertTriangle
    },
    {
      id: 4,
      title: "🏠 Hostel Room Allocation Update",
      message: "Your hostel room has been allocated. You have been assigned to Block A, Room 201. Check-in will be available from March 30th onwards. Please bring your hostel fee receipt and identity proof during check-in. Room amenities list is attached.",
      sender: "Hostel Management",
      type: "accommodation",
      priority: "medium",
      timestamp: "2024-03-16T11:45:00Z",
      isRead: true,
      isPinned: false,
      hasAttachment: true,
      attachmentName: "Room_Amenities_List.pdf",
      category: "Accommodation",
      gradient: "from-green-500 to-teal-500",
      icon: Home
    },
    {
      id: 5,
      title: "💳 Fee Payment Reminder",
      message: "This is a reminder that your admission fee payment of $500 is due by March 15th, 2024. Please complete the payment through the online portal to secure your enrollment. Late payment may result in additional charges.",
      sender: "Finance Office",
      type: "payment",
      priority: "urgent",
      timestamp: "2024-03-14T16:30:00Z",
      isRead: true,
      isPinned: false,
      hasAttachment: false,
      category: "Finance",
      gradient: "from-amber-500 to-orange-500",
      icon: DollarSign
    },
    {
      id: 6,
      title: "🎉 Welcome to College - Important Information",
      message: "Congratulations on your successful admission! This message contains important information about your next steps, including orientation details, required documents, and academic calendar. Please read carefully and keep this information handy throughout your admission process.",
      sender: "Dean of Admissions",
      type: "welcome",
      priority: "medium",
      timestamp: "2024-03-10T08:00:00Z",
      isRead: true,
      isPinned: false,
      hasAttachment: true,
      attachmentName: "Welcome_Package.pdf",
      category: "General",
      gradient: "from-indigo-500 to-purple-500",
      icon: Sparkles
    },
    {
      id: 7,
      title: "🆔 Student ID Card Collection",
      message: "Your student ID card is ready for collection. Please visit the Student Services Office between 9:00 AM - 5:00 PM on weekdays. Bring your admission receipt and a valid photo ID. The ID card is required for library access, exam attendance, and other campus facilities.",
      sender: "Student Services",
      type: "service",
      priority: "medium",
      timestamp: "2024-03-12T13:20:00Z",
      isRead: false,
      isPinned: false,
      hasAttachment: false,
      category: "Services",
      gradient: "from-teal-500 to-blue-500",
      icon: Settings
    },
    {
      id: 8,
      title: "📖 Library Orientation Session",
      message: "Join us for a comprehensive library orientation session on March 28th at 2:00 PM. Learn about our digital resources, borrowing policies, study spaces, and research assistance services. Registration is mandatory for all new students.",
      sender: "Library Services",
      type: "orientation",
      priority: "low",
      timestamp: "2024-03-08T10:15:00Z",
      isRead: true,
      isPinned: false,
      hasAttachment: false,
      category: "Academic",
      gradient: "from-emerald-500 to-green-500",
      icon: BookOpen
    }
  ]);

  // Rest of your utility functions remain the same...
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 dark:text-red-400 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 border-red-200 dark:border-red-800';
      case 'high':
        return 'text-orange-600 dark:text-orange-400 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border-blue-200 dark:border-blue-800';
      default:
        return 'text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/30 border-emerald-200 dark:border-emerald-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Zap className="h-4 w-4" />;
      case 'high':
        return <Bell className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const togglePin = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, isPinned: !notif.isPinned }
          : notif
      )
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const filteredNotifications = notifications
    .filter(notification => {
      const matchesFilter = selectedFilter === 'all' || 
                           (selectedFilter === 'unread' && !notification.isRead) ||
                           (selectedFilter === 'pinned' && notification.isPinned) ||
                           notification.category.toLowerCase() === selectedFilter;
      
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationItem = ({ notification, onClick }) => (
    <div
      className={`relative p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group ${
        !notification.isRead 
          ? 'bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20 border-l-4 border-l-blue-500 dark:border-l-blue-400' 
          : 'bg-white dark:bg-slate-800 border-l-4 border-l-slate-200 dark:border-l-slate-700'
      } ${selectedNotification?.id === notification.id ? 'ring-2 ring-blue-300 dark:ring-blue-600 shadow-lg' : ''} 
      rounded-r-xl border border-slate-200 dark:border-slate-700 mb-2 overflow-hidden`}
      onClick={() => {
        onClick(notification);
        if (!notification.isRead) {
          markAsRead(notification.id);
        }
      }}
    >
      {/* Gradient overlay for unread */}
      {!notification.isRead && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-blue-100/40 dark:from-transparent dark:via-blue-900/10 dark:to-blue-800/20 pointer-events-none" />
      )}
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
            {/* Icon */}
            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br ${notification.gradient} shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              <notification.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                {notification.isPinned && (
                  <div className="p-0.5 sm:p-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse">
                    <Pin className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                  </div>
                )}
                <h3 className={`text-xs sm:text-sm font-semibold truncate ${
                  !notification.isRead 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0 animate-pulse" />
                )}
              </div>
              
              <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
                <div className="p-0.5 sm:p-1 bg-slate-100 dark:bg-slate-700 rounded text-xs">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {notification.sender}
                  </span>
                </div>
                <span className={`inline-flex items-center px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                  {getPriorityIcon(notification.priority)}
                  <span className="ml-0.5 sm:ml-1 capitalize text-xs">{notification.priority}</span>
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {notification.hasAttachment && (
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      <Download className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                      <span className="hidden sm:inline">Attachment</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <span className="capitalize text-xs">{notification.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
                  <span className="text-xs">{formatTimestamp(notification.timestamp)}</span>
                  <div className="p-0.5 sm:p-1 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationDetail = ({ notification, onClose }) => (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(120,119,198,0.1),_transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => togglePin(notification.id)}
              className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                notification.isPinned 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Pin className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            <button
              onClick={() => deleteNotification(notification.id)}
              className="p-1.5 sm:p-2 hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/20 dark:hover:to-red-800/30 text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${notification.gradient} shadow-lg`}>
            <notification.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
              {notification.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 py-1 rounded-full">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{notification.sender}</span>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 py-1 rounded-full">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">{new Date(notification.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-2 mb-4 sm:mb-6">
              <span className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border ${getPriorityColor(notification.priority)} shadow-sm`}>
                {getPriorityIcon(notification.priority)}
                <span className="ml-1 sm:ml-2 capitalize">{notification.priority} Priority</span>
              </span>
              
              <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 shadow-sm">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {notification.category}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-slate-200/50 dark:border-slate-600/50">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {notification.message}
            </p>
          </div>
        </div>

      {/* Mobile-Optimized Attachment */}
{notification.hasAttachment && (
  <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-3 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm">
    
    {/* Mobile Layout - Stacked Design */}
    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      
      {/* File Info Section - Mobile Priority */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2.5 rounded-xl shadow-lg flex-shrink-0">
          <Download className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {notification.attachmentName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            PDF Document • Ready for download
          </p>
        </div>
      </div>
      
      {/* Mobile Download Button - Full Width on Small Screens */}
      <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] touch-manipulation">
        <Download className="h-4 w-4" />
        <span>Download</span>
      </button>
    </div>
  </div>
)}


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base">
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Take Action</span>
          </button>
          
          <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-200 hover:scale-105 text-sm sm:text-base">
            <Archive className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Archive</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg--to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {/* Quick Stats */}
        <div className="mb-4 sm:mb-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl border border-white/20 dark:border-slate-700/50 p-3 sm:p-6 shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl">
                <Mail className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {notifications.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Total</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl border border-white/20 dark:border-slate-700/50 p-3 sm:p-6 shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl">
                <MailOpen className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {notifications.filter(n => n.isRead).length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Read</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl border border-white/20 dark:border-slate-700/50 p-3 sm:p-6 shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg sm:rounded-xl">
                <Bell className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {unreadCount}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Unread</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl border border-white/20 dark:border-slate-700/50 p-3 sm:p-6 shadow-xl backdrop-blur-sm hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl">
                <Pin className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {notifications.filter(n => n.isPinned).length}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Pinned</p>
              </div>
            </div>
          </div>
        </div>
      
        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-3 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-0 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/80 dark:bg-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 shadow-inner backdrop-blur-sm transition-all duration-200 focus:scale-[1.02] text-sm sm:text-base"
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg sm:rounded-xl hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-400" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Filter</span>
            </button>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium">Mark All Read</span>
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {['all', 'unread', 'pinned', 'academic', 'documents', 'finance', 'accommodation', 'services', 'general'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      selectedFilter === filter
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-white/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 shadow-sm'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Updated Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
          {/* Notifications List - Increased from lg:col-span-2 to lg:col-span-2 */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
              <div className="p-3 sm:p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Messages
                  </h2>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium rounded-full">
                      {filteredNotifications.length} total
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-700 dark:text-red-300 text-xs sm:text-sm font-medium rounded-full animate-pulse">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-2 sm:p-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-1">
                    {filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={setSelectedNotification}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 sm:p-12 text-center">
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl inline-block mb-3 sm:mb-4">
                      <BellOff className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 mx-auto" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2">
                      No notifications found
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Detail - Increased from lg:col-span-1 to lg:col-span-3 for wider display */}
          <div className="lg:col-span-3">
            {selectedNotification ? (
              <NotificationDetail
                notification={selectedNotification}
                onClose={() => setSelectedNotification(null)}
              />
            ) : (
              <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 sm:p-12 min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 sm:p-8 rounded-2xl inline-block mb-6 sm:mb-8">
                    <Mail className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    Select a notification
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                    Choose a notification from the list to read the full message and take action.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
