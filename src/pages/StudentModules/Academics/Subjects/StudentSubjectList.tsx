import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock,
  Search,
  Filter,
  Sun,
  Moon,
  Eye,
  MapPin,
  Phone,
  Mail,
  FileText,
  Video,
  Link,
  CheckCircle,
  Target,
  Users,
  Book,
  Hash,
  GraduationCap,
  Building2,
  Award
} from 'lucide-react';

interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
  facultyName: string;
  facultyEmail: string;
  facultyPhone: string;
  semester: string;
  credits: number;
  type: 'theory' | 'practical' | 'lab' | 'project';
  department: string;
  units: UnitInfo[];
  schedule: ClassSchedule[];
  resources: LearningResource[];
  assignments: AssignmentInfo[];
  tests: TestInfo[];
  lastClassDate: string;
  nextClassDate: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  objectives: string[];
  textbooks: string[];
  status: 'active' | 'completed' | 'dropped' | 'upcoming';
  enrollmentDate: string;
  totalClasses: number;
  attendedClasses: number;
}

interface UnitInfo {
  unitNumber: number;
  unitName: string;
  topics: string[];
  weightage: number;
  estimatedHours: number;
  description: string;
}

interface ClassSchedule {
  day: string;
  time: string;
  duration: number;
  room: string;
  type: 'lecture' | 'tutorial' | 'lab';
}

interface LearningResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'book';
  url: string;
  description: string;
}

interface AssignmentInfo {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  totalMarks: number;
}

interface TestInfo {
  id: string;
  title: string;
  date: string;
  type: 'quiz' | 'midterm' | 'final';
  status: 'upcoming' | 'completed';
  score?: number;
  totalMarks: number;
}

