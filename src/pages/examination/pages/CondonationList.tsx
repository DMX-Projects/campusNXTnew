import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Search, Filter } from 'lucide-react';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  branch: string;
  semester: number;
  attendancePercent: number;
  status: 'pending' | 'approved' | 'rejected';
}

const CondonationManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      rollNo: 'CS21001',
      name: 'Arjun Kumar',
      branch: 'Computer Science',
      semester: 6,
      attendancePercent: 68,
      status: 'pending'
    },
    {
      id: 2,
      rollNo: 'EC21045',
      name: 'Priya Sharma',
      branch: 'Electronics',
      semester: 4,
      attendancePercent: 72,
      status: 'pending'
    },
    {
      id: 3,
      rollNo: 'ME21078',
      name: 'Rahul Singh',
      branch: 'Mechanical',
      semester: 8,
      attendancePercent: 65,
      status: 'approved'
    },
    {
      id: 4,
      rollNo: 'CS21134',
      name: 'Sneha Patel',
      branch: 'Computer Science',
      semester: 2,
      attendancePercent: 70,
      status: 'rejected'
    },
    {
      id: 5,
      rollNo: 'EE21089',
      name: 'Vikram Reddy',
      branch: 'Electrical',
      semester: 6,
      attendancePercent: 69,
      status: 'pending'
    },
    {
      id: 6,
      rollNo: 'CE21156',
      name: 'Anita Gupta',
      branch: 'Civil',
      semester: 4,
      attendancePercent: 66,
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleApprove = (id: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status: 'approved' as const } : student
      )
    );
  };

  const handleReject = (id: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status: 'rejected' as const } : student
      )
    );
  };

  const generateReport = () => {
    const reportData = students.map(student => ({
      'Roll No': student.rollNo,
      'Name': student.name,
      'Branch': student.branch,
      'Semester': student.semester,
      'Attendance %': student.attendancePercent,
      'Status': student.status.toUpperCase()
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `condonation_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const stats = {
    total: students.length,
    pending: students.filter(s => s.status === 'pending').length,
    approved: students.filter(s => s.status === 'approved').length,
    rejected: students.filter(s => s.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Condonation Management
          </h1>
          <p className="text-gray-600">
            Manage student attendance condonation requests and generate reports
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Students</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-gray-600 text-sm">Approved</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-gray-600 text-sm">Rejected</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by roll no, name, or branch..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateReport}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className={`${student.attendancePercent < 75 ? 'text-red-600' : 'text-green-600'} font-medium`}>
                          {student.attendancePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(student.id)}
                          disabled={student.status !== 'pending'}
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
                            student.status === 'pending'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(student.id)}
                          disabled={student.status !== 'pending'}
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
                            student.status === 'pending'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <XCircle className="w-3 h-3" />
                          Reject
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
              <div className="text-gray-500 text-lg">No students found</div>
              <div className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Mobile Card View (hidden on larger screens) */}
        <div className="md:hidden mt-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.rollNo}</p>
                </div>
                {getStatusBadge(student.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Branch:</span>
                  <div className="font-medium">{student.branch}</div>
                </div>
                <div>
                  <span className="text-gray-500">Semester:</span>
                  <div className="font-medium">{student.semester}</div>
                </div>
                <div>
                  <span className="text-gray-500">Attendance:</span>
                  <div className={`font-medium ${student.attendancePercent < 75 ? 'text-red-600' : 'text-green-600'}`}>
                    {student.attendancePercent}%
                  </div>
                </div>
              </div>

              {student.status === 'pending' && (
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleApprove(student.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(student.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Showing {filteredStudents.length} of {students.length} students</p>
        </div>
      </div>
    </div>
  );
};

export default CondonationManager;