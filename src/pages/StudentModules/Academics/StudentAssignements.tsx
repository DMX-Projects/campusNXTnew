import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Upload,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  BookOpen,
  User,
  Star,
  Play,
  Award
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  faculty: string;
  assignedDate: string;
  dueDate: string;
  totalMarks: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submittedDate?: string;
  obtainedMarks?: number;
  feedback?: string;
  attachments?: string[];
  submissionFile?: string;
  priority: 'low' | 'medium' | 'high';
  type: 'individual' | 'group';
}

const StudentAssignments: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [activeTab, setActiveTab] = useState<'assigned' | 'submitted'>('assigned');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Sample assignments data
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Data Structures Implementation',
      description: 'Implement various data structures including linked lists, stacks, and queues using C++',
      subject: 'Data Structures',
      faculty: 'Dr. Rajesh Kumar',
      assignedDate: '2025-09-20',
      dueDate: '2025-10-05',
      totalMarks: 100,
      status: 'pending',
      priority: 'high',
      type: 'individual',
      attachments: ['assignment_guidelines.pdf', 'sample_code.cpp']
    },
    {
      id: '2',
      title: 'Database Design Project',
      description: 'Design and implement a complete database system for library management',
      subject: 'Database Management',
      faculty: 'Prof. Priya Sharma',
      assignedDate: '2025-09-18',
      dueDate: '2025-10-10',
      totalMarks: 150,
      status: 'submitted',
      submittedDate: '2025-09-25',
      priority: 'medium',
      type: 'group',
      attachments: ['project_requirements.pdf'],
      submissionFile: 'library_db_design.zip'
    },
    {
      id: '3',
      title: 'Machine Learning Algorithm Analysis',
      description: 'Compare and analyze different machine learning algorithms for classification tasks',
      subject: 'Machine Learning',
      faculty: 'Dr. Arjun Reddy',
      assignedDate: '2025-09-15',
      dueDate: '2025-09-30',
      totalMarks: 80,
      status: 'graded',
      submittedDate: '2025-09-28',
      obtainedMarks: 72,
      feedback: 'Good analysis but needs more detailed comparison of algorithm performance',
      priority: 'medium',
      type: 'individual',
      attachments: ['ml_dataset.csv', 'requirements.pdf']
    },
    {
      id: '4',
      title: 'Web Development Portfolio',
      description: 'Create a responsive portfolio website using HTML, CSS, and JavaScript',
      subject: 'Web Technologies',
      faculty: 'Ms. Kavya Singh',
      assignedDate: '2025-09-10',
      dueDate: '2025-09-25',
      totalMarks: 120,
      status: 'overdue',
      priority: 'high',
      type: 'individual',
      attachments: ['design_mockup.pdf', 'style_guide.pdf']
    },
    {
      id: '5',
      title: 'Network Security Report',
      description: 'Research and write a comprehensive report on modern network security threats',
      subject: 'Network Security',
      faculty: 'Prof. Deepika Nair',
      assignedDate: '2025-09-22',
      dueDate: '2025-10-15',
      totalMarks: 100,
      status: 'pending',
      priority: 'low',
      type: 'individual',
      attachments: ['research_guidelines.pdf']
    },
    {
      id: '6',
      title: 'Software Engineering Case Study',
      description: 'Analyze a real-world software project and document the development lifecycle',
      subject: 'Software Engineering',
      faculty: 'Dr. Vikash Yadav',
      assignedDate: '2025-09-12',
      dueDate: '2025-10-08',
      totalMarks: 90,
      status: 'submitted',
      submittedDate: '2025-09-26',
      priority: 'medium',
      type: 'group',
      submissionFile: 'case_study_report.pdf'
    },
    {
      id: '7',
      title: 'Algorithm Optimization',
      description: 'Optimize sorting algorithms and analyze their time complexity',
      subject: 'Data Structures',
      faculty: 'Dr. Rajesh Kumar',
      assignedDate: '2025-09-14',
      dueDate: '2025-09-28',
      totalMarks: 95,
      status: 'graded',
      submittedDate: '2025-09-26',
      obtainedMarks: 88,
      feedback: 'Excellent optimization techniques demonstrated. Minor improvements needed in complexity analysis.',
      priority: 'medium',
      type: 'individual',
      submissionFile: 'algorithm_optimization.zip'
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

  // Separate assignments based on status for different tabs
  const assignedAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'overdue');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted' || a.status === 'graded');

  const getFilteredAssignments = () => {
    const baseAssignments = activeTab === 'assigned' ? assignedAssignments : submittedAssignments;
    
    return baseAssignments.filter(assignment => {
      const matchesSearch = searchTerm === '' || 
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || assignment.status === statusFilter;
      const matchesSubject = subjectFilter === '' || assignment.subject === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'graded': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <Star className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
  };

  const handleStartAssignment = (assignmentId: string) => {
    console.log('Starting assignment:', assignmentId);
    // Add your logic to start the assignment
  };

  // Summary stats based on active tab
  const getSummaryStats = () => {
    const currentAssignments = activeTab === 'assigned' ? assignedAssignments : submittedAssignments;
    
    if (activeTab === 'assigned') {
      return {
        total: currentAssignments.length,
        pending: currentAssignments.filter(a => a.status === 'pending').length,
        overdue: currentAssignments.filter(a => a.status === 'overdue').length,
        high: currentAssignments.filter(a => a.priority === 'high').length,
        medium: currentAssignments.filter(a => a.priority === 'medium').length,
        low: currentAssignments.filter(a => a.priority === 'low').length
      };
    } else {
      return {
        total: currentAssignments.length,
        submitted: currentAssignments.filter(a => a.status === 'submitted').length,
        graded: currentAssignments.filter(a => a.status === 'graded').length,
        avgGrade: currentAssignments.filter(a => a.obtainedMarks && a.totalMarks).reduce((acc, a) => acc + (a.obtainedMarks! / a.totalMarks * 100), 0) / currentAssignments.filter(a => a.obtainedMarks).length || 0,
        maxGrade: Math.max(...currentAssignments.filter(a => a.obtainedMarks).map(a => (a.obtainedMarks! / a.totalMarks * 100))),
        minGrade: Math.min(...currentAssignments.filter(a => a.obtainedMarks).map(a => (a.obtainedMarks! / a.totalMarks * 100)))
      };
    }
  };

  const summaryStats = getSummaryStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-500" />
            My Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage all your course assignments and submissions
          </p>
        </div>
    
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
        <button
          onClick={() => setActiveTab('assigned')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'assigned'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Assigned ({assignedAssignments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('submitted')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'submitted'
              ? 'bg-green-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Submitted ({submittedAssignments.length})</span>
        </button>
      </div>

      {/* Summary Cards */}
      {activeTab === 'assigned' ? (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{summaryStats.total}</p>
              </div>
              <FileText className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{summaryStats.pending}</p>
              </div>
              <Clock className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold">{summaryStats.overdue}</p>
              </div>
              <XCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">High Priority</p>
                <p className="text-2xl font-bold">{summaryStats.high}</p>
              </div>
              <AlertTriangle className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Medium Priority</p>
                <p className="text-2xl font-bold">{summaryStats.medium}</p>
              </div>
              <Clock className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Low Priority</p>
                <p className="text-2xl font-bold">{summaryStats.low}</p>
              </div>
              <CheckCircle className="w-6 h-6 opacity-80" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{summaryStats.total}</p>
              </div>
              <FileText className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Submitted</p>
                <p className="text-2xl font-bold">{summaryStats.submitted}</p>
              </div>
              <Upload className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Graded</p>
                <p className="text-2xl font-bold">{summaryStats.graded}</p>
              </div>
              <Star className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Grade</p>
                <p className="text-2xl font-bold">{summaryStats.avgGrade ? summaryStats.avgGrade.toFixed(0) : 0}%</p>
              </div>
              <Award className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Best Score</p>
                <p className="text-2xl font-bold">{summaryStats.maxGrade && isFinite(summaryStats.maxGrade) ? summaryStats.maxGrade.toFixed(0) : 0}%</p>
              </div>
              <Star className="w-6 h-6 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Min Score</p>
                <p className="text-2xl font-bold">{summaryStats.minGrade && isFinite(summaryStats.minGrade) ? summaryStats.minGrade.toFixed(0) : 0}%</p>
              </div>
              <AlertTriangle className="w-6 h-6 opacity-80" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            {activeTab === 'assigned' ? (
              <>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </>
            ) : (
              <>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </>
            )}
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Management">Database Management</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Network Security">Network Security</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setSubjectFilter('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredAssignments().map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {assignment.type.toUpperCase()}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(assignment.status)}
                    <span>{assignment.status.toUpperCase()}</span>
                  </div>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {assignment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {assignment.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{assignment.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{assignment.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN')}
                  </span>
                  {activeTab === 'assigned' && (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      getDaysRemaining(assignment.dueDate) < 0 ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                      getDaysRemaining(assignment.dueDate) <= 3 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {getDaysRemaining(assignment.dueDate) < 0 
                        ? `${Math.abs(getDaysRemaining(assignment.dueDate))} days overdue`
                        : `${getDaysRemaining(assignment.dueDate)} days left`}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Marks: {assignment.totalMarks}</span>
                  {assignment.obtainedMarks && activeTab === 'submitted' && (
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      Score: {assignment.obtainedMarks}/{assignment.totalMarks} ({((assignment.obtainedMarks/assignment.totalMarks)*100).toFixed(0)}%)
                    </span>
                  )}
                </div>
                {activeTab === 'submitted' && assignment.submittedDate && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Submitted: {new Date(assignment.submittedDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {activeTab === 'assigned' ? (
                  <>
                    <button
                      onClick={() => handleStartAssignment(assignment.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(assignment)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleViewDetails(assignment)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    {assignment.status === 'graded' && null}
                  </>
                )}
                {assignment.attachments && assignment.attachments.length > 0 && null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedAssignment.title}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Assignment Details</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Subject:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.subject}</p>
                    </div>
                    <div>
                      <span className="font-medium">Faculty:</span>
                      <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.faculty}</p>
                    </div>
                    <div>
                      <span className="font-medium">Assigned Date:</span>
                      <p className="text-gray-600 dark:text-gray-400">{new Date(selectedAssignment.assignedDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Due Date:</span>
                      <p className="text-gray-600 dark:text-gray-400">{new Date(selectedAssignment.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>

                  {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {selectedAssignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{file}</span>
                            <button className="ml-auto text-blue-500 hover:text-blue-600">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Status & Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedAssignment.status)}`}>
                          {selectedAssignment.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedAssignment.priority)}`}>
                          {selectedAssignment.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Marks:</span>
                        <span className="font-medium">{selectedAssignment.totalMarks}</span>
                      </div>
                      {selectedAssignment.obtainedMarks && (
                        <div className="flex justify-between">
                          <span>Obtained Marks:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {selectedAssignment.obtainedMarks} ({((selectedAssignment.obtainedMarks/selectedAssignment.totalMarks)*100).toFixed(0)}%)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedAssignment.feedback && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Faculty Feedback</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAssignment.feedback}</p>
                    </div>
                  )}

                  {selectedAssignment.submissionFile && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Your Submission</h4>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{selectedAssignment.submissionFile}</span>
                        <button className="text-green-600 hover:text-green-700">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      {selectedAssignment.submittedDate && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          Submitted on: {new Date(selectedAssignment.submittedDate).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              {selectedAssignment.status === 'pending' && (
                <button 
                  onClick={() => handleStartAssignment(selectedAssignment.id)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Assignment</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
