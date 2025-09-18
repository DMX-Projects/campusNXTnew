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
  Wifi,
  Navigation,
  Send
} from 'lucide-react';

const ChildClassroomDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('');

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
      facilities: ['Smart Board', 'Projector', 'AC', 'WiFi', 'Audio System'],
      address: 'Computer Science Block, 3rd Floor, Room CS-301, ABC Engineering College, Bangalore, Karnataka 560001'
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
      address: 'Computer Science Block, 3rd Floor, Room CS-301, ABC Engineering College, Bangalore, Karnataka 560001',
      type: 'meeting',
      description: 'Discuss academic progress and career guidance'
    },
    {
      id: 2,
      title: 'Final Project Presentation',
      date: '2024-11-25',
      time: '10:00 AM-12:00 PM',
      venue: 'Seminar Hall',
      address: 'Main Academic Block, Ground Floor, Seminar Hall, ABC Engineering College, Bangalore, Karnataka 560001',
      type: 'academic',
      description: 'Final year project presentations - Parents invited'
    },
    {
      id: 3,
      title: 'Industrial Visit - TCS Bangalore',
      date: '2024-12-02',
      time: '8:00 AM-6:00 PM',
      venue: 'TCS Campus',
      address: 'TCS Campus, Electronics City Phase 1, Bangalore, Karnataka 560100',
      type: 'industrial',
      description: 'Educational visit to industry - Permission required'
    }
  ]);

  // Utility Functions
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

  // Functional implementations
  const handleGetDirections = (address, venueName) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const handleAddToCalendar = (event) => {
    try {
      // Parse the time range
      const timeRange = event.time.split('-');
      let startTime = timeRange[0]?.trim() || '9:00 AM';
      let endTime = timeRange[1]?.trim() || '10:00 AM';
      
      // Convert 12-hour format to 24-hour format
      const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
          hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
        return `${hours.padStart(2, '0')}:${minutes || '00'}`;
      };

      const start24 = convertTo24Hour(startTime);
      const end24 = convertTo24Hour(endTime);
      
      // Create start and end dates
      const startDateTime = new Date(event.date + 'T' + start24 + ':00');
      const endDateTime = new Date(event.date + 'T' + end24 + ':00');
      
      // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
      const formatForCalendar = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const startFormatted = formatForCalendar(startDateTime);
      const endFormatted = formatForCalendar(endDateTime);
      
      // Build Google Calendar URL
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${startFormatted}/${endFormatted}`,
        details: event.description,
        location: event.address || event.venue,
        ctz: 'Asia/Kolkata'
      });

      const calendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
      
      // Open in new tab
      window.open(calendarUrl, '_blank');
      
      // Show success message
      alert(`Calendar event created for: ${event.title}\nDate: ${new Date(event.date).toLocaleDateString()}\nTime: ${event.time}`);
      
    } catch (error) {
      console.error('Error creating calendar event:', error);
      
      // Fallback: Create basic calendar event
      const fallbackUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`;
      window.open(fallbackUrl, '_blank');
      
      alert('Calendar opened. Please manually set the date and time.');
    }
  };

  const handleContactTeacher = (teacherEmail, teacherName) => {
    setContactSubject(`Regarding ${studentData.name} (${studentData.rollNumber}) - Academic Inquiry`);
    setContactMessage(`Dear ${teacherName},\n\nI hope this message finds you well. I am writing to you regarding my child ${studentData.name} (Roll Number: ${studentData.rollNumber}) from your class.\n\n[Please write your message here]\n\nThank you for your time and attention.\n\nBest regards,\nParent of ${studentData.name}`);
    setShowContactForm(true);
  };

  const handleSendMessage = () => {
    const mailtoUrl = `mailto:${studentData.classTeacher.email}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoUrl;
    setShowContactForm(false);
    alert('Opening your default email client to send the message.');
  };

  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleDownloadReport = () => {
    // Generate a comprehensive report
    const reportContent = `
ACADEMIC PROGRESS REPORT
========================

Student Information:
Name: ${studentData.name}
Roll Number: ${studentData.rollNumber}
Department: ${studentData.department}
Current CGPA: ${studentData.currentCGPA}
Overall Attendance: ${studentData.attendance}%
Class Rank: ${studentData.rank} out of ${studentData.totalStudents}

Class Teacher:
${studentData.classTeacher.name} (${studentData.classTeacher.designation})
Email: ${studentData.classTeacher.email}
Phone: ${studentData.classTeacher.phone}

Subject-wise Performance:
${subjects.map(subject => `
${subject.name} (${subject.code}):
- Faculty: ${subject.faculty.name}
- Attendance: ${subject.attendance}%
- Overall Marks: ${subject.marks.total}%
- Next Assignment: ${subject.nextAssignment.title} (Due: ${subject.nextAssignment.dueDate})
`).join('')}

Upcoming Events:
${upcomingEvents.map(event => `
- ${event.title} on ${event.date} at ${event.time}
  Venue: ${event.venue}
  Description: ${event.description}
`).join('')}

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentData.name}_Academic_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    <div className="space-y-4 sm:space-y-6">
      {/* Student Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto sm:mx-0">
            <GraduationCap size={24} className="sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">{studentData.name}</h2>
            <p className="opacity-90 text-sm sm:text-base">{studentData.rollNumber} • {studentData.department}</p>
            <p className="opacity-75 text-sm">{studentData.year} • Section {studentData.section}</p>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold">{studentData.currentCGPA}</div>
            <div className="opacity-90 text-sm">Current CGPA</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <TrendingUp size={16} className="sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{studentData.attendance}%</div>
              <div className="text-xs sm:text-sm text-gray-600">Attendance</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <Trophy size={16} className="sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">#{studentData.rank}</div>
              <div className="text-xs sm:text-sm text-gray-600">Class Rank</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <BookOpen size={16} className="sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{subjects.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Subjects</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <Users size={16} className="sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{studentData.totalStudents}</div>
              <div className="text-xs sm:text-sm text-gray-600">Classmates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Teacher Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Teacher Information</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
            <GraduationCap size={24} className="sm:w-8 sm:h-8 text-blue-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-semibold text-gray-900">{studentData.classTeacher.name}</h4>
            <p className="text-gray-600">{studentData.classTeacher.designation}</p>
            <p className="text-sm text-gray-500">{studentData.classTeacher.experience} teaching experience</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              onClick={() => handleContactTeacher(studentData.classTeacher.email, studentData.classTeacher.name)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Mail size={14} className="sm:w-4 sm:h-4" />
              Email Teacher
            </button>
            <button 
              onClick={() => handlePhoneCall(studentData.classTeacher.phone)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Phone size={14} className="sm:w-4 sm:h-4" />
              Call Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Classroom Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="font-medium">Location</span>
            </div>
            <p className="text-gray-700">Room {studentData.classroom.roomNumber}</p>
            <p className="text-sm text-gray-600">{studentData.classroom.building}</p>
            <p className="text-sm text-gray-600">{studentData.classroom.floor}</p>
            <button
              onClick={() => handleGetDirections(studentData.classroom.address, studentData.classroom.roomNumber)}
              className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
            >
              <Navigation size={14} />
              Get Directions
            </button>
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
              <span key={index} className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full">
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
        <div key={subject.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{subject.code} • {subject.credits} Credits</p>
            </div>
            <div className="text-center sm:text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(subject.attendance)}`}>
                {subject.attendance}% Attendance
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Faculty Information</h4>
              <div className="space-y-1">
                <p className="text-gray-700">{subject.faculty.name}</p>
                <p className="text-sm text-gray-600">{subject.faculty.email}</p>
                <p className="text-sm text-gray-600">{subject.faculty.phone}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleContactTeacher(subject.faculty.email, subject.faculty.name)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Mail size={14} />
                  Email
                </button>
                <button
                  onClick={() => handlePhoneCall(subject.faculty.phone)}
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Phone size={14} />
                  Call
                </button>
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
    <div className="space-y-4 sm:space-y-6">
      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{studentData.currentCGPA}</div>
            <div className="text-sm text-blue-800">Current CGPA</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-green-600">{studentData.attendance}%</div>
            <div className="text-sm text-green-800">Overall Attendance</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600">#{studentData.rank}</div>
            <div className="text-sm text-purple-800">Class Rank</div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
        
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{subject.name}</h4>
                  <p className="text-sm text-gray-600">{subject.code}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(subject.marks.total)}`}>
                  {subject.marks.total}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Attendance:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getAttendanceColor(subject.attendance)}`}>
                    {subject.attendance}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Assignment 1:</span>
                  <span className="ml-2 font-medium">{subject.marks.assignment1}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Assignment 2:</span>
                  <span className="ml-2 font-medium">{subject.marks.assignment2}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Midterm:</span>
                  <span className="ml-2 font-medium">{subject.marks.midterm}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Project:</span>
                  <span className="ml-2 font-medium">{subject.marks.project}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments & Deadlines</h3>
        <div className="space-y-3">
          {subjects.filter(s => s.nextAssignment.status !== 'submitted').map((subject) => (
            <div key={subject.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-md gap-2">
              <div>
                <div className="font-medium text-gray-900">{subject.nextAssignment.title}</div>
                <div className="text-sm text-gray-600">{subject.name} ({subject.code})</div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm font-medium text-gray-900">
                  Due: {new Date(subject.nextAssignment.dueDate).toLocaleDateString()}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
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

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Class Schedule</h3>
        
        {/* Mobile Schedule View */}
        <div className="block lg:hidden space-y-4">
          {days.map(day => {
            const daySchedule = subjects.flatMap(subject => 
              subject.schedule
                .filter(sched => sched.day === day)
                .map(sched => ({ ...sched, subject }))
            ).sort((a, b) => a.time.localeCompare(b.time));

            return (
              <div key={day} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{day}</h4>
                {daySchedule.length > 0 ? (
                  <div className="space-y-2">
                    {daySchedule.map((item, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-md">
                        <div className="font-medium text-blue-900">{item.subject.name}</div>
                        <div className="text-sm text-blue-700">{item.time} • {item.type}</div>
                        <div className="text-sm text-blue-600">{item.room}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No classes scheduled</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance Standing</h3>
      
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {classmates.map((student) => (
          <div 
            key={student.id}
            className={`p-4 rounded-lg border ${
              student.isCurrentStudent ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">#{student.rank}</span>
                  {student.rank <= 3 && <Trophy size={16} className="text-yellow-500" />}
                  {student.isCurrentStudent && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Your Child</span>
                  )}
                </div>
                <div className={`font-medium ${student.isCurrentStudent ? 'text-blue-700' : 'text-gray-700'}`}>
                  {student.name}
                </div>
                <div className="text-sm text-gray-600">{student.rollNumber}</div>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  student.cgpa >= 8.5 ? 'text-green-600' :
                  student.cgpa >= 7.5 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {student.cgpa}
                </span>
                <div className="text-xs text-gray-500">CGPA</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
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
        <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{event.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
              event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
              event.type === 'academic' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {event.type.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm mb-4">
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
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => handleAddToCalendar(event)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
            >
              <Calendar size={16} />
              Add to Calendar
            </button>
            <button 
              onClick={() => handleGetDirections(event.address, event.venue)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm transition-colors"
            >
              <Navigation size={16} />
              Get Directions
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Contact Teacher Modal
  const ContactTeacherModal = () => (
    showContactForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contact Teacher</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter email subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                  placeholder="Write your message here..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                  Send Email
                </button>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Subject Detail Modal
  const SubjectDetailModal = () => (
    selectedSubject && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
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
          
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Faculty & Schedule */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Faculty & Schedule</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-gray-900">{selectedSubject.faculty.name}</div>
                    <div className="text-sm text-gray-600">{selectedSubject.faculty.email}</div>
                    <div className="text-sm text-gray-600">{selectedSubject.faculty.phone}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleContactTeacher(selectedSubject.faculty.email, selectedSubject.faculty.name)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        <Mail size={12} />
                        Email
                      </button>
                      <button
                        onClick={() => handlePhoneCall(selectedSubject.faculty.phone)}
                        className="flex items-center gap-1 px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50"
                      >
                        <Phone size={12} />
                        Call
                      </button>
                    </div>
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
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
                  <div className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
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
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Classroom Details</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Complete academic information for {studentData.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button 
                onClick={handleDownloadReport}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                Download Report
              </button>
              <button 
                onClick={() => handleContactTeacher(studentData.classTeacher.email, studentData.classTeacher.name)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <MessageSquare size={16} />
                Contact Teacher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-3 sm:px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {React.createElement(tab.icon, { size: 16 })}
                  <span className="hidden sm:inline">{tab.label}</span>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => handleContactTeacher(studentData.classTeacher.email, studentData.classTeacher.name)}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Message Class Teacher</div>
                <div className="text-sm text-gray-600">Send direct message to {studentData.classTeacher.name}</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                const meetingEvent = {
                  title: 'Parent-Teacher Meeting with ' + studentData.classTeacher.name,
                  date: new Date().toISOString().split('T')[0],
                  time: '2:00 PM-3:00 PM',
                  description: `Meeting to discuss ${studentData.name}'s academic progress`,
                  address: studentData.classroom.address,
                  venue: studentData.classroom.roomNumber
                };
                handleAddToCalendar(meetingEvent);
              }}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Schedule Parent Meeting</div>
                <div className="text-sm text-gray-600">Book appointment with class teacher</div>
              </div>
            </button>
            
            <button 
              onClick={handleDownloadReport}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-800">Class Teacher</div>
                <div className="text-red-700">{studentData.classTeacher.phone}</div>
              </div>
              <button
                onClick={() => handlePhoneCall(studentData.classTeacher.phone)}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Call
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-800">College Office</div>
                <div className="text-red-700">+91-79-26851234</div>
              </div>
              <button
                onClick={() => handlePhoneCall('+91-79-26851234')}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Call
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-800">Hostel Warden</div>
                <div className="text-red-700">+91-79-26851567</div>
              </div>
              <button
                onClick={() => handlePhoneCall('+91-79-26851567')}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SubjectDetailModal />
      <ContactTeacherModal />
    </div>
  );
};

export default ChildClassroomDetails;