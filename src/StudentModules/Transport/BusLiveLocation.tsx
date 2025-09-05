import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Navigation, User, Bus, Route, AlertCircle, Phone, MessageCircle, Bell, Settings, ChevronRight, Wifi, Zap, Shield, Menu, X } from 'lucide-react';

const BusLiveLocation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [busLocation, setBusLocation] = useState({
    lat: 17.3850,
    lng: 78.4867,
    heading: 45
  });
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const studentData = {
    id: "2025STU001",
    name: "Anil Kumar",
    routeNo: "12",
    busNo: "AP 29 XX 1234",
    pickupPoint: "Madhapur Signal",
    dropPoint: "Madhapur Signal",
    scheduledETA: "7:30 AM",
    status: "On Route"
  };

  const studentLocation = {
    lat: 17.3900,
    lng: 78.4900,
    name: "Madhapur Signal"
  };

  // Simulate bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setBusLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        heading: (prev.heading + Math.random() * 10 - 5) % 360
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate distance between bus and student
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const distance = calculateDistance(
    busLocation.lat, busLocation.lng,
    studentLocation.lat, studentLocation.lng
  );

  const estimatedArrival = Math.ceil(distance / 0.5 * 60);
  const arrivalTime = new Date(currentTime.getTime() + estimatedArrival * 60000);

  const handleViewRoute = () => {
    setShowRouteModal(true);
    setShowMobileMenu(false);
  };

  const handleReportIssue = () => {
    setShowIssueModal(true);
    setShowMobileMenu(false);
  };

  const handleCallDriver = () => {
    alert('Calling driver: +91 98765 43210');
    setShowMobileMenu(false);
  };

  const handleSendMessage = () => {
    alert('Opening messaging interface...');
    setShowMobileMenu(false);
  };

  const RouteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Route Details</h3>
            <button 
              onClick={() => setShowRouteModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</div>
              <div>
                <p className="font-semibold text-blue-900">Start Point</p>
                <p className="text-sm text-blue-700">Bus Depot, Hitech City</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-orange-50 rounded-xl">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</div>
              <div>
                <p className="font-semibold text-orange-900">Stop 1</p>
                <p className="text-sm text-orange-700">Cyber Gateway</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</div>
              <div>
                <p className="font-semibold text-green-900">Your Stop</p>
                <p className="text-sm text-green-700">{studentLocation.name}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-purple-50 rounded-xl">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</div>
              <div>
                <p className="font-semibold text-purple-900">Final Stop</p>
                <p className="text-sm text-purple-700">School Campus</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowRouteModal(false)}
            className="w-full mt-4 sm:mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  const IssueModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Report an Issue</h3>
            <button 
              onClick={() => setShowIssueModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
              <span className="text-red-800 font-semibold">Bus is late</span>
              <ChevronRight className="w-5 h-5 text-red-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
              <span className="text-yellow-800 font-semibold">Bus broke down</span>
              <ChevronRight className="w-5 h-5 text-yellow-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
              <span className="text-orange-800 font-semibold">Safety concern</span>
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <span className="text-blue-800 font-semibold">Other issue</span>
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-6">
            <button 
              onClick={() => setShowIssueModal(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setShowIssueModal(false);
                alert('Emergency contact has been notified!');
              }}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Action Menu
  const MobileMenu = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transform transition-transform duration-300 ${showMobileMenu ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          <button 
            onClick={() => setShowMobileMenu(false)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleViewRoute}
            className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Route className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-blue-800 font-semibold">View Route</span>
          </button>
          
          <button 
            onClick={handleCallDriver}
            className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Phone className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-green-800 font-semibold">Call Driver</span>
          </button>
          
          <button 
            onClick={handleSendMessage}
            className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-purple-800 font-semibold">Message</span>
          </button>
          
          <button 
            onClick={handleReportIssue}
            className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-red-800 font-semibold">Report Issue</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        
        {/* Mobile-optimized Header Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
              <Bus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">Transport Tracker</h1>
              <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Live bus location updates</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center bg-green-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
              <Wifi className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-600" />
              <span className="text-green-700 font-semibold text-sm sm:text-base">LIVE</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${notifications ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            {/* Mobile menu button - only visible on mobile */}
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all lg:hidden"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Mobile-first Dashboard Grid */}
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0 mb-6 lg:mb-8">
          
          {/* Student Info & Stats - Mobile stacked, Desktop sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            
            {/* Student Profile Card - Mobile optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-green-600 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Student Info</h2>
                  <p className="text-sm sm:text-base text-gray-600">Active Transport</p>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Name</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{studentData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">ID</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{studentData.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Route</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{studentData.routeNo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Bus</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{studentData.busNo}</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      {studentData.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards - Mobile 2-column grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-2" />
                  <span className="text-gray-600 text-xs sm:text-sm">ETA</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-orange-800">{estimatedArrival}m</div>
                <div className="text-xs text-orange-600">{arrivalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                  <span className="text-gray-600 text-xs sm:text-sm">Distance</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-800">{distance.toFixed(1)}km</div>
                <div className="text-xs text-blue-600">To pickup</div>
              </div>
            </div>

            {/* Current Time Widget */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 text-center">
              <div className="text-2xl sm:text-4xl font-bold text-purple-800 mb-2">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div className="text-sm sm:text-base text-purple-600">{currentTime.toLocaleDateString()}</div>
            </div>
          </div>

          {/* Live Map - Mobile full width, Desktop 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="bg-blue-600 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4">
                    <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Live Bus Location</h2>
                    <p className="text-sm sm:text-base text-gray-600">Real-time tracking</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 animate-pulse" />
                  <span className="text-orange-600 font-semibold text-sm sm:text-base">ACTIVE</span>
                </div>
              </div>

              {/* Map Visualization - Responsive height */}
              <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-64 sm:h-80 relative overflow-hidden border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
                
                {/* Grid lines for map effect */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={`h-${i}`} className="absolute border-gray-300" style={{
                      top: `${i * 12.5}%`,
                      left: 0,
                      right: 0,
                      height: '1px',
                      borderTop: '1px solid currentColor'
                    }}></div>
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <div key={`v-${i}`} className="absolute border-gray-300" style={{
                      left: `${i * 8.33}%`,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      borderLeft: '1px solid currentColor'
                    }}></div>
                  ))}
                </div>

                {/* Student Location */}
                <div className="absolute" style={{
                  top: '70%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  <div className="bg-green-500 rounded-full p-2 animate-pulse">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="absolute top-full mt-1 text-xs font-medium text-green-700 whitespace-nowrap transform -translate-x-1/2">
                    You
                  </div>
                </div>

                {/* Bus Location */}
                <div className="absolute" style={{
                  top: '40%',
                  left: '30%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  <div className="bg-blue-600 rounded-full p-2 animate-bounce">
                    <Bus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="absolute top-full mt-1 text-xs font-medium text-blue-700 whitespace-nowrap transform -translate-x-1/2">
                    Bus
                  </div>
                </div>

                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full">
                  <line 
                    x1="30%" y1="40%" 
                    x2="60%" y2="70%" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>

                {/* Floating Info - Mobile optimized */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-gray-200 shadow-lg">
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="text-xs sm:text-sm font-mono text-gray-800">
                    {busLocation.lat.toFixed(3)}, {busLocation.lng.toFixed(3)}
                  </div>
                </div>
              </div>

              {/* Location Status Cards - Mobile stacked */}
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-semibold text-blue-800 text-sm sm:text-base">Bus Location</p>
                      <p className="text-xs sm:text-sm text-blue-600">Moving</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-blue-600">Heading</p>
                    <p className="font-semibold text-blue-800 text-sm sm:text-base">{Math.round(busLocation.heading)}°</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                    <div>
                      <p className="font-semibold text-green-800 text-sm sm:text-base">Your Stop</p>
                      <p className="text-xs sm:text-sm text-green-600">{studentLocation.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-green-600">Distance</p>
                    <p className="font-semibold text-green-800 text-sm sm:text-base">{distance.toFixed(1)} km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Action Bar - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Status Alert */}
            <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex-1">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">Live Updates</p>
                <p className="text-sm text-yellow-700">
                  Bus is currently <span className="font-semibold">{distance < 1 ? 'very close' : distance < 3 ? 'nearby' : 'on the way'}</span> to your pickup point. 
                  Please be ready <span className="font-semibold">{estimatedArrival < 5 ? 'now' : `in ${estimatedArrival - 2} minutes`}</span>.
                </p>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleViewRoute}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
              >
                <Route className="w-4 h-4 mr-2" />
                View Route
              </button>
              
              <button 
                onClick={handleCallDriver}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </button>
              
              <button 
                onClick={handleSendMessage}
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </button>
              
              <button 
                onClick={handleReportIssue}
                className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Status Bar - Only visible on mobile */}
        <div className="lg:hidden bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-start bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-800 mb-1 text-sm">Live Updates</p>
              <p className="text-xs text-yellow-700">
                Bus is <span className="font-semibold">{distance < 1 ? 'very close' : distance < 3 ? 'nearby' : 'on the way'}</span>. 
                Be ready <span className="font-semibold">{estimatedArrival < 5 ? 'now' : `in ${estimatedArrival - 2}min`}</span>.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Menu Component */}
      <MobileMenu />

      {/* Modals */}
      {showRouteModal && <RouteModal />}
      {showIssueModal && <IssueModal />}
    </div>
  );
};

export default BusLiveLocation;
