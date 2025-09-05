// FacultyOnlineTest.tsx - COMPLETE CORRECTED VERSION
import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Users, Clock, BarChart3, CheckCircle, AlertCircle, Save, X } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'text' | 'numerical';
  options?: string[];
  correctAnswer: string | number;
  marks: number;
}

interface Test {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
  maxMarks: number;
  status: 'draft' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  attempts: number;
  avgScore: number;
  instructions: string;
}

const FacultyOnlineTest: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      title: 'Data Structures Quiz',
      subject: 'CS301',
      duration: 60,
      questions: [
        {
          id: '1',
          text: 'What is the time complexity of binary search?',
          type: 'mcq',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          correctAnswer: 1,
          marks: 2
        },
        {
          id: '2',
          text: 'What data structure uses LIFO principle?',
          type: 'text',
          correctAnswer: 'Stack',
          marks: 3
        }
      ],
      maxMarks: 40,
      status: 'active',
      startDate: '2025-09-05',
      endDate: '2025-09-06',
      attempts: 45,
      avgScore: 32.5,
      instructions: 'Answer all questions carefully'
    },
    {
      id: '2',
      title: 'Database Systems Test',
      subject: 'CS302',
      duration: 90,
      questions: [],
      maxMarks: 50,
      status: 'completed',
      startDate: '2025-08-20',
      endDate: '2025-08-21',
      attempts: 38,
      avgScore: 42.3,
      instructions: 'Read each question carefully before answering'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'tests' | 'create' | 'results'>('tests');
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    subject: '',
    duration: 60,
    instructions: '',
    startDate: '',
    endDate: ''
  });

  const [isCreating, setIsCreating] = useState(false);
  
  // New Test Form State
  const [newTest, setNewTest] = useState<Omit<Test, 'id' | 'attempts' | 'avgScore' | 'maxMarks'>>({
    title: '',
    subject: '',
    duration: 60,
    questions: [],
    status: 'draft',
    startDate: '',
    endDate: '',
    instructions: ''
  });

  // Question Form State
  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    text: '',
    type: 'mcq',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  // Subjects list
  const subjects = [
    { code: 'CS301', name: 'Data Structures' },
    { code: 'CS302', name: 'Database Systems' },
    { code: 'CS303', name: 'Operating Systems' }
  ];

  // Modal handlers
  const handleViewDetails = (test: Test) => {
    setSelectedTest(test);
    setShowViewModal(true);
  };

  const handleEditTest = (test: Test) => {
    setSelectedTest(test);
    setEditForm({
      title: test.title,
      subject: test.subject,
      duration: test.duration,
      instructions: test.instructions,
      startDate: test.startDate,
      endDate: test.endDate
    });
    setShowEditModal(true);
  };

  const handleViewReport = (test: Test) => {
    setSelectedTest(test);
    setShowReportModal(true);
  };

  const closeModal = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowReportModal(false);
    setSelectedTest(null);
    setEditForm({
      title: '',
      subject: '',
      duration: 60,
      instructions: '',
      startDate: '',
      endDate: ''
    });
  };

  // Handle edit form changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  // Update test
  const handleUpdateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    const updatedTest = {
      ...selectedTest,
      ...editForm
    };

    setTests(prev => prev.map(test => 
      test.id === selectedTest.id ? updatedTest : test
    ));
    closeModal();
    alert('Test updated successfully!');
  };

  // Handle new test form changes
  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTest(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  // Handle question form changes
  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: name === 'marks' ? parseInt(value) || 1 : value
    }));
  };

  // Handle option changes for MCQ questions
  const handleOptionChange = (index: number, value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt) || []
    }));
  };

  // Add/Update Question
  const saveQuestion = () => {
    if (!newQuestion.text.trim()) {
      alert('Please enter question text');
      return;
    }

    if (newQuestion.type === 'mcq' && !newQuestion.options?.some(opt => opt.trim())) {
      alert('Please enter at least one option');
      return;
    }

    if (!newQuestion.correctAnswer) {
      alert('Please enter correct answer');
      return;
    }

    const questionToSave: Question = {
      ...newQuestion,
      id: Date.now().toString(),
      correctAnswer: newQuestion.type === 'mcq' ? parseInt(newQuestion.correctAnswer as string) : newQuestion.correctAnswer
    };

    if (editingQuestionIndex !== null) {
      // Update existing question
      setNewTest(prev => ({
        ...prev,
        questions: prev.questions.map((q, index) => 
          index === editingQuestionIndex ? questionToSave : q
        )
      }));
      setEditingQuestionIndex(null);
    } else {
      // Add new question
      setNewTest(prev => ({
        ...prev,
        questions: [...prev.questions, questionToSave]
      }));
    }

    // Reset question form
    setNewQuestion({
      text: '',
      type: 'mcq',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1
    });
    setShowQuestionForm(false);
  };

  // Edit Question
  const editQuestion = (index: number) => {
    const question = newTest.questions[index];
    setNewQuestion({
      text: question.text,
      type: question.type,
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer.toString(),
      marks: question.marks
    });
    setEditingQuestionIndex(index);
    setShowQuestionForm(true);
  };

  // Delete Question
  const deleteQuestion = (index: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setNewTest(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  // Save Test
  const saveTest = () => {
    if (!newTest.title.trim()) {
      alert('Please enter test title');
      return;
    }
    if (!newTest.subject) {
      alert('Please select subject');
      return;
    }
    if (!newTest.startDate || !newTest.endDate) {
      alert('Please set test dates');
      return;
    }
    if (newTest.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    const maxMarks = newTest.questions.reduce((sum, q) => sum + q.marks, 0);
    const testToSave: Test = {
      ...newTest,
      id: Date.now().toString(),
      maxMarks,
      attempts: 0,
      avgScore: 0
    };

    setTests(prev => [...prev, testToSave]);
    
    // Reset form
    setNewTest({
      title: '',
      subject: '',
      duration: 60,
      questions: [],
      status: 'draft',
      startDate: '',
      endDate: '',
      instructions: ''
    });
    
    setIsCreating(false);
    setActiveTab('tests');
    alert('Test created successfully!');
  };

  // Cancel test creation
  const cancelTestCreation = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      setNewTest({
        title: '',
        subject: '',
        duration: 60,
        questions: [],
        status: 'draft',
        startDate: '',
        endDate: '',
        instructions: ''
      });
      setIsCreating(false);
      setShowQuestionForm(false);
      setActiveTab('tests');
    }
  };

  const stats = {
    total: tests.length,
    active: tests.filter(t => t.status === 'active').length,
    completed: tests.filter(t => t.status === 'completed').length,
    totalAttempts: tests.reduce((sum, t) => sum + t.attempts, 0)
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Online Tests</h1>
              <p className="text-sm sm:text-base text-gray-600">Create and manage online assessments</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsCreating(true);
              setActiveTab('create');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Create Test
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs sm:text-sm text-gray-600">Total Tests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-xs sm:text-sm text-gray-600">Active Tests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-xs sm:text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.totalAttempts}</div>
          <div className="text-xs sm:text-sm text-gray-600">Total Attempts</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'tests', label: 'My Tests', icon: <Eye className="w-4 h-4" /> },
            { id: 'create', label: isCreating ? 'Creating Test' : 'Create Test', icon: <Plus className="w-4 h-4" /> },
            { id: 'results', label: 'Results', icon: <BarChart3 className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {activeTab === 'tests' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {tests.map(test => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{test.title}</h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start ${
                      test.status === 'active' ? 'bg-green-100 text-green-800' :
                      test.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                    <div>Subject: <span className="font-medium">{test.subject}</span></div>
                    <div>Duration: <span className="font-medium">{test.duration} min</span></div>
                    <div>Questions: <span className="font-medium">{test.questions.length}</span></div>
                    <div>Max Marks: <span className="font-medium">{test.maxMarks}</span></div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 mb-4 space-y-1">
                    <div>Schedule: {new Date(test.startDate).toLocaleDateString()} - {new Date(test.endDate).toLocaleDateString()}</div>
                    {test.attempts > 0 && (
                      <div>Performance: {test.attempts} attempts • Avg: {test.avgScore.toFixed(1)}/{test.maxMarks}</div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={() => handleViewDetails(test)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEditTest(test)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </div>
                </div>
              ))}
              {tests.length === 0 && (
                <div className="col-span-2 text-center py-8 sm:py-12">
                  <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tests created yet. Click "Create Test" to get started.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Test</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={cancelTestCreation}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTest}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Test
                  </button>
                </div>
              </div>

              {/* Test Details Form */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Test Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newTest.title}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter test title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                    <select
                      name="subject"
                      value={newTest.subject}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(subject => (
                        <option key={subject.code} value={subject.code}>
                          {subject.code} - {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)*</label>
                    <input
                      type="number"
                      name="duration"
                      value={newTest.duration}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={newTest.startDate}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={newTest.endDate}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea
                    name="instructions"
                    value={newTest.instructions}
                    onChange={handleTestInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter test instructions for students..."
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Questions ({newTest.questions.length})
                    {newTest.questions.length > 0 && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        Total Marks: {newTest.questions.reduce((sum, q) => sum + q.marks, 0)}
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowQuestionForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>

                {/* Questions List */}
                {newTest.questions.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {newTest.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                Q{index + 1}
                              </span>
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {question.type.toUpperCase()}
                              </span>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                {question.marks} mark{question.marks > 1 ? 's' : ''}
                              </span>
                            </div>
                            <p className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{question.text}</p>
                            {question.type === 'mcq' && question.options && (
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className={`text-sm px-3 py-1 rounded ${
                                    optIndex === question.correctAnswer ? 'bg-green-100 text-green-800' : 'text-gray-600'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                    {optIndex === question.correctAnswer && ' ✓'}
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type !== 'mcq' && (
                              <div className="text-sm text-green-700">
                                Correct Answer: {question.correctAnswer}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editQuestion(index)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteQuestion(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p>No questions added yet. Click "Add Question" to start.</p>
                  </div>
                )}

                {/* Question Form Modal */}
                {showQuestionForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                      <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {editingQuestionIndex !== null ? 'Edit Question' : 'Add New Question'}
                          </h3>
                          <button
                            onClick={() => {
                              setShowQuestionForm(false);
                              setEditingQuestionIndex(null);
                              setNewQuestion({
                                text: '',
                                type: 'mcq',
                                options: ['', '', '', ''],
                                correctAnswer: '',
                                marks: 1
                              });
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Question Text*</label>
                          <textarea
                            name="text"
                            value={newQuestion.text}
                            onChange={handleQuestionInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Enter your question..."
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                            <select
                              name="type"
                              value={newQuestion.type}
                              onChange={handleQuestionInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              <option value="mcq">Multiple Choice</option>
                              <option value="text">Text Answer</option>
                              <option value="numerical">Numerical Answer</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
                            <input
                              type="number"
                              name="marks"
                              value={newQuestion.marks}
                              onChange={handleQuestionInputChange}
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>

                        {newQuestion.type === 'mcq' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                            <div className="space-y-2">
                              {newQuestion.options?.map((option, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <span className="text-sm font-medium text-gray-600 w-8">
                                    {String.fromCharCode(65 + index)}.
                                  </span>
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                              <select
                                name="correctAnswer"
                                value={newQuestion.correctAnswer}
                                onChange={handleQuestionInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              >
                                <option value="">Select correct option</option>
                                {newQuestion.options?.map((option, index) => (
                                  <option key={index} value={index}>
                                    {String.fromCharCode(65 + index)}. {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {(newQuestion.type === 'text' || newQuestion.type === 'numerical') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer*</label>
                            <input
                              type={newQuestion.type === 'numerical' ? 'number' : 'text'}
                              name="correctAnswer"
                              value={newQuestion.correctAnswer}
                              onChange={handleQuestionInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Enter the correct answer"
                            />
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                        <button
                          onClick={() => {
                            setShowQuestionForm(false);
                            setEditingQuestionIndex(null);
                            setNewQuestion({
                              text: '',
                              type: 'mcq',
                              options: ['', '', '', ''],
                              correctAnswer: '',
                              marks: 1
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveQuestion}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {editingQuestionIndex !== null ? 'Update Question' : 'Add Question'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Test Results & Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {tests.filter(t => t.attempts > 0).map(test => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-4">{test.title}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Attempts</span>
                        <span className="text-sm font-medium">{test.attempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Score</span>
                        <span className="text-sm font-medium">{test.avgScore.toFixed(1)}/{test.maxMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Success Rate</span>
                        <span className="text-sm font-medium">{((test.avgScore / test.maxMarks) * 100).toFixed(1)}%</span>
                      </div>
                      <button 
                        onClick={() => handleViewReport(test)}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4" />
                        View Detailed Report
                      </button>
                    </div>
                  </div>
                ))}
                {tests.filter(t => t.attempts > 0).length === 0 && (
                  <div className="col-span-3 text-center py-8 sm:py-12">
                    <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No test results available yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Test Details</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Test Information */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{selectedTest.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Subject:</span>
                    <p className="text-gray-900">{selectedTest.subject}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Duration:</span>
                    <p className="text-gray-900">{selectedTest.duration} minutes</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Total Questions:</span>
                    <p className="text-gray-900">{selectedTest.questions.length}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Max Marks:</span>
                    <p className="text-gray-900">{selectedTest.maxMarks}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Status:</span>
                    <p className={`font-medium capitalize ${
                      selectedTest.status === 'active' ? 'text-green-600' :
                      selectedTest.status === 'completed' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>{selectedTest.status}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Attempts:</span>
                    <p className="text-gray-900">{selectedTest.attempts}</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Schedule</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Start:</span>
                      <p className="text-gray-900">{new Date(selectedTest.startDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">End:</span>
                      <p className="text-gray-900">{new Date(selectedTest.endDate).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              {selectedTest.instructions && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Instructions</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedTest.instructions}</p>
                  </div>
                </div>
              )}

              {/* Questions */}
              {selectedTest.questions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">Questions ({selectedTest.questions.length})</h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedTest.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                            Q{index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-2 text-sm">{question.text}</p>
                            {question.type === 'mcq' && question.options && (
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className={`text-xs px-2 py-1 rounded ${
                                    optIndex === question.correctAnswer 
                                      ? 'bg-green-100 text-green-800 font-medium' 
                                      : 'text-gray-600'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                    {optIndex === question.correctAnswer && ' ✓'}
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type !== 'mcq' && (
                              <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                                Answer: {question.correctAnswer}
                              </div>
                            )}
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">
                                Type: {question.type.toUpperCase()} • Marks: {question.marks}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Test Modal */}
      {showEditModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Edit Test</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateTest} className="p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Title*</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject*</label>
                  <select
                    name="subject"
                    value={editForm.subject}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)*</label>
                  <input
                    type="number"
                    name="duration"
                    value={editForm.duration}
                    onChange={handleEditFormChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date*</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={editForm.startDate}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date*</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={editForm.endDate}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  name="instructions"
                  value={editForm.instructions}
                  onChange={handleEditFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter test instructions..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Update Test
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Detailed Report Modal */}
      {showReportModal && selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Detailed Report</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Test Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{selectedTest.title} - Analytics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{selectedTest.attempts}</div>
                    <div className="text-sm text-gray-600">Total Attempts</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{selectedTest.avgScore.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{((selectedTest.avgScore / selectedTest.maxMarks) * 100).toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">{selectedTest.maxMarks}</div>
                    <div className="text-sm text-gray-600">Max Marks</div>
                  </div>
                </div>
              </div>

              {/* Performance Analysis */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Performance Analysis</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Excellent (90%+)</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Good (70-89%)</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average (50-69%)</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Below Average (&lt;50%)</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question-wise Analysis */}
              {selectedTest.questions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">Question-wise Performance</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedTest.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                Q{index + 1}
                              </span>
                              <span className="text-xs text-gray-500">
                                {question.marks} mark{question.marks > 1 ? 's' : ''}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{question.text}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">78% Correct</div>
                            <div className="text-xs text-gray-500">35/45 students</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => alert('Export functionality would be implemented here')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Export Report
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyOnlineTest;
