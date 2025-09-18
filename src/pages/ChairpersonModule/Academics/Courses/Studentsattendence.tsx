import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Users, BookOpen, Filter, AlertCircle } from 'lucide-react';

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
  id: string;
  studentId: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent' | 'Leave';
  markedAt: string;
  location: string;
}

interface Timetable {
  id: string;
  subject: string;
  class: string;
  section: string;
  facultyId: string;
  schedule: string;
  room: string;
  totalStudents: number;
  startTime: string;
  endTime: string;
  days: string[];
}

interface AttendanceData {
  student: Student;
  status: 'Present' | 'Absent' | 'Leave' | 'Not Marked';
  markedAt?: string;
}

const StudentsAttendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize filters with proper defaults
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    class: 'BTech CSE',
    section: 'A',
    subject: 'Data Structures'
  });

  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  // Fetch data from API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching data from APIs...');

        // Fetch all data in parallel
        const [studentsRes, attendanceRes, timetablesRes] = await Promise.all([
          axios.get('http://localhost:3001/students'),
          axios.get('http://localhost:3001/attendance'),
          axios.get('http://localhost:3001/timetables')
        ]);
        
        console.log('Students fetched:', studentsRes.data);
        console.log('Attendance fetched:', attendanceRes.data);
        console.log('Timetables fetched:', timetablesRes.data);

        setStudents(studentsRes.data || []);
        setAttendance(attendanceRes.data || []);
        setTimetables(timetablesRes.data || []);

        // Set default filters based on available data
        if (studentsRes.data && studentsRes.data.length > 0) {
          const firstStudent = studentsRes.data[0];
          setFilters(prev => ({
            ...prev,
            class: firstStudent.class,
            section: firstStudent.section
          }));
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please ensure the server is running on localhost:3001');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update subject filter when class/section changes
  useEffect(() => {
    if (timetables.length > 0) {
      const availableSubjects = getSubjectsForClass();
      if (availableSubjects.length > 0 && !availableSubjects.includes(filters.subject)) {
        setFilters(prev => ({
          ...prev,
          subject: availableSubjects[0]
        }));
      }
    }
  }, [filters.class, filters.section, timetables]);

  // Process attendance data when filters or data changes
  useEffect(() => {
    const processAttendanceData = () => {
      console.log('Processing attendance data with filters:', filters);
      
      // Filter students based on class and section
      const filteredStudents = students.filter(
        student => student.class === filters.class && student.section === filters.section
      );

      console.log('Filtered students:', filteredStudents);

      // Create attendance data for each student
      const processedData: AttendanceData[] = filteredStudents.map(student => {
        const attendanceRecord = attendance.find(
          record => 
            record.studentId === student.id &&
            record.date === filters.date &&
            record.subject === filters.subject &&
            record.class === filters.class &&
            record.section === filters.section
        );

        return {
          student,
          status: attendanceRecord ? attendanceRecord.status : 'Not Marked',
          markedAt: attendanceRecord?.markedAt
        };
      });

      console.log('Processed attendance data:', processedData);
      setAttendanceData(processedData);
    };

    if (students.length > 0) {
      processAttendanceData();
    } else {
      setAttendanceData([]);
    }
  }, [students, attendance, filters]);

  // Get unique subjects for the selected class and section
  const getSubjectsForClass = () => {
    const subjects = timetables
      .filter(tt => tt.class === filters.class && tt.section === filters.section)
      .map(tt => tt.subject);
    
    return [...new Set(subjects)];
  };

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(d => d.status === 'Present').length;
    const absent = attendanceData.filter(d => d.status === 'Absent').length;
    const leave = attendanceData.filter(d => d.status === 'Leave').length;
    const notMarked = attendanceData.filter(d => d.status === 'Not Marked').length;

    return { total, present, absent, leave, notMarked };
  };

  const stats = getAttendanceStats();

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Present':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Absent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Leave':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  };

  // Get unique classes and sections from students data
  const getClasses = () => {
    return [...new Set(students.map(s => s.class))];
  };

  const getSections = () => {
    return [...new Set(students.map(s => s.section))];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center bg-white p-8 rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">Error Loading Data</p>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        

        {/* Debug Info (remove in production) */}
        {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
          <div className="text-sm text-yellow-700">
            <p>Total Students in DB: {students.length}</p>
            <p>Total Attendance Records: {attendance.length}</p>
            <p>Total Timetable Entries: {timetables.length}</p>
            <p>Filtered Students: {attendanceData.length}</p>
            <p>Current Filters: {JSON.stringify(filters)}</p>
          </div>
        </div> */}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={filters.class}
                onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getClasses().map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <select
                value={filters.section}
                onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getSections().map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getSubjectsForClass().length > 0 ? (
                  getSubjectsForClass().map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))
                ) : (
                  <option value="">No subjects available</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-gray-600">Present</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-gray-600">Absent</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.leave}</div>
            <div className="text-sm text-gray-600">On Leave</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-500">{stats.notMarked}</div>
            <div className="text-sm text-gray-600">Not Marked</div>
          </div>
        </div>

        {/* Current Selection Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-blue-800">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">
              {filters.class} | Section {filters.section} | {filters.subject} | 
              {new Date(filters.date).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
          </div>

          {attendanceData.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-500">
                {students.length === 0 
                  ? "No students found in the database" 
                  : "No students found matching the current filters"
                }
              </p>
              {students.length > 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  Try changing the class or section filters
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marked At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((data, index) => (
                    <tr key={data.student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{data.student.name}</div>
                          <div className="text-sm text-gray-500">{data.student.class} - {data.student.section}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(data.status)}>
                          {data.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.markedAt ? new Date(data.markedAt).toLocaleString('en-IN') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsAttendance;
