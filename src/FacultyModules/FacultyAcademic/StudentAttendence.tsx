 // FacultyStudentAttendance.tsx
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Calendar, 
  Users, 
  BookOpen, 
  Check, 
  X, 
  Clock, 
  BarChart3,
  Filter,
  Plus,
  Eye,
  Edit,
  Smartphone,
  Wifi
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent' | 'Leave';
  markedAt: string;
  location?: string;
}

interface FacultyClass {
  id: string;
  subject: string;
  class: string;
  section: string;
  totalStudents: number;
  schedule: string;
  room: string;
}

interface AttendanceSession {
  id: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  startTime: string;
  endTime?: string;
  isActive: boolean;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
}

const FacultyStudentAttendance: React.FC = () => {
  // Faculty information (would come from context/auth)
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering'
  };

  // Faculty's assigned classes
  const [facultyClasses] = useState<FacultyClass[]>([
    {
      id: '1',
      subject: 'Data Structures',
      class: 'BTech CSE',
      section: 'A',
      totalStudents: 60,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Room 204'
    },
    {
      id: '2',
      subject: 'Algorithms',
      class: 'BTech CSE',
      section: 'B',
      totalStudents: 58,
      schedule: 'Tue, Thu - 11:00 AM',
      room: 'Room 205'
    },
    {
      id: '3',
      subject: 'Database Systems',
      class: 'BTech CSE',
      section: 'A',
      totalStudents: 60,
      schedule: 'Mon, Wed - 02:00 PM',
      room: 'Room 301'
    }
  ]);

  // Students data for selected class
  const [students] = useState<Student[]>([
    { id: '1', name: 'Arjun Kumar', rollNumber: 'CS101', class: 'BTech CSE', section: 'A', email: 'arjun@college.edu', phone: '9876543210' },
    { id: '2', name: 'Priya Sharma', rollNumber: 'CS102', class: 'BTech CSE', section: 'A', email: 'priya@college.edu', phone: '9876543211' },
    { id: '3', name: 'Rajesh Patel', rollNumber: 'CS103', class: 'BTech CSE', section: 'A', email: 'rajesh@college.edu', phone: '9876543212' },
    { id: '4', name: 'Sneha Reddy', rollNumber: 'CS104', class: 'BTech CSE', section: 'A', email: 'sneha@college.edu', phone: '9876543213' },
    { id: '5', name: 'Vikash Singh', rollNumber: 'CS105', class: 'BTech CSE', section: 'A', email: 'vikash@college.edu', phone: '9876543214' }
  ]);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(null);
  
  const [selectedClass, setSelectedClass] = useState<FacultyClass | null>(facultyClasses[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'mark' | 'view' | 'analytics'>('mark');
  const [bulkAction, setBulkAction] = useState<'none' | 'present' | 'absent'>('none');

  // Filter students for selected class
  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    
    return students.filter(student => {
      const matchesClass = student.class === selectedClass.class && student.section === selectedClass.section;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [students, selectedClass, searchTerm]);

  // Get attendance for selected date and class
  const todaysAttendance = useMemo(() => {
    if (!selectedClass) return [];
    
    return attendance.filter(record => 
      record.date === selectedDate && 
      record.subject === selectedClass.subject &&
      record.class === selectedClass.class &&
      record.section === selectedClass.section
    );
  }, [attendance, selectedDate, selectedClass]);

  // Start attendance session
  const startAttendanceSession = () => {
    if (!selectedClass) return;

    const session: AttendanceSession = {
      id: Date.now().toString(),
      date: selectedDate,
      subject: selectedClass.subject,
      class: selectedClass.class,
      section: selectedClass.section,
      startTime: new Date().toISOString(),
      isActive: true,
      totalStudents: filteredStudents.length,
      presentCount: 0,
      absentCount: 0
    };

    setActiveSession(session);
  };

  // End attendance session
  const endAttendanceSession = () => {
    if (!activeSession) return;

    setActiveSession(prev => prev ? {
      ...prev,
      endTime: new Date().toISOString(),
      isActive: false
    } : null);

    // Here you would save session data to backend
    setTimeout(() => setActiveSession(null), 2000);
  };

  // Mark individual attendance
  const markAttendance = (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
    if (!selectedClass) return;

    const existingRecord = attendance.find(record => 
      record.studentId === studentId && 
      record.date === selectedDate &&
      record.subject === selectedClass.subject
    );

    const newRecord: AttendanceRecord = {
      studentId,
      date: selectedDate,
      subject: selectedClass.subject,
      class: selectedClass.class,
      section: selectedClass.section,
      status,
      markedAt: new Date().toISOString(),
      location: 'Classroom'
    };

    if (existingRecord) {
      setAttendance(prev => prev.map(record => 
        record.studentId === studentId && 
        record.date === selectedDate &&
        record.subject === selectedClass.subject
          ? newRecord 
          : record
      ));
    } else {
      setAttendance(prev => [...prev, newRecord]);
    }

    // Update active session counts
    if (activeSession) {
      const updatedAttendance = attendance.map(record => 
        record.studentId === studentId && 
        record.date === selectedDate &&
        record.subject === selectedClass.subject
          ? newRecord 
          : record
      );
      
      if (!existingRecord) {
        updatedAttendance.push(newRecord);
      }

      const presentCount = updatedAttendance.filter(record => 
        record.date === selectedDate &&
        record.subject === selectedClass.subject &&
        record.status === 'Present'
      ).length;

      const absentCount = updatedAttendance.filter(record => 
        record.date === selectedDate &&
        record.subject === selectedClass.subject &&
        record.status === 'Absent'
      ).length;

      setActiveSession(prev => prev ? {
        ...prev,
        presentCount,
        absentCount
      } : null);
    }
  };

  // Bulk mark attendance
  const bulkMarkAttendance = (status: 'Present' | 'Absent') => {
    filteredStudents.forEach(student => {
      markAttendance(student.id, status);
    });
    setBulkAction('none');
  };

  // Get student attendance status
  const getAttendanceStatus = (studentId: string) => {
    const record = todaysAttendance.find(record => record.studentId === studentId);
    return record?.status || null;
  };

  // Calculate attendance statistics
  const attendanceStats = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const present = todaysAttendance.filter(record => record.status === 'Present').length;
    const absent = todaysAttendance.filter(record => record.status === 'Absent').length;
    const leave = todaysAttendance.filter(record => record.status === 'Leave').length;
    const unmarked = totalStudents - (present + absent + leave);
    const percentage = totalStudents > 0 ? Math.round((present / totalStudents) * 100) : 0;

    return { totalStudents, present, absent, leave, unmarked, percentage };
  }, [filteredStudents, todaysAttendance]);

  // Export attendance
  const exportAttendance = () => {
    if (!selectedClass) return;

    const csvData = filteredStudents.map(student => {
      const status = getAttendanceStatus(student.id) || 'Not Marked';
      return {
        'Roll Number': student.rollNumber,
        'Name': student.name,
        'Class': student.class,
        'Section': student.section,
        'Subject': selectedClass.subject,
        'Date': selectedDate,
        'Status': status,
        'Email': student.email,
        'Phone': student.phone
      };
    });

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedClass.subject}_${selectedDate}.csv`;
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
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {activeSession && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Session Active
              </div>
            )}
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

      {/* Navigation and Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Class Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class & Subject</label>
            <select
              value={selectedClass?.id || ''}
              onChange={(e) => {
                const classItem = facultyClasses.find(c => c.id === e.target.value);
                setSelectedClass(classItem || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {facultyClasses.map(classItem => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.subject} - {classItem.class} {classItem.section} ({classItem.totalStudents} students)
                </option>
              ))}
            </select>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mark">Mark Attendance</option>
              <option value="view">View Attendance</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>
        </div>

        {/* Search and Actions */}
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

          {viewMode === 'mark' && (
            <div className="flex gap-2">
              {!activeSession ? (
                <button
                  onClick={startAttendanceSession}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Start Session
                </button>
              ) : (
                <button
                  onClick={endAttendanceSession}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  End Session
                </button>
              )}
              
              <button
                onClick={() => bulkMarkAttendance('Present')}
                className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" />
                All Present
              </button>
              <button
                onClick={() => bulkMarkAttendance('Absent')}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                All Absent
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.totalStudents}</div>
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
              <div className="text-2xl font-bold text-purple-600">{attendanceStats.percentage}%</div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedClass?.subject} - {selectedClass?.class} {selectedClass?.section}
              </h2>
              <p className="text-gray-600">
                {new Date(selectedDate).toLocaleDateString()} • {selectedClass?.room}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {attendanceStats.present + attendanceStats.absent + attendanceStats.leave} of {attendanceStats.totalStudents} marked
            </div>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No students found for the selected class</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Student Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Contact</th>
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Smartphone className="w-4 h-4" />
                          {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => markAttendance(student.id, 'Present')}
                          disabled={viewMode !== 'mark'}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Present' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 hover:bg-green-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => markAttendance(student.id, 'Absent')}
                          disabled={viewMode !== 'mark'}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 hover:bg-red-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => markAttendance(student.id, 'Leave')}
                          disabled={viewMode !== 'mark'}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Leave' 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-gray-100 hover:bg-yellow-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed`}
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

      {/* Active Session Info */}
      {activeSession && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-green-200 p-6 max-w-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-900">Active Session</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>{activeSession.subject} - {activeSession.class} {activeSession.section}</div>
            <div>Started: {new Date(activeSession.startTime).toLocaleTimeString()}</div>
            <div>Present: {activeSession.presentCount} | Absent: {activeSession.absentCount}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyStudentAttendance;
