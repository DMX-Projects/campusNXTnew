import React, { useState } from 'react';
import { 
  CalendarIcon, 
  
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  
  DownloadIcon,
  BarChart3Icon,
  AlertTriangleIcon,
 
  BookOpenIcon
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  faculty: string;
  status: 'present' | 'absent' | 'late';
  timeIn?: string;
  timeOut?: string;
  duration?: number;
  classType: 'lecture' | 'lab' | 'tutorial';
  semester: string;
  totalClasses: number;
  attendedClasses: number;
  remarks?: string;
}

interface SubjectAttendance {
  subject: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  requiredPercentage: number;
  status: 'good' | 'warning' | 'critical';
  classesToAttend: number;
  maxAbsents: number;
  faculty: string;
}

const AttendanceStu: React.FC = () => {
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2025-09-03',
      subject: 'Data Structures',
      faculty: 'Dr. Rajesh Kumar',
      status: 'present',
      timeIn: '09:05',
      timeOut: '10:00',
      duration: 55,
      classType: 'lecture',
      semester: '3',
      totalClasses: 45,
      attendedClasses: 42,
      remarks: 'Active participation'
    },
    {
      id: '2',
      date: '2025-09-02',
      subject: 'Database Management',
      faculty: 'Prof. Priya Sharma',
      status: 'absent',
      classType: 'lab',
      semester: '3',
      totalClasses: 30,
      attendedClasses: 25,
      remarks: 'Medical leave'
    },
    {
      id: '3',
      date: '2025-09-01',
      subject: 'Operating Systems',
      faculty: 'Dr. Amit Singh',
      status: 'late',
      timeIn: '11:35',
      timeOut: '12:30',
      duration: 55,
      classType: 'lecture',
      semester: '3',
      totalClasses: 40,
      attendedClasses: 38
    }
  ]);

  const [subjectAttendance] = useState<SubjectAttendance[]>([
    {
      subject: 'Data Structures',
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93.33,
      requiredPercentage: 75,
      status: 'good',
      classesToAttend: 0,
      maxAbsents: 11,
      faculty: 'Dr. Rajesh Kumar'
    },
    {
      subject: 'Database Management',
      totalClasses: 30,
      attendedClasses: 25,
      percentage: 83.33,
      requiredPercentage: 75,
      status: 'good',
      classesToAttend: 0,
      maxAbsents: 7,
      faculty: 'Prof. Priya Sharma'
    },
    {
      subject: 'Operating Systems',
      totalClasses: 40,
      attendedClasses: 38,
      percentage: 95.00,
      requiredPercentage: 75,
      status: 'good',
      classesToAttend: 0,
      maxAbsents: 10,
      faculty: 'Dr. Amit Singh'
    },
    {
      subject: 'Software Engineering',
      totalClasses: 35,
      attendedClasses: 26,
      percentage: 74.28,
      requiredPercentage: 75,
      status: 'warning',
      classesToAttend: 2,
      maxAbsents: 8,
      faculty: 'Prof. Neha Gupta'
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [viewMode, setViewMode] = useState<'summary' | 'detailed' | 'calendar'>('summary');

  const getStatusColor = (status: string) => {
    const colors = {
      present: 'bg-green-100 text-green-800 border-green-200',
      absent: 'bg-red-100 text-red-800 border-red-200',
      late: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getAttendanceStatusColor = (status: string) => {
    const colors = {
      good: 'text-green-600',
      warning: 'text-yellow-600',
      critical: 'text-red-600'
    };
    return colors[status as keyof typeof colors];
  };

  const calculateOverallStats = () => {
    const totalClasses = subjectAttendance.reduce((sum, sub) => sum + sub.totalClasses, 0);
    const totalAttended = subjectAttendance.reduce((sum, sub) => sum + sub.attendedClasses, 0);
    const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;
    
    return {
      totalClasses,
      totalAttended,
      overallPercentage: overallPercentage.toFixed(2),
      totalAbsent: totalClasses - totalAttended,
      criticalSubjects: subjectAttendance.filter(sub => sub.status === 'critical').length,
      warningSubjects: subjectAttendance.filter(sub => sub.status === 'warning').length
    };
  };

  const exportAttendance = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Subject,Faculty,Status,Time In,Time Out,Duration,Type,Remarks\n" +
      attendanceRecords.map(record => 
        `"${record.date}","${record.subject}","${record.faculty}","${record.status}","${record.timeIn || ''}","${record.timeOut || ''}","${record.duration || ''}","${record.classType}","${record.remarks || ''}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = selectedSubject === 'all' 
    ? attendanceRecords 
    : attendanceRecords.filter(record => record.subject === selectedSubject);

  const stats = calculateOverallStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
              <p className="text-gray-600 mt-1">Track your class attendance and maintain academic requirements</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportAttendance}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export Report
              </button>
              <button
                onClick={() => alert('Attendance summary sent to your email!')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Email Summary
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              {subjectAttendance.map(subject => (
                <option key={subject.subject} value={subject.subject}>{subject.subject}</option>
              ))}
            </select>
            
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="semester">This Semester</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('summary')}
                className={`px-4 py-2 ${viewMode === 'summary' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 ${viewMode === 'detailed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Detailed
              </button>
              {/* <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Calendar
              </button> */}
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Overall %</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.overallPercentage}%</p>
                </div>
                <BarChart3Icon className="text-blue-600" size={24} />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Present</p>
                  <p className="text-2xl font-bold text-green-900">{stats.totalAttended}</p>
                </div>
                <CheckCircleIcon className="text-green-600" size={24} />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Absent</p>
                  <p className="text-2xl font-bold text-red-900">{stats.totalAbsent}</p>
                </div>
                <XCircleIcon className="text-red-600" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
                </div>
                <BookOpenIcon className="text-gray-600" size={24} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.warningSubjects}</p>
                </div>
                <AlertTriangleIcon className="text-yellow-600" size={24} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Critical</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.criticalSubjects}</p>
                </div>
                <AlertTriangleIcon className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {stats.warningSubjects > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangleIcon className="text-yellow-600" size={24} />
              <div>
                <h3 className="font-semibold text-yellow-900">Attendance Warning</h3>
                <p className="text-yellow-800">
                  You have {stats.warningSubjects} subject(s) with low attendance. Attend more classes to meet the minimum requirement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content based on view mode */}
        {viewMode === 'summary' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Attendance Summary</h2>
              <div className="space-y-4">
                {subjectAttendance.map(subject => (
                  <div key={subject.subject} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
                        <p className="text-gray-600">{subject.faculty}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getAttendanceStatusColor(subject.status)}`}>
                          {subject.percentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {subject.attendedClasses}/{subject.totalClasses} classes
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Attendance Progress</span>
                        <span>Required: {subject.requiredPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            subject.percentage >= subject.requiredPercentage 
                              ? 'bg-green-500' 
                              : subject.percentage >= subject.requiredPercentage - 5 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(subject.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span className="font-medium">{subject.requiredPercentage}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className={`font-semibold capitalize ${getAttendanceStatusColor(subject.status)}`}>
                          {subject.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Classes to Attend</p>
                        <p className="font-semibold text-gray-900">
                          {subject.classesToAttend > 0 ? subject.classesToAttend : 'None'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Max Absents Allowed</p>
                        <p className="font-semibold text-gray-900">{subject.maxAbsents}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Absents Used</p>
                        <p className="font-semibold text-gray-900">
                          {subject.totalClasses - subject.attendedClasses}/{subject.maxAbsents}
                        </p>
                      </div>
                    </div>
                    
                    {subject.status === 'warning' && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm">
                          <strong>Action Required:</strong> Attend the next {subject.classesToAttend} classes to meet minimum attendance requirement.
                        </p>
                      </div>
                    )}
                    
                    {subject.status === 'critical' && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 text-sm">
                          <strong>Critical:</strong> You've exceeded the maximum allowed absents. Contact your faculty immediately.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'detailed' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Attendance Records</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Date</th>
                      <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                      <th className="text-left p-3 font-medium text-gray-900">Faculty</th>
                      <th className="text-left p-3 font-medium text-gray-900">Type</th>
                      <th className="text-left p-3 font-medium text-gray-900">Status</th>
                      <th className="text-left p-3 font-medium text-gray-900">Time</th>
                      <th className="text-left p-3 font-medium text-gray-900">Duration</th>
                      <th className="text-left p-3 font-medium text-gray-900">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map(record => (
                      <tr key={record.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3 text-gray-700">{record.date}</td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{record.subject}</div>
                            <div className="text-sm text-gray-500">Sem {record.semester}</div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{record.faculty}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm capitalize">
                            {record.classType}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                            {record.status === 'present' && <CheckCircleIcon size={14} className="inline mr-1" />}
                            {record.status === 'absent' && <XCircleIcon size={14} className="inline mr-1" />}
                            {record.status === 'late' && <ClockIcon size={14} className="inline mr-1" />}
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-gray-700">
                          {record.timeIn && record.timeOut 
                            ? `${record.timeIn} - ${record.timeOut}` 
                            : record.status === 'absent' ? '-' : record.timeIn || '-'
                          }
                        </td>
                        <td className="p-3 text-gray-700">
                          {record.duration ? `${record.duration} min` : '-'}
                        </td>
                        <td className="p-3 text-gray-600 text-sm">
                          {record.remarks || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Attendance Calendar</h2>
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
                <p className="text-gray-600 mb-6">
                  Interactive calendar view showing attendance patterns and trends.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Load Calendar View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceStu;
