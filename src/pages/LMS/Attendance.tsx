import React, { useState } from 'react';
import { UsersIcon, TrendingUpIcon, ClockIcon, CheckCircleIcon, XCircleIcon, DownloadIcon } from 'lucide-react';

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  department: string;
  semester: string;
  batch: string;
  email: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late';
  timeIn?: string;
  remarks?: string;
}

interface AttendanceStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  averageAttendance: number;
}

const Attendance: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: '1',
      rollNumber: 'CSE001',
      name: 'Rahul Sharma',
      department: 'CSE',
      semester: '3',
      batch: 'A',
      email: 'rahul.sharma@college.edu'
    },
    {
      id: '2',
      rollNumber: 'CSE002',
      name: 'Priya Singh',
      department: 'CSE',
      semester: '3',
      batch: 'A',
      email: 'priya.singh@college.edu'
    },
    {
      id: '3',
      rollNumber: 'CSE003',
      name: 'Amit Kumar',
      department: 'CSE',
      semester: '3',
      batch: 'A',
      email: 'amit.kumar@college.edu'
    }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      studentId: '1',
      date: '2025-09-02',
      subject: 'Data Structures',
      status: 'present',
      timeIn: '09:05'
    },
    {
      id: '2',
      studentId: '2',
      date: '2025-09-02',
      subject: 'Data Structures',
      status: 'present',
      timeIn: '09:02'
    },
    {
      id: '3',
      studentId: '3',
      date: '2025-09-02',
      subject: 'Data Structures',
      status: 'absent'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [selectedDate, setSelectedDate] = useState('2025-09-02');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [isMarkingModalOpen, setIsMarkingModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [tempAttendance, setTempAttendance] = useState<{[key: string]: string}>({});

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const subjects = ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering'];

  const filteredStudents = students.filter(student => 
    student.department === selectedDepartment && student.semester === selectedSemester
  );

  const todaysRecords = attendanceRecords.filter(record => 
    record.date === selectedDate && record.subject === selectedSubject
  );

  const stats: AttendanceStats = {
    totalStudents: filteredStudents.length,
    presentToday: todaysRecords.filter(r => r.status === 'present').length,
    absentToday: todaysRecords.filter(r => r.status === 'absent').length,
    averageAttendance: Math.round((todaysRecords.filter(r => r.status === 'present').length / filteredStudents.length) * 100)
  };

  const getAttendanceStatus = (studentId: string) => {
    const record = todaysRecords.find(r => r.studentId === studentId);
    return record ? record.status : 'not_marked';
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const existingRecord = attendanceRecords.find(r => 
      r.studentId === studentId && r.date === selectedDate && r.subject === selectedSubject
    );

    if (existingRecord) {
      setAttendanceRecords(records => 
        records.map(record => 
          record.id === existingRecord.id 
            ? { ...record, status, timeIn: status === 'present' ? new Date().toTimeString().slice(0, 5) : undefined }
            : record
        )
      );
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        studentId,
        date: selectedDate,
        subject: selectedSubject,
        status,
        timeIn: status === 'present' ? new Date().toTimeString().slice(0, 5) : undefined
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
  };

  const bulkMarkAttendance = () => {
    filteredStudents.forEach(student => {
      const status = tempAttendance[student.id] || 'absent';
      markAttendance(student.id, status as 'present' | 'absent' | 'late');
    });
    setTempAttendance({});
    setIsBulkModalOpen(false);
  };

  const exportAttendance = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Roll Number,Name,Date,Subject,Status,Time In\n" +
      todaysRecords.map(record => {
        const student = students.find(s => s.id === record.studentId);
        return `${student?.rollNumber},${student?.name},${record.date},${record.subject},${record.status},${record.timeIn || ''}`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${selectedDate}_${selectedSubject}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateReport = () => {
    alert(`Attendance Report Generated!\n\nDate: ${selectedDate}\nSubject: ${selectedSubject}\nTotal Students: ${stats.totalStudents}\nPresent: ${stats.presentToday}\nAbsent: ${stats.absentToday}\nAttendance Rate: ${stats.averageAttendance}%`);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800',
      not_marked: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="text-green-500" size={16} />;
      case 'absent':
        return <XCircleIcon className="text-red-500" size={16} />;
      case 'late':
        return <ClockIcon className="text-yellow-500" size={16} />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
              <p className="text-gray-600 mt-1">Track and manage student attendance across departments</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Bulk Mark
              </button>
              <button
                onClick={exportAttendance}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export
              </button>
              <button
                onClick={generateReport}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <button
              onClick={() => setIsMarkingModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Quick Mark
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <UsersIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Present Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.presentToday}</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{stats.absentToday}</p>
              </div>
              <XCircleIcon className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Attendance Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageAttendance}%</p>
              </div>
              <TrendingUpIcon className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Attendance for {selectedSubject} - {new Date(selectedDate).toLocaleDateString()}
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Not Marked</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-medium text-gray-900">Roll Number</th>
                    <th className="text-left p-3 font-medium text-gray-900">Student Name</th>
                    <th className="text-left p-3 font-medium text-gray-900">Batch</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                    <th className="text-left p-3 font-medium text-gray-900">Time In</th>
                    <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const status = getAttendanceStatus(student.id);
                    const record = todaysRecords.find(r => r.studentId === student.id);
                    
                    return (
                      <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-900">{student.rollNumber}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.batch}</td>
                        <td className="p-3">
                          <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {getStatusIcon(status)}
                            {status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{record?.timeIn || '-'}</td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => markAttendance(student.id, 'present')}
                              className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded text-xs transition-colors"
                            >
                              Present
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, 'absent')}
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs transition-colors"
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, 'late')}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded text-xs transition-colors"
                            >
                              Late
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Mark Modal */}
        {isMarkingModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Mark Attendance</h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    filteredStudents.forEach(student => markAttendance(student.id, 'present'));
                    setIsMarkingModalOpen(false);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Mark All Present
                </button>
                
                <button
                  onClick={() => {
                    filteredStudents.forEach(student => markAttendance(student.id, 'absent'));
                    setIsMarkingModalOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Mark All Absent
                </button>
                
                <button
                  onClick={() => {
                    attendanceRecords.forEach(record => {
                      if (record.date === selectedDate && record.subject === selectedSubject) {
                        setAttendanceRecords(records => records.filter(r => r.id !== record.id));
                      }
                    });
                    setIsMarkingModalOpen(false);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Clear All Attendance
                </button>
              </div>
              
              <button
                onClick={() => setIsMarkingModalOpen(false)}
                className="w-full mt-4 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Bulk Mark Modal */}
        {isBulkModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bulk Mark Attendance</h2>
              
              <div className="space-y-2 mb-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <span className="font-medium">{student.rollNumber}</span>
                      <span className="ml-3">{student.name}</span>
                    </div>
                    <div className="flex gap-2">
                      {['present', 'absent', 'late'].map(status => (
                        <button
                          key={status}
                          onClick={() => setTempAttendance({...tempAttendance, [student.id]: status})}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            tempAttendance[student.id] === status
                              ? status === 'present' ? 'bg-green-600 text-white' :
                                status === 'absent' ? 'bg-red-600 text-white' :
                                'bg-yellow-600 text-white'
                              : status === 'present' ? 'bg-green-100 text-green-700' :
                                status === 'absent' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsBulkModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={bulkMarkAttendance}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
