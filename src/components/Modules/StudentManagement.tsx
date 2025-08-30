import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Eye, Users, GraduationCap } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { FORM_CONFIGS } from '../../data/formConfigs';
import studentsData from '../../data/students.json';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState(studentsData.students);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    section: '',
    feeStatus: ''
  });

  const columns = [
    { key: 'id', label: 'Student ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'year', 
      label: 'Year', 
      sortable: true,
      render: (value: number) => `${value}${value === 1 ? 'st' : value === 2 ? 'nd' : value === 3 ? 'rd' : 'th'} Year`
    },
    { key: 'section', label: 'Section', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'feeStatus', 
      label: 'Fee Status', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'cgpa', 
      label: 'CGPA', 
      sortable: true,
      render: (value: number) => (
        <span className={`font-semibold ${
          value >= 8.5 ? 'text-green-600 dark:text-green-400' :
          value >= 7.0 ? 'text-blue-600 dark:text-blue-400' :
          value >= 6.0 ? 'text-yellow-600 dark:text-yellow-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddStudent = (studentData: any) => {
    const newStudent = {
      ...studentData,
      id: studentData.studentId,
      cgpa: 0,
      attendancePercentage: 0,
      feeStatus: 'Pending'
    };
    setStudents(prev => [...prev, newStudent]);
    setShowAddModal(false);
  };

  const handleEditStudent = (studentData: any) => {
    setStudents(prev => prev.map(student => 
      student.id === selectedStudent.id ? { ...student, ...studentData } : student
    ));
    setShowEditModal(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (student: any) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== student.id));
    }
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const filteredStudents = students.filter(student => {
    return (
      (!filters.department || student.department === filters.department) &&
      (!filters.year || student.year.toString() === filters.year) &&
      (!filters.section || student.section === filters.section) &&
      (!filters.feeStatus || student.feeStatus === filters.feeStatus)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student records, admissions, and academic information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
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
              <p className="text-blue-100">Total Students</p>
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Students</p>
              <p className="text-3xl font-bold">{students.filter(s => s.feeStatus !== 'Overdue').length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Average CGPA</p>
              <p className="text-3xl font-bold">
                {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
              </p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Fee Defaulters</p>
              <p className="text-3xl font-bold">{students.filter(s => s.feeStatus === 'Overdue').length}</p>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          </div>
          <select 
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          <select 
            value={filters.year}
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select 
            value={filters.section}
            onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
          <select 
            value={filters.feeStatus}
            onChange={(e) => setFilters(prev => ({ ...prev, feeStatus: e.target.value }))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        onEdit={(student) => {
          setSelectedStudent(student);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteStudent}
        onView={handleViewStudent}
        searchable={true}
        exportable={true}
      />

      {/* Add Student Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_STUDENT}
          onSubmit={handleAddStudent}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedStudent && (
          <DynamicForm
            config={FORM_CONFIGS.ADD_STUDENT}
            initialData={selectedStudent}
            onSubmit={handleEditStudent}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </Modal>

      {/* View Student Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)}>
        {selectedStudent && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h2>
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
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Student ID</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Year & Section</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedStudent.year}{selectedStudent.year === 1 ? 'st' : selectedStudent.year === 2 ? 'nd' : selectedStudent.year === 3 ? 'rd' : 'th'} Year - Section {selectedStudent.section}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">CGPA</label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.cgpa}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Fee Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStudent.feeStatus === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    selectedStudent.feeStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {selectedStudent.feeStatus}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedStudent(selectedStudent);
                  setShowEditModal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Edit Student
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentManagement;