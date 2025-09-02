import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Search, Filter, AlertTriangle, Clock, UserCheck } from 'lucide-react';

interface DetainedStudent {
  id: number;
  rollNo: string;
  name: string;
  branch: string;
  semester: number;
  attendancePercent: number;
  cgpa: number;
  backlogs: number;
  detentionReason: string;
  status: 'pending' | 'cleared' | 'continued_detention';
  detentionDate: string;
}

const DetainedStudentsManager: React.FC = () => {
  const [students, setStudents] = useState<DetainedStudent[]>([
    {
      id: 1,
      rollNo: 'CS21001',
      name: 'Arjun Kumar',
      branch: 'Computer Science',
      semester: 6,
      attendancePercent: 45,
      cgpa: 5.2,
      backlogs: 3,
      detentionReason: 'Low Attendance',
      status: 'pending',
      detentionDate: '2024-01-15'
    },
    {
      id: 2,
      rollNo: 'EC21045',
      name: 'Priya Sharma',
      branch: 'Electronics',
      semester: 4,
      attendancePercent: 68,
      cgpa: 4.8,
      backlogs: 5,
      detentionReason: 'Multiple Backlogs',
      status: 'pending',
      detentionDate: '2024-01-20'
    },
    {
      id: 3,
      rollNo: 'ME21078',
      name: 'Rahul Singh',
      branch: 'Mechanical',
      semester: 8,
      attendancePercent: 55,
      cgpa: 4.9,
      backlogs: 2,
      detentionReason: 'Low CGPA & Attendance',
      status: 'cleared',
      detentionDate: '2023-12-10'
    },
    {
      id: 4,
      rollNo: 'CS21134',
      name: 'Sneha Patel',
      branch: 'Computer Science',
      semester: 2,
      attendancePercent: 40,
      cgpa: 4.5,
      backlogs: 4,
      detentionReason: 'Poor Academic Performance',
      status: 'continued_detention',
      detentionDate: '2024-01-25'
    },
    {
      id: 5,
      rollNo: 'EE21089',
      name: 'Vikram Reddy',
      branch: 'Electrical',
      semester: 6,
      attendancePercent: 52,
      cgpa: 5.1,
      backlogs: 6,
      detentionReason: 'Multiple Backlogs',
      status: 'pending',
      detentionDate: '2024-02-01'
    },
    {
      id: 6,
      rollNo: 'CE21156',
      name: 'Anita Gupta',
      branch: 'Civil',
      semester: 4,
      attendancePercent: 48,
      cgpa: 4.6,
      backlogs: 3,
      detentionReason: 'Low Attendance & CGPA',
      status: 'pending',
      detentionDate: '2024-02-05'
    },
    {
      id: 7,
      rollNo: 'IT21123',
      name: 'Rohan Joshi',
      branch: 'Information Technology',
      semester: 4,
      attendancePercent: 35,
      cgpa: 4.2,
      backlogs: 7,
      detentionReason: 'Critical Academic Status',
      status: 'pending',
      detentionDate: '2024-02-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');

  const handleClearDetention = (id: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status: 'cleared' as const } : student
      )
    );
  };

  const handleContinueDetention = (id: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status: 'continued_detention' as const } : student
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
      'CGPA': student.cgpa,
      'Backlogs': student.backlogs,
      'Detention Reason': student.detentionReason,
      'Status': student.status.replace('_', ' ').toUpperCase(),
      'Detention Date': student.detentionDate
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `detained_students_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.detentionReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesBranch = branchFilter === 'all' || student.branch === branchFilter;
    
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cleared: 'bg-green-100 text-green-800 border-green-200',
      continued_detention: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusLabels = {
      pending: 'PENDING REVIEW',
      cleared: 'CLEARED',
      continued_detention: 'CONTINUED DETENTION'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getReasonBadge = (reason: string) => {
    const reasonClasses = {
      'Low Attendance': 'bg-orange-100 text-orange-800 border-orange-200',
      'Multiple Backlogs': 'bg-purple-100 text-purple-800 border-purple-200',
      'Low CGPA & Attendance': 'bg-red-100 text-red-800 border-red-200',
      'Poor Academic Performance': 'bg-red-100 text-red-800 border-red-200',
      'Critical Academic Status': 'bg-gray-900 text-white border-gray-900'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${reasonClasses[reason as keyof typeof reasonClasses] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {reason}
      </span>
    );
  };

  const stats = {
    total: students.length,
    pending: students.filter(s => s.status === 'pending').length,
    cleared: students.filter(s => s.status === 'cleared').length,
    continued: students.filter(s => s.status === 'continued_detention').length
  };

  const branches = [...new Set(students.map(s => s.branch))];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Detained Students Management
            </h1>
          </div>
          <p className="text-gray-600">
            Monitor and manage students under academic detention due to various performance issues
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-gray-600 text-sm">Total Detained</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-gray-600 text-sm">Pending Review</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.cleared}</div>
                <div className="text-gray-600 text-sm">Cleared</div>
              </div>
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.continued}</div>
                <div className="text-gray-600 text-sm">Continued Detention</div>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
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
                  placeholder="Search by roll no, name, branch, or reason..."
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
                  <option value="pending">Pending Review</option>
                  <option value="cleared">Cleared</option>
                  <option value="continued_detention">Continued Detention</option>
                </select>
              </div>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
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
                    Sem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CGPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Backlogs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
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
                      <span className={`font-medium ${student.attendancePercent < 75 ? 'text-red-600' : 'text-green-600'}`}>
                        {student.attendancePercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-medium ${student.cgpa < 5.0 ? 'text-red-600' : 'text-green-600'}`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-medium ${student.backlogs > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {student.backlogs}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReasonBadge(student.detentionReason)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleClearDetention(student.id)}
                          disabled={student.status !== 'pending'}
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
                            student.status === 'pending'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Clear
                        </button>
                        <button
                          onClick={() => handleContinueDetention(student.id)}
                          disabled={student.status !== 'pending'}
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md transition-colors ${
                            student.status === 'pending'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <XCircle className="w-3 h-3" />
                          Continue
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
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No detained students found</div>
              <div className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden mt-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4 border-red-400">
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
                <div>
                  <span className="text-gray-500">CGPA:</span>
                  <div className={`font-medium ${student.cgpa < 5.0 ? 'text-red-600' : 'text-green-600'}`}>
                    {student.cgpa}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Backlogs:</span>
                  <div className={`font-medium ${student.backlogs > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {student.backlogs}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <div className="font-medium">{new Date(student.detentionDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-gray-500 text-sm">Reason:</span>
                <div className="mt-1">{getReasonBadge(student.detentionReason)}</div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleClearDetention(student.id)}
                  disabled={student.status !== 'pending'}
                  className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    student.status === 'pending'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Clear Detention
                </button>
                <button
                  onClick={() => handleContinueDetention(student.id)}
                  disabled={student.status !== 'pending'}
                  className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    student.status === 'pending'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  Continue Detention
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Showing {filteredStudents.length} of {students.length} detained students</p>
        </div>
      </div>
    </div>
  );
};

export default DetainedStudentsManager;