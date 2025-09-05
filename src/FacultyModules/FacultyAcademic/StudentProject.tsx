// FacultyStudentProjects.tsx
import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, Clock, AlertCircle, Plus, Eye, X, Edit3 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  students: string[];
  status: 'ongoing' | 'completed' | 'pending';
  startDate: string;
  endDate?: string;
  progress: number;
}

const FacultyStudentProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Smart Parking System',
      description: 'IoT-based automated parking management system using sensors and mobile app integration',
      students: ['Arjun Kumar', 'Priya Sharma'],
      status: 'ongoing',
      startDate: '2025-06-01',
      progress: 65
    },
    {
      id: '2',
      title: 'E-Learning Platform',
      description: 'Web application for online education with video streaming and interactive quizzes',
      students: ['Rahul Verma', 'Pooja Singh', 'Amit Patel'],
      status: 'completed',
      startDate: '2025-02-15',
      endDate: '2025-08-30',
      progress: 100
    },
    {
      id: '3',
      title: 'AI Chatbot',
      description: 'Customer service automation using Natural Language Processing and machine learning',
      students: ['Neha Gupta'],
      status: 'pending',
      startDate: '2025-09-15',
      progress: 0
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'pending'>('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProgress, setNewProgress] = useState(0);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    students: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'pending' as 'ongoing' | 'completed' | 'pending'
  });

  const filteredProjects = projects.filter(p => filter === 'all' || p.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const handleUpdateStatus = (project: Project) => {
    setSelectedProject(project);
    setNewProgress(project.progress);
    setShowUpdateModal(true);
  };

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const closeModal = () => {
    setShowViewModal(false);
    setShowUpdateModal(false);
    setShowNewProjectModal(false);
    setSelectedProject(null);
    setNewProgress(0);
    // Reset new project form
    setNewProject({
      title: '',
      description: '',
      students: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
  };

  const handleStatusUpdate = (newStatus: 'ongoing' | 'completed' | 'pending') => {
    if (!selectedProject) return;
    
    const updatedProject = {
      ...selectedProject,
      status: newStatus,
      progress: newStatus === 'completed' ? 100 : newProgress,
      endDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined
    };

    setProjects(prev => prev.map(proj =>
      proj.id === selectedProject.id ? updatedProject : proj
    ));
    closeModal();
  };

  const handleProgressUpdate = () => {
    if (!selectedProject) return;
    
    setProjects(prev => prev.map(proj =>
      proj.id === selectedProject.id ? { ...proj, progress: newProgress } : proj
    ));
    closeModal();
  };

  const handleNewProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProject.title.trim() || !newProject.description.trim() || !newProject.students.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const studentsArray = newProject.students
      .split(',')
      .map(student => student.trim())
      .filter(student => student.length > 0);

    if (studentsArray.length === 0) {
      alert('Please enter at least one student name');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      students: studentsArray,
      status: newProject.status,
      startDate: newProject.startDate,
      progress: newProject.status === 'ongoing' ? 0 : newProject.status === 'completed' ? 100 : 0
    };

    setProjects(prev => [project, ...prev]);
    closeModal();
  };

  const handleNewProjectChange = (field: string, value: string) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Projects</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage and track student project progress</p>
            </div>
          </div>
          <button 
            onClick={handleNewProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{projects.length}</div>
          <div className="text-xs sm:text-sm text-gray-600">Total Projects</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'ongoing').length}</div>
          <div className="text-xs sm:text-sm text-gray-600">Ongoing</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{projects.filter(p => p.status === 'completed').length}</div>
          <div className="text-xs sm:text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="text-xl sm:text-2xl font-bold text-yellow-600">{projects.filter(p => p.status === 'pending').length}</div>
          <div className="text-xs sm:text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2">
          {['all', 'ongoing', 'completed', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-3 sm:px-4 py-2 rounded-lg capitalize transition-colors text-sm ${
                filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex-1 mr-3">{project.title}</h3>
              <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-sm sm:text-base">{project.description}</p>

            <div className="mb-4 space-y-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{project.students.length} Student(s): {project.students.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                {project.endDate && <span className="hidden sm:inline">• Ended: {new Date(project.endDate).toLocaleDateString()}</span>}
              </div>
              {project.endDate && (
                <div className="sm:hidden flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>Ended: {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => handleViewDetails(project)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </button>
              <button
                onClick={() => handleUpdateStatus(project)}
                className="flex-1 sm:flex-initial bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects found for the selected filter</p>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Project</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleNewProjectSubmit} className="p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => handleNewProjectChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => handleNewProjectChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project objectives and scope"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Students (comma-separated) *
                </label>
                <input
                  type="text"
                  value={newProject.students}
                  onChange={(e) => handleNewProjectChange('students', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., John Doe, Jane Smith, Mike Johnson"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter student names separated by commas
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => handleNewProjectChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => handleNewProjectChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Preview section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Title:</strong> {newProject.title || 'Not specified'}</p>
                  <p><strong>Students:</strong> {newProject.students || 'Not specified'}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{newProject.status}</span></p>
                  <p><strong>Start Date:</strong> {new Date(newProject.startDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create Project
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

      {/* View Details Modal */}
      {showViewModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Project Details</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              {/* Project Title and Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{selectedProject.title}</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Students Assigned</label>
                  <div className="space-y-1">
                    {selectedProject.students.map((student, index) => (
                      <p key={index} className="text-gray-900">{student}</p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{selectedProject.students.length} total student(s)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Current Status</label>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {getStatusIcon(selectedProject.status)}
                    <span className="capitalize">{selectedProject.status}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Progress</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedProject.progress}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
                  <p className="text-gray-900">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                </div>

                {selectedProject.endDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
                    <p className="text-gray-900">{new Date(selectedProject.endDate).toLocaleDateString()}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
                  <p className="text-gray-900">
                    {selectedProject.endDate 
                      ? `${Math.ceil((new Date(selectedProject.endDate).getTime() - new Date(selectedProject.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                      : `${Math.ceil((new Date().getTime() - new Date(selectedProject.startDate).getTime()) / (1000 * 60 * 60 * 24))} days (ongoing)`
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    closeModal();
                    handleUpdateStatus(selectedProject);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Update Project
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

      {/* Update Status Modal */}
      {showUpdateModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Update Project</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{selectedProject.title}</h3>
                <p className="text-sm text-gray-600">Current status: <span className="capitalize font-medium">{selectedProject.status}</span></p>
              </div>

              {/* Status Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Update Status</label>
                <div className="space-y-2">
                  {['pending', 'ongoing', 'completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status as any)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        selectedProject.status === status 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{status}</p>
                          <p className="text-xs text-gray-500">
                            {status === 'pending' && 'Project not started yet'}
                            {status === 'ongoing' && 'Project is in progress'}
                            {status === 'completed' && 'Project is finished'}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Update */}
              {selectedProject.status !== 'completed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Progress ({newProgress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newProgress}
                    onChange={(e) => setNewProgress(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <button
                    onClick={handleProgressUpdate}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Update Progress Only
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyStudentProjects;
