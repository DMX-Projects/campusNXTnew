import { useState, useEffect } from 'react';
import { X, UserPlus, Search, Moon, Sun } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  program: string;
  semester: number;
  type: string;
  specializations: string[];
  totalSections: number;
  credits: number;
}

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  specializations: string[];
}

interface Allocation {
  courseId: string;
  facultyId: string;
  section: string;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [courseFilter, setCourseFilter] = useState({
    search: '',
    program: 'all',
    semester: 'all',
    type: 'all',
  });

  const [courses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Programming',
      program: 'B.Tech',
      semester: 1,
      type: 'Core',
      specializations: ['CSE', 'IT'],
      totalSections: 3,
      credits: 4
    },
    {
      id: '2',
      code: 'CS201',
      name: 'Data Structures',
      program: 'B.Tech',
      semester: 3,
      type: 'Core',
      specializations: ['CSE'],
      totalSections: 4,
      credits: 4
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Machine Learning',
      program: 'M.Tech',
      semester: 1,
      type: 'Elective',
      specializations: ['CSE', 'AI'],
      totalSections: 2,
      credits: 3
    },
    {
      id: '4',
      code: 'CS401',
      name: 'Artificial Intelligence',
      program: 'M.Tech',
      semester: 2,
      type: 'Core',
      specializations: ['CSE', 'AI'],
      totalSections: 2,
      credits: 4
    },
    {
      id: '5',
      code: 'CS102',
      name: 'Database Management Systems',
      program: 'B.Tech',
      semester: 4,
      type: 'Core',
      specializations: ['CSE', 'IT'],
      totalSections: 3,
      credits: 4
    },
  ]);

  const [faculty] = useState<FacultyMember[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      designation: 'Professor',
      specializations: ['AI', 'ML']
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      designation: 'Associate Professor',
      specializations: ['CSE', 'Algorithms']
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      designation: 'Assistant Professor',
      specializations: ['CSE', 'IT']
    },
  ]);

  const [allocations, setAllocations] = useState<Allocation[]>([
    { courseId: '1', facultyId: '3', section: 'A' },
    { courseId: '1', facultyId: '2', section: 'B' },
    { courseId: '2', facultyId: '2', section: 'A' },
  ]);

  const [allocationForm, setAllocationForm] = useState({
    facultyId: '',
    section: '',
  });

  const getMatchingFaculty = (course: Course) => {
    return faculty.filter(f =>
      f.specializations.some(spec => course.specializations.includes(spec))
    );
  };

  const getAvailableSections = (course: Course) => {
    const sections = [];
    for (let i = 0; i < course.totalSections; i++) {
      sections.push(String.fromCharCode(65 + i));
    }
    return sections;
  };

  const getSectionAllocation = (courseId: string, section: string) => {
    return allocations.find(a => a.courseId === courseId && a.section === section);
  };

  const getFacultyById = (facultyId: string) => {
    return faculty.find(f => f.id === facultyId);
  };

  const openAllocateModal = (course: Course) => {
    setSelectedCourse(course);
    setShowAllocateModal(true);
    setAllocationForm({
      facultyId: '',
      section: '',
    });
  };

  const handleAllocateCourse = () => {
    if (!selectedCourse || !allocationForm.facultyId || !allocationForm.section) {
      alert('Please select a faculty member and section');
      return;
    }

    const newAllocation: Allocation = {
      courseId: selectedCourse.id,
      facultyId: allocationForm.facultyId,
      section: allocationForm.section,
    };
    setAllocations([...allocations, newAllocation]);

    setShowAllocateModal(false);
    setSelectedCourse(null);
    setAllocationForm({ facultyId: '', section: '' });
  };

  const handleDeleteAllocation = (courseId: string, section: string) => {
    setAllocations(allocations.filter(
      a => !(a.courseId === courseId && a.section === section)
    ));
  };

  const handleReassignAllocation = (course: Course, section: string) => {
    setSelectedCourse(course);
    setShowAllocateModal(true);
    setAllocationForm({
      facultyId: '',
      section: section,
    });
    handleDeleteAllocation(course.id, section);
  };

  const renderAllocateModal = () => {
    if (!showAllocateModal || !selectedCourse) return null;

    const availableSections = getAvailableSections(selectedCourse);
    const unassignedSections = allocationForm.section 
      ? [allocationForm.section]
      : availableSections.filter(section => 
          !getSectionAllocation(selectedCourse.id, section)
        );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Allocate {selectedCourse.code}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedCourse.name}</p>
            </div>
            <button
              onClick={() => {
                setShowAllocateModal(false);
                setAllocationForm({ facultyId: '', section: '' });
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Section *
              </label>
              <select
                value={allocationForm.section}
                onChange={(e) => setAllocationForm({ ...allocationForm, section: e.target.value })}
                disabled={!!allocationForm.section}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a section</option>
                {unassignedSections.length > 0 ? (
                  unassignedSections.map(section => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>All sections assigned</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Faculty Member *
              </label>
              <select
                value={allocationForm.facultyId}
                onChange={(e) => setAllocationForm({ ...allocationForm, facultyId: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Select a faculty member</option>
                {faculty.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} - {f.designation}
                  </option>
                ))}
              </select>
            </div>

            {allocationForm.facultyId && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specializations:</h4>
                {(() => {
                  const selectedFaculty = getFacultyById(allocationForm.facultyId);
                  if (!selectedFaculty) return null;

                  return (
                    <div className="text-sm">
                      <span className="font-medium text-gray-900 dark:text-gray-200">
                        {selectedFaculty.specializations.join(', ')}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAllocateCourse}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Allocate Course
              </button>
              <button
                onClick={() => {
                  setShowAllocateModal(false);
                  setAllocationForm({ facultyId: '', section: '' });
                }}
                className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredCourses = courses.filter(course => {
    const searchMatch = course.code.toLowerCase().includes(courseFilter.search.toLowerCase()) ||
                        course.name.toLowerCase().includes(courseFilter.search.toLowerCase());
    const programMatch = courseFilter.program === 'all' || course.program === courseFilter.program;
    const semesterMatch = courseFilter.semester === 'all' || course.semester === parseInt(courseFilter.semester);
    const typeMatch = courseFilter.type === 'all' || course.type === courseFilter.type;
    return searchMatch && programMatch && semesterMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by course code or name..."
              value={courseFilter.search}
              onChange={(e) => setCourseFilter({...courseFilter, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={courseFilter.program}
            onChange={(e) => setCourseFilter({...courseFilter, program: e.target.value})}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[140px]"
          >
            <option value="all">All Programs</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="PhD">PhD</option>
          </select>
          <select
            value={courseFilter.semester}
            onChange={(e) => setCourseFilter({...courseFilter, semester: e.target.value})}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[140px]"
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
          <select
            value={courseFilter.type}
            onChange={(e) => setCourseFilter({...courseFilter, type: e.target.value})}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[120px]"
          >
            <option value="all">All Types</option>
            <option value="Core">Core</option>
            <option value="Elective">Elective</option>
            <option value="Lab">Lab</option>
          </select>
        </div>

        {renderAllocateModal()}

        {/* Course List */}
        <div className="grid gap-5">
          {filteredCourses.map(course => {
            const availableSections = getAvailableSections(course);
            const courseAllocations = availableSections.map(section => ({
              section,
              allocation: getSectionAllocation(course.id, section)
            })).filter(item => item.allocation);

            return (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex justify-between items-start gap-4 pb-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{course.code}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          course.type === 'Core' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                            : course.type === 'Elective'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {course.type}
                        </span>
                      </div>
                      <p className="text-base text-gray-700 dark:text-gray-300 mb-3 font-medium">{course.name}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">{course.program}</span>
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>Semester {course.semester}</span>
                        <span className="text-gray-400">•</span>
                        <span>{course.credits} Credits</span>
                        <span className="text-gray-400">•</span>
                        <span>{course.totalSections} Sections</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openAllocateModal(course)}
                      className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium whitespace-nowrap shadow-sm hover:shadow-md"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign Faculty
                    </button>
                  </div>

                  {/* Allocations */}
                  {courseAllocations.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Current Allocations</h4>
                      <div className="space-y-3">
                        {courseAllocations.map(({ section, allocation }) => {
                          const assignedFaculty = allocation ? getFacultyById(allocation.facultyId) : null;

                          return (
                            <div
                              key={section}
                              className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                            >
                              <div className="flex justify-between items-center gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="font-semibold text-base text-gray-900 dark:text-white">Section {section}</span>
                                    <span className="text-xs px-2.5 py-1 bg-emerald-600 dark:bg-emerald-700 text-white rounded-full font-medium">
                                      Assigned
                                    </span>
                                  </div>
                                  {assignedFaculty && (
                                    <div>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{assignedFaculty.name}</p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{assignedFaculty.designation}</p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                  <button
                                    onClick={() => handleReassignAllocation(course, section)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                                  >
                                    Reassign
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAllocation(course.id, section)}
                                    className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white text-sm rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 font-medium flex items-center gap-1.5 shadow-sm hover:shadow-md"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No Allocations Message */}
                  {courseAllocations.length === 0 && (
                    <div className="mt-5 text-center py-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                      <p className="text-sm text-gray-500 dark:text-gray-400">No faculty assigned yet. Click "Assign Faculty" to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-600 dark:text-gray-400">No courses found matching your filters.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;