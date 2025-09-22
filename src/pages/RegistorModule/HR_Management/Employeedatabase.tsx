
import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Moon,
  Sun,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  Download,
  Edit,
  X,
  ChevronDown
} from 'lucide-react';

import { useTheme } from '../../../contexts/ThemeContext'; // Import the theme hook

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: string;
  location: string;
  joinDate: string;
  avatar: string;
  salary: string;
  manager: string;
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', phone: '+1 (555) 123-4567', department: 'Engineering', designation: 'Senior Software Engineer', status: 'Active', location: 'New York', joinDate: '2022-03-15', avatar: 'SJ', salary: '₹95,000', manager: 'John Smith' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@company.com', phone: '+1 (555) 234-5678', department: 'Marketing', designation: 'Marketing Manager', status: 'Active', location: 'San Francisco', joinDate: '2021-08-20', avatar: 'MC', salary: '₹78,000', manager: 'Lisa Wong' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', phone: '+1 (555) 345-6789', department: 'HR', designation: 'HR Specialist', status: 'Active', location: 'Chicago', joinDate: '2023-01-10', avatar: 'ER', salary: '₹65,000', manager: 'David Kim' },
  { id: 4, name: 'James Wilson', email: 'james.wilson@company.com', phone: '+1 (555) 456-7890', department: 'Finance', designation: 'Financial Analyst', status: 'On Leave', location: 'Boston', joinDate: '2020-11-05', avatar: 'JW', salary: '₹72,000', manager: 'Sarah Brown' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', phone: '+1 (555) 567-8901', department: 'Sales', designation: 'Sales Representative', status: 'Active', location: 'Miami', joinDate: '2022-07-12', avatar: 'LA', salary: '₹58,000', manager: 'Tom Davis' },
];

