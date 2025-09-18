import React, { useState } from 'react';
import { Filter, Download, Calendar } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  department: string;
  year: string;
  semester: string;
  section: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
}

export default function StudentAttendance() {
  const { isDarkMode } = useTheme();
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');

  const studentData: StudentRecord[] = [
    {
      id: '1',
      rollNo: 'CS2021001',
      name: 'Alice Johnson',
      department: 'Computer Science',
      year: '3rd Year',
      semester: '6th Semester',
      section: 'A',
      date: '2024-01-15',
      status: 'present'
    },
    {
      id: '2',
      rollNo: 'CS2021002',
      name: 'Bob Smith',
      department: 'Computer Science',
      year: '3rd Year',
      semester: '6th Semester',
      section: 'A',
      date: '2024-01-15',
      status: 'absent'
    },
    {
      id: '3',
      rollNo: 'MA2021001',
      name: 'Carol Brown',
      department: 'Mathematics',
      year: '2nd Year',
      semester: '4th Semester',
      section: 'B',
      date: '2024-01-15',
      status: 'present'
    },
    {
      id: '4',
      rollNo: 'PH2020001',
      name: 'David Wilson',
      department: 'Physics',
      year: '4th Year',
      semester: '8th Semester',
      section: 'A',
      date: '2024-01-15',
      status: 'leave'
    },
    {
      id: '5',
      rollNo: 'CS2022001',
      name: 'Eva Davis',
      department: 'Computer Science',
      year: '2nd Year',
      semester: '4th Semester',
      section: 'B',
      date: '2024-01-15',
      status: 'present'
    },
    {
      id: '6',
      rollNo: 'CH2021001',
      name: 'Frank Miller',
      department: 'Chemistry',
      year: '3rd Year',
      semester: '6th Semester',
      section: 'A',
      date: '2024-01-15',
      status: 'absent'
    }
  ];

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  const sections = ['A', 'B', 'C', 'D'];

  const filteredStudents = studentData.filter(student => {
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    const matchesYear = yearFilter === 'all' || student.year === yearFilter;
    const matchesSemester = semesterFilter === 'all' || student.semester === semesterFilter;
    const matchesSection = sectionFilter === 'all' || student.section === sectionFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesDate = student.date === selectedDate;
    return matchesDepartment && matchesYear && matchesSemester && matchesSection && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'absent':
        return 'bg-rose-100 dark:bg-red-900/50 text-rose-800 dark:text-red-300 border border-rose-200 dark:border-red-800';
      case 'leave':
        return 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
    }
  };

  const totalStudents = filteredStudents.length;
  const presentCount = filteredStudents.filter(s => s.status === 'present').length;
  const absentCount = filteredStudents.filter(s => s.status === 'absent').length;
  const onLeaveCount = filteredStudents.filter(s => s.status === 'leave').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Attendance</h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Monitor and track student attendance records
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl shadow-sm border bg-blue-50 dark:bg-slate-800 border-blue-100 dark:border-slate-700">
          <h3 className="text-sm font-medium mb-2 text-blue-600 dark:text-slate-400">Total Students</h3>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{totalStudents}</p>
        </div>
        <div className="p-5 rounded-xl shadow-sm border bg-emerald-50 dark:bg-slate-800 border-emerald-100 dark:border-slate-700">
          <h3 className="text-sm font-medium mb-2 text-emerald-600 dark:text-slate-400">Present</h3>
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">{presentCount}</p>
          <p className="text-xs mt-1 text-emerald-500 dark:text-emerald-400/70">
            {totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : 0}%
          </p>
        </div>
        <div className="p-5 rounded-xl shadow-sm border bg-rose-50 dark:bg-slate-800 border-rose-100 dark:border-slate-700">
          <h3 className="text-sm font-medium mb-2 text-rose-600 dark:text-slate-400">Absent</h3>
          <p className="text-3xl font-bold text-rose-700 dark:text-red-400">{absentCount}</p>
          <p className="text-xs mt-1 text-rose-500 dark:text-red-400/70">
            {totalStudents > 0 ? ((absentCount / totalStudents) * 100).toFixed(1) : 0}%
          </p>
        </div>
        <div className="p-5 rounded-xl shadow-sm border bg-amber-50 dark:bg-slate-800 border-amber-100 dark:border-slate-700">
          <h3 className="text-sm font-medium mb-2 text-amber-600 dark:text-slate-400">On Leave</h3>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">{onLeaveCount}</p>
          <p className="text-xs mt-1 text-amber-500 dark:text-amber-400/70">
            {totalStudents > 0 ? ((onLeaveCount / totalStudents) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Department</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Year</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Semester</label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Section</label>
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Sections</option>
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">On Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center rounded-lg border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <p className="text-lg font-medium mb-2 text-gray-500 dark:text-slate-300">
                No student records found
              </p>
              <p className="text-sm text-gray-400 dark:text-slate-400">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{student.rollNo}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{student.department}</p>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(student.status)}`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Year:</span>
                    <span className="text-sm font-medium">{student.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Semester:</span>
                    <span className="text-sm font-medium">{student.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Section:</span>
                    <span className="text-sm font-medium">{student.section}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Date:</span>
                    <span className="text-sm font-medium">{new Date(student.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-lg overflow-hidden shadow-sm border bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500 dark:text-slate-400">
                    No student records found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-100">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-100">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                      {student.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                      {student.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                      {student.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                      {student.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                      {new Date(student.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
