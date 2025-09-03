 // Reports.tsx - Fixed Version
import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, FileText, BarChart3, Users, BookOpen, Calendar, TrendingUp, Eye, Printer } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  cgpa: number;
  attendance: number;
  status: 'active' | 'inactive';
}

interface FacultyReport {
  id: string;
  name: string;
  department: string;
  subjects: string[];
  rating: number;
  classesCompleted: number;
  totalClasses: number;
}

interface DepartmentReport {
  department: string;
  totalStudents: number;
  avgCGPA: number;
  avgAttendance: number;
  passPercentage: number;
  placementRate: number;
}

const AcademicReports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'student' | 'faculty' | 'department' | 'attendance' | 'performance'>('student');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');

  // Sample Data
  const students: Student[] = [
    { id: '1', name: 'Arjun Kumar', rollNumber: '2021CSE101', department: 'Computer Science', semester: 6, cgpa: 8.5, attendance: 92, status: 'active' },
    { id: '2', name: 'Priya Sharma', rollNumber: '2021ME102', department: 'Mechanical Engineering', semester: 6, cgpa: 7.8, attendance: 88, status: 'active' },
    { id: '3', name: 'Rajesh Patel', rollNumber: '2021EE103', department: 'Electrical Engineering', semester: 4, cgpa: 9.1, attendance: 95, status: 'active' },
    { id: '4', name: 'Sneha Reddy', rollNumber: '2021IT104', department: 'Information Technology', semester: 8, cgpa: 8.9, attendance: 90, status: 'active' },
    { id: '5', name: 'Vikash Singh', rollNumber: '2021CE105', department: 'Civil Engineering', semester: 2, cgpa: 7.2, attendance: 85, status: 'active' }
  ];

  const faculty: FacultyReport[] = [
    { id: '1', name: 'Dr. Rajesh Kumar', department: 'Computer Science', subjects: ['Data Structures', 'Algorithms'], rating: 4.5, classesCompleted: 45, totalClasses: 50 },
    { id: '2', name: 'Prof. Priya Sharma', department: 'Mechanical Engineering', subjects: ['Thermodynamics', 'Heat Transfer'], rating: 4.7, classesCompleted: 38, totalClasses: 40 },
    { id: '3', name: 'Dr. Amit Patel', department: 'Electrical Engineering', subjects: ['Circuit Analysis', 'Power Systems'], rating: 4.3, classesCompleted: 42, totalClasses: 45 }
  ];

  const departments: DepartmentReport[] = [
    { department: 'Computer Science', totalStudents: 240, avgCGPA: 8.2, avgAttendance: 89, passPercentage: 94, placementRate: 85 },
    { department: 'Mechanical Engineering', totalStudents: 200, avgCGPA: 7.8, avgAttendance: 87, passPercentage: 91, placementRate: 78 },
    { department: 'Electrical Engineering', totalStudents: 180, avgCGPA: 8.0, avgAttendance: 90, passPercentage: 93, placementRate: 82 },
    { department: 'Information Technology', totalStudents: 160, avgCGPA: 8.4, avgAttendance: 88, passPercentage: 95, placementRate: 88 },
    { department: 'Civil Engineering', totalStudents: 120, avgCGPA: 7.5, avgAttendance: 85, passPercentage: 89, placementRate: 72 }
  ];

  // Filtered Data
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment;
      const matchesSemester = filterSemester === 'all' || student.semester.toString() === filterSemester;
      return matchesSearch && matchesDepartment && matchesSemester;
    });
  }, [students, searchTerm, filterDepartment, filterSemester]);

  // Export Function
  const handleExport = (reportType: string) => {
    const data = getReportData(reportType);
    const csvContent = generateCSV(data);
    downloadCSV(csvContent, `${reportType}_report.csv`);
  };

  const getReportData = (reportType: string) => {
    switch (reportType) {
      case 'student': return filteredStudents;
      case 'faculty': return faculty;
      case 'department': return departments;
      default: return [];
    }
  };

  const generateCSV = (data: any[]) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-600 bg-green-100';
    if (cgpa >= 8) return 'text-blue-600 bg-blue-100';
    if (cgpa >= 7) return 'text-yellow-600 bg-yellow-100';
    if (cgpa >= 6) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-blue-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Reports</h1>
            <p className="text-gray-600">Comprehensive academic performance and analytics</p>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'student', label: 'Student Reports', icon: Users },
            { id: 'faculty', label: 'Faculty Reports', icon: Users },
            { id: 'department', label: 'Department Reports', icon: BookOpen },
            { id: 'attendance', label: 'Attendance Reports', icon: Calendar },
            { id: 'performance', label: 'Performance Analytics', icon: TrendingUp }
          ].map(report => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeReport === report.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <report.icon className="w-4 h-4" />
              {report.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students, faculty, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>

          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map(sem => (
              <option key={sem} value={sem.toString()}>Semester {sem}</option>
            ))}
          </select>

          <button
            onClick={() => handleExport(activeReport)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Student Reports */}
      {activeReport === 'student' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Student Performance Report</h2>
            <p className="text-gray-600">Detailed academic performance of students</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Student Details</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Semester</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">CGPA</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Attendance</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">Semester {student.semester}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(student.cgpa)}`}>
                        {student.cgpa.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Reports */}
      {activeReport === 'attendance' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">89.2%</div>
              <div className="text-gray-600">Overall Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">756</div>
              <div className="text-gray-600">Regular Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">124</div>
              <div className="text-gray-600">Below 75%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">20</div>
              <div className="text-gray-600">Critical (&lt;60%)</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Department-wise Attendance</h3>
            {departments.map(dept => (
              <div key={dept.department} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{dept.department}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dept.avgAttendance >= 90 ? 'bg-green-500' :
                        dept.avgAttendance >= 80 ? 'bg-blue-500' :
                        dept.avgAttendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dept.avgAttendance}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-gray-700 w-12">{dept.avgAttendance}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Analytics */}
      {activeReport === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CGPA Distribution</h3>
              <div className="space-y-3">
                {[
                  { range: '9.0 - 10.0', count: 45, percentage: 15 },
                  { range: '8.0 - 8.9', count: 120, percentage: 40 },
                  { range: '7.0 - 7.9', count: 90, percentage: 30 },
                  { range: '6.0 - 6.9', count: 30, percentage: 10 },
                  { range: 'Below 6.0', count: 15, percentage: 5 }
                ].map(item => (
                  <div key={item.range} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.range}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${item.percentage * 2}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
              <div className="space-y-4">
                {departments.map(dept => (
                  <div key={dept.department} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{dept.department}</span>
                      <span className="text-lg font-bold text-blue-600">{dept.avgCGPA.toFixed(1)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Students: {dept.totalStudents} | Pass Rate: {dept.passPercentage}%
                    </div>
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

export default AcademicReports;
