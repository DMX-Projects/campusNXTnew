import React, { useState } from 'react';
import { 
  FileText, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, 
  X, Plus, Eye, RefreshCw, Edit, Download, Upload 
} from 'lucide-react';

// Mock data - you would replace this with your actual data
const initialDocuments = [
  {
    id: 1,
    busNumber: 'BUS001',
    documentType: 'insurance',
    issueDate: '2023-03-01',
    expiryDate: '2024-03-01',
    status: 'expiring',
    documentNumber: 'INS-2023-001',
    issuedBy: 'National Insurance Company',
    fileUrl: '/documents/bus001-insurance.pdf'
  },
  {
    id: 2,
    busNumber: 'BUS002',
    documentType: 'registration',
    issueDate: '2022-06-15',
    expiryDate: '2024-06-15',
    status: 'valid',
    documentNumber: 'REG-2022-002',
    issuedBy: 'Transport Authority',
    fileUrl: '/documents/bus002-registration.pdf'
  },
  {
    id: 3,
    busNumber: 'BUS003',
    documentType: 'fitness',
    issueDate: '2023-01-10',
    expiryDate: '2024-01-10',
    status: 'expired',
    documentNumber: 'FIT-2023-003',
    issuedBy: 'Vehicle Testing Center',
    fileUrl: '/documents/bus003-fitness.pdf'
  }
];

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  const [formData, setFormData] = useState({
    busNumber: '',
    documentType: 'insurance',
    issueDate: '',
    expiryDate: '',
    documentNumber: '',
    issuedBy: ''
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    return matchesSearch && matchesType;
  });

  const statusColors = {
    valid: 'text-green-600 bg-green-50',
    expiring: 'text-yellow-600 bg-yellow-50',
    expired: 'text-red-600 bg-red-50',
  };

  const statusIcons = {
    valid: CheckCircle,
    expiring: Clock,
    expired: AlertTriangle,
  };

  const documentTypeColors = {
    insurance: 'text-blue-600 bg-blue-50',
    registration: 'text-purple-600 bg-purple-50',
    fitness: 'text-green-600 bg-green-50',
    permit: 'text-orange-600 bg-orange-50',
  };

  const calculateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return 'expired';
    if (daysDiff <= 30) return 'expiring';
    return 'valid';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.busNumber || !formData.issueDate || !formData.expiryDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new document
    const newDocument = {
      id: Date.now(), // Simple ID generation
      ...formData,
      status: calculateStatus(formData.expiryDate),
      fileUrl: null // Would be set after file upload
    };

    // Add to documents list
    setDocuments(prev => [...prev, newDocument]);

    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = () => {
    if (!selectedDocument) return;

    // Update the document
    setDocuments(prev => prev.map(doc => 
      doc.id === selectedDocument.id 
        ? { 
            ...doc, 
            ...formData, 
            status: calculateStatus(formData.expiryDate) 
          }
        : doc
    ));

    resetForm();
    setShowEditModal(false);
    setSelectedDocument(null);
  };

  const handleRenew = () => {
    if (!selectedDocument) return;

    // Create renewed document
    const renewedDocument = {
      ...selectedDocument,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
      documentNumber: formData.documentNumber,
      issuedBy: formData.issuedBy,
      status: calculateStatus(formData.expiryDate)
    };

    // Update the document
    setDocuments(prev => prev.map(doc => 
      doc.id === selectedDocument.id ? renewedDocument : doc
    ));

    resetForm();
    setShowRenewModal(false);
    setSelectedDocument(null);
  };

  const resetForm = () => {
    setFormData({
      busNumber: '',
      documentType: 'insurance',
      issueDate: '',
      expiryDate: '',
      documentNumber: '',
      issuedBy: ''
    });
  };

  const openViewModal = (document) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  const openEditModal = (document) => {
    setSelectedDocument(document);
    setFormData({
      busNumber: document.busNumber,
      documentType: document.documentType,
      issueDate: document.issueDate,
      expiryDate: document.expiryDate,
      documentNumber: document.documentNumber || '',
      issuedBy: document.issuedBy || ''
    });
    setShowEditModal(true);
  };

  const openRenewModal = (document) => {
    setSelectedDocument(document);
    setFormData({
      busNumber: document.busNumber,
      documentType: document.documentType,
      issueDate: '',
      expiryDate: '',
      documentNumber: '',
      issuedBy: document.issuedBy || ''
    });
    setShowRenewModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setShowRenewModal(false);
    setSelectedDocument(null);
    resetForm();
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Vehicle Documents</h3>
            <p className="text-sm text-gray-600">Manage bus registration, insurance, and compliance documents</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by bus number or document type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Documents</option>
                <option value="insurance">Insurance</option>
                <option value="registration">Registration</option>
                <option value="fitness">Fitness</option>
                <option value="permit">Permit</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bus Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Document Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Issue Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((document) => {
                  const StatusIcon = statusIcons[document.status];
                  
                  return (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{document.busNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${documentTypeColors[document.documentType]}`}>
                          {document.documentType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-800">
                          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                          {document.issueDate}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-800">
                          <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                          {document.expiryDate}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${statusColors[document.status]}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{document.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => openViewModal(document)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => openRenewModal(document)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Renew
                          </button>
                          <button 
                            onClick={() => openEditModal(document)}
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FULL SCREEN MODAL OVERLAY - COVERS EVERYTHING */}
      {(showAddModal || showViewModal || showEditModal || showRenewModal) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 backdrop flex items-center justify-center p-4 z-[99999] m-0" 
             style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
          
          {/* Add Document Modal */}
          {showAddModal && (
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h2 className="text-xl font-semibold text-gray-800">Add New Document</h2>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Number *
                  </label>
                  <input
                    type="text"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., BUS004"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type *
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="insurance">Insurance</option>
                    <option value="registration">Registration</option>
                    <option value="fitness">Fitness</option>
                    <option value="permit">Permit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Number
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., INS-2024-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issued By
                  </label>
                  <input
                    type="text"
                    name="issuedBy"
                    value={formData.issuedBy}
                    onChange={handleInputChange}
                    placeholder="e.g., National Insurance Company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document File
                  </label>
                  <div onClick={() => {
                    const fileInput = document.querySelector('input[type=file]');
                    if (fileInput) (fileInput as HTMLInputElement).click();
                  }} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeAllModals}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View Document Modal */}
          {showViewModal && selectedDocument && (
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Document Details</h2>
                </div>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Bus Number</label>
                    <p className="text-gray-800 font-semibold">{selectedDocument.busNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Document Type</label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${documentTypeColors[selectedDocument.documentType]}`}>
                      {selectedDocument.documentType}
                    </span>
                  </div>
                </div>

                {selectedDocument.documentNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Document Number</label>
                    <p className="text-gray-800 font-mono">{selectedDocument.documentNumber}</p>
                  </div>
                )}

                {selectedDocument.issuedBy && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Issued By</label>
                    <p className="text-gray-800">{selectedDocument.issuedBy}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Issue Date</label>
                    <p className="text-gray-800">{selectedDocument.issueDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Expiry Date</label>
                    <p className="text-gray-800">{selectedDocument.expiryDate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 w-fit ${statusColors[selectedDocument.status]}`}>
                    {(() => {
                      const StatusIcon = statusIcons[selectedDocument.status];
                      return <StatusIcon className="w-4 h-4" />;
                    })()}
                    <span className="capitalize">{selectedDocument.status}</span>
                  </span>
                </div>

                {selectedDocument.fileUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Document File</label>
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download Document</span>
                    </button>
                  </div>
                )}

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeAllModals}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      openEditModal(selectedDocument);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Document Modal */}
          {showEditModal && selectedDocument && (
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Edit Document</h2>
                </div>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bus Number *
                  </label>
                  <input
                    type="text"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type *
                  </label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="insurance">Insurance</option>
                    <option value="registration">Registration</option>
                    <option value="fitness">Fitness</option>
                    <option value="permit">Permit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Number
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issued By
                  </label>
                  <input
                    type="text"
                    name="issuedBy"
                    value={formData.issuedBy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeAllModals}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Renew Document Modal */}
          {showRenewModal && selectedDocument && (
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Renew Document</h2>
                </div>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Renewing: {selectedDocument.busNumber} - {selectedDocument.documentType}</span>
                  </div>
                  <p className="text-sm text-blue-600">Please provide the new document details</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Document Number
                  </label>
                  <input
                    type="text"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., INS-2024-002"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issued By
                  </label>
                  <input
                    type="text"
                    name="issuedBy"
                    value={formData.issuedBy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Issue Date *
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Document File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload renewed document</p>
                    <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeAllModals}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRenew}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Renew Document
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
