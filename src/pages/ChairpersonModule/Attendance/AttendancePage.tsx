import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import { mockStudents, mockCourses, mockAttendance, AttendanceRecord } from '../../data/mockData';

const AttendancePage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: 'Present' | 'Absent' | 'Late' }>({});
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendance);
  const [showTakeAttendance, setShowTakeAttendance] = useState(false);

  const handleTakeAttendance = () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }
    setShowTakeAttendance(true);
    
    // Initialize attendance data for all students in the course
    const courseStudents = getStudentsForCourse(selectedCourse);
    const initialData: { [key: string]: 'Present' | 'Absent' | 'Late' } = {};
    courseStudents.forEach(student => {
      initialData[student.id] = 'Present';
    });
    setAttendanceData(initialData);
  };

  const getStudentsForCourse = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return [];
    
    return mockStudents.filter(student => 
      student.department === course.department && 
      student.year === course.year
    );
  };

  const handleAttendanceChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    const newRecords: AttendanceRecord[] = Object.entries(attendanceData).map(([studentId, status]) => ({
      id: `ATT${Date.now()}_${studentId}`,
      studentId,
      courseId: selectedCourse,
      date: selectedDate,
      status,
      markedBy: 'FAC001', // Current faculty ID
    }));

    setAttendanceRecords(prev => [...prev, ...newRecords]);
    setShowTakeAttendance(false);
    setAttendanceData({});
    alert('Attendance submitted successfully!');
  };

  const getAttendanceStats = () => {
    const totalRecords = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
    const absentCount = attendanceRecords.filter(r => r.status === 'Absent').length;
    const lateCount = attendanceRecords.filter(r => r.status === 'Late').length;

    return {
      total: totalRecords,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      percentage: totalRecords > 0 ? ((presentCount + lateCount) / totalRecords * 100).toFixed(1) : '0'
    };
  };

  const stats = getAttendanceStats();

  const getAttendanceForStudent = (studentId: string) => {
    const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
    const totalClasses = studentRecords.length;
    const presentClasses = studentRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
    
    return {
      total: totalClasses,
      present: presentClasses,
      percentage: totalClasses > 0 ? (presentClasses / totalClasses * 100).toFixed(1) : '0'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage student attendance
          </p>
        </div>
        <button
          onClick={handleTakeAttendance}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Take Attendance</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Records</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Present</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.present}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Absent</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.absent}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.percentage}%</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Course and Date</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleTakeAttendance}
              disabled={!selectedCourse}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Take Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Take Attendance Form */}
      {showTakeAttendance && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Mark Attendance - {mockCourses.find(c => c.id === selectedCourse)?.name}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Date: {selectedDate}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {getStudentsForCourse(selectedCourse).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.rollNumber} • {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {(['Present', 'Absent', 'Late'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleAttendanceChange(student.id, status)}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          attendanceData[student.id] === status
                            ? status === 'Present' ? 'bg-green-600 text-white' :
                              status === 'Absent' ? 'bg-red-600 text-white' :
                              'bg-yellow-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTakeAttendance(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAttendance}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Submit Attendance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Attendance Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Student Attendance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {mockStudents.map((student) => {
              const attendance = getAttendanceForStudent(student.id);
              return (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.rollNumber} • {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {attendance.percentage}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attendance.present}/{attendance.total} classes
                    </p>
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          parseFloat(attendance.percentage) >= 90 ? 'bg-green-500' :
                          parseFloat(attendance.percentage) >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${attendance.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Attendance Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Marked By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {attendanceRecords.slice(-10).reverse().map((record) => {
                const student = mockStudents.find(s => s.id === record.studentId);
                const course = mockCourses.find(c => c.id === record.courseId);
                return (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {student ? `${student.firstName} ${student.lastName}` : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {course ? course.name : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{record.markedBy}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;