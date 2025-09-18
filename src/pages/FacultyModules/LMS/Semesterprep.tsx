import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  PlusIcon, 
  SearchIcon, 
  
  EditIcon,  
  EyeIcon,
  DownloadIcon,
  BellIcon,
  CheckCircleIcon,
  
  UserIcon,
  BookIcon,
  GraduationCapIcon
} from 'lucide-react';

interface SemesterData {
  id: string;
  semester: string;
  department: string;
  subjects: number;
  students: number;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  description?: string;
  coordinator: string;
  totalCredits: number;
  passingPercentage: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  faculty: string;
  completion: number;
  semesterId: string;
  type: 'theory' | 'lab' | 'project';
  hours: number;
  assessment: {
    internal: number;
    external: number;
    practical: number;
  };
  schedule: string;
  syllabus?: string;
}

interface Faculty {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: number;
  subjects: string[];
}

const Semesterprep: React.FC = () => {
  const [semesterData, setSemesterData] = useState<SemesterData[]>([
    {
      id: '1',
      semester: '5',
      department: 'CSE',
      subjects: 6,
      students: 120,
      progress: 75,
      startDate: '2025-08-15',
      endDate: '2025-12-20',
      status: 'active',
      description: 'Focus on advanced programming concepts and software development',
      coordinator: 'Dr. Priya Sharma',
      totalCredits: 22,
      passingPercentage: 60
    },
    {
      id: '2',
      semester: '6',
      department: 'CSE',
      subjects: 7,
      students: 115,
      progress: 45,
      startDate: '2025-08-15',
      endDate: '2025-12-20',
      status: 'active',
      description: 'Advanced topics in computer science and specialization courses',
      coordinator: 'Prof. Rajesh Kumar',
      totalCredits: 24,
      passingPercentage: 60
    },
    {
      id: '3',
      semester: '7',
      department: 'CSE',
      subjects: 5,
      students: 108,
      progress: 0,
      startDate: '2026-01-15',
      endDate: '2026-05-20',
      status: 'upcoming',
      description: 'Industry-oriented projects and internship preparation',
      coordinator: 'Dr. Anita Gupta',
      totalCredits: 20,
      passingPercentage: 60
    }
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures and Algorithms',
      code: 'CS501',
      credits: 4,
      faculty: 'Dr. Priya Sharma',
      completion: 80,
      semesterId: '1',
      type: 'theory',
      hours: 60,
      assessment: { internal: 30, external: 70, practical: 0 },
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      syllabus: 'Advanced data structures, algorithm design and analysis'
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CS502',
      credits: 3,
      faculty: 'Prof. Rajesh Kumar',
      completion: 65,
      semesterId: '1',
      type: 'theory',
      hours: 45,
      assessment: { internal: 30, external: 50, practical: 20 },
      schedule: 'Tue, Thu - 10:00 AM',
      syllabus: 'Database design, SQL, normalization, transactions'
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS503',
      credits: 3,
      faculty: 'Dr. Anita Gupta',
      completion: 70,
      semesterId: '1',
      type: 'theory',
      hours: 45,
      assessment: { internal: 40, external: 60, practical: 0 },
      schedule: 'Mon, Wed - 2:00 PM',
      syllabus: 'SDLC, requirements analysis, design patterns'
    },
    {
      id: '4',
      name: 'Computer Networks Lab',
      code: 'CS504L',
      credits: 2,
      faculty: 'Prof. Suresh Patel',
      completion: 85,
      semesterId: '1',
      type: 'lab',
      hours: 30,
      assessment: { internal: 50, external: 0, practical: 50 },
      schedule: 'Fri - 2:00 PM',
      syllabus: 'Network configuration, protocols, security'
    }
  ]);

  const [faculty] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      department: 'CSE',
      specialization: 'Data Structures, Machine Learning',
      experience: 12,
      subjects: ['CS501', 'CS601']
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      department: 'CSE',
      specialization: 'Database Systems, Web Technologies',
      experience: 8,
      subjects: ['CS502', 'CS602']
    }
  ]);

  // State management
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [currentTab, setCurrentTab] = useState<'overview' | 'subjects' | 'faculty'>('overview');
  
  // Modal states
  const [isCreateSemesterModalOpen, setIsCreateSemesterModalOpen] = useState(false);
  const [, setIsEditSemesterModalOpen] = useState(false);
  const [isCreateSubjectModalOpen, setIsCreateSubjectModalOpen] = useState(false);
  const [isViewDetailModalOpen, setIsViewDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Form states
  const [selectedSemesterData, setSelectedSemesterData] = useState<SemesterData | null>(null);
  const [newSemester, setNewSemester] = useState<Partial<SemesterData>>({});
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({});
  const [loading, setLoading] = useState(false);

  const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const statuses = ['active', 'upcoming', 'completed'];

  // Filter data based on current selections
  const filteredSemesters = semesterData.filter(semester => {
    return (
      (selectedDepartment === 'all' || semester.department === selectedDepartment) &&
      (selectedStatus === 'all' || semester.status === selectedStatus) &&
      (selectedSemester === '' || semester.semester === selectedSemester) &&
      (searchTerm === '' || 
       semester.semester.includes(searchTerm) ||
       semester.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
       semester.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // CRUD Operations
  const handleCreateSemester = () => {
    if (!newSemester.semester || !newSemester.department || !newSemester.coordinator) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const semester: SemesterData = {
        id: Date.now().toString(),
        semester: newSemester.semester!,
        department: newSemester.department!,
        subjects: 0,
        students: newSemester.students || 0,
        progress: 0,
        startDate: newSemester.startDate || new Date().toISOString().split('T')[0],
        endDate: newSemester.endDate || new Date().toISOString().split('T')[0],
        status: 'upcoming',
        description: newSemester.description,
        coordinator: newSemester.coordinator!,
        totalCredits: newSemester.totalCredits || 20,
        passingPercentage: newSemester.passingPercentage || 60
      };

      setSemesterData([...semesterData, semester]);
      setNewSemester({});
      setIsCreateSemesterModalOpen(false);
      setLoading(false);
      alert('Semester created successfully!');
    }, 500);
  };

  const handleCreateSubject = () => {
    if (!newSubject.name || !newSubject.code || !newSubject.faculty || !newSubject.semesterId) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name!,
        code: newSubject.code!,
        credits: newSubject.credits || 3,
        faculty: newSubject.faculty!,
        completion: 0,
        semesterId: newSubject.semesterId!,
        type: newSubject.type || 'theory',
        hours: newSubject.hours || 45,
        assessment: newSubject.assessment || { internal: 30, external: 70, practical: 0 },
        schedule: newSubject.schedule || 'TBD',
        syllabus: newSubject.syllabus
      };

      setSubjects([...subjects, subject]);
      
      // Update semester subject count
      setSemesterData(semesterData.map(sem => 
        sem.id === newSubject.semesterId 
          ? { ...sem, subjects: sem.subjects + 1 }
          : sem
      ));

      setNewSubject({});
      setIsCreateSubjectModalOpen(false);
      setLoading(false);
      alert('Subject added successfully!');
    }, 500);
  };

  const updateSemesterProgress = (semesterId: string, progress: number) => {
    setSemesterData(semesterData.map(sem => 
      sem.id === semesterId ? { ...sem, progress } : sem
    ));
  };

  const generateReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Semester,Department,Students,Subjects,Progress,Coordinator,Start Date,End Date,Status\n" +
      filteredSemesters.map(sem => 
        `${sem.semester},${sem.department},${sem.students},${sem.subjects},${sem.progress}%,"${sem.coordinator}",${sem.startDate},${sem.endDate},${sem.status}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "semester_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendNotifications = (semesterId: string) => {
    const semester = semesterData.find(s => s.id === semesterId);
    if (semester) {
      alert(`Notifications sent to ${semester.students} students in ${semester.department} Semester ${semester.semester}!`);
    }
  };

  const stats = {
    totalSemesters: semesterData.length,
    activeSemesters: semesterData.filter(s => s.status === 'active').length,
    totalStudents: semesterData.reduce((sum, s) => sum + s.students, 0),
    averageProgress: Math.round(semesterData.reduce((sum, s) => sum + s.progress, 0) / semesterData.length),
    upcomingSemesters: semesterData.filter(s => s.status === 'upcoming').length,
    completedSemesters: semesterData.filter(s => s.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Semester Preparation & Management</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive planning and monitoring of semester progress across all departments
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsCreateSemesterModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Semester
              </button>
              {/* <button
                onClick={() => setIsCreateSubjectModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <BookIcon size={20} />
                Add Subject
              </button> */}
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <CalendarIcon size={20} />
                Schedule Classes
              </button>
              <button
                onClick={generateReport}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DownloadIcon size={20} />
                Export Report
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search semesters by coordinator, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { key: 'overview', label: 'Overview', icon: BookOpenIcon },
              { key: 'subjects', label: 'Subjects', icon: BookIcon },
              { key: 'faculty', label: 'Faculty', icon: UserIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentTab(key as unknown as 'overview' | 'subjects' | 'faculty')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentTab === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Semesters</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSemesters}</p>
              </div>
              <BookOpenIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeSemesters}</p>
              </div>
              <CheckCircleIcon className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
              </div>
              <UsersIcon className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Progress</p>
                <p className="text-2xl font-bold text-orange-600">{stats.averageProgress}%</p>
              </div>
              <TrendingUpIcon className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-purple-600">{stats.upcomingSemesters}</p>
              </div>
              <ClockIcon className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-600">{stats.completedSemesters}</p>
              </div>
              <GraduationCapIcon className="text-gray-500" size={24} />
            </div>
          </div>
        </div>

        {/* Content based on selected tab */}
        {currentTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSemesters.map((semester) => (
              <div
                key={semester.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Semester {semester.semester}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium">{semester.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(semester.status)}`}>
                      {semester.status}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setSelectedSemesterData(semester);
                          setIsViewDetailModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <EyeIcon size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSemesterData(semester);
                          setNewSemester(semester);
                          setIsEditSemesterModalOpen(true);
                        }}
                        className="text-gray-400 hover:text-green-600 transition-colors p-1"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => sendNotifications(semester.id)}
                        className="text-gray-400 hover:text-orange-600 transition-colors p-1"
                      >
                        <BellIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {semester.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {semester.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{semester.students}</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{semester.subjects}</p>
                    <p className="text-sm text-gray-600">Subjects</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Progress</span>
                    <span className="font-semibold">{semester.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${getProgressColor(semester.progress)}`}
                      style={{ width: `${semester.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Coordinator:</span>
                    <span className="font-medium">{semester.coordinator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits:</span>
                    <span className="font-medium">{semester.totalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      {formatDate(semester.startDate)} - {formatDate(semester.endDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSemesterProgress(semester.id, Math.min(100, semester.progress + 10))}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Update Progress
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSemesterData(semester);
                        setIsViewDetailModalOpen(true);
                      }}
                      className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentTab === 'subjects' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Subject Management ({subjects.length})
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                      <th className="text-left p-3 font-medium text-gray-900">Faculty</th>
                      <th className="text-left p-3 font-medium text-gray-900">Credits</th>
                      <th className="text-left p-3 font-medium text-gray-900">Type</th>
                      <th className="text-left p-3 font-medium text-gray-900">Schedule</th>
                      <th className="text-left p-3 font-medium text-gray-900">Completion</th>
                      <th className="text-left p-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-500">{subject.code}</div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{subject.faculty}</td>
                        <td className="p-3 text-gray-700">{subject.credits}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subject.type === 'theory' ? 'bg-blue-100 text-blue-800' :
                            subject.type === 'lab' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {subject.type}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{subject.schedule}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(subject.completion)}`}
                                style={{ width: `${subject.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{subject.completion}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-1 rounded transition-colors">
                              <EyeIcon size={16} />
                            </button>
                            <button className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded transition-colors">
                              <EditIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Specialization:</span>
                    <p className="text-gray-600">{member.specialization}</p>
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span>
                    <span className="text-gray-600 ml-2">{member.experience} years</span>
                  </div>
                  <div>
                    <span className="font-medium">Subjects:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.subjects.map((subjectCode) => (
                        <span key={subjectCode} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {subjectCode}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        {/* Create Semester Modal */}
        {isCreateSemesterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Semester</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                  <select
                    value={newSemester.semester || ''}
                    onChange={(e) => setNewSemester({...newSemester, semester: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newSemester.department || ''}
                    onChange={(e) => setNewSemester({...newSemester, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coordinator *</label>
                  <input
                    type="text"
                    value={newSemester.coordinator || ''}
                    onChange={(e) => setNewSemester({...newSemester, coordinator: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter coordinator name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Students</label>
                  <input
                    type="number"
                    value={newSemester.students || ''}
                    onChange={(e) => setNewSemester({...newSemester, students: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter number of students"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newSemester.startDate || ''}
                    onChange={(e) => setNewSemester({...newSemester, startDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newSemester.endDate || ''}
                    onChange={(e) => setNewSemester({...newSemester, endDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Credits</label>
                  <input
                    type="number"
                    value={newSemester.totalCredits || ''}
                    onChange={(e) => setNewSemester({...newSemester, totalCredits: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total credits"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passing Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newSemester.passingPercentage || ''}
                    onChange={(e) => setNewSemester({...newSemester, passingPercentage: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter passing percentage"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newSemester.description || ''}
                  onChange={(e) => setNewSemester({...newSemester, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter semester description"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsCreateSemesterModalOpen(false);
                    setNewSemester({});
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSemester}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Semester'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Subject Modal */}
        {isCreateSubjectModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Subject</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name *</label>
                  <input
                    type="text"
                    value={newSubject.name || ''}
                    onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code *</label>
                  <input
                    type="text"
                    value={newSubject.code || ''}
                    onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                  <select
                    value={newSubject.semesterId || ''}
                    onChange={(e) => setNewSubject({...newSubject, semesterId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Semester</option>
                    {semesterData.map(sem => (
                      <option key={sem.id} value={sem.id}>
                        {sem.department} - Semester {sem.semester}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faculty *</label>
                  <select
                    value={newSubject.faculty || ''}
                    onChange={(e) => setNewSubject({...newSubject, faculty: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Faculty</option>
                    {faculty.map(member => (
                      <option key={member.id} value={member.name}>{member.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={newSubject.credits || ''}
                    onChange={(e) => setNewSubject({...newSubject, credits: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter credits"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newSubject.type || 'theory'}
                    onChange={(e) => setNewSubject({...newSubject, type: e.target.value as unknown as 'theory' | 'lab' | 'project'})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="theory">Theory</option>
                    <option value="lab">Laboratory</option>
                    <option value="project">Project</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours per Week</label>
                  <input
                    type="number"
                    value={newSubject.hours || ''}
                    onChange={(e) => setNewSubject({...newSubject, hours: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter hours per week"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <input
                    type="text"
                    value={newSubject.schedule || ''}
                    onChange={(e) => setNewSubject({...newSubject, schedule: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mon, Wed - 10:00 AM"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus</label>
                <textarea
                  value={newSubject.syllabus || ''}
                  onChange={(e) => setNewSubject({...newSubject, syllabus: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter syllabus description"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsCreateSubjectModalOpen(false);
                    setNewSubject({});
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubject}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Detail Modal */}
        {isViewDetailModalOpen && selectedSemesterData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Semester {selectedSemesterData.semester} - {selectedSemesterData.department} Details
                </h2>
                <button
                  onClick={() => setIsViewDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Semester Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Coordinator:</span>
                      <span>{selectedSemesterData.coordinator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Students:</span>
                      <span>{selectedSemesterData.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Subjects:</span>
                      <span>{selectedSemesterData.subjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Credits:</span>
                      <span>{selectedSemesterData.totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Passing %:</span>
                      <span>{selectedSemesterData.passingPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>
                        {formatDate(selectedSemesterData.startDate)} - {formatDate(selectedSemesterData.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  {selectedSemesterData.description && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {selectedSemesterData.description}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Subject Details</h3>
                  <div className="space-y-3">
                    {subjects
                      .filter(subject => subject.semesterId === selectedSemesterData.id)
                      .map(subject => (
                        <div key={subject.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{subject.name}</h4>
                              <p className="text-sm text-gray-600">{subject.code} • {subject.faculty}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              subject.type === 'theory' ? 'bg-blue-100 text-blue-800' :
                              subject.type === 'lab' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {subject.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(subject.completion)}`}
                                style={{ width: `${subject.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{subject.completion}%</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {subject.credits} credits • {subject.schedule}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => sendNotifications(selectedSemesterData.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Send Notifications
                </button>
                <button
                  onClick={() => setIsViewDetailModalOpen(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Classes Modal */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Classes</h2>
              
              <div className="text-center py-8">
                <CalendarIcon className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Class Scheduling System</h3>
                <p className="text-gray-600 mb-6">
                  Advanced scheduling features will be available here to manage class timetables, 
                  room allocations, and faculty assignments.
                </p>
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Coming Soon
                </button>
              </div>
              
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Semesterprep;
