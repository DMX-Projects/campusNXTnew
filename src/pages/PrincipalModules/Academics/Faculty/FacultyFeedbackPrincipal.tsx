import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface FeedbackData {
  id: string;
  facultyName: string;
  facultyId: string;
  department: string;
  program: string;
  course: string;
  year: string;
  semester: string;
  studentName: string;
  studentId: string;
  overallRating: number;
  teachingQuality: number;
  communication: number;
  subjectKnowledge: number;
  punctuality: number;
  helpfulness: number;
  comments: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'archived';
}

interface FilterState {
  department: string;
  program: string;
  course: string;
  year: string;
  semester: string;
  status: string;
  rating: string;
}

const FacultyFeedbackPrincipal: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [filters, setFilters] = useState<FilterState>({
    department: '',
    program: '',
    course: '',
    year: '',
    semester: '',
    status: '',
    rating: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const itemsPerPage = 10;

  // Sample data - replace with API call
  const [feedbackData] = useState<FeedbackData[]>([
    {
      id: '1',
      facultyName: 'Dr. John Smith',
      facultyId: 'FAC001',
      department: 'Computer Science',
      program: 'B.Tech',
      course: 'Data Structures',
      year: '2nd',
      semester: '3rd',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      overallRating: 4.5,
      teachingQuality: 4,
      communication: 5,
      subjectKnowledge: 5,
      punctuality: 4,
      helpfulness: 4,
      comments: 'Excellent teacher with great subject knowledge. Very helpful during doubt sessions.',
      submittedDate: '2025-09-25',
      status: 'pending'
    },
    {
      id: '2',
      facultyName: 'Prof. Sarah Wilson',
      facultyId: 'FAC002',
      department: 'Mathematics',
      program: 'B.Sc',
      course: 'Calculus',
      year: '1st',
      semester: '2nd',
      studentName: 'Bob Brown',
      studentId: 'STU002',
      overallRating: 3.8,
      teachingQuality: 4,
      communication: 3,
      subjectKnowledge: 4,
      punctuality: 4,
      helpfulness: 4,
      comments: 'Good teacher but could improve communication skills.',
      submittedDate: '2025-09-24',
      status: 'reviewed'
    },
    {
      id: '3',
      facultyName: 'Dr. Michael Chen',
      facultyId: 'FAC003',
      department: 'Physics',
      program: 'B.Sc',
      course: 'Quantum Physics',
      year: '3rd',
      semester: '5th',
      studentName: 'Emma Davis',
      studentId: 'STU003',
      overallRating: 4.8,
      teachingQuality: 5,
      communication: 5,
      subjectKnowledge: 5,
      punctuality: 4,
      helpfulness: 5,
      comments: 'Outstanding professor! Makes complex topics easy to understand.',
      submittedDate: '2025-09-23',
      status: 'pending'
    },
    {
      id: '4',
      facultyName: 'Prof. Lisa Martinez',
      facultyId: 'FAC004',
      department: 'Chemistry',
      program: 'B.Tech',
      course: 'Organic Chemistry',
      year: '2nd',
      semester: '4th',
      studentName: 'James Wilson',
      studentId: 'STU004',
      overallRating: 2.5,
      teachingQuality: 3,
      communication: 2,
      subjectKnowledge: 4,
      punctuality: 2,
      helpfulness: 2,
      comments: 'Often late to classes and not very approachable for doubts.',
      submittedDate: '2025-09-22',
      status: 'archived'
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      program: '',
      course: '',
      year: '',
      semester: '',
      status: '',
      rating: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleViewDetails = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setShowDetailModal(true);
  };

  const handleStatusUpdate = (feedbackId: string, newStatus: 'pending' | 'reviewed' | 'archived') => {
    console.log(`Updating feedback ${feedbackId} to ${newStatus}`);
    showToast(`Feedback status updated to ${newStatus}`);
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300 ease-in-out';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const filteredData = feedbackData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || item.department === filters.department) &&
      (filters.program === '' || item.program === filters.program) &&
      (filters.course === '' || item.course === filters.course) &&
      (filters.year === '' || item.year === filters.year) &&
      (filters.semester === '' || item.semester === filters.semester) &&
      (filters.status === '' || item.status === filters.status) &&
      (filters.rating === '' || 
        (filters.rating === '4+' && item.overallRating >= 4) ||
        (filters.rating === '3-4' && item.overallRating >= 3 && item.overallRating < 4) ||
        (filters.rating === '3-' && item.overallRating < 3));

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
    return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'reviewed': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Faculty Feedback Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage student feedback for faculty members
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by faculty, student, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 items-end">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
          </select>

          <select
            value={filters.program}
            onChange={(e) => handleFilterChange('program', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Programs</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.Sc">M.Sc</option>
            <option value="PhD">PhD</option>
          </select>

          <select
            value={filters.course}
            onChange={(e) => handleFilterChange('course', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Courses</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Calculus">Calculus</option>
            <option value="Quantum Physics">Quantum Physics</option>
            <option value="Organic Chemistry">Organic Chemistry</option>
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Years</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>

          <select
            value={filters.semester}
            onChange={(e) => handleFilterChange('semester', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Semesters</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
            <option value="6th">6th Semester</option>
            <option value="7th">7th Semester</option>
            <option value="8th">8th Semester</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="">All Ratings</option>
            <option value="4+">4+ Stars</option>
            <option value="3-4">3-4 Stars</option>
            <option value="3-">Below 3 Stars</option>
          </select>

          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-5 text-gray-600 dark:text-gray-400">
        <span className="text-sm">
          Showing {paginatedData.length} of {filteredData.length} feedback entries
        </span>
      </div>

      {/* Feedback Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-600 dark:bg-blue-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Year/Semester
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Overall Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {feedback.facultyName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {feedback.facultyId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {feedback.studentName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {feedback.studentId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {feedback.year} Year / {feedback.semester} Sem
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRatingColor(feedback.overallRating)}`}>
                      ⭐ {feedback.overallRating}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(feedback.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => handleViewDetails(feedback)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Feedback Details
              </h2>
              <button
                className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-2xl font-bold p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Faculty Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Name:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.facultyName}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">ID:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.facultyId}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Department:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.department}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Course:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.course}</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Student Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Name:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.studentName}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">ID:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.studentId}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Program:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.program}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Year/Semester:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFeedback.year} Year / {selectedFeedback.semester} Semester</span></p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Ratings
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Overall:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.overallRating}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Teaching:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.teachingQuality}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Communication:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.communication}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Knowledge:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.subjectKnowledge}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Punctuality:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.punctuality}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Helpfulness:</span> <span className="text-gray-900 dark:text-gray-100">⭐ {selectedFeedback.helpfulness}</span></p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Comments
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 italic bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    "{selectedFeedback.comments}"
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Submission Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Date:</span> <span className="text-gray-900 dark:text-gray-100">{new Date(selectedFeedback.submittedDate).toLocaleDateString()}</span></p>
                    <p>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>{' '}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusColor(selectedFeedback.status)}`}>
                        {selectedFeedback.status.charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              {selectedFeedback.status === 'pending' && (
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    handleStatusUpdate(selectedFeedback.id, 'reviewed');
                    setShowDetailModal(false);
                  }}
                >
                  Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyFeedbackPrincipal;