const StudentSubjectList: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [semesterFilter, setSemesterFilter] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Sample subjects data
  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      subjectName: 'Data Structures & Algorithms',
      subjectCode: 'CS301',
      facultyName: 'Dr. Rajesh Kumar',
      facultyEmail: 'rajesh.kumar@college.edu.in',
      facultyPhone: '+91 9876543210',
      semester: 'Semester 5',
      credits: 4,
      type: 'theory',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'Arrays and Linked Lists',
          topics: ['Static Arrays', 'Dynamic Arrays', 'Singly Linked Lists', 'Doubly Linked Lists', 'Circular Linked Lists'],
          weightage: 25,
          estimatedHours: 12,
          description: 'Introduction to linear data structures and their implementations'
        },
        {
          unitNumber: 2,
          unitName: 'Stacks and Queues',
          topics: ['Stack Operations', 'Queue Operations', 'Priority Queues', 'Applications', 'Deque'],
          weightage: 20,
          estimatedHours: 8,
          description: 'LIFO and FIFO data structures with real-world applications'
        },
        {
          unitNumber: 3,
          unitName: 'Trees and Binary Trees',
          topics: ['Tree Terminology', 'Binary Tree Implementation', 'Tree Traversals', 'Binary Search Trees', 'AVL Trees', 'Heap'],
          weightage: 30,
          estimatedHours: 15,
          description: 'Hierarchical data structures and their operations'
        },
        {
          unitNumber: 4,
          unitName: 'Graphs and Advanced Topics',
          topics: ['Graph Representation', 'Graph Traversals', 'Shortest Path Algorithms', 'Minimum Spanning Tree', 'Dynamic Programming'],
          weightage: 25,
          estimatedHours: 20,
          description: 'Non-linear data structures and advanced algorithmic concepts'
        }
      ],
      schedule: [
        { day: 'Monday', time: '09:00 AM', duration: 60, room: 'CS-101', type: 'lecture' },
        { day: 'Wednesday', time: '10:00 AM', duration: 60, room: 'CS-101', type: 'lecture' },
        { day: 'Friday', time: '02:00 PM', duration: 120, room: 'CS-Lab1', type: 'lab' }
      ],
      resources: [
        { id: '1', title: 'DSA Complete Notes', type: 'pdf', url: '#', description: 'Comprehensive notes covering all topics' },
        { id: '2', title: 'Algorithm Visualization', type: 'link', url: '#', description: 'Interactive algorithm demonstrations' },
        { id: '3', title: 'Video Lectures Series', type: 'video', url: '#', description: '20+ hours of detailed explanations' }
      ],
      assignments: [
        { id: '1', title: 'Array Implementation', dueDate: '2025-10-15', status: 'submitted', score: 85, totalMarks: 100 },
        { id: '2', title: 'Tree Traversals', dueDate: '2025-10-28', status: 'pending', totalMarks: 100 }
      ],
      tests: [
        { id: '1', title: 'Unit 1 Quiz', date: '2025-09-20', type: 'quiz', status: 'completed', score: 18, totalMarks: 20 },
        { id: '2', title: 'Mid-term Exam', date: '2025-11-15', type: 'midterm', status: 'upcoming', totalMarks: 100 }
      ],
      totalClasses: 25,
      attendedClasses: 23,
      lastClassDate: '2025-09-25',
      nextClassDate: '2025-09-30',
      difficulty: 'hard',
      prerequisites: ['Programming Fundamentals', 'Mathematics'],
      objectives: [
        'Understand fundamental data structures',
        'Analyze algorithm complexity',
        'Implement efficient solutions'
      ],
      textbooks: ['Data Structures by Tanenbaum', 'Algorithms by Cormen'],
      status: 'active',
      enrollmentDate: '2025-08-15'
    },
    {
      id: '2',
      subjectName: 'Database Management Systems',
      subjectCode: 'CS302',
      facultyName: 'Prof. Priya Sharma',
      facultyEmail: 'priya.sharma@college.edu.in',
      facultyPhone: '+91 9876543211',
      semester: 'Semester 5',
      credits: 3,
      type: 'theory',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'Database Fundamentals',
          topics: ['DBMS Architecture', 'ER Modeling', 'Relational Model', 'Database Design'],
          weightage: 20,
          estimatedHours: 8,
          description: 'Introduction to database concepts and modeling techniques'
        },
        {
          unitNumber: 2,
          unitName: 'SQL and Queries',
          topics: ['Basic SQL', 'Joins', 'Subqueries', 'Stored Procedures', 'Functions'],
          weightage: 35,
          estimatedHours: 12,
          description: 'Structured Query Language and database operations'
        },
        {
          unitNumber: 3,
          unitName: 'Normalization',
          topics: ['1NF, 2NF, 3NF', 'BCNF', 'Functional Dependencies', 'Decomposition'],
          weightage: 25,
          estimatedHours: 10,
          description: 'Database design optimization and normalization techniques'
        },
        {
          unitNumber: 4,
          unitName: 'Transaction Management',
          topics: ['ACID Properties', 'Concurrency Control', 'Recovery', 'Locking Mechanisms'],
          weightage: 20,
          estimatedHours: 8,
          description: 'Database transaction processing and consistency maintenance'
        }
      ],
      schedule: [
        { day: 'Tuesday', time: '11:00 AM', duration: 60, room: 'CS-102', type: 'lecture' },
        { day: 'Thursday', time: '02:00 PM', duration: 60, room: 'CS-102', type: 'lecture' },
        { day: 'Saturday', time: '10:00 AM', duration: 120, room: 'CS-Lab2', type: 'lab' }
      ],
      resources: [
        { id: '1', title: 'Database Concepts', type: 'book', url: '#', description: 'Standard textbook reference' },
        { id: '2', title: 'SQL Tutorial Series', type: 'video', url: '#', description: 'Hands-on SQL practice' }
      ],
      assignments: [
        { id: '1', title: 'ER Diagram Design', dueDate: '2025-09-30', status: 'graded', score: 78, totalMarks: 100 },
        { id: '2', title: 'Normalization Exercise', dueDate: '2025-10-20', status: 'submitted', totalMarks: 80 }
      ],
      tests: [
        { id: '1', title: 'SQL Quiz', date: '2025-09-15', type: 'quiz', status: 'completed', score: 16, totalMarks: 20 },
        { id: '2', title: 'Final Exam', date: '2025-11-18', type: 'final', status: 'upcoming', totalMarks: 100 }
      ],
      totalClasses: 22,
      attendedClasses: 19,
      lastClassDate: '2025-09-26',
      nextClassDate: '2025-10-01',
      difficulty: 'medium',
      prerequisites: ['Basic Programming'],
      objectives: [
        'Design efficient database schemas',
        'Master SQL querying',
        'Understand transaction management'
      ],
      textbooks: ['Database System Concepts by Silberschatz'],
      status: 'active',
      enrollmentDate: '2025-08-15'
    },
    {
      id: '3',
      subjectName: 'Machine Learning',
      subjectCode: 'CS303',
      facultyName: 'Dr. Arjun Reddy',
      facultyEmail: 'arjun.reddy@college.edu.in',
      facultyPhone: '+91 9876543212',
      semester: 'Semester 5',
      credits: 4,
      type: 'practical',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'Introduction to ML',
          topics: ['Types of Learning', 'Model Evaluation', 'Cross Validation', 'Overfitting'],
          weightage: 15,
          estimatedHours: 6,
          description: 'Fundamentals of machine learning and basic concepts'
        },
        {
          unitNumber: 2,
          unitName: 'Supervised Learning',
          topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'SVM', 'Naive Bayes'],
          weightage: 40,
          estimatedHours: 16,
          description: 'Classification and regression algorithms'
        },
        {
          unitNumber: 3,
          unitName: 'Unsupervised Learning',
          topics: ['K-Means', 'Hierarchical Clustering', 'PCA', 'Association Rules'],
          weightage: 25,
          estimatedHours: 10,
          description: 'Clustering and dimensionality reduction techniques'
        },
        {
          unitNumber: 4,
          unitName: 'Advanced Topics',
          topics: ['Neural Networks', 'Deep Learning', 'Ensemble Methods', 'Feature Engineering'],
          weightage: 20,
          estimatedHours: 8,
          description: 'Advanced machine learning concepts and techniques'
        }
      ],
      schedule: [
        { day: 'Monday', time: '02:00 PM', duration: 90, room: 'AI-Lab', type: 'lab' },
        { day: 'Thursday', time: '09:00 AM', duration: 60, room: 'CS-201', type: 'lecture' }
      ],
      resources: [
        { id: '1', title: 'ML Course Materials', type: 'pdf', url: '#', description: 'Lecture slides and notes' },
        { id: '2', title: 'Python ML Tutorials', type: 'video', url: '#', description: 'Practical implementation guides' },
        { id: '3', title: 'Kaggle Datasets', type: 'link', url: '#', description: 'Practice datasets for projects' }
      ],
      assignments: [
        { id: '1', title: 'Linear Regression Implementation', dueDate: '2025-10-25', status: 'pending', totalMarks: 100 }
      ],
      tests: [
        { id: '1', title: 'ML Basics Quiz', date: '2025-09-28', type: 'quiz', status: 'completed', score: 17, totalMarks: 20 }
      ],
      totalClasses: 18,
      attendedClasses: 17,
      lastClassDate: '2025-09-26',
      nextClassDate: '2025-09-30',
      difficulty: 'hard',
      prerequisites: ['Statistics', 'Python Programming'],
      objectives: [
        'Understand ML algorithms',
        'Implement ML models',
        'Evaluate model performance'
      ],
      textbooks: ['Pattern Recognition and Machine Learning by Bishop'],
      status: 'active',
      enrollmentDate: '2025-08-15'
    },
    {
      id: '4',
      subjectName: 'Web Technologies',
      subjectCode: 'CS304',
      facultyName: 'Ms. Kavya Singh',
      facultyEmail: 'kavya.singh@college.edu.in',
      facultyPhone: '+91 9876543213',
      semester: 'Semester 5',
      credits: 3,
      type: 'lab',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'HTML & CSS',
          topics: ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap', 'Flexbox'],
          weightage: 25,
          estimatedHours: 10,
          description: 'Frontend markup and styling technologies'
        },
        {
          unitNumber: 2,
          unitName: 'JavaScript',
          topics: ['ES6+', 'DOM Manipulation', 'AJAX', 'Promises', 'Event Handling'],
          weightage: 30,
          estimatedHours: 15,
          description: 'Client-side scripting and interactivity'
        },
        {
          unitNumber: 3,
          unitName: 'Frontend Frameworks',
          topics: ['React Basics', 'Components', 'State Management', 'Hooks'],
          weightage: 25,
          estimatedHours: 12,
          description: 'Modern frontend development frameworks'
        },
        {
          unitNumber: 4,
          unitName: 'Backend Development',
          topics: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
          weightage: 20,
          estimatedHours: 10,
          description: 'Server-side development and database integration'
        }
      ],
      schedule: [
        { day: 'Tuesday', time: '02:00 PM', duration: 120, room: 'Web-Lab', type: 'lab' },
        { day: 'Friday', time: '11:00 AM', duration: 60, room: 'CS-103', type: 'lecture' }
      ],
      resources: [
        { id: '1', title: 'HTML/CSS Guide', type: 'pdf', url: '#', description: 'Complete web development guide' },
        { id: '2', title: 'JavaScript Tutorials', type: 'video', url: '#', description: 'Modern JavaScript concepts' },
        { id: '3', title: 'React Documentation', type: 'link', url: '#', description: 'Official React resources' }
      ],
      assignments: [
        { id: '1', title: 'Portfolio Website', dueDate: '2025-09-25', status: 'graded', score: 95, totalMarks: 100 },
        { id: '2', title: 'E-commerce Project', dueDate: '2025-10-15', status: 'graded', score: 88, totalMarks: 100 }
      ],
      tests: [
        { id: '1', title: 'HTML/CSS Quiz', date: '2025-09-10', type: 'quiz', status: 'completed', score: 19, totalMarks: 20 },
        { id: '2', title: 'JavaScript Test', date: '2025-09-20', type: 'quiz', status: 'completed', score: 17, totalMarks: 20 }
      ],
      totalClasses: 24,
      attendedClasses: 23,
      lastClassDate: '2025-09-27',
      nextClassDate: '2025-10-01',
      difficulty: 'medium',
      prerequisites: ['Basic Programming'],
      objectives: [
        'Master frontend technologies',
        'Build responsive web applications',
        'Understand modern web frameworks'
      ],
      textbooks: ['Web Design with HTML & CSS by Jon Duckett', 'JavaScript: The Good Parts by Douglas Crockford'],
      status: 'completed',
      enrollmentDate: '2025-08-15'
    },
    {
      id: '5',
      subjectName: 'Software Engineering',
      subjectCode: 'CS305',
      facultyName: 'Dr. Vikash Yadav',
      facultyEmail: 'vikash.yadav@college.edu.in',
      facultyPhone: '+91 9876543214',
      semester: 'Semester 5',
      credits: 3,
      type: 'theory',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'SDLC Models',
          topics: ['Waterfall', 'Agile', 'Spiral', 'DevOps', 'RAD'],
          weightage: 30,
          estimatedHours: 9,
          description: 'Software development lifecycle methodologies'
        },
        {
          unitNumber: 2,
          unitName: 'Requirements Engineering',
          topics: ['Requirement Gathering', 'Analysis', 'Documentation', 'Validation'],
          weightage: 25,
          estimatedHours: 8,
          description: 'Software requirements analysis and specification'
        },
        {
          unitNumber: 3,
          unitName: 'Design Patterns',
          topics: ['Creational', 'Structural', 'Behavioral', 'MVC Pattern'],
          weightage: 25,
          estimatedHours: 8,
          description: 'Software design principles and patterns'
        },
        {
          unitNumber: 4,
          unitName: 'Testing & Maintenance',
          topics: ['Testing Levels', 'Test Cases', 'Maintenance Types', 'Quality Assurance'],
          weightage: 20,
          estimatedHours: 6,
          description: 'Software testing methodologies and maintenance'
        }
      ],
      schedule: [
        { day: 'Wednesday', time: '09:00 AM', duration: 60, room: 'CS-104', type: 'lecture' },
        { day: 'Friday', time: '09:00 AM', duration: 60, room: 'CS-104', type: 'lecture' }
      ],
      resources: [
        { id: '1', title: 'SE Methodology Guide', type: 'pdf', url: '#', description: 'Software development methodologies' },
        { id: '2', title: 'UML Diagrams Tutorial', type: 'video', url: '#', description: 'Complete UML guide' }
      ],
      assignments: [
        { id: '1', title: 'SDLC Documentation', dueDate: '2025-10-05', status: 'submitted', totalMarks: 80 },
        { id: '2', title: 'Case Study Analysis', dueDate: '2025-10-30', status: 'pending', totalMarks: 100 }
      ],
      tests: [
        { id: '1', title: 'SDLC Quiz', date: '2025-09-25', type: 'quiz', status: 'completed', score: 15, totalMarks: 20 }
      ],
      totalClasses: 20,
      attendedClasses: 17,
      lastClassDate: '2025-09-25',
      nextClassDate: '2025-09-30',
      difficulty: 'easy',
      prerequisites: ['Programming Concepts'],
      objectives: [
        'Understand software development lifecycle',
        'Learn project management principles',
        'Master testing methodologies'
      ],
      textbooks: ['Software Engineering by Ian Sommerville'],
      status: 'active',
      enrollmentDate: '2025-08-15'
    },
    {
      id: '6',
      subjectName: 'Network Security',
      subjectCode: 'CS306',
      facultyName: 'Prof. Deepika Nair',
      facultyEmail: 'deepika.nair@college.edu.in',
      facultyPhone: '+91 9876543215',
      semester: 'Semester 6',
      credits: 4,
      type: 'theory',
      department: 'Computer Science',
      units: [
        {
          unitNumber: 1,
          unitName: 'Security Fundamentals',
          topics: ['Threat Models', 'Security Policies', 'Risk Assessment', 'Authentication'],
          weightage: 25,
          estimatedHours: 10,
          description: 'Basic concepts of information and network security'
        },
        {
          unitNumber: 2,
          unitName: 'Cryptography',
          topics: ['Symmetric Encryption', 'Asymmetric Encryption', 'Digital Signatures', 'Hash Functions'],
          weightage: 30,
          estimatedHours: 12,
          description: 'Cryptographic algorithms and protocols'
        },
        {
          unitNumber: 3,
          unitName: 'Network Protocols',
          topics: ['SSL/TLS', 'IPSec', 'VPN', 'Firewall Technologies'],
          weightage: 25,
          estimatedHours: 10,
          description: 'Secure network communication protocols'
        },
        {
          unitNumber: 4,
          unitName: 'Security Management',
          topics: ['Incident Response', 'Security Auditing', 'Compliance', 'Best Practices'],
          weightage: 20,
          estimatedHours: 8,
          description: 'Security governance and management practices'
        }
      ],
      schedule: [
        { day: 'Tuesday', time: '09:00 AM', duration: 60, room: 'CS-105', type: 'lecture' },
        { day: 'Thursday', time: '11:00 AM', duration: 60, room: 'CS-105', type: 'lecture' }
      ],
      resources: [
        { id: '1', title: 'Network Security Basics', type: 'pdf', url: '#', description: 'Introduction to network security' },
        { id: '2', title: 'Cryptography Course', type: 'video', url: '#', description: 'Encryption and decryption techniques' }
      ],
      assignments: [],
      tests: [],
      totalClasses: 8,
      attendedClasses: 8,
      lastClassDate: '2025-09-26',
      nextClassDate: '2025-09-30',
      difficulty: 'hard',
      prerequisites: ['Computer Networks', 'Mathematics'],
      objectives: [
        'Understand security threats and vulnerabilities',
        'Learn cryptographic techniques',
        'Implement security protocols'
      ],
      textbooks: ['Network Security Essentials by William Stallings'],
      status: 'upcoming',
      enrollmentDate: '2025-08-15'
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

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = searchTerm === '' || 
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === '' || subject.type === typeFilter;
    const matchesStatus = statusFilter === '' || subject.status === statusFilter;
    const matchesSemester = semesterFilter === '' || subject.semester === semesterFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesSemester;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'practical': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'lab': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100';
      case 'project': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100';
      case 'dropped': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'link': return <Link className="w-4 h-4 text-green-500" />;
      case 'book': return <Book className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowDetailModal(true);
  };

  const summaryStats = {
    totalSubjects: subjects.length,
    activeSubjects: subjects.filter(s => s.status === 'active').length,
    completedSubjects: subjects.filter(s => s.status === 'completed').length,
    totalCredits: subjects.reduce((acc, s) => acc + s.credits, 0),
    totalUnits: subjects.reduce((acc, s) => acc + s.units.length, 0),
    upcomingSubjects: subjects.filter(s => s.status === 'upcoming').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-blue-500" />
            My Subjects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your enrolled subjects, units, and course information
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
              <p className="text-blue-100 text-sm font-medium">Total Subjects</p>
              <p className="text-2xl font-bold">{summaryStats.totalSubjects}</p>
            </div>
            <BookOpen className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active</p>
              <p className="text-2xl font-bold">{summaryStats.activeSubjects}</p>
            </div>
            <CheckCircle className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold">{summaryStats.completedSubjects}</p>
            </div>
            <Award className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Credits</p>
              <p className="text-2xl font-bold">{summaryStats.totalCredits}</p>
            </div>
            <Target className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Total Units</p>
              <p className="text-2xl font-bold">{summaryStats.totalUnits}</p>
            </div>
            <Hash className="w-6 h-6 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Upcoming</p>
              <p className="text-2xl font-bold">{summaryStats.upcomingSubjects}</p>
            </div>
            <Calendar className="w-6 h-6 opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="theory">Theory</option>
            <option value="practical">Practical</option>
            <option value="lab">Lab</option>
            <option value="project">Project</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
            <option value="Semester 7">Semester 7</option>
            <option value="Semester 8">Semester 8</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('');
              setStatusFilter('');
              setSemesterFilter('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Subjects List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {subject.subjectName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}>
                          {subject.difficulty.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(subject.type)}`}>
                          {subject.type.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subject.status)}`}>
                          {subject.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">Code:</span>
                          <span className="font-medium">{subject.subjectCode}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600 dark:text-gray-400">Credits:</span>
                          <span className="font-medium">{subject.credits}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                          <span className="font-medium">{subject.semester}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-600 dark:text-gray-400">Department:</span>
                          <span className="font-medium">{subject.department}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{subject.facultyName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{subject.facultyEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{subject.facultyPhone}</span>
                        </div>
                      </div>

                      {/* Units Information */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                          <Hash className="w-4 h-4 mr-1 text-blue-500" />
                          Units ({subject.units.length} total)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {subject.units.map((unit) => (
                            <div key={unit.unitNumber} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                  Unit {unit.unitNumber}: {unit.unitName}
                                </h5>
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                                    {unit.weightage}%
                                  </span>
                                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                                    {unit.estimatedHours}h
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                {unit.description}
                              </p>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-medium">Topics:</span> {unit.topics.slice(0, 3).join(', ')}
                                {unit.topics.length > 3 && ` +${unit.topics.length - 3} more`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Class Schedule */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-green-500" />
                          Class Schedule
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {subject.schedule.map((schedule, index) => (
                            <div key={index} className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100 px-3 py-1 rounded-full text-xs font-medium">
                              {schedule.day} • {schedule.time} • {schedule.room} ({schedule.type})
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Next Class</p>
                            <p className="font-medium">{new Date(subject.nextClassDate).toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Resources</p>
                            <p className="font-medium">{subject.resources.length} items</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-orange-500" />
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Assignments</p>
                            <p className="font-medium">{subject.assignments.length} active</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Tests</p>
                            <p className="font-medium">{subject.tests.length} scheduled</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() => handleViewDetails(subject)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSubject.subjectName}
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
                    <h3 className="text-lg font-semibold mb-4">Subject Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Subject Code:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedSubject.subjectCode}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedSubject.department}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Credits:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedSubject.credits}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Semester:</span>
                        <p className="text-gray-900 dark:text-gray-100">{selectedSubject.semester}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Type:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(selectedSubject.type)}`}>
                          {selectedSubject.type.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedSubject.difficulty)}`}>
                          {selectedSubject.difficulty.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Faculty Details</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {selectedSubject.facultyName.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{selectedSubject.facultyName}</h5>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{selectedSubject.facultyEmail}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{selectedSubject.facultyPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Detailed Units Breakdown</h4>
                    <div className="space-y-4">
                      {selectedSubject.units.map((unit) => (
                        <div key={unit.unitNumber} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              Unit {unit.unitNumber}: {unit.unitName}
                            </h5>
                            <div className="flex items-center space-x-2">
                              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs font-medium">
                                {unit.weightage}% weightage
                              </span>
                              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-medium">
                                {unit.estimatedHours}h estimated
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{unit.description}</p>
                          <div>
                            <span className="font-medium text-sm">Topics:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {unit.topics.map((topic, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Learning Objectives</h4>
                    <ul className="space-y-2">
                      {selectedSubject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedSubject.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubject.prerequisites.map((prereq, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-full text-sm font-medium">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-3">Learning Resources</h4>
                    <div className="space-y-2">
                      {selectedSubject.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center space-x-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{resource.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{resource.description}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => window.open(resource.url, '_blank')}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSubject.textbooks.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Textbooks</h4>
                      <ul className="space-y-2">
                        {selectedSubject.textbooks.map((book, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <Book className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{book}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Course Overview</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Total Units:</span>
                        <span className="font-medium">{selectedSubject.units.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Hours:</span>
                        <span className="font-medium">{selectedSubject.units.reduce((acc, u) => acc + u.estimatedHours, 0)}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedSubject.status)}`}>
                          {selectedSubject.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enrollment Date:</span>
                        <span className="font-medium">{new Date(selectedSubject.enrollmentDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Class Schedule</h4>
                    <div className="space-y-2">
                      {selectedSubject.schedule.map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">{schedule.day}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{schedule.time}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{schedule.room}</p>
                            <p className="text-gray-600 dark:text-gray-400">{schedule.duration} mins • {schedule.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSubject.assignments.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Recent Assignments</h4>
                      <div className="space-y-2">
                        {selectedSubject.assignments.map((assignment) => (
                          <div key={assignment.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-medium">{assignment.title}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                assignment.status === 'graded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              }`}>
                                {assignment.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN')}</span>
                              {assignment.score && (
                                <span className="font-medium">Score: {assignment.score}/{assignment.totalMarks}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubject.tests.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Tests & Exams</h4>
                      <div className="space-y-2">
                        {selectedSubject.tests.map((test) => (
                          <div key={test.id} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-medium">{test.title}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                test.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              }`}>
                                {test.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                              <span>{test.type} • {new Date(test.date).toLocaleDateString('en-IN')}</span>
                              {test.score && (
                                <span className="font-medium">Score: {test.score}/{test.totalMarks}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                View All Resources
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSubjectList;
