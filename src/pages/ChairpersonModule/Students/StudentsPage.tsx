import React, { useState } from 'react';
import { Plus, Users, GraduationCap, TrendingUp, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockStudents, Student } from '../../data/mockData';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const studentFormConfig = {
    title: 'Student Information',
    fields: [
      { name: 'firstName', type: 'text', label: 'First Name', required: true },
      { name: 'lastName', type: 'text', label: 'Last Name', required: true },
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'phone', type: 'tel', label: 'Phone', required: true },
      { name: 'department', type: 'select', label: 'Department', required: true, options: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] },
      { name: 'year', type: 'select', label: 'Year', required: true, options: [1, 2, 3, 4] },
      { name: 'section', type: 'select', label: 'Section', required: true, options: ['A', 'B', 'C'] },
      { name: 'rollNumber', type: 'text', label: 'Roll Number', required: true },
      { name: 'admissionDate', type: 'date', label: 'Admission Date', required: true },
      { name: 'feeStatus', type: 'select', label: 'Fee Status', required: true, options: ['Paid', 'Pending', 'Overdue'] },
      { name: 'cgpa', type: 'number', label: 'CGPA', min: 0, max: 10 },
    ]
  };

  const columns = [
    { key: 'rollNumber', label: 'Roll Number', sortable: true },
    { 
      key: 'name', 
      label: 'Name', 
      sortable: true,
      render: (value: any, row: Student) => `${row.firstName} ${row.lastName}`
    },
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
    const newStudent: Student = {
      ...studentData,
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
    };
    setStudents(prev => [...prev, newStudent]);
    setShowAddModal(false);
  };

  const handleEditStudent = (studentData: any) => {
    if (selectedStudent) {
      setStudents(prev => prev.map(student => 
        student.id === selectedStudent.id ? { ...student, ...studentData } : student
      ));
      setShowEditModal(false);
      setSelectedStudent(null);
    }
  };

  const handleDeleteStudent = (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      setStudents(prev => prev.filter(s => s.id !== student.id));
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const stats = [
    {
      title: 'Total Students',
      value: students.length.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Students',
      value: students.filter(s => s.feeStatus !== 'Overdue').length.toString(),
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Average CGPA',
      value: (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1),
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+0.2'
    },
    {
      title: 'Fee Defaulters',
      value: students.filter(s => s.feeStatus === 'Overdue').length.toString(),
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-3'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student records and academic information
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-xs">{stat.change}</p>
                </div>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Students Table */}
      <DataTable
        data={students}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteStudent}
        searchable={true}
        exportable={true}
      />

      {/* Add Student Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Student"
        size="lg"
      >
        <Form
          config={studentFormConfig}
          onSubmit={handleAddStudent}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Student Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Student"
        size="lg"
      >
        {selectedStudent && (
          <Form
            config={studentFormConfig}
            initialData={selectedStudent}
            onSubmit={handleEditStudent}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default StudentsPage;