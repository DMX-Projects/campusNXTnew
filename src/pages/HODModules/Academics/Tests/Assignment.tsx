import React, { useState } from 'react';
import {
  Plus,
  Eye,
  Edit,
  Save,
  X,
  FileText,
  Calendar,
  User,
  Award,
  Menu,
  Upload,
  File,
  Users,
  ArrowLeft
} from 'lucide-react';

const subjects = [
  'Computer Programming', 'Data Structures and Algorithms', 'Machine Learning',
  'Artificial Intelligence', 'Database Management Systems', 'Operating Systems',
  'Computer Networks', 'Web Technologies', 'Digital Electronics',
  'Communication Systems', 'VLSI Design', 'Embedded Systems',
  'Information Security', 'Cloud Computing', 'Research Methodology'
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const semesters = ['1st Semester', '2nd Semester'];

const programs = ['B.Tech CSE', 'M.Tech CSE', 'B.Tech IT', 'M.Tech IT', 'B.Tech ECE', 'M.Tech ECE'];

const assignmentsDemo = [
  {
    id: 1,
    title: 'Basics of C Programming',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-10',
    totalMarks: 50,
    description: 'Introduction to variables, loops, and control structures in C.',
    createdDate: '2024-10-15',
    questionPaper: 'c_programming_basics.pdf',
    questions: '1. Write a program to calculate factorial.\n2. Implement Fibonacci series.\n3. Demonstrate use of switch-case.'
  },
  {
    id: 2,
    title: 'Advanced Trees and Graphs',
    subject: 'Data Structures and Algorithms',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-12',
    totalMarks: 100,
    description: 'Implementation and analysis of advanced trees and graph algorithms.',
    createdDate: '2024-10-18',
    questionPaper: 'ds_algorithms.pdf',
    questions: '1. Implement AVL Tree.\n2. Perform BFS and DFS on a graph.\n3. Solve shortest path using Dijkstra\'s algorithm.'
  },
  {
    id: 3,
    title: 'Supervised Learning Models',
    subject: 'Machine Learning',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-12',
    totalMarks: 40,
    description: 'Introduction to regression and classification models.',
    createdDate: '2024-10-18',
    questionPaper: 'ml_supervised.pdf',
    questions: '1. Implement linear regression.\n2. Build a decision tree classifier.\n3. Evaluate accuracy using confusion matrix.'
  },
  {
    id: 4,
    title: 'AI Problem Solving',
    subject: 'Artificial Intelligence',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    dueDate: '2024-12-25',
    totalMarks: 60,
    description: 'Solve search-based and reasoning problems using AI techniques.',
    createdDate: '2024-11-12',
    questionPaper: 'ai_problems.pdf',
    questions: '1. Implement A* search.\n2. Solve 8-puzzle using BFS.\n3. Write knowledge representation using Prolog.'
  },
  {
    id: 5,
    title: 'Relational Databases',
    subject: 'Database Management Systems',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '2nd Semester',
    dueDate: '2025-01-20',
    totalMarks: 70,
    description: 'Normalization, indexing, and query optimization problems.',
    createdDate: '2024-11-28',
    questionPaper: 'dbms_assignment.pdf',
    questions: '1. Normalize to 3NF.\n2. Write SQL joins.\n3. Explain transaction isolation levels.'
  },
  {
    id: 6,
    title: 'Process Scheduling',
    subject: 'Operating Systems',
    program: 'M.Tech CSE',
    year: '2nd Year',
    semester: '2nd Semester',
    dueDate: '2024-12-20',
    totalMarks: 90,
    description: 'Design and analyze CPU scheduling algorithms.',
    createdDate: '2024-11-08',
    questionPaper: 'os_scheduling.pdf',
    questions: '1. Implement FCFS and SJF.\n2. Compare with Round Robin.\n3. Calculate average waiting times.'
  }
];

const submissionsDemo = [
  {
    id: 1,
    assignmentId: 1,
    studentName: 'Ravi Kumar',
    studentId: 'CS101',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-08',
    status: 'Graded',
    score: 45,
    maxScore: 50,
    feedback: 'Good coding practices and logic.',
    fileName: 'c_programming.c'
  },
  {
    id: 2,
    assignmentId: 2,
    studentName: 'Priya Sharma',
    studentId: 'MCS101',
    subject: 'Data Structures and Algorithms',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-10',
    status: 'Graded',
    score: 92,
    maxScore: 100,
    feedback: 'Efficient graph algorithms.',
    fileName: 'ds_algorithms.cpp'
  },
  {
    id: 3,
    assignmentId: 1,
    studentName: 'Amit Singh',
    studentId: 'CS102',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-09',
    status: 'Graded',
    score: 42,
    maxScore: 50,
    feedback: 'Good work, minor improvements needed.',
    fileName: 'c_programming.c'
  },
  {
    id: 4,
    assignmentId: 2,
    studentName: 'Neha Gupta',
    studentId: 'MCS102',
    subject: 'Data Structures and Algorithms',
    program: 'M.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-11',
    status: 'Submitted',
    score: null,
    maxScore: 100,
    feedback: null,
    fileName: 'ds_algorithms.cpp'
  },
  {
    id: 5,
    assignmentId: 3,
    studentName: 'Karan Mehta',
    studentId: 'CS103',
    subject: 'Machine Learning',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-12',
    status: 'Graded',
    score: 38,
    maxScore: 40,
    feedback: 'Excellent ML implementation.',
    fileName: 'ml_models.ipynb'
  },
  {
    id: 6,
    assignmentId: 1,
    studentName: 'Sonia Verma',
    studentId: 'CS104',
    subject: 'Computer Programming',
    program: 'B.Tech CSE',
    year: '1st Year',
    semester: '1st Semester',
    submittedDate: '2024-12-07',
    status: 'Graded',
    score: 48,
    maxScore: 50,
    feedback: 'Excellent implementation.',
    fileName: 'c_programming.c'
  }
];

function getStatusColor(status) {
  if (status === 'Submitted') return 'bg-blue-100 text-blue-800';
  if (status === 'Graded') return 'bg-green-100 text-green-800';
  if (status === 'Pending Review') return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
}

function getYearOrder(year) {
  const yearMap = { '1st Year': 1, '2nd Year': 2, '3rd Year': 3, '4th Year': 4 };
  return yearMap[year] || 0;
}

function getSemesterOrder(semester) {
  const semesterMap = { '1st Semester': 1, '2nd Semester': 2 };
  return semesterMap[semester] || 0;
}

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [viewingAssignmentSubmissions, setViewingAssignmentSubmissions] = useState(null);
  const [gradingSubmission, setGradingSubmission] = useState(null);

  const [assignments, setAssignments] = useState(assignmentsDemo);
  const [submissions, setSubmissions] = useState(submissionsDemo);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    program: '',
    year: '',
    semester: '',
    dueDate: '',
    totalMarks: '',
    description: '',
    questionPaper: null,
    questions: ''
  });

  const filteredSubmissions = submissions
    .filter(submission =>
      (!selectedSubject || submission.subject === selectedSubject) &&
      (!selectedYear || submission.year === selectedYear) &&
      (!selectedSemester || submission.semester === selectedSemester) &&
      (!selectedProgram || submission.program === selectedProgram)
    )
    .sort((a, b) => {
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      return a.subject.localeCompare(b.subject);
    });

  const groupedSubmissions = filteredSubmissions.reduce((acc, submission) => {
    const assignment = assignments.find(a => a.id === submission.assignmentId);
    if (assignment) {
      if (!acc[submission.assignmentId]) {
        acc[submission.assignmentId] = {
          assignment: assignment,
          submissions: []
        };
      }
      acc[submission.assignmentId].submissions.push(submission);
    }
    return acc;
  }, {});

  const filteredAssignments = assignments
    .filter(assignment =>
      (!selectedSubject || assignment.subject === selectedSubject) &&
      (!selectedYear || assignment.year === selectedYear) &&
      (!selectedSemester || assignment.semester === selectedSemester) &&
      (!selectedProgram || assignment.program === selectedProgram)
    )
    .sort((a, b) => {
      const yearA = getYearOrder(a.year);
      const yearB = getYearOrder(b.year);
      if (yearA !== yearB) return yearA - yearB;
      
      const semesterA = getSemesterOrder(a.semester);
      const semesterB = getSemesterOrder(b.semester);
      if (semesterA !== semesterB) return semesterA - semesterB;
      
      return a.subject.localeCompare(b.subject);
    });

  function handleAddAssignment() {
    if (newAssignment.title && newAssignment.subject && newAssignment.program && newAssignment.year && newAssignment.semester) {
      const assignment = {
        ...newAssignment,
        id: assignments.length + 1,
        totalMarks: parseInt(newAssignment.totalMarks),
        createdDate: new Date().toISOString().split('T')[0],
        questionPaper: newAssignment.questionPaper ? newAssignment.questionPaper.name : null
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({
        title: '',
        subject: '',
        program: '',
        year: '',
        semester: '',
        dueDate: '',
        totalMarks: '',
        description: '',
        questionPaper: null,
        questions: ''
      });
      setShowAddForm(false);
    }
  }

  function handleEditAssignment(assignment) {
    setEditingAssignment({ ...assignment });
  }

  function handleSaveEdit() {
    setAssignments(assignments.map(a =>
      a.id === editingAssignment.id ? editingAssignment : a
    ));
    setEditingAssignment(null);
  }

  function handleScoreUpdate(submissionId, newScore, feedback) {
    setSubmissions(submissions.map(sub =>
      sub.id === submissionId
        ? { ...sub, score: newScore, feedback, status: 'Graded' }
        : sub
    ));
  }

  function handleViewAssignmentSubmissions(assignmentId) {
    const assignment = assignments.find(a => a.id === assignmentId);
    const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignmentId);
    setViewingAssignmentSubmissions({ assignment, submissions: assignmentSubmissions });
  }

  function handleDeleteAssignment(assignmentId) {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    setSubmissions(submissions.filter(s => s.assignmentId !== assignmentId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setShowSidebar(true)} /> Online Test Management
        </h1>
      </div>

      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="bg-white dark:bg-slate-800 w-3/4 h-full p-6 flex flex-col gap-4">
            <button
              className="self-end mb-4 text-gray-700 dark:text-gray-300"
              onClick={() => setShowSidebar(false)}
            >
              <X className="w-7 h-7" />
            </button>
            
            <label className="block text-md text-gray-700 dark:text-gray-300">Year
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            <label className="block text-md text-gray-700 dark:text-gray-300">Semester
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Semesters</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </label>
            <label className="block text-md text-gray-700 dark:text-gray-300">Program
              <select 
                value={selectedProgram} 
                onChange={e => setSelectedProgram(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Programs</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
            <label className="block text-md text-gray-700 dark:text-gray-300">Subject
              <select 
                value={selectedSubject} 
                onChange={e => setSelectedSubject(e.target.value)}
                className="mt-2 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)}></div>
        </div>
      )}

      <div className="p-4 md:max-w-8xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-lg p-8 text-white mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Assignment Management</h1>
            <p className="text-lg text-indigo-100">Manage assignments and monitor student performance</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-4 rounded-lg mb-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
              <select 
                value={selectedYear} 
                onChange={e => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">All Semesters</option>
                {semesters.map(se => <option key={se} value={se}>{se}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program</label>
              <select 
                value={selectedProgram} 
                onChange={e => setSelectedProgram(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">All Programs</option>
                {programs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select 
                value={selectedSubject} 
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-3 font-medium text-md border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Test Submissions ({Object.keys(groupedSubmissions).length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-6 py-3 font-medium text-md border-b-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Tests ({filteredAssignments.length})
          </button>
        </div>

        <div>
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              {Object.entries(groupedSubmissions).map(([assignmentId, data]) => {
                const totalSubmissions = data.submissions.length;
                const gradedSubmissions = data.submissions.filter(s => s.status === 'Graded').length;
                const avgScore = data.submissions.filter(s => s.score !== null).reduce((sum, s) => sum + (s.score / s.maxScore * 100), 0) / data.submissions.filter(s => s.score !== null).length || 0;
                
                return (
                  <div key={assignmentId} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{data.assignment.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div><strong>Program:</strong> {data.assignment.program}</div>
                          <div><strong>Subject:</strong> {data.assignment.subject}</div>
                          <div><strong>Year:</strong> {data.assignment.year}</div>
                          <div><strong>Semester:</strong> {data.assignment.semester}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                          <Users className="w-4 h-4" />
                          <span className="text-xs font-medium">Total Submissions</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalSubmissions}</p>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                          <Award className="w-4 h-4" />
                          <span className="text-xs font-medium">Graded</span>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">{gradedSubmissions}</p>
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-1">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs font-medium">Pending</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{totalSubmissions - gradedSubmissions}</p>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                          <Award className="w-4 h-4" />
                          <span className="text-xs font-medium">Avg Score</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{avgScore.toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleViewAssignmentSubmissions(parseInt(assignmentId))}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View All Submissions ({totalSubmissions})
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Test Management</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Test
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAssignments.map(assignment => (
                  <div key={assignment.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-5">
                    {editingAssignment?.id === assignment.id ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          value={editingAssignment.title}
                          onChange={e => setEditingAssignment({...editingAssignment, title: e.target.value})}
                          placeholder="Title" 
                        />
                        
                        <select 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.program || ''}
                          onChange={e => setEditingAssignment({...editingAssignment, program: e.target.value})}
                        >
                          <option value="">Program</option>
                          {programs.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        
                        <select 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                          value={editingAssignment.subject}
                          onChange={e => setEditingAssignment({...editingAssignment, subject: e.target.value})}
                        >
                          <option value="">Subject</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                            value={editingAssignment.year}
                            onChange={e => setEditingAssignment({...editingAssignment, year: e.target.value})}
                          >
                            <option value="">Year</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                          
                          <select 
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                            value={editingAssignment.semester}
                            onChange={e => setEditingAssignment({...editingAssignment, semester: e.target.value})}
                          >
                            <option value="">Semester</option>
                            {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="date" 
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                            value={editingAssignment.dueDate}
                            onChange={e => setEditingAssignment({...editingAssignment, dueDate: e.target.value})}
                          />
                          
                          <input 
                            type="number" 
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                            value={editingAssignment.totalMarks}
                            onChange={e => setEditingAssignment({...editingAssignment, totalMarks: e.target.value})}
                            placeholder="Marks"
                          />
                        </div>
                        
                        <textarea 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          value={editingAssignment.description}
                          onChange={e => setEditingAssignment({...editingAssignment, description: e.target.value})}
                          placeholder="Description"
                          rows={2}
                        />
                        
                        <textarea 
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm" 
                          value={editingAssignment.questions}
                          onChange={e => setEditingAssignment({...editingAssignment, questions: e.target.value})}
                          placeholder="Questions"
                          rows={3}
                        />
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveEdit}
                            className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center justify-center gap-1"
                          >
                            <Save className="w-3 h-3" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingAssignment(null)}
                            className="flex-1 px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 flex items-center justify-center gap-1"
                          >
                            <X className="w-3 h-3" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">{assignment.title}</h3>
                          <div className="flex gap-1 ml-2">
                            <button 
                              onClick={() => setViewingAssignment(assignment)}
                              className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => handleEditAssignment(assignment)}
                              className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => handleDeleteAssignment(assignment.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                          <div><strong>Subject:</strong> {assignment.subject}</div>
                          <div><strong>Program:</strong> {assignment.program}</div>
                          <div><strong>Year:</strong> {assignment.year}</div>
                          <div><strong>Semester:</strong> {assignment.semester}</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{assignment.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>{assignment.totalMarks} marks</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewAssignmentSubmissions(assignment.id)}
                          className="w-full mt-3 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 flex items-center justify-center gap-1"
                        >
                          <Users className="w-3 h-3" />
                          View Submissions ({submissions.filter(s => s.assignmentId === assignment.id).length})
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Assignment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add New Test</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  value={newAssignment.title}
                  onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Assignment title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={newAssignment.program}
                    onChange={e => setNewAssignment({...newAssignment, program: e.target.value})}
                  >
                    <option value="">Select Program</option>
                    {programs.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={newAssignment.subject}
                    onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={newAssignment.year}
                    onChange={e => setNewAssignment({...newAssignment, year: e.target.value})}
                  >
                    <option value="">Select Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={newAssignment.semester}
                    onChange={e => setNewAssignment({...newAssignment, semester: e.target.value})}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map(se => <option key={se} value={se}>{se}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                    value={newAssignment.dueDate}
                    onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Marks</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                    value={newAssignment.totalMarks}
                    onChange={e => setNewAssignment({...newAssignment, totalMarks: e.target.value})}
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  value={newAssignment.description}
                  onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Assignment description"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Questions</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  value={newAssignment.questions}
                  onChange={e => setNewAssignment({...newAssignment, questions: e.target.value})}
                  placeholder="Enter questions (one per line)"
                  rows={5}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Paper (Optional)</label>
                <input 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  onChange={e => setNewAssignment({...newAssignment, questionPaper: e.target.files[0]})}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddAssignment}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Test
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Assignment Details Modal */}
      {viewingAssignment && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Assignment Details</h2>
              <button onClick={() => setViewingAssignment(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{viewingAssignment.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div><strong>Subject:</strong> {viewingAssignment.subject}</div>
                  <div><strong>Program:</strong> {viewingAssignment.program}</div>
                  <div><strong>Year:</strong> {viewingAssignment.year}</div>
                  <div><strong>Semester:</strong> {viewingAssignment.semester}</div>
                  <div><strong>Due Date:</strong> {viewingAssignment.dueDate}</div>
                  <div><strong>Total Marks:</strong> {viewingAssignment.totalMarks}</div>
                  <div><strong>Created:</strong> {viewingAssignment.createdDate}</div>
                  {viewingAssignment.questionPaper && (
                    <div><strong>Question Paper:</strong> {viewingAssignment.questionPaper}</div>
                  )}
                </div>
              </div>
              
              {viewingAssignment.description && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{viewingAssignment.description}</p>
                </div>
              )}
              
              {viewingAssignment.questions && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Questions</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{viewingAssignment.questions}</pre>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleViewAssignmentSubmissions(viewingAssignment.id)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                View Submissions ({submissions.filter(s => s.assignmentId === viewingAssignment.id).length})
              </button>
              <button
                onClick={() => setViewingAssignment(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Assignment Submissions Modal */}
      {viewingAssignmentSubmissions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Submissions for: {viewingAssignmentSubmissions.assignment.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{viewingAssignmentSubmissions.assignment.subject} - {viewingAssignmentSubmissions.assignment.program}</p>
              </div>
              <button onClick={() => setViewingAssignmentSubmissions(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Student</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">ID</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Submitted</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Status</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Score</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingAssignmentSubmissions.submissions.map(submission => (
                    <tr key={submission.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-3 text-gray-900 dark:text-gray-100">{submission.studentName}</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{submission.studentId}</td>
                      <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{submission.submittedDate}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-900 dark:text-gray-100">
                        {submission.score !== null ? `${submission.score}/${submission.maxScore}` : '-'}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setViewingSubmission(submission)}
                            className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setGradingSubmission(submission)}
                            className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewingAssignmentSubmissions(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Submission Details Modal */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Submission Details</h2>
              <button onClick={() => setViewingSubmission(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Student:</strong> {viewingSubmission.studentName}</div>
                <div><strong>Student ID:</strong> {viewingSubmission.studentId}</div>
                <div><strong>Subject:</strong> {viewingSubmission.subject}</div>
                <div><strong>Program:</strong> {viewingSubmission.program}</div>
                <div><strong>Submitted:</strong> {viewingSubmission.submittedDate}</div>
                <div><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingSubmission.status)}`}>
                    {viewingSubmission.status}
                  </span>
                </div>
              </div>
              
              {viewingSubmission.fileName && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{viewingSubmission.fileName}</span>
                  </div>
                </div>
              )}
              
              {viewingSubmission.score !== null && (
                <div>
                  <strong>Score:</strong> {viewingSubmission.score}/{viewingSubmission.maxScore} ({((viewingSubmission.score / viewingSubmission.maxScore) * 100).toFixed(1)}%)
                </div>
              )}
              
              {viewingSubmission.feedback && (
                <div>
                  <strong>Feedback:</strong>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{viewingSubmission.feedback}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setViewingSubmission(null);
                  setGradingSubmission(viewingSubmission);
                }}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> Grade Submission
              </button>
              <button
                onClick={() => setViewingSubmission(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Grade Submission</h2>
              <button onClick={() => setGradingSubmission(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Student:</strong> {gradingSubmission.studentName} ({gradingSubmission.studentId})
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Score (out of {gradingSubmission.maxScore})
                </label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  defaultValue={gradingSubmission.score || ''}
                  min="0"
                  max={gradingSubmission.maxScore}
                  onChange={e => setGradingSubmission({...gradingSubmission, score: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feedback</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
                  defaultValue={gradingSubmission.feedback || ''}
                  onChange={e => setGradingSubmission({...gradingSubmission, feedback: e.target.value})}
                  placeholder="Enter feedback for the student"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  handleScoreUpdate(gradingSubmission.id, gradingSubmission.score, gradingSubmission.feedback);
                  setGradingSubmission(null);
                }}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Grade
              </button>
              <button
                onClick={() => setGradingSubmission(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;
