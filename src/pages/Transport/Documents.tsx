import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, X, Plus, Upload, Eye, Download } from 'lucide-react';

const initialDocuments = [
  {
    id: 1,
    busNumber: 'BUS-001',
    documentType: 'insurance',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    status: 'valid',
    fileName: 'insurance_bus001.pdf',
    fileUrl: null
  },
  {
    id: 2,
    busNumber: 'BUS-002',
    documentType: 'registration',
    issueDate: '2023-12-10',
    expiryDate: '2024-12-10',
    status: 'expired',
    fileName: 'registration_bus002.pdf',
    fileUrl: null
  },
  {
    id: 3,
    busNumber: 'BUS-003',
    documentType: 'fitness',
    issueDate: '2024-08-20',
    expiryDate: '2025-08-20',
    status: 'valid',
    fileName: null,
    fileUrl: null
  },
  {
    id: 4,
    busNumber: 'BUS-004',
    documentType: 'permit',
    issueDate: '2024-07-01',
    expiryDate: '2025-09-30',
    status: 'expiring',
    fileName: 'permit_bus004.jpg',
    fileUrl: null
  },
  {
    id: 5,
    busNumber: 'BUS-005',
    documentType: 'insurance',
    issueDate: '2024-03-15',
    expiryDate: '2025-03-15',
    status: 'valid',
    fileName: null,
    fileUrl: null
  }
];

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    busNumber: '',
    documentType: 'insurance',
    issueDate: '',
    expiryDate: '',
    file: null,
    fileName: ''
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

  const getDocumentStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring';
    return 'valid';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          file: file,
          fileName: file.name,
          fileUrl: fileUrl
        }));
      } else {
        alert('Please select an image file (JPG, PNG, GIF, etc.)');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.busNumber || !formData.issueDate || !formData.expiryDate) {
      return;
    }
    
    const newDocument = {
      id: documents.length + 1,
      busNumber: formData.busNumber,
      documentType: formData.documentType,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
      status: getDocumentStatus(formData.expiryDate),
      fileName: formData.fileName || null,
      fileUrl: formData.fileUrl || null
    };

    setDocuments(prev => [...prev, newDocument]);
    setFormData({
      busNumber: '',
      documentType: 'insurance',
      issueDate: '',
      expiryDate: '',
      file: null,
      fileName: ''
    });
    setShowAddForm(false);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setFormData({
      busNumber: '',
      documentType: 'insurance',
      issueDate: '',
      expiryDate: '',
      file: null,
      fileName: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
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
                <th className="text-left py-3 px-4 font-medium text-gray-700">File</th>
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
                      {document.fileName ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span className="truncate max-w-24" title={document.fileName}>
                              {document.fileName}
                            </span>
                          </div>
                          {document.fileUrl && (
                            <button 
                              onClick={() => window.open(document.fileUrl, '_blank')}
                              className="text-blue-600 hover:text-blue-800"
                              title="View file"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No file</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">Renew</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Add New Document</h4>
              <button 
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., BUS-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  required
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
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Document (Image File)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {formData.fileName && (
                      <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{formData.fileName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.busNumber && formData.issueDate && formData.expiryDate) {
                      handleSubmit();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!formData.busNumber || !formData.issueDate || !formData.expiryDate}
                >
                  Add Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}