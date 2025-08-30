import React, { useState } from 'react';
import { UserPlus, FileText, CheckCircle, XCircle, Clock, Filter, Search, Download, Eye, Phone, Mail, Calendar, GraduationCap } from 'lucide-react';

interface Admission {
  id: string;
  applicationId: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview' | 'waitlist';
  documents: string[];
  entranceScore?: number;
  interviewDate?: string;
  previousEducation: string;
  category: string;
  feesPaid: boolean;
}

const Admissions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  const admissions: Admission[] = [
    {
      id: 'ADM001',
      applicationId: 'APP2024001',
      studentName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      course: 'Computer Science',
      appliedDate: '2024-01-10',
      status: 'approved',
      documents: ['10th Certificate', '12th Certificate', 'ID Proof'],
      entranceScore: 85,
      previousEducation: 'Science - 90%',
      category: 'General',
      feesPaid: true
    },
    {
      id: 'ADM002',
      applicationId: 'APP2024002',
      studentName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      course: 'Business Administration',
      appliedDate: '2024-01-12',
      status: 'interview',
      documents: ['10th Certificate', '12th Certificate', 'ID Proof', 'Experience Letter'],
      entranceScore: 78,
      interviewDate: '2024-01-20',
      previousEducation: 'Commerce - 85%',
      category: 'OBC',
      feesPaid: false
    },
    {
      id: 'ADM003',
      applicationId: 'APP2024003',
      studentName: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      course: 'Engineering',
      appliedDate: '2024-01-08',
      status: 'pending',
      documents: ['10th Certificate', '12th Certificate'],
      entranceScore: 72,
      previousEducation: 'Science - 88%',
      category: 'SC',
      feesPaid: false
    },
    {
      id: 'ADM004',
      applicationId: 'APP2024004',
      studentName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      course: 'Psychology',
      appliedDate: '2024-01-15',
      status: 'waitlist',
      documents: ['10th Certificate', '12th Certificate', 'ID Proof'],
      entranceScore: 68,
      previousEducation: 'Arts - 82%',
      category: 'General',
      feesPaid: false
    },
    {
      id: 'ADM005',
      applicationId: 'APP2024005',
      studentName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 567-8901',
      course: 'Computer Science',
      appliedDate: '2024-01-05',
      status: 'rejected',
      documents: ['10th Certificate', '12th Certificate'],
      entranceScore: 45,
      previousEducation: 'Science - 70%',
      category: 'General',
      feesPaid: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'waitlist': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'interview': return <UserPlus className="w-4 h-4" />;
      case 'waitlist': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || admission.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || admission.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const totalApplications = admissions.length;
  const approvedApplications = admissions.filter(a => a.status === 'approved').length;
  const pendingApplications = admissions.filter(a => a.status === 'pending').length;
  const interviewScheduled = admissions.filter(a => a.status === 'interview').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admissions Management</h1>
          <p className="text-gray-600">Manage student applications, interviews, and admission processes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-blue-600">{totalApplications}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedApplications}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingApplications}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Interviews</p>
                <p className="text-2xl font-bold text-purple-600">{interviewScheduled}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <UserPlus className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search by name, application ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
                <option value="interview">Interview</option>
                <option value="waitlist">Waitlist</option>
              </select>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Courses</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Engineering">Engineering</option>
                <option value="Psychology">Psychology</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredAdmissions.map((admission) => (
            <div key={admission.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {admission.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{admission.studentName}</h3>
                        <p className="text-sm text-gray-500">{admission.applicationId}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admission.status)}`}>
                        {getStatusIcon(admission.status)}
                        {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
                      </span>
                      {admission.feesPaid && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Fees Paid
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{admission.course}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{admission.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{admission.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{admission.appliedDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Previous Education</p>
                      <p className="font-medium text-gray-900">{admission.previousEducation}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Entrance Score</p>
                      <p className="font-medium text-gray-900">{admission.entranceScore ? `${admission.entranceScore}%` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">{admission.category}</p>
                    </div>
                  </div>

                  {admission.interviewDate && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Interview Scheduled:</strong> {admission.interviewDate}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button 
                    onClick={() => setSelectedAdmission(admission)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Documents
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAdmissions.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admissions;