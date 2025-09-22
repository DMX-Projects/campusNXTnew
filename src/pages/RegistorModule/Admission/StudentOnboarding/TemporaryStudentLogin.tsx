import React, { useState } from 'react';
import { Search, Mail, Eye, EyeOff, Users, UserPlus, Send, Check, X } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  allotmentOrder: string;
  hasLogin: boolean;
  tempUsername?: string;
  tempPassword?: string;
  lastGenerated?: Date;
}

const TemporaryStudentLogin = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      allotmentOrder: 'AO2024001',
      hasLogin: false
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      allotmentOrder: 'AO2024002',
      hasLogin: false
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      allotmentOrder: 'AO2024003',
      hasLogin: true
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      allotmentOrder: 'AO2024004',
      hasLogin: false
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      allotmentOrder: 'AO2024005',
      hasLogin: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentEmails, setSentEmails] = useState<string[]>([]);

  // Filter students without permanent login
  const filteredStudents = students.filter(student =>
    !student.hasLogin &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.allotmentOrder.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const generateTempCredentials = () => {
    if (selectedStudents.length === 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      setStudents(prev =>
        prev.map(student => {
          if (selectedStudents.includes(student.id)) {
            const username = `temp_${student.name.split(' ')[0].toLowerCase()}_${Math.random().toString(36).substr(2, 4)}`;
            const password = Math.random().toString(36).substr(2, 8);

            return {
              ...student,
              tempUsername: username,
              tempPassword: password,
              lastGenerated: new Date()
            };
          }
          return student;
        })
      );

      setIsGenerating(false);
    }, 1500);
  };

  const sendCredentials = async () => {
    if (selectedStudents.length === 0) return;

    setIsSending(true);

    setTimeout(() => {
      setSentEmails(prev => [...prev, ...selectedStudents]);
      setIsSending(false);
      setSelectedStudents([]);
    }, 2000);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const selectAllVisible = () => {
    const visibleIds = filteredStudents.map(s => s.id);
    setSelectedStudents(visibleIds);
  };

  const clearSelection = () => {
    setSelectedStudents([]);
  };

  const togglePasswordVisibility = (studentId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <UserPlus className="w-7 h-7 text-blue-600" />
                Temporary Student Login Management
              </h1>
              {/* <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create and distribute temporary login credentials to newly admitted students
              </p> */}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              {filteredStudents.length} students without permanent login
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or allotment order..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={selectAllVisible}
                className="px-4 py-2 text-blue-600 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearSelection}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={generateTempCredentials}
                disabled={selectedStudents.length === 0 || isGenerating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Generate Credentials ({selectedStudents.length})
                  </>
                )}
              </button>
              <button
                onClick={sendCredentials}
                disabled={
                  selectedStudents.length === 0 ||
                  isSending ||
                  !selectedStudents.some(id => students.find(s => s.id === id)?.tempUsername)
                }
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Credentials
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={selectedStudents.length === filteredStudents.length ? clearSelection : selectAllVisible}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-gray-100">Student Details</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-gray-100">Allotment Order</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-gray-100">Temporary Credentials</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{student.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {student.allotmentOrder}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {student.tempUsername && student.tempPassword ? (
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Username:</span>
                            <span className="ml-2 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {student.tempUsername}
                            </span>
                          </div>
                          <div className="text-sm flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">Password:</span>
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {showPasswords[student.id] ? student.tempPassword : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(student.id)}
                              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                            >
                              {showPasswords[student.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {student.lastGenerated && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Generated: {student.lastGenerated.toLocaleString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">Not generated</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {sentEmails.includes(student.id) ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Sent</span>
                        </div>
                      ) : student.tempUsername ? (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Ready to send</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <X className="w-4 h-4" />
                          <span className="text-sm">Pending</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No students found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search criteria' : 'All students already have permanent logins'}
              </p>
            </div>
          )}
        </div>

        {/* Instructions
        <div className="bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-3">Instructions</h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <p>• Select students who need temporary login credentials</p>
            <p>• Click "Generate Credentials" to create usernames and temporary passwords</p>
            <p>• Review the generated credentials in the table</p>
            <p>• Use "Send Credentials" to email login details with welcome message to selected students</p>
            <p>• Students can use these credentials to access the system until permanent logins are created</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TemporaryStudentLogin;
