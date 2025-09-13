import React, { useState } from 'react';
import { 
  Star, MessageSquare, ThumbsUp, ThumbsDown, 
  Clock, CheckCircle, AlertTriangle, User, 
  Calendar, FileText, RefreshCw, Filter, Search,
  Send, Heart, Smile, Frown, Meh, X
} from 'lucide-react';

interface FeedbackForm {
  complaintId: string;
  rating: number;
  helpful: boolean;
  comment: string;
  category: 'Resolution' | 'Response Time' | 'Communication' | 'Overall Experience';
  anonymous: boolean;
}

interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  type: string;
  category: string;
  description: string;
  status: string;
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
  feedback?: {
    rating: number;
    comment: string;
    submittedDate: string;
    helpful: boolean;
  };
}

const GiveFeedbackPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    complaintId: '',
    rating: 0,
    helpful: true,
    comment: '',
    category: 'Overall Experience',
    anonymous: false
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

  const complaints: Complaint[] = [
    {
      id: 'COMP001',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      type: 'Maintenance',
      category: 'AC/Fan',
      description: 'AC not cooling properly, making unusual noise',
      status: 'Resolved',
      submittedDate: '2025-01-10',
      resolvedDate: '2025-01-15',
      assignedTo: 'Maintenance Team - Ravi Kumar',
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
      status: 'Resolved',
      submittedDate: '2025-01-05',
      resolvedDate: '2025-01-08',
      assignedTo: 'Mess Committee',
      feedback: {
        rating: 4,
        comment: 'Good response time and effective resolution',
        submittedDate: '2025-01-09',
        helpful: true
      }
    },
    {
      id: 'COMP003',
      studentId: 'CS2023001',
      studentName: 'Arjun Kumar',
      roomNumber: 'A-201',
      type: 'Facilities',
      category: 'Wi-Fi',
      description: 'Internet connection is very slow in the room',
      status: 'Resolved',
      submittedDate: '2025-01-12',
      resolvedDate: '2025-01-14',
      assignedTo: 'IT Support Team',
      feedback: undefined
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

  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <Smile className="w-5 h-5 text-green-500" />;
    if (rating >= 3) return <Meh className="w-5 h-5 text-yellow-500" />;
    return <Frown className="w-5 h-5 text-red-500" />;
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (activeTab === 'pending') return complaint.status === 'Resolved' && !complaint.feedback;
    if (activeTab === 'completed') return complaint.feedback;
    return true;
  });

  const openFeedbackModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setFeedbackForm({
      complaintId: complaint.id,
      rating: 0,
      helpful: true,
      comment: '',
      category: 'Overall Experience',
      anonymous: false
    });
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackForm);
    alert('Feedback submitted successfully! Thank you for your valuable input.');
    setShowFeedbackModal(false);
    setFeedbackForm({
      complaintId: '',
      rating: 0,
      helpful: true,
      comment: '',
      category: 'Overall Experience',
      anonymous: false
    });
  };

  const getDaysSinceResolution = (resolvedDate: string) => {
    const now = new Date();
    const resolved = new Date(resolvedDate);
    const diff = now.getTime() - resolved.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Give Feedback</h1>
              <p className="text-gray-600">Share your experience and help us improve our services</p>
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
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Resolved Complaints</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{complaints.filter(c => c.status === 'Resolved').length}</p>
            <p className="text-sm text-gray-600">Total resolved</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Pending Feedback</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{complaints.filter(c => c.status === 'Resolved' && !c.feedback).length}</p>
            <p className="text-sm text-gray-600">Awaiting feedback</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Feedback Given</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{complaints.filter(c => c.feedback).length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="w-5 h-5 text-purple-600" />
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
              { key: 'pending', label: 'Pending Feedback', icon: Clock },
              { key: 'completed', label: 'Completed Feedback', icon: CheckCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
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

        {/* Feedback Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Feedback Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="space-y-2">
              <p>• Be honest and constructive in your feedback</p>
              <p>• Focus on the resolution process and outcome</p>
              <p>• Mention specific aspects that worked well</p>
            </div>
            <div className="space-y-2">
              <p>• Suggest improvements where needed</p>
              <p>• Your feedback helps improve our services</p>
              <p>• All feedback is confidential and anonymous</p>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {activeTab === 'pending' ? 'Complaints Awaiting Feedback' : 'Completed Feedback'}
          </h2>
          
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
                    </div>
                    <div className="flex items-center gap-2">
                      {activeTab === 'pending' ? (
                        <button
                          onClick={() => openFeedbackModal(complaint)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <Star className="w-4 h-4" />
                          Give Feedback
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          {getRatingIcon(complaint.feedback?.rating || 0)}
                          <span className="text-sm text-gray-600">
                            Rated: {complaint.feedback?.rating}/5
                          </span>
                        </div>
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
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Submitted: {new Date(complaint.submittedDate).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        {complaint.resolvedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                              Resolved: {new Date(complaint.resolvedDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        )}
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
                          <p className="text-sm text-gray-500">Not assigned</p>
                        )}
                        {complaint.resolvedDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {getDaysSinceResolution(complaint.resolvedDate)} days ago
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{complaint.description}</p>
                    </div>
                  </div>

                  {complaint.feedback && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Your Previous Feedback</h4>
                      <div className="space-y-2 text-sm text-green-800">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>Rating: {complaint.feedback.rating}/5</span>
                          {complaint.feedback.helpful ? (
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <ThumbsDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <p><strong>Comment:</strong> {complaint.feedback.comment}</p>
                        <p><strong>Submitted:</strong> {new Date(complaint.feedback.submittedDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {activeTab === 'pending' ? 'No Pending Feedback' : 'No Completed Feedback'}
              </h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'All resolved complaints have been reviewed'
                  : 'No feedback has been submitted yet'
                }
              </p>
            </div>
          )}
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Give Feedback</h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Complaint #{selectedComplaint.id}</h4>
                <p className="text-sm text-gray-600">{selectedComplaint.type} - {selectedComplaint.category}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedComplaint.description}</p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    {feedbackForm.rating === 0 && 'Please select a rating'}
                    {feedbackForm.rating === 1 && 'Poor - Very dissatisfied'}
                    {feedbackForm.rating === 2 && 'Fair - Somewhat dissatisfied'}
                    {feedbackForm.rating === 3 && 'Good - Neutral'}
                    {feedbackForm.rating === 4 && 'Very Good - Satisfied'}
                    {feedbackForm.rating === 5 && 'Excellent - Very satisfied'}
                  </p>
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
                    What aspect are you rating?
                  </label>
                  <select
                    value={feedbackForm.category}
                    onChange={(e) => setFeedbackForm({...feedbackForm, category: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Overall Experience">Overall Experience</option>
                    <option value="Resolution">Resolution Quality</option>
                    <option value="Response Time">Response Time</option>
                    <option value="Communication">Communication</option>
                  </select>
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={feedbackForm.anonymous}
                    onChange={(e) => setFeedbackForm({...feedbackForm, anonymous: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-600">
                    Submit feedback anonymously
                  </label>
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
                    disabled={feedbackForm.rating === 0}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
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

export default GiveFeedbackPage;