import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Upload, Plus, Edit, Eye, Trash2, Send, Printer, Calculator, BookOpen, Users, TrendingUp, Award, FileSpreadsheet, AlertCircle, Check, X, Calendar, User, GraduationCap, ChevronDown, ChevronUp, BarChart3, PieChart, RefreshCw, Settings, Mail, FileText, Star, Clock, LogOut, UserCheck } from 'lucide-react';

const ExamResultsPage = () => {
  // Faculty Authentication State
  const [currentFaculty] = useState({
    id: 'FAC001',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering'],
    email: 'sarah.johnson@university.edu',
    role: 'Professor'
  });

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedExamType, setSelectedExamType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showGradeCalculator, setShowGradeCalculator] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedResults, setSelectedResults] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // Form states
  const [newResult, setNewResult] = useState({
    rollNo: '', name: '', subject: '', semester: '', year: '', examType: '', date: '',
    marksObtained: '', totalMarks: '', remarks: ''
  });
  const [editResult, setEditResult] = useState({
    rollNo: '', name: '', subject: '', semester: '', year: '', examType: '', date: '',
    marksObtained: '', totalMarks: '', remarks: ''
  });
  const [calculatorState, setCalculatorState] = useState({
    marksObtained: '', totalMarks: '', percentage: 0, grade: ''
  });

  // Sample data - Only results for current faculty's subjects and department
  const [examResults, setExamResults] = useState([
    { 
      id: 1, rollNo: 'CS2021001', name: 'John Doe', subject: 'Data Structures', 
      semester: '3', year: '2023-24', department: 'Computer Science', examType: 'Final', 
      date: '2024-12-15', marksObtained: 85, totalMarks: 100, 
      status: 'Pass', remarks: 'Excellent performance', attendance: 'Present',
      submissionTime: '10:30 AM', duration: '2 hours', facultyId: 'FAC001'
    },
    { 
      id: 2, rollNo: 'CS2022002', name: 'Jane Smith', subject: 'Algorithms', 
      semester: '4', year: '2023-24', department: 'Computer Science', examType: 'Midterm', 
      date: '2024-11-20', marksObtained: 72, totalMarks: 100, 
      status: 'Pass', remarks: 'Good effort', attendance: 'Present',
      submissionTime: '10:45 AM', duration: '2 hours', facultyId: 'FAC001'
    },
    { 
      id: 3, rollNo: 'CS2021003', name: 'Mike Johnson', subject: 'Database Systems', 
      semester: '5', year: '2023-24', department: 'Computer Science', examType: 'Final', 
      date: '2024-12-15', marksObtained: 45, totalMarks: 100, 
      status: 'Fail', remarks: 'Needs improvement', attendance: 'Present',
      submissionTime: '11:20 AM', duration: '2 hours', facultyId: 'FAC001'
    },
    { 
      id: 4, rollNo: 'CS2022004', name: 'Sarah Wilson', subject: 'Software Engineering', 
      semester: '6', year: '2023-24', department: 'Computer Science', examType: 'Quiz', 
      date: '2024-12-10', marksObtained: 92, totalMarks: 100, 
      status: 'Pass', remarks: 'Outstanding', attendance: 'Present',
      submissionTime: '09:15 AM', duration: '1 hour', facultyId: 'FAC001'
    },
    { 
      id: 5, rollNo: 'CS2021005', name: 'Tom Brown', subject: 'Data Structures', 
      semester: '3', year: '2023-24', department: 'Computer Science', examType: 'Assignment', 
      date: '2024-12-05', marksObtained: 0, totalMarks: 100, 
      status: 'Absent', remarks: 'Absent from exam', attendance: 'Absent',
      submissionTime: '-', duration: '-', facultyId: 'FAC001'
    },
    { 
      id: 6, rollNo: 'CS2023006', name: 'Emily Davis', subject: 'Algorithms', 
      semester: '4', year: '2024-25', department: 'Computer Science', examType: 'Final', 
      date: '2024-12-18', marksObtained: 78, totalMarks: 100, 
      status: 'Pass', remarks: 'Satisfactory', attendance: 'Present',
      submissionTime: '10:00 AM', duration: '3 hours', facultyId: 'FAC001'
    },
    { 
      id: 7, rollNo: 'CS2022007', name: 'David Lee', subject: 'Database Systems', 
      semester: '5', year: '2023-24', department: 'Computer Science', examType: 'Practical', 
      date: '2024-12-12', marksObtained: 88, totalMarks: 100, 
      status: 'Pass', remarks: 'Very good practical skills', attendance: 'Present',
      submissionTime: '02:30 PM', duration: '3 hours', facultyId: 'FAC001'
    },
    { 
      id: 8, rollNo: 'CS2023008', name: 'Lisa Wang', subject: 'Software Engineering', 
      semester: '6', year: '2024-25', department: 'Computer Science', examType: 'Midterm', 
      date: '2024-11-22', marksObtained: 95, totalMarks: 100, 
      status: 'Pass', remarks: 'Exceptional work', attendance: 'Present',
      submissionTime: '09:45 AM', duration: '2 hours', facultyId: 'FAC001'
    }
  ]);

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const academicYears = ['2022-23', '2023-24', '2024-25'];
  const examTypes = ['Final', 'Midterm', 'Quiz', 'Assignment', 'Practical'];

  // Filter results to only show current faculty's subjects and department
  const facultyResults = useMemo(() => {
    return examResults.filter(result => 
      result.facultyId === currentFaculty.id && 
      result.department === currentFaculty.department &&
      currentFaculty.subjects.includes(result.subject)
    );
  }, [examResults, currentFaculty]);

  // Filtered and sorted results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = facultyResults.filter(result => {
      const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           result.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || result.subject === selectedSubject;
      const matchesSemester = selectedSemester === 'all' || result.semester === selectedSemester;
      const matchesYear = selectedYear === 'all' || result.year === selectedYear;
      const matchesExamType = selectedExamType === 'all' || result.examType === selectedExamType;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const resultDate = new Date(result.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDateRange = resultDate >= startDate && resultDate <= endDate;
      }
      
      return matchesSearch && matchesSubject && matchesSemester && matchesYear && matchesExamType && matchesDateRange;
    });

    // Sort results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'marksObtained' || sortField === 'totalMarks') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [facultyResults, searchTerm, selectedSubject, selectedSemester, selectedYear, selectedExamType, dateRange, sortField, sortDirection]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return filteredAndSortedResults.slice(startIndex, startIndex + resultsPerPage);
  }, [filteredAndSortedResults, currentPage, resultsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedResults.length / resultsPerPage);

  // Statistics calculations for faculty's subjects only
  const statistics = useMemo(() => {
    const total = facultyResults.length;
    const published = facultyResults.filter(r => r.status !== 'Pending').length;
    const passed = facultyResults.filter(r => r.status === 'Pass').length;
    const failed = facultyResults.filter(r => r.status === 'Fail').length;
    const absent = facultyResults.filter(r => r.status === 'Absent').length;
    const avgScore = facultyResults.length > 0 ? 
      facultyResults.filter(r => r.status !== 'Absent').reduce((sum, r) => sum + (r.marksObtained / r.totalMarks * 100), 0) / 
      facultyResults.filter(r => r.status !== 'Absent').length : 0;
    const passRate = total > 0 ? (passed / total * 100).toFixed(1) : '0';

    return { total, published, passed, failed, absent, avgScore: avgScore.toFixed(1), passRate };
  }, [facultyResults]);

  // Grade calculation function
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500', bgColor: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', bgColor: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', bgColor: 'bg-yellow-50' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-500', bgColor: 'bg-orange-50' };
    return { grade: 'F', color: 'text-red-500', bgColor: 'bg-red-50' };
  };

  // Handler functions
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectResult = (id) => {
    setSelectedResults(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedResults.length === paginatedResults.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(paginatedResults.map(r => r.id));
    }
  };

  const handleAddResult = () => {
    const newId = Math.max(...examResults.map(r => r.id)) + 1;
    const percentage = (newResult.marksObtained / newResult.totalMarks) * 100;
    const status = percentage >= 50 ? 'Pass' : 'Fail';
    
    setExamResults(prev => [...prev, {
      id: newId,
      ...newResult,
      marksObtained: Number(newResult.marksObtained),
      totalMarks: Number(newResult.totalMarks),
      status,
      attendance: 'Present',
      submissionTime: new Date().toLocaleTimeString(),
      duration: '2 hours',
      facultyId: currentFaculty.id,
      department: currentFaculty.department
    }]);
    
    setNewResult({ rollNo: '', name: '', subject: '', semester: '', year: '', examType: '', date: '', marksObtained: '', totalMarks: '', remarks: '' });
    setShowAddModal(false);
    alert('Result added successfully!');
  };

  const handleEditResult = (student) => {
    setSelectedStudent(student);
    setEditResult({
      rollNo: student.rollNo,
      name: student.name,
      subject: student.subject,
      semester: student.semester,
      year: student.year,
      examType: student.examType,
      date: student.date,
      marksObtained: student.marksObtained.toString(),
      totalMarks: student.totalMarks.toString(),
      remarks: student.remarks
    });
    setShowEditModal(true);
  };

  const handleUpdateResult = () => {
    const percentage = (editResult.marksObtained / editResult.totalMarks) * 100;
    const status = percentage >= 50 ? 'Pass' : 'Fail';
    
    setExamResults(prev => prev.map(r => 
      r.id === selectedStudent.id ? {
        ...r,
        ...editResult,
        marksObtained: Number(editResult.marksObtained),
        totalMarks: Number(editResult.totalMarks),
        status
      } : r
    ));
    
    setShowEditModal(false);
    setSelectedStudent(null);
    alert('Result updated successfully!');
  };

  const handleDeleteResult = (id) => {
    if (confirm('Are you sure you want to delete this result?')) {
      setExamResults(prev => prev.filter(r => r.id !== id));
      setSelectedResults(prev => prev.filter(x => x !== id));
      alert('Result deleted successfully!');
    }
  };

  const handleBulkDelete = () => {
    if (selectedResults.length === 0) {
      alert('Please select results to delete');
      return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedResults.length} selected results?`)) {
      setExamResults(prev => prev.filter(r => !selectedResults.includes(r.id)));
      setSelectedResults([]);
      alert(`${selectedResults.length} results deleted successfully!`);
    }
  };

  const handleBulkUpload = () => setShowBulkUpload(true);
  const handleExport = (format) => {
    setShowExportMenu(false);
    alert(`Exporting ${filteredAndSortedResults.length} results in ${format} format...`);
  };
  const handlePublishResults = () => alert('Results published successfully!');
  const handleSendNotifications = () => alert('Notifications sent to students!');
  const handlePrint = () => window.print();

  const calculateGradeInCalculator = () => {
    const { marksObtained, totalMarks } = calculatorState;
    if (marksObtained && totalMarks && Number(totalMarks) > 0) {
      const percentage = (Number(marksObtained) / Number(totalMarks)) * 100;
      const gradeInfo = calculateGrade(percentage);
      setCalculatorState(prev => ({
        ...prev,
        percentage: percentage.toFixed(2),
        grade: gradeInfo.grade
      }));
    } else {
      setCalculatorState(prev => ({ ...prev, percentage: 0, grade: '' }));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Faculty Header Section */}
      <div className="mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{currentFaculty.name}</h2>
                <p className="text-sm text-gray-600">{currentFaculty.role} • {currentFaculty.department} Department</p>
                <p className="text-xs text-gray-500">{currentFaculty.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-600">Subjects Teaching:</p>
                <p className="text-sm font-medium text-gray-800">{currentFaculty.subjects.length} subjects</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">My Exam Results</h1>
            <p className="text-gray-600">Manage results for your subjects in {currentFaculty.department} Department</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Subjects</p>
              <p className="text-2xl font-bold text-gray-800">{currentFaculty.subjects.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.avgScore}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.passRate}%</p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl font-bold text-green-600">{statistics.passed}</p>
            </div>
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{statistics.failed}</p>
            </div>
            <X className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filter & Search Panel */}
      {showFilters && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll no..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All My Subjects</option>
              {currentFaculty.subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="all">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Academic Years</option>
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              <option value="all">All Exam Types</option>
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">From:</label>
              <input
                type="date"
                className="px-3 py-2 border rounded-lg text-sm"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">To:</label>
              <input
                type="date"
                className="px-3 py-2 border rounded-lg text-sm"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedSemester('all');
                setSelectedYear('all');
                setSelectedExamType('all');
                setDateRange({ start: '', end: '' });
              }}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons Panel */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Result</span>
          </button>
          
          <button 
            onClick={handleBulkUpload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Bulk Upload</span>
          </button>
          
          <button 
            onClick={handlePublishResults}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Publish Results</span>
          </button>
          
          <button 
            onClick={handleSendNotifications}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Send Notifications</span>
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showExportMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-32">
                <button onClick={() => handleExport('PDF')} className="w-full px-4 py-2 text-left hover:bg-gray-50">PDF</button>
                <button onClick={() => handleExport('Excel')} className="w-full px-4 py-2 text-left hover:bg-gray-50">Excel</button>
                <button onClick={() => handleExport('CSV')} className="w-full px-4 py-2 text-left hover:bg-gray-50">CSV</button>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowGradeCalculator(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {selectedResults.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete Selected ({selectedResults.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">
              Showing {filteredAndSortedResults.length} of {facultyResults.length} results
            </h3>
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • {selectedResults.length} selected
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select 
              value={resultsPerPage}
              onChange={(e) => {
                setResultsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1 border rounded text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Results Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedResults.length === paginatedResults.length && paginatedResults.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('rollNo')}
                >
                  <div className="flex items-center gap-1">
                    Roll No
                    {sortField === 'rollNo' && (sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Student Name
                    {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">Semester</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">Academic Year</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">Exam Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">Date</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('marksObtained')}
                >
                  <div className="flex items-center gap-1">
                    Marks
                    {sortField === 'marksObtained' && (sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden xl:table-cell">Remarks</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedResults.map((result) => {
                const percentage = result.status !== 'Absent' ? (result.marksObtained / result.totalMarks * 100) : 0;
                const gradeInfo = calculateGrade(percentage);
                
                return (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input 
                        type="checkbox" 
                        checked={selectedResults.includes(result.id)}
                        onChange={() => handleSelectResult(result.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{result.rollNo}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-800">{result.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        {result.subject}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Sem {result.semester}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {result.year}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {result.examType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      <div className="space-y-1">
                        <div>{result.marksObtained}/{result.totalMarks}</div>
                        <div className="text-xs text-gray-500">({percentage.toFixed(1)}%)</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${gradeInfo.bgColor} ${gradeInfo.color}`}>
                        {result.status !== 'Absent' ? gradeInfo.grade : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        result.status === 'Pass' ? 'bg-green-100 text-green-800' :
                        result.status === 'Fail' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden xl:table-cell max-w-32 truncate">
                      {result.remarks}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEditResult(result)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit Result"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            alert(`Student: ${result.name}\nRoll No: ${result.rollNo}\nSubject: ${result.subject}\nSemester: ${result.semester}\nAcademic Year: ${result.year}\nMarks: ${result.marksObtained}/${result.totalMarks}\nGrade: ${result.status !== 'Absent' ? gradeInfo.grade : 'N/A'}\nStatus: ${result.status}\nSubmission Time: ${result.submissionTime}\nDuration: ${result.duration}\nRemarks: ${result.remarks}`);
                          }}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteResult(result.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Result"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredAndSortedResults.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * resultsPerPage) + 1} to {Math.min(currentPage * resultsPerPage, filteredAndSortedResults.length)} of {filteredAndSortedResults.length} results
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                First
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subject-wise Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Subject-wise Performance
          </h3>
          <div className="space-y-3">
            {currentFaculty.subjects.map(subject => {
              const subjectResults = facultyResults.filter(r => r.subject === subject);
              const passCount = subjectResults.filter(r => r.status === 'Pass').length;
              const passRate = subjectResults.length > 0 ? (passCount / subjectResults.length * 100).toFixed(1) : '0';
              
              return (
                <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{subject}</p>
                    <p className="text-sm text-gray-600">{subjectResults.length} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{passRate}%</p>
                    <p className="text-xs text-gray-500">Pass Rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Semester-wise Distribution
          </h3>
          <div className="space-y-3">
            {semesters.slice(0, 6).map(semester => {
              const semesterResults = facultyResults.filter(r => r.semester === semester);
              const count = semesterResults.length;
              
              return (
                <div key={semester} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-800">Semester {semester}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{count} students</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activities
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Plus className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">New result added for John Doe (CS2021001) - Data Structures</span>
            <span className="text-xs text-gray-500 ml-auto">2 mins ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Send className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-700">Results published for Algorithms Final Exam - Semester 4</span>
            <span className="text-xs text-gray-500 ml-auto">1 hour ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <Edit className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-gray-700">Grade updated for Sarah Wilson (CS2022004) - Software Engineering</span>
            <span className="text-xs text-gray-500 ml-auto">3 hours ago</span>
          </div>
        </div>
      </div>

      {/* Add Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Result</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g., CS2023001" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.rollNo}
                    onChange={(e) => setNewResult(prev => ({ ...prev, rollNo: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.name}
                    onChange={(e) => setNewResult(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.subject}
                    onChange={(e) => setNewResult(prev => ({ ...prev, subject: e.target.value }))}
                  >
                    <option value="">Select Subject</option>
                    {currentFaculty.subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.semester}
                    onChange={(e) => setNewResult(prev => ({ ...prev, semester: e.target.value }))}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.year}
                    onChange={(e) => setNewResult(prev => ({ ...prev, year: e.target.value }))}
                  >
                    <option value="">Select Year</option>
                    {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.examType}
                    onChange={(e) => setNewResult(prev => ({ ...prev, examType: e.target.value }))}
                  >
                    <option value="">Select Exam Type</option>
                    {examTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newResult.date}
                  onChange={(e) => setNewResult(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marks Obtained</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.marksObtained}
                    onChange={(e) => setNewResult(prev => ({ ...prev, marksObtained: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                  <input 
                    type="number" 
                    placeholder="100" 
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={newResult.totalMarks}
                    onChange={(e) => setNewResult(prev => ({ ...prev, totalMarks: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea 
                  placeholder="Additional notes or comments..." 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  rows="3"
                  value={newResult.remarks}
                  onChange={(e) => setNewResult(prev => ({ ...prev, remarks: e.target.value }))}
                ></textarea>
              </div>
              
              {newResult.marksObtained && newResult.totalMarks && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Percentage: <span className="font-semibold">{((newResult.marksObtained / newResult.totalMarks) * 100).toFixed(2)}%</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Grade: <span className="font-semibold">{calculateGrade((newResult.marksObtained / newResult.totalMarks) * 100).grade}</span>
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddResult}
                  disabled={!newResult.rollNo || !newResult.name || !newResult.subject || !newResult.semester || !newResult.year || !newResult.examType || !newResult.date || !newResult.marksObtained || !newResult.totalMarks}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Result - {selectedStudent.name}</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.rollNo}
                    onChange={(e) => setEditResult(prev => ({ ...prev, rollNo: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.name}
                    onChange={(e) => setEditResult(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.subject}
                    onChange={(e) => setEditResult(prev => ({ ...prev, subject: e.target.value }))}
                  >
                    <option value="">Select Subject</option>
                    {currentFaculty.subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.semester}
                    onChange={(e) => setEditResult(prev => ({ ...prev, semester: e.target.value }))}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.year}
                    onChange={(e) => setEditResult(prev => ({ ...prev, year: e.target.value }))}
                  >
                    <option value="">Select Year</option>
                    {academicYears.map(year => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.examType}
                    onChange={(e) => setEditResult(prev => ({ ...prev, examType: e.target.value }))}
                  >
                    <option value="">Select Exam Type</option>
                    {examTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={editResult.date}
                  onChange={(e) => setEditResult(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marks Obtained</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.marksObtained}
                    onChange={(e) => setEditResult(prev => ({ ...prev, marksObtained: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={editResult.totalMarks}
                    onChange={(e) => setEditResult(prev => ({ ...prev, totalMarks: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  rows="3"
                  value={editResult.remarks}
                  onChange={(e) => setEditResult(prev => ({ ...prev, remarks: e.target.value }))}
                ></textarea>
              </div>
              
              {editResult.marksObtained && editResult.totalMarks && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Percentage: <span className="font-semibold">{((editResult.marksObtained / editResult.totalMarks) * 100).toFixed(2)}%</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Grade: <span className="font-semibold">{calculateGrade((editResult.marksObtained / editResult.totalMarks) * 100).grade}</span>
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowEditModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateResult}
                  disabled={!editResult.rollNo || !editResult.name || !editResult.subject || !editResult.semester || !editResult.year || !editResult.examType || !editResult.date || !editResult.marksObtained || !editResult.totalMarks}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Bulk Upload Results</h3>
              <button 
                onClick={() => setShowBulkUpload(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drop your CSV or Excel file here, or</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose File
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• CSV or Excel (.xlsx, .xls) format</li>
                  <li>• Required columns: Roll No, Name, Subject, Semester, Academic Year, Exam Type, Date, Marks Obtained, Total Marks</li>
                  <li>• Optional columns: Remarks</li>
                  <li>• Subject must be one of your assigned subjects</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Download template started...')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Download Template
                </button>
                <button 
                  onClick={() => {
                    alert('Bulk upload completed! 25 results imported successfully.');
                    setShowBulkUpload(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Upload Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade Calculator Modal */}
      {showGradeCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Grade Calculator</h3>
              <button 
                onClick={() => setShowGradeCalculator(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marks Obtained</label>
                <input 
                  type="number" 
                  placeholder="Enter marks obtained" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={calculatorState.marksObtained}
                  onChange={(e) => setCalculatorState(prev => ({ ...prev, marksObtained: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                <input 
                  type="number" 
                  placeholder="Enter total marks" 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={calculatorState.totalMarks}
                  onChange={(e) => setCalculatorState(prev => ({ ...prev, totalMarks: e.target.value }))}
                />
              </div>
              
              <button 
                onClick={calculateGradeInCalculator}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Calculate Grade
              </button>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Percentage:</span>
                    <span className="font-semibold">{calculatorState.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Grade:</span>
                    <span className="font-semibold">{calculatorState.grade}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Grade Scale:</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between"><span>A+ (90-100%)</span><span>Excellent</span></div>
                    <div className="flex justify-between"><span>A (80-89%)</span><span>Very Good</span></div>
                    <div className="flex justify-between"><span>B (70-79%)</span><span>Good</span></div>
                    <div className="flex justify-between"><span>C (60-69%)</span><span>Satisfactory</span></div>
                    <div className="flex justify-between"><span>D (50-59%)</span><span>Pass</span></div>
                    <div className="flex justify-between"><span>F (0-49%)</span><span>Fail</span></div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setCalculatorState({ marksObtained: '', totalMarks: '', percentage: 0, grade: '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResultsPage;