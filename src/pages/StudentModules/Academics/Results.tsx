import React, { useState, useMemo } from 'react';
import { Download, Filter, Search, GraduationCap, Calendar, BookOpen, Award, AlertCircle, ChevronDown, ChevronRight, Eye, X } from 'lucide-react';

const Results = () => {
  // Sample data with midterms and semesters
  const [resultsData] = useState([
    // Year 1 - Semester 1 - Midterm 1
    {
      id: 1,
      examType: 'Midterm 1',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Programming Fundamentals',
      marks: 42,
      totalMarks: 50,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2023-10-15'
    },
    {
      id: 2,
      examType: 'Midterm 1',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics I',
      marks: 38,
      totalMarks: 50,
      grade: 'B+',
      status: 'Passed',
      credits: 3,
      date: '2023-10-15'
    },
    // Year 1 - Semester 1 - Midterm 2
    {
      id: 3,
      examType: 'Midterm 2',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Programming Fundamentals',
      marks: 43,
      totalMarks: 50,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2023-11-20'
    },
    {
      id: 4,
      examType: 'Midterm 2',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics I',
      marks: 40,
      totalMarks: 50,
      grade: 'A-',
      status: 'Passed',
      credits: 3,
      date: '2023-11-20'
    },
    // Year 1 - Semester 1 
    {
      id: 5,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Programming Fundamentals',
      marks: 85,
      totalMarks: 100,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2023-12-15'
    },
    {
      id: 6,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics I',
      marks: 78,
      totalMarks: 100,
      grade: 'B+',
      status: 'Passed',
      credits: 3,
      date: '2023-12-15'
    },
    {
      id: 7,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Physics',
      marks: 72,
      totalMarks: 100,
      grade: 'B',
      status: 'Passed',
      credits: 3,
      date: '2023-12-15'
    },
    // Year 1 - Semester 2 - Midterm 1
    {
      id: 8,
      examType: 'Midterm 1',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Data Structures',
      marks: 44,
      totalMarks: 50,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2024-03-10'
    },
    {
      id: 9,
      examType: 'Midterm 1',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics II',
      marks: 41,
      totalMarks: 50,
      grade: 'A-',
      status: 'Passed',
      credits: 3,
      date: '2024-03-10'
    },
    {
      id: 10,
      examType: 'Midterm 1',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Chemistry',
      marks: 35,
      totalMarks: 50,
      grade: 'B',
      status: 'Passed',
      credits: 3,
      date: '2024-03-10'
    },
    // Year 1 - Semester 2 - Midterm 2
    {
      id: 11,
      examType: 'Midterm 2',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Data Structures',
      marks: 46,
      totalMarks: 50,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2024-04-15'
    },
    {
      id: 12,
      examType: 'Midterm 2',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics II',
      marks: 42,
      totalMarks: 50,
      grade: 'A-',
      status: 'Passed',
      credits: 3,
      date: '2024-04-15'
    },
    {
      id: 13,
      examType: 'Midterm 2',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Chemistry',
      marks: 37,
      totalMarks: 50,
      grade: 'B',
      status: 'Passed',
      credits: 3,
      date: '2024-04-15'
    },
    // Year 1 - Semester 2 Final
    {
      id: 14,
      examType: 'Final Exam',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Data Structures',
      marks: 88,
      totalMarks: 100,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2024-05-20'
    },
    {
      id: 15,
      examType: 'Final Exam',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Mathematics II',
      marks: 82,
      totalMarks: 100,
      grade: 'A-',
      status: 'Passed',
      credits: 3,
      date: '2024-05-20'
    },
    {
      id: 16,
      examType: 'Final Exam',
      semester: 'Semester 2',
      year: 'Year 1',
      course: 'Computer Science',
      subject: 'Chemistry',
      marks: 75,
      totalMarks: 100,
      grade: 'B+',
      status: 'Passed',
      credits: 3,
      date: '2024-05-20'
    },
    // Year 2 - Semester 1 - Midterm 1
    {
      id: 17,
      examType: 'Midterm 1',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Database Systems',
      marks: 45,
      totalMarks: 50,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2024-10-05'
    },
    {
      id: 18,
      examType: 'Midterm 1',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Web Development',
      marks: 43,
      totalMarks: 50,
      grade: 'A',
      status: 'Passed',
      credits: 3,
      date: '2024-10-05'
    },
    {
      id: 19,
      examType: 'Midterm 1',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Software Engineering',
      marks: 40,
      totalMarks: 50,
      grade: 'A-',
      status: 'Passed',
      credits: 4,
      date: '2024-10-05'
    },
    // Year 2 - Semester 1 - Midterm 2
    {
      id: 20,
      examType: 'Midterm 2',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Database Systems',
      marks: 47,
      totalMarks: 50,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2024-11-10'
    },
    {
      id: 21,
      examType: 'Midterm 2',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Web Development',
      marks: 44,
      totalMarks: 50,
      grade: 'A',
      status: 'Passed',
      credits: 3,
      date: '2024-11-10'
    },
    {
      id: 22,
      examType: 'Midterm 2',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Software Engineering',
      marks: 42,
      totalMarks: 50,
      grade: 'A-',
      status: 'Passed',
      credits: 4,
      date: '2024-11-10'
    },
    // Year 2 - Semester 1 Final
    {
      id: 23,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Database Systems',
      marks: 90,
      totalMarks: 100,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2024-12-10'
    },
    {
      id: 24,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Web Development',
      marks: 86,
      totalMarks: 100,
      grade: 'A',
      status: 'Passed',
      credits: 3,
      date: '2024-12-10'
    },
    {
      id: 25,
      examType: 'Final Exam',
      semester: 'Semester 1',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Software Engineering',
      marks: 84,
      totalMarks: 100,
      grade: 'A',
      status: 'Passed',
      credits: 4,
      date: '2024-12-10'
    },
    // Year 2 - Semester 2 data
    {
      id: 26,
      examType: 'Midterm 1',
      semester: 'Semester 2',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Operating Systems',
      marks: 46,
      totalMarks: 50,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2025-03-05'
    },
    {
      id: 27,
      examType: 'Midterm 2',
      semester: 'Semester 2',
      year: 'Year 2',
      course: 'Computer Science',
      subject: 'Operating Systems',
      marks: 48,
      totalMarks: 50,
      grade: 'A+',
      status: 'Passed',
      credits: 4,
      date: '2025-04-10'
    }
  ]);

  const [filters, setFilters] = useState({
    examType: '',
    semester: '',
    year: '',
    course: '',
    searchTerm: ''
  });

  const [expandedItems, setExpandedItems] = useState({});

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    return {
      examTypes: [...new Set(resultsData.map(item => item.examType))].sort(),
      semesters: [...new Set(resultsData.map(item => item.semester))].sort(),
      years: [...new Set(resultsData.map(item => item.year))].sort(),
      courses: [...new Set(resultsData.map(item => item.course))]
    };
  }, [resultsData]);

  // Group results by year, semester, and exam type
  const groupedResults = useMemo(() => {
    const filtered = resultsData.filter(result => {
      const matchesExamType = !filters.examType || result.examType === filters.examType;
      const matchesSemester = !filters.semester || result.semester === filters.semester;
      const matchesYear = !filters.year || result.year === filters.year;
      const matchesCourse = !filters.course || result.course === filters.course;
      const matchesSearch = !filters.searchTerm || 
        result.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        result.grade.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesExamType && matchesSemester && matchesYear && matchesCourse && matchesSearch;
    });

    const grouped = {};
    filtered.forEach(result => {
      const yearKey = result.year;
      const semesterKey = result.semester;
      const examTypeKey = result.examType;
      
      if (!grouped[yearKey]) grouped[yearKey] = {};
      if (!grouped[yearKey][semesterKey]) grouped[yearKey][semesterKey] = {};
      if (!grouped[yearKey][semesterKey][examTypeKey]) grouped[yearKey][semesterKey][examTypeKey] = [];
      
      grouped[yearKey][semesterKey][examTypeKey].push(result);
    });

    return grouped;
  }, [resultsData, filters]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const allResults = Object.values(groupedResults).flatMap(year => 
      Object.values(year).flatMap(semester => 
        Object.values(semester).flatMap(examType => examType)
      )
    );
    
    if (allResults.length === 0) return { totalCredits: 0, averageMarks: 0, totalSubjects: 0 };
    
    const totalCredits = allResults.reduce((sum, result) => sum + result.credits, 0);
    const averageMarks = allResults.reduce((sum, result) => sum + (result.marks / result.totalMarks * 100), 0) / allResults.length;
    
    return {
      totalCredits,
      averageMarks: Math.round(averageMarks * 10) / 10,
      totalSubjects: allResults.length
    };
  }, [groupedResults]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      examType: '',
      semester: '',
      year: '',
      course: '',
      searchTerm: ''
    });
  };

  const clearSpecificFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
  };

  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const downloadResults = () => {
    const allResults = Object.values(groupedResults).flatMap(year => 
      Object.values(year).flatMap(semester => 
        Object.values(semester).flatMap(examType => examType)
      )
    );
    
    const headers = ['Year', 'Semester', 'Exam Type', 'Course', 'Subject', 'Marks', 'Total Marks', 'Percentage', 'Grade', 'Status', 'Credits', 'Date'];
    const csvContent = [
      headers.join(','),
      ...allResults.map(result => [
        result.year,
        result.semester,
        result.examType,
        result.course,
        result.subject,
        result.marks,
        result.totalMarks,
        Math.round((result.marks / result.totalMarks * 100) * 10) / 10,
        result.grade,
        result.status,
        result.credits,
        result.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'academic-results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSpecificResults = (results, filename) => {
    const headers = ['Year', 'Semester', 'Exam Type', 'Course', 'Subject', 'Marks', 'Total Marks', 'Percentage', 'Grade', 'Status', 'Credits', 'Date'];
    const csvContent = [
      headers.join(','),
      ...results.map(result => [
        result.year,
        result.semester,
        result.examType,
        result.course,
        result.subject,
        result.marks,
        result.totalMarks,
        Math.round((result.marks / result.totalMarks * 100) * 10) / 10,
        result.grade,
        result.status,
        result.credits,
        result.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-results.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'passed':
        return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30';
      case 'failed':
        return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900/30';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-700 font-semibold dark:text-green-400';
    if (grade.startsWith('B')) return 'text-blue-700 font-semibold dark:text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-700 font-semibold dark:text-yellow-400';
    return 'text-gray-700 font-semibold dark:text-gray-400';
  };

  const getExamTypeColor = (examType) => {
    switch (examType) {
      case 'Midterm 1':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Midterm 2':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Final Exam':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <div className="min-h-screen  from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Academic Results
            </h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Subjects</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{summary.totalSubjects}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Average Marks</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{summary.averageMarks}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Credits</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{summary.totalCredits}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          {/* Filter Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Filter Results</h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Primary Filters - Year, Semester, Exam Type */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">
              Primary Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Academic Year
                </label>
                <div className="relative">
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">All Years</option>
                    {filterOptions.years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {filters.year && (
                    <button
                      onClick={() => clearSpecificFilter('year')}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Semester Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Semester
                </label>
                <div className="relative">
                  <select
                    value={filters.semester}
                    onChange={(e) => handleFilterChange('semester', e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">All Semesters</option>
                    {filterOptions.semesters.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                  {filters.semester && (
                    <button
                      onClick={() => clearSpecificFilter('semester')}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Exam Type Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Exam Type
                </label>
                <div className="relative">
                  <select
                    value={filters.examType}
                    onChange={(e) => handleFilterChange('examType', e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">All Exam Types</option>
                    {filterOptions.examTypes.map(examType => (
                      <option key={examType} value={examType}>{examType}</option>
                    ))}
                  </select>
                  {filters.examType && (
                    <button
                      onClick={() => clearSpecificFilter('examType')}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="p-6">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">
              Additional Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Search Subjects
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by subject name or grade..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {filters.searchTerm && (
                    <button
                      onClick={() => clearSpecificFilter('searchTerm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Course Filter */}
              
                
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Filters:</span>
                {filters.year && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                    Year: {filters.year}
                    <button
                      onClick={() => clearSpecificFilter('year')}
                      className="ml-1 hover:text-blue-600 dark:hover:text-blue-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.semester && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm">
                    Semester: {filters.semester}
                    <button
                      onClick={() => clearSpecificFilter('semester')}
                      className="ml-1 hover:text-green-600 dark:hover:text-green-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.examType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm">
                    Exam: {filters.examType}
                    <button
                      onClick={() => clearSpecificFilter('examType')}
                      className="ml-1 hover:text-purple-600 dark:hover:text-purple-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.course && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-sm">
                    Course: {filters.course}
                    <button
                      onClick={() => clearSpecificFilter('course')}
                      className="ml-1 hover:text-orange-600 dark:hover:text-orange-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-sm">
                    Search: "{filters.searchTerm}"
                    <button
                      onClick={() => clearSpecificFilter('searchTerm')}
                      className="ml-1 hover:text-yellow-600 dark:hover:text-yellow-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={downloadResults}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Results
            </button>
          </div>
        </div>

        {/* Results Cards */}
        <div className="space-y-6">
          {Object.keys(groupedResults).length > 0 ? (
            Object.entries(groupedResults).map(([year, semesters]) => (
              <div key={year} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    {year}
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {Object.entries(semesters).map(([semester, examTypes]) => (
                    <div key={`${year}-${semester}`} className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-700/50 px-4 py-3 border-b border-slate-200 dark:border-slate-600">
                        <h3 className="font-medium text-slate-800 dark:text-slate-200">{semester}</h3>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        {Object.entries(examTypes).map(([examType, results]) => {
                          const key = `${year}-${semester}-${examType}`;
                          const isExpanded = expandedItems[key];
                          
                          return (
                            <div key={key} className="border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
                              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30">
                                <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getExamTypeColor(examType)}`}>
                                    {examType}
                                  </span>
                                  <span className="text-sm text-slate-600 dark:text-slate-400">
                                    {results.length} subject{results.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                
                                <button
                                  onClick={() => toggleExpanded(key)}
                                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  View
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              
                              {isExpanded && (
                                <div>
                                  {/* Download button for specific exam type */}
                                  <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 flex justify-end">
                                    <button
                                      onClick={() => downloadSpecificResults(results, `${year}_${semester}_${examType}`)}
                                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                      <Download className="w-4 h-4" />
                                      Download {examType}
                                    </button>
                                  </div>
                                  
                                  <div className="overflow-x-auto">
                                    <table className="w-full">
                                      <thead className="bg-slate-100 dark:bg-slate-700">
                                        <tr>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Subject
                                          </th>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Marks
                                          </th>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Percentage
                                          </th>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Grade
                                          </th>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Credits
                                          </th>
                                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Status
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                                        {results.map((result) => (
                                          <tr key={result.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                            <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                                              {result.subject}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                                              {result.marks}/{result.totalMarks}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                                              {Math.round((result.marks / result.totalMarks * 100) * 10) / 10}%
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                              <span className={getGradeColor(result.grade)}>
                                                {result.grade}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                                              {result.credits}
                                            </td>
                                            <td className="px-4 py-3">
                                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                                                {result.status}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-4">No results found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;