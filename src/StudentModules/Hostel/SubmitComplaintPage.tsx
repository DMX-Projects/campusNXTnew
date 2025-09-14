import React, { useState } from 'react';
import { 
  MessageSquare, AlertTriangle, Camera, FileText, 
  Clock, CheckCircle, User, Home, Building2, Phone, Mail,
  Info, X, Upload, MapPin, Calendar, Star
} from 'lucide-react';

interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  type: 'Maintenance' | 'Mess' | 'Security' | 'Wi-Fi' | 'Cleaning' | 'Other';
  category: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Submitted' | 'In Progress' | 'Resolved' | 'Cancelled';
  submittedDate: string;
  assignedTo?: string;
  resolvedDate?: string;
  remarks?: string;
  attachments: string[];
  location: string;
}

interface ComplaintCategory {
  type: string;
  categories: string[];
  description: string;
  icon: string;
}

const SubmitComplaintPage: React.FC = () => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    type: 'Maintenance' as Complaint['type'],
    category: '',
    description: '',
    priority: 'Medium' as Complaint['priority'],
    location: '',
    attachments: [] as string[]
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

  const complaintCategories: ComplaintCategory[] = [
    {
      type: 'Maintenance',
      categories: ['AC/Fan', 'Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Wi-Fi'],
      description: 'Room and facility maintenance issues',
      icon: '🔧'
    },
    {
      type: 'Mess',
      categories: ['Food Quality', 'Menu', 'Timing', 'Hygiene', 'Staff Behavior', 'Equipment'],
      description: 'Mess and dining related complaints',
      icon: '🍽️'
    },
    {
      type: 'Security',
      categories: ['Gate Access', 'Visitor Policy', 'Night Security', 'Emergency', 'Theft', 'Safety'],
      description: 'Security and safety concerns',
      icon: '🛡️'
    },
    {
      type: 'Wi-Fi',
      categories: ['Slow Speed', 'Connection Issues', 'Password Problems', 'Coverage', 'Technical'],
      description: 'Internet and connectivity issues',
      icon: '📶'
    },
    {
      type: 'Cleaning',
      categories: ['Room Cleaning', 'Common Areas', 'Bathroom', 'Laundry', 'Waste Management'],
      description: 'Cleaning and hygiene complaints',
      icon: '🧹'
    },
    {
      type: 'Other',
      categories: ['Noise', 'Roommate Issues', 'Administration', 'General', 'Suggestions'],
      description: 'Other complaints and suggestions',
      icon: '📝'
    }
  ];

  const existingComplaints: Complaint[] = [
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
      remarks: 'Technician will visit on Jan 15th',
      attachments: ['ac_issue.jpg'],
      location: 'Room A-201'
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
      resolvedDate: '2025-01-08',
      remarks: 'New cook appointed, quality improved',
      attachments: [],
      location: 'Mess Hall'
    }
  ];

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Complaint submitted:', complaintForm);
    alert('Complaint submitted successfully! You will be notified about the status.');
    setShowComplaintForm(false);
    setComplaintForm({
      type: 'Maintenance',
      category: '',
      description: '',
      priority: 'Medium',
      location: '',
      attachments: []
    });
  };

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

  const getCurrentCategories = () => {
    const selectedType = complaintCategories.find(cat => cat.type === complaintForm.type);
    return selectedType ? selectedType.categories : [];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="  mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <MessageSquare className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Submit Complaint</h1>
                <p className="text-gray-600">Report issues and submit complaints to hostel administration</p>
              </div>
            </div>
            <button
              onClick={() => setShowComplaintForm(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              New Complaint
            </button>
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
              <Home className="w-5 h-5 text-gray-500" />
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
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentStudent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complaint Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Complaint Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaintCategories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{category.type}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Common Issues:</h4>
                  <div className="flex flex-wrap gap-1">
                    {category.categories.slice(0, 4).map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                    {category.categories.length > 4 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        +{category.categories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Complaints */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Complaints</h2>
          
          {existingComplaints.length > 0 ? (
            <div className="space-y-4">
              {existingComplaints.map((complaint) => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
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
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Submitted: {new Date(complaint.submittedDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Complaint Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Type: {complaint.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Category: {complaint.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Location: {complaint.location}</span>
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
                      <h4 className="font-medium text-gray-700 mb-2">Attachments</h4>
                      {complaint.attachments.length > 0 ? (
                        <div className="space-y-1">
                          {complaint.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Camera className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{attachment}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No attachments</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{complaint.description}</p>
                  </div>

                  {complaint.remarks && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Admin Remarks:</strong> {complaint.remarks}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Complaints Submitted</h3>
              <p className="text-gray-500">You haven't submitted any complaints yet</p>
            </div>
          )}
        </div>

        {/* Complaint Form Modal */}
        {showComplaintForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Submit New Complaint</h3>
                <button
                  onClick={() => setShowComplaintForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleComplaintSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complaint Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={complaintForm.type}
                      onChange={(e) => setComplaintForm({...complaintForm, type: e.target.value as Complaint['type'], category: ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    >
                      {complaintCategories.map((category) => (
                        <option key={category.type} value={category.type}>
                          {category.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({...complaintForm, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {getCurrentCategories().map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={complaintForm.priority}
                    onChange={(e) => setComplaintForm({...complaintForm, priority: e.target.value as Complaint['priority']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Low">Low - Can wait</option>
                    <option value="Medium">Medium - Normal priority</option>
                    <option value="High">High - Urgent attention needed</option>
                    <option value="Urgent">Urgent - Immediate action required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={complaintForm.location}
                    onChange={(e) => setComplaintForm({...complaintForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Room A-201, Mess Hall, Common Area"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Please provide a detailed description of the issue..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos or documents</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900 mb-1">Important Information</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Provide accurate and detailed information</li>
                        <li>• Attach photos if applicable for better understanding</li>
                        <li>• You will be notified about the complaint status</li>
                        <li>• False complaints may result in disciplinary action</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium"
                  >
                    Submit Complaint
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowComplaintForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
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

export default SubmitComplaintPage;