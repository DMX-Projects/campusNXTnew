

import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, MessageSquare, Download, Calendar, User, BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// TypeScript interfaces
interface Project {
  id: string;
  title: string;
  studentName: string;
  rollNo: string;
  course: string;
  semester: string;
  status: 'Completed' | 'In Progress' | 'Under Review' | 'Submitted';
  submissionDate: string;
  description: string;
  supervisor: string;
  grade?: string;
}

interface FilterState {
  course: string;
  semester: string;
  status: string;
  search: string;
}

// Sample data - replace with your actual data source
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Machine Learning Based Stock Price Prediction',
    studentName: 'John Doe',
    rollNo: 'CS2021001',
    course: 'Computer Science',
    semester: 'VIII',
    status: 'Completed',
    submissionDate: '2024-03-15',
    description: 'A comprehensive study on using LSTM networks for stock price prediction with real-time data analysis.',
    supervisor: 'Dr. Smith',
    grade: 'A+'
  },
  {
    id: '2',
    title: 'IoT Based Smart Home Automation System',
    studentName: 'Jane Smith',
    rollNo: 'ECE2021005',
    course: 'Electronics',
    semester: 'VI',
    status: 'In Progress',
    submissionDate: '2024-04-20',
    description: 'Development of an integrated IoT solution for home automation with mobile app interface.',
    supervisor: 'Dr. Johnson'
  },
  {
    id: '3',
    title: 'Blockchain Based Voting System',
    studentName: 'Mike Wilson',
    rollNo: 'CS2020015',
    course: 'Computer Science',
    semester: 'VIII',
    status: 'Under Review',
    submissionDate: '2024-03-28',
    description: 'A secure and transparent voting system using blockchain technology and smart contracts.',
    supervisor: 'Dr. Brown'
  },
  {
    id: '4',
    title: 'Renewable Energy Management System',
    studentName: 'Sarah Davis',
    rollNo: 'EE2021010',
    course: 'Electrical Engineering',
    semester: 'VII',
    status: 'Submitted',
    submissionDate: '2024-04-01',
    description: 'Smart grid integration system for renewable energy sources with optimization algorithms.',
    supervisor: 'Dr. Williams'
  },
  {
    id: '5',
    title: 'AI-Powered Medical Diagnosis Assistant',
    studentName: 'Alex Johnson',
    rollNo: 'CS2021025',
    course: 'Computer Science',
    semester: 'VIII',
    status: 'Completed',
    submissionDate: '2024-02-28',
    description: 'Deep learning model for medical image analysis and diagnosis assistance.',
    supervisor: 'Dr. Smith',
    grade: 'A'
  }
];

const FacultyStudentProjects: React.FC = () => {
  const [projects] = useState<Project[]>(sampleProjects);
  const [filters, setFilters] = useState<FilterState>({
    course: '',
    semester: '',
    status: '',
    search: ''
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Get unique values for filter options
  const courses = useMemo(() => [...new Set(projects.map(p => p.course))], [projects]);
  const semesters = useMemo(() => [...new Set(projects.map(p => p.semester))], [projects]);
  const statuses = useMemo(() => [...new Set(projects.map(p => p.status))], [projects]);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCourse = !filters.course || project.course === filters.course;
      const matchesSemester = !filters.semester || project.semester === filters.semester;
      const matchesStatus = !filters.status || project.status === filters.status;
      const matchesSearch = !filters.search || 
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.rollNo.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesCourse && matchesSemester && matchesStatus && matchesSearch;
    });
  }, [projects, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ course: '', semester: '', status: '', search: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Under Review':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'Submitted':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Submitted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and review all student projects under faculty guidance
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, student name, or roll number..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Course Filter */}
            <select
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>

            {/* Semester Filter */}
            <select
              value={filters.semester}
              onChange={(e) => handleFilterChange('semester', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>Semester {semester}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                    {project.title}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {project.status}
                  </div>
                </div>

                {/* Student Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.studentName}
                    </span>
                    <span className="text-sm">({project.rollNo})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{project.course} - Semester {project.semester}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Submitted: {new Date(project.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Grade (if available) */}
                {project.grade && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Grade: {project.grade}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                  
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}

        {/* Modal for Project Details */}
        {showModal && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Student Name
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedProject.studentName}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Roll Number
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedProject.rollNo}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Course
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedProject.course}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Semester
                      </label>
                      <p className="text-gray-900 dark:text-white">Semester {selectedProject.semester}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Supervisor
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedProject.supervisor}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {getStatusIcon(selectedProject.status)}
                        {selectedProject.status}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.grade && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grade
                      </label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {selectedProject.grade}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                    Provide Feedback
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors">
                    Download Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyStudentProjects;