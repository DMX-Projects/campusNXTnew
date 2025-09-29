import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  Play,
  Users,
  BookOpen,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  User,
  Link,
  Download,
  CheckCircle,
  AlertCircle,
  Radio,
  Pause,
  RotateCcw,
  Monitor,
  Wifi,
  Volume2,
  Camera,
  Mic,
  Share2,
  MessageSquare,
  Award,
  Target
} from 'lucide-react';

interface OnlineClass {
  id: string;
  title: string;
  subject: string;
  facultyName: string;
  facultyEmail: string;
  description: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  type: 'live' | 'recorded' | 'hybrid';
  platform: 'zoom' | 'teams' | 'meet' | 'webex' | 'custom';
  status: 'upcoming' | 'live' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  meetingId?: string;
  passcode?: string;
  maxParticipants: number;
  currentParticipants: number;
  semester: string;
  unit: string;
  topics: string[];
  prerequisites: string[];
  materials: ClassMaterial[];
  recordings?: Recording[];
  attendance?: AttendanceRecord;
  isRecorded: boolean;
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  breakoutRoomsEnabled: boolean;
  whiteboardEnabled: boolean;
}

interface ClassMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'ppt' | 'doc' | 'link' | 'video';
  url: string;
  description: string;
  downloadable: boolean;
}

interface Recording {
  id: string;
  title: string;
  duration: number;
  recordedDate: string;
  url: string;
  views: number;
  size: string;
}

interface AttendanceRecord {
  studentId: string;
  joinTime?: string;
  leaveTime?: string;
  duration: number;
  status: 'present' | 'absent' | 'late' | 'partial';
}

