import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Filter, Users, Calendar, BookOpen, AlertCircle, Clock, FileText } from 'lucide-react';

// Mock data for demonstration with new fields
const initialInvigilators = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science',
    subject: 'Data Structures',
    date: '2025-09-15',
    session: 'morning',
    examType: 'mid-term',
    status: 'assigned',
    roomNo: 'CS-101',
    branch: 'CSE'
  },
  {
    id: 2,
    name: 'Prof. Priya Sharma',
    department: 'Mathematics',
    subject: 'Calculus',
    date: '2025-09-15',
    session: 'afternoon',
    examType: 'semester',
    status: 'not assigned',
    roomNo: '',
    branch: 'MATH'
  },
  {
    id: 3,
    name: 'Dr. Amit Singh',
    department: 'Physics',
    subject: 'Quantum Physics',
    date: '2025-09-16',
    session: 'morning',
    examType: 'semester',
    status: 'assigned',
    roomNo: 'PH-201',
    branch: 'PHY'
  },
  {
    id: 4,
    name: 'Ms. Sunita Verma',
    department: 'Chemistry',
    subject: 'Organic Chemistry',
    date: '2025-09-16',
    session: 'afternoon',
    examType: 'mid-term',
    status: 'absent',
    roomNo: 'CH-102',
    branch: 'CHEM'
  }
];

