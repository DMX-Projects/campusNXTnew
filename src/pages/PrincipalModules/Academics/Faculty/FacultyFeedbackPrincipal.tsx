import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Award, AlertCircle, Eye, BarChart3 } from 'lucide-react';

interface FacultyPerformance {
  id: string;
  facultyName: string;
  facultyId: string;
  department: string;
  course: string;
  semester: string;
  academicYear: string;
  totalStudents: number;
  studentsAppeared: number;
  studentsPassed: number;
  studentsFailed: number;
  passPercentage: number;
  averageMarks: number;
  distinctionCount: number;
  firstClassCount: number;
  secondClassCount: number;
  performanceScore: number;
  performanceGrade: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  trend: 'up' | 'down' | 'stable';
  previousPassPercentage: number;
}

interface FilterState {
  department: string;
  semester: string;
  academicYear: string;
  performanceGrade: string;
}

const FacultyPerformanceDashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    department: '',
    semester: '',
    academicYear: '2024-25',
    performanceGrade: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyPerformance | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const itemsPerPage = 10;

  // Calculate performance score based on multiple metrics
  const calculatePerformanceScore = (data: {
    passPercentage: number;
    averageMarks: number;
    distinctionCount: number;
    totalStudents: number;
  }): number => {
    const passWeight = 0.5;
    const avgMarksWeight = 0.3;
    const distinctionWeight = 0.2;

    const passScore = (data.passPercentage / 100) * 100;
    const marksScore = (data.averageMarks / 100) * 100;
    const distinctionScore = data.totalStudents > 0 
      ? (data.distinctionCount / data.totalStudents) * 100 
      : 0;

    return (
      passScore * passWeight +
      marksScore * avgMarksWeight +
      distinctionScore * distinctionWeight
    );
  };

  const getPerformanceGrade = (score: number): 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 55) return 'Average';
    return 'Needs Improvement';
  };

  // Sample auto-generated data based on student results
  const [performanceData] = useState<FacultyPerformance[]>([
    {
      id: '1',
      facultyName: 'Dr. John Smith',
      facultyId: 'FAC001',
      department: 'Computer Science',
      course: 'Data Structures',
      semester: 'Semester 3',
      academicYear: '2024-25',
      totalStudents: 60,
      studentsAppeared: 58,
      studentsPassed: 52,
      studentsFailed: 6,
      passPercentage: 89.66,
      averageMarks: 72.5,
      distinctionCount: 15,
      firstClassCount: 22,
      secondClassCount: 15,
      performanceScore: 0,
      performanceGrade: 'Excellent',
      trend: 'up',
      previousPassPercentage: 85.5
    },
    {
      id: '2',
      facultyName: 'Prof. Sarah Wilson',
      facultyId: 'FAC002',
      department: 'Mathematics',
      course: 'Calculus',
      semester: 'Semester 2',
      academicYear: '2024-25',
      totalStudents: 55,
      studentsAppeared: 55,
      studentsPassed: 40,
      studentsFailed: 15,
      passPercentage: 72.73,
      averageMarks: 65.2,
      distinctionCount: 8,
      firstClassCount: 18,
      secondClassCount: 14,
      performanceScore: 0,
      performanceGrade: 'Good',
      trend: 'stable',
      previousPassPercentage: 73.1
    },
    {
      id: '3',
      facultyName: 'Dr. Michael Chen',
      facultyId: 'FAC003',
      department: 'Physics',
      course: 'Quantum Physics',
      semester: 'Semester 5',
      academicYear: '2024-25',
      totalStudents: 45,
      studentsAppeared: 45,
      studentsPassed: 42,
      studentsFailed: 3,
      passPercentage: 93.33,
      averageMarks: 78.8,
      distinctionCount: 18,
      firstClassCount: 20,
      secondClassCount: 4,
      performanceScore: 0,
      performanceGrade: 'Excellent',
      trend: 'up',
      previousPassPercentage: 88.9
    },
    {
      id: '4',
      facultyName: 'Prof. Lisa Martinez',
      facultyId: 'FAC004',
      department: 'Chemistry',
      course: 'Organic Chemistry',
      semester: 'Semester 4',
      academicYear: '2024-25',
      totalStudents: 50,
      studentsAppeared: 48,
      studentsPassed: 25,
      studentsFailed: 23,
      passPercentage: 52.08,
      averageMarks: 52.3,
      distinctionCount: 3,
      firstClassCount: 10,
      secondClassCount: 12,
      performanceScore: 0,
      performanceGrade: 'Needs Improvement',
      trend: 'down',
      previousPassPercentage: 65.2
    },
    {
      id: '5',
      facultyName: 'Dr. Robert Kumar',
      facultyId: 'FAC005',
      department: 'Computer Science',
      course: 'Database Management',
      semester: 'Semester 4',
      academicYear: '2024-25',
      totalStudents: 62,
      studentsAppeared: 60,
      studentsPassed: 48,
      studentsFailed: 12,
      passPercentage: 80.0,
      averageMarks: 68.5,
      distinctionCount: 12,
      firstClassCount: 20,
      secondClassCount: 16,
      performanceScore: 0,
      performanceGrade: 'Good',
      trend: 'up',
      previousPassPercentage: 76.5
    },
    {
      id: '6',
      facultyName: 'Prof. Emily Davis',
      facultyId: 'FAC006',
      department: 'Mathematics',
      course: 'Linear Algebra',
      semester: 'Semester 3',
      academicYear: '2024-25',
      totalStudents: 58,
      studentsAppeared: 56,
      studentsPassed: 38,
      studentsFailed: 18,
      passPercentage: 67.86,
      averageMarks: 61.2,
      distinctionCount: 6,
      firstClassCount: 16,
      secondClassCount: 16,
      performanceScore: 0,
      performanceGrade: 'Average',
      trend: 'down',
      previousPassPercentage: 72.0
    }
  ]);

  // Calculate performance scores
  const enrichedData = performanceData.map(faculty => ({
    ...faculty,
    performanceScore: calculatePerformanceScore({
      passPercentage: faculty.passPercentage,
      averageMarks: faculty.averageMarks,
      distinctionCount: faculty.distinctionCount,
      totalStudents: faculty.totalStudents
    })
  })).map(faculty => ({
    ...faculty,
    performanceGrade: getPerformanceGrade(faculty.performanceScore)
  }));

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      semester: '',
      academicYear: '2024-25',
      performanceGrade: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleViewDetails = (faculty: FacultyPerformance) => {
    setSelectedFaculty(faculty);
    setShowDetailModal(true);
  };

  const filteredData = enrichedData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.facultyId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (filters.department === '' || item.department === filters.department) &&
      (filters.semester === '' || item.semester === filters.semester) &&
      (filters.academicYear === '' || item.academicYear === filters.academicYear) &&
      (filters.performanceGrade === '' || item.performanceGrade === filters.performanceGrade);

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Average': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Needs Improvement': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getPassPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 dark:text-green-400';
    if (percentage >= 70) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 55) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Calculate statistics
  const avgPassPercentage = (filteredData.reduce((sum, f) => sum + f.passPercentage, 0) / filteredData.length).toFixed(2);
  const excellentCount = filteredData.filter(f => f.performanceGrade === 'Excellent').length;
  const needsImprovementCount = filteredData.filter(f => f.performanceGrade === 'Needs Improvement').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
      {/* Header */}
      <div className="mb-8 pb-5 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Faculty Performance
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Auto-generated performance metrics based on student pass percentages and academic results
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Faculty</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredData.length}</p>
            </div>
            <BarChart3 className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Pass Rate</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgPassPercentage}%</p>
            </div>
            <TrendingUp className="text-green-600 dark:text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Excellent Performers</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{excellentCount}</p>
            </div>
            <Award className="text-purple-600 dark:text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Need Attention</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{needsImprovementCount}</p>
            </div>
            <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by faculty name, ID, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>

          <select
            value={filters.semester}
            onChange={(e) => handleFilterChange('semester', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
          </select>

          <select
            value={filters.academicYear}
            onChange={(e) => handleFilterChange('academicYear', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>

          <select
            value={filters.performanceGrade}
            onChange={(e) => handleFilterChange('performanceGrade', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Grades</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Needs Improvement">Needs Improvement</option>
          </select>

          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-5 text-gray-600 dark:text-gray-400">
        <span className="text-sm">
          Showing {paginatedData.length} of {filteredData.length} faculty members
        </span>
      </div>

      {/* Performance Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-600 dark:bg-blue-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Faculty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Department</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Semester</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Students</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Pass %</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Avg Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Trend</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((faculty) => (
                <tr key={faculty.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {faculty.facultyName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {faculty.facultyId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {faculty.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {faculty.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {faculty.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {faculty.studentsPassed}/{faculty.studentsAppeared}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Failed: {faculty.studentsFailed}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${getPassPercentageColor(faculty.passPercentage)}`}>
                      {faculty.passPercentage.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {faculty.averageMarks.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(faculty.performanceGrade)}`}>
                      {faculty.performanceGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {faculty.trend === 'up' && <TrendingUp className="text-green-600 dark:text-green-400" size={20} />}
                    {faculty.trend === 'down' && <TrendingDown className="text-red-600 dark:text-red-400" size={20} />}
                    {faculty.trend === 'stable' && <span className="text-gray-500">→</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => handleViewDetails(faculty)}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:text-white'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Performance Analysis
              </h2>
              <button
                className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-2xl font-bold p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowDetailModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Student Statistics
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Total Students:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFaculty.totalStudents}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Students Appeared:</span> <span className="text-gray-900 dark:text-gray-100">{selectedFaculty.studentsAppeared}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Students Passed:</span> <span className="text-green-600 dark:text-green-400 font-semibold">{selectedFaculty.studentsPassed}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Students Failed:</span> <span className="text-red-600 dark:text-red-400 font-semibold">{selectedFaculty.studentsFailed}</span></p>
                    <p><span className="font-medium text-gray-700 dark:text-gray-300">Pass Percentage:</span> <span className={`font-bold ${getPassPercentageColor(selectedFaculty.passPercentage)}`}>{selectedFaculty.passPercentage.toFixed(2)}%</span></p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    Performance Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Distinction</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{selectedFaculty.distinctionCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{((selectedFaculty.distinctionCount / selectedFaculty.totalStudents) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">First Class</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{selectedFaculty.firstClassCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{((selectedFaculty.firstClassCount / selectedFaculty.totalStudents) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Second Class</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{selectedFaculty.secondClassCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{((selectedFaculty.secondClassCount / selectedFaculty.totalStudents) * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">Avg Marks</p>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{selectedFaculty.averageMarks.toFixed(1)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">out of 100</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-gray-600 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                    <Award className="mr-2" size={20} />
                    Overall Performance Assessment
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Performance Score:</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedFaculty.performanceScore.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Grade:</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(selectedFaculty.performanceGrade)}`}>
                        {selectedFaculty.performanceGrade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Trend:</span>
                      <div className="flex items-center">
                        {selectedFaculty.trend === 'up' && (
                          <>
                            <TrendingUp className="text-green-600 dark:text-green-400 mr-1" size={20} />
                            <span className="text-green-600 dark:text-green-400 font-semibold">Improving</span>
                          </>
                        )}
                        {selectedFaculty.trend === 'down' && (
                          <>
                            <TrendingDown className="text-red-600 dark:text-red-400 mr-1" size={20} />
                            <span className="text-red-600 dark:text-red-400 font-semibold">Declining</span>
                          </>
                        )}
                        {selectedFaculty.trend === 'stable' && (
                          <span className="text-gray-600 dark:text-gray-400 font-semibold">Stable</span>
                        )}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-blue-200 dark:border-gray-500">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Previous Pass %: <span className="font-semibold">{selectedFaculty.previousPassPercentage.toFixed(2)}%</span></p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Current Pass %: <span className="font-semibold">{selectedFaculty.passPercentage.toFixed(2)}%</span></p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Change: <span className={selectedFaculty.passPercentage >= selectedFaculty.previousPassPercentage ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-red-600 dark:text-red-400 font-semibold'}>
                          {(selectedFaculty.passPercentage - selectedFaculty.previousPassPercentage).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-yellow-50 dark:bg-gray-700 border border-yellow-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-3 flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    Performance Insights
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {selectedFaculty.passPercentage >= 85 && (
                      <p>✓ Excellent pass percentage. Students are performing exceptionally well.</p>
                    )}
                    {selectedFaculty.passPercentage >= 70 && selectedFaculty.passPercentage < 85 && (
                      <p>✓ Good pass percentage. Majority of students are succeeding.</p>
                    )}
                    {selectedFaculty.passPercentage >= 55 && selectedFaculty.passPercentage < 70 && (
                      <p>⚠ Average pass percentage. Consider review of teaching methods.</p>
                    )}
                    {selectedFaculty.passPercentage < 55 && (
                      <p>⚠ Below average pass percentage. Immediate intervention recommended.</p>
                    )}
                    {selectedFaculty.distinctionCount > selectedFaculty.totalStudents * 0.25 && (
                      <p>✓ High distinction rate indicates strong student engagement.</p>
                    )}
                    {selectedFaculty.averageMarks >= 70 && (
                      <p>✓ High average marks reflect effective teaching delivery.</p>
                    )}
                    {selectedFaculty.trend === 'up' && (
                      <p>✓ Positive trend shows continuous improvement in teaching effectiveness.</p>
                    )}
                    {selectedFaculty.trend === 'down' && (
                      <p>⚠ Declining trend requires attention and support.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                onClick={() => setShowDetailModal(false)}
              >
                Close
              </button>
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                onClick={() => {
                  alert('Generate detailed report for ' + selectedFaculty.facultyName);
                }}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPerformanceDashboard;