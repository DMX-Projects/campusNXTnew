import React, { useState } from 'react';
import { CheckCircle, Clock, FileText, CreditCard, Upload, Calendar, ChevronRight, X, ExternalLink, AlertCircle, Heart, Loader } from 'lucide-react';

const requiredDocuments = [
  "Official High School TC",
  "Government-issued Photo ID", 
  "Passport-size photograph",
  "Birth certificate (if applicable)"
];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  // Sample data, ideally from API/backend
  const studentName = "Alex Johnson";
  const admissionStatus = "Confirmed";

  const [nextSteps, setNextSteps] = useState([
    {
      id: 1,
      title: "Pay Admission Fee",
      description: "Complete your admission fee payment",
      deadline: "March 15, 2024",
      completed: false,
      urgent: true,
      icon: CreditCard,
      link: "/payment",
      detailedInfo: {
        amount: "₹2,500",
        paymentMethods: ["Credit Card", "Bank Transfer", "UPI"],
        instructions: [
          "Select your preferred payment method",
          "Enter payment details securely",
          "Review the payment amount",
          "Complete the payment process",
          "Save the transaction receipt"
        ],
        requirements: [
          "Valid payment method",
          "Confirmation of enrollment intent",
          "Student ID number"
        ],
        consequences: "Failure to pay by the deadline may result in loss of your admission slot."
      }
    },
    {
      id: 2,
      title: "Upload Missing Documents",
      description: "Submit your transcript and ID copy",
      deadline: "March 20, 2024",
      completed: false,
      urgent: false,
      icon: Upload,
      link: "/documents",
      detailedInfo: {
        requiredDocs: requiredDocuments,
        format: "PDF format, maximum 5MB per file",
        instructions: [
          "Select the document type",
          "Choose file from your device",
          "Ensure all text is clearly readable",
          "Upload and wait for verification",
          "Check upload status"
        ],
        requirements: [
          "Documents must be in original language or certified translations",
          "All pages must be included",
          "Files must be clear and legible"
        ],
        consequences: "Incomplete documentation may delay your enrollment process."
      }
    },
  ]);

  // Timelines for upcoming deadlines and events
  const timeline = [
    {
      id: 1,
      title: "Admission Fee Deadline",
      date: "March 15, 2024",
      time: "11:59 PM",
      type: "deadline",
      urgent: true
    },
    {
      id: 2,
      title: "Document Submission Deadline",
      date: "March 20, 2024",
      time: "11:59 PM",
      type: "deadline",
      urgent: false
    },
    {
      id: 3,
      title: "College Orientation",
      date: "April 1, 2024",
      time: "9:00 AM",
      type: "event",
      urgent: false
    }
  ];

  // Count pending tasks
  const pendingTasks = nextSteps.filter(step => !step.completed).length;

  // Handle click on next step cards
  const handleStepClick = (step) => {
    if (step.completed) return;

    if (step.id === 1) setShowPayment(true);
    else if (step.id === 2) setShowDocuments(true);
    else setSelectedStep(step);
  };

  // Close all modals/details
  const closeModal = () => {
    setSelectedStep(null);
    setShowPayment(false);
    setShowDocuments(false);
  };

  // Simulate fee payment processing
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setPaymentProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setNextSteps(prev => prev.map(step => step.id === 1 ? { ...step, completed: true } : step));
    setPaymentProcessing(false);
    setShowPayment(false);
    alert('Payment successful! Your admission fee has been processed.');
  };

  // Handle each document upload with checks and simulated progress
  const handleFileUpload = async (event, docType) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Please upload PDF files only');
      return;
    }
    setUploadProgress(prev => ({ ...prev, [docType]: 0 }));

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(prev => ({ ...prev, [docType]: i }));
    }

    setUploadedFiles(prev => ({ ...prev, [docType]: file.name }));
    setUploadProgress(prev => ({ ...prev, [docType]: 100 }));

    const newUploadedFiles = { ...uploadedFiles, [docType]: file.name };
    if (Object.keys(newUploadedFiles).length === requiredDocuments.length) {
      setTimeout(() => {
        setNextSteps(prev => prev.map(step => step.id === 2 ? { ...step, completed: true } : step));
        alert('All documents uploaded successfully!');
      }, 1000);
    }
  };

  // Payment modal JSX
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Pay Admission Fee</h2>
          <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">₹2,500</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Admission Fee</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {['Credit Card', 'Bank Transfer', 'UPI'].map((method) => (
                <label key={method} className="flex items-center p-3 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 text-slate-400 mr-2" />
                  <span className="text-slate-700 dark:text-slate-300">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={paymentProcessing || !paymentMethod}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            {paymentProcessing ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Pay Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Documents modal JSX
  const DocumentsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between pb-4 mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Upload Documents</h2>
          <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2 text-blue-600 dark:text-blue-400 font-medium">
              <AlertCircle className="h-5 w-5" />
              <span>Upload Requirements:</span>
            </div>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>PDF format only, max 5MB per file</li>
              <li>All pages must be clear and legible</li>
              <li>Upload will be verified by admissions office</li>
            </ul>
          </div>

          {requiredDocuments.map((docType, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-slate-900 dark:text-white">{docType}</h3>
                {uploadedFiles[docType] && (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Uploaded</span>
                  </div>
                )}
              </div>
              {uploadedFiles[docType] ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3 flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-400">{uploadedFiles[docType]}</span>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, docType)}
                    className="hidden"
                    id={`upload-${index}`}
                  />
                  <label
                    htmlFor={`upload-${index}`}
                    className="cursor-pointer flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-400 dark:text-slate-400 select-none"
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span>Click to upload {docType}</span>
                    <span className="text-xs mt-1">PDF only, max 5MB</span>
                  </label>

                  {uploadProgress[docType] !== undefined && uploadProgress[docType] < 100 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1 text-slate-600 dark:text-slate-400">
                        <span>Uploading...</span>
                        <span>{uploadProgress[docType]}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[docType]}%` }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {Object.keys(uploadedFiles).length} of {requiredDocuments.length} documents uploaded
            </span>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Detail modal for additional step info
  const DetailModal = ({ step, onClose }) => {
    if (!step) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between pb-4 mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
              <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {step.urgent && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-medium">
                <AlertCircle className="h-5 w-5" />
                <span>Urgent Action Required</span>
              </div>
              <p>This task has a close deadline and requires immediate attention.</p>
            </div>
          )}

          <p className="text-slate-700 dark:text-slate-400 mb-4">{step.description}</p>

          {step.detailedInfo?.instructions && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Step by Step Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {step.detailedInfo.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>
            </div>
          )}

          {step.detailedInfo?.requirements && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                {step.detailedInfo.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {step.detailedInfo?.consequences && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="font-semibold mb-1">Important Note</h3>
              <p>{step.detailedInfo.consequences}</p>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-6">

        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          
         
        </div>

        {/* Admission Status and Tasks */}
        <div className="grid gap-6 md:grid-cols-3">

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Admission Status</h2>
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">{admissionStatus}</span>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Congratulations! Your admission has been confirmed. Remember to complete the required steps.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
            <Clock className="mx-auto mb-2 h-10 w-10 text-blue-600 dark:text-blue-400" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{pendingTasks}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pending Tasks</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
            <Calendar className="mx-auto mb-2 h-10 w-10 text-purple-600 dark:text-purple-400" />
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{timeline.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming Events</p>
          </div>

        </div>

        {/* Next Steps */}
        <section className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Next Steps</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {pendingTasks} remaining
            </span>
          </div>

          <div className="space-y-4">
            {nextSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  step.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : step.urgent
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:shadow-md transform hover:scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 hover:shadow-md transform hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      step.completed
                        ? 'bg-green-100 dark:bg-green-800'
                        : step.urgent
                        ? 'bg-red-100 dark:bg-red-800'
                        : 'bg-blue-100 dark:bg-blue-800'
                    }`}
                  >
                    <step.icon
                      className={`h-5 w-5 ${
                        step.completed
                          ? 'text-green-600 dark:text-green-400'
                          : step.urgent
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm font-medium ${
                          step.completed
                            ? 'text-green-900 dark:text-green-100 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {!step.completed && (
                        <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        step.completed
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {step.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={`text-xs font-medium ${
                          step.urgent && !step.completed
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-slate-500 dark:text-slate-500'
                        }`}
                      >
                        Due: {step.deadline}
                      </p>
                      {!step.completed && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {step.id === 1 ? 'Click to pay →' : step.id === 2 ? 'Click to upload →' : 'Click for details →'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Important Dates</h2>
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 relative">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.urgent ? 'bg-red-500' : event.type === 'deadline' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                  />
                  {index < timeline.length - 1 && (
                    <div className="absolute top-3 left-1/2 w-px h-8 bg-slate-200 dark:bg-slate-600 transform -translate-x-1/2" />
                  )}
                </div>

                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">{event.title}</h4>
                    {event.urgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 mt-1 sm:mt-0 w-fit">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {showPayment && <PaymentModal />}
      {showDocuments && <DocumentsModal />}
      {selectedStep && <DetailModal step={selectedStep} onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
