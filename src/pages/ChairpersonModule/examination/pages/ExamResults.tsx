import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Award, BookOpen, FileText, Calendar, Filter, Download, AlertTriangle, CheckCircle, Trophy, Target } from 'lucide-react';

interface SubjectAnalytics {
  subject: string;
  subjectCode: string;
  totalStudents: number;
  passed: number;
  failed: number;
  passPercentage: number;
  avgMarks: number;
  highestMarks: number;
  lowestMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
}

interface DepartmentPerformance {
  department: string;
  totalStudents: number;
  passed: number;
  failed: number;
  passPercentage: number;
  avgCGPA: number;
  toppers: number;
  backlogs: number;
}

interface TrendData {
  semester: string;
  passPercentage: number;
  avgCGPA: number;
  totalStudents: number;
}

interface TopperData {
  rank: number;
  name: string;
  rollNo: string;
  department: string;
  cgpa: number;
  semester: number;
}

const ResultAnalyticsDashboard: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('2024-Spring');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const overallStats = {
    totalStudents: 1250,
    passedStudents: 1089,
    failedStudents: 161,
    overallPassPercentage: 87.1,
    avgCGPA: 7.2,
    totalSubjects: 45,
    totalDepartments: 8
  };

  const departmentData: DepartmentPerformance[] = [
    {
      department: 'Computer Science',
      totalStudents: 180,
      passed: 165,
      failed: 15,
      passPercentage: 91.7,
      avgCGPA: 7.8,
      toppers: 12,
      backlogs: 25
    },
    {
      department: 'Electronics',
      totalStudents: 150,
      passed: 135,
      failed: 15,
      passPercentage: 90.0,
      avgCGPA: 7.5,
      toppers: 8,
      backlogs: 22
    },
    {
      department: 'Mechanical',
      totalStudents: 200,
      passed: 168,
      failed: 32,
      passPercentage: 84.0,
      avgCGPA: 6.9,
      toppers: 6,
      backlogs: 45
    },
    {
      department: 'Civil',
      totalStudents: 160,
      passed: 138,
      failed: 22,
      passPercentage: 86.3,
      avgCGPA: 7.1,
      toppers: 5,
      backlogs: 35
    },
    {
      department: 'Electrical',
      totalStudents: 140,
      passed: 120,
      failed: 20,
      passPercentage: 85.7,
      avgCGPA: 7.0,
      toppers: 4,
      backlogs: 28
    },
    {
      department: 'Information Technology',
      totalStudents: 120,
      passed: 110,
      failed: 10,
      passPercentage: 91.7,
      avgCGPA: 7.6,
      toppers: 7,
      backlogs: 18
    }
  ];

  const subjectAnalytics: SubjectAnalytics[] = [
    {
      subject: 'Engineering Mathematics',
      subjectCode: 'MA401',
      totalStudents: 200,
      passed: 120,
      failed: 80,
      passPercentage: 60.0,
      avgMarks: 52,
      highestMarks: 95,
      lowestMarks: 12,
      difficulty: 'Very Hard'
    },
    {
      subject: 'Data Structures',
      subjectCode: 'CS301',
      totalStudents: 180,
      passed: 155,
      failed: 25,
      passPercentage: 86.1,
      avgMarks: 71,
      highestMarks: 98,
      lowestMarks: 25,
      difficulty: 'Medium'
    },
    {
      subject: 'Digital Electronics',
      subjectCode: 'EC201',
      totalStudents: 150,
      passed: 135,
      failed: 15,
      passPercentage: 90.0,
      avgMarks: 74,
      highestMarks: 96,
      lowestMarks: 32,
      difficulty: 'Easy'
    },
    {
      subject: 'Thermodynamics',
      subjectCode: 'ME301',
      totalStudents: 200,
      passed: 140,
      failed: 60,
      passPercentage: 70.0,
      avgMarks: 58,
      highestMarks: 92,
      lowestMarks: 18,
      difficulty: 'Hard'
    },
    {
      subject: 'Database Systems',
      subjectCode: 'CS401',
      totalStudents: 160,
      passed: 145,
      failed: 15,
      passPercentage: 90.6,
      avgMarks: 76,
      highestMarks: 99,
      lowestMarks: 28,
      difficulty: 'Medium'
    }
  ];

  const trendData: TrendData[] = [
    { semester: '2023-Fall', passPercentage: 82.5, avgCGPA: 6.8, totalStudents: 1180 },
    { semester: '2024-Spring', passPercentage: 87.1, avgCGPA: 7.2, totalStudents: 1250 },
    { semester: '2024-Summer', passPercentage: 89.2, avgCGPA: 7.4, totalStudents: 1100 },
    { semester: '2024-Fall', passPercentage: 85.8, avgCGPA: 7.0, totalStudents: 1300 }
  ];

  const topperData: TopperData[] = [
    { rank: 1, name: 'Arjun Sharma', rollNo: 'CS21001', department: 'Computer Science', cgpa: 9.8, semester: 6 },
    { rank: 2, name: 'Priya Patel', rollNo: 'IT21045', department: 'Information Technology', cgpa: 9.7, semester: 6 },
    { rank: 3, name: 'Rahul Kumar', rollNo: 'EC21078', department: 'Electronics', cgpa: 9.6, semester: 6 },
    { rank: 4, name: 'Sneha Gupta', rollNo: 'CS21134', department: 'Computer Science', cgpa: 9.5, semester: 6 },
    { rank: 5, name: 'Vikram Singh', rollNo: 'ME21089', department: 'Mechanical', cgpa: 9.4, semester: 6 }
  ];

  const pieChartData = [
    { name: 'Passed', value: overallStats.passedStudents, color: '#10B981' },
    { name: 'Failed', value: overallStats.failedStudents, color: '#EF4444' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-orange-600 bg-orange-100';
      case 'Very Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const generateReport = () => {
    const reportData = {
      overview: overallStats,
      departments: departmentData,
      subjects: subjectAnalytics,
      toppers: topperData,
      trends: trendData
    };

    const csvContent = [
      'RESULT ANALYTICS REPORT',
      `Generated on: ${new Date().toLocaleString()}`,
      `Semester: ${selectedSemester}`,
      '',
      'OVERALL STATISTICS',
      `Total Students,${overallStats.totalStudents}`,
      `Passed Students,${overallStats.passedStudents}`,
      `Failed Students,${overallStats.failedStudents}`,
      `Pass Percentage,${overallStats.overallPassPercentage}%`,
      `Average CGPA,${overallStats.avgCGPA}`,
      '',
      'DEPARTMENT PERFORMANCE',
      'Department,Total Students,Passed,Failed,Pass %,Avg CGPA,Toppers,Backlogs',
      ...departmentData.map(dept => 
        `${dept.department},${dept.totalStudents},${dept.passed},${dept.failed},${dept.passPercentage}%,${dept.avgCGPA},${dept.toppers},${dept.backlogs}`
      ),
      '',
      'SUBJECT ANALYTICS',
      'Subject,Code,Total Students,Passed,Failed,Pass %,Avg Marks,Difficulty',
      ...subjectAnalytics.map(subject => 
        `${subject.subject},${subject.subjectCode},${subject.totalStudents},${subject.passed},${subject.failed},${subject.passPercentage}%,${subject.avgMarks},${subject.difficulty}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `result_analytics_report_${selectedSemester}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        

        

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{overallStats.totalStudents}</div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{overallStats.overallPassPercentage}%</div>
                <div className="text-gray-600">Pass Percentage</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">{overallStats.avgCGPA}</div>
                <div className="text-gray-600">Average CGPA</div>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600">{overallStats.totalSubjects}</div>
                <div className="text-gray-600">Total Subjects</div>
              </div>
              <BookOpen className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart },
                { id: 'departments', label: 'Departments', icon: Users },
                { id: 'subjects', label: 'Subject Analysis', icon: BookOpen },
                { id: 'toppers', label: 'Merit List', icon: Trophy },
                { id: 'trends', label: 'Trends', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Pass/Fail Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData.slice(0, 4)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="passPercentage" fill="#3B82F6" name="Pass %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'departments' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Failed</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg CGPA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Toppers</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Backlogs</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departmentData.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{dept.department}</td>
                        <td className="px-6 py-4 text-gray-900">{dept.totalStudents}</td>
                        <td className="px-6 py-4 text-green-600 font-medium">{dept.passed}</td>
                        <td className="px-6 py-4 text-red-600 font-medium">{dept.failed}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            dept.passPercentage >= 90 ? 'bg-green-100 text-green-800' :
                            dept.passPercentage >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dept.passPercentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">{dept.avgCGPA}</td>
                        <td className="px-6 py-4 text-purple-600 font-medium">{dept.toppers}</td>
                        <td className="px-6 py-4 text-orange-600 font-medium">{dept.backlogs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Range</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjectAnalytics.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{subject.subject}</td>
                        <td className="px-6 py-4 text-gray-700">{subject.subjectCode}</td>
                        <td className="px-6 py-4 text-gray-900">{subject.totalStudents}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              subject.passPercentage >= 80 ? 'bg-green-100 text-green-800' :
                              subject.passPercentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {subject.passPercentage}%
                            </span>
                            {subject.passPercentage < 70 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">{subject.avgMarks}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                            {subject.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {subject.lowestMarks} - {subject.highestMarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'toppers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top 5 Performers
                  </h3>
                  <div className="space-y-3">
                    {topperData.map((student) => (
                      <div key={student.rank} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            student.rank === 1 ? 'bg-yellow-500 text-white' :
                            student.rank === 2 ? 'bg-gray-400 text-white' :
                            student.rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {student.rank}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNo} • {student.department}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{student.cgpa}</div>
                          <div className="text-xs text-gray-400">CGPA</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Department-wise Toppers</h3>
                  <div className="space-y-3">
                    {departmentData.slice(0, 5).map((dept) => (
                      <div key={dept.department} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div>
                          <div className="font-medium text-gray-900">{dept.department}</div>
                          <div className="text-sm text-gray-500">Avg CGPA: {dept.avgCGPA}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{dept.toppers}</div>
                          <div className="text-xs text-gray-400">Toppers</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Performance Trends Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="passPercentage" stroke="#3B82F6" strokeWidth={3} name="Pass Percentage %" />
                    <Line yAxisId="right" type="monotone" dataKey="avgCGPA" stroke="#10B981" strokeWidth={3} name="Average CGPA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Result Analytics Dashboard • {selectedSemester} • Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultAnalyticsDashboard;