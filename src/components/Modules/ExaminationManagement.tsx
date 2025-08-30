import React, { useState } from 'react';
import { Plus, Calendar, Users, ClipboardCheck, Award, Download, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { FORM_CONFIGS } from '../../data/formConfigs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ExaminationManagement: React.FC = () => {
  const [exams, setExams] = useState([
    { id: 'EX001', examName: 'Mid Semester Examination', examType: 'Mid-term', subject: 'Data Structures', department: 'Computer Science', year: 3, section: 'A', examDate: '2025-02-15', startTime: '10:00', duration: 180, totalMarks: 100, venue: 'Exam Hall 1', status: 'Scheduled' },
    { id: 'EX002', examName: 'Database Systems Quiz', examType: 'Surprise Test', subject: 'Database Systems', department: 'Computer Science', year: 3, section: 'A', examDate: '2025-01-20', startTime: '11:00', duration: 60, totalMarks: 50, venue: 'CS-103', status: 'Completed' }
  ]);
  
  const [results, setResults] = useState([
    { studentId: 'CS2023001', studentName: 'Alex Wilson', examId: 'EX002', subject: 'Database Systems', marks: 42, totalMarks: 50, grade: 'A', percentage: 84, status: 'Pass' },
    { studentId: 'CS2023002', studentName: 'Emma Johnson', examId: 'EX002', subject: 'Database Systems', marks: 38, totalMarks: 50, grade: 'B+', percentage: 76, status: 'Pass' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ClipboardCheck },
    { id: 'schedule', name: 'Exam Schedule', icon: Calendar },
    { id: 'seating', name: 'Seating Plan', icon: Users },
    { id: 'evaluation', name: 'Evaluation', icon: Award },
    { id: 'results', name: 'Results', icon: Award },
    { id: 'reports', name: 'Reports', icon: Download }
  ];

  const examColumns = [
    { key: 'id', label: 'Exam ID', sortable: true },
    { key: 'examName', label: 'Exam Name', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { 
      key: 'examDate', 
      label: 'Date & Time', 
      sortable: true,
      render: (value: string, item: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{item.startTime} ({item.duration} mins)</p>
        </div>
      )
    },
    { key: 'venue', label: 'Venue', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          value === 'Ongoing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          value === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const resultColumns = [
    { key: 'studentId', label: 'Student ID', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { 
      key: 'marks', 
      label: 'Marks', 
      sortable: true,
      render: (value: number, item: any) => `${value}/${item.totalMarks}`
    },
    { 
      key: 'percentage', 
      label: 'Percentage', 
      sortable: true,
      render: (value: number) => `${value}%`
    },
    { 
      key: 'grade', 
      label: 'Grade', 
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value.startsWith('A') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value.startsWith('B') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          value.startsWith('C') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Pass' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddExam = (examData: any) => {
    const newExam = {
      ...examData,
      id: `EX${String(exams.length + 1).padStart(3, '0')}`,
      status: 'Scheduled'
    };
    setExams(prev => [...prev, newExam]);
    setShowAddExamModal(false);
  };

  const gradeDistribution = [
    { grade: 'A+', count: 15, color: '#10B981' },
    { grade: 'A', count: 25, color: '#3B82F6' },
    { grade: 'B+', count: 20, color: '#F59E0B' },
    { grade: 'B', count: 12, color: '#EF4444' },
    { grade: 'C', count: 8, color: '#8B5CF6' },
    { grade: 'F', count: 3, color: '#6B7280' }
  ];

  const departmentPerformance = [
    { department: 'Computer Science', avgMarks: 78, passRate: 94 },
    { department: 'Electrical Engineering', avgMarks: 75, passRate: 91 },
    { department: 'Mechanical Engineering', avgMarks: 73, passRate: 89 },
    { department: 'Civil Engineering', avgMarks: 76, passRate: 92 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Examination Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive examination scheduling, evaluation, and result management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddExamModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Exam</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Generate Reports</span>
          </button>
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
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Exams</p>
                      <p className="text-3xl font-bold">{exams.length}</p>
                    </div>
                    <ClipboardCheck className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Completed</p>
                      <p className="text-3xl font-bold">{exams.filter(e => e.status === 'Completed').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Scheduled</p>
                      <p className="text-3xl font-bold">{exams.filter(e => e.status === 'Scheduled').length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Pass Rate</p>
                      <p className="text-3xl font-bold">94%</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="count"
                        label={({ grade, count }) => `${grade}: ${count}`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Department Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="department" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="avgMarks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Examination Schedule</h3>
                <button
                  onClick={() => setShowAddExamModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule New Exam</span>
                </button>
              </div>
              
              <DataTable
                data={exams}
                columns={examColumns}
                onEdit={(exam) => setSelectedExam(exam)}
                onDelete={(exam) => {
                  if (window.confirm(`Are you sure you want to delete ${exam.examName}?`)) {
                    setExams(prev => prev.filter(e => e.id !== exam.id));
                  }
                }}
                onView={(exam) => setSelectedExam(exam)}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'seating' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seating Arrangement</h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Select Exam</option>
                    {exams.map(exam => (
                      <option key={exam.id} value={exam.id}>{exam.examName}</option>
                    ))}
                  </select>
                  <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Select Venue</option>
                    <option>Exam Hall 1</option>
                    <option>Exam Hall 2</option>
                    <option>CS-101</option>
                    <option>CS-102</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Generate Seating Plan
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-2" />
                    <p>Select exam and venue to generate seating arrangement</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Examination Results</h3>
                <div className="flex items-center space-x-3">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Publish Results
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Generate Certificates
                  </button>
                </div>
              </div>
              
              <DataTable
                data={results}
                columns={resultColumns}
                searchable={true}
                exportable={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Exam Modal */}
      <Modal isOpen={showAddExamModal} onClose={() => setShowAddExamModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_EXAM}
          onSubmit={handleAddExam}
          onCancel={() => setShowAddExamModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ExaminationManagement;