import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, BookOpen, GraduationCap, Eye, Edit, Trash2 } from 'lucide-react';

interface CATTest {
  id: string;
  testName: string;
  subject: string;
  course: string;
  startDate: string;
  endDate: string;
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';
  totalMarks: number;
  duration: number;
  createdBy: string;
  createdDate: string;
}

interface FilterState {
  course: string;
  subject: string;
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  searchTerm: string;
}

const mockCATTests: CATTest[] = [
  {
    id: '1', testName: 'Mid-term Assessment', subject: 'Data Structures and Algorithms',
    course: 'Computer Science Engineering', startDate: '2024-10-15', endDate: '2024-10-15',
    status: 'Scheduled', totalMarks: 100, duration: 120, createdBy: 'Dr. Smith', createdDate: '2024-09-15'
  },
  {
    id: '2', testName: 'Quiz 1 - Functions', subject: 'Mathematics',
    course: 'Computer Science Engineering', startDate: '2024-09-20', endDate: '2024-09-20',
    status: 'Completed', totalMarks: 50, duration: 60, createdBy: 'Prof. Johnson', createdDate: '2024-09-10'
  },
  {
    id: '3', testName: 'Lab Assessment 1', subject: 'Physics Laboratory',
    course: 'Physics', startDate: '2024-10-01', endDate: '2024-10-03',
    status: 'Ongoing', totalMarks: 75, duration: 180, createdBy: 'Dr. Wilson', createdDate: '2024-09-25'
  },
  {
    id: '4', testName: 'Term Paper Review', subject: 'Research Methodology',
    course: 'Computer Science Engineering', startDate: '2024-11-05', endDate: '2024-11-05',
    status: 'Scheduled', totalMarks: 100, duration: 240, createdBy: 'Dr. Brown', createdDate: '2024-09-18'
  }
];

const CATManagementInterface: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [catTests, setCatTests] = useState<CATTest[]>(mockCATTests);
  const [filteredTests, setFilteredTests] = useState<CATTest[]>(mockCATTests);

  const [filters, setFilters] = useState<FilterState>({
    course: '', subject: '', dateRange: { start: '', end: '' }, status: '', searchTerm: ''
  });

  useEffect(() => {
    let filtered = catTests;

    if (filters.course) filtered = filtered.filter(test => test.course === filters.course);
    if (filters.subject) filtered = filtered.filter(test => test.subject === filters.subject);
    if (filters.status) filtered = filtered.filter(test => test.status === filters.status);
    if (filters.searchTerm) {
      const st = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(test =>
        test.testName.toLowerCase().includes(st) ||
        test.subject.toLowerCase().includes(st) ||
        test.course.toLowerCase().includes(st)
      );
    }
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(test => {
        const testDate = new Date(test.startDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        return testDate >= startDate && testDate <= endDate;
      });
    }
    setFilteredTests(filtered);
  }, [filters, catTests]);

  const uniqueCourses = [...new Set(catTests.map(test => test.course))];
  const uniqueSubjects = [...new Set(catTests.map(test => test.subject))];
  const statusOptions = ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'];

  const handleFilterChange = (key: keyof FilterState, value: string | { start: string; end: string }) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ course: '', subject: '', dateRange: { start: '', end: '' }, status: '', searchTerm: '' });
  };

  // Utility: badge coloring
  const getStatusBadge = (status: CATTest['status']) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Scheduled':
        return `${base} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
      case 'Ongoing':
        return `${base} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
      case 'Completed':
        return `${base} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      case 'Cancelled':
        return `${base} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
      default:
        return base;
    }
  };

  const formatDate = (dt: string) => new Date(dt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Class helpers to ensure dark mode never has bg-white and always uses text-white
  const themeClasses = {
    container: 'min-h-screen p-6 transition-colors duration-200 bg-white text-gray-900 dark:bg-gray-900 dark:text-white',
    card: 'rounded-lg border bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700',
    input: 'px-3 py-2 rounded-lg border bg-white text-gray-900 border-gray-300 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400',
    select: 'px-3 py-2 rounded-lg border bg-white text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600',
    table: 'w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white',
    tableRow: 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700',
    button: 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700',
    secondaryButton: 'bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700'
  };

  return (
    <div className={themeClasses.container}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Continuous Assessment Tests (CAT)</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manage and view all CAT tests created by the Examination Cell</p>
        </div>

        {/* Filters */}
        <div className={themeClasses.card + " p-6 mb-6"}>
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search tests..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className={`w-full pl-10 pr-3 ${themeClasses.input}`}
              />
            </div>
            <div className="relative">
              <select
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className={`w-full ${themeClasses.select}`}
              >
                <option value="">All Courses</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className={`w-full ${themeClasses.select}`}
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className={`w-full ${themeClasses.select}`}
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button
              onClick={clearFilters}
              className={themeClasses.secondaryButton + " px-4 py-2 rounded-lg transition-colors"}
            >
              Clear Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                className={`w-full ${themeClasses.input}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                className={`w-full ${themeClasses.input}`}
              />
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTests.length} of {catTests.length} tests
          </p>
        </div>

        {/* Table */}
        <div className={themeClasses.card + " overflow-hidden"}>
          <div className="overflow-x-auto">
            <table className={themeClasses.table}>
              <thead className="bg-gray-50 dark:bg-gray-700 text-xs border-b border-gray-200 dark:border-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Test Name</th>
                  <th className="px-6 py-3 text-left font-medium">Subject</th>
                  <th className="px-6 py-3 text-left font-medium">Course</th>
                  <th className="px-6 py-3 text-left font-medium">Test Date</th>
                  <th className="px-6 py-3 text-left font-medium">Duration</th>
                  <th className="px-6 py-3 text-left font-medium">Total Marks</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Created By</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTests.map((test) => (
                  <tr key={test.id} className={`transition-colors ${themeClasses.tableRow}`}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{test.testName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center"><BookOpen size={16} className="mr-2 text-blue-500" />{test.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center"><GraduationCap size={16} className="mr-2 text-green-500" />{test.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center"><Calendar size={16} className="mr-2 text-gray-500" />{formatDate(test.startDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{test.duration} min</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{test.totalMarks}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={getStatusBadge(test.status)}>{test.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{test.createdBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900 text-green-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium">No tests found</p>
              <p className="text-sm">Try adjusting your filters or search criteria</p>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className={themeClasses.card + " p-4"}>
            <h3 className="text-lg font-semibold mb-2">Total Tests</h3>
            <p className="text-3xl font-bold text-blue-600">{catTests.length}</p>
          </div>
          <div className={themeClasses.card + " p-4"}>
            <h3 className="text-lg font-semibold mb-2">Scheduled</h3>
            <p className="text-3xl font-bold text-yellow-600">{catTests.filter(t => t.status === 'Scheduled').length}</p>
          </div>
          <div className={themeClasses.card + " p-4"}>
            <h3 className="text-lg font-semibold mb-2">Ongoing</h3>
            <p className="text-3xl font-bold text-green-600">{catTests.filter(t => t.status === 'Ongoing').length}</p>
          </div>
          <div className={themeClasses.card + " p-4"}>
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-300">{catTests.filter(t => t.status === 'Completed').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CATManagementInterface;
