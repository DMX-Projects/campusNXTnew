 // StudentCourses.tsx
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  Download,
  Eye,
  FileText,
  Video,
  Award,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Star,
  MapPin,
  Bell,
  Settings,
  Grid,
  List,
  Plus
} from 'lucide-react';

interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  uploadDate: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  marks?: number;
  totalMarks?: number;
}

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  semester: number;
  credits: number;
  instructor: string;
  instructorEmail: string;
  schedule: string;
  venue: string;
  status: 'enrolled' | 'completed' | 'dropped';
  enrollmentDate: string;
  completionDate?: string;
  currentGrade?: string;
  attendance: number;
  totalClasses: number;
  attendedClasses: number;
  resources: CourseResource[];
  assignments: Assignment[];
  syllabus: string;
  examDate?: string;
  courseType: 'core' | 'elective' | 'lab';
  prerequisites?: string[];
}

const StudentCourses: React.FC = () => {
  // Student Information
  const [studentInfo] = useState({
    name: 'Arjun Kumar',
    rollNumber: '2022CSE001',
    registrationNumber: 'REG2022001',
    department: 'Computer Science Engineering',
    semester: 5,
    section: 'A',
    batch: '2022-2026',
    profileImage: '/api/placeholder/100/100'
  });

  // Courses Data
  const [courses] = useState<Course[]>([
    {
      id: 'CS501',
      code: 'CS501',
      name: 'Advanced Data Structures',
      description: 'Advanced concepts in data structures including trees, graphs, and dynamic programming',
      semester: 5,
      credits: 4,
      instructor: 'Dr. Rajesh Kumar',
      instructorEmail: 'rajesh.kumar@college.edu',
      schedule: 'Mon, Wed, Fri - 10:00-11:00 AM',
      venue: 'Room 203',
      status: 'enrolled',
      enrollmentDate: '2025-08-15',
      currentGrade: 'A-',
      attendance: 92,
      totalClasses: 45,
      attendedClasses: 41,
      courseType: 'core',
      prerequisites: ['CS201', 'CS202'],
      examDate: '2025-12-15',
      syllabus: '/syllabus/cs501.pdf',
      resources: [
        {
          id: 'r1',
          title: 'Introduction to Advanced Trees',
          type: 'pdf',
          url: '/resources/trees.pdf',
          uploadDate: '2025-09-01'
        },
        {
          id: 'r2', 
          title: 'Graph Algorithms Video Lecture',
          type: 'video',
          url: '/resources/graphs.mp4',
          uploadDate: '2025-09-03'
        }
      ],
      assignments: [
        {
          id: 'a1',
          title: 'Binary Tree Implementation',
          dueDate: '2025-09-15',
          status: 'submitted',
          marks: 18,
          totalMarks: 20
        },
        {
          id: 'a2',
          title: 'Graph Traversal Assignment',
          dueDate: '2025-09-25',
          status: 'pending'
        }
      ]
    },
    {
      id: 'CS502',
      code: 'CS502',
      name: 'Database Management Systems',
      description: 'Comprehensive study of database design, SQL, and database management principles',
      semester: 5,
      credits: 3,
      instructor: 'Prof. Priya Sharma',
      instructorEmail: 'priya.sharma@college.edu',
      schedule: 'Tue, Thu - 02:00-03:30 PM',
      venue: 'Room 204',
      status: 'enrolled',
      enrollmentDate: '2025-08-15',
      currentGrade: 'B+',
      attendance: 88,
      totalClasses: 30,
      attendedClasses: 26,
      courseType: 'core',
      examDate: '2025-12-18',
      syllabus: '/syllabus/cs502.pdf',
      resources: [
        {
          id: 'r3',
          title: 'SQL Query Examples',
          type: 'pdf',
          url: '/resources/sql.pdf',
          uploadDate: '2025-08-28'
        }
      ],
      assignments: [
        {
          id: 'a3',
          title: 'Database Design Project',
          dueDate: '2025-09-30',
          status: 'pending'
        }
      ]
    },
    {
      id: 'CS401',
      code: 'CS401',
      name: 'Operating Systems',
      description: 'Study of operating system concepts including process management and memory management',
      semester: 4,
      credits: 4,
      instructor: 'Dr. Amit Singh',
      instructorEmail: 'amit.singh@college.edu',
      schedule: 'Mon, Wed, Fri - 09:00-10:00 AM',
      venue: 'Room 205',
      status: 'completed',
      enrollmentDate: '2025-02-01',
      completionDate: '2025-06-30',
      currentGrade: 'A',
      attendance: 95,
      totalClasses: 48,
      attendedClasses: 46,
      courseType: 'core',
      syllabus: '/syllabus/cs401.pdf',
      resources: [],
      assignments: []
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'enrolled' | 'completed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'core' | 'elective' | 'lab'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'code' | 'credits' | 'grade'>('name');

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      const matchesType = filterType === 'all' || course.courseType === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'code':
          return a.code.localeCompare(b.code);
        case 'credits':
          return b.credits - a.credits;
        case 'grade':
          const gradeOrder = { 'A+': 10, 'A': 9, 'A-': 8, 'B+': 7, 'B': 6, 'B-': 5, 'C+': 4, 'C': 3, 'C-': 2, 'D': 1, 'F': 0 };
          const aGrade = a.currentGrade ? gradeOrder[a.currentGrade as keyof typeof gradeOrder] || 0 : 0;
          const bGrade = b.currentGrade ? gradeOrder[b.currentGrade as keyof typeof gradeOrder] || 0 : 0;
          return bGrade - aGrade;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [courses, searchTerm, filterStatus, filterType, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const enrolledCourses = courses.filter(c => c.status === 'enrolled');
    const completedCourses = courses.filter(c => c.status === 'completed');
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const avgAttendance = Math.round(courses.reduce((sum, c) => sum + c.attendance, 0) / courses.length);
    
    return {
      total: courses.length,
      enrolled: enrolledCourses.length,
      completed: completedCourses.length,
      totalCredits,
      avgAttendance
    };
  }, [courses]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'dropped': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCourseTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'bg-purple-100 text-purple-800';
      case 'elective': return 'bg-indigo-100 text-indigo-800';
      case 'lab': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <div className="text-gray-600">
                <p>{studentInfo.name} • {studentInfo.rollNumber}</p>
                <p>{studentInfo.department} • Semester {studentInfo.semester}</p>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{stats.totalCredits} Credits</div>
            <div className="text-sm text-gray-600">Total Enrolled</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Courses</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.enrolled}</div>
          <div className="text-sm text-gray-600">Currently Enrolled</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">{stats.avgAttendance}%</div>
          <div className="text-sm text-gray-600">Avg Attendance</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-orange-600">{stats.totalCredits}</div>
          <div className="text-sm text-gray-600">Total Credits</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, codes, or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="core">Core</option>
              <option value="elective">Elective</option>
              <option value="lab">Lab</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="code">Sort by Code</option>
              <option value="credits">Sort by Credits</option>
              <option value="grade">Sort by Grade</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-gray-600">{course.code} • {course.credits} Credits</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCourseTypeColor(course.courseType)}`}>
                      {course.courseType}
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{course.venue}</span>
                  </div>
                </div>

                {/* Progress & Grade */}
                {course.status === 'enrolled' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Attendance</span>
                      <span>{course.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {course.currentGrade && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Grade</span>
                      <span className={`text-lg font-bold ${getGradeColor(course.currentGrade)}`}>
                        {course.currentGrade}
                      </span>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View Details
                  </button>
                  {course.resources.length > 0 && (
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Pending Assignments Alert */}
                {course.assignments.filter(a => a.status === 'pending').length > 0 && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        {course.assignments.filter(a => a.status === 'pending').length} Pending Assignment(s)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Course</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Credits</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Instructor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Schedule</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Attendance</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Grade</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedCourses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{course.name}</div>
                        <div className="text-sm text-gray-600">{course.code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{course.credits}</td>
                    <td className="px-6 py-4">{course.instructor}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{course.schedule}</div>
                        <div className="text-gray-500">{course.venue}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className={`font-medium ${course.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                          {course.attendance}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {course.currentGrade ? (
                        <span className={`font-bold ${getGradeColor(course.currentGrade)}`}>
                          {course.currentGrade}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredAndSortedCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No courses found matching your criteria</p>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
                  <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.credits} Credits</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Course Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Course Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Instructor:</strong> {selectedCourse.instructor}</div>
                    <div><strong>Schedule:</strong> {selectedCourse.schedule}</div>
                    <div><strong>Venue:</strong> {selectedCourse.venue}</div>
                    <div><strong>Course Type:</strong> {selectedCourse.courseType}</div>
                    <div><strong>Semester:</strong> {selectedCourse.semester}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Performance</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Current Grade:</strong> {selectedCourse.currentGrade || 'Not Available'}</div>
                    <div><strong>Attendance:</strong> {selectedCourse.attendance}%</div>
                    <div><strong>Classes:</strong> {selectedCourse.attendedClasses}/{selectedCourse.totalClasses}</div>
                    <div><strong>Status:</strong> {selectedCourse.status}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{selectedCourse.description}</p>
              </div>

              {/* Course Resources */}
              {selectedCourse.resources.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Course Resources</h3>
                  <div className="space-y-2">
                    {selectedCourse.resources.map(resource => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getResourceIcon(resource.type)}
                          <div>
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            <div className="text-sm text-gray-600">
                              Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <a
                          href={resource.url}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {selectedCourse.assignments.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Assignments</h3>
                  <div className="space-y-2">
                    {selectedCourse.assignments.map(assignment => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{assignment.title}</div>
                          <div className="text-sm text-gray-600">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          {assignment.marks !== undefined && (
                            <div className="text-sm text-green-600 font-medium">
                              Score: {assignment.marks}/{assignment.totalMarks}
                            </div>
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assignment.status === 'graded' ? 'bg-green-100 text-green-800' :
                          assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
