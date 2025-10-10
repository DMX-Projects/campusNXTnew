import React, { useState } from 'react';
import { Upload, Users, Briefcase, Download, AlertCircle, CheckCircle, X } from 'lucide-react';

const BulkUpload = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === 'text/csv' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setUploadStatus({ type: 'error', message: 'Please upload a valid CSV or Excel file' });
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === 'text/csv' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setUploadStatus({ type: 'error', message: 'Please upload a valid CSV or Excel file' });
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }
    setUploadStatus({ type: 'loading', message: 'Uploading and processing data...' });
    setTimeout(() => {
      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${selectedFile.name} with ${Math.floor(Math.random() * 100) + 50} records`
      });
      setSelectedFile(null);
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    const templates = {
      student: {
        filename: 'student_bulk_upload_template.csv',
        headers:
          'Student ID,First Name,Last Name,Email,Phone,Date of Birth,Gender,Department,Program,Year,Section,Address,Guardian Name,Guardian Phone'
      },
      employee: {
        filename: 'employee_bulk_upload_template.csv',
        headers:
          'Employee ID,First Name,Last Name,Email,Phone,Date of Birth,Gender,Department,Designation,Date of Joining,Qualification,Address,Emergency Contact'
      }
    };

    const template = templates[activeTab];
    const blob = new Blob([template.headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = template.filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bulk Upload</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload student and employee data in bulk using CSV or Excel files
          </p>
        </div>

        {/* Tab Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="flex border-b dark:border-gray-700">
            <button
              onClick={() => {
                setActiveTab('student');
                clearFile();
              }}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'student'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
              }`}
            >
              <Users size={20} />
              Student Data
            </button>
            <button
              onClick={() => {
                setActiveTab('employee');
                clearFile();
              }}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'employee'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
              }`}
            >
              <Briefcase size={20} />
              Employee Data
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Download Template Section */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Download Template</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Download the {activeTab} data template to ensure your file has the correct format
                </p>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                <Download size={18} />
                Download Template
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Upload File</h3>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/40'
                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
              }`}
            >
              <Upload className={`mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} size={48} />
              <p className="text-gray-700 dark:text-gray-200 mb-2 font-medium">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Supports CSV and Excel files (Max size: 10MB)
              </p>

              <label className="inline-block">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer inline-block transition-colors">
                  Choose File
                </span>
              </label>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <Upload className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-200" />
                </button>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {uploadStatus && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                uploadStatus.type === 'error'
                  ? 'bg-red-50 dark:bg-red-900/60 border border-red-200 dark:border-red-700'
                  : uploadStatus.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/60 border border-green-200 dark:border-green-700'
                  : 'bg-blue-50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-700'
              }`}
            >
              {uploadStatus.type === 'error' && <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />}
              {uploadStatus.type === 'success' && <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />}
              {uploadStatus.type === 'loading' && (
                <div className="w-5 h-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              )}
              <p
                className={`text-sm ${
                  uploadStatus.type === 'error'
                    ? 'text-red-700 dark:text-red-400'
                    : uploadStatus.type === 'success'
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-blue-700 dark:text-blue-300'
                }`}
              >
                {uploadStatus.message}
              </p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadStatus?.type === 'loading'}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !selectedFile || uploadStatus?.type === 'loading'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800'
            }`}
          >
            {uploadStatus?.type === 'loading' ? 'Uploading...' : 'Upload Data'}
          </button>

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Upload Instructions</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
                <span>Download the appropriate template for {activeTab} data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
                <span>Fill in the data according to the column headers provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
                <span>Ensure all required fields are filled and data formats are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4.</span>
                <span>Upload the completed file using the upload area above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">5.</span>
                <span>Review any error messages and correct the data if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