const InvigilatorManagement = () => {
  const [invigilators, setInvigilators] = useState(initialInvigilators);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddInvigilatorForm, setShowAddInvigilatorForm] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    name: '',
    subject: '',
    date: '',
    session: '',
    examType: '',
    status: ''
  });

  // Statistics calculation
  const stats = {
    total: invigilators.length,
    present: invigilators.filter(inv => inv.status === 'assigned').length,
    absent: invigilators.filter(inv => inv.status === 'absent').length,
    totalExams: new Set(invigilators.filter(inv => inv.status === 'assigned').map(inv => inv.subject)).size,
    morningExams: invigilators.filter(inv => inv.session === 'morning' && inv.status === 'assigned').length,
    afternoonExams: invigilators.filter(inv => inv.session === 'afternoon' && inv.status === 'assigned').length,
    midTermExams: invigilators.filter(inv => inv.examType === 'mid-term' && inv.status === 'assigned').length,
    semesterExams: invigilators.filter(inv => inv.examType === 'semester' && inv.status === 'assigned').length
  };

  // Filter function
  const filteredInvigilators = invigilators.filter(inv => {
    return (
      (filters.department === '' || inv.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (filters.name === '' || inv.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.subject === '' || inv.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (filters.date === '' || inv.date === filters.date) &&
      (filters.session === '' || inv.session === filters.session) &&
      (filters.examType === '' || inv.examType === filters.examType) &&
      (filters.status === '' || inv.status === filters.status)
    );
  });

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setInvigilators(prev => 
      prev.map(inv => inv.id === editingItem.id ? editingItem : inv)
    );
    setEditingItem(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invigilator?')) {
      setInvigilators(prev => prev.filter(inv => inv.id !== id));
    }
  };

  // Handle add new assignment
  const handleAddAssignment = (newAssignment) => {
    const id = Math.max(...invigilators.map(inv => inv.id)) + 1;
    setInvigilators(prev => [...prev, { ...newAssignment, id }]);
    setShowAddForm(false);
  };

  // Handle add new invigilator
  const handleAddInvigilator = (newInvigilator) => {
    const id = Math.max(...invigilators.map(inv => inv.id)) + 1;
    // Set default values for non-required fields
    const invigilatorWithDefaults = {
      ...newInvigilator,
      id,
      date: newInvigilator.date || '',
      session: newInvigilator.session || '',
      examType: newInvigilator.examType || '',
      status: 'not assigned',
      roomNo: '',
      department: newInvigilator.department || newInvigilator.branch
    };
    setInvigilators(prev => [...prev, invigilatorWithDefaults]);
    setShowAddInvigilatorForm(false);
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Invisgilators</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Present</p>
              <p className="text-2xl font-bold text-green-900">{stats.present}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Absent</p>
              <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Active Exams</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalExams}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Cards for Sessions and Exam Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">Morning Exams</p>
              <p className="text-2xl font-bold text-orange-900">{stats.morningExams}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-600">Afternoon Exams</p>
              <p className="text-2xl font-bold text-indigo-900">{stats.afternoonExams}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-teal-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-600">Mid-Term Exams</p>
              <p className="text-2xl font-bold text-teal-900">{stats.midTermExams}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-pink-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-pink-600">Semester Exams</p>
              <p className="text-2xl font-bold text-pink-900">{stats.semesterExams}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.name}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Search by Subject"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.subject}
            onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
          />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.session}
            onChange={(e) => setFilters(prev => ({ ...prev, session: e.target.value }))}
          >
            <option value="">All Sessions</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.examType}
            onChange={(e) => setFilters(prev => ({ ...prev, examType: e.target.value }))}
          >
            <option value="">All Exam Types</option>
            <option value="mid-term">Mid-Term</option>
            <option value="semester">Semester</option>
            <option value="final">Final</option>
            <option value="practical">Practical</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="assigned">Assigned</option>
            <option value="not assigned">Not Assigned</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Manage Invisgilations</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 flex items-center text-sm font-medium transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add 
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvigilators.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      inv.session === 'morning' ? 'bg-yellow-100 text-yellow-800' : 
                      inv.session === 'afternoon' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {inv.session ? inv.session.charAt(0).toUpperCase() + inv.session.slice(1) : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      inv.examType === 'mid-term' ? 'bg-purple-100 text-purple-800' :
                      inv.examType === 'semester' ? 'bg-indigo-100 text-indigo-800' :
                      inv.examType === 'final' ? 'bg-red-100 text-red-800' :
                      inv.examType === 'practical' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inv.examType ? inv.examType.charAt(0).toUpperCase() + inv.examType.slice(1).replace('-', ' ') : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      inv.status === 'assigned' ? 'bg-green-100 text-green-800' :
                      inv.status === 'not assigned' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.roomNo || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(inv)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Invigilator List Component
  const InvigilatorList = () => {
    const [listFilters, setListFilters] = useState({
      name: '',
      branch: '',
      subject: ''
    });

    const filteredList = invigilators.filter(inv => {
      return (
        (listFilters.name === '' || inv.name.toLowerCase().includes(listFilters.name.toLowerCase())) &&
        (listFilters.branch === '' || inv.branch.toLowerCase().includes(listFilters.branch.toLowerCase())) &&
        (listFilters.subject === '' || inv.subject.toLowerCase().includes(listFilters.subject.toLowerCase()))
      );
    });

    return (
      <div className="space-y-6">
        {/* Filters for Invigilator List */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Filter Invisgilators</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={listFilters.name}
              onChange={(e) => setListFilters(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Branch"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={listFilters.branch}
              onChange={(e) => setListFilters(prev => ({ ...prev, branch: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={listFilters.subject}
              onChange={(e) => setListFilters(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>
        </div>

        {/* Invigilator List Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold"> List Invisgilator</h3>
            <button
              onClick={() => setShowAddInvigilatorForm(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 flex items-center text-sm font-medium transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Invigilator
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredList.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inv.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(inv)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal Component
  const EditModal = () => {
    if (!editingItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                <Edit className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Edit Invisgilator</h3>
                <p className="text-sm text-gray-500">Update invisgilator assignment</p>
              </div>
            </div>
            <button
              onClick={() => setEditingItem(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.name}
                onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.department}
                onChange={(e) => setEditingItem(prev => ({ ...prev, department: e.target.value }))}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.subject}
                onChange={(e) => setEditingItem(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.date}
                onChange={(e) => setEditingItem(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.session}
                onChange={(e) => setEditingItem(prev => ({ ...prev, session: e.target.value }))}
              >
                <option value="">Select Session</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.examType}
                onChange={(e) => setEditingItem(prev => ({ ...prev, examType: e.target.value }))}
              >
                <option value="">Select Exam Type</option>
                <option value="mid-term">Mid-Term</option>
                <option value="semester">Semester</option>
                <option value="final">Final</option>
                <option value="practical">Practical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.status}
                onChange={(e) => setEditingItem(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="assigned">Assigned</option>
                <option value="not assigned">Not Assigned</option>
                <option value="absent">Absent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
              <input
                type="text"
                placeholder="Enter room number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.roomNo}
                onChange={(e) => setEditingItem(prev => ({ ...prev, roomNo: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.branch}
                onChange={(e) => setEditingItem(prev => ({ ...prev, branch: e.target.value }))}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MATH">MATH</option>
                <option value="PHY">PHY</option>
                <option value="CHEM">CHEM</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => setEditingItem(null)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Assignment Modal Component
  const AddFormModal = () => {
    const [newItem, setNewItem] = useState({
      name: '',
      department: '',
      subject: '',
      date: '',
      session: '',
      examType: '',
      status: 'not assigned',
      roomNo: '',
      branch: ''
    });

    if (!showAddForm) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newItem.name && newItem.department && newItem.subject) {
        handleAddAssignment(newItem);
        setNewItem({
          name: '',
          department: '',
          subject: '',
          date: '',
          session: '',
          examType: '',
          status: 'not assigned',
          roomNo: '',
          branch: ''
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Schedule</h3>
                
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.name}
                onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.department}
                onChange={(e) => setNewItem(prev => ({ ...prev, department: e.target.value }))}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter subject"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.subject}
                onChange={(e) => setNewItem(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.date}
                onChange={(e) => setNewItem(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.session}
                onChange={(e) => setNewItem(prev => ({ ...prev, session: e.target.value }))}
              >
                <option value="">Select Session</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.examType}
                onChange={(e) => setNewItem(prev => ({ ...prev, examType: e.target.value }))}
              >
                <option value="">Select Exam Type</option>
                <option value="mid-term">Mid-Term</option>
                <option value="semester">Semester</option>
                <option value="final">Final</option>
                <option value="practical">Practical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.status}
                onChange={(e) => setNewItem(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="not assigned">Not Assigned</option>
                <option value="assigned">Assigned</option>
                <option value="absent">Absent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
              <input
                type="text"
                placeholder="Enter room number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.roomNo}
                onChange={(e) => setNewItem(prev => ({ ...prev, roomNo: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newItem.branch}
                onChange={(e) => setNewItem(prev => ({ ...prev, branch: e.target.value }))}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MATH">MATH</option>
                <option value="PHY">PHY</option>
                <option value="CHEM">CHEM</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Add Invigilator Modal Component (Simple form with only required fields)
  const AddInvigilatorModal = () => {
    const [newInvigilator, setNewInvigilator] = useState({
      name: '',
      branch: '',
      subject: ''
    });

    if (!showAddInvigilatorForm) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newInvigilator.name && newInvigilator.branch && newInvigilator.subject) {
        handleAddInvigilator(newInvigilator);
        setNewInvigilator({
          name: '',
          branch: '',
          subject: ''
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-0 w-full max-w-md mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Invisgilator</h3>
                <p className="text-sm text-gray-500">Create new invigilator profile</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddInvigilatorForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newInvigilator.name}
                onChange={(e) => setNewInvigilator(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newInvigilator.branch}
                onChange={(e) => setNewInvigilator(prev => ({ ...prev, branch: e.target.value }))}
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MATH">MATH</option>
                <option value="PHY">PHY</option>
                <option value="CHEM">CHEM</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter subject expertise"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newInvigilator.subject}
                onChange={(e) => setNewInvigilator(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddInvigilatorForm(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invisgilator Management System</h1>
              
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Invisgilations
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
               Invisgilators
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? <Dashboard /> : <InvigilatorList />}
      </div>

      {/* Modals */}
      <EditModal />
      <AddFormModal />
      <AddInvigilatorModal />
    </div>
  );
};

export default InvigilatorManagement;