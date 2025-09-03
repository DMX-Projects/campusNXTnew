import React, { useState } from 'react';
import { Bus, Clock, User, BookOpen, AlertTriangle, MapPin, Phone, Navigation, RefreshCw, Printer, Menu, X, Check, AlertCircle } from 'lucide-react';

const Stubusdetail = () => {
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  // Sample student data based on the ticket information
  const studentData = {
    studentId: "2025STU001",
    name: "Anil Kumar",
    course: "B.Tech - CSE - 3rd Year - A Section",
    busDetails: {
      busNumber: "AP 29 XX 1234",
      routeNumber: "Route 12",
      driverName: "Rajesh Sharma",
      driverPhone: "+91 98765 43210",
      pickupTime: "8:00 AM",
      dropTime: "5:30 PM",
      pickupPoint: "Central Market Bus Stop",
      totalStops: 15,
      estimatedTravelTime: "45 minutes"
    },
    currentIssue: {
      category: "Transport",
      subCategory: "Bus Delay",
      subject: "Bus Route 12 always late",
      description: "Bus No AP 29 XX 1234, Route 12 is delayed every morning by 20 minutes, causing late arrival to classes. Request to resolve.",
      priority: "High",
      status: "Open",
      dateRaised: "2025-09-03"
    }
  };

  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleTrackLive = () => {
    setShowLiveTracking(true);
    showAlertMessage('Live tracking enabled! Bus location will update every 30 seconds.', 'success');
  };

  const handleCallDriver = () => {
    if (navigator.userAgent.match(/Android|iPhone/i)) {
      window.location.href = `tel:${studentData.busDetails.driverPhone}`;
    } else {
      showAlertMessage(`Driver Contact: ${studentData.busDetails.driverPhone}`, 'info');
    }
  };

  const handleUpdateIssue = () => {
    setShowUpdateModal(true);
  };

  const submitUpdate = () => {
    if (updateMessage.trim()) {
      showAlertMessage('Issue update submitted successfully!', 'success');
      setUpdateMessage('');
      setShowUpdateModal(false);
    } else {
      showAlertMessage('Please enter an update message.', 'error');
    }
  };

  const handlePrintDetails = () => {
    const printContent = `
      STUDENT TRANSPORT DETAILS
      ========================
      
      Student ID: ${studentData.studentId}
      Name: ${studentData.name}
      Course: ${studentData.course}
      
      BUS INFORMATION
      ===============
      Bus Number: ${studentData.busDetails.busNumber}
      Route: ${studentData.busDetails.routeNumber}
      Driver: ${studentData.busDetails.driverName}
      Contact: ${studentData.busDetails.driverPhone}
      Pickup Time: ${studentData.busDetails.pickupTime}
      Drop Time: ${studentData.busDetails.dropTime}
      Pickup Point: ${studentData.busDetails.pickupPoint}
      
      CURRENT ISSUE
      =============
      Category: ${studentData.currentIssue.category}
      Subject: ${studentData.currentIssue.subject}
      Description: ${studentData.currentIssue.description}
      Priority: ${studentData.currentIssue.priority}
      Status: ${studentData.currentIssue.status}
      Date: ${studentData.currentIssue.dateRaised}
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Student Transport Details</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            pre { font-family: Arial, sans-serif; line-height: 1.5; }
          </style>
        </head>
        <body>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    showAlertMessage('Print dialog opened successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-2 sm:p-4">
      {/* Alert Notification */}
      {showAlert && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          alertType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          alertType === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex items-center gap-2">
            {alertType === 'success' && <Check className="w-5 h-5" />}
            {alertType === 'error' && <AlertCircle className="w-5 h-5" />}
            {alertType === 'info' && <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{alertMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Mobile-optimized Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-t-xl sm:rounded-t-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-4 sm:px-8 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <Bus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-3xl font-bold text-white">Transport Dashboard</h1>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 hidden sm:block">Real-time bus information & issue tracking</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Last updated: Just now</span>
                <span className="sm:hidden">Live</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-xl sm:rounded-b-2xl shadow-xl">
          <div className="p-4 sm:p-8 space-y-4 sm:space-y-8">
            {/* Mobile-optimized Student Information Card */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Student Info</h2>
              </div>
              <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Student ID</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{studentData.studentId}</p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">{studentData.name}</p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Course</p>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.course}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-optimized Bus Details Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Bus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Bus Info</h2>
                </div>
                <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                  showLiveTracking ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-green-100 text-green-700'
                }`}>
                  {showLiveTracking ? 'Live Tracking' : 'Active'}
                </div>
              </div>

              {/* Live Tracking Panel */}
              {showLiveTracking && (
                <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-800">Live Location</span>
                    </div>
                    <button 
                      onClick={() => setShowLiveTracking(false)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-green-700">Bus is currently at Signal Junction, ETA: 5 minutes</p>
                  <div className="mt-2 bg-green-200 h-2 rounded-full">
                    <div className="bg-green-500 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                  </div>
                </div>
              )}

              {/* Mobile-stacked Key Bus Info Cards */}
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between sm:text-center sm:block">
                    <p className="text-xs sm:text-sm text-gray-500 sm:mb-1">Bus Number</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">{studentData.busDetails.busNumber}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between sm:text-center sm:block">
                    <p className="text-xs sm:text-sm text-gray-500 sm:mb-1">Route</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">{studentData.busDetails.routeNumber}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between sm:text-center sm:block">
                    <p className="text-xs sm:text-sm text-gray-500 sm:mb-1">Total Stops</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">{studentData.busDetails.totalStops}</p>
                  </div>
                </div>
              </div>

              {/* Mobile-stacked Detailed Info Grid */}
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                <div className="flex items-center justify-between sm:block sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Driver Name</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.busDetails.driverName}</p>
                </div>
                <div className="flex items-center justify-between sm:block sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Contact</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.busDetails.driverPhone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:block sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Pickup Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.busDetails.pickupTime}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:block sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Drop Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.busDetails.dropTime}</p>
                  </div>
                </div>
              </div>

              {/* Mobile-stacked Pickup Point & Travel Time */}
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Pickup Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.busDetails.pickupPoint}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-blue-100">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Travel Duration</p>
                  <p className="text-sm sm:text-lg font-semibold text-blue-600">{studentData.busDetails.estimatedTravelTime}</p>
                </div>
              </div>
            </div>

            {/* Mobile-optimized Current Issue Card */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-red-400 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Active Issue</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Ticket #{studentData.studentId}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
                    {studentData.currentIssue.priority} Priority
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium">
                    {studentData.currentIssue.status}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Issue Category</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">
                      {studentData.currentIssue.category} → {studentData.currentIssue.subCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Date Reported</p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.currentIssue.dateRaised}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Subject</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{studentData.currentIssue.subject}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg">
                    {studentData.currentIssue.description}
                  </p>
                </div>
              </div>
            </div>

          
          
          </div>
        </div>
      </div>

      {/* Update Issue Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Update Issue</h3>
              <button 
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Update Message
              </label>
              <textarea
                value={updateMessage}
                onChange={(e) => setUpdateMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe the current status of your issue..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitUpdate}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stubusdetail;