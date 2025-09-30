// CoursesDashboard.tsx - Courses Only Version with Students List Modal
import React, { useState, useEffect } from 'react';
import { 
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserIcon,
  UserGroupIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  EnvelopeIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

// Interfaces
interface Course {
  id: string;
  semesterId: string;
  departmentId: string;
  programId: string;
  yearId: string;
  name: string;
  code: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Lab';
  assignedFaculty: string[];
  isActive: boolean;
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  programId: string;
  currentYear: number;
  currentSemester: number;
  section: string;
  enrolledCourses: string[];
  isActive: boolean;
  createdAt: string;
}

interface CoursesDashboardProps {
  facultyId: string;
  facultyName: string;
  departmentId: string;
  assignedCourses: string[];
}

interface FilterState {
  search: string;
  status: 'all' | 'active' | 'inactive';
  type?: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const CoursesDashboard: React.FC<CoursesDashboardProps> = ({
  facultyId,
  facultyName,
  departmentId,
  assignedCourses
}) => {
  // State management
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState<boolean>(false);
  const [showStudentsList, setShowStudentsList] = useState<boolean>(false);
  const [selectedCourseForStudents, setSelectedCourseForStudents] = useState<Course | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all'
  });

  // Students filter state
  const [studentsFilter, setStudentsFilter] = useState<string>('');

  // Data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Stats
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    activeCourses: 0,
    inactiveCourses: 0
  });

  useEffect(() => {
    loadCoursesData();
  }, [facultyId]);

  // Load sample data
  const loadCoursesData = () => {
    const currentDate = new Date().toISOString();

    // Sample courses
    const sampleCourses: Course[] = [
      {
        id: 'course1', semesterId: 'sem1', departmentId: departmentId, programId: 'prog1', yearId: 'year1',
        name: 'Programming Fundamentals', code: 'CS101', credits: 4, type: 'Core',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course2', semesterId: 'sem2', departmentId: departmentId, programId: 'prog1', yearId: 'year1',
        name: 'Data Structures & Algorithms', code: 'CS102', credits: 4, type: 'Core',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course3', semesterId: 'sem3', departmentId: departmentId, programId: 'prog1', yearId: 'year2',
        name: 'Database Management Systems', code: 'CS201', credits: 3, type: 'Core',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course4', semesterId: 'sem1', departmentId: departmentId, programId: 'prog1', yearId: 'year1',
        name: 'Web Development', code: 'CS103', credits: 3, type: 'Elective',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course5', semesterId: 'sem2', departmentId: departmentId, programId: 'prog1', yearId: 'year1',
        name: 'Programming Lab', code: 'CS101L', credits: 2, type: 'Lab',
        assignedFaculty: [facultyId], isActive: false, createdAt: currentDate
      },
      {
        id: 'course6', semesterId: 'sem4', departmentId: departmentId, programId: 'prog1', yearId: 'year2',
        name: 'Machine Learning', code: 'CS301', credits: 4, type: 'Elective',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course7', semesterId: 'sem3', departmentId: departmentId, programId: 'prog1', yearId: 'year2',
        name: 'Operating Systems', code: 'CS202', credits: 3, type: 'Core',
        assignedFaculty: [facultyId], isActive: true, createdAt: currentDate
      },
      {
        id: 'course8', semesterId: 'sem4', departmentId: departmentId, programId: 'prog1', yearId: 'year2',
        name: 'Computer Networks', code: 'CS203', credits: 3, type: 'Core',
        assignedFaculty: [facultyId], isActive: false, createdAt: currentDate
      }
    ];

    // Sample students
    const sampleStudents: Student[] = [
      {
        id: 'std1', name: 'John Doe', email: 'john.doe@student.college.edu',
        rollNumber: '2024CSE001', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'A', enrolledCourses: ['course1', 'course2', 'course4'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std2', name: 'Jane Smith', email: 'jane.smith@student.college.edu',
        rollNumber: '2024CSE002', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'A', enrolledCourses: ['course1', 'course2'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std3', name: 'Mike Johnson', email: 'mike.johnson@student.college.edu',
        rollNumber: '2024CSE003', programId: 'prog1', currentYear: 2, currentSemester: 3,
        section: 'B', enrolledCourses: ['course3', 'course7'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std4', name: 'Sarah Williams', email: 'sarah.williams@student.college.edu',
        rollNumber: '2024CSE004', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'B', enrolledCourses: ['course1', 'course4'], isActive: false, createdAt: currentDate
      },
      {
        id: 'std5', name: 'Alex Brown', email: 'alex.brown@student.college.edu',
        rollNumber: '2024CSE005', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'A', enrolledCourses: ['course1', 'course2'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std6', name: 'Lisa Wilson', email: 'lisa.wilson@student.college.edu',
        rollNumber: '2024CSE006', programId: 'prog1', currentYear: 2, currentSemester: 3,
        section: 'A', enrolledCourses: ['course3', 'course6', 'course7'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std7', name: 'David Miller', email: 'david.miller@student.college.edu',
        rollNumber: '2024CSE007', programId: 'prog1', currentYear: 2, currentSemester: 4,
        section: 'B', enrolledCourses: ['course6', 'course8'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std8', name: 'Emily Davis', email: 'emily.davis@student.college.edu',
        rollNumber: '2024CSE008', programId: 'prog1', currentYear: 1, currentSemester: 2,
        section: 'A', enrolledCourses: ['course2', 'course5'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std9', name: 'Robert Garcia', email: 'robert.garcia@student.college.edu',
        rollNumber: '2024CSE009', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'B', enrolledCourses: ['course1', 'course4'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std10', name: 'Maria Martinez', email: 'maria.martinez@student.college.edu',
        rollNumber: '2024CSE010', programId: 'prog1', currentYear: 2, currentSemester: 3,
        section: 'A', enrolledCourses: ['course3', 'course7'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std11', name: 'James Anderson', email: 'james.anderson@student.college.edu',
        rollNumber: '2024CSE011', programId: 'prog1', currentYear: 1, currentSemester: 1,
        section: 'A', enrolledCourses: ['course1', 'course2', 'course4'], isActive: true, createdAt: currentDate
      },
      {
        id: 'std12', name: 'Linda Thompson', email: 'linda.thompson@student.college.edu',
        rollNumber: '2024CSE012', programId: 'prog1', currentYear: 2, currentSemester: 4,
        section: 'B', enrolledCourses: ['course6'], isActive: true, createdAt: currentDate
      }
    ];

    setCourses(sampleCourses);
    setStudents(sampleStudents);

    // Calculate stats
    const activeCourses = sampleCourses.filter(c => c.isActive).length;
    const inactiveCourses = sampleCourses.filter(c => !c.isActive).length;
    const activeStudents = sampleStudents.filter(s => s.isActive).length;

    setStats({
      totalCourses: sampleCourses.length,
      totalStudents: activeStudents,
      activeCourses: activeCourses,
      inactiveCourses: inactiveCourses
    });
  };

  // Utility functions
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter functions
  const applyFilters = (data: Course[]) => {
    return data.filter(course => {
      const matchesSearch = course.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                           course.code?.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || 
                           (filters.status === 'active' && course.isActive) ||
                           (filters.status === 'inactive' && !course.isActive);

      const matchesType = !filters.type || course.type === filters.type;

      return matchesSearch && matchesStatus && matchesType;
    });
  };

  const getFilteredData = () => {
    return applyFilters(courses);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all'
    });
  };

  // View course details
  const viewCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  // View students list
  const viewStudentsList = (course: Course) => {
    setSelectedCourseForStudents(course);
    setShowStudentsList(true);
    setStudentsFilter('');
  };

  // Get filtered students for selected course
  const getFilteredStudentsForCourse = () => {
    if (!selectedCourseForStudents) return [];
    
    const courseStudents = students.filter(s => 
      s.enrolledCourses.includes(selectedCourseForStudents.id) && s.isActive
    );

    if (!studentsFilter) return courseStudents;

    return courseStudents.filter(student =>
      student.name.toLowerCase().includes(studentsFilter.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(studentsFilter.toLowerCase()) ||
      student.email.toLowerCase().includes(studentsFilter.toLowerCase()) ||
      student.section.toLowerCase().includes(studentsFilter.toLowerCase())
    );
  };

  const filteredData = getFilteredData();
  const filteredStudents = getFilteredStudentsForCourse();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <XCircleIcon className="h-5 w-5" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Courses</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Courses assigned to you</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Courses</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Courses</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Inactive Courses</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.inactiveCourses}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course List with Filters */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course List</h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    showFilters 
                      ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300'
                  }`}
                >
                  <FunnelIcon className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Course Filters */}
            {showFilters && (
              <div className="mb-6 bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="col-span-full md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Course Type
                    </label>
                    <select
                      value={filters.type || ''}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">All Types</option>
                      <option value="Core">Core</option>
                      <option value="Elective">Elective</option>
                      <option value="Lab">Lab</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Showing {filteredData.length} results
                  </div>
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200"
                  >
                    <AdjustmentsHorizontalIcon className="h-4 w-4" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Course Table View */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Courses ({filteredData.length})
                </h3>
              </div>
              
              {filteredData.length === 0 ? (
                <div className="p-8 text-center">
                  <BookOpenIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">No courses found matching your criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Credits
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredData.map((course: Course) => {
                        const enrolledStudents = students.filter(s => s.enrolledCourses.includes(course.id) && s.isActive).length;
                        
                        return (
                          <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                                  <BookOpenIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">{course.name}</div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">Created {new Date(course.createdAt).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {course.code}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                course.type === 'Core' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : course.type === 'Elective' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                              }`}>
                                {course.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-medium">
                              {course.credits}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-medium">
                              {enrolledStudents}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                course.isActive 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                              }`}>
                                {course.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => viewCourseDetails(course)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" 
                                  title="View Details"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => viewStudentsList(course)}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" 
                                  title="View Students"
                                >
                                  <UserGroupIcon className="h-4 w-4" />
                                </button>
                              </div>
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
        </div>
      </main>

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Course Details</h3>
              <button
                onClick={() => setShowCourseDetails(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCourse.name}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{selectedCourse.code}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Credits</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{selectedCourse.credits}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                      selectedCourse.type === 'Core' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : selectedCourse.type === 'Elective' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {selectedCourse.type}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enrolled Students</p>
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {students
                        .filter(s => s.enrolledCourses.includes(selectedCourse.id) && s.isActive)
                        .map(student => (
                          <div key={student.id} className="flex justify-between items-center py-1">
                            <span className="text-sm text-slate-900 dark:text-white">{student.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{student.rollNumber} | Section {student.section}</span>
                          </div>
                        ))}
                      {students.filter(s => s.enrolledCourses.includes(selectedCourse.id) && s.isActive).length === 0 && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">No students enrolled</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Course Information</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Total Students</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        {students.filter(s => s.enrolledCourses.includes(selectedCourse.id) && s.isActive).length}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Course Status</p>
                      <p className={`text-lg font-bold ${
                        selectedCourse.isActive 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {selectedCourse.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-600">
                  Created: {new Date(selectedCourse.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students List Modal */}
      {showStudentsList && selectedCourseForStudents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Students - {selectedCourseForStudents.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedCourseForStudents.code} | {filteredStudents.length} students enrolled
                </p>
              </div>
              <button
                onClick={() => setShowStudentsList(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Students Search */}
              <div className="mb-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search students by name, roll number, email, or section..."
                    value={studentsFilter}
                    onChange={(e) => setStudentsFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Students List */}
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <UserGroupIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    {studentsFilter ? 'No students found matching your search.' : 'No students enrolled in this course.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Roll Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Year/Semester
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                          Enrolled Courses
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                      {filteredStudents.map((student: Student) => (
                        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                                <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-900 dark:text-white">{student.name}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                  Enrolled {new Date(student.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {student.rollNumber}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Section {student.section}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                            Year {student.currentYear}, Sem {student.currentSemester}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <EnvelopeIcon className="h-4 w-4 mr-2" />
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                              {student.enrolledCourses.length} courses
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesDashboard;
