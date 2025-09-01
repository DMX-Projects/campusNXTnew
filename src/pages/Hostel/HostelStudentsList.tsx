import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, Users, Building, Home, GraduationCap } from 'lucide-react';

// Mock data for students - in real app, this would come from your API
const mockStudents = [
  {
    id: 'STU001',
    name: 'Rahul Kumar',
    rollNo: '2023CS001',
    stream: 'Engineering',
    branch: 'Computer Science',
    year: 2,
    gender: 'Male',
    hostelBlock: 'Block A',
    roomNo: 'A-101',
    bedNo: 'A-101-1',
    joiningDate: '2023-08-15',
    feeStatus: 'Paid',
    phone: '+91 9876543210',
    email: 'rahul.kumar@college.edu',
    guardianName: 'Suresh Kumar',
    guardianPhone: '+91 9876543211',
    address: 'Delhi, India'
  },
  {
    id: 'STU002',
    name: 'Priya Sharma',
    rollNo: '2023EC002',
    stream: 'Engineering',
    branch: 'Electronics',
    year: 1,
    gender: 'Female',
    hostelBlock: 'Block C',
    roomNo: 'C-201',
    bedNo: 'C-201-2',
    joiningDate: '2023-08-10',
    feeStatus: 'Pending',
    phone: '+91 9876543212',
    email: 'priya.sharma@college.edu',
    guardianName: 'Rajesh Sharma',
    guardianPhone: '+91 9876543213',
    address: 'Mumbai, India'
  },
  {
    id: 'STU003',
    name: 'Amit Singh',
    rollNo: '2022ME003',
    stream: 'Engineering',
    branch: 'Mechanical',
    year: 3,
    gender: 'Male',
    hostelBlock: 'Block B',
    roomNo: 'B-305',
    bedNo: 'B-305-1',
    joiningDate: '2022-08-20',
    feeStatus: 'Paid',
    phone: '+91 9876543214',
    email: 'amit.singh@college.edu',
    guardianName: 'Vikram Singh',
    guardianPhone: '+91 9876543215',
    address: 'Pune, India'
  },
  {
    id: 'STU004',
    name: 'Sneha Patel',
    rollNo: '2023CE004',
    stream: 'Engineering',
    branch: 'Civil Engineering',
    year: 1,
    gender: 'Female',
    hostelBlock: 'Block C',
    roomNo: 'C-105',
    bedNo: 'C-105-3',
    joiningDate: '2023-08-12',
    feeStatus: 'Paid',
    phone: '+91 9876543216',
    email: 'sneha.patel@college.edu',
    guardianName: 'Kiran Patel',
    guardianPhone: '+91 9876543217',
    address: 'Ahmedabad, India'
  },
  {
    id: 'STU005',
    name: 'Arjun Reddy',
    rollNo: '2021EE005',
    stream: 'Engineering',
    branch: 'Electrical',
    year: 4,
    gender: 'Male',
    hostelBlock: 'Block A',
    roomNo: 'A-405',
    bedNo: 'A-405-2',
    joiningDate: '2021-08-18',
    feeStatus: 'Paid',
    phone: '+91 9876543218',
    email: 'arjun.reddy@college.edu',
    guardianName: 'Ramesh Reddy',
    guardianPhone: '+91 9876543219',
    address: 'Hyderabad, India'
  }
];

const HostelStudentManagement = () => {
  const [students] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlock, setFilterBlock] = useState('All');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterFeeStatus, setFilterFeeStatus] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get unique values for filters
  const hostelBlocks = [...new Set(students.map(s => s.hostelBlock))];
  const branches = [...new Set(students.map(s => s.branch))];
  const years = [...new Set(students.map(s => s.year))];
  const feeStatuses = [...new Set(students.map(s => s.feeStatus))];

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.roomNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBlock = filterBlock === 'All' || student.hostelBlock === filterBlock;
      const matchesBranch = filterBranch === 'All' || student.branch === filterBranch;
      const matchesYear = filterYear === 'All' || student.year.toString() === filterYear;
      const matchesFeeStatus = filterFeeStatus === 'All' || student.feeStatus === filterFeeStatus;

      return matchesSearch && matchesBlock && matchesBranch && matchesYear && matchesFeeStatus;
    });
  }, [students, searchTerm, filterBlock, filterBranch, filterYear, filterFeeStatus]);

  // Statistics
  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter(s => s.gender === 'Male').length,
    femaleStudents: students.filter(s => s.gender === 'Female').length,
    pendingFees: students.filter(s => s.feeStatus === 'Pending').length
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const exportData = () => {
    const csvContent = [
      ['Roll No', 'Name', 'Branch', 'Year', 'Hostel Block', 'Room No', 'Fee Status', 'Phone', 'Email'],
      ...filteredStudents.map(student => [
        student.rollNo, student.name, student.branch, student.year,
        student.hostelBlock, student.roomNo, student.feeStatus, student.phone, student.email
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hostel_students.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hostel Student Management</h1>
          <p className="text-gray-600">Manage and monitor hostel student data, room allocations, and more</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Male Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.maleStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Female Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.femaleStudents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Fees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingFees}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, roll no, or room..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterBlock}
                onChange={(e) => setFilterBlock(e.target.value)}
              >
                <option value="All">All Blocks</option>
                {hostelBlocks.map(block => (
                  <option key={block} value={block}>{block}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option value="All">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterFeeStatus}
                onChange={(e) => setFilterFeeStatus(e.target.value)}
              >
                <option value="All">All Fee Status</option>
                {feeStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-800">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.branch}</div>
                      <div className="text-sm text-gray-500">Year {student.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Building className="h-4 w-4 mr-2 text-gray-400" />
                        {student.hostelBlock}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Home className="h-4 w-4 mr-2 text-gray-400" />
                        Room {student.roomNo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.feeStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{student.phone}</div>
                      <div className="truncate max-w-xs">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Edit Student"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Student Detail Modal */}
        {showModal && selectedStudent && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Student Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Personal Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs text-gray-500">Name</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.name}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Roll Number</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.rollNo}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Gender</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.gender}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.email}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Phone</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.phone}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Academic Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs text-gray-500">Stream</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.stream}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Branch</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.branch}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Year</dt>
                        <dd className="text-sm text-gray-900">Year {selectedStudent.year}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Joining Date</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.joiningDate}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Hostel Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs text-gray-500">Hostel Block</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.hostelBlock}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Room Number</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.roomNo}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Bed Number</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.bedNo}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Fee Status</dt>
                        <dd>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedStudent.feeStatus === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedStudent.feeStatus}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Guardian Information</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-xs text-gray-500">Guardian Name</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.guardianName}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Guardian Phone</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.guardianPhone}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-gray-500">Address</dt>
                        <dd className="text-sm text-gray-900">{selectedStudent.address}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelStudentManagement;