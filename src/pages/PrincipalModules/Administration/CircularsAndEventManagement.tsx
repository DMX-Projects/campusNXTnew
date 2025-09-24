import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Calendar, 
  Users, 
  Send, 
  Upload, 
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  ChevronDown,
  Building,
  DollarSign,
  MapPin,
  User
} from 'lucide-react';

const CircularsAndEventManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('circulars');
  const [showCreateCircular, setShowCreateCircular] = useState(false);
  const [showEditCircular, setShowEditCircular] = useState(null);
  const [showCircularDetails, setShowCircularDetails] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState([]);
  const [circularContent, setCircularContent] = useState('');
  const [circularTitle, setCircularTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(null);
  const [showRejectConfirm, setShowRejectConfirm] = useState(null);
  const [showRequestInfo, setShowRequestInfo] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    status: '',
    audience: '',
    dateRange: '',
    department: '',
    priority: ''
  });
  
  // Refs for click outside detection
  const filterRef = useRef(null);
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Common departments array with the specific ones you requested
  const commonDepartments = [
    'Computer Science & Engineering',
    'Mechanical Engineering', 
    'Electrical & Electronics Engineering',
    'Electronics & Communication Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Artificial Intelligence & Machine Learning',

  ];

  // Mock data for circulars
  const [circulars, setCirculars] = useState([
    {
      id: 1,
      title: "Semester End Examination Schedule",
      content: "Please note the examination schedule for the upcoming semester end exams. All students are required to check their examination hall tickets and ensure they have the necessary documents for the examination. The examination will be conducted from October 15th to October 30th, 2025. Students should report to their respective examination halls 30 minutes before the scheduled time.",
      date: "2025-09-18",
      author: "Principal Office",
      audience: ["All Students", "Faculty"],
      status: "Published",
      views: 1245
    },
    {
      id: 2,
      title: "New Library Operating Hours",
      content: "Effective from next week, the library will have extended hours to accommodate students' study needs during the examination period. The new operating hours will be from 7:00 AM to 11:00 PM on weekdays and 8:00 AM to 10:00 PM on weekends. All students are encouraged to make use of these extended hours for their preparation.",
      date: "2025-09-15",
      author: "Principal Office",
      audience: ["All Students", "All Staff"],
      status: "Published",
      views: 856
    },
    {
      id: 3,
      title: "Faculty Development Program",
      content: "We are pleased to announce a comprehensive faculty development program focusing on modern teaching methodologies and technology integration in education. The program will span over three days and will include workshops on digital pedagogy, assessment strategies, and student engagement techniques.",
      date: "2025-09-12",
      author: "HR Department",
      audience: ["Faculty", "Administrative Staff"],
      status: "Draft",
      views: 0
    }
  ]);

  // Mock data for event proposals
  const [eventProposals, setEventProposals] = useState([
    {
      id: 1,
      title: "Annual Tech Symposium 2025",
      department: "Computer Science & Engineering",
      requestedBy: "Dr. Sarah Johnson",
      date: "2025-10-15",
      time: "9:00 AM - 5:00 PM",
      venue: "Main Auditorium",
      expectedAttendees: 500,
      budget: 25000,
      description: "A comprehensive technology symposium featuring industry experts and student presentations on cutting-edge technologies including AI, blockchain, and cybersecurity.",
      resources: ["Audio/Visual Equipment", "Catering Services", "Security", "Parking"],
      status: "Pending Review",
      submittedDate: "2025-09-10",
      priority: "High"
    },
    
   
    {
      id: 4,
      title: "Industrial Visit to Manufacturing Plant",
      department: "Mechanical Engineering",
      requestedBy: "Prof. David Wilson",
      date: "2025-10-05",
      time: "8:00 AM - 6:00 PM",
      venue: "ABC Manufacturing Ltd.",
      expectedAttendees: 120,
      budget: 8000,
      description: "Educational visit to manufacturing plant for mechanical engineering students to understand industrial processes and modern manufacturing techniques.",
      resources: ["Transportation", "Lunch", "Safety Equipment", "Guide"],
      status: "Pending Review",
      submittedDate: "2025-09-11",
      priority: "Medium"
    },
    {
      id: 5,
      title: "Electronics Workshop",
      department: "Electronics & Communication Engineering",
      requestedBy: "Dr. Priya Sharma",
      date: "2025-10-12",
      time: "10:00 AM - 4:00 PM",
      venue: "ECE Lab Complex",
      expectedAttendees: 80,
      budget: 5000,
      description: "Hands-on workshop on advanced electronics concepts including IoT, embedded systems, and circuit design for final year students.",
      resources: ["Lab Equipment", "Components", "Laptops", "Refreshments"],
      status: "Approved",
      submittedDate: "2025-09-09",
      priority: "High"
    }
  ]);

  const audienceOptions = [
    "All Students",
    "All Staff",
    "Faculty",
    "Administrative Staff",
    "Department Heads",
    "First Year Students",
    "Second Year Students",
    "Third Year Students",
    "Final Year Students",
    "Research Scholars",
    "PhD Students",
    "Parents",
    "Alumni",
    "Industry Partners",
    "Visitors"
  ];

  // Get all departments for event filters - now includes common departments
  const getAllDepartments = () => {
    const eventDepts = eventProposals.map(event => event.department);
    const currentDataDepts = [...eventDepts];
    
    // Combine common departments with departments from current data
    const allDepts = [...new Set([...commonDepartments, ...currentDataDepts])];
    return allDepts.sort();
  };

  // Use the new function instead of departmentOptions
  const departmentOptions = getAllDepartments();

  const handleAudienceChange = (audience) => {
    setSelectedAudience(prev => 
      prev.includes(audience) 
        ? prev.filter(item => item !== audience)
        : [...prev, audience]
    );
  };

  // Filter data based on current filters and search term
  const getFilteredCirculars = () => {
    return circulars.filter(circular => {
      const matchesSearch = searchTerm === '' || 
        circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circular.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        circular.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filters.status === '' || circular.status === filters.status;
      
      const matchesAudience = filters.audience === '' || 
        circular.audience.includes(filters.audience);

      const matchesDate = filters.dateRange === '' || checkDateRange(circular.date, filters.dateRange);

      return matchesSearch && matchesStatus && matchesAudience && matchesDate;
    });
  };

  const getFilteredEvents = () => {
    return eventProposals.filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filters.status === '' || event.status === filters.status;
      const matchesDepartment = filters.department === '' || event.department === filters.department;
      const matchesPriority = filters.priority === '' || event.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
    });
  };

  // Helper function to check date range
  const checkDateRange = (dateStr, range) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    switch(range) {
      case 'today':
        return date.toDateString() === today.toDateString();
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo && date <= today;
      case 'month':
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return date >= monthAgo && date <= today;
      default:
        return true;
    }
  };

  // Count active filters
  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== '').length;
  };

  // Get active filter labels for display
  const getActiveFilterLabels = () => {
    const labels = [];
    if (filters.status) labels.push(`Status: ${filters.status}`);
    if (filters.audience) labels.push(`Audience: ${filters.audience}`);
    if (filters.dateRange) labels.push(`Date: ${filters.dateRange}`);
    if (filters.department) labels.push(`Department: ${filters.department}`);
    if (filters.priority) labels.push(`Priority: ${filters.priority}`);
    return labels;
  };

  // Filter functions
  const applyFilters = () => {
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      audience: '',
      dateRange: '',
      department: '',
      priority: ''
    });
  };

  // CRUD Operations
  const handleDeleteCircular = (id) => {
    setCirculars(circulars.filter(circular => circular.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleEditCircular = (circular) => {
    setShowEditCircular(circular);
    setCircularTitle(circular.title);
    setCircularContent(circular.content);
    setSelectedAudience(circular.audience);
  };

  const handleSaveEdit = () => {
    setCirculars(circulars.map(circular => 
      circular.id === showEditCircular.id 
        ? { 
            ...circular, 
            title: circularTitle, 
            content: circularContent, 
            audience: selectedAudience 
          }
        : circular
    ));
    setShowEditCircular(null);
    resetForm();
  };

  const handleApproveEvent = (id) => {
    setEventProposals(eventProposals.map(event => 
      event.id === id ? { ...event, status: 'Approved' } : event
    ));
    setShowApprovalConfirm(null);
    setShowEventDetails(null);
  };

  const handleRejectEvent = (id) => {
    setEventProposals(eventProposals.map(event => 
      event.id === id ? { ...event, status: 'Rejected' } : event
    ));
    setShowRejectConfirm(null);
    setShowEventDetails(null);
  };

  const handleRequestInfo = (id) => {
    setEventProposals(eventProposals.map(event => 
      event.id === id ? { ...event, status: 'Needs Information' } : event
    ));
    setShowRequestInfo(null);
    setShowEventDetails(null);
  };

  const resetForm = () => {
    setCircularTitle('');
    setCircularContent('');
    setSelectedAudience([]);
  };

  const handleCreateCircular = () => {
    const newCircular = {
      id: Date.now(),
      title: circularTitle,
      content: circularContent,
      date: new Date().toISOString().split('T')[0],
      author: "Current User",
      audience: selectedAudience,
      status: "Published",
      views: 0
    };
    setCirculars([newCircular, ...circulars]);
    setShowCreateCircular(false);
    resetForm();
  };

  // Use filtered data
  const displayedCirculars = getFilteredCirculars();
  const displayedEvents = getFilteredEvents();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Needs Information': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('circulars')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'circulars'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Circulars</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Events</span>
            </button>
          </div>
          {activeTab === 'circulars' && (
            <button
              onClick={() => setShowCreateCircular(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-sm text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create New Circular</span>
              <span className="sm:hidden">New</span>
            </button>
          )}
        </div>

        {/* Circulars Tab */}
        {activeTab === 'circulars' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search circulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 text-sm sm:text-base"
                />
              </div>
              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                      {getActiveFilterCount()}
                    </span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Filter Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-4 space-y-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
                      
                      {/* Status Filter */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                        <select 
                          value={filters.status}
                          onChange={(e) => setFilters({...filters, status: e.target.value})}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white text-sm"
                        >
                          <option value="">All Statuses</option>
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                      
                      {/* Audience Filter */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Audience</label>
                        <select 
                          value={filters.audience}
                          onChange={(e) => setFilters({...filters, audience: e.target.value})}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white text-sm"
                        >
                          <option value="">All Audiences</option>
                          {audienceOptions.map(audience => (
                            <option key={audience} value={audience}>{audience}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Date Range Filter */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date Range</label>
                        <select 
                          value={filters.dateRange}
                          onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-slate-900 dark:text-white text-sm"
                        >
                          <option value="">All Dates</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                        </select>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <button 
                          onClick={applyFilters}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Apply
                        </button>
                        <button 
                          onClick={clearFilters}
                          className="flex-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Active filters:</span>
                {getActiveFilterLabels().map((label, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    {label}
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing {displayedCirculars.length} of {circulars.length} circulars
            </div>

            {/* Circulars List */}
            <div className="grid gap-4 sm:gap-6">
              {displayedCirculars.length > 0 ? (
                displayedCirculars.map((circular) => (
                  <div key={circular.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 pr-0 sm:pr-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2 sm:mb-0">
                              {circular.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium self-start ${getStatusColor(circular.status)}`}>
                              {circular.status}
                            </span>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 text-sm sm:text-base">
                            {circular.content}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{circular.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{circular.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{circular.views} views</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {circular.audience.map((aud, index) => (
                              <span key={index} className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                {aud}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-row sm:space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <button 
                          onClick={() => setShowCircularDetails(circular)}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => handleEditCircular(circular)}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(circular.id)}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No circulars found</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {getActiveFilterCount() > 0 || searchTerm ? 'Try adjusting your search or filters.' : 'No circulars available.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search event proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Needs Information">Needs Information</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select 
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">All Departments</option>
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select 
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display for Events */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Active filters:</span>
                {getActiveFilterLabels().map((label, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                    {label}
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing {displayedEvents.length} of {eventProposals.length} events
            </div>

            {/* Event Proposals Grid */}
            <div className="grid gap-4 sm:gap-6">
              {displayedEvents.length > 0 ? (
                displayedEvents.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 pr-0 sm:pr-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-1">
                                {event.title}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {event.department} • Requested by {event.requestedBy}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                              <span className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`}></span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{event.venue}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                              <Users className="w-4 h-4 flex-shrink-0" />
                              <span>{event.expectedAttendees} attendees</span>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                            {event.description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
                            <div className="flex items-center space-x-1 text-green-600">
                              <DollarSign className="w-4 h-4" />
                              <span>Budget: ${event.budget.toLocaleString()}</span>
                            </div>
                            <div className="text-slate-500 dark:text-slate-400">
                              Submitted: {event.submittedDate}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-row sm:space-x-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button 
                          onClick={() => setShowEventDetails(event)}
                          className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Details</span>
                        </button>
                        {event.status === 'Pending Review' && (
                          <>
                            <button 
                              onClick={() => setShowApprovalConfirm(event.id)}
                              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-sm"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button 
                              onClick={() => setShowRejectConfirm(event.id)}
                              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button 
                              onClick={() => setShowRequestInfo(event.id)}
                              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Request Info</span>
                              <span className="sm:hidden">Info</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No events found</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {getActiveFilterCount() > 0 || searchTerm ? 'Try adjusting your search or filters.' : 'No events available.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Circular Details Modal */}
      {showCircularDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Circular Details</h2>
                <button 
                  onClick={() => setShowCircularDetails(null)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {showCircularDetails.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(showCircularDetails.status)}`}>
                  {showCircularDetails.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Circular Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Author:</strong> {showCircularDetails.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Published:</strong> {showCircularDetails.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Views:</strong> {showCircularDetails.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Target Audience</h4>
                    <div className="flex flex-wrap gap-2">
                      {showCircularDetails.audience.map((aud, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Content</h4>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {showCircularDetails.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button 
                onClick={() => setShowCircularDetails(null)}
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Circular Modal */}
      {showCreateCircular && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Create New Circular</h2>
                <button 
                  onClick={() => {
                    setShowCreateCircular(false);
                    resetForm();
                  }}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Circular Title
                </label>
                <input
                  type="text"
                  value={circularTitle}
                  onChange={(e) => setCircularTitle(e.target.value)}
                  placeholder="Enter circular title..."
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Content
                </label>
                <textarea
                  value={circularContent}
                  onChange={(e) => setCircularContent(e.target.value)}
                  placeholder="Write your circular content here..."
                  rows={8}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 resize-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Target Audience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {audienceOptions.map((audience) => (
                    <label key={audience} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAudience.includes(audience)}
                        onChange={() => handleAudienceChange(audience)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{audience}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => {
                  setShowCreateCircular(false);
                  resetForm();
                }}
                className="px-4 sm:px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateCircular}
                disabled={!circularTitle || !circularContent || selectedAudience.length === 0}
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" />
                <span>Publish Circular</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Circular Modal */}
      {showEditCircular && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Edit Circular</h2>
                <button 
                  onClick={() => {
                    setShowEditCircular(null);
                    resetForm();
                  }}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Circular Title
                </label>
                <input
                  type="text"
                  value={circularTitle}
                  onChange={(e) => setCircularTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Content
                </label>
                <textarea
                  value={circularContent}
                  onChange={(e) => setCircularContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white resize-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Target Audience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {audienceOptions.map((audience) => (
                    <label key={audience} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAudience.includes(audience)}
                        onChange={() => handleAudienceChange(audience)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{audience}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => {
                  setShowEditCircular(null);
                  resetForm();
                }}
                className="px-4 sm:px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Delete Circular</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to delete this circular? This will permanently remove it from the system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteCircular(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Event Details</h2>
                <button 
                  onClick={() => setShowEventDetails(null)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {showEventDetails.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  {showEventDetails.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Event Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Date:</strong> {showEventDetails.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Time:</strong> {showEventDetails.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Venue:</strong> {showEventDetails.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Expected Attendees:</strong> {showEventDetails.expectedAttendees}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span><strong>Budget:</strong> ${showEventDetails.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Request Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Department:</strong> {showEventDetails.department}</div>
                      <div><strong>Requested by:</strong> {showEventDetails.requestedBy}</div>
                      <div><strong>Submitted:</strong> {showEventDetails.submittedDate}</div>
                      <div><strong>Priority:</strong> <span className={getPriorityColor(showEventDetails.priority)}>{showEventDetails.priority}</span></div>
                      <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(showEventDetails.status)}`}>{showEventDetails.status}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Resources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {showEventDetails.resources.map((resource, index) => (
                    <div key={index} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                      {resource}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Schedule Conflict Check</h4>
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 dark:text-green-300 font-medium">No scheduling conflicts detected</span>
                  </div>
                  <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                    {showEventDetails.venue} is available on {showEventDetails.date} at {showEventDetails.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700">
              {showEventDetails.status === 'Pending Review' && (
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button 
                    onClick={() => setShowRequestInfo(showEventDetails.id)}
                    className="px-4 sm:px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                  >
                    Request More Info
                  </button>
                  <button 
                    onClick={() => setShowRejectConfirm(showEventDetails.id)}
                    className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button 
                    onClick={() => setShowApprovalConfirm(showEventDetails.id)}
                    className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Event</span>
                  </button>
                </div>
              )}
              
              {showEventDetails.status !== 'Pending Review' && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowEventDetails(null)}
                    className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {showApprovalConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Approve Event</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Confirm event approval</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to approve this event proposal? This will notify the requester and schedule the event.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setShowApprovalConfirm(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleApproveEvent(showApprovalConfirm)}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Reject Event</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Confirm event rejection</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to reject this event proposal? This will notify the requester.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setShowRejectConfirm(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleRejectEvent(showRejectConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Info Modal */}
      {showRequestInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Request More Information</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Ask for additional details</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                This will change the status to "Needs Information" and notify the requester to provide additional details.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setShowRequestInfo(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleRequestInfo(showRequestInfo)}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  Request Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularsAndEventManagement;
