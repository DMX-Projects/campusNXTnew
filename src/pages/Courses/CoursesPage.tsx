import React, { useState } from 'react';
import { Plus, BookOpen, Users, Clock, Award } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockCourses, mockFaculty, Course } from '../../data/mockData';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courseFormConfig = {
    title: 'Course Information',
    fields: [
      { name: 'name', type: 'text', label: 'Course Name', required: true },
      { name: 'code', type: 'text', label: 'Course Code', required: true },
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'year', type: 'select', label: 'Year', required: true, options: [1, 2, 3, 4] },
      { name: 'semester', type: 'select', label: 'Semester', required: true, options: [1, 2] },
      { name: 'credits', type: 'number', label: 'Credits', required: true, min: 1, max: 6 },
      { name: 'facultyId', type: 'select', label: 'Faculty', required: true, options: mockFaculty.map(f => f.id) },
      { name: 'description', type: 'textarea', label: 'Description', required: true },
    ]
  };

  const columns = [
    { key: 'code', label: 'Course Code', sortable: true },
    { key: 'name', label: 'Course Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'year', 
      label: 'Year/Semester', 
      sortable: true,
      render: (value: number, row: Course) => `Year ${value}, Sem ${row.semester}`
    },
    { 
      key: 'credits', 
      label: 'Credits', 
      sortable: true,
      render: (value: number) => (
        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
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
  ];

  const handleAddCourse = (courseData: any) => {
    const newCourse: Course = {
      ...courseData,
      id: `COU${String(courses.length + 1).padStart(3, '0')}`,
    };
    setCourses(prev => [...prev, newCourse]);
    setShowAddModal(false);
  };

  const handleEditCourse = (courseData: any) => {
    if (selectedCourse) {
      setCourses(prev => prev.map(course => 
        course.id === selectedCourse.id ? { ...course, ...courseData } : course
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
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
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
                    <span className="text-gray-500">Year/Semester:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Year {course.year}, Sem {course.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Faculty:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faculty ? `${faculty.firstName} ${faculty.lastName}` : 'Not Assigned'}
                    </span>
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