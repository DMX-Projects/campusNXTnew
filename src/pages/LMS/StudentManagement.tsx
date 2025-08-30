import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import StudentForm from '../LMS/Components/students/StudentForm';
import { mockStudents } from '../LMS/data/mockData';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const columns = [
    { key: 'studentId', label: 'Student ID', sortable: true },
    { key: 'name', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'semester', label: 'Semester', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
          value === 'Graduated' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'gpa', label: 'GPA', sortable: true },
  ];

  const handleAdd = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (student: any) => {
    if (confirm(`Are you sure you want to delete ${student.name}'s record?`)) {
      setStudents(students.filter(s => s.id !== student.id));
    }
  };

  const handleSave = (studentData: any) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s));
    } else {
      setStudents([...students, { ...studentData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        <p className="text-gray-600 mt-1">Manage student records, enrollment, and academic progress</p>
      </div>

      <DataTable
        title="Students"
        columns={columns}
        data={students}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search students..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StudentManagement;