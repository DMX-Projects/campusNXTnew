 // FacultyReports.tsx
import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  BookOpen, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  TrendingUp,
  FileText,
  PieChart,
  Award
} from 'lucide-react';

interface ReportData {
  attendance: {
    total: number;
    present: number;
    absent: number;
    percentage: number;
  };
  academic: {
    totalStudents: number;
    passed: number;
    failed: number;
    avgScore: number;
  };
  subjects: Array<{
    code: string;
    name: string;
    students: number;
    avgAttendance: number;
    avgScore: number;
  }>;
}

const FacultyReports: React.FC = () => {
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science Engineering',
    employeeId: 'FAC001'
  };

  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeReportType, setActiveReportType] = useState<'attendance' | 'academic' | 'feedback' | 'analytics'>('attendance');

  // Sample report data
  const reportData: ReportData = {
    attendance: {
      total: 1200,
      present: 950,
      absent: 250,
      percentage: 79.2
    },
    academic: {
      totalStudents: 120,
      passed: 102,
      failed: 18,
      avgScore: 73.5
    },
    subjects: [
      { code: 'CS301', name: 'Data Structures', students: 60, avgAttendance: 85.5, avgScore: 76.2 },
      { code: 'CS302', name: 'Database Systems', students: 58, avgAttendance: 78.3, avgScore: 71.8 },
      { code: 'CS303', name: 'Operating Systems', students: 55, avgAttendance: 82.1, avgScore: 74.6 }
    ]
  };

  // Student performance data for charts
  const studentPerformance = [
    { range: '90-100', count: 15, color: 'bg-green-500' },
    { range: '80-89', count: 25, color: 'bg-blue-500' },
    { range: '70-79', count: 35, color: 'bg-yellow-500' },
    { range: '60-69', count: 30, color: 'bg-orange-500' },
    { range: 'Below 60', count: 15, color: 'bg-red-500' }
  ];

  const exportReport = (type: string) => {
    const data = {
      faculty: facultyInfo.name,
      department: facultyInfo.department,
      period: selectedPeriod,
      generated: new Date().toLocaleString(),
      ...reportData
    };

    const csvContent = `Faculty Report - ${type}\n` +
      `Faculty: ${data.faculty}\n` +
      `Department: ${data.department}\n` +
      `Period: ${data.period}\n` +
      `Generated: ${data.generated}\n\n` +
      `Attendance Summary:\n` +
      `Total Classes: ${data.attendance.total}\n` +
      `Present: ${data.attendance.present}\n` +
      `Absent: ${data.attendance.absent}\n` +
      `Percentage: ${data.attendance.percentage}%\n\n` +
      `Academic Summary:\n` +
      `Total Students: ${data.academic.totalStudents}\n` +
      `Passed: ${data.academic.passed}\n` +
      `Failed: ${data.academic.failed}\n` +
      `Average Score: ${data.academic.avgScore}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faculty_report_${type}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Faculty Reports</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-semester">Current Semester</option>
              <option value="last-semester">Last Semester</option>
            </select>
            <button
              onClick={() => exportReport(activeReportType)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{reportData.academic.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{reportData.attendance.percentage}%</div>
              <div className="text-sm text-gray-600">Avg Attendance</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">{reportData.academic.avgScore}</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-600">{reportData.subjects.length}</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'attendance', label: 'Attendance Report', icon: <Clock className="w-4 h-4" /> },
            { id: 'academic', label: 'Academic Performance', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'feedback', label: 'Student Feedback', icon: <Users className="w-4 h-4" /> },
            { id: 'analytics', label: 'Class Analytics', icon: <TrendingUp className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveReportType(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeReportType === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeReportType === 'attendance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Attendance Summary</h2>
              
              {/* Attendance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-600">{reportData.attendance.present}</div>
                  <div className="text-green-700">Present</div>
                  <div className="text-sm text-green-600 mt-2">
                    {((reportData.attendance.present / reportData.attendance.total) * 100).toFixed(1)}% of total
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-red-600">{reportData.attendance.absent}</div>
                  <div className="text-red-700">Absent</div>
                  <div className="text-sm text-red-600 mt-2">
                    {((reportData.attendance.absent / reportData.attendance.total) * 100).toFixed(1)}% of total
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600">{reportData.attendance.total}</div>
                  <div className="text-blue-700">Total Classes</div>
                  <div className="text-sm text-blue-600 mt-2">Across all subjects</div>
                </div>
              </div>

              {/* Subject-wise Attendance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
                <div className="space-y-4">
                  {reportData.subjects.map(subject => (
                    <div key={subject.code} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">{subject.name} ({subject.code})</h4>
                          <p className="text-sm text-gray-600">{subject.students} students</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{subject.avgAttendance}%</div>
                          <div className="text-sm text-gray-600">Average</div>
                        </div>
                      </div>
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${subject.avgAttendance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeReportType === 'academic' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Academic Performance</h2>
              
              {/* Performance Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pass/Fail Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600">Passed</span>
                      <span className="font-medium">{reportData.academic.passed} ({((reportData.academic.passed / reportData.academic.totalStudents) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600">Failed</span>
                      <span className="font-medium">{reportData.academic.failed} ({((reportData.academic.failed / reportData.academic.totalStudents) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
                  <div className="space-y-3">
                    {studentPerformance.map((range, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-4 h-4 ${range.color} rounded`}></div>
                        <span className="text-sm text-gray-600 flex-1">{range.range}</span>
                        <span className="font-medium">{range.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Subject</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Students</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Avg Score</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Attendance</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reportData.subjects.map(subject => (
                        <tr key={subject.code} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-600">{subject.code}</div>
                          </td>
                          <td className="px-6 py-4 text-center">{subject.students}</td>
                          <td className="px-6 py-4 text-center font-medium">{subject.avgScore}</td>
                          <td className="px-6 py-4 text-center">{subject.avgAttendance}%</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              subject.avgScore >= 80 ? 'bg-green-100 text-green-800' :
                              subject.avgScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {subject.avgScore >= 80 ? 'Excellent' :
                               subject.avgScore >= 70 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeReportType === 'feedback' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Student Feedback Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-green-600">4.2/5</div>
                  <div className="text-green-700">Overall Rating</div>
                  <div className="text-sm text-green-600 mt-2">Based on 95 responses</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-600">92%</div>
                  <div className="text-blue-700">Positive Feedback</div>
                  <div className="text-sm text-blue-600 mt-2">Students satisfied</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="text-3xl font-bold text-purple-600">87%</div>
                  <div className="text-purple-700">Response Rate</div>
                  <div className="text-sm text-purple-600 mt-2">Out of 120 students</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Feedback Areas</h3>
                <div className="space-y-4">
                  {[
                    { area: 'Teaching Clarity', score: 4.3, max: 5 },
                    { area: 'Subject Knowledge', score: 4.5, max: 5 },
                    { area: 'Student Interaction', score: 4.1, max: 5 },
                    { area: 'Assignment Quality', score: 3.9, max: 5 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{item.area}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(item.score / item.max) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-blue-600">{item.score}/{item.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeReportType === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Class Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                  <div className="space-y-3">
                    {['August', 'September', 'October'].map((month, index) => (
                      <div key={month} className="flex justify-between items-center">
                        <span className="text-gray-600">{month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${85 - index * 3}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{85 - index * 3}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Engagement</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">78%</div>
                      <div className="text-sm text-gray-600">Average Engagement</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-green-600">High</div>
                        <div className="text-gray-600">35 students</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">Medium</div>
                        <div className="text-gray-600">50 students</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-yellow-800">Attendance Alert</div>
                      <div className="text-sm text-yellow-700">15 students have attendance below 75%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-blue-800">Performance Insight</div>
                      <div className="text-sm text-blue-700">CS302 students need additional support in complex queries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyReports;
