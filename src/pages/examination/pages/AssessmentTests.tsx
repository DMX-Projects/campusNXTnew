import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Play, PauseCircle, FileText, X } from 'lucide-react';
import AssessmentForm from '../components/AssessmentForm';

const AssessmentTests: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assessments, setAssessments] = useState([
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
  ]);

  // Handlers
  const handleView = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowViewModal(true);
  };

  const handleEdit = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      setAssessments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleAddNew = () => {
    setSelectedAssessment(null);
    setShowAddModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedAssessment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter assessments based on search and status
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Assessment Tests</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Assessment</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
            <p className="text-sm text-gray-600">Total Assessments</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {assessments.filter(a => a.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {assessments.reduce((sum, a) => sum + a.attempts, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Attempts</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {assessments.length > 0 
                ? (assessments.reduce((sum, a) => sum + a.averageScore, 0) / assessments.length).toFixed(1)
                : '0'
              }
            </p>
            <p className="text-sm text-gray-600">Avg Score</p>
          </div>
        </div>
      </div>

      {/* Assessment Cards */}
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
          {filteredAssessments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No assessments found</p>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Assessment
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAssessments.map((assessment) => (
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
                      
                      <button 
                        className="text-gray-600 hover:text-gray-800 transition-colors p-1"
                        onClick={() => handleView(assessment)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button 
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        onClick={() => handleEdit(assessment)}
                        title="Edit Assessment"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button 
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                        onClick={() => handleDelete(assessment.id)}
                        title="Delete Assessment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      {assessment.status === 'completed' && (
                        <button 
                          className="text-purple-600 hover:text-purple-800 transition-colors p-1"
                          title="View Reports"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FULL SCREEN MODAL OVERLAY - COVERS EVERYTHING */}
      {(showAddModal || showViewModal || showEditModal) && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[99999] m-0" 
          style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}
          onClick={(e) => {
            // Close modal when clicking on overlay
            if (e.target === e.currentTarget) {
              closeAllModals();
            }
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {showAddModal && "Create Assessment Test"}
                {showEditModal && "Edit Assessment Test"}
                {showViewModal && "Assessment Details"}
              </h2>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              {(showAddModal || showEditModal) && (
                <div className="p-6">
                  <AssessmentForm 
                    onClose={closeAllModals}
                    initialData={showEditModal ? selectedAssessment : null}
                    isEdit={showEditModal}
                  />
                </div>
              )}
              
              {showViewModal && selectedAssessment && (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Title:</span>
                          <p className="font-medium">{selectedAssessment.title}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Subject:</span>
                          <p className="font-medium">{selectedAssessment.subject}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Type:</span>
                          <p className="font-medium">{selectedAssessment.type}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(selectedAssessment.status)}`}>
                            {selectedAssessment.status.charAt(0).toUpperCase() + selectedAssessment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Details</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Duration:</span>
                          <p className="font-medium">{selectedAssessment.duration} minutes</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Questions:</span>
                          <p className="font-medium">{selectedAssessment.totalQuestions}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total Marks:</span>
                          <p className="font-medium">{selectedAssessment.totalMarks}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Attempts:</span>
                          <p className="font-medium">{selectedAssessment.attempts}</p>
                        </div>
                        {selectedAssessment.attempts > 0 && (
                          <div>
                            <span className="text-sm text-gray-500">Average Score:</span>
                            <p className="font-medium">{selectedAssessment.averageScore}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-sm text-gray-500">Created Date:</span>
                        <p className="font-medium">{selectedAssessment.createdDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Scheduled Date:</span>
                        <p className="font-medium">{selectedAssessment.scheduledDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {showViewModal && (
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={closeAllModals}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentTests;
