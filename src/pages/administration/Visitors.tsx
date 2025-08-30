import React, { useState } from 'react';
import { Users, Clock, CheckCircle, XCircle, MapPin, Phone, Calendar, Search, Filter, Plus, Eye, UserCheck } from 'lucide-react';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  email: string;
  purpose: string;
  visitingPerson: string;
  department: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  status: 'checked-in' | 'checked-out' | 'scheduled' | 'cancelled';
  idType: string;
  idNumber: string;
  vehicleNumber?: string;
  accompaniedBy?: number;
  remarks?: string;
}

const Visitors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const visitors: Visitor[] = [
    {
      id: 'VIS001',
      name: 'John Anderson',
      phone: '+1 (555) 123-4567',
      email: 'john.anderson@company.com',
      purpose: 'Business Meeting',
      visitingPerson: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      checkInTime: '09:30',
      checkOutTime: '11:45',
      date: '2024-01-15',
      status: 'checked-out',
      idType: 'Driver License',
      idNumber: 'DL123456789',
      vehicleNumber: 'ABC-1234',
      accompaniedBy: 1,
      remarks: 'Meeting regarding research collaboration'
    },
    {
      id: 'VIS002',
      name: 'Maria Rodriguez',
      phone: '+1 (555) 234-5678',
      email: 'maria.r@email.com',
      purpose: 'Student Interview',
      visitingPerson: 'Prof. Michael Brown',
      department: 'Mathematics',
      checkInTime: '14:15',
      date: '2024-01-15',
      status: 'checked-in',
      idType: 'Passport',
      idNumber: 'P987654321',
      accompaniedBy: 0,
      remarks: 'PhD admission interview'
    },
    {
      id: 'VIS003',
      name: 'David Chen',
      phone: '+1 (555) 345-6789',
      email: 'david.chen@tech.com',
      purpose: 'Guest Lecture',
      visitingPerson: 'Dr. Emily Davis',
      department: 'Physics',
      checkInTime: '10:00',
      checkOutTime: '12:30',
      date: '2024-01-15',
      status: 'checked-out',
      idType: 'National ID',
      idNumber: 'ID456789123',
      accompaniedBy: 0,
      remarks: 'Guest lecture on Quantum Computing'
    },
    {
      id: 'VIS004',
      name: 'Lisa Thompson',
      phone: '+1 (555) 456-7890',
      email: 'lisa.thompson@vendor.com',
      purpose: 'Equipment Delivery',
      visitingPerson: 'Admin Office',
      department: 'Administration',
      checkInTime: '08:45',
      checkOutTime: '09:15',
      date: '2024-01-15',
      status: 'checked-out',
      idType: 'Driver License',
      idNumber: 'DL789123456',
      vehicleNumber: 'DEF-5678',
      accompaniedBy: 2,
      remarks: 'Laboratory equipment delivery'
    },
    {
      id: 'VIS005',
      name: 'Robert Wilson',
      phone: '+1 (555) 567-8901',
      email: 'robert.wilson@parent.com',
      purpose: 'Parent Meeting',
      visitingPerson: 'Student Affairs',
      department: 'Student Affairs',
      checkInTime: '',
      date: '2024-01-16',
      status: 'scheduled',
      idType: 'Driver License',
      idNumber: 'DL321654987',
      accompaniedBy: 1,
      remarks: 'Meeting regarding student performance'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-green-100 text-green-800';
      case 'checked-out': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked-in': return <UserCheck className="w-4 h-4" />;
      case 'checked-out': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.phone.includes(searchTerm) ||
                         visitor.visitingPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || visitor.department === departmentFilter;
    
    // Simple date filtering (in real app, you'd implement proper date logic)
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && visitor.date === '2024-01-15') ||
                       (dateFilter === 'tomorrow' && visitor.date === '2024-01-16');
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  const totalVisitors = visitors.length;
  const checkedInVisitors = visitors.filter(v => v.status === 'checked-in').length;
  const scheduledVisitors = visitors.filter(v => v.status === 'scheduled').length;
  const todayVisitors = visitors.filter(v => v.date === '2024-01-15').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Visitor Management</h1>
          <p className="text-gray-600">Track and manage campus visitors and appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Visitors</p>
                <p className="text-2xl font-bold text-cyan-600">{totalVisitors}</p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-full">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Currently In</p>
                <p className="text-2xl font-bold text-green-600">{checkedInVisitors}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{scheduledVisitors}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Visits</p>
                <p className="text-2xl font-bold text-blue-600">{todayVisitors}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search by name, phone, visiting person, or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="all">All Dates</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Status</option>
                <option value="checked-in">Checked In</option>
                <option value="checked-out">Checked Out</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Administration">Administration</option>
                <option value="Student Affairs">Student Affairs</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Visitor
              </button>
            </div>
          </div>
        </div>

        {/* Visitors List */}
        <div className="space-y-6">
          {filteredVisitors.map((visitor) => (
            <div key={visitor.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {visitor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                        <p className="text-sm text-gray-500">{visitor.purpose}</p>
                        <p className="text-xs text-gray-400">ID: {visitor.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                        {getStatusIcon(visitor.status)}
                        {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1).replace('-', ' ')}
                      </span>
                      {visitor.accompaniedBy && visitor.accompaniedBy > 0 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          +{visitor.accompaniedBy} companion{visitor.accompaniedBy > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{visitor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{visitor.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{visitor.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {visitor.checkInTime} {visitor.checkOutTime && `- ${visitor.checkOutTime}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Visiting</p>
                      <p className="font-medium text-gray-900">{visitor.visitingPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID Document</p>
                      <p className="font-medium text-gray-900">{visitor.idType}: {visitor.idNumber}</p>
                    </div>
                  </div>

                  {visitor.vehicleNumber && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Vehicle Number</p>
                      <p className="font-medium text-gray-900">{visitor.vehicleNumber}</p>
                    </div>
                  )}

                  {visitor.remarks && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Remarks:</strong> {visitor.remarks}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {visitor.status === 'checked-in' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Check Out
                    </button>
                  )}
                  {visitor.status === 'scheduled' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <UserCheck className="w-4 h-4" />
                      Check In
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVisitors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visitors;