 // StudentAttendance.tsx - Updated without Period Section
import React, { useState, useMemo } from 'react';
import { Search, Download, Calendar, Users, BookOpen, Filter, Check, X, Clock, BarChart3 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: string;
  section: string;
  email: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Leave';
  subject: string;
}

const StudentAttendance: React.FC = () => {
  // Sample student data
  const [students] = useState<Student[]>([
    { id: '1', name: 'Arjun Kumar', rollNumber: 'CS101', department: 'Computer Science', semester: '3', section: 'A', email: 'arjun@college.edu' },
    { id: '2', name: 'Priya Sharma', rollNumber: 'CS102', department: 'Computer Science', semester: '3', section: 'A', email: 'priya@college.edu' },
    { id: '3', name: 'Rajesh Patel', rollNumber: 'CS103', department: 'Computer Science', semester: '3', section: 'A', email: 'rajesh@college.edu' },
    { id: '4', name: 'Sneha Reddy', rollNumber: 'ME101', department: 'Mechanical Engineering', semester: '2', section: 'B', email: 'sneha@college.edu' },
    { id: '5', name: 'Vikash Singh', rollNumber: 'EE101', department: 'Electrical Engineering', semester: '4', section: 'A', email: 'vikash@college.edu' }
  ]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'Computer Science',
    semester: '3',
    section: 'A',
    subject: 'Data Structures',
    date: new Date().toISOString().split('T')[0]
  });

  // Filter options
  const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Information Technology'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const sections = ['A', 'B', 'C', 'D'];
  const subjects = ['Data Structures', 'Mathematics', 'Physics', 'Chemistry', 'Thermodynamics', 'Circuit Analysis'];

  // Filtered students based on current filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = student.department === filters.department;
      const matchesSemester = student.semester === filters.semester;
      const matchesSection = student.section === filters.section;
      return matchesSearch && matchesDepartment && matchesSemester && matchesSection;
    });
  }, [students, searchTerm, filters]);

  // Update attendance for a student
  const updateAttendance = (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
    setAttendance(prev => {
      const existingIndex = prev.findIndex(record => 
        record.studentId === studentId && 
        record.date === filters.date && 
        record.subject === filters.subject
      );

      const newRecord: AttendanceRecord = {
        studentId,
        date: filters.date,
        status,
        subject: filters.subject
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newRecord;
        return updated;
      } else {
        return [...prev, newRecord];
      }
    });
  };

  // Get attendance status for a student
  const getAttendanceStatus = (studentId: string) => {
    const record = attendance.find(record => 
      record.studentId === studentId && 
      record.date === filters.date && 
      record.subject === filters.subject
    );
    return record?.status || null;
  };

  // Bulk attendance actions
  const markAllPresent = () => {
    filteredStudents.forEach(student => updateAttendance(student.id, 'Present'));
  };

  const markAllAbsent = () => {
    filteredStudents.forEach(student => updateAttendance(student.id, 'Absent'));
  };

  // Calculate attendance statistics
  const attendanceStats = useMemo(() => {
    const currentDayAttendance = attendance.filter(record => 
      record.date === filters.date && 
      record.subject === filters.subject
    );

    const present = currentDayAttendance.filter(record => record.status === 'Present').length;
    const absent = currentDayAttendance.filter(record => record.status === 'Absent').length;
    const leave = currentDayAttendance.filter(record => record.status === 'Leave').length;
    const total = filteredStudents.length;
    const marked = currentDayAttendance.length;

    return { present, absent, leave, total, marked };
  }, [attendance, filters, filteredStudents]);

  // Export attendance data
  const exportAttendance = () => {
    const currentAttendance = filteredStudents.map(student => {
      const status = getAttendanceStatus(student.id) || 'Not Marked';
      return {
        'Roll Number': student.rollNumber,
        'Name': student.name,
        'Department': student.department,
        'Semester': student.semester,
        'Section': student.section,
        'Status': status,
        'Date': filters.date,
        'Subject': filters.subject
      };
    });

    const csvContent = [
      Object.keys(currentAttendance[0]).join(','),
      ...currentAttendance.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${filters.date}_${filters.subject}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Attendance</h1>
              <p className="text-gray-600">Mark and track student attendance efficiently</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportAttendance}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select
              value={filters.semester}
              onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={markAllPresent}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark All Present
            </button>
            <button
              onClick={markAllAbsent}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" />
              Mark All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.total}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Check className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <X className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{attendanceStats.leave}</div>
              <div className="text-sm text-gray-600">On Leave</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {attendanceStats.total > 0 ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {filters.subject}
              </h2>
              <p className="text-gray-600">
                {filters.department} | Semester {filters.semester} | Section {filters.section} | {new Date(filters.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {attendanceStats.marked} of {attendanceStats.total} marked
            </div>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No students found matching the current filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Student Name</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Present</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Absent</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Leave</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => updateAttendance(student.id, 'Present')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Present' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 hover:bg-green-100 text-gray-600'
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => updateAttendance(student.id, 'Absent')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 hover:bg-red-100 text-gray-600'
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => updateAttendance(student.id, 'Leave')}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Leave' 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-gray-100 hover:bg-yellow-100 text-gray-600'
                          }`}
                        >
                          <Clock className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {status ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            status === 'Present' ? 'bg-green-100 text-green-800' :
                            status === 'Absent' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {status}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Not Marked</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
