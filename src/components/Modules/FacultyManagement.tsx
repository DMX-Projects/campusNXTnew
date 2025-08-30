import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Eye, Users, Award } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { FORM_CONFIGS } from '../../data/formConfigs';
import facultyData from '../../data/faculty.json';

const FacultyManagement: React.FC = () => {
  const [faculty, setFaculty] = useState(facultyData.faculty);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const columns = [
    { key: 'id', label: 'Employee ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
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
    const newFaculty = {
      ...facultyData,
      id: facultyData.employeeId,
      subjects: facultyData.subjects ? facultyData.subjects.split(',').map((s: string) => s.trim()) : [],
      attendancePercentage: 100
    };
    setFaculty(prev => [...prev, newFaculty]);
    setShowAddModal(false);
  };

  const handleEditFaculty = (facultyData: any) => {
    setFaculty(prev => prev.map(f => 
      f.id === selectedFaculty.id ? { 
        ...f, 
        ...facultyData,
        subjects: facultyData.subjects ? facultyData.subjects.split(',').map((s: string) => s.trim()) : f.subjects
      } : f
    ));
    setShowEditModal(false);
    setSelectedFaculty(null);
  };

  const handleDeleteFaculty = (faculty: any) => {
    if (window.confirm(`Are you sure you want to delete ${faculty.name}?`)) {
      setFaculty(prev => prev.filter(f => f.id !== faculty.id));
    }
  };

  const handleViewFaculty = (faculty: any) => {
    setSelectedFaculty(faculty);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Faculty Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage faculty records, assignments, and performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Faculty</p>
              <p className="text-3xl font-bold">{faculty.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Professors</p>
              <p className="text-3xl font-bold">{faculty.filter(f => f.designation === 'Professor').length}</p>
            </div>
            <Award className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Associate Professors</p>
              <p className="text-3xl font-bold">{faculty.filter(f => f.designation === 'Associate Professor').length}</p>
            </div>
            <Award className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Assistant Professors</p>
              <p className="text-3xl font-bold">{faculty.filter(f => f.designation === 'Assistant Professor').length}</p>
            </div>
            <Award className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Faculty Table */}
      <DataTable
        data={faculty}
        columns={columns}
        onEdit={(faculty) => {
          setSelectedFaculty({
            ...faculty,
            subjects: faculty.subjects.join(', ')
          });
          setShowEditModal(true);
        }}
        onDelete={handleDeleteFaculty}
        onView={handleViewFaculty}
        searchable={true}
        exportable={true}
      />

      {/* Add Faculty Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_FACULTY}
          onSubmit={handleAddFaculty}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Faculty Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedFaculty && (
          <DynamicForm
            config={FORM_CONFIGS.ADD_FACULTY}
            initialData={selectedFaculty}
            onSubmit={handleEditFaculty}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedFaculty(null);
            }}
          />
        )}
      </Modal>

      {/* View Faculty Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)}>
        {selectedFaculty && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Profile</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Designation</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.designation}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFaculty.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Subjects</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedFaculty.subjects.map((subject: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FacultyManagement;