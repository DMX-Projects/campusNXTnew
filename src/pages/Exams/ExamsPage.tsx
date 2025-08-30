import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, FileText, CheckCircle } from 'lucide-react';
import DataTable from '../../components/Common/DataTable';
import Modal from '../../components/Common/Modal';
import Form from '../../components/Common/Form';
import { mockExams, mockCourses, Exam } from '../../data/mockData';

const ExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const examFormConfig = {
    title: 'Exam Information',
    fields: [
      { name: 'name', type: 'text', label: 'Exam Name', required: true },
      { name: 'courseId', type: 'select', label: 'Course', required: true, options: mockCourses.map(c => c.id) },
      { name: 'date', type: 'date', label: 'Exam Date', required: true },
      { name: 'time', type: 'time', label: 'Start Time', required: true },
      { name: 'duration', type: 'number', label: 'Duration (minutes)', required: true, min: 30, max: 300 },
      { name: 'venue', type: 'text', label: 'Venue', required: true },
      { name: 'totalMarks', type: 'number', label: 'Total Marks', required: true, min: 1 },
      { name: 'examType', type: 'select', label: 'Exam Type', required: true, options: ['Mid-term', 'End-term', 'Quiz', 'Assignment'] },
    ]
  };

  const columns = [
    { key: 'id', label: 'Exam ID', sortable: true },
    { key: 'name', label: 'Exam Name', sortable: true },
    { 
      key: 'courseId', 
      label: 'Course', 
      render: (value: string) => {
        const course = mockCourses.find(c => c.id === value);
        return course ? `${course.code} - ${course.name}` : 'Unknown';
      }
    },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time', sortable: true },
    { 
      key: 'duration', 
      label: 'Duration', 
      render: (value: number) => `${value} mins`
    },
    { key: 'venue', label: 'Venue', sortable: true },
    { 
      key: 'totalMarks', 
      label: 'Total Marks', 
      sortable: true,
      render: (value: number) => `${value} marks`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          value === 'Ongoing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddExam = (examData: any) => {
    const newExam: Exam = {
      ...examData,
      id: `EXM${String(exams.length + 1).padStart(3, '0')}`,
      status: 'Scheduled',
    };
    setExams(prev => [...prev, newExam]);
    setShowAddModal(false);
  };

  const handleEditExam = (examData: any) => {
    if (selectedExam) {
      setExams(prev => prev.map(exam => 
        exam.id === selectedExam.id ? { ...exam, ...examData } : exam
      ));
      setShowEditModal(false);
      setSelectedExam(null);
    }
  };

  const handleDeleteExam = (exam: Exam) => {
    if (window.confirm(`Are you sure you want to delete ${exam.name}?`)) {
      setExams(prev => prev.filter(e => e.id !== exam.id));
    }
  };

  const handleEditClick = (exam: Exam) => {
    setSelectedExam(exam);
    setShowEditModal(true);
  };

  const stats = [
    {
      title: 'Total Exams',
      value: exams.length.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      change: '+3'
    },
    {
      title: 'Scheduled',
      value: exams.filter(e => e.status === 'Scheduled').length.toString(),
      icon: Calendar,
      color: 'bg-yellow-500',
      change: '+2'
    },
    {
      title: 'Completed',
      value: exams.filter(e => e.status === 'Completed').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+1'
    },
    {
      title: 'This Week',
      value: '5',
      icon: Clock,
      color: 'bg-purple-500',
      change: '+2'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Examination Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Schedule and manage examinations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Exam</span>
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

      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => {
          const course = mockCourses.find(c => c.id === exam.courseId);
          return (
            <div key={exam.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exam.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exam.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    exam.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {exam.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {course ? course.name : 'Unknown Course'}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{exam.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{exam.time} ({exam.duration} mins)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{exam.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{exam.totalMarks} marks</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={() => handleEditClick(exam)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExam(exam)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exams Table */}
      <DataTable
        data={exams}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteExam}
        searchable={true}
        exportable={true}
      />

      {/* Add Exam Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Schedule New Exam"
        size="lg"
      >
        <Form
          config={examFormConfig}
          onSubmit={handleAddExam}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Exam Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Exam"
        size="lg"
      >
        {selectedExam && (
          <Form
            config={examFormConfig}
            initialData={selectedExam}
            onSubmit={handleEditExam}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedExam(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExamsPage;