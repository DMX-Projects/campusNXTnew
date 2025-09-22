import React, { useState, useRef } from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { 
  Users,
  FileText,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  AlertTriangle,
  Download,
  Search,
  Filter,
  X,
  Check,
  FileImage,
  FileCheck,
  UserCheck
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  fileName?: string;
  uploadDate?: string;
  comments?: string;
  fileUrl?: string;
  fileType?: string;
}

interface Applicant {
  id: string;
  name: string;
  applicationId: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  documents: Document[];
  completionPercentage: number;
}

const DocumentVerification = () => {
  const { isDark } = useTheme();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewerDocument, setViewerDocument] = useState<Document | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: string } | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Mock data for applicants
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      applicationId: 'APP-2024-001',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      appliedDate: '2024-01-15',
      status: 'pending',
      completionPercentage: 75,
      documents: [
        {
          id: '1',
          name: '10th Marksheet',
          required: true,
          status: 'uploaded',
          fileName: 'rajesh_10th_marksheet.pdf',
          uploadDate: '2024-01-16',
          fileType: 'pdf',
          fileUrl: '#'
        },
        {
          id: '2',
          name: 'ID Proof (Aadhar Card)',
          required: true,
          status: 'approved',
          fileName: 'rajesh_aadhar.jpg',
          uploadDate: '2024-01-16',
          fileType: 'image',
          fileUrl: '#'
        },
        {
          id: '3',
          name: '12th Marksheet',
          required: true,
          status: 'rejected',
          fileName: 'rajesh_12th_marksheet.jpg',
          uploadDate: '2024-01-17',
          comments: 'Image is unclear, please re-upload with better quality',
          fileType: 'image',
          fileUrl: '#'
        },
        {
          id: '4',
          name: 'Photo',
          required: true,
          status: 'pending',
          fileType: 'image'
        },
        {
          id: '5',
          name: 'Income Certificate',
          required: false,
          status: 'uploaded',
          fileName: 'income_certificate.pdf',
          uploadDate: '2024-01-18',
          fileType: 'pdf',
          fileUrl: '#'
        }
      ]
    },
    {
      id: '2',
      name: 'Priya Sharma',
      applicationId: 'APP-2024-002',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      appliedDate: '2024-01-16',
      status: 'in-review',
      completionPercentage: 90,
      documents: [
        {
          id: '1',
          name: '10th Marksheet',
          required: true,
          status: 'approved',
          fileName: 'priya_10th_marksheet.pdf',
          uploadDate: '2024-01-17',
          fileType: 'pdf',
          fileUrl: '#'
        },
        {
          id: '2',
          name: 'ID Proof (Aadhar Card)',
          required: true,
          status: 'approved',
          fileName: 'priya_aadhar.jpg',
          uploadDate: '2024-01-17',
          fileType: 'image',
          fileUrl: '#'
        },
        {
          id: '3',
          name: '12th Marksheet',
          required: true,
          status: 'uploaded',
          fileName: 'priya_12th_marksheet.pdf',
          uploadDate: '2024-01-18',
          fileType: 'pdf',
          fileUrl: '#'
        },
        {
          id: '4',
          name: 'Photo',
          required: true,
          status: 'approved',
          fileName: 'priya_photo.jpg',
          uploadDate: '2024-01-18',
          fileType: 'image',
          fileUrl: '#'
        }
      ]
    },
    {
      id: '3',
      name: 'Amit Patel',
      applicationId: 'APP-2024-003',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      appliedDate: '2024-01-17',
      status: 'pending',
      completionPercentage: 50,
      documents: [
        {
          id: '1',
          name: '10th Marksheet',
          required: true,
          status: 'uploaded',
          fileName: 'amit_10th_marksheet.jpg',
          uploadDate: '2024-01-18',
          fileType: 'image',
          fileUrl: '#'
        },
        {
          id: '2',
          name: 'ID Proof (Aadhar Card)',
          required: true,
          status: 'pending',
          fileType: 'image'
        },
        {
          id: '3',
          name: '12th Marksheet',
          required: true,
          status: 'pending',
          fileType: 'pdf'
        },
        {
          id: '4',
          name: 'Photo',
          required: true,
          status: 'pending',
          fileType: 'image'
        }
      ]
    }
  ]);

  // Filter applicants based on search and filter
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || applicant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Show toast message
  const showToast = (message: string, type: string = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = (documents: Document[]) => {
    const requiredDocs = documents.filter(doc => doc.required);
    if (requiredDocs.length === 0) return 100;
    
    const approvedDocs = requiredDocs.filter(doc => doc.status === 'approved');
    return Math.round((approvedDocs.length / requiredDocs.length) * 100);
  };

  // Handle document approval
  const handleDocumentApproval = (applicantId: string, documentId: string, action: 'approve' | 'reject', comments?: string) => {
    setApplicants(prev => prev.map(applicant => {
      if (applicant.id === applicantId) {
        const updatedDocuments = applicant.documents.map(doc => {
          if (doc.id === documentId) {
            return {
              ...doc,
              status: action === 'approve' ? 'approved' as const : 'rejected' as const,
              comments: action === 'reject' ? comments || 'Document rejected' : ''
            };
          }
          return doc;
        });

        const completionPercentage = calculateCompletionPercentage(updatedDocuments);

        const updatedApplicant = {
          ...applicant,
          documents: updatedDocuments,
          completionPercentage,
          status: completionPercentage === 100 ? 'in-review' as const : applicant.status
        };

        // Update selected applicant if it's the same one
        if (selectedApplicant?.id === applicantId) {
          setSelectedApplicant(updatedApplicant);
        }

        return updatedApplicant;
      }
      return applicant;
    }));

    showToast(`Document ${action === 'approve' ? 'approved' : 'rejected'} successfully!`, 
              action === 'approve' ? 'success' : 'warning');
  };

  // Handle file upload
  const handleFileUpload = (applicantId: string, documentId: string, file: File) => {
    const fileName = file.name;
    const fileType = file.type.includes('image') ? 'image' : 'pdf';
    const fileUrl = URL.createObjectURL(file);

    setApplicants(prev => prev.map(applicant => {
      if (applicant.id === applicantId) {
        const updatedDocuments = applicant.documents.map(doc => {
          if (doc.id === documentId) {
            return {
              ...doc,
              status: 'uploaded' as const,
              fileName,
              uploadDate: new Date().toISOString().split('T')[0],
              fileType,
              fileUrl
            };
          }
          return doc;
        });

        const completionPercentage = calculateCompletionPercentage(updatedDocuments);

        const updatedApplicant = {
          ...applicant,
          documents: updatedDocuments,
          completionPercentage
        };

        if (selectedApplicant?.id === applicantId) {
          setSelectedApplicant(updatedApplicant);
        }

        return updatedApplicant;
      }
      return applicant;
    }));

    showToast('Document uploaded successfully!', 'success');
  };

  // Handle file input trigger
  const handleUploadClick = (applicantId: string, documentId: string) => {
    const key = `${applicantId}-${documentId}`;
    fileInputRefs.current[key]?.click();
  };

  // Handle view document
  const handleViewDocument = (document: Document) => {
    setViewerDocument(document);
    showToast(`Opening ${document.name}...`, 'success');
  };

  // Handle download document
  const handleDownloadDocument = (document: Document) => {
    if (document.fileUrl && document.fileName) {
      // Create a temporary link to download
      const link = document.createElement('a');
      link.href = document.fileUrl;
      link.download = document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloading ${document.fileName}...`, 'success');
    } else {
      showToast('No file available for download', 'warning');
    }
  };

  // Finalize verification
  const handleFinalizeVerification = () => {
    if (!selectedApplicant) return;

    const allRequiredApproved = selectedApplicant.documents
      .filter(doc => doc.required)
      .every(doc => doc.status === 'approved');

    if (allRequiredApproved) {
      setApplicants(prev => prev.map(applicant => 
        applicant.id === selectedApplicant.id 
          ? { ...applicant, status: 'approved' }
          : applicant
      ));
      showToast('Verification finalized successfully! Applicant approved.', 'success');
      setSelectedApplicant({ ...selectedApplicant, status: 'approved' });
    } else {
      showToast('All required documents must be approved first', 'warning');
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    showToast('Search cleared', 'success');
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilterStatus('all');
    setSearchTerm('');
    showToast('Filters reset', 'success');
  };

  // Check if finalize button should be enabled
  const canFinalize = selectedApplicant?.documents
    .filter(doc => doc.required)
    .every(doc => doc.status === 'approved') || false;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage.message} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Document Viewer Modal */}
      {viewerDocument && (
        <DocumentViewer 
          document={viewerDocument}
          onClose={() => setViewerDocument(null)}
          onDownload={() => handleDownloadDocument(viewerDocument)}
          isDark={isDark}
        />
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Document Verification
          </h1>
          {/* <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Review and verify applicant documents for transport registration
          </p> */}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Applicants List */}
          <div className="lg:col-span-4">
            <div className={`rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Pending Applications ({filteredApplicants.length})
                </h3>
                
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    {searchTerm && (
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-review">In Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={handleResetFilters}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredApplicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    isSelected={selectedApplicant?.id === applicant.id}
                    onClick={() => {
                      setSelectedApplicant(applicant);
                      showToast(`Selected ${applicant.name}`, 'success');
                    }}
                    isDark={isDark}
                  />
                ))}
                
                {filteredApplicants.length === 0 && (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-lg font-medium mb-1">No applicants found</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Document Details */}
          <div className="lg:col-span-8">
            {selectedApplicant ? (
              <div className={`rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedApplicant.name}</h3>
                      <p className="text-sm text-gray-500">{selectedApplicant.applicationId}</p>
                      <div className="flex items-center mt-2 space-x-4 text-sm">
                        <span>{selectedApplicant.email}</span>
                        <span>{selectedApplicant.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedApplicant.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        selectedApplicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        selectedApplicant.status === 'in-review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {selectedApplicant.status === 'in-review' ? 'In Review' : selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedApplicant.completionPercentage}%</span>
                        </div>
                        <div className={`w-24 h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${selectedApplicant.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-semibold flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-500" />
                      Required Documents
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {selectedApplicant.documents.map((document) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        applicantId={selectedApplicant.id}
                        onApprove={(comments) => handleDocumentApproval(selectedApplicant.id, document.id, 'approve', comments)}
                        onReject={(comments) => handleDocumentApproval(selectedApplicant.id, document.id, 'reject', comments)}
                        onUpload={(file) => handleFileUpload(selectedApplicant.id, document.id, file)}
                        onView={() => handleViewDocument(document)}
                        onUploadClick={() => handleUploadClick(selectedApplicant.id, document.id)}
                        fileInputRef={(ref) => {
                          const key = `${selectedApplicant.id}-${document.id}`;
                          fileInputRefs.current[key] = ref;
                        }}
                        isDark={isDark}
                      />
                    ))}
                  </div>

                  {/* Finalize Verification Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleFinalizeVerification}
                      disabled={!canFinalize}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center ${
                        canFinalize
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <UserCheck className="w-5 h-5 mr-2" />
                      Finalize Verification
                    </button>
                    {!canFinalize && (
                      <p className="text-sm text-center mt-2 text-gray-500">
                        All required documents must be approved to finalize verification
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-xl shadow-md flex items-center justify-center h-96 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select an Applicant</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose an applicant from the left panel to review their documents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Applicant Card Component
const ApplicantCard: React.FC<{
  applicant: Applicant;
  isSelected: boolean;
  onClick: () => void;
  isDark: boolean;
}> = ({ applicant, isSelected, onClick, isDark }) => (
  <div
    onClick={onClick}
    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:shadow-sm ${
      isSelected 
        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
    }`}
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <h4 className="font-semibold">{applicant.name}</h4>
        <p className="text-sm text-gray-500">{applicant.applicationId}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        applicant.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        applicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
        applicant.status === 'in-review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      }`}>
        {applicant.status === 'in-review' ? 'In Review' : applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
      </span>
    </div>
    
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">Applied: {applicant.appliedDate}</span>
      <div className="flex items-center space-x-2">
        <span>{applicant.completionPercentage}%</span>
        <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${applicant.completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Document Card Component
const DocumentCard: React.FC<{
  document: Document;
  applicantId: string;
  onApprove: (comments?: string) => void;
  onReject: (comments?: string) => void;
  onUpload: (file: File) => void;
  onView: () => void;
  onUploadClick: () => void;
  fileInputRef: (ref: HTMLInputElement | null) => void;
  isDark: boolean;
}> = ({ document, onApprove, onReject, onUpload, onView, onUploadClick, fileInputRef, isDark }) => {
  const [comments, setComments] = useState(document.comments || '');
  const [showComments, setShowComments] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      // Reset the input
      event.target.value = '';
    }
  };

  const handleApprove = () => {
    onApprove(comments);
    setComments('');
  };

  const handleReject = () => {
    if (comments.trim()) {
      onReject(comments);
      setComments('');
      setShowComments(false);
    } else {
      alert('Please add a comment before rejecting the document.');
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      document.status === 'approved' ? 'border-green-300 bg-green-50 dark:bg-green-900/10 dark:border-green-700' :
      document.status === 'rejected' ? 'border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-700' :
      document.status === 'uploaded' ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-700' :
      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            document.status === 'approved' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
            document.status === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
            document.status === 'uploaded' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {document.fileType === 'image' ? <FileImage className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <div>
            <h5 className="font-semibold flex items-center">
              {document.name}
              {document.required && <span className="text-red-500 ml-1">*</span>}
            </h5>
            {document.fileName && (
              <p className="text-sm text-gray-500">
                {document.fileName} • Uploaded {document.uploadDate}
              </p>
            )}
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          document.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          document.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
          document.status === 'uploaded' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
        }`}>
          {document.status === 'pending' ? 'Not Uploaded' : 
           document.status.charAt(0).toUpperCase() + document.status.slice(1)}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept={document.fileType === 'image' ? 'image/*' : '.pdf'}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {document.status === 'pending' && (
          <button
            onClick={onUploadClick}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </button>
        )}
        
        {(document.status === 'uploaded' || document.status === 'approved' || document.status === 'rejected') && (
          <button
            onClick={onView}
            className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center text-sm"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
        )}

        {document.status === 'uploaded' && (
          <>
            <button
              onClick={handleApprove}
              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center text-sm"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </button>
            <button
              onClick={() => setShowComments(true)}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center text-sm"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </button>
          </>
        )}

        <button
          onClick={() => setShowComments(!showComments)}
          className={`px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center text-sm ${
            isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Comment
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t pt-3 mt-3">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add comments for this document..."
            rows={3}
            className={`w-full p-2 rounded border text-sm resize-none ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          <div className="flex space-x-2 mt-2">
            {document.status === 'uploaded' && (
              <button
                onClick={handleReject}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Reject with Comment
              </button>
            )}
            <button
              onClick={() => setShowComments(false)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display existing comments */}
      {document.comments && !showComments && (
        <div className={`mt-3 p-2 rounded text-sm ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <strong>Comment:</strong> {document.comments}
        </div>
      )}
    </div>
  );
};

// Document Viewer Modal
const DocumentViewer: React.FC<{
  document: Document;
  onClose: () => void;
  onDownload: () => void;
  isDark: boolean;
}> = ({ document, onClose, onDownload, isDark }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`px-6 py-4 border-b flex justify-between items-center ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div>
            <h3 className="text-xl font-semibold">{document.name}</h3>
            <p className="text-sm text-gray-500">{document.fileName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 max-h-96 overflow-auto">
          <div className={`h-96 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-center">
              {document.fileType === 'image' ? (
                <FileImage className="w-16 h-16 mx-auto text-gray-400 mb-3" />
              ) : (
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-3" />
              )}
              <p className="text-lg font-medium mb-2">Document Viewer</p>
              <p className="text-sm text-gray-500 mb-4">
                {document.fileType === 'image' ? 'Image' : 'PDF'} preview would be displayed here
              </p>
              <button 
                onClick={onDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Toast Component
const Toast: React.FC<{
  message: string;
  type: string;
  onClose: () => void;
}> = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
    <div className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden ${
      type === 'success' ? 'bg-green-600' : 
      type === 'warning' ? 'bg-orange-600' : 'bg-red-600'
    }`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? <CheckCircle className="h-5 w-5 text-white" /> : 
             type === 'warning' ? <AlertTriangle className="h-5 w-5 text-white" /> :
             <XCircle className="h-5 w-5 text-white" />}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DocumentVerification;
