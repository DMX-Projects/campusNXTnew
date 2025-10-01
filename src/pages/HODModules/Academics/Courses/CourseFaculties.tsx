import { useState } from 'react';
import { BookOpen, Calendar, CheckCircle, Clock, Award, Download, Send, Plus, X, UserPlus } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  type: string;
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
  const [activeTab, setActiveTab] = useState('courses');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', code: 'CS101', name: 'Introduction to Programming', credits: 4, semester: 1, type: 'Core', specializations: ['CSE', 'IT'] },
    { id: '2', code: 'CS201', name: 'Data Structures', credits: 4, semester: 3, type: 'Core', specializations: ['CSE'] },
    { id: '3', code: 'CS301', name: 'Machine Learning', credits: 3, semester: 5, type: 'Elective', specializations: ['CSE', 'AI'] },
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
    specializations: [] as string[],
  });

  const [allocationForm, setAllocationForm] = useState({
    facultyId: '',
    sections: 1,
  });

  const [specializationInput, setSpecializationInput] = useState('');
  const [editSpecializationInput, setEditSpecializationInput] = useState('');

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) {
      alert('Please fill in all required fields');
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
      specializations: [...course.specializations],
    });
    setShowEditCourse(true);
  };

  const handleUpdateCourse = () => {
    if (!newCourse.code || !newCourse.name || !editingCourse) {
      alert('Please fill in all required fields');
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
      specializations: [],
    });
    setEditSpecializationInput('');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course? This will also remove any associated allocations.')) {
      setCourses(courses.filter(course => course.id !== courseId));
      setAllocations(allocations.filter(allocation => allocation.courseId !== courseId));
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
    setAllocationForm({
      facultyId: '',
      sections: 1,
    });
  };

  const handleAllocateCourse = () => {
    if (!selectedCourse || !allocationForm.facultyId) {
      alert('Please select a faculty member');
      return;
    }

    const existingAllocation = allocations.find(a => a.courseId === selectedCourse.id);
    
    if (existingAllocation) {
      // Update existing allocation
      setAllocations(allocations.map(a =>
        a.courseId === selectedCourse.id
          ? {
              ...a,
              facultyId: allocationForm.facultyId,
              sections: allocationForm.sections,
              credits: selectedCourse.credits,
              status: 'pending' as const
            }
          : a
      ));
    } else {
      // Create new allocation
      const newAllocation: Allocation = {
        courseId: selectedCourse.id,
        facultyId: allocationForm.facultyId,
        sections: allocationForm.sections,
        credits: selectedCourse.credits,
        status: 'pending',
      };
      setAllocations([...allocations, newAllocation]);
    }

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

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900"></h2>
        <button
          onClick={() => setShowAddCourse(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      {showAddCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Course</h3>
              <button
                onClick={() => setShowAddCourse(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g., CS401"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits *
                  </label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g., Advanced Algorithms"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester *
                  </label>
                  <select
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={newCourse.type}
                    onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                    placeholder="e.g., CSE, AI, ML"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpecialization}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCourse.specializations.map(spec => (
                    <span
                      key={spec}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {spec}
                      <button
                        onClick={() => handleRemoveSpecialization(spec)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddCourse}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Course
                </button>
                <button
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditCourse && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Course</h3>
              <button
                onClick={() => {
                  setShowEditCourse(false);
                  setEditingCourse(null);
                  setNewCourse({
                    code: '',
                    name: '',
                    credits: 3,
                    semester: 1,
                    type: 'Core',
                    specializations: [],
                  });
                  setEditSpecializationInput('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g., CS401"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credits *
                  </label>
                  <input
                    type="number"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g., Advanced Algorithms"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester *
                  </label>
                  <select
                    value={newCourse.semester}
                    onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={newCourse.type}
                    onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={editSpecializationInput}
                    onChange={(e) => setEditSpecializationInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEditSpecialization())}
                    placeholder="e.g., CSE, AI, ML"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddEditSpecialization}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newCourse.specializations.map(spec => (
                    <span
                      key={spec}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {spec}
                      <button
                        onClick={() => handleRemoveSpecialization(spec)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateCourse}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Course
                </button>
                <button
                  onClick={() => {
                    setShowEditCourse(false);
                    setEditingCourse(null);
                    setNewCourse({
                      code: '',
                      name: '',
                      credits: 3,
                      semester: 1,
                      type: 'Core',
                      specializations: [],
                    });
                    setEditSpecializationInput('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllocateModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Allocate {selectedCourse.code} - {selectedCourse.name}
              </h3>
              <button
                onClick={() => setShowAllocateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Faculty Member *
                </label>
                <select
                  value={allocationForm.facultyId}
                  onChange={(e) => setAllocationForm({ ...allocationForm, facultyId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a faculty member</option>
                  {getMatchingFaculty(selectedCourse).map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.designation} (Load: {f.currentLoad}/{f.maxLoad})
                    </option>
                  ))}
                  <option disabled>--- All Faculty ---</option>
                  {faculty.filter(f => !getMatchingFaculty(selectedCourse).includes(f)).map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.designation} (Load: {f.currentLoad}/{f.maxLoad})
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Faculty with matching specializations are shown first
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Sections *
                </label>
                <input
                  type="number"
                  value={allocationForm.sections}
                  onChange={(e) => setAllocationForm({ ...allocationForm, sections: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {allocationForm.facultyId && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Faculty Details</h4>
                  {(() => {
                    const selectedFaculty = getFacultyById(allocationForm.facultyId);
                    if (!selectedFaculty) return null;
                    
                    const newLoad = selectedFaculty.currentLoad + (selectedCourse.credits * allocationForm.sections);
                    const isOverload = newLoad > selectedFaculty.maxLoad;
                    
                    return (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>Name:</strong> {selectedFaculty.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Specializations:</strong> {selectedFaculty.specializations.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Current Load:</strong> {selectedFaculty.currentLoad}/{selectedFaculty.maxLoad}
                        </p>
                        <p className={`text-sm ${isOverload ? 'text-red-600' : 'text-green-600'}`}>
                          <strong>After Assignment:</strong> {newLoad}/{selectedFaculty.maxLoad}
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
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Allocate Course
                </button>
                <button
                  onClick={() => setShowAllocateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => {
                const allocation = getCourseAllocation(course.id);
                const assignedFaculty = allocation ? getFacultyById(allocation.facultyId) : null;

                return (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.credits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sem {course.semester}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.type === 'Core' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {course.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignedFaculty ? (
                        <div>
                          <div className="font-medium">{assignedFaculty.name}</div>
                          <div className="text-gray-500">
                            {allocation?.sections} section{allocation?.sections !== 1 ? 's' : ''} • 
                            <span className={`ml-1 ${
                              allocation?.status === 'approved' ? 'text-green-600' :
                              allocation?.status === 'rejected' ? 'text-red-600' :
                              'text-amber-600'
                            }`}>
                              {allocation?.status}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openAllocateModal(course)}
                       className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors mr-1 text-xs"
                      >
                       <UserPlus className="h-3 w-3 mr-1" />
                        {assignedFaculty ? 'Reassign' : 'Assign'}
                      </button>
                     <button
                       onClick={() => handleEditCourse(course)}
                       className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors mr-1 text-xs"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleDeleteCourse(course.id)}
                       className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors mr-1 text-xs"
                     >
                       Delete
                     </button>
                      {allocation && allocation.status === 'pending' && (
                        <button
                          onClick={() => approveAllocation(course.id)}
                         className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                        >
                         <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAllocations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Allocations</h2>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Send className="h-4 w-4 mr-2" />
            Submit to DUGC
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-amber-600">{allocations.filter(a => a.status === 'pending').length}</p>
            </div>
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{allocations.filter(a => a.status === 'approved').length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-blue-600">{allocations.reduce((sum, a) => sum + a.credits, 0)}</p>
            </div>
            <Award className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allocations.map((allocation) => {
                const course = courses.find(c => c.id === allocation.courseId);
                const facultyMember = faculty.find(f => f.id === allocation.facultyId);

                return (
                  <tr key={`${allocation.courseId}-${allocation.facultyId}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course?.code}</div>
                        <div className="text-sm text-gray-500">{course?.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{facultyMember?.name}</div>
                        <div className="text-sm text-gray-500">{facultyMember?.designation}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.credits}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allocation.sections}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        allocation.status === 'approved' ? 'bg-green-100 text-green-800' :
                        allocation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {allocation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {allocation.status === 'pending' && (
                        <button
                          onClick={() => approveAllocation(allocation.courseId)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'courses', name: 'Courses', icon: BookOpen },
              { id: 'allocations', name: 'Allocations', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'allocations' && renderAllocations()}
      </main>
    </div>
  );
}

export default App;