import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  Download, 
  Users, 
  Check, 
  X, 
  Clock, 
  BarChart3,
  Smartphone,
  Send,
  AlertTriangle,
  CheckCircle,
  XCircle
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
  id?: string;
  studentId: string;
  date: string;
  subject: string;
  class: string;
  section: string;
  status: 'Present' | 'Absent' | 'Leave';
  markedAt: string;
  location?: string;
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
  startTime: string; // e.g., "10:00"
  endTime: string;   // e.g., "11:00"
  days: string[];    // e.g., ["Monday", "Wednesday", "Friday"]
}

const API_BASE_URL = 'http://localhost:3001';

const FacultyStudentAttendance: React.FC = () => {
  const location = useLocation();
  const { timetableId } = location.state || {};

  // Faculty information (would come from context/auth)
  const facultyInfo = {
    name: 'Dr. Rajesh Kumar',
    employeeId: 'FAC001',
    department: 'Computer Science Engineering'
  };

  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'error' | 'success' | 'warning'>('error');
  
  const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'mark' | 'view' | 'analytics'>('mark');

  // Get current date and time
  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Check if faculty can take attendance for the selected timetable and date
  const canTakeAttendance = useMemo(() => {
    if (!selectedTimetable) return { allowed: false, message: 'No timetable selected' };

    const selectedDateObj = new Date(selectedDate);
    const currentDateObj = new Date(currentDate);
    const selectedDay = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });

    // Check if it's a past date
    if (selectedDateObj < currentDateObj) {
      return { 
        allowed: false, 
        message: 'You cannot take attendance for past lectures. Please select today\'s date.' 
      };
    }

    // Check if it's a future date
    if (selectedDateObj > currentDateObj) {
      return { 
        allowed: false, 
        message: 'You cannot take attendance for future lectures. Attendance can only be marked for current lectures.' 
      };
    }

    // Check if today is a scheduled day for this subject
    if (!selectedTimetable.days.includes(selectedDay)) {
      return { 
        allowed: false, 
        message: `This subject is not scheduled for ${selectedDay}. Scheduled days: ${selectedTimetable.days.join(', ')}.` 
      };
    }

    // Check if current time is within the lecture time window (with 15 minutes buffer)
    const lectureStart = selectedTimetable.startTime;
    const lectureEnd = selectedTimetable.endTime;
    const bufferMinutes = 15;

    const startTime = new Date(`2000-01-01T${lectureStart}:00`);
    const endTime = new Date(`2000-01-01T${lectureEnd}:00`);
    const currentTimeObj = new Date(`2000-01-01T${currentTime}:00`);

    // Add buffer time
    startTime.setMinutes(startTime.getMinutes() - bufferMinutes);
    endTime.setMinutes(endTime.getMinutes() + bufferMinutes);

    if (currentTimeObj < startTime || currentTimeObj > endTime) {
      return { 
        allowed: false, 
        message: `Attendance can only be taken during lecture time (${selectedTimetable.startTime} - ${selectedTimetable.endTime}) with a 15-minute buffer. Current time: ${currentTime}.` 
      };
    }

    return { allowed: true, message: '' };
  }, [selectedTimetable, selectedDate, currentDate, currentTime, currentDay]);

  // Show popup message
  const showMessage = (message: string, type: 'error' | 'success' | 'warning') => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  // Fetch faculty's timetables
  const fetchTimetables = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/timetables?facultyId=${facultyInfo.employeeId}`);
      const data = await response.json();
      setTimetables(data);
      
      if (timetableId) {
        const timetable = data.find((tt: Timetable) => tt.id === timetableId);
        if (timetable) {
          setSelectedTimetable(timetable);
          await fetchStudentsForTimetable(timetable);
          await fetchAttendanceForDate(timetable, selectedDate);
        }
      } else if (data.length > 0) {
        setSelectedTimetable(data[0]);
        await fetchStudentsForTimetable(data[0]);
        await fetchAttendanceForDate(data[0], selectedDate);
      }
    } catch (error) {
      console.error('Error fetching timetables:', error);
      showMessage('Error loading timetables. Please try again.', 'error');
    }
  };

  // Fetch students for selected timetable
  const fetchStudentsForTimetable = async (timetable: Timetable) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students?class=${encodeURIComponent(timetable.class)}&section=${timetable.section}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      showMessage('Error loading students. Please try again.', 'error');
    }
  };

  // Fetch attendance for specific date and timetable
  const fetchAttendanceForDate = async (timetable: Timetable, date: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance?date=${date}&subject=${encodeURIComponent(timetable.subject)}&class=${encodeURIComponent(timetable.class)}&section=${timetable.section}`);
      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      showMessage('Error loading attendance data. Please try again.', 'error');
    }
  };

  // Initialize attendance for all students as 'Present' if not exists
  const initializeAttendanceForStudents = async (studentsToInitialize: Student[], timetable: Timetable, date: string) => {
    const existingAttendance = await fetch(`${API_BASE_URL}/attendance?date=${date}&subject=${encodeURIComponent(timetable.subject)}&class=${encodeURIComponent(timetable.class)}&section=${timetable.section}`)
      .then(res => res.json());

    const existingStudentIds = existingAttendance.map((att: AttendanceRecord) => att.studentId);
    
    const studentsToCreate = studentsToInitialize.filter(student => 
      !existingStudentIds.includes(student.id)
    );

    if (studentsToCreate.length > 0) {
      const attendanceRecords = studentsToCreate.map(student => ({
        studentId: student.id,
        date: date,
        subject: timetable.subject,
        class: timetable.class,
        section: timetable.section,
        status: 'Present' as const,
        markedAt: new Date().toISOString(),
        location: 'Classroom'
      }));

      for (const record of attendanceRecords) {
        try {
          await fetch(`${API_BASE_URL}/attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
          });
        } catch (error) {
          console.error('Error creating attendance record:', error);
        }
      }

      await fetchAttendanceForDate(timetable, date);
    }
  };

  // Filter students for selected timetable
  const filteredStudents = useMemo(() => {
    if (!selectedTimetable) return [];
    
    return students.filter(student => {
      const matchesClass = student.class === selectedTimetable.class && student.section === selectedTimetable.section;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [students, selectedTimetable, searchTerm]);

  // Get attendance for selected date and timetable
  const todaysAttendance = useMemo(() => {
    if (!selectedTimetable) return [];
    
    return attendance.filter(record => 
      record.date === selectedDate && 
      record.subject === selectedTimetable.subject &&
      record.class === selectedTimetable.class &&
      record.section === selectedTimetable.section
    );
  }, [attendance, selectedDate, selectedTimetable]);

  // Mark individual attendance
  const markAttendance = async (studentId: string, status: 'Present' | 'Absent' | 'Leave') => {
    if (!selectedTimetable) return;
    if (!canTakeAttendance.allowed) {
      showMessage(canTakeAttendance.message, 'warning');
      return;
    }

    const existingRecord = attendance.find(record => 
      record.studentId === studentId && 
      record.date === selectedDate &&
      record.subject === selectedTimetable.subject
    );

    const attendanceData = {
      studentId,
      date: selectedDate,
      subject: selectedTimetable.subject,
      class: selectedTimetable.class,
      section: selectedTimetable.section,
      status,
      markedAt: new Date().toISOString(),
      location: 'Classroom'
    };

    try {
      if (existingRecord) {
        await fetch(`${API_BASE_URL}/attendance/${existingRecord.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...attendanceData, id: existingRecord.id })
        });
      } else {
        await fetch(`${API_BASE_URL}/attendance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(attendanceData)
        });
      }

      await fetchAttendanceForDate(selectedTimetable, selectedDate);
    } catch (error) {
      console.error('Error marking attendance:', error);
      showMessage('Error updating attendance. Please try again.', 'error');
    }
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (!selectedTimetable) return;
    if (!canTakeAttendance.allowed) {
      showMessage(canTakeAttendance.message, 'warning');
      return;
    }

    setSubmitting(true);
    
    try {
      // Initialize attendance for students who don't have records yet
      await initializeAttendanceForStudents(filteredStudents, selectedTimetable, selectedDate);
      
      showMessage('Attendance submitted successfully!', 'success');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      showMessage('Error submitting attendance. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Bulk mark attendance
  const bulkMarkAttendance = async (status: 'Present' | 'Absent') => {
    if (!canTakeAttendance.allowed) {
      showMessage(canTakeAttendance.message, 'warning');
      return;
    }

    for (const student of filteredStudents) {
      await markAttendance(student.id, status);
    }
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

  // Handle timetable selection change
  const handleTimetableChange = async (timetableId: string) => {
    const timetable = timetables.find(tt => tt.id === timetableId);
    if (timetable) {
      setSelectedTimetable(timetable);
      setLoading(true);
      await fetchStudentsForTimetable(timetable);
      await fetchAttendanceForDate(timetable, selectedDate);
      setLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    if (selectedTimetable) {
      setLoading(true);
      await fetchAttendanceForDate(selectedTimetable, date);
      setLoading(false);
    }
  };

  // Export attendance
  const exportAttendance = () => {
    if (!selectedTimetable) return;

    const csvData = filteredStudents.map(student => {
      const status = getAttendanceStatus(student.id) || 'Not Marked';
      return {
        'Roll Number': student.rollNumber,
        'Name': student.name,
        'Class': student.class,
        'Section': student.section,
        'Subject': selectedTimetable.subject,
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
    a.download = `attendance_${selectedTimetable.subject}_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Initial data fetch
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchTimetables();
      setLoading(false);
    };
    
    initializeData();
  }, []);

  // Handle date change effect
  useEffect(() => {
    if (selectedTimetable) {
      handleDateChange(selectedDate);
    }
  }, [selectedDate, selectedTimetable]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
            popupType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
            popupType === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {popupType === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {popupType === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            {popupType === 'error' && <XCircle className="w-5 h-5 flex-shrink-0" />}
            <p className="text-sm">{popupMessage}</p>
            <button 
              onClick={() => setShowPopup(false)}
              className="ml-auto text-lg hover:opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Attendance</h1>
              <p className="text-gray-600">{facultyInfo.name} • {facultyInfo.department}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>Current Date: {new Date().toLocaleDateString()}</span>
                <span>Current Time: {new Date().toLocaleTimeString()}</span>
              </div>
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

      {/* Attendance Permission Status */}
      {selectedTimetable && (
        <div className={`rounded-xl shadow-sm p-4 mb-6 flex items-center gap-3 ${
          canTakeAttendance.allowed 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {canTakeAttendance.allowed ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">Attendance can be taken</p>
                <p className="text-green-700 text-sm">
                  {selectedTimetable.subject} • {selectedTimetable.startTime} - {selectedTimetable.endTime} • {selectedTimetable.room}
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-red-800 font-medium">Cannot take attendance</p>
                <p className="text-red-700 text-sm">{canTakeAttendance.message}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Navigation and Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Timetable Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class & Subject</label>
            <select
              value={selectedTimetable?.id || ''}
              onChange={(e) => handleTimetableChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timetables.map(timetable => (
                <option key={timetable.id} value={timetable.id}>
                  {timetable.subject} - {timetable.class} {timetable.section} • {timetable.startTime}-{timetable.endTime}
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
              <button
                onClick={() => bulkMarkAttendance('Present')}
                disabled={!canTakeAttendance.allowed}
                className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                All Present
              </button>
              <button
                onClick={() => bulkMarkAttendance('Absent')}
                disabled={!canTakeAttendance.allowed}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
                All Absent
              </button>
              <button
                onClick={submitAttendance}
                disabled={!canTakeAttendance.allowed || submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {submitting ? 'Submitting...' : 'Submit Attendance'}
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
                {selectedTimetable?.subject} - {selectedTimetable?.class} {selectedTimetable?.section}
              </h2>
              <p className="text-gray-600">
                {new Date(selectedDate).toLocaleDateString()} • {selectedTimetable?.room}
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
                          disabled={viewMode !== 'mark' || !canTakeAttendance.allowed}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Present' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 hover:bg-green-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => markAttendance(student.id, 'Absent')}
                          disabled={viewMode !== 'mark' || !canTakeAttendance.allowed}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 hover:bg-red-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => markAttendance(student.id, 'Leave')}
                          disabled={viewMode !== 'mark' || !canTakeAttendance.allowed}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            status === 'Leave' 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-gray-100 hover:bg-yellow-100 text-gray-600 disabled:hover:bg-gray-100'
                          } disabled:cursor-not-allowed disabled:opacity-50`}
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

export default FacultyStudentAttendance;