const departments = ['Engineering', 'Marketing', 'HR', 'Finance', 'Sales'];
const statuses = ['Active', 'On Leave', 'Inactive'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'On Leave': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const EmployeeDatabase: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  // Employee Filter
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchTerm, selectedDepartment, selectedStatus, employees]);

  // EXPORT CSV
  const handleExportData = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Department', 'Designation', 'Status', 'Location', 'Join Date', 'Salary', 'Manager',
    ];
    const rows = filteredEmployees.map(emp =>
      [emp.name, emp.email, emp.phone, emp.department, emp.designation, emp.status, emp.location, emp.joinDate, emp.salary, emp.manager].join(',')
    );
    const csvContent = [
      headers.join(','), ...rows
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'employees.csv';
    a.click();
  };

  // ADD EMPLOYEE
  const handleAddEmployee = (employee: Omit<Employee, 'id' | 'avatar'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: employees.length ? employees[employees.length - 1].id + 1 : 1,
      avatar: employee.name.split(' ').map(s => s[0]).join(''),
    };
    setEmployees(e => [...e, newEmployee]);
    setShowAddModal(false);
  };

  // EDIT EMPLOYEE
  const handleEditEmployee = (data: Employee) => {
    setEmployees(e => e.map(emp => emp.id === data.id ? data : emp));
    setShowEditModal(false);
  };

  // OPEN EDIT FORM
  const openEditForm = (employee: Employee) => {
    setEditEmployee(employee);
    setShowEditModal(true);
  };

  const handleDownloadEmployeeAsCSV = (employee: Employee) => {
    const headers = [
      'Name', 'Email', 'Phone', 'Department', 'Designation', 'Status', 'Location', 'Join Date', 'Salary', 'Manager',
    ];
    const row = [
      employee.name, employee.email, employee.phone, employee.department,
      employee.designation, employee.status, employee.location,
      employee.joinDate, employee.salary, employee.manager,
    ].map(val => `"₹{val.replace(/"/g, '""')}"`); // Proper CSV escaping

    const csvContent = [
      headers.join(','),
      row.join(',')
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `₹{employee.name.replace(/\s+/g, '_')}_employee.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Employee Card component
  const EmployeeCard = ({ employee }: { employee: Employee }) => (
    <div className={`₹{isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ₹{isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
            {employee.avatar}
          </div>
          <div>
            <h3 className={`font-semibold ₹{isDark ? 'text-white' : 'text-gray-900'}`}>{employee.name}</h3>
            <p className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.designation}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ₹{getStatusColor(employee.status)}`}>
          {employee.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <Mail className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.department}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.location}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setSelectedEmployee(employee)}
          className={`px-3 py-1 rounded text-sm font-medium ₹{isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'} transition-colors duration-200`}
        >
          View Details
        </button>
        <div className="flex space-x-2">
          <button onClick={() => openEditForm(employee)} className={`p-1 rounded ₹{isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDownloadEmployeeAsCSV(employee)}
            className="p-1 rounded hover:bg-gray-100 text-gray-500"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Employee detail modal
  const EmployeeModal = ({ employee, onClose }: { employee: Employee; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`₹{isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ₹{isDark ? 'text-white' : 'text-gray-900'}`}>Employee Details</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className={`w-5 h-5 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ₹{isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                {employee.avatar}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ₹{isDark ? 'text-white' : 'text-gray-900'}`}>{employee.name}</h3>
                <p className={`₹{isDark ? 'text-gray-300' : 'text-gray-600'}`}>{employee.designation}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ₹{getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`w-5 h-5 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-5 h-5 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employee.location}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className={`font-semibold mb-2 ₹{isDark ? 'text-white' : 'text-gray-900'}`}>Work Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Briefcase className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>{employee.department}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>Joined: {employee.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className={`w-4 h-4 ₹{isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ₹{isDark ? 'text-gray-300' : 'text-gray-700'}`}>Manager: {employee.manager}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ₹{isDark ? 'text-white' : 'text-gray-900'}`}>Salary Information</h4>
              <p className={`text-lg font-bold ₹{isDark ? 'text-green-400' : 'text-green-600'}`}>{employee.salary}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          {/* <button
            onClick={() => openEditForm(employee)}
            className={`px-4 py-2 rounded font-medium ₹{isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200`}
          >
            Edit Employee
          </button> */}
          <button
            onClick={() => handleDownloadEmployeeAsCSV(employee)}
            className={`px-4 py-2 rounded font-medium ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );

  // Add Employee Modal
  const AddEmployeeModal = ({ onAdd, onClose }: { onAdd: (employee: Omit<Employee, 'id' | 'avatar'>) => void; onClose: () => void }) => {
    const [form, setForm] = useState<Omit<Employee, 'id' | 'avatar'>>({
      name: '',
      email: '',
      phone: '',
      department: departments[0],
      designation: '',
      status: statuses[0],
      location: '',
      joinDate: '',
      salary: '',
      manager: '',
    });
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-full max-w-lg`}>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Add Employee</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              onAdd(form);
            }}
            className="space-y-3"
          >
            <input className="w-full p-2 rounded border" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <select className="w-full p-2 rounded border" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
            <input className="w-full p-2 rounded border" placeholder="Designation" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} required />
            <select className="w-full p-2 rounded border" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <input className="w-full p-2 rounded border" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <input className="w-full p-2 rounded border" type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Manager" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} required />
            <div className="flex justify-end space-x-3 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit Employee Modal
  const EditEmployeeModal = ({ employee, onEdit, onClose }: { employee: Employee; onEdit: (employee: Employee) => void; onClose: () => void }) => {
    const [form, setForm] = useState<Employee>(employee);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-full max-w-lg`}>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Edit Employee</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              onEdit(form);
            }}
            className="space-y-3"
          >
            <input className="w-full p-2 rounded border" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <select className="w-full p-2 rounded border" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
            <input className="w-full p-2 rounded border" placeholder="Designation" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} required />
            <select className="w-full p-2 rounded border" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <input className="w-full p-2 rounded border" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <input className="w-full p-2 rounded border" type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} required />
            <input className="w-full p-2 rounded border" placeholder="Manager" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} required />
            <div className="flex justify-end space-x-3 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Employee Database</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage and track all employee information
              </p>
            </div>
            <div className="flex items-center space-x-3">
           

              {/* Add Employee Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className={`px-4 py-2 rounded-lg font-medium ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200 flex items-center space-x-2`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Employee</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200 flex items-center space-x-2`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 mb-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="all">All Departments</option>
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`w-full p-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 flex items-end">
                <button
                  onClick={() => handleExportData()}
                  className={`px-4 py-2 rounded font-medium ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200 flex items-center space-x-2`}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
        {filteredEmployees.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No employees found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit/Detail Modals */}
      {showAddModal && <AddEmployeeModal onAdd={handleAddEmployee} onClose={() => setShowAddModal(false)} />}
      {showEditModal && editEmployee && <EditEmployeeModal employee={editEmployee} onEdit={handleEditEmployee} onClose={() => setShowEditModal(false)} />}
      {selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};

export default EmployeeDatabase;
