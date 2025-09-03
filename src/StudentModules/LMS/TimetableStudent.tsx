import React, { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserIcon, 
  BookOpenIcon,
  DownloadIcon,
  RefreshCwIcon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XIcon,
  PlayIcon,
  NotificationIcon,
  SettingsIcon
} from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'exam';
  semester: string;
  section: string;
  isOngoing: boolean;
  isUpcoming: boolean;
  duration: number;
  description?: string;
  meetingLink?: string;
}

interface DaySchedule {
  day: string;
  date: string;
  slots: TimeSlot[];
  totalClasses: number;
  completedClasses: number;
}

const TimetableStu: React.FC = () => {
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      date: '2025-09-02', // Updated to current week
      totalClasses: 6,
      completedClasses: 4,
      slots: [
        {
          id: '1',
          startTime: '09:00',
          endTime: '10:00',
          subject: 'Data Structures',
          faculty: 'Dr. Rajesh Kumar',
          room: 'Room 101',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Trees and Graph Algorithms',
          meetingLink: 'https://meet.google.com/'
        },
        {
          id: '2',
          startTime: '10:00',
          endTime: '11:00',
          subject: 'Database Management',
          faculty: 'Prof. Priya Sharma',
          room: 'Lab 201',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: true,
          isUpcoming: false,
          duration: 60,
          description: 'SQL Queries and Joins',
          meetingLink: 'https://meet.google.com/lab-dbms-201'
        },
        {
          id: '3',
          startTime: '11:30',
          endTime: '12:30',
          subject: 'Operating Systems',
          faculty: 'Dr. Amit Singh',
          room: 'Room 102',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: true,
          duration: 60,
          description: 'Process Synchronization',
          meetingLink: 'https://meet.google.com/os-class-102'
        },
        {
          id: '4',
          startTime: '14:00',
          endTime: '15:00',
          subject: 'Computer Networks',
          faculty: 'Prof. Neeta Agarwal',
          room: 'Room 105',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'TCP/IP Protocol Stack'
        },
        {
          id: '5',
          startTime: '15:30',
          endTime: '17:00',
          subject: 'Software Engineering',
          faculty: 'Dr. Ravi Mehta',
          room: 'Lab 301',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Agile Development Practices'
        },
        {
          id: '6',
          startTime: '17:00',
          endTime: '18:00',
          subject: 'Mathematics',
          faculty: 'Prof. Sunita Devi',
          room: 'Room 201',
          type: 'tutorial',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Linear Algebra Problems'
        }
      ]
    },
    {
      day: 'Tuesday',
      date: '2025-09-03',
      totalClasses: 5,
      completedClasses: 0,
      slots: [
        {
          id: '7',
          startTime: '09:00',
          endTime: '10:30',
          subject: 'Software Engineering',
          faculty: 'Prof. Neha Gupta',
          room: 'Room 103',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Software Testing Methodologies'
        },
        {
          id: '8',
          startTime: '11:00',
          endTime: '12:00',
          subject: 'Data Structures',
          faculty: 'Dr. Rajesh Kumar',
          room: 'Lab 102',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Implementation of Binary Trees'
        },
        {
          id: '9',
          startTime: '14:00',
          endTime: '15:30',
          subject: 'Database Management',
          faculty: 'Prof. Priya Sharma',
          room: 'Lab 201',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Database Design Project'
        },
        {
          id: '10',
          startTime: '16:00',
          endTime: '17:00',
          subject: 'Operating Systems',
          faculty: 'Dr. Amit Singh',
          room: 'Room 102',
          type: 'tutorial',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Problem Solving Session'
        },
        {
          id: '11',
          startTime: '17:00',
          endTime: '18:00',
          subject: 'Computer Networks',
          faculty: 'Prof. Neeta Agarwal',
          room: 'Lab 301',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Network Configuration Lab'
        }
      ]
    },
    {
      day: 'Wednesday',
      date: '2025-09-04',
      totalClasses: 4,
      completedClasses: 0,
      slots: [
        {
          id: '12',
          startTime: '10:00',
          endTime: '11:00',
          subject: 'Mathematics',
          faculty: 'Prof. Sunita Devi',
          room: 'Room 201',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Calculus and Derivatives'
        },
        {
          id: '13',
          startTime: '11:30',
          endTime: '12:30',
          subject: 'Data Structures',
          faculty: 'Dr. Rajesh Kumar',
          room: 'Room 101',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Graph Algorithms'
        },
        {
          id: '14',
          startTime: '14:00',
          endTime: '16:00',
          subject: 'Software Engineering',
          faculty: 'Prof. Neha Gupta',
          room: 'Lab 301',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 120,
          description: 'Project Development Lab'
        },
        {
          id: '15',
          startTime: '16:30',
          endTime: '17:30',
          subject: 'Operating Systems',
          faculty: 'Dr. Amit Singh',
          room: 'Room 102',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'File Systems'
        }
      ]
    },
    {
      day: 'Thursday',
      date: '2025-09-05',
      totalClasses: 5,
      completedClasses: 0,
      slots: [
        {
          id: '16',
          startTime: '09:00',
          endTime: '10:00',
          subject: 'Computer Networks',
          faculty: 'Prof. Neeta Agarwal',
          room: 'Room 105',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'OSI Model'
        },
        {
          id: '17',
          startTime: '10:30',
          endTime: '12:00',
          subject: 'Database Management',
          faculty: 'Prof. Priya Sharma',
          room: 'Lab 201',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Advanced SQL Queries'
        },
        {
          id: '18',
          startTime: '14:00',
          endTime: '15:00',
          subject: 'Mathematics',
          faculty: 'Prof. Sunita Devi',
          room: 'Room 201',
          type: 'tutorial',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Problem Solving'
        },
        {
          id: '19',
          startTime: '15:30',
          endTime: '16:30',
          subject: 'Data Structures',
          faculty: 'Dr. Rajesh Kumar',
          room: 'Room 101',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Dynamic Programming'
        },
        {
          id: '20',
          startTime: '17:00',
          endTime: '18:00',
          subject: 'Operating Systems',
          faculty: 'Dr. Amit Singh',
          room: 'Lab 102',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Shell Programming'
        }
      ]
    },
    {
      day: 'Friday',
      date: '2025-09-06',
      totalClasses: 4,
      completedClasses: 0,
      slots: [
        {
          id: '21',
          startTime: '09:00',
          endTime: '10:30',
          subject: 'Software Engineering',
          faculty: 'Prof. Neha Gupta',
          room: 'Room 103',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Project Management'
        },
        {
          id: '22',
          startTime: '11:00',
          endTime: '12:00',
          subject: 'Computer Networks',
          faculty: 'Prof. Neeta Agarwal',
          room: 'Lab 301',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Packet Tracer Lab'
        },
        {
          id: '23',
          startTime: '14:00',
          endTime: '15:30',
          subject: 'Data Structures',
          faculty: 'Dr. Rajesh Kumar',
          room: 'Lab 102',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Algorithm Implementation'
        },
        {
          id: '24',
          startTime: '16:00',
          endTime: '17:00',
          subject: 'Mathematics',
          faculty: 'Prof. Sunita Devi',
          room: 'Room 201',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 60,
          description: 'Statistics and Probability'
        }
      ]
    },
    {
      day: 'Saturday',
      date: '2025-09-07',
      totalClasses: 2,
      completedClasses: 0,
      slots: [
        {
          id: '25',
          startTime: '10:00',
          endTime: '11:30',
          subject: 'Database Management',
          faculty: 'Prof. Priya Sharma',
          room: 'Room 201',
          type: 'lecture',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 90,
          description: 'Database Security'
        },
        {
          id: '26',
          startTime: '14:00',
          endTime: '16:00',
          subject: 'Operating Systems',
          faculty: 'Dr. Amit Singh',
          room: 'Lab 102',
          type: 'lab',
          semester: '3',
          section: 'A',
          isOngoing: false,
          isUpcoming: false,
          duration: 120,
          description: 'System Programming Lab'
        }
      ]
    },
    {
      day: 'Sunday',
      date: '2025-09-08',
      totalClasses: 0,
      completedClasses: 0,
      slots: []
    }
  ]);

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [showNotifications, setShowNotifications] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSlotDetails, setShowSlotDetails] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<string>('default');
  const [reminders, setReminders] = useState<string[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateOngoingClasses();
      
      // Check for upcoming classes and send notifications
      checkForUpcomingClasses();
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const updateOngoingClasses = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().split('T')[0];
    
    setWeekSchedule(prev => prev.map(day => ({
      ...day,
      slots: day.slots.map(slot => {
        const isToday = day.date === currentDate;
        const isOngoing = isToday && slot.startTime <= currentTimeStr && slot.endTime > currentTimeStr;
        const startTime = new Date(`1970-01-01T${slot.startTime}:00`);
        const currentTimeObj = new Date(`1970-01-01T${currentTimeStr}:00`);
        const timeDiff = startTime.getTime() - currentTimeObj.getTime();
        const isUpcoming = isToday && timeDiff > 0 && timeDiff <= 30 * 60 * 1000; // 30 minutes

        return {
          ...slot,
          isOngoing,
          isUpcoming
        };
      })
    })));
  };

  const checkForUpcomingClasses = () => {
    if (notificationPermission !== 'granted') return;

    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().split('T')[0];

    weekSchedule.forEach(day => {
      if (day.date === currentDate) {
        day.slots.forEach(slot => {
          const startTime = new Date(`1970-01-01T${slot.startTime}:00`);
          const currentTimeObj = new Date(`1970-01-01T${currentTimeStr}:00`);
          const timeDiff = startTime.getTime() - currentTimeObj.getTime();

          // Notify 15 minutes before class
          if (timeDiff > 0 && timeDiff <= 15 * 60 * 1000 && !reminders.includes(slot.id)) {
            new Notification(`Upcoming Class: ${slot.subject}`, {
              body: `${slot.subject} starts in 15 minutes at ${slot.room}`,
              icon: '/favicon.ico'
            });
            setReminders(prev => [...prev, slot.id]);
          }
        });
      }
    });
  };

  const getSlotColor = (type: string, isOngoing: boolean, isUpcoming: boolean) => {
    if (isOngoing) return 'bg-green-100 border-l-green-500 text-green-800 shadow-md';
    if (isUpcoming) return 'bg-yellow-100 border-l-yellow-500 text-yellow-800 shadow-md';
    
    const colors = {
      lecture: 'bg-blue-100 border-l-blue-300 text-blue-800',
      lab: 'bg-purple-100 border-l-purple-300 text-purple-800',
      tutorial: 'bg-orange-100 border-l-orange-300 text-orange-800',
      exam: 'bg-red-100 border-l-red-300 text-red-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getCurrentDaySchedule = () => {
    return weekSchedule.find(day => day.day === selectedDay) || weekSchedule[0];
  };

  const getUpcomingClasses = () => {
    const upcoming: TimeSlot[] = [];
    weekSchedule.forEach(day => {
      day.slots.forEach(slot => {
        if (slot.isUpcoming || slot.isOngoing) {
          upcoming.push(slot);
        }
      });
    });
    return upcoming.slice(0, 3);
  };

  const exportTimetable = () => {
    try {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Day,Date,Time,Subject,Faculty,Room,Type,Duration\n" +
        weekSchedule.map(day => 
          day.slots.map(slot => 
            `${day.day},"${day.date}","${slot.startTime}-${slot.endTime}","${slot.subject}","${slot.faculty}","${slot.room}","${slot.type}","${slot.duration} min"`
          ).join('\n')
        ).join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_timetable.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      alert('Timetable exported successfully!');
    } catch (error) {
      alert('Error exporting timetable. Please try again.');
    }
  };

  const joinClass = (slot: TimeSlot) => {
    if (slot.meetingLink) {
      window.open(slot.meetingLink, '_blank');
    } else {
      alert(`Joining ${slot.subject} class...`);
    }
  };

  const setReminder = (slot: TimeSlot) => {
    if ('Notification' in window) {
      if (notificationPermission === 'granted') {
        alert(`Reminder set for ${slot.subject} at ${slot.startTime}`);
      } else if (notificationPermission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
          if (permission === 'granted') {
            alert(`Reminder set for ${slot.subject} at ${slot.startTime}`);
          }
        });
      } else {
        alert('Please enable notifications in your browser settings to set reminders.');
      }
    }
  };

  const refreshTimetable = () => {
    updateOngoingClasses();
    setCurrentTime(new Date());
    alert('Timetable refreshed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Timetable</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your class schedule and stay organized</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={refreshTimetable}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <RefreshCwIcon size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={exportTimetable}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
              >
                <DownloadIcon size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="current">Current Week</option>
                <option value="next">Next Week</option>
                <option value="previous">Previous Week</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-2 text-sm ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-2 text-sm ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg`}
                >
                  Day
                </button>
              </div>
            </div>

            {viewMode === 'day' && (
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm max-w-xs"
              >
                {weekSchedule.map(day => (
                  <option key={day.day} value={day.day}>{day.day}</option>
                ))}
              </select>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-xs sm:text-sm font-medium">Today's Classes</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-900">
                    {weekSchedule.find(d => d.date === new Date().toISOString().split('T')[0])?.slots.length || 0}
                  </p>
                </div>
                <CalendarIcon className="text-blue-600" size={20} />
              </div>
            </div>
            
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-xs sm:text-sm font-medium">Completed</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-900">
                    {weekSchedule.find(d => d.date === new Date().toISOString().split('T')[0])?.completedClasses || 0}
                  </p>
                </div>
                <CheckCircleIcon className="text-green-600" size={20} />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-xs sm:text-sm font-medium">Ongoing</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-900">
                    {getUpcomingClasses().filter(c => c.isOngoing).length}
                  </p>
                </div>
                <ClockIcon className="text-yellow-600" size={20} />
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-xs sm:text-sm font-medium">This Week</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900">
                    {weekSchedule.reduce((sum, day) => sum + day.slots.length, 0)}
                  </p>
                </div>
                <BookOpenIcon className="text-purple-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes Alert */}
        {showNotifications && getUpcomingClasses().length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-4 sm:mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <BellIcon className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Upcoming Classes</h3>
                  <p className="text-blue-700 text-xs sm:text-sm">You have {getUpcomingClasses().length} classes coming up</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-blue-600 hover:text-blue-800 flex-shrink-0 p-1"
              >
                <XIcon size={16} />
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {getUpcomingClasses().map(classItem => (
                <div key={classItem.id} className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{classItem.subject}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{classItem.startTime} - {classItem.endTime} • {classItem.room}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        classItem.isOngoing ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {classItem.isOngoing ? 'Ongoing' : 'Upcoming'}
                      </span>
                      {classItem.isOngoing && (
                        <button
                          onClick={() => joinClass(classItem)}
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timetable Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {viewMode === 'week' ? (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Weekly Schedule</h2>
              <div className="overflow-x-auto">
                {isMobileView ? (
                  // Mobile accordion view
                  <div className="space-y-3">
                    {weekSchedule.map(day => (
                      <div key={day.day} className="border border-gray-200 rounded-lg">
                        <div 
                          className="bg-gray-50 p-3 cursor-pointer"
                          onClick={() => setSelectedDay(selectedDay === day.day ? '' : day.day)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{day.day}</h3>
                              <p className="text-sm text-gray-600">{day.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {day.slots.length} classes
                              </span>
                              <div className="w-12 bg-gray-200 rounded-full h-1">
                                <div 
                                  className="bg-green-500 h-1 rounded-full transition-all"
                                  style={{ width: `${day.slots.length > 0 ? (day.completedClasses / day.slots.length) * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {selectedDay === day.day && (
                          <div className="p-3 space-y-2">
                            {day.slots.length === 0 ? (
                              <p className="text-gray-500 text-sm text-center py-4">No classes scheduled</p>
                            ) : (
                              day.slots.map(slot => (
                                <div
                                  key={slot.id}
                                  className={`p-3 rounded-lg border-l-4 ${getSlotColor(slot.type, slot.isOngoing, slot.isUpcoming)}`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium uppercase tracking-wide">
                                      {slot.type}
                                    </span>
                                    <span className="text-xs">
                                      {slot.startTime} - {slot.endTime}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-sm mb-1">{slot.subject}</h4>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs">
                                      <UserIcon size={10} />
                                      <span className="truncate">{slot.faculty}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <MapPinIcon size={10} />
                                      <span>{slot.room}</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    <button 
                                      onClick={() => setShowSlotDetails(slot.id)}
                                      className="bg-white bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded text-xs transition-colors"
                                    >
                                      Details
                                    </button>
                                    {slot.isOngoing && (
                                      <button
                                        onClick={() => joinClass(slot)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                                      >
                                        <PlayIcon size={10} className="inline mr-1" />
                                        Join
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Desktop grid view
                  <div className="grid grid-cols-7 gap-4 min-w-[1000px]">
                    {weekSchedule.map(day => (
                      <div key={day.day} className="min-w-0">
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm">{day.day}</h3>
                          <p className="text-xs text-gray-600">{day.date}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {day.slots.length}
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-green-500 h-1 rounded-full transition-all"
                                style={{ width: `${day.slots.length > 0 ? (day.completedClasses / day.slots.length) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {day.slots.length === 0 ? (
                            <div className="text-center text-gray-500 text-xs py-4">
                              No classes
                            </div>
                          ) : (
                            day.slots.map(slot => (
                              <div
                                key={slot.id}
                                className={`p-3 rounded-lg border-l-4 ${getSlotColor(slot.type, slot.isOngoing, slot.isUpcoming)} cursor-pointer hover:shadow-md transition-all`}
                                onClick={() => setShowSlotDetails(showSlotDetails === slot.id ? null : slot.id)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium uppercase tracking-wide">
                                    {slot.type}
                                  </span>
                                  <span className="text-xs">
                                    {slot.startTime}
                                  </span>
                                </div>
                                <h4 className="font-medium text-sm mb-1 line-clamp-2">{slot.subject}</h4>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-xs">
                                    <UserIcon size={10} />
                                    <span className="truncate">{slot.faculty.split(' ').slice(-1)}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs">
                                    <MapPinIcon size={10} />
                                    <span>{slot.room}</span>
                                  </div>
                                </div>
                                {slot.isOngoing && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      joinClass(slot);
                                    }}
                                    className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded text-xs transition-colors"
                                  >
                                    Join Class
                                  </button>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Day view
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedDay} Schedule - {getCurrentDaySchedule().date}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{getCurrentDaySchedule().slots.length} classes</span>
                  <span>•</span>
                  <span>{getCurrentDaySchedule().completedClasses} completed</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {getCurrentDaySchedule().slots.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <CalendarIcon className="mx-auto mb-4" size={48} />
                    <h3 className="text-lg font-medium">No classes today</h3>
                    <p>Enjoy your free day!</p>
                  </div>
                ) : (
                  getCurrentDaySchedule().slots.map(slot => (
                    <div
                      key={slot.id}
                      className={`p-4 sm:p-6 rounded-xl border-l-4 ${getSlotColor(slot.type, slot.isOngoing, slot.isUpcoming)}`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                            <h3 className="text-lg sm:text-xl font-semibold">{slot.subject}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-medium uppercase bg-white bg-opacity-50 self-start">
                              {slot.type}
                            </span>
                            {slot.isOngoing && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse self-start">
                                Live Now
                              </span>
                            )}
                            {slot.isUpcoming && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white self-start">
                                Starting Soon
                              </span>
                            )}
                          </div>
                          
                          {slot.description && (
                            <p className="text-gray-600 mb-3 text-sm">{slot.description}</p>
                          )}
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <ClockIcon size={16} />
                              <div>
                                <p className="font-medium text-sm">{slot.startTime} - {slot.endTime}</p>
                                <p className="text-xs opacity-75">{slot.duration} minutes</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserIcon size={16} />
                              <div>
                                <p className="font-medium text-sm">{slot.faculty}</p>
                                <p className="text-xs opacity-75">Instructor</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPinIcon size={16} />
                              <div>
                                <p className="font-medium text-sm">{slot.room}</p>
                                <p className="text-xs opacity-75">Section {slot.section}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-bold mb-1">
                            {slot.startTime}
                          </div>
                          <div className="text-sm opacity-75">
                            {slot.duration}min
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button 
                          onClick={() => setShowSlotDetails(showSlotDetails === slot.id ? null : slot.id)}
                          className="bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          {showSlotDetails === slot.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button 
                          onClick={() => setReminder(slot)}
                          className="bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          Set Reminder
                        </button>
                        {slot.isOngoing && (
                          <button
                            onClick={() => joinClass(slot)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            <PlayIcon size={16} className="inline mr-1" />
                            Join Class
                          </button>
                        )}
                      </div>
                      
                      {/* Expanded Details */}
                      {showSlotDetails === slot.id && (
                        <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium mb-2">Class Information</h4>
                              <p><strong>Subject:</strong> {slot.subject}</p>
                              <p><strong>Type:</strong> {slot.type}</p>
                              <p><strong>Duration:</strong> {slot.duration} minutes</p>
                              <p><strong>Semester:</strong> {slot.semester}</p>
                              <p><strong>Section:</strong> {slot.section}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Location & Faculty</h4>
                              <p><strong>Room:</strong> {slot.room}</p>
                              <p><strong>Faculty:</strong> {slot.faculty}</p>
                              {slot.meetingLink && (
                                <p><strong>Meeting Link:</strong> 
                                  <a 
                                    href={slot.meetingLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline ml-1"
                                  >
                                    Join Online
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>
                          {slot.description && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Description</h4>
                              <p className="text-sm">{slot.description}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetableStu;
