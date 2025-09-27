import React, { useState, useEffect } from 'react';
import { 
  User, 
  Star, 
  MessageSquare, 
  Send,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  BarChart3,
  Heart,
  ThumbsUp,
  Target
} from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  experience: number;
  subjects: string[];
  avatar?: string;
  rating: number;
  totalFeedbacks: number;
  joiningDate: string;
  qualifications: string[];
  specializations: string[];
}

interface FeedbackData {
  id: string;
  facultyId: string;
  studentId: string;
  studentName: string;
  subject: string;
  semester: string;
  submissionDate: string;
  ratings: {
    teaching: number;
    communication: number;
    knowledge: number;
    availability: number;
    overall: number;
  };
  comments: string;
  suggestions: string;
  anonymous: boolean;
  status: 'submitted' | 'reviewed' | 'acknowledged';
}

interface FeedbackForm {
  facultyId: string;
  subject: string;
  semester: string;
  ratings: {
    teaching: number;
    communication: number;
    knowledge: number;
    availability: number;
    overall: number;
  };
  comments: string;
  suggestions: string;
  anonymous: boolean;
}

const StudentFacultyFeedback: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'give-feedback' | 'feedback-history'>('give-feedback');

  // Sample faculty data
  const [faculties] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu.in',
      phone: '+91 9876543210',
      department: 'Computer Science',
      designation: 'Professor',
      experience: 15,
      subjects: ['Data Structures & Algorithms', 'Computer Networks', 'Operating Systems'],
      rating: 4.8,
      totalFeedbacks: 156,
      joiningDate: '2010-07-15',
      qualifications: ['Ph.D. in Computer Science', 'M.Tech in Software Engineering'],
      specializations: ['Algorithms', 'Distributed Systems', 'Machine Learning']
    },
    {
      id: '2',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@college.edu.in',
      phone: '+91 9876543211',
      department: 'Computer Science',
      designation: 'Associate Professor',
      experience: 12,
      subjects: ['Database Management Systems', 'Software Engineering', 'Web Technologies'],
      rating: 4.6,
      totalFeedbacks: 143,
      joiningDate: '2013-08-20',
      qualifications: ['Ph.D. in Information Systems', 'M.C.A.'],
      specializations: ['Database Design', 'Software Architecture', 'Web Development']
    },
    {
      id: '3',
      name: 'Dr. Arjun Reddy',
      email: 'arjun.reddy@college.edu.in',
      phone: '+91 9876543212',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      experience: 8,
      subjects: ['Machine Learning', 'Artificial Intelligence', 'Data Mining'],
      rating: 4.9,
      totalFeedbacks: 98,
      joiningDate: '2017-01-10',
      qualifications: ['Ph.D. in Machine Learning', 'M.Tech in AI'],
      specializations: ['Deep Learning', 'Natural Language Processing', 'Computer Vision']
    },
    {
      id: '4',
      name: 'Ms. Kavya Singh',
      email: 'kavya.singh@college.edu.in',
      phone: '+91 9876543213',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      experience: 6,
      subjects: ['Web Technologies', 'Mobile App Development', 'UI/UX Design'],
      rating: 4.7,
      totalFeedbacks: 87,
      joiningDate: '2019-06-01',
      qualifications: ['M.Tech in Computer Science', 'B.Tech in IT'],
      specializations: ['Frontend Development', 'Mobile Technologies', 'User Interface Design']
    },
    {
      id: '5',
      name: 'Dr. Vikash Yadav',
      email: 'vikash.yadav@college.edu.in',
      phone: '+91 9876543214',
      department: 'Computer Science',
      designation: 'Professor',
      experience: 18,
      subjects: ['Software Engineering', 'Project Management', 'Software Testing'],
      rating: 4.5,
      totalFeedbacks: 201,
      joiningDate: '2007-03-15',
      qualifications: ['Ph.D. in Software Engineering', 'M.Tech in Computer Science'],
      specializations: ['Software Quality', 'Agile Methodologies', 'Project Management']
    },
    {
      id: '6',
      name: 'Prof. Deepika Nair',
      email: 'deepika.nair@college.edu.in',
      phone: '+91 9876543215',
      department: 'Computer Science',
      designation: 'Associate Professor',
      experience: 10,
      subjects: ['Network Security', 'Cryptography', 'Cyber Security'],
      rating: 4.8,
      totalFeedbacks: 112,
      joiningDate: '2015-09-01',
      qualifications: ['Ph.D. in Cyber Security', 'M.Tech in Information Security'],
      specializations: ['Network Security', 'Blockchain', 'Digital Forensics']
    }
  ]);

  // Sample feedback history data
  const [feedbackHistory] = useState<FeedbackData[]>([
    {
      id: '1',
      facultyId: '1',
      studentId: 'ST001',
      studentName: 'Rahul Verma',
      subject: 'Data Structures & Algorithms',
      semester: 'Semester 5',
      submissionDate: '2025-09-20',
      ratings: {
        teaching: 5,
        communication: 5,
        knowledge: 5,
        availability: 4,
        overall: 5
      },
      comments: 'Excellent teaching methodology. Makes complex concepts easy to understand.',
      suggestions: 'More practical examples would be helpful.',
      anonymous: false,
      status: 'acknowledged'
    },
    {
      id: '2',
      facultyId: '2',
      studentId: 'ST001',
      studentName: 'Rahul Verma',
      subject: 'Database Management Systems',
      semester: 'Semester 5',
      submissionDate: '2025-09-18',
      ratings: {
        teaching: 4,
        communication: 5,
        knowledge: 5,
        availability: 4,
        overall: 4
      },
      comments: 'Good teacher with strong subject knowledge. Very helpful during doubt sessions.',
      suggestions: 'Could provide more real-world project examples.',
      anonymous: true,
      status: 'reviewed'
    },
    {
      id: '3',
      facultyId: '3',
      studentId: 'ST001',
      studentName: 'Rahul Verma',
      subject: 'Machine Learning',
      semester: 'Semester 5',
      submissionDate: '2025-09-15',
      ratings: {
        teaching: 5,
        communication: 4,
        knowledge: 5,
        availability: 5,
        overall: 5
      },
      comments: 'Outstanding professor! Very passionate about the subject and encourages practical learning.',
      suggestions: 'None. Keep up the excellent work!',
      anonymous: false,
      status: 'acknowledged'
    }
  ]);

  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    facultyId: '',
    subject: '',
    semester: '',
    ratings: {
      teaching: 0,
      communication: 0,
      knowledge: 0,
      availability: 0,
      overall: 0
    },
    comments: '',
    suggestions: '',
    anonymous: false
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = searchTerm === '' || 
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = departmentFilter === '' || faculty.department === departmentFilter;
    const matchesSubject = subjectFilter === '' || faculty.subjects.includes(subjectFilter);
    
    return matchesSearch && matchesDepartment && matchesSubject;
  });

  const handleGiveFeedback = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setFeedbackForm(prev => ({
      ...prev,
      facultyId: faculty.id,
      ratings: {
        teaching: 0,
        communication: 0,
        knowledge: 0,
        availability: 0,
        overall: 0
      },
      comments: '',
      suggestions: '',
      anonymous: false
    }));
    setShowFeedbackModal(true);
  };

  const handleRatingChange = (category: keyof FeedbackForm['ratings'], rating: number) => {
    setFeedbackForm(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: rating
      }
    }));
  };

  const handleSubmitFeedback = () => {
    // Validate form
    if (feedbackForm.subject === '' || feedbackForm.semester === '' || feedbackForm.comments === '') {
      alert('Please fill in all required fields');
      return;
    }

    // Check if all ratings are provided
    const ratings = Object.values(feedbackForm.ratings);
    if (ratings.some(rating => rating === 0)) {
      alert('Please provide ratings for all categories');
      return;
    }

    // Here you would typically submit to an API
    console.log('Feedback submitted:', feedbackForm);
    
    // Show success message
    alert('Feedback submitted successfully!');
    
    // Reset form and close modal
    setFeedbackForm({
      facultyId: '',
      subject: '',
      semester: '',
      ratings: {
        teaching: 0,
        communication: 0,
        knowledge: 0,
        availability: 0,
        overall: 0
      },
      comments: '',
      suggestions: '',
      anonymous: false
    });
    setShowFeedbackModal(false);
    setSelectedFaculty(null);
  };

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={() => interactive && onRate && onRate(index + 1)}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'acknowledged': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const summaryStats = {
    totalFaculties: faculties.length,
    avgRating: Math.round((faculties.reduce((acc, f) => acc + f.rating, 0) / faculties.length) * 10) / 10,
    totalFeedbacks: faculties.reduce((acc, f) => acc + f.totalFeedbacks, 0),
    myFeedbacks: feedbackHistory.length,
    pendingAcknowledgment: feedbackHistory.filter(f => f.status === 'submitted').length,
    acknowledgedFeedbacks: feedbackHistory.filter(f => f.status === 'acknowledged').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-500" />
            Faculty Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Provide valuable feedback to help improve teaching quality and course delivery
          </p>
        </div>
        <button
          className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Faculty</p>
              <p className="text-2xl font-bold">{summaryStats.totalFaculties}</p>
            </div>
            <User className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Avg Rating</p>
              <p className="text-2xl font-bold">{summaryStats.avgRating}</p>
            </div>
            <Star className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Reviews</p>
              <p className="text-2xl font-bold">{summaryStats.totalFeedbacks}</p>
            </div>
            <BarChart3 className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">My Feedback</p>
              <p className="text-2xl font-bold">{summaryStats.myFeedbacks}</p>
            </div>
            <MessageSquare className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold">{summaryStats.pendingAcknowledgment}</p>
            </div>
            <Clock className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Acknowledged</p>
              <p className="text-2xl font-bold">{summaryStats.acknowledgedFeedbacks}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'give-feedback', label: 'Give Feedback', icon: MessageSquare },
            { id: 'feedback-history', label: 'My Feedback History', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
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

      {/* Tab Content */}
      {activeTab === 'give-feedback' && (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
              </select>

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

              <button
                onClick={() => {
                  setSearchTerm('');
                  setDepartmentFilter('');
                  setSubjectFilter('');
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Faculty Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Faculty Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {faculty.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {faculty.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {faculty.designation} • {faculty.department}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {renderStars(Math.round(faculty.rating))}
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {faculty.rating} ({faculty.totalFeedbacks})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Faculty Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">{faculty.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">{faculty.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Subjects Teaching
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.subjects.map((subject, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Experience:</span>
                        <p className="text-gray-600 dark:text-gray-400">{faculty.experience} years</p>
                      </div>
                      <div>
                        <span className="font-medium">Joined:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          {new Date(faculty.joiningDate).toLocaleDateString('en-IN', {year: 'numeric'})}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.specializations.map((spec, index) => (
                          <span key={index} className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleGiveFeedback(faculty)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Give Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'feedback-history' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Feedback History</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View all your submitted feedback and their status</p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {feedbackHistory.map((feedback) => (
              <div key={feedback.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faculties.find(f => f.id === feedback.facultyId)?.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(feedback.status)}`}>
                        {feedback.status.toUpperCase()}
                      </span>
                      {feedback.anonymous && (
                        <span className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-medium">
                          Anonymous
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium">Subject:</span>
                        <p className="text-gray-600 dark:text-gray-400">{feedback.subject}</p>
                      </div>
                      <div>
                        <span className="font-medium">Semester:</span>
                        <p className="text-gray-600 dark:text-gray-400">{feedback.semester}</p>
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          {new Date(feedback.submissionDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Overall Rating:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.ratings.overall)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Teaching</p>
                        <div className="flex items-center justify-center">
                          {renderStars(feedback.ratings.teaching)}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Communication</p>
                        <div className="flex items-center justify-center">
                          {renderStars(feedback.ratings.communication)}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Knowledge</p>
                        <div className="flex items-center justify-center">
                          {renderStars(feedback.ratings.knowledge)}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Availability</p>
                        <div className="flex items-center justify-center">
                          {renderStars(feedback.ratings.availability)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="mb-3">
                        <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Comments:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.comments}</p>
                      </div>
                      {feedback.suggestions && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Suggestions:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.suggestions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowFeedbackModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Give Feedback - {selectedFaculty.name}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                onClick={() => setShowFeedbackModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Feedback Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject *
                        </label>
                        <select
                          value={feedbackForm.subject}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Subject</option>
                          {selectedFaculty.subjects.map((subject, index) => (
                            <option key={index} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Semester *
                        </label>
                        <select
                          value={feedbackForm.semester}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, semester: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Semester</option>
                          <option value="Semester 1">Semester 1</option>
                          <option value="Semester 2">Semester 2</option>
                          <option value="Semester 3">Semester 3</option>
                          <option value="Semester 4">Semester 4</option>
                          <option value="Semester 5">Semester 5</option>
                          <option value="Semester 6">Semester 6</option>
                          <option value="Semester 7">Semester 7</option>
                          <option value="Semester 8">Semester 8</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Rate the Faculty</h3>
                    
                    {[
                      { key: 'teaching' as const, label: 'Teaching Quality' },
                      { key: 'communication' as const, label: 'Communication Skills' },
                      { key: 'knowledge' as const, label: 'Subject Knowledge' },
                      { key: 'availability' as const, label: 'Availability & Support' },
                      { key: 'overall' as const, label: 'Overall Rating' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(feedbackForm.ratings[key], true, (rating) => handleRatingChange(key, rating))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Comments *
                    </label>
                    <textarea
                      value={feedbackForm.comments}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, comments: e.target.value }))}
                      placeholder="Share your experience with this faculty member..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Suggestions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Suggestions for Improvement
                    </label>
                    <textarea
                      value={feedbackForm.suggestions}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, suggestions: e.target.value }))}
                      placeholder="Any suggestions to help the faculty improve..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Anonymous Checkbox */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={feedbackForm.anonymous}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, anonymous: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                      Submit feedback anonymously
                    </label>
                  </div>

                  {/* Faculty Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Faculty Information</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Name:</span> {selectedFaculty.name}</p>
                      <p><span className="font-medium">Department:</span> {selectedFaculty.department}</p>
                      <p><span className="font-medium">Designation:</span> {selectedFaculty.designation}</p>
                      <p><span className="font-medium">Experience:</span> {selectedFaculty.experience} years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFacultyFeedback;
