import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, BookOpen, Clock, Filter, Download } from 'lucide-react';

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const syllabusData = [
    { subject: 'Data Structures', completed: 78, total: 100 },
    { subject: 'Algorithms', completed: 65, total: 100 },
    { subject: 'Database Systems', completed: 82, total: 100 },
    { subject: 'Computer Networks', completed: 71, total: 100 },
    { subject: 'Software Engineering', completed: 88, total: 100 }
  ];

  const attendanceData = [
    { department: 'Computer Science', year1: 92, year2: 88, year3: 94, year4: 91 },
    { department: 'Electrical Eng.', year1: 89, year2: 91, year3: 87, year4: 93 },
    { department: 'Mechanical Eng.', year1: 91, year2: 89, year3: 92, year4: 88 },
    { department: 'Civil Engineering', year1: 88, year2: 92, year3: 89, year4: 90 }
  ];

  const assignments = [
    { id: 'ASG001', title: 'Binary Search Tree Implementation', subject: 'Data Structures', dueDate: 'Jan 20', submissions: 15, total: 25 },
    { id: 'ASG002', title: 'Sorting Algorithms Comparison', subject: 'Algorithms', dueDate: 'Jan 25', submissions: 8, total: 25 },
    { id: 'ASG003', title: 'Database Design Project', subject: 'Database Systems', dueDate: 'Jan 30', submissions: 22, total: 30 }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'attendance', name: 'Attendance', icon: Users },
    { id: 'timetable', name: 'Time Table', icon: Calendar },
    { id: 'assignments', name: 'Assignments', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Academics Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive academic oversight and management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          </div>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="All">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Syllabus Completion */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Syllabus Completion Status
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={syllabusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="subject" stroke="#6B7280" />
                    <YAxis domain={[0, 100]} stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Bar dataKey="completed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Department Attendance */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Department-wise Attendance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="department" stroke="#6B7280" />
                    <YAxis domain={[80, 100]} stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Bar dataKey="year1" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="year2" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="year3" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="year4" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Current Assignments
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Create New Assignment
                </button>
              </div>
              
              <div className="grid gap-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {assignment.title}
                      </h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                        {assignment.subject}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Submissions</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {assignment.submissions} / {assignment.total}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {Math.round((assignment.submissions / assignment.total) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timetable' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Master Time Table
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Time
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Monday
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Tuesday
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Wednesday
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Thursday
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Friday
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      '9:00-10:00',
                      '10:00-11:00',
                      '11:00-12:00',
                      '12:00-1:00',
                      '1:00-2:00',
                      '2:00-3:00',
                      '3:00-4:00'
                    ].map((time, index) => (
                      <tr key={time}>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                          {time}
                        </td>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                          <td key={day} className="border border-gray-200 dark:border-gray-600 px-4 py-3">
                            {index === 4 ? (
                              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                Lunch Break
                              </div>
                            ) : (
                              <div className="text-xs">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {index === 0 ? 'Data Structures' : 
                                   index === 1 ? 'Algorithms' : 
                                   index === 2 ? 'Database Systems' : 
                                   index === 3 ? 'Computer Networks' : 
                                   index === 5 ? 'Software Engineering' : 
                                   'Lab Session'}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">
                                  {index === 0 ? 'CS-101' : 
                                   index === 1 ? 'CS-102' : 
                                   index === 2 ? 'CS-103' : 
                                   index === 3 ? 'CS-104' : 
                                   index === 5 ? 'CS-105' : 
                                   'Lab-1'}
                                </div>
                                <div className="text-gray-400 dark:text-gray-500">
                                  Prof. {index === 0 ? 'Davis' : 
                                         index === 1 ? 'Brown' : 
                                         index === 2 ? 'Wilson' : 
                                         index === 3 ? 'Johnson' : 
                                         index === 5 ? 'Smith' : 
                                         'Anderson'}
                                </div>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Department-wise Attendance Analysis
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="department" stroke="#6B7280" />
                  <YAxis domain={[80, 100]} stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="year1" fill="#3B82F6" name="1st Year" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="year2" fill="#10B981" name="2nd Year" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="year3" fill="#F59E0B" name="3rd Year" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="year4" fill="#EF4444" name="4th Year" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;