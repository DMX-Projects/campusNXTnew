 // FacultyOnlineTest.tsx - FULLY FUNCTIONAL VERSION
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
      questions: [],
      maxMarks: 40,
      status: 'active',
      startDate: '2025-09-05',
      endDate: '2025-09-06',
      attempts: 45,
      avgScore: 32.5,
      instructions: 'Answer all questions carefully'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'tests' | 'create' | 'results'>('tests');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  
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
    if (confirm('Are you sure you want to delete this question?')) {
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
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
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
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Online Tests</h1>
              <p className="text-gray-600">Create and manage online assessments</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsCreating(true);
              setActiveTab('create');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Test
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active Tests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-purple-600">{stats.totalAttempts}</div>
          <div className="text-sm text-gray-600">Total Attempts</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'tests', label: 'My Tests', icon: <Eye className="w-4 h-4" /> },
            { id: 'create', label: isCreating ? 'Creating Test' : 'Create Test', icon: <Plus className="w-4 h-4" /> },
            { id: 'results', label: 'Results', icon: <BarChart3 className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'tests' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tests.map(test => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      test.status === 'active' ? 'bg-green-100 text-green-800' :
                      test.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div>Subject: <span className="font-medium">{test.subject}</span></div>
                    <div>Duration: <span className="font-medium">{test.duration} min</span></div>
                    <div>Questions: <span className="font-medium">{test.questions.length}</span></div>
                    <div>Max Marks: <span className="font-medium">{test.maxMarks}</span></div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div>Schedule: {new Date(test.startDate).toLocaleDateString()} - {new Date(test.endDate).toLocaleDateString()}</div>
                    {test.attempts > 0 && (
                      <div>Performance: {test.attempts} attempts • Avg: {test.avgScore.toFixed(1)}/{test.maxMarks}</div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {tests.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tests created yet. Click "Create Test" to get started.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Test</h2>
                <div className="flex gap-3">
                  <button
                    onClick={cancelTestCreation}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTest}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Test
                  </button>
                </div>
              </div>

              {/* Test Details Form */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newTest.title}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter test title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                    <select
                      name="subject"
                      value={newTest.subject}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)*</label>
                    <input
                      type="number"
                      name="duration"
                      value={newTest.duration}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={newTest.endDate}
                      onChange={handleTestInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter test instructions for students..."
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Questions ({newTest.questions.length})
                    {newTest.questions.length > 0 && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        Total Marks: {newTest.questions.reduce((sum, q) => sum + q.marks, 0)}
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowQuestionForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                            <p className="font-medium text-gray-900 mb-2">{question.text}</p>
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
                      <div className="p-6 border-b border-gray-200">
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

                      <div className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Question Text*</label>
                          <textarea
                            name="text"
                            value={newQuestion.text}
                            onChange={handleQuestionInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your question..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                            <select
                              name="type"
                              value={newQuestion.type}
                              onChange={handleQuestionInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter the correct answer"
                            />
                          </div>
                        )}
                      </div>

                      <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Results & Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tests.filter(t => t.attempts > 0).map(test => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">{test.title}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Attempts</span>
                        <span className="font-medium">{test.attempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Score</span>
                        <span className="font-medium">{test.avgScore.toFixed(1)}/{test.maxMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-medium">{((test.avgScore / test.maxMarks) * 100).toFixed(1)}%</span>
                      </div>
                      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        View Detailed Report
                      </button>
                    </div>
                  </div>
                ))}
                {tests.filter(t => t.attempts > 0).length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No test results available yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyOnlineTest;
