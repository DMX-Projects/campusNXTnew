import React, { useState } from 'react';
import { 
  Eye, Clock, CheckCircle, AlertTriangle, User, 
  Calendar, MessageSquare, FileText, MapPin, Camera,
  Star, ThumbsUp, ThumbsDown, RefreshCw, Filter, Search
} from 'lucide-react';

interface ComplaintStatus {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  type: string;
  category: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Submitted' | 'In Progress' | 'Resolved' | 'Cancelled';
  submittedDate: string;
  assignedTo?: string;
  assignedDate?: string;
  resolvedDate?: string;
  remarks?: string;
  attachments: string[];
  location: string;
  updates: ComplaintUpdate[];
  feedback?: ComplaintFeedback;
}

interface ComplaintUpdate {
  id: string;
  date: string;
  status: string;
  message: string;
  updatedBy: string;
  type: 'Status Change' | 'Assignment' | 'Remark' | 'Resolution';
}

interface ComplaintFeedback {
  rating: number;
  comment: string;
  submittedDate: string;
  helpful: boolean;
}

const TrackComplaintStatusPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'resolved'>('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintStatus | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    comment: '',
    helpful: true
  });

  // Sample data - would come from API in real application
  const currentStudent = {
    id: 'CS2023001',
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    roomNumber: 'A-201',
    phoneNumber: '+91-9876543210',
    email: 'arjun.kumar@college.edu.in'
  };

  const complaints: ComplaintStatus[] = [
    {
      id: 'COMP001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      type: 'Maintenance',
      category: 'AC/Fan',
      description: 'AC not cooling properly, making unusual noise',
      priority: 'High',
      status: 'In Progress',
      submittedDate: '2025-01-10',
      assignedTo: 'Maintenance Team - Ravi Kumar',
      assignedDate: '2025-01-11',
      remarks: 'Technician will visit on Jan 15th',
      attachments: ['ac_issue.jpg'],
      location: 'Room A-201',
      updates: [
        {
          id: 'UPD001',
          date: '2025-01-10',
          status: 'Submitted',
          message: 'Complaint submitted successfully',
          updatedBy: 'System',
          type: 'Status Change'
        },
        {
          id: 'UPD002',
          date: '2025-01-11',
          status: 'In Progress',
          message: 'Complaint assigned to maintenance team',
          updatedBy: 'Mr. Prakash Sharma',
          type: 'Assignment'
        },
        {
          id: 'UPD003',
          date: '2025-01-12',
          status: 'In Progress',
          message: 'Technician scheduled for Jan 15th visit',
          updatedBy: 'Ravi Kumar',
          type: 'Remark'
        }
      ],
      feedback: undefined
    },
    {
      id: 'COMP002',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      type: 'Mess',
      category: 'Food Quality',
      description: 'Food quality has deteriorated in the last week',
      priority: 'Medium',
      status: 'Resolved',
      submittedDate: '2025-01-05',
      assignedTo: 'Mess Committee',
      assignedDate: '2025-01-06',
      resolvedDate: '2025-01-08',
      remarks: 'New cook appointed, quality improved',
      attachments: [],
      location: 'Mess Hall',
      updates: [
        {
          id: 'UPD004',
          date: '2025-01-05',
          status: 'Submitted',
          message: 'Complaint submitted successfully',
          updatedBy: 'System',
          type: 'Status Change'
        },
        {
          id: 'UPD005',
          date: '2025-01-06',
          status: 'In Progress',
          message: 'Complaint forwarded to mess committee',
          updatedBy: 'Mr. Prakash Sharma',
          type: 'Assignment'
        },
        {
          id: 'UPD006',
          date: '2025-01-08',
          status: 'Resolved',
          message: 'Issue resolved - new cook appointed',
          updatedBy: 'Mess Committee',
          type: 'Resolution'
        }
      ],
      feedback: {
        rating: 4,
        comment: 'Good response time and effective resolution',
        submittedDate: '2025-01-09',
        helpful: true
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Submitted': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'Status Change': return 'bg-blue-100 text-blue-800';
      case 'Assignment': return 'bg-purple-100 text-purple-800';
      case 'Remark': return 'bg-yellow-100 text-yellow-800';
      case 'Resolution': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return complaint.status !== 'Resolved';
    if (activeTab === 'resolved') return complaint.status === 'Resolved';
    return true;
  });

  const openDetails = (complaint: ComplaintStatus) => {
    setSelectedComplaint(complaint);
    setShowDetails(true);
  };

  const openFeedbackModal = (complaint: ComplaintStatus) => {
    setSelectedComplaint(complaint);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    alert('Feedback submitted successfully! Thank you for your input.');
    setShowFeedbackModal(false);
    setFeedbackForm({ rating: 0, comment: '', helpful: true });
  };

  const getDaysSinceSubmission = (submittedDate: string) => {
    const now = new Date();
    const submitted = new Date(submittedDate);
    const diff = now.getTime() - submitted.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Track Complaint Status</h1>
              <p className="text-gray-600">Monitor the progress of your submitted complaints</p>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentStudent.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{currentStudent.roomNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{currentStudent.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentStudent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Total Complaints</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{complaints.length}</p>
            <p className="text-sm text-gray-600">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Pending</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{complaints.filter(c => c.status !== 'Resolved').length}</p>
            <p className="text-sm text-gray-600">In progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Resolved</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{complaints.filter(c => c.status === 'Resolved').length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Avg Rating</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {complaints.filter(c => c.feedback).length > 0 
                ? (complaints.filter(c => c.feedback).reduce((sum, c) => sum + (c.feedback?.rating || 0), 0) / complaints.filter(c => c.feedback).length).toFixed(1)
                : 'N/A'
              }
            </p>
            <p className="text-sm text-gray-600">Out of 5</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'all', label: 'All Complaints', icon: FileText },
              { key: 'pending', label: 'Pending', icon: Clock },
              { key: 'resolved', label: 'Resolved', icon: CheckCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Complaint Status</h2>
          
          {filteredComplaints.length > 0 ? (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Complaint #{complaint.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDetails(complaint)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      {complaint.status === 'Resolved' && !complaint.feedback && (
                        <button
                          onClick={() => openFeedbackModal(complaint)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <Star className="w-4 h-4" />
                          Give Feedback
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Complaint Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{complaint.type} - {complaint.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{complaint.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {getDaysSinceSubmission(complaint.submittedDate)} days ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Assignment</h4>
                      <div className="space-y-2">
                        {complaint.assignedTo ? (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{complaint.assignedTo}</span>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Not assigned yet</p>
                        )}
                        {complaint.assignedDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Assigned: {new Date(complaint.assignedDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{complaint.updates.length} updates</span>
                        </div>
                        {complaint.resolvedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                              Resolved: {new Date(complaint.resolvedDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        )}
                        {complaint.feedback && (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">Rated: {complaint.feedback.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{complaint.description}</p>
                  </div>

                  {complaint.remarks && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Latest Update:</strong> {complaint.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Complaints Found</h3>
              <p className="text-gray-500">No complaints match your current filter</p>
            </div>
          )}
        </div>

        {/* Complaint Details Modal */}
        {showDetails && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Complaint Details - #{selectedComplaint.id}</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                    {selectedComplaint.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Complaint Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Type</p>
                          <p className="font-medium">{selectedComplaint.type} - {selectedComplaint.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium">{selectedComplaint.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Submitted</p>
                          <p className="font-medium">{new Date(selectedComplaint.submittedDate).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Assignment Details</h4>
                    <div className="space-y-3">
                      {selectedComplaint.assignedTo ? (
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Assigned To</p>
                            <p className="font-medium">{selectedComplaint.assignedTo}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Not assigned yet</p>
                      )}
                      {selectedComplaint.assignedDate && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-600">Assigned Date</p>
                            <p className="font-medium">{new Date(selectedComplaint.assignedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                        </div>
                      )}
                      {selectedComplaint.resolvedDate && (
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-600">Resolved Date</p>
                            <p className="font-medium">{new Date(selectedComplaint.resolvedDate).toLocaleDateString('en-IN')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedComplaint.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Status Updates</h4>
                  <div className="space-y-3">
                    {selectedComplaint.updates.map((update) => (
                      <div key={update.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUpdateTypeColor(update.type)}`}>
                            {update.type}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{update.message}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                            <span>{new Date(update.date).toLocaleString('en-IN')}</span>
                            <span>•</span>
                            <span>{update.updatedBy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedComplaint.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Attachments</h4>
                    <div className="flex gap-2">
                      {selectedComplaint.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                          <Camera className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedComplaint.feedback && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Your Feedback</h4>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>Rating: {selectedComplaint.feedback.rating}/5</span>
                      </div>
                      <p><strong>Comment:</strong> {selectedComplaint.feedback.comment}</p>
                      <p><strong>Submitted:</strong> {new Date(selectedComplaint.feedback.submittedDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedComplaint.status === 'Resolved' && !selectedComplaint.feedback && (
                    <button
                      onClick={() => {
                        setShowDetails(false);
                        openFeedbackModal(selectedComplaint);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      Give Feedback
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Give Feedback</h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate the resolution? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setFeedbackForm({...feedbackForm, rating})}
                        className={`p-2 rounded-lg ${
                          feedbackForm.rating >= rating
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <Star className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Was the resolution helpful?
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFeedbackForm({...feedbackForm, helpful: true})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        feedbackForm.helpful
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackForm({...feedbackForm, helpful: false})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        !feedbackForm.helpful
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Comments
                  </label>
                  <textarea
                    value={feedbackForm.comment}
                    onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Share your experience with the complaint resolution..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaintStatusPage;