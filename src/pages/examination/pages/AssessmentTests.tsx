import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Play, PauseCircle, FileText } from 'lucide-react';
import Modal from '../components/Modal';
import AssessmentForm from '../components/AssessmentForm';

const AssessmentTests: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const assessments = [
    {
      id: 'AT001',
      title: 'Computer Networks Quiz 1',
      subject: 'Computer Networks',
      type: 'Quiz',
      duration: 30,
      totalQuestions: 20,
      totalMarks: 20,
      createdDate: '2024-12-01',
      scheduledDate: '2024-12-15',
      status: 'scheduled',
      attempts: 0,
      averageScore: 0
    },
    {
      id: 'AT002',
      title: 'Database Fundamentals Test',
      subject: 'Database Management',
      type: 'Assessment',
      duration: 60,
      totalQuestions: 35,
      totalMarks: 50,
      createdDate: '2024-11-28',
      scheduledDate: '2024-12-10',
      status: 'completed',
      attempts: 45,
      averageScore: 76.8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ASSESSMENT TESTS</h1>
          <p className="text-gray-600">Create and manage online assessments and quizzes</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Assessment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Total Assessments</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">845</p>
            <p className="text-sm text-gray-600">Total Attempts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">82.4</p>
            <p className="text-sm text-gray-600">Avg Score</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Subject</p>
                        <p className="font-medium text-gray-900">{assessment.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{assessment.duration} mins</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Questions</p>
                        <p className="font-medium text-gray-900">{assessment.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Marks</p>
                        <p className="font-medium text-gray-900">{assessment.totalMarks}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>Created: {assessment.createdDate}</span>
                      <span>Scheduled: {assessment.scheduledDate}</span>
                      {assessment.status === 'completed' && (
                        <>
                          <span>Attempts: {assessment.attempts}</span>
                          <span>Avg Score: {assessment.averageScore}%</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {assessment.status === 'scheduled' && (
                      <button className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 transition-colors">
                        <Play className="h-3 w-3" />
                        <span>Start</span>
                      </button>
                    )}
                    {assessment.status === 'active' && (
                      <button className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors">
                        <PauseCircle className="h-3 w-3" />
                        <span>Stop</span>
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-800 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {assessment.status === 'completed' && (
                      <button className="text-purple-600 hover:text-purple-800 transition-colors">
                        <FileText className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create Assessment Test"
      >
        <AssessmentForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AssessmentTests;