import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Book, MapPin, Filter, Search } from 'lucide-react';

const TimeTable: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Computer Science');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Remove local isDarkMode state and useEffect - let the global state handle dark mode
  useEffect(() => {
    // Check if dark mode is already set by the global state
    const isDarkMode = document.documentElement.classList.contains('dark');
    console.log('Dark mode status on component mount:', isDarkMode);
  }, []);

  const timeSlots = [
    '09:00-09:50',
    '09:50-10:40',
    '10:40-11:30',
    '11:30-12:20',
    '12:20-01:10',
    '01:10-02:00',
    '02:00-02:50',
    '02:50-03:40',
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'];
  const semesters = ['1st Semester','2nd Semester','3rd Semester','4th Semester','5th Semester','6th Semester'];
  
  const sampleData = {
    Monday: {
      '09:00-09:50': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101', department: 'Computer Science', semester: '3rd Semester' },
    },
  };

  const filterData = () => {
    const filtered = JSON.parse(JSON.stringify(sampleData));
    for (const day in filtered) {
      for (const time in filtered[day]) {
        if (filtered[day][time].department !== selectedDepartment && filtered[day][time].department !== 'All') {
          delete filtered[day][time];
        }
      }
    }
    if (selectedSemester !== 'all') {
      for (const day in filtered) {
        for (const time in filtered[day]) {
          if (filtered[day][time].semester !== selectedSemester && filtered[day][time].semester !== 'All') {
            delete filtered[day][time];
          }
        }
      }
    }
    if (searchTerm) {
      for (const day in filtered) {
        for (const time in filtered[day]) {
          const data = filtered[day][time];
          if (!data.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !data.faculty.toLowerCase().includes(searchTerm.toLowerCase()) &&
              !data.room.toLowerCase().includes(searchTerm.toLowerCase())) {
            delete filtered[day][time];
          }
        }
      }
    }
    return filtered;
  };
  
  const data = filterData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Rest of your component remains the same */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold">Time Table</h1>
            <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400">Department wise View</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedView(selectedView === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 rounded shadow transition-colors duration-300 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              title="Toggle View"
            >
              <Filter className="w-4 h-4" />
              {selectedView === 'grid' ? 'List View' : 'Grid View'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            className="block w-full px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
          <select
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
            className="block w-full px-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="all">All Semesters</option>
            {semesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
          </select>
          <div className="sm:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search Class"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 rounded border border-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Timetable Content */}
        {selectedView === 'grid' ? (
          <div className="overflow-auto rounded shadow bg-white dark:bg-gray-800">
            <table className="min-w-[800px] w-full text-sm text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <tr>
                  <th className="sticky left-0 bg-inherit z-20 px-5 py-3 font-medium border-r border-gray-300 dark:border-gray-600">
                    <div className="flex items-center gap-2"><Clock /> Time \ Day</div>
                  </th>
                  {days.map(day => (
                    <th key={day} className="min-w-[160px] px-5 py-3">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, idx) => {
                  const rowBg = idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-600';
                  return (
                    <tr key={slot} className={rowBg}>
                      <td className="sticky left-0 bg-inherit z-10 px-5 py-3 font-semibold border-r border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-300">{slot}</td>
                      {days.map(day => {
                        const cls = data[day]?.[slot];
                        return (
                          <td key={day} className="px-3 py-2 border-r border-gray-300 dark:border-gray-600">
                            {!cls ? (
                              <div className="h-20 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                No Class
                              </div>
                            ) : (
                              <div className="rounded-lg p-3 cursor-pointer transition-colors duration-200 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white" title={`${cls.subject} - ${cls.faculty}`}>
                                <div className="font-semibold text-sm mb-1">{cls.subject}</div>
                                <div className="text-xs flex items-center gap-1 opacity-80 mb-1"><User className="w-3 h-3" />{cls.faculty}</div>
                                <div className="text-xs flex items-center gap-1 opacity-80"><MapPin className="w-3 h-3" />{cls.room}</div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-6">
            {days.map(day => {
              const dayData = data[day];
              const hasClasses = dayData && Object.keys(dayData).length > 0;
              return (
                <div key={day} className="rounded shadow p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Calendar /> {day}
                  </h3>
                  {!hasClasses ? (
                    <div className="text-gray-400 dark:text-gray-500">
                      No Classes Scheduled
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {timeSlots.map(slot => {
                        const cls = dayData?.[slot];
                        if (!cls) return null;
                        return (
                          <div key={slot} className="rounded-lg p-4 cursor-pointer transition-colors duration-200 bg-blue-500 dark:bg-blue-700 text-white">
                            <div className="flex items-center gap-2 text-sm mb-2"><Clock /> {slot}</div>
                            <div className="font-semibold text-lg">{cls.subject}</div>
                            <div className="flex flex-wrap gap-2 text-xs opacity-90 mt-2">
                              <div className="flex items-center gap-1"><User /> {cls.faculty}</div>
                              <div className="flex items-center gap-1"><MapPin /> {cls.room}</div>
                              <div className="flex items-center gap-1"><Book /> {cls.department} - {cls.semester}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 p-6 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Note:</strong> This timetable shows the schedule as created by the HOD. Toggle the visuals and filters for customized views.
          </p>
          <div className="mt-3 flex gap-4 flex-wrap text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500 dark:bg-blue-600"></div> Regular Classes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600"></div> No Classes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
