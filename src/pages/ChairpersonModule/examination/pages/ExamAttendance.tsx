import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Search, Filter, Users, Calendar, AlertCircle, Clock, UserCheck, UserX, Eye } from 'lucide-react';

interface ExamAttendance {
  id: number;
  rollNo: string;
  name: string;
  branch: string;
  semester: number;
  subject: string;
  subjectCode: string;
  examDate: string;
  examTime: string;
  hall: string;
  seatNo: string;
  attendanceStatus: 'present' | 'absent' | 'late' | 'medical_leave' | 'pending';
  invigilator: string;
  remarks: string;
  markedBy: string;
  timestamp: string;
}

const ExamAttendanceManager: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<ExamAttendance[]>([
    {
      id: 1,
      rollNo: 'CS21001',
      name: 'Arjun Kumar',
      branch: 'Computer Science',
      semester: 6,
      subject: 'Database Management Systems',
      subjectCode: 'CS601',
      examDate: '2024-03-15',
      examTime: '09:00 AM',
      hall: 'Hall A-101',
      seatNo: 'A-15',
      attendanceStatus: 'present',
      invigilator: 'Dr. Sharma',
      remarks: 'On time',
      markedBy: 'Dr. Sharma',
      timestamp: '2024-03-15 09:05:00'
    },
    {
      id: 2,
      rollNo: 'EC21045',
      name: 'Priya Sharma',
      branch: 'Electronics',
      semester: 4,
      subject: 'Digital Signal Processing',
      subjectCode: 'EC401',
      examDate: '2024-03-15',
      examTime: '02:00 PM',
      hall: 'Hall B-205',
      seatNo: 'B-23',
      attendanceStatus: 'late',
      invigilator: 'Prof. Gupta',
      remarks: '15 minutes late',
      markedBy: 'Prof. Gupta',
      timestamp: '2024-03-15 14:15:00'
    },
    {
      id: 3,
      rollNo: 'ME21078',
      name: 'Rahul Singh',
      branch: 'Mechanical',
      semester: 8,
      subject: 'Heat Transfer',
      subjectCode: 'ME801',
      examDate: '2024-03-14',
      examTime: '09:00 AM',
      hall: 'Hall C-301',
      seatNo: 'C-42',
      attendanceStatus: 'absent',
      invigilator: 'Dr. Patel',
      remarks: 'No show',
      markedBy: 'Dr. Patel',
      timestamp: '2024-03-14 09:30:00'
    },
    {
      id: 4,
      rollNo: 'CS21134',
      name: 'Sneha Patel',
      branch: 'Computer Science',
      semester: 2,
      subject: 'Data Structures',
      subjectCode: 'CS201',
      examDate: '2024-03-16',
      examTime: '09:00 AM',
      hall: 'Hall A-102',
      seatNo: 'A-08',
      attendanceStatus: 'medical_leave',
      invigilator: 'Dr. Kumar',
      remarks: 'Medical certificate submitted',
      markedBy: 'Dr. Kumar',
      timestamp: '2024-03-16 08:45:00'
    },
    {
      id: 5,
      rollNo: 'EE21089',
      name: 'Vikram Reddy',
      branch: 'Electrical',
      semester: 6,
      subject: 'Power Systems',
      subjectCode: 'EE601',
      examDate: '2024-03-16',
      examTime: '02:00 PM',
      hall: 'Hall D-401',
      seatNo: 'D-31',
      attendanceStatus: 'pending',
      invigilator: 'Prof. Singh',
      remarks: 'Attendance not marked yet',
      markedBy: '',
      timestamp: ''
    },
    {
      id: 6,
      rollNo: 'CE21156',
      name: 'Anita Gupta',
      branch: 'Civil',
      semester: 4,
      subject: 'Structural Analysis',
      subjectCode: 'CE401',
      examDate: '2024-03-15',
      examTime: '09:00 AM',
      hall: 'Hall E-501',
      seatNo: 'E-19',
      attendanceStatus: 'present',
      invigilator: 'Dr. Verma',
      remarks: 'Present on time',
      markedBy: 'Dr. Verma',
      timestamp: '2024-03-15 09:02:00'
    },
    {
      id: 7,
      rollNo: 'IT21123',
      name: 'Rohan Joshi',
      branch: 'Information Technology',
      semester: 4,
      subject: 'Software Engineering',
      subjectCode: 'IT401',
      examDate: '2024-03-17',
      examTime: '09:00 AM',
      hall: 'Hall F-201',
      seatNo: 'F-27',
      attendanceStatus: 'pending',
      invigilator: 'Prof. Agarwal',
      remarks: 'Exam scheduled',
      markedBy: '',
      timestamp: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ExamAttendance | null>(null);

  const handleMarkPresent = (id: number) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id ? { 
          ...record, 
          attendanceStatus: 'present' as const,
          remarks: 'Marked present by chairperson',
          markedBy: 'Chairperson',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        } : record
      )
    );
  };

  const handleMarkAbsent = (id: number) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id ? { 
          ...record, 
          attendanceStatus: 'absent' as const,
          remarks: 'Marked absent by chairperson',
          markedBy: 'Chairperson',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        } : record
      )
    );
  };

  const handleMarkLate = (id: number) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id ? { 
          ...record, 
          attendanceStatus: 'late' as const,
          remarks: 'Marked late by chairperson',
          markedBy: 'Chairperson',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        } : record
      )
    );
  };

  const generateReport = () => {
    const reportData = attendanceRecords.map(record => ({
      'Roll No': record.rollNo,
      'Student Name': record.name,
      'Branch': record.branch,
      'Semester': record.semester,
      'Subject': record.subject,
      'Subject Code': record.subjectCode,
      'Exam Date': record.examDate,
      'Exam Time': record.examTime,
      'Hall': record.hall,
      'Seat No': record.seatNo,
      'Status': record.attendanceStatus.replace('_', ' ').toUpperCase(),
      'Invigilator': record.invigilator,
      'Remarks': record.remarks,
      'Marked By': record.markedBy,
      'Timestamp': record.timestamp
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exam_attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.hall.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.attendanceStatus === statusFilter;
    const matchesBranch = branchFilter === 'all' || record.branch === branchFilter;
    const matchesDate = dateFilter === 'all' || record.examDate === dateFilter;
    
    return matchesSearch && matchesStatus && matchesBranch && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      present: 'bg-green-100 text-green-800 border-green-200',
      absent: 'bg-red-100 text-red-800 border-red-200',
      late: 'bg-orange-100 text-orange-800 border-orange-200',
      medical_leave: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };

    const statusLabels = {
      present: 'PRESENT',
      absent: 'ABSENT',
      late: 'LATE',
      medical_leave: 'MEDICAL LEAVE',
      pending: 'PENDING'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter(r => r.attendanceStatus === 'present').length,
    absent: attendanceRecords.filter(r => r.attendanceStatus === 'absent').length,
    late: attendanceRecords.filter(r => r.attendanceStatus === 'late').length,
    pending: attendanceRecords.filter(r => r.attendanceStatus === 'pending').length,
    medical: attendanceRecords.filter(r => r.attendanceStatus === 'medical_leave').length
  };

  const attendancePercentage = ((stats.present + stats.late) / (stats.total - stats.medical - stats.pending) * 100).toFixed(1);

  const branches = [...new Set(attendanceRecords.map(r => r.branch))];
  const dates = [...new Set(attendanceRecords.map(r => r.examDate))].sort();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Exam Attendance Management
            </h1>
          </div>
          <p className="text-gray-600">
            Chairperson Dashboard - Monitor and manage student exam attendance across all departments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-gray-600 text-sm">Total Records</div>
              </div>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                <div className="text-gray-600 text-sm">Present</div>
              </div>
              <UserCheck className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-gray-600 text-sm">Absent</div>
              </div>
              <UserX className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
                <div className="text-gray-600 text-sm">Late</div>
              </div>
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-gray-600 text-sm">Pending</div>
              </div>
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{attendancePercentage}%</div>
                <div className="text-gray-600 text-sm">Attendance</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs font-bold">%</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by roll no, name, subject, or hall..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="medical_leave">Medical Leave</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                {dates.map(date => (
                  <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generateReport}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hall & Seat
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invigilator
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        <div className="text-sm text-gray-500">{record.rollNo}</div>
                        <div className="text-xs text-gray-400">{record.branch} - Sem {record.semester}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                        <div className="text-sm text-gray-500">{record.subjectCode}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{new Date(record.examDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{record.examTime}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.hall}</div>
                        <div className="text-sm text-gray-500">Seat: {record.seatNo}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(record.attendanceStatus)}
                      {record.remarks && (
                        <div className="text-xs text-gray-400 mt-1">{record.remarks}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.invigilator}</div>
                      {record.markedBy && (
                        <div className="text-xs text-gray-400">By: {record.markedBy}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      {record.attendanceStatus === 'pending' ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleMarkPresent(record.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Present
                          </button>
                          <button
                            onClick={() => handleMarkLate(record.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors"
                          >
                            <Clock className="w-3 h-3" />
                            Late
                          </button>
                          <button
                            onClick={() => handleMarkAbsent(record.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-3 h-3" />
                            Absent
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <button
                            disabled
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-400 text-xs rounded cursor-not-allowed"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Present
                          </button>
                          <button
                            disabled
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-400 text-xs rounded cursor-not-allowed"
                          >
                            <Clock className="w-3 h-3" />
                            Late
                          </button>
                          <button
                            disabled
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-400 text-xs rounded cursor-not-allowed"
                          >
                            <XCircle className="w-3 h-3" />
                            Absent
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="mt-1 w-full inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No exam records found</div>
              <div className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden mt-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4 border-blue-400">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{record.name}</h3>
                  <p className="text-sm text-gray-600">{record.rollNo}</p>
                </div>
                {getStatusBadge(record.attendanceStatus)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Subject:</span>
                  <div className="font-medium">{record.subjectCode}</div>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <div className="font-medium">{new Date(record.examDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <div className="font-medium">{record.examTime}</div>
                </div>
                <div>
                  <span className="text-gray-500">Hall:</span>
                  <div className="font-medium">{record.hall}</div>
                </div>
                <div>
                  <span className="text-gray-500">Seat:</span>
                  <div className="font-medium">{record.seatNo}</div>
                </div>
                <div>
                  <span className="text-gray-500">Invigilator:</span>
                  <div className="font-medium">{record.invigilator}</div>
                </div>
              </div>

              {record.remarks && (
                <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                  <span className="text-gray-500">Remarks:</span>
                  <div>{record.remarks}</div>
                </div>
              )}

              {record.attendanceStatus === 'pending' ? (
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleMarkPresent(record.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Present
                  </button>
                  <button
                    onClick={() => handleMarkLate(record.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Late
                  </button>
                  <button
                    onClick={() => handleMarkAbsent(record.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Absent
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    disabled
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-400 text-sm rounded-md cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Present
                  </button>
                  <button
                    disabled
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-400 text-sm rounded-md cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4" />
                    Late
                  </button>
                  <button
                    disabled
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-400 text-sm rounded-md cursor-not-allowed"
                  >
                    <XCircle className="w-4 h-4" />
                    Absent
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Exam Attendance Details</h2>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Student Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {selectedRecord.name}</div>
                      <div><span className="font-medium">Roll No:</span> {selectedRecord.rollNo}</div>
                      <div><span className="font-medium">Branch:</span> {selectedRecord.branch}</div>
                      <div><span className="font-medium">Semester:</span> {selectedRecord.semester}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Exam Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Subject:</span> {selectedRecord.subject}</div>
                      <div><span className="font-medium">Code:</span> {selectedRecord.subjectCode}</div>
                      <div><span className="font-medium">Date:</span> {new Date(selectedRecord.examDate).toLocaleDateString()}</div>
                      <div><span className="font-medium">Time:</span> {selectedRecord.examTime}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Hall & Seating</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Hall:</span> {selectedRecord.hall}</div>
                      <div><span className="font-medium">Seat No:</span> {selectedRecord.seatNo}</div>
                      <div><span className="font-medium">Invigilator:</span> {selectedRecord.invigilator}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Attendance Status</h3>
                    <div className="space-y-2 text-sm">
                      <div>{getStatusBadge(selectedRecord.attendanceStatus)}</div>
                      <div><span className="font-medium">Remarks:</span> {selectedRecord.remarks}</div>
                      {selectedRecord.markedBy && (
                        <div><span className="font-medium">Marked By:</span> {selectedRecord.markedBy}</div>
                      )}
                      {selectedRecord.timestamp && (
                        <div><span className="font-medium">Timestamp:</span> {selectedRecord.timestamp}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Showing {filteredRecords.length} of {attendanceRecords.length} exam records</p>
          <p className="mt-1">Overall Attendance Rate: {attendancePercentage}% (excluding medical leave and pending)</p>
        </div>
      </div>
    </div>
  );
};

export default ExamAttendanceManager;