const OnlineClasses: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<OnlineClass | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'completed' | 'recordings'>('upcoming');

  // Sample online classes data
  const [onlineClasses] = useState<OnlineClass[]>([
    {
      id: '1',
      title: 'Advanced Data Structures - Trees and Graphs',
      subject: 'Data Structures & Algorithms',
      facultyName: 'Dr. Rajesh Kumar',
      facultyEmail: 'rajesh.kumar@college.edu.in',
      description: 'Deep dive into tree structures, binary search trees, and graph algorithms with practical implementations',
      scheduledDate: '2025-09-30',
      startTime: '10:00',
      endTime: '11:30',
      duration: 90,
      type: 'live',
      platform: 'zoom',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/123456789',
      meetingId: '123-456-789',
      passcode: 'DSA2025',
      maxParticipants: 100,
      currentParticipants: 0,
      semester: 'Semester 5',
      unit: 'Unit 3',
      topics: ['Binary Search Trees', 'AVL Trees', 'Graph Traversals', 'Shortest Path Algorithms'],
      prerequisites: ['Basic understanding of arrays and linked lists'],
      materials: [
        { id: '1', title: 'Tree Algorithms Notes', type: 'pdf', url: '#', description: 'Comprehensive notes on tree data structures', downloadable: true },
        { id: '2', title: 'Graph Theory Slides', type: 'ppt', url: '#', description: 'PowerPoint presentation on graph algorithms', downloadable: true },
        { id: '3', title: 'Coding Examples', type: 'link', url: '#', description: 'GitHub repository with code examples', downloadable: false }
      ],
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: false,
      whiteboardEnabled: true
    },
    {
      id: '2',
      title: 'Database Design and Normalization Workshop',
      subject: 'Database Management Systems',
      facultyName: 'Prof. Priya Sharma',
      facultyEmail: 'priya.sharma@college.edu.in',
      description: 'Interactive workshop on database design principles, ER modeling, and normalization techniques',
      scheduledDate: '2025-09-27',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      type: 'hybrid',
      platform: 'teams',
      status: 'live',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting',
      meetingId: 'DB-Workshop-2025',
      maxParticipants: 80,
      currentParticipants: 67,
      semester: 'Semester 5',
      unit: 'Unit 2',
      topics: ['ER Diagrams', 'Functional Dependencies', '1NF, 2NF, 3NF', 'BCNF'],
      prerequisites: ['Basic SQL knowledge'],
      materials: [
        { id: '1', title: 'Database Design Guide', type: 'pdf', url: '#', description: 'Complete guide to database design', downloadable: true },
        { id: '2', title: 'Normalization Examples', type: 'doc', url: '#', description: 'Worked examples of normalization', downloadable: true }
      ],
      attendance: {
        studentId: 'ST001',
        joinTime: '14:05',
        duration: 75,
        status: 'present'
      },
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: true,
      whiteboardEnabled: false
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals - Introduction',
      subject: 'Machine Learning',
      facultyName: 'Dr. Arjun Reddy',
      facultyEmail: 'arjun.reddy@college.edu.in',
      description: 'Introduction to machine learning concepts, types of learning, and basic algorithms',
      scheduledDate: '2025-09-25',
      startTime: '11:00',
      endTime: '12:30',
      duration: 90,
      type: 'recorded',
      platform: 'meet',
      status: 'completed',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      maxParticipants: 60,
      currentParticipants: 54,
      semester: 'Semester 5',
      unit: 'Unit 1',
      topics: ['Types of Learning', 'Supervised vs Unsupervised', 'Model Evaluation', 'Cross Validation'],
      prerequisites: ['Statistics', 'Python Programming'],
      materials: [
        { id: '1', title: 'ML Introduction Slides', type: 'ppt', url: '#', description: 'Introduction to machine learning concepts', downloadable: true },
        { id: '2', title: 'Python ML Libraries', type: 'link', url: '#', description: 'Essential Python libraries for ML', downloadable: false }
      ],
      recordings: [
        { id: '1', title: 'ML Fundamentals Session', duration: 87, recordedDate: '2025-09-25', url: '#', views: 142, size: '450 MB' }
      ],
      attendance: {
        studentId: 'ST001',
        joinTime: '11:02',
        leaveTime: '12:28',
        duration: 86,
        status: 'present'
      },
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: false,
      whiteboardEnabled: true
    },
    {
      id: '4',
      title: 'Web Development - React Hooks Deep Dive',
      subject: 'Web Technologies',
      facultyName: 'Ms. Kavya Singh',
      facultyEmail: 'kavya.singh@college.edu.in',
      description: 'Advanced React concepts focusing on hooks, state management, and performance optimization',
      scheduledDate: '2025-10-02',
      startTime: '15:00',
      endTime: '16:30',
      duration: 90,
      type: 'live',
      platform: 'zoom',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/987654321',
      meetingId: '987-654-321',
      passcode: 'React2025',
      maxParticipants: 75,
      currentParticipants: 0,
      semester: 'Semester 5',
      unit: 'Unit 3',
      topics: ['useState Hook', 'useEffect Hook', 'useContext Hook', 'Custom Hooks', 'Performance Optimization'],
      prerequisites: ['Basic React knowledge', 'JavaScript ES6+'],
      materials: [
        { id: '1', title: 'React Hooks Guide', type: 'pdf', url: '#', description: 'Comprehensive guide to React hooks', downloadable: true },
        { id: '2', title: 'Code Examples', type: 'link', url: '#', description: 'Live coding examples', downloadable: false }
      ],
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: true,
      whiteboardEnabled: false
    },
    {
      id: '5',
      title: 'Software Engineering - Agile Methodologies',
      subject: 'Software Engineering',
      facultyName: 'Dr. Vikash Yadav',
      facultyEmail: 'vikash.yadav@college.edu.in',
      description: 'Understanding Agile development methodologies, Scrum framework, and project management practices',
      scheduledDate: '2025-09-23',
      startTime: '09:00',
      endTime: '10:30',
      duration: 90,
      type: 'recorded',
      platform: 'webex',
      status: 'completed',
      maxParticipants: 90,
      currentParticipants: 78,
      semester: 'Semester 5',
      unit: 'Unit 1',
      topics: ['Agile Principles', 'Scrum Framework', 'Sprint Planning', 'Daily Standups', 'Retrospectives'],
      prerequisites: ['Basic software development knowledge'],
      materials: [
        { id: '1', title: 'Agile Methodology Guide', type: 'pdf', url: '#', description: 'Complete guide to Agile practices', downloadable: true }
      ],
      recordings: [
        { id: '1', title: 'Agile Methodologies Session', duration: 88, recordedDate: '2025-09-23', url: '#', views: 89, size: '380 MB' }
      ],
      attendance: {
        studentId: 'ST001',
        joinTime: '09:05',
        leaveTime: '10:30',
        duration: 85,
        status: 'late'
      },
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: false,
      whiteboardEnabled: true
    },
    {
      id: '6',
      title: 'Network Security - Cryptography Basics',
      subject: 'Network Security',
      facultyName: 'Prof. Deepika Nair',
      facultyEmail: 'deepika.nair@college.edu.in',
      description: 'Introduction to cryptographic algorithms, symmetric and asymmetric encryption techniques',
      scheduledDate: '2025-10-05',
      startTime: '16:00',
      endTime: '17:30',
      duration: 90,
      type: 'live',
      platform: 'teams',
      status: 'rescheduled',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3asecurity',
      maxParticipants: 70,
      currentParticipants: 0,
      semester: 'Semester 6',
      unit: 'Unit 2',
      topics: ['Symmetric Encryption', 'Asymmetric Encryption', 'Digital Signatures', 'Hash Functions'],
      prerequisites: ['Basic mathematics', 'Computer networks fundamentals'],
      materials: [
        { id: '1', title: 'Cryptography Basics', type: 'pdf', url: '#', description: 'Introduction to cryptographic techniques', downloadable: true }
      ],
      isRecorded: true,
      chatEnabled: true,
      screenShareEnabled: true,
      breakoutRoomsEnabled: false,
      whiteboardEnabled: true
    }
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filteredClasses = onlineClasses.filter(classItem => {
    const matchesSearch = searchTerm === '' || 
      classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || classItem.status === statusFilter;
    const matchesSubject = subjectFilter === '' || classItem.subject === subjectFilter;
    const matchesPlatform = platformFilter === '' || classItem.platform === platformFilter;
    
    // Filter by active tab
    const matchesTab = 
      (activeTab === 'upcoming' && classItem.status === 'upcoming') ||
      (activeTab === 'live' && classItem.status === 'live') ||
      (activeTab === 'completed' && classItem.status === 'completed') ||
      (activeTab === 'recordings' && classItem.recordings && classItem.recordings.length > 0);
    
    return matchesSearch && matchesStatus && matchesSubject && matchesPlatform && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'live': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'live': return 'bg-red-500 text-white';
      case 'recorded': return 'bg-blue-500 text-white';
      case 'hybrid': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'zoom': return <Video className="w-4 h-4" />;
      case 'teams': return <Users className="w-4 h-4" />;
      case 'meet': return <Monitor className="w-4 h-4" />;
      case 'webex': return <Wifi className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'live': return <Radio className="w-4 h-4 text-red-500 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      case 'rescheduled': return <RotateCcw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <BookOpen className="w-4 h-4 text-red-500" />;
      case 'ppt': return <BookOpen className="w-4 h-4 text-orange-500" />;
      case 'doc': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'video': return <Video className="w-4 h-4 text-purple-500" />;
      case 'link': return <Link className="w-4 h-4 text-green-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (classItem: OnlineClass) => {
    setSelectedClass(classItem);
    setShowDetailModal(true);
  };

  const handleJoinClass = (classItem: OnlineClass) => {
    if (classItem.meetingLink) {
      window.open(classItem.meetingLink, '_blank');
    }
  };

  const getTimeUntilClass = (date: string, time: string) => {
    const classDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();
    const diffTime = classDateTime.getTime() - now.getTime();
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes} mins`;
    if (diffHours < 24) return `${diffHours} hours`;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };
  // Download material handler
const handleDownloadMaterial = (material: Material) => {
  // Example download logic (adjust URL logic to match actual implementation)
  const link = document.createElement("a");
  link.href = material.url;
  link.download = material.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// View material handler
const handleViewMaterial = (material: Material) => {
  // Example view logic (opens link in a new tab)
  window.open(material.url, "_blank");
};

  const summaryStats = {
    totalClasses: onlineClasses.length,
    upcomingClasses: onlineClasses.filter(c => c.status === 'upcoming').length,
    liveClasses: onlineClasses.filter(c => c.status === 'live').length,
    completedClasses: onlineClasses.filter(c => c.status === 'completed').length,
    recordedSessions: onlineClasses.filter(c => c.recordings && c.recordings.length > 0).length,
    avgAttendance: Math.round(onlineClasses.filter(c => c.attendance).reduce((acc, c) => acc + (c.attendance!.duration / c.duration * 100), 0) / onlineClasses.filter(c => c.attendance).length) || 0
  };

  // function handlePlayRecording(classItem: OnlineClass): void {
  //   throw new Error('Function not implemented.');
  // }
  function handlePlayRecording(classItem: OnlineClass) {
  if (classItem.recordings && classItem.recordings.length > 0) {
    const recording = classItem.recordings[0]; // Play the first recording for simplicity
    window.open(recording.url, '_blank');
  }
}


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Video className="w-8 h-8 mr-3 text-blue-500" />
            Online Classes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join live classes, access recordings, and participate in interactive learning sessions
          </p>
        </div>
      
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Classes</p>
              <p className="text-2xl font-bold">{summaryStats.totalClasses}</p>
            </div>
            <Video className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Upcoming</p>
              <p className="text-2xl font-bold">{summaryStats.upcomingClasses}</p>
            </div>
            <Clock className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Live Now</p>
              <p className="text-2xl font-bold">{summaryStats.liveClasses}</p>
            </div>
            <Radio className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold">{summaryStats.completedClasses}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Recordings</p>
              <p className="text-2xl font-bold">{summaryStats.recordedSessions}</p>
            </div>
            <Play className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Avg Attendance</p>
              <p className="text-2xl font-bold">{summaryStats.avgAttendance}%</p>
            </div>
            <Target className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'upcoming', label: 'Upcoming Classes', icon: Clock },
            { id: 'live', label: 'Live Classes', icon: Radio },
            { id: 'completed', label: 'Completed Classes', icon: CheckCircle },
            { id: 'recordings', label: 'Recordings', icon: Play }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Database Management Systems">Database Management Systems</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Technologies">Web Technologies</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Network Security">Network Security</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Platforms</option>
            <option value="zoom">Zoom</option>
            <option value="teams">Microsoft Teams</option>
            <option value="meet">Google Meet</option>
            <option value="webex">Webex</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
          

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setSubjectFilter('');
              setPlatformFilter('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Class Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                    {classItem.type.toUpperCase()}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getPlatformIcon(classItem.platform)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{classItem.platform}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(classItem.status)} flex items-center space-x-1`}>
                  {getStatusIcon(classItem.status)}
                  <span>{classItem.status.toUpperCase()}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {classItem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {classItem.description}
              </p>
            </div>

            {/* Class Body */}
            <div className="p-6">
              <div className="space-y-4 mb-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{classItem.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{classItem.facultyName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(classItem.scheduledDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {classItem.startTime} - {classItem.endTime} ({classItem.duration} mins)
                  </span>
                </div>

                {classItem.status === 'upcoming' && (
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      Starts in {getTimeUntilClass(classItem.scheduledDate, classItem.startTime)}
                    </span>
                  </div>
                )}

                {classItem.status === 'live' && (
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Class is Live!</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {classItem.currentParticipants}/{classItem.maxParticipants}
                      </span>
                    </div>
                  </div>
                )}

                {classItem.attendance && (
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-blue-700 dark:text-blue-300">Your Attendance:</span>
                      <span className={`font-bold ${
                        classItem.attendance.status === 'present' ? 'text-green-600 dark:text-green-400' :
                        classItem.attendance.status === 'late' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {classItem.attendance.status.toUpperCase()}
                      </span>
                    </div>
                    {classItem.attendance.duration && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Duration: {classItem.attendance.duration} minutes
                      </div>
                    )}
                  </div>
                )}

                <div className="text-sm">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Unit & Topics:</p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{classItem.unit}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {classItem.topics.slice(0, 2).map((topic, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                    {classItem.topics.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        +{classItem.topics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Class Features */}
                <div className="flex flex-wrap gap-2">
                  {classItem.isRecorded && (
                    <span className="flex items-center space-x-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      <Video className="w-3 h-3" />
                      <span>Recorded</span>
                    </span>
                  )}
                  {classItem.chatEnabled && (
                    <span className="flex items-center space-x-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </span>
                  )}
                  {classItem.screenShareEnabled && (
                    <span className="flex items-center space-x-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                      <Share2 className="w-3 h-3" />
                      <span>Screen Share</span>
                    </span>
                  )}
                  {classItem.whiteboardEnabled && (
                    <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded-full text-xs">
                      <Award className="w-3 h-3" />
                      <span>Whiteboard</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewDetails(classItem)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                {classItem.status === 'live' && (
                  <button
                    onClick={() => handleJoinClass(classItem)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 animate-pulse"
                  >
                    <Play className="w-4 h-4" />
                    <span>Join Now</span>
                  </button>
                )}
                {classItem.status === 'upcoming' && classItem.meetingLink && (
                  <button
                    onClick={() => handleJoinClass(classItem)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                )}
                {classItem.recordings && classItem.recordings.length > 0 && (
                  // <button onClick={() => handlePlayRecording(classItem)} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                  //   <Play className="w-4 h-4" />
                  // </button>
                  <button
  onClick={() => handlePlayRecording(classItem)}
  className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg"
>
  <Play className="w-4 h-4" />
</button>

                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedClass.title}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Class Information</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedClass.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedClass.subject}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Faculty:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedClass.facultyName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                        <p className="text-gray-900 dark:text-gray-100">{new Date(selectedClass.scheduledDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Time:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedClass.startTime} - {selectedClass.endTime}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedClass.duration} minutes</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Platform:</span>
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(selectedClass.platform)}
                          <span className="capitalize">{selectedClass.platform}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Topics to be Covered</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedClass.topics.map((topic, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedClass.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Prerequisites</h4>
                      <ul className="space-y-1">
                        {selectedClass.prerequisites.map((prereq, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Class Materials</h4>
                    <div className="space-y-2">
                      {selectedClass.materials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getMaterialIcon(material.type)}
                            <div>
                              <p className="text-sm font-medium">{material.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{material.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {material.downloadable && (
                              <button onClick={() => handleDownloadMaterial(material)} className="text-blue-500 hover:text-blue-600 p-1">
                                <Download className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => handleViewMaterial(material)} className="text-green-500 hover:text-green-600 p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedClass.recordings && selectedClass.recordings.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Class Recordings</h4>
                      <div className="space-y-2">
                        {selectedClass.recordings.map((recording) => (
                          <div key={recording.id} className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Play className="w-5 h-5 text-purple-600" />
                              <div>
                                <p className="text-sm font-medium">{recording.title}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                  <span>{recording.duration} minutes</span>
                                  <span>{recording.views} views</span>
                                  <span>{recording.size}</span>
                                  <span>{new Date(recording.recordedDate).toLocaleDateString('en-IN')}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => window.open(recording.url, '_blank')}
                              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Class Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedClass.status)}`}>
                          {selectedClass.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(selectedClass.type)}`}>
                          {selectedClass.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Participants:</span>
                        <span className="font-medium">{selectedClass.currentParticipants}/{selectedClass.maxParticipants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit:</span>
                        <span className="font-medium">{selectedClass.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Semester:</span>
                        <span className="font-medium">{selectedClass.semester}</span>
                      </div>
                    </div>
                  </div>

                  {selectedClass.meetingId && (
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Meeting Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Meeting ID:</span>
                          <p className="text-blue-600 dark:text-blue-400 font-mono">{selectedClass.meetingId}</p>
                        </div>
                        {selectedClass.passcode && (
                          <div>
                            <span className="font-medium">Passcode:</span>
                            <p className="text-blue-600 dark:text-blue-400 font-mono">{selectedClass.passcode}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedClass.attendance && (
                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-green-800 dark:text-green-200">Your Attendance</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={`font-bold ${
                            selectedClass.attendance.status === 'present' ? 'text-green-600 dark:text-green-400' :
                            selectedClass.attendance.status === 'late' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {selectedClass.attendance.status.toUpperCase()}
                          </span>
                        </div>
                        {selectedClass.attendance.joinTime && (
                          <div className="flex justify-between">
                            <span>Join Time:</span>
                            <span className="font-medium">{selectedClass.attendance.joinTime}</span>
                          </div>
                        )}
                        {selectedClass.attendance.leaveTime && (
                          <div className="flex justify-between">
                            <span>Leave Time:</span>
                            <span className="font-medium">{selectedClass.attendance.leaveTime}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{selectedClass.attendance.duration} minutes</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Class Features</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Recording:</span>
                        <span className={selectedClass.isRecorded ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {selectedClass.isRecorded ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Chat:</span>
                        <span className={selectedClass.chatEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {selectedClass.chatEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Screen Share:</span>
                        <span className={selectedClass.screenShareEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {selectedClass.screenShareEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Breakout Rooms:</span>
                        <span className={selectedClass.breakoutRoomsEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {selectedClass.breakoutRoomsEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Whiteboard:</span>
                        <span className={selectedClass.whiteboardEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {selectedClass.whiteboardEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              {selectedClass.status === 'live' && (
                <button
                  onClick={() => handleJoinClass(selectedClass)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Join Class Now</span>
                </button>
              )}
              {selectedClass.status === 'upcoming' && selectedClass.meetingLink && (
                <button
                  onClick={() => handleJoinClass(selectedClass)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center space-x-2"
                >
                  <Link className="w-4 h-4" />
                  <span>Open Meeting Link</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineClasses;
