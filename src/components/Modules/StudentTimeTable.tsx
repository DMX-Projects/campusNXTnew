import React, { useState } from 'react';
import { Calendar, Clock, Download, Filter, MapPin, User } from 'lucide-react';

const StudentTimeTable: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [viewType, setViewType] = useState('weekly');

  const weeklySchedule = [
    {
      day: 'Monday',
      date: 'Jan 15',
      classes: [
        { time: '9:00-10:00', subject: 'Data Structures', faculty: 'Prof. Emily Davis', room: 'CS-101', type: 'Theory', attendance: 'Present' },
        { time: '10:00-11:00', subject: 'Algorithms', faculty: 'Prof. Michael Brown', room: 'CS-102', type: 'Theory', attendance: 'Present' },
        { time: '11:00-12:00', subject: 'Database Lab', faculty: 'Prof. Sarah Wilson', room: 'CS-Lab1', type: 'Lab', attendance: 'Present' },
        { time: '12:00-1:00', subject: 'Lunch Break', faculty: '', room: '', type: 'Break', attendance: '' },
        { time: '2:00-3:00', subject: 'Software Engineering', faculty: 'Prof. David Johnson', room: 'CS-103', type: 'Theory', attendance: 'Present' },
        { time: '3:00-4:00', subject: 'Computer Networks', faculty: 'Prof. Lisa Anderson', room: 'CS-104', type: 'Theory', attendance: 'Present' }
      ]
    },
    {
      day: 'Tuesday',
      date: 'Jan 16',
      classes: [
        { time: '9:00-10:00', subject: 'Algorithms', faculty: 'Prof. Michael Brown', room: 'CS-102', type: 'Theory', attendance: 'Present' },
        { time: '10:00-11:00', subject: 'Database Systems', faculty: 'Prof. Sarah Wilson', room: 'CS-103', type: 'Theory', attendance: 'Absent' },
        { time: '11:00-12:00', subject: 'Networks Lab', faculty: 'Prof. Lisa Anderson', room: 'CS-Lab2', type: 'Lab', attendance: 'Present' },
        { time: '12:00-1:00', subject: 'Lunch Break', faculty: '', room: '', type: 'Break', attendance: '' },
        { time: '2:00-3:00', subject: 'Data Structures', faculty: 'Prof. Emily Davis', room: 'CS-101', type: 'Theory', attendance: 'Present' },
        { time: '3:00-4:00', subject: 'Software Lab', faculty: 'Prof. David Johnson', room: 'CS-Lab3', type: 'Lab', attendance: 'Present' }
      ]
    },
    {
      day: 'Wednesday',
      date: 'Jan 17',
      classes: [
        { time: '9:00-10:00', subject: 'Database Systems', faculty: 'Prof. Sarah Wilson', room: 'CS-103', type: 'Theory', attendance: 'Present' },
        { time: '10:00-11:00', subject: 'Computer Networks', faculty: 'Prof. Lisa Anderson', room: 'CS-104', type: 'Theory', attendance: 'Present' },
        { time: '11:00-12:00', subject: 'Algorithms Lab', faculty: 'Prof. Michael Brown', room: 'CS-Lab1', type: 'Lab', attendance: 'Present' },
        { time: '12:00-1:00', subject: 'Lunch Break', faculty: '', room: '', type: 'Break', attendance: '' },
        { time: '2:00-3:00', subject: 'Software Engineering', faculty: 'Prof. David Johnson', room: 'CS-103', type: 'Theory', attendance: 'Present' },
        { time: '3:00-4:00', subject: 'Data Structures', faculty: 'Prof. Emily Davis', room: 'CS-101', type: 'Theory', attendance: 'Present' }
      ]
    }
  ];

  const upcomingClasses = [
    { subject: 'Data Structures', time: 'Today 2:00 PM', faculty: 'Prof. Emily Davis', room: 'CS-101' },
    { subject: 'Algorithms Lab', time: 'Tomorrow 11:00 AM', faculty: 'Prof. Michael Brown', room: 'CS-Lab1' },
    { subject: 'Database Systems', time: 'Tomorrow 2:00 PM', faculty: 'Prof. Sarah Wilson', room: 'CS-103' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Class Time Table
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Computer Science Department - 3rd Year Section A
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="current">Current Week</option>
            <option value="next">Next Week</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Classes This Week</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Lab Sessions</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Clock className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Free Periods</p>
              <p className="text-2xl font-bold">6</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Weekly Time Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Time</th>
                {weeklySchedule.map((day) => (
                  <th key={day.day} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {day.day}
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{day.date}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00'].map((timeSlot, timeIndex) => (
                <tr key={timeSlot} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{timeSlot}</td>
                  {weeklySchedule.map((day) => {
                    const classInfo = day.classes[timeIndex];
                    return (
                      <td key={day.day} className="px-6 py-4">
                        {classInfo.type === 'Break' ? (
                          <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
                            Lunch Break
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{classInfo.subject}</p>
                              {classInfo.attendance && (
                                <div className={`w-2 h-2 rounded-full ${
                                  classInfo.attendance === 'Present' ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{classInfo.faculty}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{classInfo.room}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              classInfo.type === 'Theory' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                              'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            }`}>
                              {classInfo.type}
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingClasses.map((classItem, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{classItem.subject}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{classItem.time}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{classItem.faculty}</span>
                </p>
                <p className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{classItem.room}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTimeTable;