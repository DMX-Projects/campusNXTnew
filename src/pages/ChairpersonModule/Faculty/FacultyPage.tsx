import React, { useState } from 'react';
import { Plus, Users, Award, BookOpen, TrendingUp } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockFaculty, Faculty } from '../../data/mockData';

const FacultyPage: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const facultyFormConfig = {
    title: 'Faculty Information',
    fields: [
      { name: 'firstName', type: 'text', label: 'First Name', required: true },
      { name: 'lastName', type: 'text', label: 'Last Name', required: true },
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'phone', type: 'tel', label: 'Phone', required: true },
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'designation', type: 'select', label: 'Designation', required: true, options: ['Assistant Professor', 'Associate Professor', 'Professor', 'Head of Department'] },
      { name: 'qualification', type: 'text', label: 'Qualification', required: true },
      { name: 'experience', type: 'number', label: 'Experience (Years)', required: true, min: 0 },
      { name: 'joiningDate', type: 'date', label: 'Joining Date', required: true },
      { name: 'salary', type: 'number', label: 'Monthly Salary', required: true, min: 0 },
    ]
  };

  const columns = [
    { key: 'id', label: 'Faculty ID', sortable: true },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true,
      render: (value: any, row: Faculty) => `${row.firstName} ${row.lastName}`
    },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'experience', 
      label: 'Experience', 
      sortable: true,
      render: (value: number) => `${value} years`
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { 
      key: 'subjects', 
      label: 'Subjects', 
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((subject, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-xs">
              {subject}
            </span>
          ))}
          {value.length > 2 && (
            <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
              +{value.length - 2}
            </span>
          )}
        </div>
      )
    }
  ];

  const handleAddFaculty = (facultyData: any) => {
    const newFaculty: Faculty = {
      ...facultyData,
      id: `FAC${String(faculty.length + 1).padStart(3, '0')}`,
      subjects: [],
    };
    setFaculty(prev => [...prev, newFaculty]);
    setShowAddModal(false);
  };

  const handleEditFaculty = (facultyData: any) => {
    if (selectedFaculty) {
      setFaculty(prev => prev.map(f => 
        f.id === selectedFaculty.id ? { ...f, ...facultyData } : f
      ));
      setShowEditModal(false);
      setSelectedFaculty(null);
    }
  };

  const handleDeleteFaculty = (facultyMember: Faculty) => {
    if (window.confirm(`Are you sure you want to delete ${facultyMember.firstName} ${facultyMember.lastName}?`)) {
      setFaculty(prev => prev.filter(f => f.id !== facultyMember.id));
    }
  };

  const handleEditClick = (facultyMember: Faculty) => {
    setSelectedFaculty(facultyMember);
    setShowEditModal(true);
  };

  const stats = [
    {
      title: 'Total Faculty',
      value: faculty.length.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+5%'
    },
    {
      title: 'Professors',
      value: faculty.filter(f => f.designation === 'Professor').length.toString(),
      icon: Award,
      color: 'bg-green-500',
      change: '+2'
    },
    {
      title: 'Associate Professors',
      value: faculty.filter(f => f.designation === 'Associate Professor').length.toString(),
      icon: Award,
      color: 'bg-purple-500',
      change: '+1'
    },
    {
      title: 'Average Experience',
      value: `${(faculty.reduce((sum, f) => sum + f.experience, 0) / faculty.length).toFixed(1)} years`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+0.5'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Faculty Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage faculty records and academic staff
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty</span>
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

      {/* Faculty Table */}
      <DataTable
        data={faculty}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteFaculty}
        searchable={true}
        exportable={true}
      />

      {/* Add Faculty Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Faculty"
        size="lg"
      >
        <Form
          config={facultyFormConfig}
          onSubmit={handleAddFaculty}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Faculty Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Faculty"
        size="lg"
      >
        {selectedFaculty && (
          <Form
            config={facultyFormConfig}
            initialData={selectedFaculty}
            onSubmit={handleEditFaculty}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedFaculty(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default FacultyPage;