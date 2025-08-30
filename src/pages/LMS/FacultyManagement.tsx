import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import FacultyForm from '../LMS/Components/faculty/FacultyForm';
import { mockFaculty } from '../LMS/data/mockData';

const FacultyManagement: React.FC = () => {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const columns = [
    { key: 'employeeId', label: 'Employee ID', sortable: true },
    { key: 'name', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'experience', label: 'Experience', sortable: true },
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
  ];

  const handleAdd = () => {
    setEditingFaculty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (facultyMember: any) => {
    setEditingFaculty(facultyMember);
    setIsModalOpen(true);
  };

  const handleDelete = (facultyMember: any) => {
    if (confirm(`Are you sure you want to delete ${facultyMember.name}'s record?`)) {
      setFaculty(faculty.filter(f => f.id !== facultyMember.id));
    }
  };

  const handleSave = (facultyData: any) => {
    if (editingFaculty) {
      setFaculty(faculty.map(f => f.id === editingFaculty.id ? { ...facultyData, id: editingFaculty.id } : f));
    } else {
      setFaculty([...faculty, { ...facultyData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
        <p className="text-gray-600 mt-1">Manage faculty members, assignments, and performance</p>
      </div>

      <DataTable
        title="Faculty Members"
        columns={columns}
        data={faculty}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search faculty..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        size="lg"
      >
        <FacultyForm
          faculty={editingFaculty}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FacultyManagement;