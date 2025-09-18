import React, { useState } from "react";
import { 
  Calendar, 
  Filter, 
  Search,
  X,
  ChevronDown,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CAT: React.FC = () => {
  const exams = [
    {
      id: 1,
      course: "Mathematics - II",
      subject: "Calculus",
      date: "2025-09-25",
      time: "10:00 AM",
      duration: "2 hours",
      description: "Continuous Assessment Test on advanced calculus covering limits, derivatives, and applications.",
      status: "Upcoming",
      examCell: "Engineering Department"
    },
    {
      id: 2,
      course: "Computer Science",
      subject: "Data Structures",
      date: "2025-10-01",
      time: "2:00 PM",
      duration: "1.5 hours",
      description: "Covers stacks, queues, linked lists, and trees.",
      status: "Upcoming",
      examCell: "CS Department"
    },
    {
      id: 3,
      course: "Physics",
      subject: "Mechanics",
      date: "2025-10-05",
      time: "9:00 AM",
      duration: "2 hours",
      description: "CAT on Newtonian mechanics and motion in two dimensions.",
      status: "Completed",
      examCell: "Science Department"
    },
    {
      id: 4,
      course: "Chemistry",
      subject: "Organic Chemistry",
      date: "2025-10-08",
      time: "11:00 AM",
      duration: "2 hours",
      description: "Assessment on organic reactions and mechanisms.",
      status: "Upcoming",
      examCell: "Science Department"
    },
    {
      id: 5,
      course: "Mathematics - I",
      subject: "Algebra",
      date: "2025-10-12",
      time: "3:00 PM",
      duration: "1.5 hours",
      description: "Linear algebra and matrix operations test.",
      status: "Completed",
      examCell: "Math Department"
    },
    {
      id: 6,
      course: "English Literature",
      subject: "Modern Poetry",
      date: "2025-10-15",
      time: "1:00 PM",
      duration: "2 hours",
      description: "Analysis of contemporary poetry and literary criticism.",
      status: "Upcoming",
      examCell: "Arts Department"
    },
    {
      id: 7,
      course: "Computer Science",
      subject: "Database Systems",
      date: "2025-10-20",
      time: "10:30 AM",
      duration: "2 hours",
      description: "SQL queries, normalization, and database design principles.",
      status: "Upcoming",
      examCell: "CS Department"
    }
  ];

  const [filters, setFilters] = useState({
    course: "All",
    subject: "All",
    status: "All",
    startDate: "",
    endDate: "",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8)); // September 2025

  const handleFilterInput = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      course: "All",
      subject: "All",
      status: "All",
      startDate: "",
      endDate: "",
      search: "",
    });
  };

  const courses = Array.from(new Set(exams.map((e) => e.course)));
  const subjects = Array.from(new Set(exams.map((e) => e.subject)));
  const statuses = Array.from(new Set(exams.map((e) => e.status)));

  const filteredExams = exams.filter((exam) => {
    return (
      (filters.course === "All" || exam.course === filters.course) &&
      (filters.subject === "All" || exam.subject === filters.subject) &&
      (filters.status === "All" || exam.status === filters.status) &&
      (filters.startDate === "" || exam.date >= filters.startDate) &&
      (filters.endDate === "" || exam.date <= filters.endDate) &&
      (filters.search === "" || 
        exam.course.toLowerCase().includes(filters.search.toLowerCase()) ||
        exam.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        exam.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    );
  });

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.course !== "All") count++;
    if (filters.subject !== "All") count++;
    if (filters.status !== "All") count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.search) count++;
    return count;
  };

  const getStatusIcon = (status: string) => {
    return status === "Completed" 
      ? <CheckCircle className="w-4 h-4 text-green-500" />
      : <AlertTriangle className="w-4 h-4 text-amber-500" />;
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getExamsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredExams.filter(exam => exam.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1)));
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-slate-200 dark:border-slate-700"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayExams = getExamsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <div key={day} className={`h-24 border border-slate-200 dark:border-slate-700 p-1 overflow-y-auto ${
          isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'
        }`}>
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayExams.map(exam => (
              <div
                key={exam.id}
                className={`text-xs p-1 rounded truncate cursor-pointer hover:scale-105 transition-transform ${
                  exam.status === 'Upcoming' 
                    ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' 
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}
                title={`${exam.course} - ${exam.subject} at ${exam.time}`}
              >
                <div className="font-medium">{exam.subject}</div>
                <div className="text-xs opacity-75">{exam.time}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Calendar Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{monthName}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {dayNames.map(dayName => (
              <div key={dayName} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2">
                {dayName}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-0 border border-slate-200 dark:border-slate-700">
            {days}
          </div>
        </div>
        
        {/* Legend */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-600">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-200 dark:bg-amber-800 rounded"></div>
              <span className="text-slate-600 dark:text-slate-400">Upcoming Exams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded"></div>
              <span className="text-slate-600 dark:text-slate-400">Completed Exams</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
                CAT Schedule (Created by Exam Cell)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                View all Continuous Assessment Tests scheduled by the Examination Cell
              </p>
            </div>
          </div>

          {/* View Toggle & Quick Stats */}
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-slate-800 dark:text-white">{filteredExams.length}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
              </div>
              <div className="text-center px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-amber-600">{filteredExams.filter(e => e.status === 'Upcoming').length}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Upcoming</div>
              </div>
              <div className="text-center px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-lg font-bold text-green-600">{filteredExams.filter(e => e.status === 'Completed').length}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden">
          {/* Filter Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-800 dark:text-white">Filters & Search</h3>
                {getActiveFiltersCount() > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    {getActiveFiltersCount()} active
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </button>
                )}
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className={`px-6 py-6 ${showFilters || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 'block' : 'hidden'} md:block`}>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterInput}
                  placeholder="Search exams by course, subject, or description..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all"
                />
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Course Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-4 h-4" />
                  Course
                </label>
                <select
                  name="course"
                  value={filters.course}
                  onChange={handleFilterInput}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="All">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-4 h-4" />
                  Subject
                </label>
                <select
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterInput}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="All">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4" />
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterInput}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white appearance-none cursor-pointer hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="All">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterInput}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterInput}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {viewMode === 'calendar' ? 'Calendar View' : 'List View'}
            </h2>
            <span className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
              {filteredExams.length} {filteredExams.length === 1 ? 'exam' : 'exams'}
            </span>
          </div>
        </div>

        {/* Main Content - Calendar or List View */}
        {viewMode === 'calendar' ? (
          renderCalendarView()
        ) : (
          /* Enhanced Exams Table */
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Course & Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Exam Cell
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredExams.length > 0 ? (
                    filteredExams.map((exam, index) => (
                      <tr
                        key={exam.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {exam.course}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {exam.subject}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-700 dark:text-slate-300 font-medium">
                                {new Date(exam.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{exam.time} ({exam.duration})</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {exam.description}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {exam.examCell}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                              exam.status === "Upcoming"
                                ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                            }`}
                          >
                            {getStatusIcon(exam.status)}
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Search className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                          <div>
                            <p className="font-medium mb-1">No exams found</p>
                            <p className="text-sm">Try adjusting your filters to see more results</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CAT;
