 // FacultyStudentProjects.tsx
import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, Clock, AlertCircle, Plus, Eye } from 'lucide-react';

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
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Smart Parking System',
      description: 'IoT-based automated parking management system',
      students: ['Arjun Kumar', 'Priya Sharma'],
      status: 'ongoing',
      startDate: '2025-06-01',
      progress: 65
    },
    {
      id: '2',
      title: 'E-Learning Platform',
      description: 'Web application for online education',
      students: ['Rahul Verma', 'Pooja Singh', 'Amit Patel'],
      status: 'completed',
      startDate: '2025-02-15',
      endDate: '2025-08-30',
      progress: 100
    },
    {
      id: '3',
      title: 'AI Chatbot',
      description: 'Customer service automation using NLP',
      students: ['Neha Gupta'],
      status: 'pending',
      startDate: '2025-09-15',
      progress: 0
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'pending'>('all');

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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Projects</h1>
              <p className="text-gray-600">Manage and track student project progress</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
          <div className="text-sm text-gray-600">Total Projects</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'ongoing').length}</div>
          <div className="text-sm text-gray-600">Ongoing</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{projects.filter(p => p.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-2xl font-bold text-yellow-600">{projects.filter(p => p.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex gap-2">
          {['all', 'ongoing', 'completed', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Users className="w-4 h-4" />
                <span>{project.students.length} Student(s): {project.students.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                {project.endDate && <span>• Ended: {new Date(project.endDate).toLocaleDateString()}</span>}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
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
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Eye className="w-4 h-4 inline mr-1" />
                View Details
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects found for the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default FacultyStudentProjects;
