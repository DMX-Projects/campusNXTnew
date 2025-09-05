
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Plus, Eye, BarChart3, BookOpen, Users, Trophy, TrendingUp, X, Clock, CheckCircle } from 'lucide-react';

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
  semester: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  timeTaken: string;
  submittedAt: string;
  status: 'completed' | 'in-progress' | 'not-started';
  questionsAttempted: number;
  totalQuestions: number;
  correctAnswers: number;
}

interface OnlineTest {
  id: string;
  title: string;
  subject: string;
  description: string;
  totalMarks: number;
  duration: string;
  createdAt: string;
  isActive: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  totalQuestions: number;
  questionTypes: string[];
  targetSemesters: string[];
  department: string;
}

// Detail Modal Component for individual student test result details
const DetailModal: React.FC<{
  result: TestResult | null;
  test: OnlineTest | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ result, test, isOpen, onClose }) => {
  if (!isOpen || !result || !test) return null;

  const accuracy = ((result.correctAnswers / result.questionsAttempted) * 100).toFixed(1);

  const handleDownload = () => {
    // CSV content for this student's result
    const csvContent = `Name,Roll Number,Department,Marks Obtained,Total Marks,Percentage,Time Taken,Status
${result.studentName},${result.rollNumber},${result.department},${result.marksObtained},${result.totalMarks},${result.percentage},${result.timeTaken},${result.status}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student_test_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Test Details</h2>
            <p className="text-gray-600">{result.studentName} - {result.rollNumber}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="text-gray-600">Name:</span> <span className="font-semibold">{result.studentName}</span></p>
                <p><span className="text-gray-600">Roll Number:</span> <span className="font-semibold">{result.rollNumber}</span></p>
                <p><span className="text-gray-600">Department:</span> <span className="font-semibold">{result.department}</span></p>
              </div>
              <div>
                <p><span className="text-gray-600">Semester:</span> <span className="font-semibold">{result.semester}</span></p>
                <p><span className="text-gray-600">Status:</span> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    result.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.status}
                  </span>
                </p>
                <p><span className="text-gray-600">Submitted:</span> <span className="font-semibold">{new Date(result.submittedAt).toLocaleString()}</span></p>
              </div>
            </div>
          </div>

          {/* Test Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="text-gray-600">Test:</span> <span className="font-semibold">{test.title}</span></p>
                <p><span className="text-gray-600">Subject:</span> <span className="font-semibold text-blue-600">{test.subject}</span></p>
                <p><span className="text-gray-600">Duration:</span> <span className="font-semibold">{test.duration}</span></p>
              </div>
              <div>
                <p><span className="text-gray-600">Difficulty:</span> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                    test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {test.difficulty}
                  </span>
                </p>
                <p><span className="text-gray-600">Total Questions:</span> <span className="font-semibold">{test.totalQuestions}</span></p>
                <p><span className="text-gray-600">Total Marks:</span> <span className="font-semibold">{test.totalMarks}</span></p>
              </div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{result.percentage.toFixed(1)}%</div>
              <div className="text-gray-600 text-sm">Overall Score</div>
            </div>
            <div className="bg-white border border-green-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-gray-600 text-sm">Accuracy</div>
            </div>
            <div className="bg-white border border-purple-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{result.questionsAttempted}</div>
              <div className="text-gray-600 text-sm">Attempted</div>
            </div>
            <div className="bg-white border border-orange-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{result.timeTaken}</div>
              <div className="text-gray-600 text-sm">Time Taken</div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Score Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Marks Obtained:</span>
                  <span className="font-bold">{result.marksObtained}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Marks:</span>
                  <span className="font-bold">{result.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage:</span>
                  <span className={`font-bold ${result.percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className={`h-3 rounded-full ${result.percentage >= 60 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(result.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Question Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Questions:</span>
                  <span className="font-bold">{result.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attempted:</span>
                  <span className="font-bold text-blue-600">{result.questionsAttempted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct:</span>
                  <span className="font-bold text-green-600">{result.correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wrong:</span>
                  <span className="font-bold text-red-600">{result.questionsAttempted - result.correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unattempted:</span>
                  <span className="font-bold text-gray-500">{result.totalQuestions - result.questionsAttempted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grade */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 text-center">
            <h4 className="text-lg font-semibold mb-4">Final Grade</h4>
            <div className={`text-6xl font-bold mb-2 ${
              result.percentage >= 90 ? 'text-green-600' :
              result.percentage >= 80 ? 'text-blue-600' :
              result.percentage >= 70 ? 'text-yellow-600' :
              result.percentage >= 60 ? 'text-orange-600' : 'text-red-600'
            }`}>
              {result.percentage >= 90 ? 'A+' :
               result.percentage >= 80 ? 'A' :
               result.percentage >= 70 ? 'B' :
               result.percentage >= 60 ? 'C' : 'F'}
            </div>
            <div className="text-gray-600">
              {result.percentage >= 60 ? 'PASSED' : 'FAILED'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Download Report
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Results Modal Component for showing results analytics for a selected test
const ResultsModal: React.FC<{
  test: OnlineTest | null;
  results: TestResult[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ test, results, isOpen, onClose }) => {
  if (!isOpen || !test) return null;

  const totalStudents = results.length;
  const averageScore = totalStudents > 0 ? (results.reduce((sum, r) => sum + r.percentage, 0) / totalStudents).toFixed(1) : "0";
  const passedCount = results.filter(r => r.percentage >= 60).length;
  const passRate = totalStudents > 0 ? ((passedCount / totalStudents) * 100).toFixed(1) : "0";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-gray-900">Results Summary - {test.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{totalStudents}</div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{averageScore}%</div>
            <div className="text-gray-600">Average Score</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{passRate}%</div>
            <div className="text-gray-600">Pass Rate</div>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900">Student</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Roll Number</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Department</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Marks</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Percentage</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Accuracy</th>
                <th className="px-6 py-3 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                const accuracy = ((result.correctAnswers / result.questionsAttempted) * 100).toFixed(1);
                return (
                  <tr key={result.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">{result.studentName}</td>
                    <td className="px-6 py-4">{result.rollNumber}</td>
                    <td className="px-6 py-4">{result.department}</td>
                    <td className="px-6 py-4">{result.marksObtained}/{result.totalMarks}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          result.percentage >= 90 ? 'bg-green-100 text-green-800' :
                          result.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                          result.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          result.percentage >= 60 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {result.percentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">{accuracy}%</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        result.status === 'completed' ? 'bg-green-100 text-green-800' :
                        result.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.status.replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const OnlineTestDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTest, setSelectedTest] = useState('all');

  // Modal states
  const [selectedResultForDetail, setSelectedResultForDetail] = useState<TestResult | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedTestForResults, setSelectedTestForResults] = useState<OnlineTest | null>(null);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  // Sample data for online tests
  const [onlineTests] = useState<OnlineTest[]>([
    {
      id: '1',
      title: 'Engineering Mathematics - Unit 1',
      subject: 'Mathematics',
      description: 'Differential Calculus, Integral Calculus, and Applications',
      totalMarks: 100,
      duration: '2 hours',
      createdAt: '2025-09-01',
      isActive: true,
      difficulty: 'Medium',
      totalQuestions: 50,
      questionTypes: ['MCQ', 'Short Answer', 'Numerical'],
      targetSemesters: ['1st Semester', '2nd Semester'],
      department: 'All Engineering'
    },
    {
      id: '2',
      title: 'Physics - Mechanics & Thermodynamics',
      subject: 'Physics',
      description: 'Classical Mechanics, Heat Transfer, and Thermodynamic Laws',
      totalMarks: 80,
      duration: '1.5 hours',
      createdAt: '2025-08-28',
      isActive: true,
      difficulty: 'Hard',
      totalQuestions: 40,
      questionTypes: ['MCQ', 'Theory', 'Problem Solving'],
      targetSemesters: ['1st Semester'],
      department: 'All Engineering'
    },
    {
      id: '3',
      title: 'Chemistry - Organic Compounds',
      subject: 'Chemistry',
      description: 'Organic Chemistry, Reaction Mechanisms, and Synthesis',
      totalMarks: 75,
      duration: '1.5 hours',
      createdAt: '2025-09-02',
      isActive: true,
      difficulty: 'Medium',
      totalQuestions: 35,
      questionTypes: ['MCQ', 'Structure Drawing', 'Reaction Prediction'],
      targetSemesters: ['1st Semester', '2nd Semester'],
      department: 'Chemical Engineering'
    }
  ]);

  // Sample data for test results
  const [testResults] = useState<TestResult[]>([
    {
      id: '1',
      studentId: 'STU001',
      testId: '1',
      studentName: 'Arjun Kumar',
      rollNumber: '2021CSE101',
      department: 'Computer Science',
      semester: '2nd Semester',
      marksObtained: 78,
      totalMarks: 100,
      percentage: 78,
      timeTaken: '1h 45m',
      submittedAt: '2025-09-01T14:30:00',
      status: 'completed',
      questionsAttempted: 48,
      totalQuestions: 50,
      correctAnswers: 39
    },
    {
      id: '2',
      studentId: 'STU002',
      testId: '1',
      studentName: 'Priya Sharma',
      rollNumber: '2021ME102',
      department: 'Mechanical Engineering',
      semester: '2nd Semester',
      marksObtained: 85,
      totalMarks: 100,
      percentage: 85,
      timeTaken: '1h 50m',
      submittedAt: '2025-09-01T14:15:00',
      status: 'completed',
      questionsAttempted: 50,
      totalQuestions: 50,
      correctAnswers: 42
    },
    {
      id: '3',
      studentId: 'STU003',
      testId: '2',
      studentName: 'Rajesh Patel',
      rollNumber: '2021EE103',
      department: 'Electrical Engineering',
      semester: '1st Semester',
      marksObtained: 65,
      totalMarks: 80,
      percentage: 81.25,
      timeTaken: '1h 25m',
      submittedAt: '2025-08-28T16:45:00',
      status: 'completed',
      questionsAttempted: 38,
      totalQuestions: 40,
      correctAnswers: 32
    }
  ]);

  // Filter results based on filters and search
  const filteredResults = useMemo(() => {
    return testResults.filter(result => {
      const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || result.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
      const matchesTest = selectedTest === 'all' || result.testId === selectedTest;
      
      const test = onlineTests.find(t => t.id === result.testId);
      const matchesSubject = filterSubject === 'all' || (test && test.subject === filterSubject);
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesTest && matchesSubject;
    });
  }, [testResults, searchTerm, filterDepartment, filterStatus, selectedTest, filterSubject, onlineTests]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalStudents = filteredResults.length;
    const averageMarks = totalStudents > 0 
      ? (filteredResults.reduce((sum, result) => sum + result.percentage, 0) / totalStudents).toFixed(1)
      : "0";
    const passedStudents = filteredResults.filter(result => result.percentage >= 60).length;
    const passPercentage = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : "0";
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

  // Handlers for modals
  const handleViewDetails = (result: TestResult) => {
    setSelectedResultForDetail(result);
    setIsDetailModalOpen(true);
  };
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedResultForDetail(null);
  };

  const handleViewResults = (test: OnlineTest) => {
    setSelectedTestForResults(test);
    setIsResultsModalOpen(true);
  };
  const handleCloseResultsModal = () => {
    setIsResultsModalOpen(false);
    setSelectedTestForResults(null);
  };

  // Handler for Create New Test button
  const handleCreateNewTest = () => {

  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Online Test Management</h1>
        </div>
        <p className="text-gray-600">Academic Section - Engineering Subjects Assessment</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 px-6 py-4 text-lg font-medium transition-colors duration-200 ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <div className="flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              Overview
            </div>
          </button>
          <button 
            className={`flex-1 px-6 py-4 text-lg font-medium transition-colors duration-200 ${
              activeTab === 'results' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('results')}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Test Results
            </div>
          </button>
          <button 
            className={`flex-1 px-6 py-4 text-lg font-medium transition-colors duration-200 ${
              activeTab === 'analytics' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics
            </div>
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Tests</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{onlineTests.length}</div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Students Participated</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{testResults.length}</div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Performance</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{analytics.averageMarks}%</div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pass Rate</h3>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{analytics.passPercentage}%</div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Tests List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Engineering Subject Tests</h2>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                onClick={handleCreateNewTest}
              >
                <Plus className="w-4 h-4" />
                Create New Test
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {onlineTests.map(test => (
                <div key={test.id} className="bg-gray-50 hover:bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{test.subject}</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${test.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{test.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div><span className="font-medium text-gray-900">Duration:</span> {test.duration}</div>
                    <div><span className="font-medium text-gray-900">Marks:</span> {test.totalMarks}</div>
                    <div><span className="font-medium text-gray-900">Questions:</span> {test.totalQuestions}</div>
                    <div><span className="font-medium text-gray-900">Department:</span> {test.department}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Question Types:</div>
                    <div className="flex flex-wrap gap-1">
                      {test.questionTypes.map(type => (
                        <span key={type} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{type}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors duration-200"
                      onClick={() => {
                        setSelectedTest(test.id);
                        setActiveTab('results');
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>

                    <button
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors duration-200"
                      onClick={() => handleViewResults(test)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Test Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <select 
                  value={selectedTest} 
                  onChange={(e) => setSelectedTest(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Tests</option>
                  {onlineTests.map(test => (
                    <option key={test.id} value={test.id}>{test.title}</option>
                  ))}
                </select>
                <select 
                  value={filterSubject} 
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
                <select 
                  value={filterDepartment} 
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
              <span className="text-gray-600">Total Results: <strong className="text-gray-900 text-lg">{filteredResults.length}</strong></span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
              <span className="text-gray-600">Average Score: <strong className="text-gray-900 text-lg">{analytics.averageMarks}%</strong></span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
              <span className="text-gray-600">Passed: <strong className="text-gray-900 text-lg">{analytics.passedStudents}</strong></span>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Roll Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Marks</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Percentage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResults.map(result => {
                    const test = onlineTests.find(t => t.id === result.testId);
                    const accuracy = ((result.correctAnswers / result.questionsAttempted) * 100).toFixed(1);
                    
                    return (
                      <tr key={result.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{result.studentName}</div>
                          <div className="text-sm text-gray-500">{result.semester}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{result.rollNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{result.department}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{test?.subject}</div>
                          <div className="text-xs text-gray-500 truncate max-w-32">{test?.title}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {result.marksObtained}/{result.totalMarks}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            result.percentage >= 90 ? 'bg-green-100 text-green-800' :
                            result.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                            result.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            result.percentage >= 60 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.percentage.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {accuracy}% ({result.correctAnswers}/{result.questionsAttempted})
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{result.timeTaken}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            result.status === 'completed' ? 'bg-green-100 text-green-800' :
                            result.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                            onClick={() => handleViewDetails(result)}
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
              <div className="space-y-4">
                <div className="text-center bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Total Students</div>
                  <div className="text-2xl font-bold text-gray-900">{analytics.totalStudents}</div>
                </div>
                <div className="text-center bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Average Score</div>
                  <div className="text-2xl font-bold text-blue-600">{analytics.averageMarks}%</div>
                </div>
                <div className="text-center bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Pass Rate</div>
                  <div className="text-2xl font-bold text-green-600">{analytics.passPercentage}%</div>
                </div>
              </div>
              
              {analytics.topPerformer && (
                <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2 opacity-90">🏆 Top Performer</h4>
                  <p className="font-semibold">{analytics.topPerformer.studentName}</p>
                  <p className="text-sm opacity-90">{analytics.topPerformer.rollNumber} - {analytics.topPerformer.percentage.toFixed(1)}%</p>
                </div>
              )}
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Distribution</h3>
              <div className="space-y-4">
                {Object.entries(analytics.gradeDistribution).map(([grade, count]) => {
                  const percentage = analytics.totalStudents > 0 ? (count / analytics.totalStudents) * 100 : 0;
                  return (
                    <div key={grade}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{grade}</span>
                        <span className="text-sm font-bold text-gray-900">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {filteredResults
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .slice(0, 8)
                  .map(result => (
                    <div key={result.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{result.studentName}</div>
                        <div className="text-xs text-gray-500">completed test - {result.percentage.toFixed(1)}%</div>
                      </div>
                      <div className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <DetailModal 
        result={selectedResultForDetail}
        test={selectedResultForDetail ? onlineTests.find(t => t.id === selectedResultForDetail.testId) || null : null}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* Results Modal */}
      <ResultsModal
        test={selectedTestForResults}
        results={selectedTestForResults ? testResults.filter(r => r.testId === selectedTestForResults.id) : []}
        isOpen={isResultsModalOpen}
        onClose={handleCloseResultsModal}
      />
    </div>
  );
};

export default OnlineTestDashboard;
