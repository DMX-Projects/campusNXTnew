import React, { useState } from 'react';
import { Search, Filter, FileText, CheckCircle, Clock, AlertTriangle, User, Calendar, GraduationCap, Eye, Edit3, Download, Upload } from 'lucide-react';

interface EvaluationTask {
  id: string;
  examCode: string;
  subject: string;
  examDate: Date;
  totalPapers: number;
  evaluatedPapers: number;
  evaluator: string;
  evaluatorId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'under_review';
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  submittedDate?: Date;
  remarks?: string;
  semester: string;
  department: string;
}

const ExamEvaluation: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationTask[]>([
    {
      id: '1',
      examCode: 'CSE301-MID',
      subject: 'Data Structures and Algorithms',
      examDate: new Date('2025-08-25'),
      totalPapers: 85,
      evaluatedPapers: 85,
      evaluator: 'Dr. Sarah Williams',
      evaluatorId: 'FAC001',
      status: 'completed',
      priority: 'medium',
      deadline: new Date('2025-09-01'),
      submittedDate: new Date('2025-08-31'),
      semester: 'Fall 2025',
      department: 'Computer Science'
    },
    {
      id: '2',
      examCode: 'MAT201-FINAL',
      subject: 'Calculus II',
      examDate: new Date('2025-08-28'),
      totalPapers: 92,
      evaluatedPapers: 67,
      evaluator: 'Prof. Michael Brown',
      evaluatorId: 'FAC002',
      status: 'in_progress',
      priority: 'high',
      deadline: new Date('2025-09-03'),
      semester: 'Fall 2025',
      department: 'Mathematics'
    },
    {
      id: '3',
      examCode: 'PHY101-MID',
      subject: 'Physics Fundamentals',
      examDate: new Date('2025-08-30'),
      totalPapers: 78,
      evaluatedPapers: 0,
      evaluator: 'Dr. Emily Davis',
      evaluatorId: 'FAC003',
      status: 'pending',
      priority: 'medium',
      deadline: new Date('2025-09-05'),
      semester: 'Fall 2025',
      department: 'Physics'
    },
    {
      id: '4',
      examCode: 'ENG202-FINAL',
      subject: 'English Literature',
      examDate: new Date('2025-08-26'),
      totalPapers: 65,
      evaluatedPapers: 45,
      evaluator: 'Dr. Lisa Wilson',
      evaluatorId: 'FAC004',
      status: 'overdue',
      priority: 'high',
      deadline: new Date('2025-09-01'),
      semester: 'Fall 2025',
      department: 'English'
    },
    {
      id: '5',
      examCode: 'CHE301-MID',
      subject: 'Organic Chemistry',
      examDate: new Date('2025-08-29'),
      totalPapers: 88,
      evaluatedPapers: 88,
      evaluator: 'Prof. John Mitchell',
      evaluatorId: 'FAC005',
      status: 'under_review',
      priority: 'medium',
      deadline: new Date('2025-09-04'),
      submittedDate: new Date('2025-09-02'),
      remarks: 'Grade distribution seems unusual, requires review',
      semester: 'Fall 2025',
      department: 'Chemistry'
    }
  ]);

  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationTask | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.examCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || evaluation.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || evaluation.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'under_review': return <Eye className="w-4 h-4 text-orange-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressPercentage = (evaluated: number, total: number) => {
    return total > 0 ? Math.round((evaluated / total) * 100) : 0;
  };

  const updateEvaluationStatus = (id: string, newStatus: string) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === id ? { ...evaluation, status: newStatus as any } : evaluation
    ));
  };

  const pendingCount = evaluations.filter(evaluation => evaluation.status === 'pending').length;
  const overdueCount = evaluations.filter(evaluation => evaluation.status === 'overdue').length;
  const completedCount = evaluations.filter(evaluation => evaluation.status === 'completed').length;
  const underReviewCount = evaluations.filter(evaluation => evaluation.status === 'under_review').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Exam Evaluation Management
          </h1>
          <div className="flex items-center gap-4">
            {overdueCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                {overdueCount} overdue
              </span>
            )}
            {underReviewCount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                {underReviewCount} under review
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Sidebar - Evaluation List */}
        <div className={`w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col ${selectedEvaluation ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search and Filters */}
          <div className="p-4 space-y-3 border-b border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search evaluations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="under_review">Under Review</option>
              </select>
              
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English">English</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          {/* Evaluations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredEvaluations.map((evaluation) => {
              const progressPercentage = getProgressPercentage(evaluation.evaluatedPapers, evaluation.totalPapers);
              
              return (
                <div
                  key={evaluation.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedEvaluation?.id === evaluation.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedEvaluation(evaluation)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(evaluation.priority)} flex-shrink-0`}></div>
                      <span className="font-medium text-sm text-gray-900 truncate">
                        {evaluation.examCode}
                      </span>
                      {getStatusIcon(evaluation.status)}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(evaluation.status)}`}>
                      {evaluation.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                    {evaluation.subject}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    {evaluation.evaluator} • {evaluation.department}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{evaluation.evaluatedPapers}/{evaluation.totalPapers} ({progressPercentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          evaluation.status === 'completed' ? 'bg-green-500' :
                          evaluation.status === 'overdue' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Due: {evaluation.deadline.toLocaleDateString()}</span>
                    <span>{evaluation.semester}</span>
                  </div>
                </div>
              );
            })}
            
            {filteredEvaluations.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No evaluations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${selectedEvaluation ? 'flex' : 'hidden lg:flex'}`}>
          {selectedEvaluation ? (
            <>
              {/* Back button for mobile */}
              <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="text-blue-600 text-sm font-medium"
                >
                  ← Back to Evaluations
                </button>
              </div>

              {/* Evaluation Details Header */}
              <div className="bg-white border-b border-gray-200 p-4 md:p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      {selectedEvaluation.subject}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedEvaluation.status)}`}>
                      {selectedEvaluation.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{selectedEvaluation.examCode}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span><strong>Evaluator:</strong> {selectedEvaluation.evaluator}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span><strong>Exam Date:</strong> {selectedEvaluation.examDate.toLocaleDateString()}</span>
                    </div>
                    <div>
                      <strong>Department:</strong> {selectedEvaluation.department}
                    </div>
                    <div>
                      <strong>Semester:</strong> {selectedEvaluation.semester}
                    </div>
                    <div>
                      <strong>Deadline:</strong> {selectedEvaluation.deadline.toLocaleDateString()}
                    </div>
                    {selectedEvaluation.submittedDate && (
                      <div>
                        <strong>Submitted:</strong> {selectedEvaluation.submittedDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-gray-900 mb-3">Evaluation Progress</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Papers Evaluated</span>
                    <span className="text-sm font-medium">
                      {selectedEvaluation.evaluatedPapers} / {selectedEvaluation.totalPapers}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        selectedEvaluation.status === 'completed' ? 'bg-green-500' :
                        selectedEvaluation.status === 'overdue' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${getProgressPercentage(selectedEvaluation.evaluatedPapers, selectedEvaluation.totalPapers)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getProgressPercentage(selectedEvaluation.evaluatedPapers, selectedEvaluation.totalPapers)}% Complete
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Edit3 className="w-4 h-4" />
                    Add Remarks
                  </button>
                </div>
              </div>

              {/* Evaluation Content */}
              <div className="flex-1 bg-white p-4 md:p-6 overflow-y-auto">
                <div className="max-w-4xl space-y-6">
                  {/* Remarks Section */}
                  {selectedEvaluation.remarks && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">Remarks</h4>
                      <p className="text-sm text-yellow-800">{selectedEvaluation.remarks}</p>
                    </div>
                  )}

                  {/* Status-specific Actions */}
                  {selectedEvaluation.status === 'pending' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Pending Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => updateEvaluationStatus(selectedEvaluation.id, 'in_progress')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Start Evaluation
                        </button>
                        <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          Assign Different Evaluator
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedEvaluation.status === 'in_progress' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-3">Evaluation in Progress</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Send Reminder
                        </button>
                        <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                          Check Progress
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedEvaluation.status === 'under_review' && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-3">Under Review</h4>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => updateEvaluationStatus(selectedEvaluation.id, 'completed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Approve Results
                        </button>
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                          Request Revision
                        </button>
                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                          Reject & Reassign
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedEvaluation.status === 'overdue' && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-3">Overdue Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                          Send Urgent Reminder
                        </button>
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                          Reassign Evaluator
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Extend Deadline
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedEvaluation.status === 'completed' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-3">Evaluation Completed</h4>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Final Report
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Publish Results
                        </button>
                        <button className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm">
                          Generate Statistics
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* No Evaluation Selected */
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Select an evaluation to manage</h3>
                <p className="text-sm">Choose an evaluation from the list to view details and take actions</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className={`w-full lg:w-64 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 ${selectedEvaluation ? 'hidden lg:block' : 'block'}`}>
          <h3 className="font-semibold text-gray-800 mb-4">Evaluation Stats</h3>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Pending</span>
                <span className="font-semibold text-gray-900">{pendingCount}</span>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">Overdue</span>
                <span className="font-semibold text-red-900">{overdueCount}</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Completed</span>
                <span className="font-semibold text-green-900">{completedCount}</span>
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-700">Under Review</span>
                <span className="font-semibold text-orange-900">{underReviewCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Generate Report
              </button>
              <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Export Data
              </button>
              <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Send Reminders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamEvaluation;