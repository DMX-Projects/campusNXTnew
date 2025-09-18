// pages/PlacementCourses.tsx
import React, { useState } from 'react';
import { 
  BookOpenIcon,
  AcademicCapIcon,
  UsersIcon,
  PlayIcon,
  CheckCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  TrophyIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  VideoCameraIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const PlacementCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Modal states
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);
  const [showVideoPlayerModal, setShowVideoPlayerModal] = useState(false);
  const [showInstructorProfileModal, setShowInstructorProfileModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Selected data states
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'Quantitative Aptitude Mastery',
      category: 'Aptitude',
      instructor: 'Dr. Sarah Johnson',
      duration: '8 weeks',
      lessons: 45,
      enrolled: 234,
      completed: 189,
      rating: 4.8,
      level: 'Beginner',
      description: 'Master mathematical concepts essential for placement tests',
      detailedDescription: 'This comprehensive course covers all essential mathematical concepts required for placement tests. Students will learn advanced problem-solving techniques, time management strategies, and gain confidence in tackling complex quantitative problems.',
      thumbnail: '/api/placeholder/300/200',
      price: 'Free',
      status: 'Active',
      startDate: '2025-09-01',
      endDate: '2025-10-26',
      skills: ['Mathematics', 'Problem Solving', 'Time Management'],
      curriculum: [
        { module: 'Basic Mathematics', lessons: 10, duration: '2 weeks' },
        { module: 'Algebra & Geometry', lessons: 12, duration: '2 weeks' },
        { module: 'Statistics & Probability', lessons: 15, duration: '2 weeks' },
        { module: 'Advanced Problem Solving', lessons: 8, duration: '2 weeks' }
      ],
      prerequisites: ['Basic Mathematics', 'High School Math'],
      certificateOffered: true,
      language: 'English, Hindi',
      progress: 81,
      videoUrl: 'sample-course-intro.mp4'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      category: 'Technical',
      instructor: 'Prof. Rajesh Kumar',
      duration: '12 weeks',
      lessons: 72,
      enrolled: 189,
      completed: 145,
      rating: 4.9,
      level: 'Intermediate',
      description: 'Comprehensive DSA course for technical interviews',
      detailedDescription: 'Deep dive into data structures and algorithms with hands-on coding practice. Perfect preparation for technical interviews at top tech companies.',
      thumbnail: '/api/placeholder/300/200',
      price: 'Free',
      status: 'Active',
      startDate: '2025-08-15',
      endDate: '2025-11-07',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      curriculum: [
        { module: 'Arrays & Strings', lessons: 15, duration: '2 weeks' },
        { module: 'Linked Lists & Stacks', lessons: 12, duration: '2 weeks' },
        { module: 'Trees & Graphs', lessons: 20, duration: '4 weeks' },
        { module: 'Dynamic Programming', lessons: 15, duration: '2 weeks' },
        { module: 'Advanced Algorithms', lessons: 10, duration: '2 weeks' }
      ],
      prerequisites: ['Basic Programming', 'Object-Oriented Programming'],
      certificateOffered: true,
      language: 'English',
      progress: 77,
      videoUrl: 'dsa-course-intro.mp4'
    },
    {
      id: 3,
      title: 'Communication Skills for IT',
      category: 'Soft Skills',
      instructor: 'Ms. Priya Sharma',
      duration: '6 weeks',
      lessons: 30,
      enrolled: 156,
      completed: 134,
      rating: 4.7,
      level: 'Beginner',
      description: 'Enhance verbal and written communication skills',
      detailedDescription: 'Develop professional communication skills essential for IT careers. Learn presentation techniques, technical writing, and interview skills.',
      thumbnail: '/api/placeholder/300/200',
      price: '₹1,499',
      status: 'Active',
      startDate: '2025-08-20',
      endDate: '2025-09-30',
      skills: ['Communication', 'Presentation', 'Interview Skills'],
      curriculum: [
        { module: 'Verbal Communication', lessons: 8, duration: '1 week' },
        { module: 'Written Communication', lessons: 7, duration: '1 week' },
        { module: 'Presentation Skills', lessons: 8, duration: '2 weeks' },
        { module: 'Interview Preparation', lessons: 7, duration: '2 weeks' }
      ],
      prerequisites: ['None'],
      certificateOffered: true,
      language: 'English, Hindi',
      progress: 86,
      videoUrl: 'communication-intro.mp4'
    },
    {
      id: 4,
      title: 'System Design Fundamentals',
      category: 'Technical',
      instructor: 'Dr. Michael Chen',
      duration: '10 weeks',
      lessons: 55,
      enrolled: 98,
      completed: 67,
      rating: 4.9,
      level: 'Advanced',
      description: 'Learn to design scalable systems for tech interviews',
      detailedDescription: 'Master system design concepts and learn to architect large-scale distributed systems. Essential for senior developer positions.',
      thumbnail: '/api/placeholder/300/200',
      price: 'Free',
      status: 'Coming Soon',
      startDate: '2025-09-15',
      endDate: '2025-11-24',
      skills: ['System Design', 'Architecture', 'Scalability'],
      curriculum: [
        { module: 'System Design Basics', lessons: 10, duration: '2 weeks' },
        { module: 'Database Design', lessons: 12, duration: '2 weeks' },
        { module: 'Microservices Architecture', lessons: 15, duration: '3 weeks' },
        { module: 'Scalability & Performance', lessons: 10, duration: '2 weeks' },
        { module: 'Case Studies', lessons: 8, duration: '1 week' }
      ],
      prerequisites: ['Software Engineering', 'Database Knowledge', '3+ Years Experience'],
      certificateOffered: true,
      language: 'English',
      progress: 68,
      videoUrl: 'system-design-intro.mp4'
    }
  ];

  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Mathematics & Aptitude',
      courses: 3,
      students: 567,
      rating: 4.8,
      experience: '10 years',
      photo: '/api/placeholder/80/80',
      bio: 'Dr. Sarah Johnson is a renowned mathematician with over 10 years of experience in teaching quantitative aptitude. She has helped thousands of students crack placement tests.',
      education: [
        { degree: 'Ph.D. in Mathematics', institution: 'MIT', year: '2013' },
        { degree: 'M.Sc. Mathematics', institution: 'Stanford University', year: '2009' }
      ],
      achievements: [
        'Best Teacher Award 2023',
        'Published 25+ research papers',
        'Mentor to 500+ successful placements'
      ],
      contact: {
        email: 'sarah.johnson@university.edu',
        phone: '+1-555-0123',
        location: 'Boston, MA'
      },
      coursesTeaching: ['Quantitative Aptitude Mastery', 'Advanced Mathematics', 'Statistics for Data Science']
    },
    {
      id: 2,
      name: 'Prof. Rajesh Kumar',
      specialization: 'Computer Science',
      courses: 5,
      students: 892,
      rating: 4.9,
      experience: '15 years',
      photo: '/api/placeholder/80/80',
      bio: 'Prof. Rajesh Kumar is a leading expert in algorithms and data structures with extensive industry and academic experience.',
      education: [
        { degree: 'Ph.D. in Computer Science', institution: 'IIT Delhi', year: '2008' },
        { degree: 'M.Tech Computer Science', institution: 'IIT Bombay', year: '2004' }
      ],
      achievements: [
        'Google Developer Expert',
        'Author of "Advanced Algorithms" textbook',
        '1000+ students placed in top companies'
      ],
      contact: {
        email: 'rajesh.kumar@university.edu',
        phone: '+91-98765-43210',
        location: 'Bangalore, India'
      },
      coursesTeaching: ['Data Structures & Algorithms', 'Advanced Programming', 'Competitive Programming', 'System Design', 'Machine Learning']
    },
    {
      id: 3,
      name: 'Ms. Priya Sharma',
      specialization: 'Communication & Soft Skills',
      courses: 4,
      students: 445,
      rating: 4.7,
      experience: '8 years',
      photo: '/api/placeholder/80/80',
      bio: 'Ms. Priya Sharma is a certified communication trainer with expertise in developing professional soft skills for IT careers.',
      education: [
        { degree: 'M.A. English Literature', institution: 'University of Delhi', year: '2015' },
        { degree: 'Certification in Corporate Training', institution: 'Dale Carnegie', year: '2017' }
      ],
      achievements: [
        'Certified Corporate Trainer',
        'TEDx Speaker',
        '300+ successful interview preparations'
      ],
      contact: {
        email: 'priya.sharma@university.edu',
        phone: '+91-87654-32109',
        location: 'New Delhi, India'
      },
      coursesTeaching: ['Communication Skills for IT', 'Interview Preparation', 'Presentation Skills', 'Professional Writing']
    }
  ];

  const stats = [
    { name: 'Active Courses', value: '24', icon: BookOpenIcon, color: 'bg-blue-500' },
    { name: 'Total Enrollments', value: '1,247', icon: UsersIcon, color: 'bg-green-500' },
    { name: 'Completion Rate', value: '78%', icon: CheckCircleIcon, color: 'bg-yellow-500' },
    { name: 'Avg Rating', value: '4.8', icon: StarIcon, color: 'bg-purple-500' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Coming Soon': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetailsModal(true);
  };

  const handlePlayVideo = (course: any) => {
    setSelectedCourse(course);
    setShowVideoPlayerModal(true);
    setIsVideoPlaying(false);
  };

  const handleViewProfile = (instructorName: string) => {
    const instructor = instructors.find(inst => inst.name === instructorName);
    setSelectedInstructor(instructor);
    setShowInstructorProfileModal(true);
  };

  const handleViewProgress = (enrollment: any) => {
    setSelectedEnrollment(enrollment);
    setShowProgressModal(true);
  };

  const handleShowCertificate = (enrollment: any) => {
    setSelectedEnrollment(enrollment);
    setShowCertificateModal(true);
  };

  const handleContact = (instructorName: string) => {
    const instructor = instructors.find(inst => inst.name === instructorName);
    setSelectedInstructor(instructor);
    setShowContactModal(true);
  };

  const closeAllModals = () => {
    setShowCourseDetailsModal(false);
    setShowVideoPlayerModal(false);
    setShowInstructorProfileModal(false);
    setShowProgressModal(false);
    setShowCertificateModal(false);
    setShowContactModal(false);
    setSelectedCourse(null);
    setSelectedInstructor(null);
    setSelectedEnrollment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Placement Courses</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Course</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Aptitude">Aptitude</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Interview Prep">Interview Prep</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'courses', label: 'Courses' },
             
              { key: 'instructors', label: 'Instructors' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
                    <BookOpenIcon className="w-16 h-16 text-white" />
                    <button
                      onClick={() => handlePlayVideo(course)}
                      className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all"
                    >
                      <PlayIcon className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(course.rating)}
                      <span className="text-sm text-gray-600 ml-2">{course.rating}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-between">
                        <span>Instructor:</span>
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Lessons:</span>
                        <span className="font-medium">{course.lessons}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Enrolled:</span>
                        <span className="font-medium">{course.enrolled}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-green-600">{course.price}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(course)}
                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handlePlayVideo(course)}
                        className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <PlayIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <div key={instructor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                      <p className="text-sm text-gray-600">{instructor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(instructor.rating)}
                    <span className="text-sm text-gray-600 ml-2">{instructor.rating}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{instructor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses:</span>
                      <span className="font-medium">{instructor.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students Taught:</span>
                      <span className="font-medium">{instructor.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewProfile(instructor.name)}
                      className="flex-1 bg-indigo-50 text-indigo-600 py-2 px-4 rounded text-sm font-medium hover:bg-indigo-100 transition-colors"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleContact(instructor.name)}
                      className="bg-gray-50 text-gray-600 py-2 px-4 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course Details Modal */}
      {showCourseDetailsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <BookOpenIcon className="w-20 h-20 text-white" />
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(selectedCourse.rating)}
                    <span className="text-sm text-gray-600 ml-2">{selectedCourse.rating} ({selectedCourse.enrolled} students)</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm">Instructor: <strong>{selectedCourse.instructor}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm">Duration: <strong>{selectedCourse.duration}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm">Start Date: <strong>{selectedCourse.startDate}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <BookOpenIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm">Lessons: <strong>{selectedCourse.lessons}</strong></span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Skills You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Course Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedCourse.detailedDescription}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Course Curriculum</h4>
                    <div className="space-y-3">
                      {selectedCourse.curriculum.map((module, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h5 className="font-medium text-gray-900">{module.module}</h5>
                            <span className="text-sm text-gray-500">{module.duration}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{module.lessons} lessons</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {selectedCourse.prerequisites.map((prereq, idx) => (
                        <li key={idx}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Course Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Level:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${getLevelColor(selectedCourse.level)}`}>
                          {selectedCourse.level}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <span className="ml-2 font-medium">{selectedCourse.language}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Certificate:</span>
                        <span className="ml-2 font-medium">{selectedCourse.certificateOffered ? 'Yes' : 'No'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-2 font-bold text-green-600">{selectedCourse.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handlePlayVideo(selectedCourse)}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideoPlayerModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg w-full max-w-4xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-white font-semibold">{selectedCourse.title} - Introduction</h3>
              <button onClick={closeAllModals} className="text-gray-400 hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <VideoCameraIcon className="w-20 h-20 text-gray-500 mx-auto mb-4" />
                  <p className="text-white mb-4">Course Introduction Video</p>
                  <p className="text-gray-400 text-sm">Video: {selectedCourse.videoUrl}</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all"
                    >
                      {isVideoPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                    </button>
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all">
                      <BackwardIcon className="w-5 h-5" />
                    </button>
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all">
                      <ForwardIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all">
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </button>
                    <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all">
                      <Cog6ToothIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-600 rounded-full h-1">
                    <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>2:35</span>
                    <span>10:24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructor Profile Modal */}
      {showInstructorProfileModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Instructor Profile</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="w-12 h-12 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedInstructor.name}</h3>
                  <p className="text-lg text-gray-600 mb-3">{selectedInstructor.specialization}</p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(selectedInstructor.rating)}
                    <span className="text-sm text-gray-600 ml-2">{selectedInstructor.rating} rating</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-indigo-600">{selectedInstructor.courses}</div>
                      <div className="text-gray-600">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-indigo-600">{selectedInstructor.students}</div>
                      <div className="text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-indigo-600">{selectedInstructor.experience}</div>
                      <div className="text-gray-600">Experience</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">About</h4>
                <p className="text-gray-600 leading-relaxed">{selectedInstructor.bio}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                  <div className="space-y-3">
                    {selectedInstructor.education.map((edu, idx) => (
                      <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                        <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3 mt-6">Achievements</h4>
                  <ul className="space-y-2">
                    {selectedInstructor.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <TrophyIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{selectedInstructor.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{selectedInstructor.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-700">{selectedInstructor.contact.location}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Courses Teaching</h4>
                  <div className="space-y-2">
                    {selectedInstructor.coursesTeaching.map((course, idx) => (
                      <div key={idx} className="bg-indigo-50 rounded-lg p-3">
                        <span className="text-sm text-indigo-800 font-medium">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeAllModals();
                  handleContact(selectedInstructor.name);
                }}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Contact Instructor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Student Progress</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEnrollment.studentName}</h3>
                  <span className="text-sm text-gray-500">{selectedEnrollment.rollNumber}</span>
                </div>
                <p className="text-gray-600">{selectedEnrollment.course}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-indigo-600 font-medium">Overall Progress</span>
                    <span className="text-2xl font-bold text-indigo-600">{selectedEnrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${selectedEnrollment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600 font-medium">Time Spent</span>
                    <span className="text-2xl font-bold text-green-600">{selectedEnrollment.timeSpent}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    Last active: {selectedEnrollment.lastActivity}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Lesson Progress</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Completed Lessons</span>
                      <span className="font-semibold">{selectedEnrollment.completedLessons} / {selectedEnrollment.totalLessons}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(selectedEnrollment.completedLessons / selectedEnrollment.totalLessons) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Assignments</h4>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-yellow-600">Completed Assignments</span>
                      <span className="font-semibold text-yellow-700">{selectedEnrollment.assignments.completed} / {selectedEnrollment.assignments.total}</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full" 
                        style={{ width: `${(selectedEnrollment.assignments.completed / selectedEnrollment.assignments.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Quiz Performance</h4>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="text-sm text-purple-600">Completed Quizzes</span>
                        <div className="font-semibold text-purple-700">{selectedEnrollment.quizzes.completed} / {selectedEnrollment.quizzes.total}</div>
                      </div>
                      <div>
                        <span className="text-sm text-purple-600">Average Score</span>
                        <div className="font-semibold text-purple-700">{selectedEnrollment.quizzes.avgScore}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(selectedEnrollment.quizzes.completed / selectedEnrollment.quizzes.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Course Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enrollment Date:</span>
                      <span className="font-medium">{selectedEnrollment.enrolledDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedEnrollment.status)}`}>
                        {selectedEnrollment.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate Eligible:</span>
                      <span className="font-medium">
                        {selectedEnrollment.certificateEligible ? 
                          <span className="text-green-600">✓ Yes</span> : 
                          <span className="text-red-600">✗ No</span>
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              {selectedEnrollment.certificateEligible && (
                <button 
                  onClick={() => {
                    closeAllModals();
                    handleShowCertificate(selectedEnrollment);
                  }}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Contact Modal */}
      {showContactModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Contact Instructor</h2>
              <button onClick={closeAllModals} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedInstructor.name}</h3>
                  <p className="text-sm text-gray-600">{selectedInstructor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{selectedInstructor.contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{selectedInstructor.contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={closeAllModals}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Course</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Select Category</option>
                    <option>Technical</option>
                    <option>Aptitude</option>
                    <option>Soft Skills</option>
                    <option>Interview Prep</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Instructor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 8 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Free"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Course description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Covered</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Comma-separated skills"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementCourses;