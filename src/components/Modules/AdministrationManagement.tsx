import React, { useState } from 'react';
import { Plus, Users, Building2, DollarSign, Calendar, Download, Eye, Edit, Trash2, Search } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FORM_CONFIGS } from '../../data/formConfigs';

const AdministrationManagement: React.FC = () => {
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'Prof. Emily Davis', department: 'Computer Science', designation: 'Associate Professor', email: 'emily.davis@college.edu', phone: '+1234567800', joiningDate: '2020-08-15', salary: 85000, status: 'Active' },
    { id: 'EMP002', name: 'Dr. Robert Thompson', department: 'Electrical Engineering', designation: 'Professor', email: 'robert.thompson@college.edu', phone: '+1234567801', joiningDate: '2018-07-10', salary: 95000, status: 'Active' },
    { id: 'EMP003', name: 'Prof. Lisa Martinez', department: 'Mechanical Engineering', designation: 'Assistant Professor', email: 'lisa.martinez@college.edu', phone: '+1234567802', joiningDate: '2021-01-20', salary: 75000, status: 'Active' }
  ]);

  const [feeStructures, setFeeStructures] = useState([
    { id: 'FEE001', feeType: 'Tuition', department: 'Computer Science', year: 1, semester: 1, amount: 75000, dueDate: '2025-02-15', lateFeePenalty: 500 },
    { id: 'FEE002', feeType: 'Lab', department: 'Computer Science', year: 1, semester: 1, amount: 15000, dueDate: '2025-02-15', lateFeePenalty: 200 },
    { id: 'FEE003', feeType: 'Library', department: 'Computer Science', year: 1, semester: 1, amount: 5000, dueDate: '2025-02-15', lateFeePenalty: 100 }
  ]);

  const [visitors, setVisitors] = useState([
    { id: 'VIS001', name: 'Mr. John Corporate', purpose: 'Placement Drive Discussion', contactPerson: 'TPO Office', visitDate: '2025-01-15', inTime: '10:30', outTime: '12:00', status: 'Completed' },
    { id: 'VIS002', name: 'Ms. Sarah Consultant', purpose: 'Academic Audit', contactPerson: 'Principal Office', visitDate: '2025-01-16', inTime: '14:00', outTime: '', status: 'In Progress' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showAddVisitorModal, setShowAddVisitorModal] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Campus Overview', icon: Building2 },
    { id: 'employees', name: 'Employee Management', icon: Users },
    { id: 'fees', name: 'Fee Management', icon: DollarSign },
    { id: 'visitors', name: 'Visitor Management', icon: Users },
    { id: 'facilities', name: 'Facility Management', icon: Building2 },
    { id: 'reports', name: 'Reports', icon: Download }
  ];

  const employeeColumns = [
    { key: 'id', label: 'Employee ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'salary', 
      label: 'Salary', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const feeColumns = [
    { key: 'id', label: 'Fee ID', sortable: true },
    { key: 'feeType', label: 'Fee Type', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'year', 
      label: 'Year/Semester', 
      render: (value: number, item: any) => `${value}${value === 1 ? 'st' : value === 2 ? 'nd' : value === 3 ? 'rd' : 'th'} Year - Sem ${item.semester}`
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`
    },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { 
      key: 'lateFeePenalty', 
      label: 'Late Fee', 
      render: (value: number) => `₹${value}`
    }
  ];

  const visitorColumns = [
    { key: 'id', label: 'Visitor ID', sortable: true },
    { key: 'name', label: 'Visitor Name', sortable: true },
    { key: 'purpose', label: 'Purpose', sortable: true },
    { key: 'contactPerson', label: 'Contact Person', sortable: true },
    { key: 'visitDate', label: 'Visit Date', sortable: true },
    { 
      key: 'time', 
      label: 'Time', 
      render: (value: any, item: any) => `${item.inTime} - ${item.outTime || 'In Progress'}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const departmentStats = [
    { department: 'Computer Science', faculty: 28, students: 850, budget: 45 },
    { department: 'Electrical Engineering', faculty: 22, students: 620, budget: 38 },
    { department: 'Mechanical Engineering', faculty: 20, students: 580, budget: 35 },
    { department: 'Civil Engineering', faculty: 18, students: 490, budget: 32 }
  ];

  const budgetAllocation = [
    { category: 'Salaries', allocated: 120, utilized: 115, color: '#3B82F6' },
    { category: 'Infrastructure', allocated: 80, utilized: 65, color: '#10B981' },
    { category: 'Equipment', allocated: 60, utilized: 48, color: '#F59E0B' },
    { category: 'Maintenance', allocated: 40, utilized: 35, color: '#EF4444' },
    { category: 'Others', allocated: 30, utilized: 22, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Administration Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive campus administration and operational management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Campus Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Employees</p>
                      <p className="text-3xl font-bold">{employees.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Faculty</p>
                      <p className="text-3xl font-bold">{employees.filter(e => e.status === 'Active').length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Monthly Payroll</p>
                      <p className="text-3xl font-bold">₹{(employees.reduce((sum, e) => sum + e.salary, 0) / 100000).toFixed(1)}L</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Departments</p>
                      <p className="text-3xl font-bold">4</p>
                    </div>
                    <Building2 className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Department Statistics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="department" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="faculty" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="students" fill="#10B981" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Budget Utilization</h3>
                  <div className="space-y-4">
                    {budgetAllocation.map((budget, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">{budget.category}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            ₹{budget.utilized}L / ₹{budget.allocated}L
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(budget.utilized / budget.allocated) * 100}%`,
                              backgroundColor: budget.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Employee Management</h3>
                <button
                  onClick={() => setShowAddEmployeeModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Employee</span>
                </button>
              </div>
              
              <DataTable
                data={employees}
                columns={employeeColumns}
                onEdit={(employee) => console.log('Edit employee:', employee)}
                onDelete={(employee) => {
                  if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
                    setEmployees(prev => prev.filter(e => e.id !== employee.id));
                  }
                }}
                onView={(employee) => console.log('View employee:', employee)}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fee Structure Management</h3>
                <button
                  onClick={() => setShowAddFeeModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Fee Structure</span>
                </button>
              </div>
              
              <DataTable
                data={feeStructures}
                columns={feeColumns}
                onEdit={(fee) => console.log('Edit fee:', fee)}
                onDelete={(fee) => {
                  if (window.confirm(`Are you sure you want to delete this fee structure?`)) {
                    setFeeStructures(prev => prev.filter(f => f.id !== fee.id));
                  }
                }}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'visitors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Visitor Management</h3>
                <button
                  onClick={() => setShowAddVisitorModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Visitor</span>
                </button>
              </div>
              
              <DataTable
                data={visitors}
                columns={visitorColumns}
                onEdit={(visitor) => console.log('Edit visitor:', visitor)}
                onDelete={(visitor) => {
                  if (window.confirm(`Are you sure you want to delete this visitor record?`)) {
                    setVisitors(prev => prev.filter(v => v.id !== visitor.id));
                  }
                }}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Facility Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { facility: 'Academic Block A', rooms: 25, capacity: 1500, utilization: 85, status: 'Good' },
                  { facility: 'Academic Block B', rooms: 20, capacity: 1200, utilization: 78, status: 'Good' },
                  { facility: 'Laboratory Complex', rooms: 15, capacity: 600, utilization: 92, status: 'Excellent' },
                  { facility: 'Library Building', rooms: 8, capacity: 500, utilization: 68, status: 'Good' },
                  { facility: 'Sports Complex', rooms: 12, capacity: 800, utilization: 45, status: 'Fair' },
                  { facility: 'Auditorium', rooms: 3, capacity: 1000, utilization: 25, status: 'Excellent' }
                ].map((facility, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{facility.facility}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Rooms</span>
                        <span className="font-medium text-gray-900 dark:text-white">{facility.rooms}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                        <span className="font-medium text-gray-900 dark:text-white">{facility.capacity}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Utilization</span>
                          <span className="font-medium text-gray-900 dark:text-white">{facility.utilization}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              facility.utilization >= 90 ? 'bg-red-500' :
                              facility.utilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${facility.utilization}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          facility.status === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          facility.status === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {facility.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showAddFeeModal} onClose={() => setShowAddFeeModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_FEE_STRUCTURE}
          onSubmit={(feeData) => {
            const newFee = {
              ...feeData,
              id: `FEE${String(feeStructures.length + 1).padStart(3, '0')}`
            };
            setFeeStructures(prev => [...prev, newFee]);
            setShowAddFeeModal(false);
          }}
          onCancel={() => setShowAddFeeModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AdministrationManagement;