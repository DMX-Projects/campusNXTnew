import React, { useState } from 'react';
import { Plus, BookOpen, Pencil, Trash, Filter } from 'lucide-react';
import { mockCourses, mockFaculty, Course } from '../../../data/mockData';

const CoursesPage: React.FC = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [showAddModal, setShowAddModal] = useState(false);

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [showAddModal, setShowAddModal] = useState(false);
    const columns = [

  const columns = [
    { 
      key: 'icon',
      label: '',
      render: () => (
        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-pink-500" />
        </div>
      )
    },
    {
      key: 'courseInfo',
      label: 'COURSE INFO',
      render: (course: Course) => (
        <div>
          <div className="font-medium">{course.name}</div>
          <div className="text-sm text-gray-500">{course.code}</div>
        </div>
      )
    },
    {
      key: 'program',
      label: 'PROGRAM',
      render: (course: Course) => (
        <div className="text-sm">
          Bachelor of Technology in Computer Science
        </div>
      )
    },
    {
      key: 'yearAndSemester',
      label: 'YEAR & SEMESTER',
      render: (course: Course) => (
        <div>
          <div className="text-sm">{`${getYear(course.year)} Year`}</div>
          <div className="text-sm text-gray-500">{`${getSemester(course.semester)} Semester`}</div>
        </div>
      )
    },
    {
      key: 'credits',
      label: 'CREDITS & TYPE',
      render: (course: Course) => (
        <div>
          <div className="text-sm">{course.credits} Credits</div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Core
          </span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (course: Course) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      )
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      render: (course: Course) => (
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Trash className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )
    }
  ];
  
  // Calculate semester total credits
  const calculateSemesterCredits = (semester: number) => {
    return courses
      .filter(course => course.semester === semester)
      .reduce((total, course) => total + course.credits, 0);
  };

  // Helper for bulk upload
  const handleBulkUpload = (file: File) => {
    // Implementation for bulk course upload
    console.log('Bulk upload file:', file);
    setShowBulkUploadModal(false);
  };

  // Bulk upload modal content
  const BulkUploadModal = () => (
    <Modal
      title="Bulk Upload Courses"
      isOpen={showBulkUploadModal}
      onClose={() => setShowBulkUploadModal(false)}
    >
      <div className="p-4">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => e.target.files && handleBulkUpload(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-2 text-sm text-gray-500">
          Upload a CSV or Excel file containing course information
        </p>
      </div>
    </Modal>
  );

const courseFormConfig = {
    title: 'Course Information',
    fields: [
      { name: 'name', type: 'text', label: 'Course Name', required: true },
      { name: 'code', type: 'text', label: 'Course Code', required: true },
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'year', type: 'select', label: 'Regulation Year', required: true, options: [2021, 2022, 2023, 2024, 2025] },
      { name: 'semester', type: 'select', label: 'Semester', required: true, options: [1, 2] },
      { name: 'credits', type: 'number', label: 'Credits', required: true, min: 1, max: 6 },
      { name: 'cumulativeCredits', type: 'number', label: 'Cumulative Credits', required: true, min: 0 },
      { name: 'semesterTotalCredits', type: 'number', label: 'Semester Total Credits', required: true, min: 0 },
      { name: 'facultyId', type: 'select', label: 'Faculty', required: true, options: mockFaculty.map(f => f.id) },
      { name: 'ph', type: 'checkbox', label: 'Physically Handicapped Status', required: false },
      { name: 'regulationUpdate', type: 'textarea', label: 'Regulation Updates', required: false },
      { name: 'subjectCriteria', type: 'textarea', label: 'Subject Criteria', required: true },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
    ]
  };

  const columns = [
    { 
      key: 'code', 
      label: 'Course Code', 
      sortable: true,
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'name', 
      label: 'Course Name', 
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-blue-600 dark:text-blue-400">{value}</span>
      )
    },
    { 
      key: 'department', 
      label: 'Department', 
      sortable: true 
    },
    { 
      key: 'year', 
      label: 'Regulation Year', 
      sortable: true,
      render: (value: number) => (
        <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
          {value}
        </span>
      )
    },
    { 
      key: 'semester', 
      label: 'Semester', 
      sortable: true,
      render: (value: number) => (
        <span className="text-sm font-medium">
          Semester {value}
        </span>
      )
    },
    { 
      key: 'credits', 
      label: 'Credits', 
      sortable: true,
      render: (value: number) => (
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
          {value} Credits
        </span>
      )
    },
    {
      key: 'cumulativeCredits',
      label: 'Cumulative Credits',
      sortable: true,
      render: (value: number) => (
        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
          {value || 0} Total
        </span>
      )
    },
    {
      key: 'semesterTotalCredits',
      label: 'Semester Total',
      sortable: true,
      render: (value: number) => (
        <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
          {value || 0} / Sem
        </span>
      )
    },
    {
      key: 'regulationUpdate',
      label: 'Regulation Update',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value || 'No updates'}
        </span>
      )
    },
    {
      key: 'ph',
      label: 'PH Status',
      sortable: true,
      render: (value: boolean) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          value 
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }`}>
          {value ? 'PH' : 'Non-PH'}
        </span>
      )
    },
    {
      key: 'subjectCriteria',
      label: 'Subject Criteria',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value || 'Standard'}
        </span>
      )
    }
      label: 'Subject Criteria',
      sortable: true,
      render: (value: string) => value || 'Standard'
    }>
          {value} Credits
        </span>
      )
    },
    { 
      key: 'facultyId', 
      label: 'Faculty', 
      render: (value: string) => {
        const faculty = mockFaculty.find(f => f.id === value);
        return faculty ? `${faculty.firstName} ${faculty.lastName}` : 'Not Assigned';
      }
    },
    {
      key: 'ph',
      label: 'PH',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
  ];

  const handleAddCourse = (courseData: any) => {
    const newCourse: Course = {
      ...courseData,
      id: `COU${String(courses.length + 1).padStart(3, '0')}`,
      ph: !!courseData.ph,
    };
    setCourses(prev => [...prev, newCourse]);
    setShowAddModal(false);
  };

  const handleEditCourse = (courseData: any) => {
    if (selectedCourse) {
      setCourses(prev => prev.map(course => 
        course.id === selectedCourse.id ? { ...course, ...courseData, ph: !!courseData.ph } : course
      ));
      setShowEditModal(false);
      setSelectedCourse(null);
    }
  };

  const handleDeleteCourse = (course: Course) => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      setCourses(prev => prev.filter(c => c.id !== course.id));
    }
  };

  const handleEditClick = (course: Course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  // Cumulative credits for selected semester
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const semesterCredits = selectedSemester
    ? courses.filter(c => c.semester === selectedSemester).reduce((sum, c) => sum + c.credits, 0)
    : 0;

  // Summary by department/year/semester
  const summary = {} as Record<string, { credits: number; subjects: number }>;
  courses.forEach(c => {
    const key = `${c.department}-Y${c.year}-S${c.semester}`;
    if (!summary[key]) summary[key] = { credits: 0, subjects: 0 };
    summary[key].credits += c.credits;
    summary[key].subjects += 1;
  });

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+3'
    },
    {
      title: 'Active Courses',
      value: courses.length.toString(),
      icon: Clock,
      color: 'bg-green-500',
      change: '+2'
    },
    {
      title: 'Total Credits',
      value: courses.reduce((sum, c) => sum + c.credits, 0).toString(),
      icon: Award,
      color: 'bg-purple-500',
      change: '+8'
    },
    {
      title: 'Departments',
      value: new Set(courses.map(c => c.department)).size.toString(),
      icon: Users,
      color: 'bg-orange-500',
      change: '0'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage academic courses and curriculum
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
          <button
            onClick={() => alert('Bulk upload coming soon!')}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <span>Bulk Upload</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cumulative Credits for Semester */}
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="semesterSelect" className="font-medium">Select Semester:</label>
        <select
          id="semesterSelect"
          value={selectedSemester ?? ''}
          onChange={e => setSelectedSemester(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {[1, 2].map(s => (
            <option key={s} value={s}>{`Semester ${s}`}</option>
          ))}
        </select>
        {selectedSemester && (
          <span className="ml-4 font-semibold text-blue-700">Cumulative Credits: {semesterCredits}</span>
        )}
      </div>

      {/* Summary Cards by Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(summary).map(([key, val]) => (
          <div key={key} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-700">
            <div className="font-bold text-gray-900 dark:text-white">{key.replace(/-/g, ' | ')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Subjects: {val.subjects}</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Credits: {val.credits}</div>
          </div>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {courses.map((course) => {
          const faculty = mockFaculty.find(f => f.id === course.facultyId);
          return (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.name}</h3>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                    {course.code}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{course.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Regulation Year:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Semester:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cumulative Credits:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.cumulativeCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Semester Total:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.semesterTotalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Faculty:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faculty ? `${faculty.firstName} ${faculty.lastName}` : 'Not Assigned'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">PH Status:</span>
                    <span className={`font-medium ${course.ph ? 'text-yellow-600' : 'text-gray-900'} dark:text-white`}>
                      {course.ph ? 'PH' : 'Non-PH'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subject Criteria:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.subjectCriteria || 'Standard'}</span>
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <span className="text-xs text-gray-500 block mb-1">Regulation Update:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{course.regulationUpdate || 'No updates'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={() => handleEditClick(course)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses Table */}
      <DataTable
        data={courses}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteCourse}
        searchable={true}
        exportable={true}
      />

      {/* Add Course Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Course"
        size="lg"
      >
        <Form
          config={courseFormConfig}
          onSubmit={handleAddCourse}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Course Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Course"
        size="lg"
      >
        {selectedCourse && (
          <Form
            config={courseFormConfig}
            initialData={selectedCourse}
            onSubmit={handleEditCourse}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedCourse(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CoursesPage;