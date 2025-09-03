 // CodingAssessmentDashboard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Download, Plus, Eye, BarChart3 } from 'lucide-react';
import './CodingAssessment.css';

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
}

const CodingAssessmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTest, setSelectedTest] = useState('all');

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
      totalQuestions: 10
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
      totalQuestions: 8
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
      totalQuestions: 10
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

  return (
    <div className="coding-assessment-dashboard">
      <div className="dashboard-header">
        <h1>Coding Assessment Management</h1>
        <p>Academic Section - Chairman Dashboard</p>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'results' ? 'active' : ''}
          onClick={() => setActiveTab('results')}
        >
          Test Results
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Tests Conducted</h3>
              <div className="stat-number">{codingTests.length}</div>
            </div>
            <div className="stat-card">
              <h3>Total Students Participated</h3>
              <div className="stat-number">{testResults.length}</div>
            </div>
            <div className="stat-card">
              <h3>Average Performance</h3>
              <div className="stat-number">{analytics.averageMarks}%</div>
            </div>
            <div className="stat-card">
              <h3>Pass Rate</h3>
              <div className="stat-number">{analytics.passPercentage}%</div>
            </div>
          </div>

          <div className="tests-overview">
            <div className="section-header">
              <h2>Active Coding Tests</h2>
              <button className="btn-primary">
                <Plus size={16} /> Create New Test
              </button>
            </div>
            
            <div className="tests-grid">
              {codingTests.map(test => (
                <div key={test.id} className="test-card">
                  <div className="test-header">
                    <h3>{test.title}</h3>
                    <span className={`difficulty ${test.difficulty.toLowerCase()}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <p>{test.description}</p>
                  <div className="test-details">
                    <div><strong>Duration:</strong> {test.duration}</div>
                    <div><strong>Total Marks:</strong> {test.totalMarks}</div>
                    <div><strong>Questions:</strong> {test.totalQuestions}</div>
                    <div><strong>Languages:</strong> {test.programmingLanguages.join(', ')}</div>
                  </div>
                  <div className="test-actions">
                    <button className="btn-secondary">
                      <Eye size={16} /> View Details
                    </button>
                    <button className="btn-primary">
                      <BarChart3 size={16} /> View Results
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
        <div className="results-section">
          <div className="filters-section">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by student name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filters">
              <select 
                value={selectedTest} 
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                <option value="all">All Tests</option>
                {codingTests.map(test => (
                  <option key={test.id} value={test.id}>{test.title}</option>
                ))}
              </select>

              <select 
                value={filterDepartment} 
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
              </select>

              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>

              <button className="btn-secondary">
                <Download size={16} /> Export Results
              </button>
            </div>
          </div>

          <div className="results-summary">
            <div className="summary-card">
              <span>Total Results: <strong>{filteredResults.length}</strong></span>
            </div>
            <div className="summary-card">
              <span>Average Score: <strong>{analytics.averageMarks}%</strong></span>
            </div>
            <div className="summary-card">
              <span>Passed: <strong>{analytics.passedStudents}</strong></span>
            </div>
          </div>

          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Department</th>
                  <th>Test</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Time Taken</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(result => {
                  const test = codingTests.find(t => t.id === result.testId);
                  return (
                    <tr key={result.id}>
                      <td>{result.studentName}</td>
                      <td>{result.rollNumber}</td>
                      <td>{result.department}</td>
                      <td>{test?.title}</td>
                      <td>{result.marksObtained}/{result.totalMarks}</td>
                      <td>
                        <span className={`percentage ${result.percentage >= 90 ? 'excellent' : 
                          result.percentage >= 80 ? 'good' : 
                          result.percentage >= 60 ? 'average' : 'poor'}`}>
                          {result.percentage}%
                        </span>
                      </td>
                      <td>{result.timeTaken}</td>
                      <td>{result.programmingLanguage}</td>
                      <td>
                        <span className={`status ${result.status}`}>
                          {result.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-link">View Details</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Performance Overview</h3>
              <div className="performance-stats">
                <div className="stat">
                  <span>Total Students</span>
                  <strong>{analytics.totalStudents}</strong>
                </div>
                <div className="stat">
                  <span>Average Score</span>
                  <strong>{analytics.averageMarks}%</strong>
                </div>
                <div className="stat">
                  <span>Pass Rate</span>
                  <strong>{analytics.passPercentage}%</strong>
                </div>
              </div>
              {analytics.topPerformer && (
                <div className="top-performer">
                  <h4>Top Performer</h4>
                  <p><strong>{analytics.topPerformer.studentName}</strong></p>
                  <p>{analytics.topPerformer.rollNumber} - {analytics.topPerformer.percentage}%</p>
                </div>
              )}
            </div>

            <div className="analytics-card">
              <h3>Grade Distribution</h3>
              <div className="grade-chart">
                {Object.entries(analytics.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="grade-bar">
                    <span className="grade-label">{grade}</span>
                    <div className="bar-container">
                      <div 
                        className="bar" 
                        style={{ width: `${(count / analytics.totalStudents) * 100}%` }}
                      ></div>
                      <span className="count">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-card">
              <h3>Department-wise Performance</h3>
              <div className="department-stats">
                {['Computer Science', 'Information Technology', 'Electronics'].map(dept => {
                  const deptResults = filteredResults.filter(r => r.department === dept);
                  const avgScore = deptResults.length > 0 
                    ? (deptResults.reduce((sum, r) => sum + r.percentage, 0) / deptResults.length).toFixed(1)
                    : 0;
                  
                  return (
                    <div key={dept} className="dept-stat">
                      <span>{dept}</span>
                      <div className="dept-details">
                        <span>{deptResults.length} students</span>
                        <span>{avgScore}% avg</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="analytics-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {filteredResults
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .slice(0, 5)
                  .map(result => (
                    <div key={result.id} className="activity-item">
                      <span>{result.studentName}</span>
                      <span>completed test - {result.percentage}%</span>
                      <span>{new Date(result.submittedAt).toLocaleDateString()}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingAssessmentDashboard;
