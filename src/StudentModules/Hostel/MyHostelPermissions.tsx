import React, { useState } from 'react';
import { 
  Shield, Clock, User, Users, MapPin, Calendar, 
  FileText, CheckCircle, AlertCircle, XCircle, 
  Send, Eye, Download, Plus, Filter, Search,
  Phone, Home, Car, Camera, Paperclip
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  block: string;
  roomNumber: string;
  parentContact: string;
  emergencyContact: string;
}

interface PermissionRequest {
  id: string;
  permissionType: 'Gate Pass' | 'Late Entry' | 'Visitor Permission' | 'Medical Leave' | 'Academic Leave' | 'Outstation Pass' | 'Emergency Exit';
  category: 'Local' | 'Outstation' | 'Emergency' | 'Official' | 'Personal' | 'Medical' | 'Academic';
  title: string;
  description: string;
  fromDateTime: string;
  toDateTime: string;
  destination?: string;
  purpose: string;
  accompaniedBy?: string;
  vehicleDetails?: string;
  contactDuringAbsence: string;
  emergencyContactPerson: string;
  status: 'Draft' | 'Pending Parent Approval' | 'Parent Approved' | 'Warden Approved' | 'HOD Approved' | 'Principal Approved' | 'Chairman Approved' | 'Rejected' | 'Cancelled' | 'Expired' | 'Active';
  currentApprovalLevel: 'Parent' | 'Warden' | 'HOD' | 'Principal' | 'Chairman' | 'Completed';
  submittedDate: string;
  lastUpdated: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  approvalFlow: {
    parentApproval?: { status: boolean; timestamp?: string; remarks?: string };
    wardenApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    hodApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    principalApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
    chairmanApproval?: { status: boolean; timestamp?: string; approvedBy?: string; remarks?: string };
  };
  attachments?: string[];
  qrCode?: string;
  rejectionReason?: string;
  parentNotificationSent?: boolean;
  smsStatus?: 'Sent' | 'Delivered' | 'Failed';
}

const MyPermissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'active'>('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Current student info
  const currentStudent: Student = {
    id: 'STU001',
    name: 'Rahul Kumar',
    rollNumber: '2023CSE001',
    block: 'A Block',
    roomNumber: 'A-205',
    parentContact: '+91-9876543210',
    emergencyContact: '+91-9876543211'
  };

  // Sample permissions data
  const [permissions, setPermissions] = useState<PermissionRequest[]>([
    {
      id: 'PERM001',
      permissionType: 'Gate Pass',
      category: 'Personal',
      title: 'Weekend Home Visit',
      description: 'Going home for family function and festival celebrations. Will be returning on Sunday evening.',
      fromDateTime: '2025-09-05T14:00:00Z',
      toDateTime: '2025-09-07T20:00:00Z',
      destination: 'Bangalore, Karnataka',
      purpose: 'Family festival celebration',
      accompaniedBy: 'Parents will pick up',
      vehicleDetails: 'Private Car - KA 09 AB 1234',
      contactDuringAbsence: '+91-9876543210',
      emergencyContactPerson: '+91-9876543211',
      status: 'Warden Approved',
      currentApprovalLevel: 'HOD',
      submittedDate: '2025-08-30T10:00:00Z',
      lastUpdated: '2025-09-01T14:30:00Z',
      priority: 'Medium',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-30T15:00:00Z', remarks: 'Approved by father via SMS' },
        wardenApproval: { status: true, timestamp: '2025-09-01T09:00:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Good student record. Family function approved.' }
      },
      qrCode: 'QR_PERM001_2025',
      parentNotificationSent: true,
      smsStatus: 'Delivered'
    },
    {
      id: 'PERM002',
      permissionType: 'Medical Leave',
      category: 'Medical',
      title: 'Dental Surgery',
      description: 'Scheduled dental surgery at Apollo Hospital. Doctor has recommended 4 days rest post-surgery.',
      fromDateTime: '2025-09-10T08:00:00Z',
      toDateTime: '2025-09-13T18:00:00Z',
      destination: 'Apollo Hospital, Bangalore',
      purpose: 'Dental surgery and recovery',
      contactDuringAbsence: '+91-9876543210',
      emergencyContactPerson: '+91-9876543211',
      status: 'Principal Approved',
      currentApprovalLevel: 'Completed',
      submittedDate: '2025-08-28T16:20:00Z',
      lastUpdated: '2025-09-01T11:00:00Z',
      priority: 'High',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-28T17:00:00Z' },
        wardenApproval: { status: true, timestamp: '2025-08-29T10:00:00Z', approvedBy: 'Mrs. Kavitha Rao' },
        hodApproval: { status: true, timestamp: '2025-08-30T14:00:00Z', approvedBy: 'Dr. ECE HOD' },
        principalApproval: { status: true, timestamp: '2025-09-01T11:00:00Z', approvedBy: 'Dr. Principal', remarks: 'Medical leave approved. Submit medical certificates on return.' }
      },
      attachments: ['medical_prescription.pdf', 'hospital_appointment.pdf'],
      qrCode: 'QR_PERM002_2025',
      parentNotificationSent: true,
      smsStatus: 'Delivered'
    },
    {
      id: 'PERM003',
      permissionType: 'Late Entry',
      category: 'Academic',
      title: 'Project Work Late Return',
      description: 'Working on final year project with external mentor. May return after hostel hours.',
      fromDateTime: '2025-09-08T20:00:00Z',
      toDateTime: '2025-09-09T02:00:00Z',
      destination: 'Tech Hub, Electronic City',
      purpose: 'Final year project work with industry mentor',
      contactDuringAbsence: '+91-9876543210',
      emergencyContactPerson: '+91-9876543211',
      status: 'Rejected',
      currentApprovalLevel: 'Completed',
      submittedDate: '2025-09-02T14:00:00Z',
      lastUpdated: '2025-09-02T16:30:00Z',
      priority: 'Medium',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-09-02T15:00:00Z' },
        wardenApproval: { status: false, timestamp: '2025-09-02T16:30:00Z', approvedBy: 'Dr. Rajesh Sharma', remarks: 'Late entries not recommended on weekdays. Please complete work during day hours.' }
      },
      rejectionReason: 'Late entries not recommended on weekdays for academic work. Please coordinate with mentor for daytime hours.',
      parentNotificationSent: true,
      smsStatus: 'Delivered'
    },
    {
      id: 'PERM004',
      permissionType: 'Visitor Permission',
      category: 'Personal',
      title: 'Parents Visit - Inspection',
      description: 'Parents coming to visit for room inspection and discussion about semester progress.',
      fromDateTime: '2025-09-12T10:00:00Z',
      toDateTime: '2025-09-12T18:00:00Z',
      destination: 'Hostel Premises',
      purpose: 'Parent visit for room inspection and academic discussion',
      contactDuringAbsence: '+91-9876543210',
      emergencyContactPerson: '+91-9876543211',
      status: 'Pending Parent Approval',
      currentApprovalLevel: 'Parent',
      submittedDate: '2025-09-02T18:00:00Z',
      lastUpdated: '2025-09-02T18:00:00Z',
      priority: 'Low',
      approvalFlow: {},
      parentNotificationSent: true,
      smsStatus: 'Sent'
    },
    {
      id: 'PERM005',
      permissionType: 'Outstation Pass',
      category: 'Official',
      title: 'Industry Conference',
      description: 'Attending National Tech Conference as college representative to present research paper.',
      fromDateTime: '2025-09-15T06:00:00Z',
      toDateTime: '2025-09-17T22:00:00Z',
      destination: 'IIT Delhi, New Delhi',
      purpose: 'Present research paper at national conference',
      accompaniedBy: 'Dr. Faculty Guide and fellow students',
      vehicleDetails: 'Train - Rajdhani Express',
      contactDuringAbsence: '+91-9876543210',
      emergencyContactPerson: '+91-9876543211',
      status: 'Active',
      currentApprovalLevel: 'Completed',
      submittedDate: '2025-08-25T10:00:00Z',
      lastUpdated: '2025-08-31T12:00:00Z',
      priority: 'High',
      approvalFlow: {
        parentApproval: { status: true, timestamp: '2025-08-25T11:00:00Z' },
        wardenApproval: { status: true, timestamp: '2025-08-26T09:00:00Z', approvedBy: 'Dr. Rajesh Sharma' },
        hodApproval: { status: true, timestamp: '2025-08-27T14:00:00Z', approvedBy: 'Dr. CSE HOD', remarks: 'Academic conference, fully supported' },
        principalApproval: { status: true, timestamp: '2025-08-28T10:00:00Z', approvedBy: 'Dr. Principal' },
        chairmanApproval: { status: true, timestamp: '2025-08-31T12:00:00Z', approvedBy: 'Dr. Chairman', remarks: 'International representation approved with full support.' }
      },
      attachments: ['conference_invitation.pdf', 'travel_itinerary.pdf'],
      qrCode: 'QR_PERM005_2025',
      parentNotificationSent: true,
      smsStatus: 'Delivered'
    }
  ]);

  // Form state for new permission request
  const [permissionForm, setPermissionForm] = useState({
    permissionType: 'Gate Pass' as PermissionRequest['permissionType'],
    category: 'Local' as PermissionRequest['category'],
    title: '',
    description: '',
    fromDateTime: '',
    toDateTime: '',
    destination: '',
    purpose: '',
    accompaniedBy: '',
    vehicleDetails: '',
    contactDuringAbsence: '',
    priority: 'Medium' as PermissionRequest['priority']
  });

  // Filter permissions based on active tab and search
  const filteredPermissions = permissions.filter(permission => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'pending' && ['Pending Parent Approval', 'Parent Approved', 'Warden Approved', 'HOD Approved', 'Principal Approved'].includes(permission.status)) ||
      (activeTab === 'approved' && ['Principal Approved', 'Chairman Approved'].includes(permission.status)) ||
      (activeTab === 'rejected' && permission.status === 'Rejected') ||
      (activeTab === 'active' && permission.status === 'Active');

    const matchesSearch = permission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.permissionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!permissionForm.title || !permissionForm.description || !permissionForm.fromDateTime || !permissionForm.purpose) {
      alert('Please fill in all required fields');
      return;
    }

    const newPermission: PermissionRequest = {
      id: `PERM${(permissions.length + 1).toString().padStart(3, '0')}`,
      ...permissionForm,
      status: 'Pending Parent Approval',
      currentApprovalLevel: 'Parent',
      submittedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      approvalFlow: {},
      contactDuringAbsence: permissionForm.contactDuringAbsence || currentStudent.parentContact,
      emergencyContactPerson: currentStudent.emergencyContact,
      parentNotificationSent: false,
      smsStatus: 'Sent'
    };

    setPermissions([...permissions, newPermission]);
    setPermissionForm({
      permissionType: 'Gate Pass', category: 'Local', title: '', description: '',
      fromDateTime: '', toDateTime: '', destination: '', purpose: '',
      accompaniedBy: '', vehicleDetails: '', contactDuringAbsence: '', priority: 'Medium'
    });
    setShowRequestForm(false);
    alert('Permission request submitted successfully! SMS notification sent to parent.');
  };

  const handleViewDetails = (permission: PermissionRequest) => {
    setSelectedPermission(permission);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPermission(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Pending Parent Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Parent Approved': return 'bg-blue-100 text-blue-800';
      case 'Warden Approved': return 'bg-indigo-100 text-indigo-800';
      case 'HOD Approved': return 'bg-purple-100 text-purple-800';
      case 'Principal Approved': return 'bg-green-100 text-green-800';
      case 'Chairman Approved': return 'bg-teal-100 text-teal-800';
      case 'Active': return 'bg-green-500 text-white';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        
       

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'all', label: 'All Permissions', count: permissions.length },
              { key: 'pending', label: 'Pending', count: permissions.filter(p => ['Pending Parent Approval', 'Parent Approved', 'Warden Approved', 'HOD Approved', 'Principal Approved'].includes(p.status)).length },
              { key: 'approved', label: 'Approved', count: permissions.filter(p => ['Principal Approved', 'Chairman Approved'].includes(p.status)).length },
              { key: 'rejected', label: 'Rejected', count: permissions.filter(p => p.status === 'Rejected').length },
              { key: 'active', label: 'Active', count: permissions.filter(p => p.status === 'Active').length }
            ].map((tab) => (
              <button
                key={tab.key}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setActiveTab(tab.key as any)}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.key ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and New Request */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search permissions by title, type, or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              New Permission Request
            </button>
          </div>
        </div>

        {/* Permissions List */}
        <div className="space-y-4">
          {filteredPermissions.length > 0 ? (
            filteredPermissions.map((permission) => (
              <div key={permission.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-gray-800">{permission.title}</h3>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(permission.status)}`}>
                        {permission.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(permission.priority)}`}>
                        {permission.priority}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600"><strong>Type:</strong> {permission.permissionType} ({permission.category})</p>
                        <p className="text-sm text-gray-600"><strong>Duration:</strong> {formatDateTime(permission.fromDateTime)} - {formatDateTime(permission.toDateTime)}</p>
                        {permission.destination && <p className="text-sm text-gray-600"><strong>Destination:</strong> {permission.destination}</p>}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600"><strong>Purpose:</strong> {permission.purpose}</p>
                        <p className="text-sm text-gray-600"><strong>Submitted:</strong> {formatDateTime(permission.submittedDate)}</p>
                        <p className="text-sm text-gray-600"><strong>Next Approver:</strong> {permission.currentApprovalLevel !== 'Completed' ? permission.currentApprovalLevel : 'All Approved'}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{permission.description}</p>
                    
                    {/* SMS Status */}
                    {permission.parentNotificationSent && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${
                          permission.smsStatus === 'Delivered' ? 'bg-green-500' :
                          permission.smsStatus === 'Sent' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-xs text-gray-500">
                          Parent SMS: {permission.smsStatus}
                        </span>
                      </div>
                    )}

                    {/* Rejection Reason */}
                    {permission.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-800 text-sm"><strong>Rejection Reason:</strong> {permission.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewDetails(permission)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  {permission.status === 'Active' && permission.qrCode && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Pass
                    </button>
                  )}
                  
                  {permission.attachments && permission.attachments.length > 0 && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      Attachments ({permission.attachments.length})
                    </button>
                  )}
                  
                  {['Pending Parent Approval', 'Draft'].includes(permission.status) && (
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm hover:bg-red-50 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Permissions Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'No permissions match your search criteria.' : 'You haven\'t submitted any permission requests yet.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Your First Request
                </button>
              )}
            </div>
          )}
        </div>

        {/* New Permission Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-800">New Permission Request</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permission Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={permissionForm.permissionType}
                      onChange={(e) => setPermissionForm({...permissionForm, permissionType: e.target.value as PermissionRequest['permissionType']})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Gate Pass">Gate Pass</option>
                      <option value="Late Entry">Late Entry</option>
                      <option value="Visitor Permission">Visitor Permission</option>
                      <option value="Medical Leave">Medical Leave</option>
                      <option value="Academic Leave">Academic Leave</option>
                      <option value="Outstation Pass">Outstation Pass</option>
                      <option value="Emergency Exit">Emergency Exit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={permissionForm.category}
                      onChange={(e) => setPermissionForm({...permissionForm, category: e.target.value as PermissionRequest['category']})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Local">Local</option>
                      <option value="Outstation">Outstation</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Official">Official</option>
                      <option value="Personal">Personal</option>
                      <option value="Medical">Medical</option>
                      <option value="Academic">Academic</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={permissionForm.title}
                      onChange={(e) => setPermissionForm({...permissionForm, title: e.target.value})}
                      placeholder="Brief title for your permission request"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description & Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={permissionForm.description}
                      onChange={(e) => setPermissionForm({...permissionForm, description: e.target.value})}
                      placeholder="Provide detailed reason for this permission request..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Date & Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={permissionForm.fromDateTime}
                      onChange={(e) => setPermissionForm({...permissionForm, fromDateTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date & Time</label>
                    <input
                      type="datetime-local"
                      value={permissionForm.toDateTime}
                      onChange={(e) => setPermissionForm({...permissionForm, toDateTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                    <input
                      type="text"
                      value={permissionForm.destination}
                      onChange={(e) => setPermissionForm({...permissionForm, destination: e.target.value})}
                      placeholder="Where are you going?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={permissionForm.purpose}
                      onChange={(e) => setPermissionForm({...permissionForm, purpose: e.target.value})}
                      placeholder="Purpose of this permission"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accompanied By</label>
                    <input
                      type="text"
                      value={permissionForm.accompaniedBy}
                      onChange={(e) => setPermissionForm({...permissionForm, accompaniedBy: e.target.value})}
                      placeholder="Who will be with you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Details</label>
                    <input
                      type="text"
                      value={permissionForm.vehicleDetails}
                      onChange={(e) => setPermissionForm({...permissionForm, vehicleDetails: e.target.value})}
                      placeholder="Transport mode and details"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact During Absence</label>
                    <input
                      type="tel"
                      value={permissionForm.contactDuringAbsence}
                      onChange={(e) => setPermissionForm({...permissionForm, contactDuringAbsence: e.target.value})}
                      placeholder="Your contact number during absence"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={permissionForm.priority}
                      onChange={(e) => setPermissionForm({...permissionForm, priority: e.target.value as PermissionRequest['priority']})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Submit Permission Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="p-6 pt-0">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">📋 Permission Guidelines</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Submit requests at least 24 hours in advance for non-emergency cases</li>
                    <li>• Parent approval via SMS is required for all requests</li>
                    <li>• For outstation travel, provide complete itinerary and contact details</li>
                    <li>• Medical permissions require supporting documents upon return</li>
                    <li>• Emergency permissions can be processed immediately with proper justification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Permission Detail Modal */}
        {isDetailModalOpen && selectedPermission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Permission Details - #{selectedPermission.id}</h2>
                  <p className="text-gray-600">{selectedPermission.title}</p>
                </div>
                <button
                  onClick={closeDetailModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Permission Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Permission Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{selectedPermission.permissionType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{selectedPermission.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className="font-medium">{formatDateTime(selectedPermission.fromDateTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-medium">{formatDateTime(selectedPermission.toDateTime)}</span>
                        </div>
                        {selectedPermission.destination && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Destination:</span>
                            <span className="font-medium">{selectedPermission.destination}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(selectedPermission.priority)}`}>
                            {selectedPermission.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPermission.status)}`}>
                            {selectedPermission.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Description & Purpose</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{selectedPermission.description}</p>
                      <p className="text-gray-600 text-sm"><strong>Purpose:</strong> {selectedPermission.purpose}</p>
                    </div>
                  </div>

                  {/* Approval Flow */}
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Workflow</h3>
                      <div className="space-y-4">
                        {/* Parent Approval */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-medium text-gray-800">Parent Approval</h4>
                            <p className="text-xs text-gray-600">SMS verification required</p>
                          </div>
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            selectedPermission.approvalFlow.parentApproval?.status ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {selectedPermission.approvalFlow.parentApproval?.status ? 'Approved' : 'Pending'}
                          </span>
                        </div>

                        {/* Warden Approval */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h4 className="font-medium text-gray-800">Warden Approval</h4>
                            <p className="text-xs text-gray-600">Hostel administration review</p>
                          </div>
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            selectedPermission.approvalFlow.wardenApproval?.status === true ? 'bg-green-500 text-white' :
                            selectedPermission.approvalFlow.wardenApproval?.status === false ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {selectedPermission.approvalFlow.wardenApproval?.status === true ? 'Approved' : 
                             selectedPermission.approvalFlow.wardenApproval?.status === false ? 'Rejected' : 'Pending'}
                          </span>
                        </div>

                        {/* HOD Approval */}
                        {selectedPermission.approvalFlow.hodApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">HOD Approval</h4>
                              <p className="text-xs text-gray-600">Department head approval</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              selectedPermission.approvalFlow.hodApproval?.status === true ? 'bg-green-500 text-white' :
                              selectedPermission.approvalFlow.hodApproval?.status === false ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {selectedPermission.approvalFlow.hodApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.hodApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}

                        {/* Principal Approval */}
                        {selectedPermission.approvalFlow.principalApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">Principal Approval</h4>
                              <p className="text-xs text-gray-600">Final institutional approval</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              selectedPermission.approvalFlow.principalApproval?.status === true ? 'bg-green-500 text-white' :
                              selectedPermission.approvalFlow.principalApproval?.status === false ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {selectedPermission.approvalFlow.principalApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.principalApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}

                        {/* Chairman Approval */}
                        {selectedPermission.approvalFlow.chairmanApproval !== undefined && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div>
                              <h4 className="font-medium text-gray-800">Chairman Approval</h4>
                              <p className="text-xs text-gray-600">Top-level authorization</p>
                            </div>
                            <span className={`px-3 py-1 text-sm rounded-full ${
                              selectedPermission.approvalFlow.chairmanApproval?.status === true ? 'bg-green-500 text-white' :
                              selectedPermission.approvalFlow.chairmanApproval?.status === false ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {selectedPermission.approvalFlow.chairmanApproval?.status === true ? 'Approved' : 
                               selectedPermission.approvalFlow.chairmanApproval?.status === false ? 'Rejected' : 'Pending'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedPermission.qrCode && (
                      <div className="bg-purple-50 rounded-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Digital Permission Pass</h3>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-purple-300 mb-4">
                          <div className="text-6xl mb-2">📱</div>
                          <p className="text-sm text-gray-600">QR Code: {selectedPermission.qrCode}</p>
                        </div>
                        <p className="text-xs text-gray-600">Present this QR code for entry/exit verification</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Approval Remarks */}
                {Object.values(selectedPermission.approvalFlow).some(approval => approval?.remarks) && (
                  <div className="mt-8 bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Remarks</h3>
                    <div className="space-y-3">
                      {selectedPermission.approvalFlow.parentApproval?.remarks && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm"><strong>Parent:</strong> {selectedPermission.approvalFlow.parentApproval.remarks}</p>
                        </div>
                      )}
                      {selectedPermission.approvalFlow.wardenApproval?.remarks && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm"><strong>Warden:</strong> {selectedPermission.approvalFlow.wardenApproval.remarks}</p>
                        </div>
                      )}
                      {selectedPermission.approvalFlow.hodApproval?.remarks && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm"><strong>HOD:</strong> {selectedPermission.approvalFlow.hodApproval.remarks}</p>
                        </div>
                      )}
                      {selectedPermission.approvalFlow.principalApproval?.remarks && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm"><strong>Principal:</strong> {selectedPermission.approvalFlow.principalApproval.remarks}</p>
                        </div>
                      )}
                      {selectedPermission.approvalFlow.chairmanApproval?.remarks && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm"><strong>Chairman:</strong> {selectedPermission.approvalFlow.chairmanApproval.remarks}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPermissionsPage;
