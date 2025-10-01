import { useState, useMemo, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, Award, Download, Send, Plus, X, UserPlus, Sun, Moon } from 'lucide-react';

// --- Interface Definitions (Updated to include 'program') ---
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  type: string;
  program: string; // <-- NEW: Added Program field
  specializations: string[];
}

interface FacultyMember {
  id: string;
  name: string;
  email: string;
  designation: string;
  specializations: string[];
  maxLoad: number;
  currentLoad: number;
}

interface Allocation {
  courseId: string;
  facultyId: string;
  sections: number;
  credits: number;
  status: 'pending' | 'approved' | 'rejected';
}

function App() {
  // --- Theme State Management ---
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply 'dark' class to the root HTML element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Core Application States (Updated) ---
  const [activeTab, setActiveTab] = useState('courses');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Filter States for Courses Tab (Updated for Program)
  const [courseFilter, setCourseFilter] = useState({
    search: '',
    program: 'all', // <-- NEW filter state
    semester: 'all',
    type: 'all',
  });

  // Filter States for Allocations Tab
  const [allocationFilter, setAllocationFilter] = useState({
    searchCourseCode: '',
    facultyId: 'all',
    status: 'all',
  });

  // Mock Data (Updated to include 'program')
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', code: 'CS101', name: 'Introduction to Programming', credits: 4, semester: 1, type: 'Core', program: 'B.Tech', specializations: ['CSE', 'IT'] },
    { id: '2', code: 'CS201', name: 'Data Structures', credits: 4, semester: 3, type: 'Core', program: 'B.Tech', specializations: ['CSE'] },
    { id: '3', code: 'CS301', name: 'Machine Learning', credits: 3, semester: 5, type: 'Elective', program: 'M.Tech', specializations: ['CSE', 'AI'] },
    { id: '4', code: 'IT402', name: 'Cloud Computing', credits: 3, semester: 7, type: 'Elective', program: 'M.Tech', specializations: ['IT', 'AI'] },
  ]);

  const [faculty] = useState<FacultyMember[]>([
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.j@university.edu', designation: 'Professor', specializations: ['AI', 'ML'], maxLoad: 12, currentLoad: 8 },
    { id: '2', name: 'Dr. Michael Chen', email: 'michael.c@university.edu', designation: 'Associate Professor', specializations: ['CSE', 'Algorithms'], maxLoad: 12, currentLoad: 12 },
    { id: '3', name: 'Dr. Emily Rodriguez', email: 'emily.r@university.edu', designation: 'Assistant Professor', specializations: ['CSE', 'IT'], maxLoad: 10, currentLoad: 4 },
  ]);

  const [allocations, setAllocations] = useState<Allocation[]>([
    { courseId: '1', facultyId: '3', sections: 2, credits: 4, status: 'approved' },
    { courseId: '2', facultyId: '2', sections: 3, credits: 4, status: 'pending' },
    { courseId: '3', facultyId: '1', sections: 2, credits: 3, status: 'pending' },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: 3,
    semester: 1,
    type: 'Core',
    program: 'B.Tech', // <-- NEW default value
    specializations: [] as string[],
  });

  const [allocationForm, setAllocationForm] = useState({
    facultyId: '',
    sections: 1,
  });

  const [specializationInput, setSpecializationInput] = useState('');
  const [editSpecializationInput, setEditSpecializationInput] = useState('');

  // --- Helper Functions (Updated) ---

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) {
      console.error('Please fill in all required fields');
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
    };

    setCourses([...courses, course]);
    setShowAddCourse(false);
    setNewCourse({
      code: '',
      name: '',
      credits: 3,
      semester: 1,
      type: 'Core',
      program: 'B.Tech', // Reset to default
      specializations: [],
    });
    setSpecializationInput('');
  };

  const handleAddEditSpecialization = () => {
    if (editSpecializationInput.trim() && !newCourse.specializations.includes(editSpecializationInput.trim())) {
      setNewCourse({
        ...newCourse,
        specializations: [...newCourse.specializations, editSpecializationInput.trim()],
      });
      setEditSpecializationInput('');
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      code: course.code,
      name: course.name,
      credits: course.credits,
      semester: course.semester,
      type: course.type,
      program: course.program, // <-- Load existing program
      specializations: [...course.specializations],
    });
    setShowEditCourse(true);
  };

  const handleUpdateCourse = () => {
    if (!newCourse.code || !newCourse.name || !editingCourse) {
      console.error('Please fill in all required fields');
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...course, ...newCourse }
        : course
    ));
    
    setShowEditCourse(false);
    setEditingCourse(null);
    setNewCourse({
      code: '',
      name: '',
      credits: 3,
      semester: 1,
      type: 'Core',
      program: 'B.Tech', // Reset
      specializations: [],
    });
    setEditSpecializationInput('');
  };

  const handleDeleteCourse = (courseId: string) => {
    // NOTE: Replaced window.confirm with a console message due to the sandbox environment restriction.
    if (true) { // Assuming confirmed for demonstration
      setCourses(courses.filter(course => course.id !== courseId));
      setAllocations(allocations.filter(allocation => allocation.courseId !== courseId));
      console.log(`Course ${courseId} and related allocations deleted.`);
    }
  };

  const handleAddSpecialization = () => {
    if (specializationInput.trim() && !newCourse.specializations.includes(specializationInput.trim())) {
      setNewCourse({
        ...newCourse,
        specializations: [...newCourse.specializations, specializationInput.trim()],
      });
      setSpecializationInput('');
    }
  };

  const handleRemoveSpecialization = (spec: string) => {
    setNewCourse({
      ...newCourse,
      specializations: newCourse.specializations.filter(s => s !== spec),
    });
  };

  const openAllocateModal = (course: Course) => {
    setSelectedCourse(course);
    setShowAllocateModal(true);
    const existingAllocation = allocations.find(a => a.courseId === course.id);
    setAllocationForm({
      facultyId: existingAllocation ? existingAllocation.facultyId : '',
      sections: existingAllocation ? existingAllocation.sections : 1,
    });
  };

  const handleAllocateCourse = () => {
    if (!selectedCourse || !allocationForm.facultyId) {
      console.error('Please select a faculty member');
      return;
    }

    const facultyMember = getFacultyById(allocationForm.facultyId);
    if (!facultyMember) {
        console.error('Selected faculty not found.');
        return;
    }

    const courseCredits = selectedCourse.credits;
    const loadIncrease = courseCredits * allocationForm.sections;
    const existingAllocation = allocations.find(a => a.courseId === selectedCourse.id);

    let newAllocations = [...allocations];

    if (existingAllocation) {
      // Update existing allocation
      newAllocations = newAllocations.map(a =>
        a.courseId === selectedCourse.id
          ? {
              ...a,
              facultyId: allocationForm.facultyId,
              sections: allocationForm.sections,
              credits: courseCredits,
              status: 'pending' as const
            }
          : a
      );
    } else {
      // Create new allocation
      const newAllocation: Allocation = {
        courseId: selectedCourse.id,
        facultyId: allocationForm.facultyId,
        sections: allocationForm.sections,
        credits: courseCredits,
        status: 'pending',
      };
      newAllocations.push(newAllocation);
    }

    setAllocations(newAllocations);
    
    // NOTE: In a real app, you would also update faculty.currentLoad here. 
    // Since faculty state is static/mocked here, we skip load calculation complexity.

    setShowAllocateModal(false);
    setSelectedCourse(null);
  };

  const approveAllocation = (courseId: string) => {
    setAllocations(allocations.map(a =>
      a.courseId === courseId ? { ...a, status: 'approved' as const } : a
    ));
  };

  const getMatchingFaculty = (course: Course) => {
    return faculty.filter(f => 
      f.specializations.some(spec => course.specializations.includes(spec))
    );
  };

  const getCourseAllocation = (courseId: string) => {
    return allocations.find(a => a.courseId === courseId);
  };

  const getFacultyById = (facultyId: string) => {
    return faculty.find(f => f.id === facultyId);
  };

  // --- Filtered Data Hooks (Updated for Program Filter) ---

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const searchMatch = course.code.toLowerCase().includes(courseFilter.search.toLowerCase()) ||
                          course.name.toLowerCase().includes(courseFilter.search.toLowerCase());
      
      const programMatch = courseFilter.program === 'all' || // <-- NEW Program Match
                            course.program === courseFilter.program;

      const semesterMatch = courseFilter.semester === 'all' || 
                            course.semester === parseInt(courseFilter.semester);

      const typeMatch = courseFilter.type === 'all' || 
                        course.type === courseFilter.type;

      return searchMatch && programMatch && semesterMatch && typeMatch; // <-- Updated
    });
  }, [courses, courseFilter]);


  const filteredAllocations = useMemo(() => {
    return allocations.filter(allocation => {
        const course = courses.find(c => c.id === allocation.courseId);
        if (!course) return false;

        const facultyMatch = allocationFilter.facultyId === 'all' || 
                             allocation.facultyId === allocationFilter.facultyId;

        const statusMatch = allocationFilter.status === 'all' || 
                            allocation.status === allocationFilter.status;

        const courseCodeMatch = allocationFilter.searchCourseCode === '' ||
                                course.code.toLowerCase().includes(allocationFilter.searchCourseCode.toLowerCase());

        return facultyMatch && statusMatch && courseCodeMatch;
    }).map(allocation => ({
        ...allocation,
        course: courses.find(c => c.id === allocation.courseId),
        faculty: faculty.find(f => f.id === allocation.facultyId),
    }));
  }, [allocations, allocationFilter, courses, faculty]);

  // --- Components ---

  const renderCourses = () => (
    <div className="space-y-6">
      {/* Filters and Add Course Button (Updated for Program Filter) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md">
        
        {/* Course Filters */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search by Code or Name..."
            value={courseFilter.search}
            onChange={(e) => setCourseFilter({...courseFilter, search: e.target.value})}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          
          {/* NEW Program Filter */}
          <select
            value={courseFilter.program}
            onChange={(e) => setCourseFilter({...courseFilter, program: e.target.value})}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Programs</option>
            {['B.Tech', 'M.Tech', 'PhD', 'M.Sc'].map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>

          <select
            value={courseFilter.semester}
            onChange={(e) => setCourseFilter({...courseFilter, semester: e.target.value})}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>{`Sem ${sem}`}</option>
            ))}
          </select>
          <select
            value={courseFilter.type}
            onChange={(e) => setCourseFilter({...courseFilter, type: e.target.value})}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="Core">Core</option>
            <option value="Elective">Elective</option>
          </select>
        </div>

        {/* Add Course Button */}
        <button
          onClick={() => setShowAddCourse(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto justify-center md:justify-start"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Add/Edit Course Modals */}
      {renderAddEditCourseModal('add')}
      {renderAddEditCourseModal('edit')}
      {renderAllocateModal()}


      {/* Course Table (Updated for Program Column) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Program</th> {/* <-- NEW HEADER */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const allocation = getCourseAllocation(course.id);
                  const assignedFaculty = allocation ? getFacultyById(allocation.facultyId) : null;

                  return (
                    <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{course.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{course.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{course.program}</td> {/* <-- NEW DATA */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{course.credits}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Sem {course.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.type === 'Core' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {course.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {assignedFaculty ? (
                          <div>
                            <div className="font-medium">{assignedFaculty.name}</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {allocation?.sections} section{allocation?.sections !== 1 ? 's' : ''} • 
                              <span className={`ml-1 ${
                                allocation?.status === 'approved' ? 'text-green-600 dark:text-green-400' :
                                allocation?.status === 'rejected' ? 'text-red-600 dark:text-red-400' :
                                'text-amber-600 dark:text-amber-400'
                              }`}>
                                {allocation?.status}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openAllocateModal(course)}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 dark:bg-blue-800/30 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors mr-1 text-xs"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          {assignedFaculty ? 'Reassign' : 'Assign'}
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 dark:bg-amber-800/30 dark:text-amber-300 dark:hover:bg-amber-800 transition-colors mr-1 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-800/30 dark:text-red-300 dark:hover:bg-red-800 transition-colors mr-1 text-xs"
                        >
                          Delete
                        </button>
                        {allocation && allocation.status === 'pending' && (
                          <button
                            onClick={() => approveAllocation(course.id)}
                            className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 dark:bg-green-800/30 dark:text-green-300 dark:hover:bg-green-800 transition-colors text-xs mt-1 md:mt-0 ml-0 md:ml-1"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No courses match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddEditCourseModal = (mode: 'add' | 'edit') => {
    const isEdit = mode === 'edit';
    const showModal = isEdit ? showEditCourse : showAddCourse;
    const handleClose = () => {
      if (isEdit) {
        setShowEditCourse(false);
        setEditingCourse(null);
      } else {
        setShowAddCourse(false);
      }
      // Reset form state on close
      setNewCourse({
        code: '', name: '', credits: 3, semester: 1, type: 'Core', program: 'B.Tech', specializations: [],
      });
      setEditSpecializationInput('');
      setSpecializationInput('');
    };

    if (!showModal || (isEdit && !editingCourse)) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? 'Edit Course' : 'Add New Course'}</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Form Fields - Row 1 (Code, Credits) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Code *
                </label>
                <input
                  type="text"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  placeholder="e.g., CS401"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Credits *
                </label>
                <input
                  type="number"
                  value={newCourse.credits}
                  onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="6"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Form Fields - Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Name *
              </label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="e.g., Advanced Algorithms"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Form Fields - Row 2 (Program, Semester, Type) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Program Select (NEW) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Program *
                </label>
                <select
                  value={newCourse.program}
                  onChange={(e) => setNewCourse({ ...newCourse, program: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="PhD">PhD</option>
                  <option value="M.Sc">M.Sc</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Semester *
                </label>
                <select
                  value={newCourse.semester}
                  onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type *
                </label>
                <select
                  value={newCourse.type}
                  onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>
            </div>

            {/* Specializations Field (Unchanged) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specializations
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={isEdit ? editSpecializationInput : specializationInput}
                  onChange={(e) => isEdit ? setEditSpecializationInput(e.target.value) : setSpecializationInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), isEdit ? handleAddEditSpecialization() : handleAddSpecialization())}
                  placeholder="e.g., CSE, AI, ML"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={isEdit ? handleAddEditSpecialization : handleAddSpecialization}
                  className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shrink-0"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newCourse.specializations.map(spec => (
                  <span
                    key={spec}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {spec}
                    <button
                      onClick={() => handleRemoveSpecialization(spec)}
                      className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={isEdit ? handleUpdateCourse : handleAddCourse}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                {isEdit ? 'Update Course' : 'Add Course'}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllocateModal = () => {
    if (!showAllocateModal || !selectedCourse) return null;
    
    const currentAllocation = allocations.find(a => a.courseId === selectedCourse.id);
    const facultyId = allocationForm.facultyId || (currentAllocation ? currentAllocation.facultyId : '');
    const sections = allocationForm.sections || (currentAllocation ? currentAllocation.sections : 1);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-2xl transform transition-all shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Allocate {selectedCourse.code} - {selectedCourse.name}
            </h3>
            <button
              onClick={() => setShowAllocateModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Faculty Member *
              </label>
              <select
                value={facultyId}
                onChange={(e) => setAllocationForm({ ...allocationForm, facultyId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a faculty member</option>
                {getMatchingFaculty(selectedCourse).map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} - {f.designation} (Load: {f.currentLoad}/{f.maxLoad})
                  </option>
                ))}
                <option disabled className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">--- All Faculty ---</option>
                {faculty.filter(f => !getMatchingFaculty(selectedCourse).some(match => match.id === f.id)).map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} - {f.designation} (Load: {f.currentLoad}/{f.maxLoad})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Faculty with matching specializations are shown first
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Sections *
              </label>
              <input
                type="number"
                value={sections}
                onChange={(e) => setAllocationForm({ ...allocationForm, sections: parseInt(e.target.value) || 1 })}
                min="1"
                max="10"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {facultyId && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Faculty Details</h4>
                {(() => {
                  const selectedFaculty = getFacultyById(facultyId);
                  if (!selectedFaculty) return null;
                  
                  const loadIncrease = selectedCourse.credits * sections;
                  const newLoad = selectedFaculty.currentLoad + loadIncrease;
                  const isOverload = newLoad > selectedFaculty.maxLoad;
                  
                  return (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Name:</strong> {selectedFaculty.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Specializations:</strong> {selectedFaculty.specializations.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Current Load:</strong> {selectedFaculty.currentLoad}/{selectedFaculty.maxLoad}
                      </p>
                      <p className={`text-sm ${isOverload ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        <strong>Projected Load:</strong> {newLoad}/{selectedFaculty.maxLoad}
                        {isOverload && ' (Overload!)'}
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAllocateCourse}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                {currentAllocation ? 'Update Allocation' : 'Allocate Course'}
              </button>
              <button
                onClick={() => setShowAllocateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllocations = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 ">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0"></h2>
        
        {/* Allocation Filters */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-3/4 justify-end">
          <input
            type="text"
            placeholder="Filter by Course Code..."
            value={allocationFilter.searchCourseCode}
            onChange={(e) => setAllocationFilter({...allocationFilter, searchCourseCode: e.target.value})}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <select
            value={allocationFilter.facultyId}
            onChange={(e) => setAllocationFilter({...allocationFilter, facultyId: e.target.value})}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Faculty</option>
            {faculty.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <select
            value={allocationFilter.status}
            onChange={(e) => setAllocationFilter({...allocationFilter, status: e.target.value})}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>


      {/* Allocation Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Allocated Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sections</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Load (Credits)</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAllocations.length > 0 ? (
                filteredAllocations.map((a) => (
                  <tr key={a.courseId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{a.course?.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{a.course?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{a.credits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="font-medium">{a.faculty?.name}</div>
                        <div className={`text-xs font-semibold ${
                            a.status === 'approved' ? 'text-green-600 dark:text-green-400' :
                            a.status === 'rejected' ? 'text-red-600 dark:text-red-400' :
                            'text-amber-600 dark:text-amber-400'
                        }`}>
                            Status: {a.status}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{a.sections}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {a.credits * a.sections}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No allocations match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} font-inter`}>
      <style>{`
        /* Custom scrollbar for dark mode compatibility */
        .dark ::-webkit-scrollbar-thumb {
            background-color: #4b5563; /* gray-600 */
            border-radius: 9999px;
        }
        .dark ::-webkit-scrollbar-track {
            background: #1f2937; /* gray-800 */
        }
        /* Base styles for light/dark mode */
        .dark .text-gray-900 { color: #ffffff; }
        .dark .text-gray-500 { color: #9ca3af; }
        .dark .bg-white { background-color: #1f2937; }
        .dark .bg-gray-50 { background-color: #111827; }
        .dark .border-gray-100, .dark .border-gray-200 { border-color: #374151; }
        .dark input, .dark select {
          border-color: #4b5563;
          background-color: #374151;
          color: #f3f4f6;
        }
        .dark input::placeholder { color: #9ca3af; }
        .dark .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }
      `}</style>
      
      {/* Header and Theme Toggle */}
     
      <main className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-6rem)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('courses')}
                className={`
                  ${activeTab === 'courses'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                `}
              >
                <BookOpen className="inline h-5 w-5 mr-2" />
                Course 
              </button>
              <button
                onClick={() => setActiveTab('allocations')}
                className={`
                  ${activeTab === 'allocations'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                `}
              >
                <Send className="inline h-5 w-5 mr-2" />
                Course Allocations
              </button>
            </nav>
          </div>

          {/* Content */}
          {activeTab === 'courses' && renderCourses()}
          {activeTab === 'allocations' && renderAllocations()}
        </div>
      </main>

    </div>
  );
}

export default App;
