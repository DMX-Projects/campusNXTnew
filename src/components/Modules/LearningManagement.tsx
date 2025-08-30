import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Users, Award, MessageCircle, 
         FileText, Code, MapPin, CreditCard, Download, Bell, 
         Search, Filter, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const LearningManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BookOpen },
    { id: 'timetable', name: 'Time Table', icon: Calendar },
    { id: 'attendance', name: 'Attendance', icon: CheckCircle },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'results', name: 'Results', icon: Award },
    { id: 'library', name: 'Library', icon: BookOpen },
    { id: 'placements', name: 'Placements', icon: Users },
    { id: 'tests', name: 'Online Tests', icon: Code },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'mentor', name: 'Mentor Chat', icon: MessageCircle }
  ];

  const todaySchedule = [
    { time: '9:00-10:00', subject: 'Data Structures', faculty: 'Prof. Emily Davis', room: 'CS-101', type: 'Theory' },
    { time: '10:00-11:00', subject: 'Algorithms', faculty: 'Prof. Michael Brown', room: 'CS-102', type: 'Theory' },
    { time: '11:00-12:00', subject: 'Database Lab', faculty: 'Prof. Sarah Wilson', room: 'CS-Lab1', type: 'Lab' },
    { time: '2:00-3:00', subject: 'Software Engineering', faculty: 'Prof. David Johnson', room: 'CS-103', type: 'Theory' },
    { time: '3:00-4:00', subject: 'Computer Networks', faculty: 'Prof. Lisa Anderson', room: 'CS-104', type: 'Theory' }
  ];

  const assignments = [
    { 
      id: 'ASG001', 
      title: 'Binary Search Tree Implementation', 
      subject: 'Data Structures', 
      dueDate: '2025-01-20', 
      status: 'Pending',
      priority: 'High',
      description: 'Implement BST with insert, delete, and search operations'
    },
    { 
      id: 'ASG002', 
      title: 'Database Design Project', 
      subject: 'Database Systems', 
      dueDate: '2025-01-25', 
      status: 'In Progress',
      priority: 'Medium',
      description: 'Design a complete database schema for library management'
    },
    { 
      id: 'ASG003', 
      title: 'Network Protocol Analysis', 
      subject: 'Computer Networks', 
      dueDate: '2025-01-30', 
      status: 'Not Started',
      priority: 'Low',
      description: 'Analyze TCP/IP protocol stack and create presentation'
    }
  ];

  const attendanceData = [
    { subject: 'Data Structures', present: 28, total: 30, percentage: 93.3 },
    { subject: 'Algorithms', present: 26, total: 30, percentage: 86.7 },
    { subject: 'Database Systems', present: 29, total: 30, percentage: 96.7 },
    { subject: 'Computer Networks', present: 25, total: 30, percentage: 83.3 },
    { subject: 'Software Engineering', present: 27, total: 30, percentage: 90.0 }
  ];

  const recentResults = [
    { subject: 'Data Structures', examType: 'Mid-Sem', marks: 88, maxMarks: 100, grade: 'A', date: '2024-12-15' },
    { subject: 'Algorithms', examType: 'Internal', marks: 92, maxMarks: 100, grade: 'A+', date: '2024-12-10' },
    { subject: 'Database Systems', examType: 'Assignment', marks: 85, maxMarks: 100, grade: 'A', date: '2024-12-08' },
    { subject: 'Computer Networks', examType: 'Quiz', marks: 78, maxMarks: 100, grade: 'B+', date: '2024-12-05' }
  ];

  const libraryBooks = [
    { title: 'Introduction to Algorithms', author: 'Cormen', dueDate: '2025-01-25', status: 'Issued' },
    { title: 'Clean Code', author: 'Robert Martin', dueDate: '2025-01-22', status: 'Reserved' },
    { title: 'Design Patterns', author: 'Gang of Four', dueDate: '', status: 'Available' }
  ];

  const placementUpdates = [
    { company: 'TechCorp Solutions', position: 'Software Engineer', package: '₹8-12L', deadline: '2025-01-20', status: 'Open' },
    { company: 'Innovation Labs', position: 'Full Stack Developer', package: '₹7-10L', deadline: '2025-01-25', status: 'Applied' },
    { company: 'DataFlow Systems', position: 'Data Analyst', package: '₹6-9L', deadline: '2025-01-30', status: 'Eligible' }
  ];

  const onlineTests = [
    { title: 'Data Structures Quiz', subject: 'Data Structures', duration: '60 mins', questions: 30, deadline: '2025-01-18', status: 'Available' },
    { title: 'Algorithm Analysis Test', subject: 'Algorithms', duration: '90 mins', questions: 40, deadline: '2025-01-22', status: 'Completed' },
    { title: 'Database Concepts', subject: 'Database Systems', duration: '45 mins', questions: 25, deadline: '2025-01-28', status: 'Upcoming' }
  ];

  const projects = [
    { 
      title: 'E-Commerce Website', 
      subject: 'Software Engineering', 
      team: ['Alex Wilson', 'Emma Johnson', 'Michael Chen'], 
      progress: 75, 
      deadline: '2025-02-15',
      status: 'In Progress'
    },
    { 
      title: 'Machine Learning Model', 
      subject: 'AI/ML', 
      team: ['Alex Wilson', 'Sophia Rodriguez'], 
      progress: 45, 
      deadline: '2025-02-28',
      status: 'In Progress'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Your comprehensive academic portal and learning hub
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Quick Actions
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap gap-2 px-6 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Overall Attendance</p>
                      <p className="text-3xl font-bold">92%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Current CGPA</p>
                      <p className="text-3xl font-bold">8.5</p>
                    </div>
                    <Award className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Pending Tasks</p>
                      <p className="text-3xl font-bold">5</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Upcoming Exams</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.subject}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.faculty} • {item.room}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">{item.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'Theory' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Submit Assignment', icon: FileText, color: 'bg-blue-500', count: '3 pending' },
                  { name: 'Take Online Test', icon: Code, color: 'bg-green-500', count: '2 available' },
                  { name: 'Check Results', icon: Award, color: 'bg-purple-500', count: '1 new' },
                  { name: 'Library Books', icon: BookOpen, color: 'bg-orange-500', count: '2 issued' }
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button key={index} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-left">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{action.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{action.count}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Class Time Table</h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Monday</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Tuesday</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Wednesday</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Thursday</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Friday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { time: '9:00-10:00', classes: ['Data Structures\nProf. Davis\nCS-101', 'Algorithms\nProf. Brown\nCS-102', 'Database Lab\nProf. Wilson\nLab-1', 'Networks\nProf. Johnson\nCS-104', 'Software Eng\nProf. Anderson\nCS-105'] },
                        { time: '10:00-11:00', classes: ['Algorithms\nProf. Brown\nCS-102', 'Database Systems\nProf. Wilson\nCS-103', 'Data Structures\nProf. Davis\nCS-101', 'Software Eng\nProf. Anderson\nCS-105', 'Networks Lab\nProf. Johnson\nLab-2'] },
                        { time: '11:00-12:00', classes: ['Database Lab\nProf. Wilson\nLab-1', 'Networks\nProf. Johnson\nCS-104', 'Software Eng\nProf. Anderson\nCS-105', 'Algorithms Lab\nProf. Brown\nLab-3', 'Data Structures\nProf. Davis\nCS-101'] },
                        { time: '12:00-1:00', classes: ['Break', 'Break', 'Break', 'Break', 'Break'] },
                        { time: '2:00-3:00', classes: ['Software Eng\nProf. Anderson\nCS-105', 'Data Structures\nProf. Davis\nCS-101', 'Networks\nProf. Johnson\nCS-104', 'Database Systems\nProf. Wilson\nCS-103', 'Algorithms\nProf. Brown\nCS-102'] },
                        { time: '3:00-4:00', classes: ['Networks\nProf. Johnson\nCS-104', 'Software Lab\nProf. Anderson\nLab-4', 'Algorithms\nProf. Brown\nCS-102', 'Data Structures Lab\nProf. Davis\nLab-1', 'Database Systems\nProf. Wilson\nCS-103'] }
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.time}</td>
                          {row.classes.map((classInfo, classIndex) => (
                            <td key={classIndex} className="px-6 py-4">
                              {classInfo === 'Break' ? (
                                <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
                                  Lunch Break
                                </div>
                              ) : (
                                <div className="text-xs">
                                  {classInfo.split('\n').map((line, lineIndex) => (
                                    <div key={lineIndex} className={
                                      lineIndex === 0 ? 'font-semibold text-gray-900 dark:text-white' :
                                      lineIndex === 1 ? 'text-gray-600 dark:text-gray-400' :
                                      'text-gray-500 dark:text-gray-500'
                                    }>
                                      {line}
                                    </div>
                                  ))}
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
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Attendance Record</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Current Semester</option>
                    <option>Previous Semester</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {attendanceData.map((subject, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.percentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        subject.percentage >= 75 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {subject.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Present: {subject.present} days</span>
                      <span>Total: {subject.total} days</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          subject.percentage >= 90 ? 'bg-green-500' :
                          subject.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Assignments</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search assignments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900 dark:text-white">{assignment.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            assignment.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            assignment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {assignment.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{assignment.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">{assignment.subject}</span>
                          <span className="text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          assignment.status === 'Pending' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          assignment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {assignment.status}
                        </span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Academic Results</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Current Semester</option>
                    <option>Previous Semester</option>
                    <option>All Semesters</option>
                  </select>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Download Report
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {recentResults.map((result, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{result.subject}</h4>
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                            {result.examType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date: {result.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {result.marks}/{result.maxMarks}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Marks</p>
                          </div>
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                            result.grade.startsWith('A') ? 'bg-green-500' :
                            result.grade.startsWith('B') ? 'bg-blue-500' :
                            result.grade.startsWith('C') ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {result.grade}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Library Access</h3>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Search Books
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Books */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">My Books</h4>
                  <div className="space-y-3">
                    {libraryBooks.map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{book.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                          {book.dueDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">Due: {book.dueDate}</p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.status === 'Issued' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          book.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {book.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Library Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Library Statistics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Books Issued</span>
                      <span className="font-bold text-gray-900 dark:text-white">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Books Reserved</span>
                      <span className="font-bold text-gray-900 dark:text-white">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Overdue Books</span>
                      <span className="font-bold text-red-600 dark:text-red-400">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Fine Amount</span>
                      <span className="font-bold text-gray-900 dark:text-white">₹0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Placements Corner</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Update Resume
                </button>
              </div>

              <div className="grid gap-6">
                {placementUpdates.map((placement, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{placement.company}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{placement.position}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        placement.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        placement.status === 'Applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {placement.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
                        <p className="font-semibold text-green-600 dark:text-green-400">{placement.package}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{placement.deadline}</p>
                      </div>
                      <div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          {placement.status === 'Applied' ? 'View Status' : 'Apply Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Online Tests & Assessments</h3>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Practice Tests
                </button>
              </div>

              <div className="grid gap-6">
                {onlineTests.map((test, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{test.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{test.subject}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        test.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{test.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{test.questions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{test.deadline}</p>
                      </div>
                      <div>
                        <button className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                          test.status === 'Available' ? 'bg-green-600 hover:bg-green-700 text-white' :
                          test.status === 'Completed' ? 'bg-gray-400 text-white cursor-not-allowed' :
                          'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`} disabled={test.status === 'Completed'}>
                          {test.status === 'Available' ? 'Start Test' :
                           test.status === 'Completed' ? 'Completed' : 'Coming Soon'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Projects</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Create Project
                </button>
              </div>

              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{project.subject}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
                          {project.team.map((member, memberIndex) => (
                            <span key={memberIndex} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                              {member}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{project.deadline}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mentor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chat with Mentor</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Prof. Emily Davis - Online</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-96 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">ED</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Prof. Emily Davis</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Academic Mentor</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Hi Alex! How are you progressing with your Data Structures assignment?
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">
                        Good morning Professor! I'm working on the BST implementation. Having some issues with the delete operation.
                      </p>
                      <p className="text-xs text-blue-200 mt-1">10:32 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-900 dark:text-white">
                        That's a common challenge. Let's schedule a quick session this afternoon to go through it together.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">10:35 AM</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Features Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
          <div className="space-y-3">
            {[
              { name: 'Fee Payment', icon: CreditCard, color: 'text-green-600' },
              { name: 'Hall Tickets', icon: Download, color: 'text-blue-600' },
              { name: 'Notice Board', icon: Bell, color: 'text-orange-600' },
              { name: 'College Wall', icon: MessageCircle, color: 'text-purple-600' },
              { name: 'Live Bus Tracking', icon: MapPin, color: 'text-red-600' },
              { name: 'Raise Ticket', icon: Plus, color: 'text-gray-600' }
            ].map((link, index) => {
              const Icon = link.icon;
              return (
                <button key={index} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <Icon className={`w-5 h-5 ${link.color}`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h4>
          <div className="space-y-3">
            {[
              { event: 'Mid-Semester Exams', date: 'Jan 25', type: 'exam' },
              { event: 'Project Presentation', date: 'Jan 28', type: 'project' },
              { event: 'Placement Drive - TechCorp', date: 'Feb 2', type: 'placement' },
              { event: 'Alumni Meet', date: 'Feb 5', type: 'event' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'exam' ? 'bg-red-500' :
                  item.type === 'project' ? 'bg-blue-500' :
                  item.type === 'placement' ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.event}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Academic Progress</h4>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2">
                8.5
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</p>
            </div>
            <div className="space-y-2">
              {[
                { semester: 'Semester 1', cgpa: 8.2 },
                { semester: 'Semester 2', cgpa: 8.4 },
                { semester: 'Semester 3', cgpa: 8.5 }
              ].map((sem, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{sem.semester}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{sem.cgpa}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Notifications</h4>
          <div className="space-y-3">
            {[
              { title: 'Assignment Graded', desc: 'Data Structures assignment result available', time: '2h ago', type: 'success' },
              { title: 'New Study Material', desc: 'Algorithms notes uploaded by Prof. Brown', time: '4h ago', type: 'info' },
              { title: 'Placement Drive', desc: 'TechCorp registration deadline tomorrow', time: '6h ago', type: 'warning' },
              { title: 'Library Due', desc: 'Return "Clean Code" by Jan 22', time: '1d ago', type: 'alert' }
            ].map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'info' ? 'bg-blue-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{notification.desc}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningManagement;