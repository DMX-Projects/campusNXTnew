import React, { useState } from 'react';
import { Star, TrendingUp, Award, User, Calendar, FileText, Search, Filter, Eye, Download, Plus } from 'lucide-react';

interface Appraisal {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  reviewPeriod: string;
  overallRating: number;
  goals: {
    achieved: number;
    total: number;
  };
  competencies: {
    technical: number;
    communication: number;
    leadership: number;
    teamwork: number;
  };
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'completed';
  reviewDate: string;
  reviewedBy: string;
  comments: string;
  recommendations: string;
  nextReviewDate: string;
}

const Appraisals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  const appraisals: Appraisal[] = [
    {
      id: 'APR001',
      employeeId: 'EMP001',
      employeeName: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      designation: 'Professor',
      reviewPeriod: '2023-2024',
      overallRating: 4.5,
      goals: { achieved: 8, total: 10 },
      competencies: {
        technical: 4.8,
        communication: 4.5,
        leadership: 4.7,
        teamwork: 4.3
      },
      status: 'completed',
      reviewDate: '2024-01-15',
      reviewedBy: 'Dean of Engineering',
      comments: 'Excellent performance in teaching and research. Strong leadership in department initiatives.',
      recommendations: 'Consider for promotion to Department Head. Encourage more industry collaboration.',
      nextReviewDate: '2025-01-15'
    },
    {
      id: 'APR002',
      employeeId: 'EMP002',
      employeeName: 'Prof. Michael Brown',
      department: 'Mathematics',
      designation: 'Associate Professor',
      reviewPeriod: '2023-2024',
      overallRating: 4.2,
      goals: { achieved: 7, total: 9 },
      competencies: {
        technical: 4.5,
        communication: 4.0,
        leadership: 3.8,
        teamwork: 4.3
      },
      status: 'reviewed',
      reviewDate: '2024-01-10',
      reviewedBy: 'Department Head',
      comments: 'Good performance overall. Strong in technical areas, needs improvement in leadership skills.',
      recommendations: 'Attend leadership development programs. Take on more administrative responsibilities.',
      nextReviewDate: '2025-01-10'
    },
    {
      id: 'APR003',
      employeeId: 'EMP003',
      employeeName: 'Dr. Emily Davis',
      department: 'Physics',
      designation: 'Assistant Professor',
      reviewPeriod: '2023-2024',
      overallRating: 4.0,
      goals: { achieved: 6, total: 8 },
      competencies: {
        technical: 4.2,
        communication: 3.8,
        leadership: 3.5,
        teamwork: 4.1
      },
      status: 'submitted',
      reviewDate: '2024-01-08',
      reviewedBy: 'Department Head',
      comments: 'Satisfactory performance. Good research output, needs to improve student engagement.',
      recommendations: 'Focus on teaching methodologies. Increase student interaction and feedback.',
      nextReviewDate: '2025-01-08'
    },
    {
      id: 'APR004',
      employeeId: 'EMP004',
      employeeName: 'Lisa Martinez',
      department: 'Administration',
      designation: 'Admin Officer',
      reviewPeriod: '2023-2024',
      overallRating: 3.8,
      goals: { achieved: 5, total: 7 },
      competencies: {
        technical: 3.5,
        communication: 4.2,
        leadership: 3.3,
        teamwork: 4.0
      },
      status: 'draft',
      reviewDate: '2024-01-05',
      reviewedBy: 'HR Manager',
      comments: 'Good administrative skills. Excellent communication with students and faculty.',
      recommendations: 'Enhance technical skills through training. Consider for senior administrative roles.',
      nextReviewDate: '2025-01-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredAppraisals = appraisals.filter(appraisal => {
    const matchesSearch = appraisal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appraisal.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appraisal.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || appraisal.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || appraisal.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || appraisal.reviewPeriod === periodFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesPeriod;
  });

  const totalAppraisals = appraisals.length;
  const completedAppraisals = appraisals.filter(a => a.status === 'completed').length;
  const pendingAppraisals = appraisals.filter(a => a.status === 'draft' || a.status === 'submitted').length;
  const avgRating = appraisals.reduce((sum, a) => sum + a.overallRating, 0) / appraisals.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Employee Appraisals</h1>
          <p className="text-gray-600">Manage performance reviews and employee evaluations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Appraisals</p>
                <p className="text-2xl font-bold text-purple-600">{totalAppraisals}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedAppraisals}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingAppraisals}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold text-pink-600">{avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-full">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Periods</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Administration">Administration</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="approved">Approved</option>
                <option value="reviewed">Reviewed</option>
                <option value="submitted">Submitted</option>
                <option value="draft">Draft</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Appraisal
              </button>
            </div>
          </div>
        </div>

        {/* Appraisals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAppraisals.map((appraisal) => (
            <div key={appraisal.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {appraisal.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appraisal.employeeName}</h3>
                    <p className="text-sm text-gray-500">{appraisal.designation}</p>
                    <p className="text-xs text-gray-400">{appraisal.department}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appraisal.status)}`}>
                    {appraisal.status.charAt(0).toUpperCase() + appraisal.status.slice(1)}
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(appraisal.overallRating)}
                    <span className={`text-sm font-medium ml-1 ${getRatingColor(appraisal.overallRating)}`}>
                      {appraisal.overallRating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Goals Achievement</span>
                  <span className="text-sm font-medium text-gray-900">
                    {appraisal.goals.achieved}/{appraisal.goals.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(appraisal.goals.achieved / appraisal.goals.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Technical</p>
                  <p className="font-medium text-gray-900">{appraisal.competencies.technical}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Communication</p>
                  <p className="font-medium text-gray-900">{appraisal.competencies.communication}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Leadership</p>
                  <p className="font-medium text-gray-900">{appraisal.competencies.leadership}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Teamwork</p>
                  <p className="font-medium text-gray-900">{appraisal.competencies.teamwork}</p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 line-clamp-2">{appraisal.comments}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Review Period: {appraisal.reviewPeriod}</span>
                <span>Next Review: {appraisal.nextReviewDate}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAppraisals.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appraisals found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appraisals;