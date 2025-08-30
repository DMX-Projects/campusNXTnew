import React, { useState } from 'react';
import { Plus, Award, TrendingUp, Users, BarChart3 } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockResults, mockStudents, mockExams, Result } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>(mockResults);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const resultFormConfig = {
    title: 'Result Information',
    fields: [
      { name: 'studentId', type: 'select', label: 'Student', required: true, options: mockStudents.map(s => s.id) },
      { name: 'examId', type: 'select', label: 'Exam', required: true, options: mockExams.map(e => e.id) },
      { name: 'marksObtained', type: 'number', label: 'Marks Obtained', required: true, min: 0 },
      { name: 'grade', type: 'select', label: 'Grade', required: true, options: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'] },
      { name: 'remarks', type: 'textarea', label: 'Remarks' },
    ]
  };

  const columns = [
    { 
      key: 'studentId', 
      label: 'Student', 
      sortable: true,
      render: (value: string) => {
        const student = mockStudents.find(s => s.id === value);
        return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
      }
    },
    { 
      key: 'examId', 
      label: 'Exam', 
      render: (value: string) => {
        const exam = mockExams.find(e => e.id === value);
        return exam ? exam.name : 'Unknown';
      }
    },
    { 
      key: 'marksObtained', 
      label: 'Marks', 
      sortable: true,
      render: (value: number, row: Result) => {
        const exam = mockExams.find(e => e.id === row.examId);
        const totalMarks = exam ? exam.totalMarks : 100;
        const percentage = ((value / totalMarks) * 100).toFixed(1);
        return (
          <div>
            <span className="font-semibold">{value}/{totalMarks}</span>
            <span className="text-sm text-gray-500 ml-2">({percentage}%)</span>
          </div>
        );
      }
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
    { key: 'remarks', label: 'Remarks' },
  ];

  const handleAddResult = (resultData: any) => {
    const newResult: Result = {
      ...resultData,
      id: `RES${String(results.length + 1).padStart(3, '0')}`,
    };
    setResults(prev => [...prev, newResult]);
    setShowAddModal(false);
  };

  const handleEditResult = (resultData: any) => {
    if (selectedResult) {
      setResults(prev => prev.map(result => 
        result.id === selectedResult.id ? { ...result, ...resultData } : result
      ));
      setShowEditModal(false);
      setSelectedResult(null);
    }
  };

  const handleDeleteResult = (result: Result) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      setResults(prev => prev.filter(r => r.id !== result.id));
    }
  };

  const handleEditClick = (result: Result) => {
    setSelectedResult(result);
    setShowEditModal(true);
  };

  // Calculate statistics
  const gradeDistribution = [
    { grade: 'A+', count: results.filter(r => r.grade === 'A+').length, color: '#10B981' },
    { grade: 'A', count: results.filter(r => r.grade === 'A').length, color: '#3B82F6' },
    { grade: 'B+', count: results.filter(r => r.grade === 'B+').length, color: '#F59E0B' },
    { grade: 'B', count: results.filter(r => r.grade === 'B').length, color: '#EF4444' },
    { grade: 'C+', count: results.filter(r => r.grade === 'C+').length, color: '#8B5CF6' },
    { grade: 'C', count: results.filter(r => r.grade === 'C').length, color: '#6B7280' },
  ];

  const performanceData = mockStudents.map(student => {
    const studentResults = results.filter(r => r.studentId === student.id);
    const avgMarks = studentResults.length > 0 
      ? studentResults.reduce((sum, r) => sum + r.marksObtained, 0) / studentResults.length 
      : 0;
    
    return {
      name: `${student.firstName} ${student.lastName}`,
      marks: Math.round(avgMarks),
      department: student.department
    };
  });

  const stats = [
    {
      title: 'Total Results',
      value: results.length.toString(),
      icon: Award,
      color: 'bg-blue-500',
      change: '+12'
    },
    {
      title: 'Average Score',
      value: results.length > 0 ? `${(results.reduce((sum, r) => sum + r.marksObtained, 0) / results.length).toFixed(1)}%` : '0%',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+2.5%'
    },
    {
      title: 'Pass Rate',
      value: `${results.length > 0 ? ((results.filter(r => !r.grade.includes('F')).length / results.length) * 100).toFixed(1) : 0}%`,
      icon: Users,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Top Performers',
      value: results.filter(r => r.grade.startsWith('A')).length.toString(),
      icon: BarChart3,
      color: 'bg-orange-500',
      change: '+3'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Results Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage examination results and grades
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Result</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
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

        {/* Student Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Student Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="marks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results Table */}
      <DataTable
        data={results}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteResult}
        searchable={true}
        exportable={true}
      />

      {/* Add Result Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Result"
        size="lg"
      >
        <Form
          config={resultFormConfig}
          onSubmit={handleAddResult}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Result Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Result"
        size="lg"
      >
        {selectedResult && (
          <Form
            config={resultFormConfig}
            initialData={selectedResult}
            onSubmit={handleEditResult}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedResult(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ResultsPage;