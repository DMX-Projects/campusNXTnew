// CodingAssessmentDashboard.tsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, Eye, BarChart3, X, Save, Users, Clock, Award, FileText } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  semester: string;
}

interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  timeTaken: string;
  submittedAt: string;
  status: 'completed' | 'in-progress' | 'not-started';
  programmingLanguage: string;
  questionsAttempted: number;
  totalQuestions: number;
  answers?: Array<{
    questionId: string;
    question: string;
    answer: string;
    isCorrect: boolean;
    marks: number;
  }>;
}

interface CodingTest {
  id: string;
  title: string;
  description: string;
  totalMarks: number;
  duration: string;
  createdAt: string;
  isActive: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  programmingLanguages: string[];
  totalQuestions: number;
  questions?: Array<{
    id: string;
    question: string;
    type: string;
    marks: number;
  }>;
}

const CodingAssessmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTest, setSelectedTest] = useState('all');
  
  // Modal states
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [showTestDetailsModal, setShowTestDetailsModal] = useState(false);
  const [showResultDetailsModal, setShowResultDetailsModal] = useState(false);
  const [showTestResultsModal, setShowTestResultsModal] = useState(false);
  const [selectedTestDetails, setSelectedTestDetails] = useState<CodingTest | null>(null);
  const [selectedResultDetails, setSelectedResultDetails] = useState<TestResult | null>(null);

  // Form state for new test
  const [newTest, setNewTest] = useState({
    title: '',
    description: '',
    totalMarks: 100,
    duration: '2',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    programmingLanguages: ['JavaScript'],
    totalQuestions: 5
  });

  // Sample data - replace with API calls
  const [codingTests] = useState<CodingTest[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals Test',
      description: 'Basic JavaScript programming concepts and problem-solving',
      totalMarks: 100,
      duration: '2 hours',
      createdAt: '2025-09-01',
      isActive: true,
      difficulty: 'Medium',
      programmingLanguages: ['JavaScript', 'Python'],
      totalQuestions: 10,
      questions: [
        { id: 'q1', question: 'Write a function to reverse a string', type: 'coding', marks: 10 },
        { id: 'q2', question: 'Implement array sorting algorithm', type: 'coding', marks: 15 },
        { id: 'q3', question: 'Create a palindrome checker', type: 'coding', marks: 10 }
      ]
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      description: 'Advanced DSA problems and optimization challenges',
      totalMarks: 150,
      duration: '3 hours',
      createdAt: '2025-08-28',
      isActive: true,
      difficulty: 'Hard',
      programmingLanguages: ['Java', 'C++', 'Python'],
      totalQuestions: 8,
      questions: [
        { id: 'q1', question: 'Implement binary search tree', type: 'coding', marks: 20 },
        { id: 'q2', question: 'Graph traversal algorithms', type: 'coding', marks: 25 }
      ]
    },
    {
      id: '3',
      title: 'React Development Challenge',
      description: 'Frontend development using React and TypeScript',
      totalMarks: 120,
      duration: '2.5 hours',
      createdAt: '2025-09-02',
      isActive: false,
      difficulty: 'Medium',
      programmingLanguages: ['TypeScript', 'JavaScript'],
      totalQuestions: 6
    }
  ]);

  const [testResults] = useState<TestResult[]>([
    {
      id: '1',
      studentId: 'STU001',
      testId: '1',
      studentName: 'Rahul Sharma',
      rollNumber: '2021CSE101',
      department: 'Computer Science',
      marksObtained: 85,
      totalMarks: 100,
      percentage: 85,
      timeTaken: '1h 45m',
      submittedAt: '2025-09-01T14:30:00',
      status: 'completed',
      programmingLanguage: 'JavaScript',
      questionsAttempted: 10,
      totalQuestions: 10,
      answers: [
        { questionId: 'q1', question: 'Write a function to reverse a string', answer: 'function reverse(str) { return str.split("").reverse().join(""); }', isCorrect: true, marks: 10 },
        { questionId: 'q2', question: 'Implement array sorting algorithm', answer: 'function bubbleSort(arr) { /* implementation */ }', isCorrect: false, marks: 8 }
      ]
    },
    {
      id: '2',
      studentId: 'STU002',
      testId: '1',
      studentName: 'Priya Patel',
      rollNumber: '2021CSE102',
      department: 'Computer Science',
      marksObtained: 92,
      totalMarks: 100,
      percentage: 92,
      timeTaken: '1h 30m',
      submittedAt: '2025-09-01T14:15:00',
      status: 'completed',
      programmingLanguage: 'Python',
      questionsAttempted: 10,
      totalQuestions: 10
    },
    {
      id: '3',
      studentId: 'STU003',
      testId: '2',
      studentName: 'Amit Kumar',
      rollNumber: '2021CSE103',
      department: 'Computer Science',
      marksObtained: 78,
      totalMarks: 150,
      percentage: 52,
      timeTaken: '2h 55m',
      submittedAt: '2025-08-28T16:45:00',
      status: 'completed',
      programmingLanguage: 'Java',
      questionsAttempted: 8,
      totalQuestions: 8
    },
    {
      id: '4',
      studentId: 'STU004',
      testId: '1',
      studentName: 'Sneha Reddy',
      rollNumber: '2021IT101',
      department: 'Information Technology',
      marksObtained: 67,
      totalMarks: 100,
      percentage: 67,
      timeTaken: '1h 58m',
      submittedAt: '2025-09-01T15:00:00',
      status: 'completed',
      programmingLanguage: 'JavaScript',
      questionsAttempted: 9,
      totalQuestions: 10
    },
    {
      id: '5',
      studentId: 'STU005',
      testId: '2',
      studentName: 'Vikash Singh',
      rollNumber: '2021CSE104',
      department: 'Computer Science',
      marksObtained: 135,
      totalMarks: 150,
      percentage: 90,
      timeTaken: '2h 40m',
      submittedAt: '2025-08-28T17:20:00',
      status: 'completed',
      programmingLanguage: 'C++',
      questionsAttempted: 8,
      totalQuestions: 8
    }
  ]);

  // Filtered results based on search and filters
  const filteredResults = useMemo(() => {
    return testResults.filter(result => {
      const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || result.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
      const matchesTest = selectedTest === 'all' || result.testId === selectedTest;
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesTest;
    });
  }, [testResults, searchTerm, filterDepartment, filterStatus, selectedTest]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalStudents = filteredResults.length;
    const averageMarks = totalStudents > 0 
      ? (filteredResults.reduce((sum, result) => sum + result.percentage, 0) / totalStudents).toFixed(1)
      : 0;
    const passedStudents = filteredResults.filter(result => result.percentage >= 60).length;
    const passPercentage = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : 0;
    const topPerformer = filteredResults.length > 0 
      ? filteredResults.reduce((top, current) => current.percentage > top.percentage ? current : top)
      : null;

    const gradeDistribution = {
      'A+ (90-100%)': filteredResults.filter(r => r.percentage >= 90).length,
      'A (80-89%)': filteredResults.filter(r => r.percentage >= 80 && r.percentage < 90).length,
      'B (70-79%)': filteredResults.filter(r => r.percentage >= 70 && r.percentage < 80).length,
      'C (60-69%)': filteredResults.filter(r => r.percentage >= 60 && r.percentage < 70).length,
      'F (Below 60%)': filteredResults.filter(r => r.percentage < 60).length,
    };

    return {
      totalStudents,
      averageMarks,
      passedStudents,
      passPercentage,
      topPerformer,
      gradeDistribution
    };
  }, [filteredResults]);

  // Handler functions
  const handleCreateTest = () => {
    setShowCreateTestModal(true);
  };

  const handleViewTestDetails = (test: CodingTest) => {
    setSelectedTestDetails(test);
    setShowTestDetailsModal(true);
  };

  const handleViewTestResults = (test: CodingTest) => {
    setSelectedTestDetails(test);
    setShowTestResultsModal(true);
  };

  const handleViewResultDetails = (result: TestResult) => {
    setSelectedResultDetails(result);
    setShowResultDetailsModal(true);
  };

  const handleExportResults = () => {
    const csvData = filteredResults.map(result => ({
      'Student Name': result.studentName,
      'Roll Number': result.rollNumber,
      'Department': result.department,
      'Test': codingTests.find(t => t.id === result.testId)?.title || 'Unknown',
      'Marks Obtained': result.marksObtained,
      'Total Marks': result.totalMarks,
      'Percentage': result.percentage,
      'Time Taken': result.timeTaken,
      'Programming Language': result.programmingLanguage,
      'Status': result.status,
      'Submitted At': new Date(result.submittedAt).toLocaleString()
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSaveNewTest = () => {
    console.log('Saving new test:', newTest);
    setShowCreateTestModal(false);
    // Reset form
    setNewTest({
      title: '',
      description: '',
      totalMarks: 100,
      duration: '2',
      difficulty: 'Medium',
      programmingLanguages: ['JavaScript'],
      totalQuestions: 5
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Coding Assessment Management</h1>
          <p className="mt-2 text-gray-600">Academic Section - Chairman Dashboard</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'results', label: 'Test Results', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Tests Conducted', value: codingTests.length, icon: FileText },
                { title: 'Total Students Participated', value: testResults.length, icon: Users },
                { title: 'Average Performance', value: `${analytics.averageMarks}%`, icon: Award },
                { title: 'Pass Rate', value: `${analytics.passPercentage}%`, icon: BarChart3 }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tests Overview */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Active Coding Tests</h2>
                <button
                  onClick={handleCreateTest}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus size={16} className="mr-2" />
                  Create New Test
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {codingTests.map(test => (
                    <div key={test.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{test.description}</p>
                      
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div><strong>Duration:</strong> {test.duration}</div>
                        <div><strong>Total Marks:</strong> {test.totalMarks}</div>
                        <div><strong>Questions:</strong> {test.totalQuestions}</div>
                        <div><strong>Languages:</strong> {test.programmingLanguages.join(', ')}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewTestDetails(test)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Eye size={14} className="mr-1" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleViewTestResults(test)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          <BarChart3 size={14} className="mr-1" />
                          View Results
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by student name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select 
                  value={selectedTest} 
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Tests</option>
                  {codingTests.map(test => (
                    <option key={test.id} value={test.id}>{test.title}</option>
                  ))}
                </select>
                
                <select 
                  value={filterDepartment} 
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                </select>
                
                <button
                  onClick={handleExportResults}
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Download size={16} className="mr-2" />
                  Export Results
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="bg-gray-50 px-3 py-2 rounded-md">
                  Total Results: <strong>{filteredResults.length}</strong>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-md">
                  Average Score: <strong>{analytics.averageMarks}%</strong>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-md">
                  Passed: <strong>{analytics.passedStudents}</strong>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Student Name', 'Roll Number', 'Department', 'Test', 'Marks', 'Percentage', 'Time Taken', 'Language', 'Status', 'Actions'].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.map(result => {
                      const test = codingTests.find(t => t.id === result.testId);
                      return (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {test?.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.marksObtained}/{result.totalMarks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              result.percentage >= 90 ? 'bg-green-100 text-green-800' :
                              result.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                              result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.percentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.timeTaken}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.programmingLanguage}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              result.status === 'completed' ? 'bg-green-100 text-green-800' :
                              result.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {result.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleViewResultDetails(result)}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Students</span>
                  <strong className="text-gray-900">{analytics.totalStudents}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score</span>
                  <strong className="text-gray-900">{analytics.averageMarks}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pass Rate</span>
                  <strong className="text-gray-900">{analytics.passPercentage}%</strong>
                </div>
              </div>
              
              {analytics.topPerformer && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Top Performer</h4>
                  <p className="text-blue-800"><strong>{analytics.topPerformer.studentName}</strong></p>
                  <p className="text-blue-700">{analytics.topPerformer.rollNumber} - {analytics.topPerformer.percentage}%</p>
                </div>
              )}
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Distribution</h3>
              <div className="space-y-4">
                {Object.entries(analytics.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">{grade}</div>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${analytics.totalStudents > 0 ? (count / analytics.totalStudents) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm font-semibold text-gray-900">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Department-wise Performance</h3>
              <div className="space-y-4">
                {['Computer Science', 'Information Technology', 'Electronics'].map(dept => {
                  const deptResults = filteredResults.filter(r => r.department === dept);
                  const avgScore = deptResults.length > 0 
                    ? (deptResults.reduce((sum, r) => sum + r.percentage, 0) / deptResults.length).toFixed(1)
                    : 0;
                  
                  return (
                    <div key={dept} className="flex justify-between items-center py-2">
                      <span className="text-gray-600">{dept}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{deptResults.length} students</div>
                        <div className="text-sm text-gray-600">{avgScore}% avg</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {filteredResults
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .slice(0, 5)
                  .map(result => (
                    <div key={result.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="font-medium text-gray-900">{result.studentName}</div>
                        <div className="text-sm text-gray-600">completed test - {result.percentage}%</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Test Modal */}
      {showCreateTestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Create New Test</h3>
              <button
                onClick={() => setShowCreateTestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
                <input
                  type="text"
                  value={newTest.title}
                  onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTest.description}
                  onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0.5"
                    step="0.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    value={newTest.totalMarks}
                    onChange={(e) => setNewTest({...newTest, totalMarks: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={newTest.difficulty}
                    onChange={(e) => setNewTest({...newTest, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                  <input
                    type="number"
                    value={newTest.totalQuestions}
                    onChange={(e) => setNewTest({...newTest, totalQuestions: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowCreateTestModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save size={16} className="mr-2" />
                Create Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Details Modal */}
      {showTestDetailsModal && selectedTestDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Test Details</h3>
              <button
                onClick={() => setShowTestDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedTestDetails.title}</h4>
                <p className="text-gray-600">{selectedTestDetails.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold">{selectedTestDetails.duration}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Total Marks</div>
                  <div className="font-semibold">{selectedTestDetails.totalMarks}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Questions</div>
                  <div className="font-semibold">{selectedTestDetails.totalQuestions}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold">{selectedTestDetails.difficulty}</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Programming Languages</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedTestDetails.programmingLanguages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedTestDetails.questions && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Questions Preview</h5>
                  <div className="space-y-3">
                    {selectedTestDetails.questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">Q{index + 1}. {question.question}</span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">{question.marks} marks</span>
                        </div>
                        <div className="text-sm text-gray-600">Type: {question.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Test Results Modal */}
      {showTestResultsModal && selectedTestDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Results for: {selectedTestDetails.title}
              </h3>
              <button
                onClick={() => setShowTestResultsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testResults
                      .filter(result => result.testId === selectedTestDetails.id)
                      .map(result => (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.marksObtained}/{result.totalMarks}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              result.percentage >= 90 ? 'bg-green-100 text-green-800' :
                              result.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                              result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.percentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.timeTaken}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.programmingLanguage}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Details Modal */}
      {showResultDetailsModal && selectedResultDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Result Details - {selectedResultDetails.studentName}
              </h3>
              <button
                onClick={() => setShowResultDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Student</div>
                  <div className="font-semibold">{selectedResultDetails.studentName}</div>
                  <div className="text-sm text-gray-500">{selectedResultDetails.rollNumber}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="font-semibold">{selectedResultDetails.marksObtained}/{selectedResultDetails.totalMarks}</div>
                  <div className="text-sm text-gray-500">{selectedResultDetails.percentage}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Time Taken</div>
                  <div className="font-semibold">{selectedResultDetails.timeTaken}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Language</div>
                  <div className="font-semibold">{selectedResultDetails.programmingLanguage}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Question Attempts</h4>
                <div className="text-sm text-gray-600 mb-4">
                  Questions Attempted: {selectedResultDetails.questionsAttempted}/{selectedResultDetails.totalQuestions}
                </div>
                
                {selectedResultDetails.answers && (
                  <div className="space-y-4">
                    {selectedResultDetails.answers.map((answer, index) => (
                      <div key={answer.questionId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-medium">Q{index + 1}. {answer.question}</h5>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {answer.isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                            <span className="text-sm font-semibold">{answer.marks} marks</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="text-sm text-gray-600 mb-1">Student Answer:</div>
                          <code className="text-sm text-gray-900 font-mono">{answer.answer}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingAssessmentDashboard;