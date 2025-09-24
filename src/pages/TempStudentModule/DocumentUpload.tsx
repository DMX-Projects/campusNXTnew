import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  Eye,
  Trash2,
  Download,
  Info,
  Image,
  File,
  Camera,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Share,
  ExternalLink
} from 'lucide-react';

const DocumentUpload = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [draggedOver, setDraggedOver] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [viewModal, setViewModal] = useState(null);
  const [downloadModal, setDownloadModal] = useState(null);
  const [imageZoom, setImageZoom] = useState(100);

  // Sample document requirements - in real app this would come from API
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Transfer Certificate",
      description: "Official TC from previous institution",
      status: "approved",
      acceptedFormats: ["PDF", "JPG", "PNG"],
      maxSize: "5MB",
      uploadedFile: {
        name: "transfer_certificate.pdf",
        size: "2.3MB",
        uploadDate: "2024-02-15",
        url: "https://example.com/sample.pdf",
        type: "pdf"
      },
      mandatory: true,
      reviewComments: "Document verified and approved"
    },
    {
      id: 2,
      name: "Government ID Proof",
      description: "Valid government-issued photo ID (Passport, Driver's License, etc.)",
      status: "pending",
      acceptedFormats: ["PDF", "JPG", "PNG"],
      maxSize: "5MB",
      uploadedFile: null,
      mandatory: true,
      reviewComments: null
    },
    {
      id: 3,
      name: "Academic Transcripts",
      description: "Official transcripts from all previous institutions",
      status: "uploaded",
      acceptedFormats: ["PDF"],
      maxSize: "10MB",
      uploadedFile: {
        name: "academic_transcripts.pdf",
        size: "4.7MB",
        uploadDate: "2024-02-18",
        url: "https://example.com/transcripts.pdf",
        type: "pdf"
      },
      mandatory: true,
      reviewComments: null
    },
    {
      id: 4,
      name: "Medical Certificate",
      description: "Health fitness certificate from registered medical practitioner",
      status: "rejected",
      acceptedFormats: ["PDF", "JPG", "PNG"],
      maxSize: "5MB",
      uploadedFile: {
        name: "medical_certificate.jpg",
        size: "1.8MB",
        uploadDate: "2024-02-12",
        url: "https://picsum.photos/800/1000?random=1",
        type: "image"
      },
      mandatory: true,
      reviewComments: "Document is not clear. Please upload a clearer version or a PDF format."
    },
    {
      id: 5,
      name: "Character Certificate",
      description: "Character certificate from previous institution or employer",
      status: "pending",
      acceptedFormats: ["PDF", "JPG", "PNG"],
      maxSize: "5MB",
      uploadedFile: null,
      mandatory: false,
      reviewComments: null
    },
    {
      id: 6,
      name: "Passport Size Photo",
      description: "Recent passport size photograph with white background",
      status: "uploaded",
      acceptedFormats: ["JPG", "PNG"],
      maxSize: "2MB",
      uploadedFile: {
        name: "passport_photo.jpg",
        size: "0.8MB",
        uploadDate: "2024-02-20",
        url: "https://picsum.photos/400/600?random=2",
        type: "image"
      },
      mandatory: true,
      reviewComments: null
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'uploaded':
        return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400 dark:text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'rejected':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'uploaded':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'uploaded':
        return 'Under Review';
      default:
        return 'Pending Upload';
    }
  };

  const handleFileUpload = (docId, file) => {
    if (!file) return;

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [docId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[docId] || 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Determine file type
          const fileType = file.type.startsWith('image/') ? 'image' : 'pdf';
          const mockUrl = fileType === 'image' 
            ? `https://picsum.photos/800/1000?random=${Math.floor(Math.random() * 1000)}`
            : `https://example.com/${file.name}`;
          
          // Update document status
          setDocuments(prevDocs => 
            prevDocs.map(doc => 
              doc.id === docId 
                ? {
                    ...doc, 
                    status: 'uploaded',
                    uploadedFile: {
                      name: file.name,
                      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
                      uploadDate: new Date().toISOString().split('T')[0],
                      url: mockUrl,
                      type: fileType
                    }
                  }
                : doc
            )
          );
          // Clear progress after a short delay
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProg = { ...prev };
              delete newProg[docId];
              return newProg;
            });
          }, 1000);
          return { ...prev, [docId]: 100 };
        }
        return { ...prev, [docId]: newProgress };
      });
    }, 200);
  };

  const handleDragOver = (e, docId) => {
    e.preventDefault();
    setDraggedOver(docId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(null);
  };

  const handleDrop = (e, docId) => {
    e.preventDefault();
    setDraggedOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(docId, files[0]);
    }
  };

  const removeDocument = (docId) => {
    setDocuments(prevDocs =>
      prevDocs.map(doc =>
        doc.id === docId
          ? { ...doc, status: 'pending', uploadedFile: null, reviewComments: null }
          : doc
      )
    );
  };

  const handleViewDocument = (doc) => {
    setViewModal(doc);
    setImageZoom(100);
  };

  const handleDownloadDocument = (doc) => {
    setDownloadModal(doc);
  };

  const actualDownload = (doc) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = doc.uploadedFile.url;
    link.download = doc.uploadedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadModal(null);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return <Image className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const ViewModal = ({ doc, onClose }) => {
    if (!doc) return null;

    const isImage = doc.uploadedFile.type === 'image';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-4xl max-h-[95vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 min-w-0">
              {getFileIcon(doc.uploadedFile.name)}
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                  {doc.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {doc.uploadedFile.name} • {doc.uploadedFile.size}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {isImage && (
                <>
                  <button
                    onClick={() => setImageZoom(Math.max(50, imageZoom - 25))}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    disabled={imageZoom <= 50}
                  >
                    <ZoomOut className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[3rem] text-center">
                    {imageZoom}%
                  </span>
                  <button
                    onClick={() => setImageZoom(Math.min(200, imageZoom + 25))}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    disabled={imageZoom >= 200}
                  >
                    <ZoomIn className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />
                </>
              )}
              <button
                onClick={() => handleDownloadDocument(doc)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            {isImage ? (
              <div className="flex justify-center">
                <img
                  src={doc.uploadedFile.url}
                  alt={doc.uploadedFile.name}
                  className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-200"
                  style={{ transform: `scale(${imageZoom / 100})` }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="p-8 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <FileText className="h-16 w-16 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    PDF Preview Not Available
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    This file type cannot be previewed in the browser.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download to View
                    </button>
                    <button
                      onClick={() => window.open(doc.uploadedFile.url, '_blank')}
                      className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Document Info */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Status:</span>
                <div className="flex items-center space-x-1 mt-1">
                  {getStatusIcon(doc.status)}
                  <span className="font-medium text-slate-900 dark:text-white">
                    {getStatusText(doc.status)}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Upload Date:</span>
                <p className="font-medium text-slate-900 dark:text-white mt-1">
                  {doc.uploadedFile.uploadDate}
                </p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">File Size:</span>
                <p className="font-medium text-slate-900 dark:text-white mt-1">
                  {doc.uploadedFile.size}
                </p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Type:</span>
                <p className="font-medium text-slate-900 dark:text-white mt-1 capitalize">
                  {doc.uploadedFile.type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DownloadModal = ({ doc, onClose, onConfirm }) => {
    if (!doc) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Download Document
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {doc.name}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(doc.uploadedFile.name)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {doc.uploadedFile.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {doc.uploadedFile.size} • {doc.uploadedFile.uploadDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <Info className="h-4 w-4" />
              <p>The file will be downloaded to your default download location.</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(doc)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DocumentCard = ({ doc }) => {
    const progress = uploadProgress[doc.id];
    const isUploading = progress !== undefined;

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                {doc.name}
              </h3>
              {doc.mandatory && (
                <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                  Required
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {doc.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>Formats: {doc.acceptedFormats.join(', ')}</span>
              <span>Max size: {doc.maxSize}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
            {getStatusIcon(doc.status)}
            <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(doc.status)}`}>
              {getStatusText(doc.status)}
            </span>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Uploading...</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Review Comments */}
        {doc.reviewComments && doc.status === 'rejected' && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Document Rejected
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {doc.reviewComments}
                </p>
              </div>
            </div>
          </div>
        )}

        {doc.reviewComments && doc.status === 'approved' && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  Document Approved
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {doc.reviewComments}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded File Display */}
        {doc.uploadedFile && !isUploading && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {getFileIcon(doc.uploadedFile.name)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {doc.uploadedFile.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {doc.uploadedFile.size} • Uploaded on {doc.uploadedFile.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                <button 
                  onClick={() => handleViewDocument(doc)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  title="View document"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDownloadDocument(doc)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  title="Download document"
                >
                  <Download className="h-4 w-4" />
                </button>
                {(doc.status === 'pending' || doc.status === 'rejected') && (
                  <button 
                    onClick={() => removeDocument(doc.id)}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {(doc.status === 'pending' || doc.status === 'rejected') && !isUploading && (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              draggedOver === doc.id
                ? 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
            }`}
            onDragOver={(e) => handleDragOver(e, doc.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, doc.id)}
          >
            <Upload className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Drag and drop your file here, or
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept={doc.acceptedFormats.map(format => 
                  format === 'PDF' ? '.pdf' : 
                  format === 'JPG' ? '.jpg,.jpeg' : 
                  format === 'PNG' ? '.png' : ''
                ).join(',')}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(doc.id, file);
                }}
              />
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Choose File
              </span>
            </label>
          </div>
        )}
      </div>
    );
  };

  // Calculate completion stats
  const totalDocs = documents.length;
  const mandatoryDocs = documents.filter(doc => doc.mandatory).length;
  const approvedDocs = documents.filter(doc => doc.status === 'approved').length;
  const pendingDocs = documents.filter(doc => doc.status === 'pending').length;
  const rejectedDocs = documents.filter(doc => doc.status === 'rejected').length;

  return (
    <div className={`min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Progress Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Document Verification Progress
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalDocs}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedDocs}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{documents.filter(doc => doc.status === 'uploaded').length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{pendingDocs + rejectedDocs}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Action Needed</div>
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(approvedDocs / totalDocs) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
            {approvedDocs} of {totalDocs} documents approved ({mandatoryDocs} mandatory)
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Upload Instructions
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Ensure all documents are clear and readable</li>
                <li>• Accepted formats: PDF, JPG, PNG (check individual requirements)</li>
                <li>• Maximum file size varies per document type</li>
                <li>• Required documents must be uploaded for admission completion</li>
                <li>• Documents will be reviewed within 2-3 business days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Important:</strong> All mandatory documents must be approved before your admission can be finalized. 
                If you have any questions about document requirements, please contact the admissions office.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewModal 
        doc={viewModal} 
        onClose={() => setViewModal(null)} 
      />
      
      <DownloadModal 
        doc={downloadModal} 
        onClose={() => setDownloadModal(null)} 
        onConfirm={actualDownload}
      />
    </div>
  );
};

export default DocumentUpload;