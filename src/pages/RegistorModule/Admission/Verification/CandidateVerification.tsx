import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, User, Calendar, GraduationCap, Phone, Mail, MapPin, FileText, Clock, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const CandidateVerification = () => {
  const { isDark, toggleTheme } = useTheme();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({});
  const [remarks, setRemarks] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);

  const candidates = [
    { id: 1, name: "Priya Sharma", applicationId: "ADM2025001", dateOfBirth: "1995-06-15", phone: "+91 9876543210", email: "priya.sharma@email.com", address: "123 MG Road, Bangalore, Karnataka", qualifyingExam: "BE Computer Science", examScore: "85.5%", status: "Pending Verification", appliedDate: "2025-01-15" },
    { id: 2, name: "Rahul Kumar", applicationId: "ADM2025002", dateOfBirth: "1994-03-22", phone: "+91 9876543211", email: "rahul.kumar@email.com", address: "456 Brigade Road, Bangalore, Karnataka", qualifyingExam: "BSc Mathematics", examScore: "78.2%", status: "Partially Verified", appliedDate: "2025-01-14" },
    { id: 3, name: "Anjali Patel", applicationId: "ADM2025003", dateOfBirth: "1996-09-10", phone: "+91 9876543212", email: "anjali.patel@email.com", address: "789 Commercial Street, Bangalore, Karnataka", qualifyingExam: "BA Economics", examScore: "92.1%", status: "Verified", appliedDate: "2025-01-13" }
  ];

  const verificationPoints = [
    { id: 'name', label: 'Name Verification', icon: User },
    { id: 'dob', label: 'Date of Birth', icon: Calendar },
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'address', label: 'Address Verification', icon: MapPin },
    { id: 'qualification', label: 'Qualifying Exam', icon: GraduationCap },
    { id: 'documents', label: 'Document Verification', icon: FileText }
  ];

  useEffect(() => {
    if (selectedCandidate) {
      const verifiedCount = Object.values(verificationStatus).filter(status => status === 'verified').length;
      const totalCount = verificationPoints.length;
      setOverallProgress((verifiedCount / totalCount) * 100);
    }
  }, [verificationStatus, selectedCandidate]);

  const handleVerificationChange = (pointId, status) => {
    setVerificationStatus(prev => ({ ...prev, [pointId]: status }));
  };

  const handleRemarksChange = (pointId, remark) => {
    setRemarks(prev => ({ ...prev, [pointId]: remark }));
  };

  const completeVerification = () => {
    if (overallProgress === 100) {
      alert('Verification completed successfully!');
      // Update candidate status logic here
    } else {
      alert('Please verify all points before completing verification.');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending Verification': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Partially Verified': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'Verified': { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    const config = statusConfig[status] || statusConfig['Pending Verification'];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'} p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border mb-6 p-6`}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Candidate Verification</h1>
       
          </div>
          {/* <p className="text-gray-600 dark:text-gray-300">Verify personal and academic details submitted by each applicant</p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Candidate List */}
          <div className="lg:col-span-1">
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border`}>
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Candidates</h2>
              </div>
              <div className="divide-y max-h-96 overflow-y-auto">
                {candidates.map(candidate => (
                  <div
                    key={candidate.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCandidate?.id === candidate.id ? 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900' : ''
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium">{candidate.name}</h3>
                      {getStatusBadge(candidate.status)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{candidate.applicationId}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Applied: {new Date(candidate.appliedDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedCandidate ? (
              <>
                <div className="space-y-6">
                  {/* Candidate Details */}
                  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">{selectedCandidate.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{selectedCandidate.applicationId}</p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        {getStatusBadge(selectedCandidate.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>DOB: {new Date(selectedCandidate.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>{selectedCandidate.qualifyingExam} - {selectedCandidate.examScore}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedCandidate.address}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification Progress</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(overallProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${overallProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Verification Panel */}
                  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border`}>
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold">Verification Checklist</h3>
                    </div>
                    <div className="divide-y">
                      {verificationPoints.map(point => {
                        const Icon = point.icon;
                        const status = verificationStatus[point.id] || '';
                        return (
                          <div key={point.id} className="p-4">
                            <div className="flex items-start space-x-3">
                              <Icon className="w-5 h-5 text-gray-400" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium mb-3">{point.label}</h4>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                  <div className="flex space-x-2">
                                    <label className="inline-flex items-center">
                                      <input
                                        type="radio"
                                        name={`verification_${point.id}`}
                                        value="verified"
                                        checked={status === 'verified'}
                                        onChange={(e) => handleVerificationChange(point.id, e.target.value)}
                                        className="form-radio text-green-600"
                                      />
                                      <span className="ml-2 text-sm text-green-700 flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Verify
                                      </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                      <input
                                        type="radio"
                                        name={`verification_${point.id}`}
                                        value="rejected"
                                        checked={status === 'rejected'}
                                        onChange={(e) => handleVerificationChange(point.id, e.target.value)}
                                        className="form-radio text-red-600"
                                      />
                                      <span className="ml-2 text-sm text-red-700 flex items-center">
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Reject
                                      </span>
                                    </label>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <input
                                      type="text"
                                      placeholder="Add remarks..."
                                      value={remarks[point.id] || ''}
                                      onChange={(e) => handleRemarksChange(point.id, e.target.value)}
                                     className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 
             rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-transparent text-gray-900 dark:text-gray-100 
             placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t">
                      <button
                        onClick={completeVerification}
                        disabled={overallProgress !== 100}
                        className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-colors ${
                          overallProgress === 100 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Complete Verification
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-8 text-center`}>
                <User className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a Candidate</h3>
                <p className="text-gray-600 dark:text-gray-400">Choose a candidate from the list to begin verification process</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CandidateVerification;
