import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import CourseForm from '../LMS/Components/courses/CourseForm';
import { mockCourses } from '../LMS/data/mockData';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const columns = [
    { key: 'code', label: 'Course Code', sortable: true },
    { key: 'name', label: 'Course Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'credits', label: 'Credits', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'enrolledStudents', label: 'Enrolled', sortable: true },
  ];

  const handleAdd = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (course: any) => {
    if (confirm(`Are you sure you want to delete ${course.name}?`)) {
      setCourses(courses.filter(c => c.id !== course.id));
    }
  };

  const handleSave = (courseData: any) => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...courseData, id: editingCourse.id } : c));
    } else {
      setCourses([...courses, { ...courseData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        <p className="text-gray-600 mt-1">Manage courses, curriculum, and academic programs</p>
      </div>

      <DataTable
        title="Courses"
        columns={columns}
        data={courses}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search courses..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
        size="lg"
      >
        <CourseForm
          course={editingCourse}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CourseManagement;