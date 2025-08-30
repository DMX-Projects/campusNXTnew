import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import GradeForm from '../LMS/Components/grades/GradeForm';
import GradeAnalytics from '../LMS/Components/grades/GradeAnalytics';
import { mockGrades } from '../LMS/data/mockData';

const GradeManagement: React.FC = () => {
  const [grades, setGrades] = useState(mockGrades);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);

  const columns = [
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'studentId', label: 'Student ID', sortable: true },
    { key: 'course', label: 'Course', sortable: true },
    { key: 'assessment', label: 'Assessment', sortable: true },
    { key: 'marksObtained', label: 'Marks Obtained', sortable: true },
    { key: 'maxMarks', label: 'Max Marks', sortable: true },
    { 
      key: 'grade', 
      label: 'Grade', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'A+' || value === 'A' ? 'bg-emerald-100 text-emerald-800' :
          value === 'B+' || value === 'B' ? 'bg-blue-100 text-blue-800' :
          value === 'C+' || value === 'C' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  const handleAdd = () => {
    setEditingGrade(null);
    setIsModalOpen(true);
  };

  const handleEdit = (grade: any) => {
    setEditingGrade(grade);
    setIsModalOpen(true);
  };

  const handleDelete = (grade: any) => {
    if (confirm(`Are you sure you want to delete this grade record?`)) {
      setGrades(grades.filter(g => g.id !== grade.id));
    }
  };

  const handleSave = (gradeData: any) => {
    if (editingGrade) {
      setGrades(grades.map(g => g.id === editingGrade.id ? { ...gradeData, id: editingGrade.id } : g));
    } else {
      setGrades([...grades, { ...gradeData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grade Management</h1>
        <p className="text-gray-600 mt-1">Manage student grades, assessments, and academic performance</p>
      </div>

      <GradeAnalytics />

      <DataTable
        title="Grade Records"
        columns={columns}
        data={grades}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search grades..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGrade ? 'Edit Grade' : 'Add New Grade'}
        size="lg"
      >
        <GradeForm
          grade={editingGrade}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default GradeManagement;