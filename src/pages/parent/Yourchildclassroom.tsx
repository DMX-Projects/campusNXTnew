import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Users, 
  Phone, 
  Mail, 
  GraduationCap,
  Trophy,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  FileText,
  BarChart3,
  PieChart,
  Target,
  Award,
  Star,
  MessageSquare,
  Video,
  Wifi
} from 'lucide-react';

const ChildClassroomDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Current parent and student data
  const [studentData] = useState({
    id: 'student_2021cs001',
    name: 'Arjun Patel',
    rollNumber: '2021CS001',
    department: 'Computer Science Engineering',
    year: '4th Year',
    semester: '8th Semester',
    section: 'A',
    batch: '2021-2025',
    classTeacher: {
      name: 'Prof. Dr. Meera Singh',
      email: 'meera.singh@college.edu',
      phone: '+91-9876543210',
      designation: 'Associate Professor',
      experience: '12 years'
    },
    classroom: {
      roomNumber: 'CS-301',
      building: 'Computer Science Block',
      floor: '3rd Floor',
      capacity: 60,
      facilities: ['Smart Board', 'Projector', 'AC', 'WiFi', 'Audio System']
    },
    currentCGPA: 8.2,
    attendance: 92,
    rank: 5,
    totalStudents: 58
  });

  const [subjects, setSubjects] = useState([
    {
      id: 'cs801',
      name: 'Machine Learning',
      code: 'CS801',
      credits: 4,
      faculty: {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        phone: '+91-9876543211'
      },
      schedule: [
        { day: 'Monday', time: '9:00-10:00 AM', type: 'Theory', room: 'CS-301' },
        { day: 'Wednesday', time: '11:00-12:00 PM', type: 'Theory', room: 'CS-301' },
        { day: 'Friday', time: '2:00-5:00 PM', type: 'Lab', room: 'CS-Lab-2' }
      ],
      attendance: 95,
      marks: {
        assignment1: 85,
        assignment2: 88,
        midterm: 82,
        project: 90,
        total: 86
      },
      nextAssignment: {
        title: 'Neural Network Implementation',
        dueDate: '2024-11-25',
        status: 'pending'
      }
    },
    {
      id: 'cs802',
      name: 'Software Project Management',
      code: 'CS802',
      credits: 3,
      faculty: {
        name: 'Prof. Anita Sharma',
        email: 'anita.sharma@college.edu',
        phone: '+91-9876543212'
      },
      schedule: [
        { day: 'Tuesday', time: '10:00-11:00 AM', type: 'Theory', room: 'CS-301' },
        { day: 'Thursday', time: '9:00-10:00 AM', type: 'Theory', room: 'CS-301' },
        { day: 'Saturday', time: '10:00-12:00 PM', type: 'Tutorial', room: 'CS-301' }
      ],
      attendance: 88,
      marks: {
        assignment1: 92,
        assignment2: 89,
        midterm: 85,
        project: 94,
        total: 90
      },
      nextAssignment: {
        title: 'Agile Project Plan',
        dueDate: '2024-11-20',
        status: 'submitted'
      }
    },
    {
      id: 'cs803',
      name: 'Distributed Systems',
      code: 'CS803',
      credits: 4,
      faculty: {
        name: 'Dr. Priya Mehta',
        email: 'priya.mehta@college.edu',
        phone: '+91-9876543213'
      },
      schedule: [
        { day: 'Monday', time: '11:00-12:00 PM', type: 'Theory', room: 'CS-301' },
        { day: 'Wednesday', time: '2:00-3:00 PM', type: 'Theory', room: 'CS-301' },
        { day: 'Thursday', time: '2:00-5:00 PM', type: 'Lab', room: 'CS-Lab-1' }
      ],
      attendance: 90,
      marks: {
        assignment1: 78,
        assignment2: 82,
        midterm: 79,
        project: 85,
        total: 81
      },
      nextAssignment: {
        title: 'Consensus Algorithms Study',
        dueDate: '2024-11-22',
        status: 'in_progress'
      }
    },
    {
      id: 'cs804',
      name: 'Cyber Security',
      code: 'CS804',
      credits: 3,
      faculty: {
        name: 'Prof. Vikram Singh',
        email: 'vikram.singh@college.edu',
        phone: '+91-9876543214'
      },
      schedule: [
        { day: 'Tuesday', time: '2:00-3:00 PM', type: 'Theory', room: 'CS-301' },
        { day: 'Friday', time: '10:00-11:00 AM', type: 'Theory', room: 'CS-301' },
        { day: 'Saturday', time: '2:00-4:00 PM', type: 'Lab', room: 'CS-Lab-3' }
      ],
      attendance: 94,
      marks: {
        assignment1: 87,
        assignment2: 91,
        midterm: 88,
        project: 92,
        total: 89
      },
      nextAssignment: {
        title: 'Penetration Testing Report',
        dueDate: '2024-11-28',
        status: 'pending'
      }
    }
  ]);

  const [classmates, setClassmates] = useState([
    { id: 1, name: 'Ravi Sharma', rollNumber: '2021CS002', rank: 1, cgpa: 8.9 },
    { id: 2, name: 'Priya Gupta', rollNumber: '2021CS015', rank: 2, cgpa: 8.7 },
    { id: 3, name: 'Rohit Kumar', rollNumber: '2021CS025', rank: 3, cgpa: 8.5 },
    { id: 4, name: 'Sneha Patel', rollNumber: '2021CS035', rank: 4, cgpa: 8.3 },
    { id: 5, name: 'Arjun Patel', rollNumber: '2021CS001', rank: 5, cgpa: 8.2, isCurrentStudent: true },
    { id: 6, name: 'Kavya Singh', rollNumber: '2021CS045', rank: 6, cgpa: 8.1 },
    { id: 7, name: 'Amit Verma', rollNumber: '2021CS055', rank: 7, cgpa: 8.0 }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2024-11-20',
      time: '2:00-4:00 PM',
      venue: 'CS-301',
      type: 'meeting',
      description: 'Discuss academic progress and career guidance'
    },
    {
      id: 2,
      title: 'Final Project Presentation',
      date: '2024-11-25',
      time: '10:00 AM-12:00 PM',
      venue: 'Seminar Hall',
      type: 'academic',
      description: 'Final year project presentations - Parents invited'
    },
    {
      id: 3,
      title: 'Industrial Visit - TCS Bangalore',
      date: '2024-12-02',
      time: '8:00 AM-6:00 PM',
      venue: 'TCS Campus',
      type: 'industrial',
      description: 'Educational visit to industry - Permission required'
    }
  ]);

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeColor = (marks) => {
    if (marks >= 85) return 'text-green-600 bg-green-50';
    if (marks >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'subjects', label: 'Subjects & Faculty', icon: BookOpen },
    { id: 'performance', label: 'Academic Performance', icon: BarChart3 },
    { id: 'schedule', label: 'Class Schedule', icon: Calendar },
    { id: 'classmates', label: 'Class Standing', icon: Users },
    { id: 'events', label: 'Upcoming Events', icon: Clock }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Student Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <GraduationCap size={32} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{studentData.name}</h2>
            <p className="opacity-90">{studentData.rollNumber} • {studentData.department}</p>
            <p className="opacity-75">{studentData.year} • Section {studentData.section}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{studentData.currentCGPA}</div>
            <div className="opacity-90">Current CGPA</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{studentData.attendance}%</div>
              <div className="text-sm text-gray-600">Attendance</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">#{studentData.rank}</div>
              <div className="text-sm text-gray-600">Class Rank</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen size={20} className="text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{subjects.length}</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{studentData.totalStudents}</div>
              <div className="text-sm text-gray-600">Classmates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Teacher Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Teacher Information</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <GraduationCap size={32} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{studentData.classTeacher.name}</h4>
            <p className="text-gray-600">{studentData.classTeacher.designation}</p>
            <p className="text-sm text-gray-500">{studentData.classTeacher.experience} teaching experience</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Mail size={16} />
              Email Teacher
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              <Phone size={16} />
              Call Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Classroom Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="font-medium">Location</span>
            </div>
            <p className="text-gray-700">Room {studentData.classroom.roomNumber}</p>
            <p className="text-sm text-gray-600">{studentData.classroom.building}</p>
            <p className="text-sm text-gray-600">{studentData.classroom.floor}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-gray-500" />
              <span className="font-medium">Capacity</span>
            </div>
            <p className="text-gray-700">{studentData.classroom.capacity} students</p>
            <p className="text-sm text-gray-600">Currently: {studentData.totalStudents} enrolled</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Wifi size={16} className="text-gray-500" />
            <span className="font-medium">Facilities Available</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {studentData.classroom.facilities.map((facility, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {facility}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SubjectsTab = () => (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <div key={subject.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-gray-600">{subject.code} • {subject.credits} Credits</p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(subject.attendance)}`}>
                {subject.attendance}% Attendance
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Faculty Information</h4>
              <div className="space-y-1">
                <p className="text-gray-700">{subject.faculty.name}</p>
                <p className="text-sm text-gray-600">{subject.faculty.email}</p>
                <p className="text-sm text-gray-600">{subject.faculty.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Current Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overall Marks:</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getGradeColor(subject.marks.total)}`}>
                    {subject.marks.total}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Assignment:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    subject.nextAssignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                    subject.nextAssignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {subject.nextAssignment.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setSelectedSubject(subject)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Detailed Schedule & Marks →
          </button>
        </div>
      ))}
    </div>
  );

  const PerformanceTab = () => (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{studentData.currentCGPA}</div>
            <div className="text-sm text-blue-800">Current CGPA</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{studentData.attendance}%</div>
            <div className="text-sm text-green-800">Overall Attendance</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">#{studentData.rank}</div>
            <div className="text-sm text-purple-800">Class Rank</div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-900">Subject</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Attendance</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Assignment 1</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Assignment 2</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Midterm</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Project</th>
                <th className="text-center py-3 text-sm font-medium text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.code}</div>
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(subject.attendance)}`}>
                      {subject.attendance}%
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded text-sm ${getGradeColor(subject.marks.assignment1)}`}>
                      {subject.marks.assignment1}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded text-sm ${getGradeColor(subject.marks.assignment2)}`}>
                      {subject.marks.assignment2}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded text-sm ${getGradeColor(subject.marks.midterm)}`}>
                      {subject.marks.midterm}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded text-sm ${getGradeColor(subject.marks.project)}`}>
                      {subject.marks.project}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded font-medium text-sm ${getGradeColor(subject.marks.total)}`}>
                      {subject.marks.total}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments & Deadlines</h3>
        <div className="space-y-3">
          {subjects.filter(s => s.nextAssignment.status !== 'submitted').map((subject) => (
            <div key={subject.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div>
                <div className="font-medium text-gray-900">{subject.nextAssignment.title}</div>
                <div className="text-sm text-gray-600">{subject.name} ({subject.code})</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Due: {new Date(subject.nextAssignment.dueDate).toLocaleDateString()}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  subject.nextAssignment.status === 'pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subject.nextAssignment.status.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ScheduleTab = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
      '9:00-10:00 AM', '10:00-11:00 AM', '11:00-12:00 PM', 
      '2:00-3:00 PM', '3:00-4:00 PM', '4:00-5:00 PM'
    ];

    const getScheduleForDayTime = (day, timeSlot) => {
      return subjects.find(subject => 
        subject.schedule.some(sched => 
          sched.day === day && sched.time === timeSlot
        )
      );
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Class Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-50 text-sm font-medium text-gray-900">Time</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-300 p-2 bg-gray-50 text-sm font-medium text-gray-900">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                  <td className="border border-gray-300 p-2 bg-gray-50 text-sm font-medium text-gray-700">
                    {timeSlot}
                  </td>
                  {days.map(day => {
                    const scheduleItem = subjects.find(subject => 
                      subject.schedule.some(sched => 
                        sched.day === day && sched.time === timeSlot
                      )
                    );
                    const specificSchedule = scheduleItem?.schedule.find(sched => 
                      sched.day === day && sched.time === timeSlot
                    );
                    
                    return (
                      <td key={day} className="border border-gray-300 p-2 h-20 align-top">
                        {scheduleItem && (
                          <div className="bg-blue-50 p-2 rounded text-xs">
                            <div className="font-medium text-blue-900">{scheduleItem.name}</div>
                            <div className="text-blue-700">{specificSchedule?.type}</div>
                            <div className="text-blue-600">{specificSchedule?.room}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ClassmatesTab = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance Standing</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-900">Rank</th>
              <th className="text-left py-3 text-sm font-medium text-gray-900">Student Name</th>
              <th className="text-left py-3 text-sm font-medium text-gray-900">Roll Number</th>
              <th className="text-center py-3 text-sm font-medium text-gray-900">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {classmates.map((student) => (
              <tr 
                key={student.id}
                className={`border-b border-gray-100 ${
                  student.isCurrentStudent ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">#{student.rank}</span>
                    {student.rank <= 3 && (
                      <Trophy size={16} className="text-yellow-500" />
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <span className={`${student.isCurrentStudent ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
                    {student.name}
                    {student.isCurrentStudent && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Your Child</span>}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{student.rollNumber}</td>
                <td className="text-center py-3">
                  <span className={`font-medium ${
                    student.cgpa >= 8.5 ? 'text-green-600' :
                    student.cgpa >= 7.5 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {student.cgpa}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <div className="flex items-center gap-2 text-blue-800">
          <Target size={16} />
          <span className="font-medium">Performance Insight</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Your child is performing well, ranking 5th out of {studentData.totalStudents} students. 
          With consistent effort, there's potential to improve to top 3 positions.
        </p>
      </div>
    </div>
  );

  const EventsTab = () => (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
              event.type === 'academic' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {event.type.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-gray-700">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-700">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">{event.venue}</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
              Add to Calendar
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm">
              Get Directions
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Subject Detail Modal
  const SubjectDetailModal = () => (
    selectedSubject && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedSubject.name} ({selectedSubject.code})
              </h3>
              <button 
                onClick={() => setSelectedSubject(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Faculty & Schedule */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Faculty & Schedule</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-gray-900">{selectedSubject.faculty.name}</div>
                    <div className="text-sm text-gray-600">{selectedSubject.faculty.email}</div>
                    <div className="text-sm text-gray-600">{selectedSubject.faculty.phone}</div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Weekly Schedule</h5>
                    {selectedSubject.schedule.map((sched, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-md mb-2">
                        <div>
                          <span className="font-medium text-blue-900">{sched.day}</span>
                          <span className="text-blue-700 ml-2">({sched.type})</span>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-blue-800">{sched.time}</div>
                          <div className="text-blue-600">{sched.room}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Performance Details</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Attendance</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(selectedSubject.attendance)}`}>
                        {selectedSubject.attendance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedSubject.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Assessment Breakdown</h5>
                    <div className="space-y-2">
                      {Object.entries(selectedSubject.marks).filter(([key]) => key !== 'total').map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(value)}`}>
                            {value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-md border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">Overall Performance</span>
                      <span className="text-lg font-bold text-green-600">{selectedSubject.marks.total}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Status */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Current Assignment Status</h4>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{selectedSubject.nextAssignment.title}</div>
                    <div className="text-sm text-gray-600">
                      Due: {new Date(selectedSubject.nextAssignment.dueDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedSubject.nextAssignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                    selectedSubject.nextAssignment.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedSubject.nextAssignment.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Classroom Details</h1>
              <p className="text-gray-600 mt-1">
                Complete academic information for {studentData.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Download size={16} />
                Download Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                <MessageSquare size={16} />
                Contact Teacher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {React.createElement(tab.icon, { size: 16 })}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'subjects' && <SubjectsTab />}
          {activeTab === 'performance' && <PerformanceTab />}
          {activeTab === 'schedule' && <ScheduleTab />}
          {activeTab === 'classmates' && <ClassmatesTab />}
          {activeTab === 'events' && <EventsTab />}
        </div>

        {/* Action Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Message Class Teacher</div>
                <div className="text-sm text-gray-600">Send direct message to {studentData.classTeacher.name}</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Schedule Parent Meeting</div>
                <div className="text-sm text-gray-600">Book appointment with class teacher</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Download Progress Report</div>
                <div className="text-sm text-gray-600">Get detailed academic report</div>
              </div>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-red-600" />
            <h4 className="font-semibold text-red-800">Emergency Contacts</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium text-red-800">Class Teacher</div>
              <div className="text-red-700">{studentData.classTeacher.phone}</div>
            </div>
            <div>
              <div className="font-medium text-red-800">College Office</div>
              <div className="text-red-700">+91-79-26851234</div>
            </div>
            <div>
              <div className="font-medium text-red-800">Hostel Warden</div>
              <div className="text-red-700">+91-79-26851567</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Detail Modal */}
      <SubjectDetailModal />
    </div>
  );
};

export default ChildClassroomDetails;