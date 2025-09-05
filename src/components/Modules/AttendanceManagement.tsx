// AttendanceManagement.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  FileText,
  Plus,
  Filter,
  Download,
  Eye,
  Send,
  X,
  RefreshCw
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  subjectCode?: string;
  instructor: string;
  status: 'present' | 'absent' | 'late';
  timeIn?: string;
  timeOut?: string;
  classType: 'theory' | 'practical' | 'tutorial';
}

interface Subject {
  code: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  requiredPercentage: number;
}

interface LeaveApplication {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: 'medical' | 'personal' | 'emergency' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  comments?: string;
  attachments?: string[];
}

interface StudentInfo {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  department?: string;
  semester?: number;
}

const API_BASE = 'http://localhost:3001';

const AttendanceManagement: React.FC = () => {
  // State variables
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // UI state
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [newLeave, setNewLeave] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    type: 'personal' as LeaveApplication['type']
  });
  const [filterSubject, setFilterSubject] = useState('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'leave'>('overview');

  // Fetch data from API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch all data in parallel
        const [studentsRes, attendanceRes, usersRes, timetablesRes] = await Promise.all([
          fetch(`${API_BASE}/students`),
          fetch(`${API_BASE}/attendance`),
          fetch(`${API_BASE}/users`),
          fetch(`${API_BASE}/timetables`)
        ]);

        if (!studentsRes.ok || !attendanceRes.ok || !usersRes.ok || !timetablesRes.ok) {
          throw new Error('Failed to fetch data from server');
        }

        const studentsData = await studentsRes.json();
        const attendanceData = await attendanceRes.json();
        const usersData = await usersRes.json();
        const timetablesData = await timetablesRes.json();

        // Set student info (using first student as example)
        if (studentsData.length > 0) {
          const student = studentsData[0];
          setStudentInfo({
            ...student,
            department: student.class.includes('CSE') ? 'Computer Science Engineering' : 
                       student.class.includes('ECE') ? 'Electronics & Communication Engineering' : 
                       student.class.includes('ME') ? 'Mechanical Engineering' : 'Engineering',
            semester: 5
          });

          // Filter timetables for ONLY this student's class and section
          const studentTimetables = timetablesData.filter((timetable: any) => 
            timetable.class === student.class && timetable.section === student.section
          );

          // Filter attendance records for ONLY this student
          const studentAttendanceRecords = attendanceData.filter((record: any) => 
            record.studentId === student.id
          );

          // Transform attendance data
          const transformedAttendance: AttendanceRecord[] = studentAttendanceRecords.map((record: any) => {
            // Find corresponding timetable and faculty
            const timetable = studentTimetables.find((tt: any) => 
              tt.subject === record.subject && 
              tt.class === record.class && 
              tt.section === record.section
            );
            
            const faculty = timetable ? usersData.find((user: any) => user.id === timetable.facultyId) : null;
            
            return {
              id: record.id,
              date: record.date,
              subject: record.subject,
              subjectCode: timetable?.subjectCode || record.subject.split(' ').map((w: string) => w[0]).join('').toUpperCase(),
              instructor: faculty?.name || 'Unknown Faculty',
              status: record.status.toLowerCase() === 'present' ? 'present' : 
                     record.status.toLowerCase() === 'absent' ? 'absent' : 'late',
              timeIn: record.timeIn,
              timeOut: record.timeOut,
              classType: 'theory' as const
            };
          });

          setAttendanceRecords(transformedAttendance);

          // Calculate subjects with attendance statistics ONLY for this student's class/section
          const subjectMap = new Map<string, {
            name: string;
            code: string;
            totalClasses: number;
            attendedClasses: number;
          }>();

          // Initialize subjects from filtered timetables (only for this student's class/section)
          studentTimetables.forEach((timetable: any) => {
            const key = timetable.subject;
            if (!subjectMap.has(key)) {
              subjectMap.set(key, {
                name: timetable.subject,
                code: timetable.subjectCode || timetable.subject.split(' ').map((w: string) => w[0]).join('').toUpperCase(),
                totalClasses: 0,
                attendedClasses: 0
              });
            }
            // Count total classes (each timetable entry represents a class)
            subjectMap.get(key)!.totalClasses += 1;
          });

          // Count attended classes from attendance records (only for this student)
          transformedAttendance.forEach((record) => {
            const subject = subjectMap.get(record.subject);
            if (subject && (record.status === 'present' || record.status === 'late')) {
              subject.attendedClasses += 1;
            }
          });

          // Convert to subjects array with calculated percentages
          const subjectsArray: Subject[] = Array.from(subjectMap.entries()).map(([key, subject]) => ({
            code: subject.code,
            name: subject.name,
            totalClasses: subject.totalClasses,
            attendedClasses: subject.attendedClasses,
            percentage: subject.totalClasses > 0 ? (subject.attendedClasses / subject.totalClasses) * 100 : 0,
            requiredPercentage: 75
          }));

          setSubjects(subjectsArray);
        }

        // Initialize empty leave applications (can be extended later)
        setLeaveApplications([]);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please ensure the server is running on http://localhost:3001');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate overall statistics
  const overallStats = useMemo(() => {
    const totalClasses = subjects.reduce((sum, sub) => sum + sub.totalClasses, 0);
    const totalAttended = subjects.reduce((sum, sub) => sum + sub.attendedClasses, 0);
    const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
    const subjectsAtRisk = subjects.filter(sub => sub.percentage < sub.requiredPercentage).length;
    
    return {
      overallPercentage: Number(overallPercentage.toFixed(1)),
      totalClasses,
      totalAttended,
      subjectsAtRisk
    };
  }, [subjects]);

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    let filtered = attendanceRecords;
    
    if (filterSubject !== 'all') {
      filtered = filtered.filter(record => record.subjectCode === filterSubject);
    }
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [attendanceRecords, filterSubject]);

  // Event handlers
  const handleLeaveSubmit = () => {
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const leave: LeaveApplication = {
      id: `L${Date.now()}`,
      ...newLeave,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setLeaveApplications(prev => [leave, ...prev]);
    setNewLeave({ startDate: '', endDate: '', reason: '', type: 'personal' });
    setShowLeaveForm(false);
    alert('Leave application submitted successfully!');
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getLeaveStatusColor = (status: LeaveApplication['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getAttendanceColor = (percentage: number, required: number) => {
    if (percentage >= required + 10) return 'text-green-600';
    if (percentage >= required) return 'text-blue-600';
    if (percentage >= required - 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const downloadAttendanceReport = () => {
    // Create downloadable report
    const reportData = {
      student: studentInfo,
      overallStats,
      subjects,
      attendanceRecords: filteredRecords
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-report-${studentInfo?.rollNumber || 'student'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin text-blue-600" size={24} />
          <span className="text-lg text-gray-600">Loading attendance data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <div>
              {/* <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1> */}
              <div className="text-gray-600">
                <p className="text-3xl font-bold text-gray-900">{studentInfo?.name} </p>
                <div className="text-gray-600">Class: {studentInfo?.rollNumber}</div>
                <p>{studentInfo?.department} • Semester {studentInfo?.semester}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {studentInfo?.class} - Section {studentInfo?.section}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getAttendanceColor(overallStats.overallPercentage, 75)}`}>
              {overallStats.overallPercentage}%
            </div>
            <div className="text-sm text-gray-600">Overall Attendance</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{overallStats.overallPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Percentage</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{overallStats.totalAttended}</div>
              <div className="text-sm text-gray-600">Classes Attended</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{overallStats.totalClasses}</div>
              <div className="text-sm text-gray-600">Total Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{overallStats.subjectsAtRisk}</div>
              <div className="text-sm text-gray-600">Subjects at Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* Navigation Tabs and content sections identical to previous version */}
      
      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'detailed', label: 'Detailed Records', icon: <FileText className="w-4 h-4" /> },
            { id: 'leave', label: 'Leave Applications', icon: <Plus className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                viewMode === tab.id
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {viewMode === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Subject-wise Attendance - {studentInfo?.class} Section {studentInfo?.section}
                </h2>
                <button
                  onClick={downloadAttendanceReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>

              {subjects.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No subjects found for your class and section</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Showing data for: {studentInfo?.class} - Section {studentInfo?.section}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map(subject => (
                    <div key={subject.code} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-gray-600">{subject.code}</p>
                        </div>
                        <div className={`text-2xl font-bold ${getAttendanceColor(subject.percentage, subject.requiredPercentage)}`}>
                          {subject.percentage.toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Attended: {subject.attendedClasses}</span>
                          <span>Total: {subject.totalClasses}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              subject.percentage >= subject.requiredPercentage
                                ? 'bg-green-600'
                                : 'bg-red-600'
                            }`}
                            style={{ width: `${Math.min(subject.percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Required: {subject.requiredPercentage}%
                        </div>
                      </div>

                      {subject.percentage < subject.requiredPercentage && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">Below Required Percentage</span>
                          </div>
                          <p className="text-xs text-red-700 mt-1">
                            You need to attend {Math.ceil((subject.requiredPercentage * subject.totalClasses / 100) - subject.attendedClasses)} more classes to meet the requirement.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detailed Records Tab */}
          {viewMode === 'detailed' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Attendance Records
                </h2>
                <div className="flex gap-3">
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredRecords.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No attendance records found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Date</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Subject</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Instructor</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Class Type</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Time In</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Time Out</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.map(record => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div>
                              <div className="font-medium">{record.subject}</div>
                              <div className="text-sm text-gray-600">{record.subjectCode}</div>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">{record.instructor}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <span className="capitalize">{record.classType}</span>
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {record.timeIn || '-'}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {record.timeOut || '-'}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {getStatusIcon(record.status)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                                {record.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Leave Applications Tab */}
          {viewMode === 'leave' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Leave Applications</h2>
                <button
                  onClick={() => setShowLeaveForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Apply for Leave
                </button>
              </div>

              <div className="space-y-4">
                {leaveApplications.map(leave => (
                  <div key={leave.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize">{leave.type} Leave</h3>
                        <p className="text-gray-600">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLeaveStatusColor(leave.status)}`}>
                        {leave.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{leave.reason}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>Applied: {new Date(leave.appliedDate).toLocaleDateString()}</div>
                      {leave.approvedBy && <div>Approved by: {leave.approvedBy}</div>}
                      {leave.attachments && leave.attachments.length > 0 && (
                        <div>Attachments: {leave.attachments.length} file(s)</div>
                      )}
                    </div>

                    {leave.comments && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-1">Comments:</h4>
                        <p className="text-gray-700">{leave.comments}</p>
                      </div>
                    )}
                  </div>
                ))}

                {leaveApplications.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No leave applications found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Apply for Leave</h2>
                <button
                  onClick={() => setShowLeaveForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave(prev => ({ ...prev, startDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave(prev => ({ ...prev, endDate: e.target.value }))}
                    min={newLeave.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="personal">Personal</option>
                  <option value="medical">Medical</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                <textarea
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave(prev => ({ ...prev, reason: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Please provide detailed reason for your leave application..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowLeaveForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLeaveSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
