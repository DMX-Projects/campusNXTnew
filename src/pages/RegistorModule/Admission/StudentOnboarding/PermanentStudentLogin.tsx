import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Users, AlertCircle, CheckCircle, Loader2, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  temporaryLogin: string;
  department: string;
  year: string;
  course: string;
  status: 'temporary' | 'permanent' | 'processing';
  enrollmentDate: string;
}

const PermanentStudentLoginPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@university.edu',
      temporaryLogin: 'TEMP2024001',
      department: 'Computer Science',
      year: '2024',
      course: 'B.Tech CSE',
      status: 'temporary',
      enrollmentDate: '2024-08-15'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.johnson@university.edu',
      temporaryLogin: 'TEMP2024002',
      department: 'Electrical Engineering',
      year: '2024',
      course: 'B.Tech EEE',
      status: 'temporary',
      enrollmentDate: '2024-08-16'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@university.edu',
      temporaryLogin: 'TEMP2024003',
      department: 'Mechanical Engineering',
      year: '2024',
      course: 'B.Tech ME',
      status: 'processing',
      enrollmentDate: '2024-08-17'
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah.davis@university.edu',
      temporaryLogin: 'TEMP2024004',
      department: 'Information Technology',
      year: '2024',
      course: 'B.Tech IT',
      status: 'permanent',
      enrollmentDate: '2024-08-14'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.temporaryLogin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const temporaryStudents = filteredStudents.filter(student => student.status === 'temporary');

  const generatePermanentID = (student: Student) => {
    return `${student.year}-${student.department.replace(/\s+/g, '').substring(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  };

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === temporaryStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(temporaryStudents.map(student => student.id));
    }
  };

  const activatePermanentIDs = async () => {
    if (selectedStudents.length === 0) {
      setNotification({type: 'error', message: 'Please select at least one student to activate.'});
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStudents(prev => prev.map(student => {
      if (selectedStudents.includes(student.id)) {
        return {
          ...student,
          status: 'permanent' as const,
          permanentID: generatePermanentID(student)
        };
      }
      return student;
    }));

    setSelectedStudents([]);
    setLoading(false);
    setNotification({
      type: 'success', 
      message: `Successfully activated permanent IDs for ${selectedStudents.length} student(s). Students have been notified via email.`
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'temporary':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Temporary</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Processing</span>;
      case 'permanent':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Permanent</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Permanent Student Login Activation</h1>
          </div>
         
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700' 
              : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Temporary Logins</p>
                <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
                  {students.filter(s => s.status === 'temporary').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {students.filter(s => s.status === 'processing').length}
                </p>
              </div>
              <Loader2 className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Permanent IDs</p>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  {students.filter(s => s.status === 'permanent').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Search and Actions */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  disabled={temporaryStudents.length === 0}
                >
                  {selectedStudents.length === temporaryStudents.length ? 'Deselect All' : 'Select All'}
                </button>
                
                <button
                  onClick={activatePermanentIDs}
                  disabled={selectedStudents.length === 0 || loading}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Activate Permanent IDs ({selectedStudents.length})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={temporaryStudents.length > 0 && selectedStudents.length === temporaryStudents.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Temporary Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Course Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelection(student.id)}
                        disabled={student.status !== 'temporary'}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {student.temporaryLogin}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{student.course}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{student.department}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Year: {student.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No students found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'No students match your current filters.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermanentStudentLoginPage;
