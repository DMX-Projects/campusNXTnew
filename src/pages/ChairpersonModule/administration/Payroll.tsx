import React, { useState } from 'react';
import { DollarSign, Calculator, Download, Eye, Filter, Search, Calendar, User, CreditCard, TrendingUp, FileText } from 'lucide-react';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
  payDate: string;
  status: 'processed' | 'pending' | 'approved' | 'paid';
  taxDeducted: number;
  bonuses: number;
}

const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('January 2024');

  const payrollRecords: PayrollRecord[] = [
    {
      id: 'PAY001',
      employeeId: 'EMP001',
      employeeName: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      designation: 'Professor',
      basicSalary: 8500,
      allowances: 1200,
      overtime: 300,
      deductions: 850,
      netSalary: 9150,
      payPeriod: 'January 2024',
      payDate: '2024-01-31',
      status: 'paid',
      taxDeducted: 1700,
      bonuses: 500
    },
    {
      id: 'PAY002',
      employeeId: 'EMP002',
      employeeName: 'Prof. Michael Brown',
      department: 'Mathematics',
      designation: 'Associate Professor',
      basicSalary: 7200,
      allowances: 1000,
      overtime: 150,
      deductions: 720,
      netSalary: 7630,
      payPeriod: 'January 2024',
      payDate: '2024-01-31',
      status: 'processed',
      taxDeducted: 1440,
      bonuses: 0
    },
    {
      id: 'PAY003',
      employeeId: 'EMP003',
      employeeName: 'Dr. Emily Davis',
      department: 'Physics',
      designation: 'Assistant Professor',
      basicSalary: 6500,
      allowances: 800,
      overtime: 200,
      deductions: 650,
      netSalary: 6850,
      payPeriod: 'January 2024',
      payDate: '2024-01-31',
      status: 'approved',
      taxDeducted: 1300,
      bonuses: 300
    },
    {
      id: 'PAY004',
      employeeId: 'EMP004',
      employeeName: 'Lisa Martinez',
      department: 'Administration',
      designation: 'Admin Officer',
      basicSalary: 4500,
      allowances: 600,
      overtime: 100,
      deductions: 450,
      netSalary: 4750,
      payPeriod: 'January 2024',
      payDate: '2024-01-31',
      status: 'pending',
      taxDeducted: 900,
      bonuses: 0
    },
    {
      id: 'PAY005',
      employeeId: 'EMP005',
      employeeName: 'David Wilson',
      department: 'Library',
      designation: 'Librarian',
      basicSalary: 3800,
      allowances: 500,
      overtime: 80,
      deductions: 380,
      netSalary: 4000,
      payPeriod: 'January 2024',
      payDate: '2024-01-31',
      status: 'paid',
      taxDeducted: 760,
      bonuses: 200
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netSalary, 0);
  const totalDeductions = payrollRecords.reduce((sum, record) => sum + record.deductions, 0);
  const totalTax = payrollRecords.reduce((sum, record) => sum + record.taxDeducted, 0);
  const paidRecords = payrollRecords.filter(r => r.status === 'paid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payroll Management</h1>
          <p className="text-gray-600">Manage employee salaries, deductions, and payment processing</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Payroll</p>
                <p className="text-2xl font-bold text-green-600">${totalPayroll.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Deductions</p>
                <p className="text-2xl font-bold text-red-600">${totalDeductions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Calculator className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tax Deducted</p>
                <p className="text-2xl font-bold text-blue-600">${totalTax.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Paid Records</p>
                <p className="text-2xl font-bold text-purple-600">{paidRecords}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="January 2024">January 2024</option>
                <option value="December 2023">December 2023</option>
                <option value="November 2023">November 2023</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Administration">Administration</option>
                <option value="Library">Library</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="processed">Processed</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Payroll Records */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                          <div className="text-sm text-gray-500">{record.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${record.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${record.allowances.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">${record.deductions.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${record.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll records found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;