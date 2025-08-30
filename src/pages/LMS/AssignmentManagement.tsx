import React, { useState } from 'react';
import DataTable from '../LMS/Components/common/DataTable';
import Modal from '../LMS/Components/common/Modal';
import AssignmentForm from '../LMS/Components/assignments/AssignmentForm';
import { mockAssignments } from '../LMS/data/mockData';
import { FileText, Calendar, Users, Clock } from 'lucide-react';

const AssignmentManagement: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const columns = [
    { key: 'title', label: 'Assignment Title', sortable: true },
    { key: 'course', label: 'Course', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'maxMarks', label: 'Max Marks', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-800' :
          value === 'Graded' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'submissions', label: 'Submissions', sortable: true },
  ];

  const handleAdd = () => {
    setEditingAssignment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assignment: any) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleDelete = (assignment: any) => {
    if (confirm(`Are you sure you want to delete "${assignment.title}"?`)) {
      setAssignments(assignments.filter(a => a.id !== assignment.id));
    }
  };

  const handleSave = (assignmentData: any) => {
    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === editingAssignment.id ? { ...assignmentData, id: editingAssignment.id } : a));
    } else {
      setAssignments([...assignments, { ...assignmentData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignment Management</h1>
        <p className="text-gray-600 mt-1">Create, manage, and track assignments and submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
              <p className="text-gray-600 text-sm">Total Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">8</h3>
              <p className="text-gray-600 text-sm">Due This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-emerald-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">342</h3>
              <p className="text-gray-600 text-sm">Total Submissions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-gray-600 text-sm">Grading Pending</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        title="Assignments"
        columns={columns}
        data={assignments}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search assignments..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
        size="lg"
      >
        <AssignmentForm
          assignment={editingAssignment}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AssignmentManagement;