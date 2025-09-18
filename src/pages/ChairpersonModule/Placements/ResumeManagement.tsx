// pages/ResumeManagement.tsx
import React, { useState } from 'react';
import { 
  DocumentTextIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const ResumeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const [resumes, setResumes] = useState([
    {
      id: 1,
      studentName: 'Rahul Sharma',
      rollNumber: 'CS21001',
      department: 'Computer Science',
      email: 'rahul.sharma@college.edu',
      resumeVersion: 'v2.1',
      uploadDate: '2025-08-28',
      status: 'pending',
      reviewedBy: null,
      feedback: null,
      fileSize: '245 KB',
      downloads: 0
    },
    {
      id: 2,
      studentName: 'Priya Patel',
      rollNumber: 'IT21002',
      department: 'Information Technology',
      email: 'priya.patel@college.edu',
      resumeVersion: 'v3.0',
      uploadDate: '2025-08-25',
      status: 'approved',
      reviewedBy: 'Dr. Smith',
      feedback: 'Excellent format and content. Ready for placements.',
      fileSize: '312 KB',
      downloads: 15
    },
    {
      id: 3,
      studentName: 'Amit Kumar',
      rollNumber: 'EC21003',
      department: 'Electronics',
      email: 'amit.kumar@college.edu',
      resumeVersion: 'v1.5',
      uploadDate: '2025-08-30',
      status: 'rejected',
      reviewedBy: 'Prof. Johnson',
      feedback: 'Please improve technical skills section and add more project details.',
      fileSize: '189 KB',
      downloads: 0
    },
    {
      id: 4,
      studentName: 'Sneha Singh',
      rollNumber: 'IT21004',
      department: 'Information Technology',
      email: 'sneha.singh@college.edu',
      resumeVersion: 'v2.3',
      uploadDate: '2025-09-01',
      status: 'under_review',
      reviewedBy: 'Dr. Smith',
      feedback: null,
      fileSize: '298 KB',
      downloads: 3
    }
  ]);

  const stats = [
    { name: 'Total Resumes', value: '156', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { name: 'Pending Review', value: '23', icon: ClockIcon, color: 'bg-yellow-500' },
    { name: 'Approved', value: '98', icon: CheckCircleIcon, color: 'bg-green-500' },
    { name: 'Rejected', value: '35', icon: XCircleIcon, color: 'bg-red-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResumes = resumes.filter(resume => {
    const matchesSearch = resume.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resume.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || resume.department === selectedDepartment;
    const matchesTab = activeTab === 'all' || resume.status === activeTab;
    
    return matchesSearch && matchesDepartment && matchesTab;
  });

  const handleStatusUpdate = (resumeId: number, newStatus: string) => {
    setResumes(prev =>
      prev.map(resume =>
        resume.id === resumeId ? { ...resume, status: newStatus } : resume
      )
    );
    alert(`Resume ${resumeId} marked as ${newStatus.toUpperCase()}`);
  };

  const handleViewResume = () => {
    window.open('./Public/Science and Engineering Resume in White Black Simple Style.pdf'); 
  };

  const handleDownloadResume = (resume: any) => {
    const link = document.createElement('a');
    // Always download dummy PDF regardless of student
    link.href = './Public/Science and Engineering Resume in White Black Simple Style.pdf';
    link.download = `${resume.studentName}-Resume.pdf`; // filename looks dynamic
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resume Management</h1>
        <div className="flex space-x-3">
          {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Bulk Approve
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Download All
          </button> */}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'pending', label: 'Pending Review', count: resumes.filter(r => r.status === 'pending').length },
              { key: 'under_review', label: 'Under Review', count: resumes.filter(r => r.status === 'under_review').length },
              { key: 'approved', label: 'Approved', count: resumes.filter(r => r.status === 'approved').length },
              { key: 'rejected', label: 'Rejected', count: resumes.filter(r => r.status === 'rejected').length },
              { key: 'all', label: 'All Resumes', count: resumes.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Resume Cards */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredResumes.map((resume) => (
              <div key={resume.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-indigo-600" />
                    </div>

                    {/* Resume Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{resume.studentName}</h3>
                      <p className="text-sm text-gray-600">Roll No: {resume.rollNumber}</p>
                      <p className="text-sm text-gray-600">Department: {resume.department}</p>
                      <p className="text-sm text-gray-600">Email: {resume.email}</p>
                      
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                          Version: {resume.resumeVersion}
                        </span>
                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                          Uploaded: {resume.uploadDate}
                        </span>
                        <span className={`px-2 py-1 rounded ${getStatusColor(resume.status)}`}>
                          {resume.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      {resume.reviewedBy && (
                        <p className="mt-2 text-sm text-gray-500">
                          Reviewed by <span className="font-medium">{resume.reviewedBy}</span>
                        </p>
                      )}
                      {resume.feedback && (
                        <p className="mt-1 text-sm text-gray-500 italic">“{resume.feedback}”</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-2">
                      {/* <button
                        onClick={handleViewResume}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Resume"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button> */}
                      <button
                        onClick={() => handleDownloadResume(resume)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                        title="Download"
                      >
                        
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {resume.status === 'pending' || resume.status === 'under_review' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(resume.id, 'approved')}
                          className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(resume.id, 'rejected')}
                          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ResumeManagement;
