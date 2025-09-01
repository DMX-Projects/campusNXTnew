import React, { useState, useEffect } from 'react';

interface GeofenceZone {
  id: string;
  name: string;
  description: string;
  type: 'Allowed' | 'Restricted' | 'Monitored' | 'Emergency';
  coordinates: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  activeHours: {
    start: string;
    end: string;
  };
  allowedRoles: string[];
  createdBy: string;
  createdDate: string;
  isActive: boolean;
  violations: number;
}

interface StudentLocation {
  id: string;
  studentId: string;
  name: string;
  rollNumber: string;
  block: string;
  roomNumber: string;
  branch: string;
  semester: number;
  currentLocation: {
    latitude: number;
    longitude: number;
    timestamp: string;
    accuracy: number;
  };
  currentZone?: string;
  status: 'Inside Campus' | 'Outside Campus' | 'In Restricted Area' | 'Emergency Zone';
  lastSeen: string;
  deviceInfo: {
    deviceId: string;
    batteryLevel: number;
    isOnline: boolean;
  };
  emergencyContact: string;
  parentNotified: boolean;
}

interface LocationAlert {
  id: string;
  studentId: string;
  studentName: string;
  alertType: 'Zone Violation' | 'Emergency' | 'Outside Campus' | 'Device Offline' | 'Suspicious Movement';
  zoneName?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Active' | 'Acknowledged' | 'Resolved';
  acknowledgedBy?: string;
  actionsTaken?: string[];
}

const GeofencingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live-tracking' | 'zones' | 'alerts' | 'analytics'>('live-tracking');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'inside' | 'outside' | 'restricted' | 'emergency'>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample geofence zones
  const geofenceZones: GeofenceZone[] = [
    {
      id: 'GZ001', name: 'Main Campus', description: 'Primary campus area including academic blocks',
      type: 'Allowed', coordinates: { latitude: 12.9716, longitude: 77.5946, radius: 500 },
      activeHours: { start: '06:00', end: '22:00' }, allowedRoles: ['Student', 'Faculty', 'Staff'],
      createdBy: 'Admin', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 0
    },
    {
      id: 'GZ002', name: 'Girls Hostel Block', description: 'Female student accommodation area',
      type: 'Restricted', coordinates: { latitude: 12.9720, longitude: 77.5940, radius: 100 },
      activeHours: { start: '00:00', end: '23:59' }, allowedRoles: ['Female Students', 'Warden', 'Security'],
      createdBy: 'Warden', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 3
    },
    {
      id: 'GZ003', name: 'Boys Hostel Block', description: 'Male student accommodation area',
      type: 'Restricted', coordinates: { latitude: 12.9710, longitude: 77.5950, radius: 100 },
      activeHours: { start: '00:00', end: '23:59' }, allowedRoles: ['Male Students', 'Warden', 'Security'],
      createdBy: 'Warden', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 1
    },
    {
      id: 'GZ004', name: 'Library & Study Area', description: 'Central library and reading rooms',
      type: 'Monitored', coordinates: { latitude: 12.9715, longitude: 77.5945, radius: 50 },
      activeHours: { start: '07:00', end: '21:00' }, allowedRoles: ['Student', 'Faculty', 'Librarian'],
      createdBy: 'Librarian', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 0
    },
    {
      id: 'GZ005', name: 'Laboratory Complex', description: 'Research and practical labs',
      type: 'Restricted', coordinates: { latitude: 12.9718, longitude: 77.5948, radius: 80 },
      activeHours: { start: '08:00', end: '18:00' }, allowedRoles: ['Student with Lab Access', 'Faculty', 'Lab Assistant'],
      createdBy: 'Lab Coordinator', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 2
    },
    {
      id: 'GZ006', name: 'Emergency Assembly Point', description: 'Designated safe area during emergencies',
      type: 'Emergency', coordinates: { latitude: 12.9712, longitude: 77.5943, radius: 30 },
      activeHours: { start: '00:00', end: '23:59' }, allowedRoles: ['Everyone'],
      createdBy: 'Security Chief', createdDate: '2025-01-01T00:00:00Z', isActive: true, violations: 0
    }
  ];

  // Sample student locations (real-time simulation)
  const studentLocations: StudentLocation[] = [
    {
      id: 'SL001', studentId: 'STU001', name: 'Rahul Kumar', rollNumber: '2023CSE001',
      block: 'A Block', roomNumber: 'A-101', branch: 'Computer Science', semester: 4,
      currentLocation: { latitude: 12.9716, longitude: 77.5946, timestamp: '2025-08-31T15:30:00Z', accuracy: 5 },
      currentZone: 'Main Campus', status: 'Inside Campus', lastSeen: '2025-08-31T15:30:00Z',
      deviceInfo: { deviceId: 'DEV001', batteryLevel: 85, isOnline: true },
      emergencyContact: '+91-9876543210', parentNotified: false
    },
    {
      id: 'SL002', studentId: 'STU002', name: 'Priya Sharma', rollNumber: '2023ECE015',
      block: 'B Block', roomNumber: 'B-205', branch: 'Electronics & Communication', semester: 4,
      currentLocation: { latitude: 12.9720, longitude: 77.5940, timestamp: '2025-08-31T15:25:00Z', accuracy: 3 },
      currentZone: 'Girls Hostel Block', status: 'Inside Campus', lastSeen: '2025-08-31T15:25:00Z',
      deviceInfo: { deviceId: 'DEV002', batteryLevel: 92, isOnline: true },
      emergencyContact: '+91-9876543211', parentNotified: false
    },
    {
      id: 'SL003', studentId: 'STU003', name: 'Amit Singh', rollNumber: '2022ME020',
      block: 'C Block', roomNumber: 'C-301', branch: 'Mechanical Engineering', semester: 6,
      currentLocation: { latitude: 12.9705, longitude: 77.5955, timestamp: '2025-08-31T14:45:00Z', accuracy: 8 },
      status: 'Outside Campus', lastSeen: '2025-08-31T14:45:00Z',
      deviceInfo: { deviceId: 'DEV003', batteryLevel: 45, isOnline: true },
      emergencyContact: '+91-9876543212', parentNotified: true
    },
    {
      id: 'SL004', studentId: 'STU004', name: 'Sneha Patel', rollNumber: '2023IT008',
      block: 'A Block', roomNumber: 'A-204', branch: 'Information Technology', semester: 4,
      currentLocation: { latitude: 12.9715, longitude: 77.5945, timestamp: '2025-08-31T15:20:00Z', accuracy: 4 },
      currentZone: 'Library & Study Area', status: 'Inside Campus', lastSeen: '2025-08-31T15:20:00Z',
      deviceInfo: { deviceId: 'DEV004', batteryLevel: 67, isOnline: true },
      emergencyContact: '+91-9876543213', parentNotified: false
    },
    {
      id: 'SL005', studentId: 'STU005', name: 'Vikram Reddy', rollNumber: '2022CSE045',
      block: 'D Block', roomNumber: 'D-102', branch: 'Computer Science', semester: 6,
      currentLocation: { latitude: 12.9719, longitude: 77.5949, timestamp: '2025-08-31T15:35:00Z', accuracy: 6 },
      currentZone: 'Laboratory Complex', status: 'In Restricted Area', lastSeen: '2025-08-31T15:35:00Z',
      deviceInfo: { deviceId: 'DEV005', batteryLevel: 23, isOnline: true },
      emergencyContact: '+91-9876543214', parentNotified: true
    },
    {
      id: 'SL006', studentId: 'STU006', name: 'Anjali Gupta', rollNumber: '2023EEE012',
      block: 'E Block', roomNumber: 'E-301', branch: 'Electrical & Electronics', semester: 4,
      currentLocation: { latitude: 12.9712, longitude: 77.5943, timestamp: '2025-08-31T12:10:00Z', accuracy: 12 },
      status: 'Outside Campus', lastSeen: '2025-08-31T12:10:00Z',
      deviceInfo: { deviceId: 'DEV006', batteryLevel: 15, isOnline: false },
      emergencyContact: '+91-9876543215', parentNotified: true
    }
  ];

  // Sample location alerts
  const locationAlerts: LocationAlert[] = [
    {
      id: 'ALT001', studentId: 'STU005', studentName: 'Vikram Reddy',
      alertType: 'Zone Violation', zoneName: 'Laboratory Complex',
      location: { latitude: 12.9719, longitude: 77.5949 },
      timestamp: '2025-08-31T15:35:00Z', severity: 'Medium', status: 'Active'
    },
    {
      id: 'ALT002', studentId: 'STU006', studentName: 'Anjali Gupta',
      alertType: 'Device Offline', location: { latitude: 12.9712, longitude: 77.5943 },
      timestamp: '2025-08-31T12:15:00Z', severity: 'High', status: 'Active'
    },
    {
      id: 'ALT003', studentId: 'STU003', studentName: 'Amit Singh',
      alertType: 'Outside Campus', location: { latitude: 12.9705, longitude: 77.5955 },
      timestamp: '2025-08-31T14:45:00Z', severity: 'Low', status: 'Acknowledged',
      acknowledgedBy: 'Warden Kumar'
    }
  ];

  const filteredStudents = studentLocations.filter(student => {
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'inside' && student.status === 'Inside Campus') ||
      (selectedFilter === 'outside' && student.status === 'Outside Campus') ||
      (selectedFilter === 'restricted' && student.status === 'In Restricted Area') ||
      (selectedFilter === 'emergency' && student.status === 'Emergency Zone');

    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleViewStudentDetails = (student: StudentLocation) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inside Campus': return 'bg-secondary-500 text-white';
      case 'Outside Campus': return 'bg-accent-500 text-white';
      case 'In Restricted Area': return 'bg-red-500 text-white';
      case 'Emergency Zone': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getZoneTypeColor = (type: string) => {
    switch (type) {
      case 'Allowed': return 'bg-secondary-100 text-secondary-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      case 'Monitored': return 'bg-blue-100 text-blue-800';
      case 'Emergency': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Analytics data
  const totalStudents = studentLocations.length;
  const studentsInside = studentLocations.filter(s => s.status === 'Inside Campus').length;
  const studentsOutside = studentLocations.filter(s => s.status === 'Outside Campus').length;
  const violationAlerts = locationAlerts.filter(a => a.status === 'Active').length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="">
        
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {[
            { key: 'live-tracking', label: 'Live Student Tracking' },
            { key: 'zones', label: 'Geofence Zones' },
            { key: 'alerts', label: 'Location Alerts' },
            { key: 'analytics', label: 'Tracking Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Live Student Tracking Tab */}
        {activeTab === 'live-tracking' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Tracked</h3>
                <p className="text-3xl font-bold text-primary-600">{totalStudents}</p>
                <p className="text-sm text-gray-600">Active devices</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-secondary-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Inside Campus</h3>
                <p className="text-3xl font-bold text-secondary-600">{studentsInside}</p>
                <p className="text-sm text-gray-600">Safe in campus</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Outside Campus</h3>
                <p className="text-3xl font-bold text-accent-600">{studentsOutside}</p>
                <p className="text-sm text-gray-600">Out of bounds</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Alerts</h3>
                <p className="text-3xl font-bold text-red-600">{violationAlerts}</p>
                <p className="text-sm text-gray-600">Requires attention</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'all', label: 'All Students' },
                    { key: 'inside', label: 'Inside Campus' },
                    { key: 'outside', label: 'Outside Campus' },
                    { key: 'restricted', label: 'In Restricted' },
                    { key: 'emergency', label: 'Emergency Zone' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter.key
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                      }`}
                      onClick={() => setSelectedFilter(filter.key as any)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Tracking Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone/Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            <div className="text-xs text-gray-400">{student.branch} - Sem {student.semester}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Lat: {student.currentLocation.latitude.toFixed(6)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Lng: {student.currentLocation.longitude.toFixed(6)}
                          </div>
                          <div className="text-xs text-gray-400">
                            Accuracy: {student.currentLocation.accuracy}m
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                          {student.currentZone && (
                            <div className="text-xs text-gray-600 mt-1">{student.currentZone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDateTime(student.lastSeen)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${student.deviceInfo.isOnline ? 'bg-secondary-500' : 'bg-red-500'}`}></div>
                            <div className="text-sm">
                              <div className={student.deviceInfo.isOnline ? 'text-secondary-600' : 'text-red-600'}>
                                {student.deviceInfo.isOnline ? 'Online' : 'Offline'}
                              </div>
                              <div className="text-xs text-gray-500">
                                Battery: {student.deviceInfo.batteryLevel}%
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewStudentDetails(student)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200 mr-2"
                          >
                            Track
                          </button>
                          <button className="bg-accent-500 hover:bg-accent-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                            Alert
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Geofence Zones Tab */}
        {activeTab === 'zones' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Campus Geofence Zones</h2>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300">
                  Add New Zone
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {geofenceZones.map((zone) => (
                  <div key={zone.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{zone.name}</h3>
                        <p className="text-sm text-gray-600">{zone.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getZoneTypeColor(zone.type)}`}>
                          {zone.type}
                        </span>
                        <div className={`ml-2 w-3 h-3 rounded-full ${zone.isActive ? 'bg-secondary-500' : 'bg-gray-400'}`}></div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-600">Latitude:</span>
                          <p className="font-medium">{zone.coordinates.latitude}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Longitude:</span>
                          <p className="font-medium">{zone.coordinates.longitude}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Radius:</span>
                        <span className="font-medium ml-2">{zone.coordinates.radius}m</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Active Hours:</span>
                        <span className="font-medium ml-2">{zone.activeHours.start} - {zone.activeHours.end}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Violations (24h):</span>
                        <span className={`font-medium ml-2 ${zone.violations > 0 ? 'text-red-600' : 'text-secondary-600'}`}>
                          {zone.violations}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded transition-colors">
                          Edit Zone
                        </button>
                        <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-1 text-xs rounded transition-colors">
                          View Map
                        </button>
                        <button className={`px-3 py-1 text-xs rounded transition-colors ${zone.isActive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-secondary-500 hover:bg-secondary-600 text-white'}`}>
                          {zone.isActive ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Location-Based Alerts</h2>
              
              <div className="space-y-4">
                {locationAlerts.map((alert) => (
                  <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{alert.studentName}</h3>
                        <p className="text-sm text-gray-600">{alert.alertType}</p>
                        {alert.zoneName && <p className="text-xs text-gray-500">Zone: {alert.zoneName}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAlertSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${alert.status === 'Active' ? 'bg-red-100 text-red-700' : 'bg-secondary-100 text-secondary-700'}`}>
                          {alert.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="font-medium">{alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Timestamp:</span>
                        <p className="font-medium">{formatDateTime(alert.timestamp)}</p>
                      </div>
                    </div>

                    {alert.acknowledgedBy && (
                      <div className="text-sm mb-3">
                        <span className="text-gray-600">Acknowledged by:</span>
                        <span className="font-medium ml-2">{alert.acknowledgedBy}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {alert.status === 'Active' && (
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 text-xs rounded transition-colors">
                          Acknowledge
                        </button>
                      )}
                      <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-1 text-xs rounded transition-colors">
                        View Location
                      </button>
                      <button className="bg-accent-500 hover:bg-accent-600 text-white px-3 py-1 text-xs rounded transition-colors">
                        Contact Student
                      </button>
                      {alert.severity === 'High' || alert.severity === 'Critical' ? (
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded transition-colors">
                          Emergency Response
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Zone Utilization</h3>
                <div className="space-y-3">
                  {geofenceZones.slice(0, 4).map((zone) => {
                    const utilization = Math.floor(Math.random() * 100);
                    return (
                      <div key={zone.id}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{zone.name}:</span>
                          <span className="font-medium">{utilization}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${utilization}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Alert Summary</h3>
                <div className="space-y-2">
                  {['Zone Violation', 'Outside Campus', 'Device Offline', 'Emergency'].map((type) => {
                    const count = Math.floor(Math.random() * 10);
                    return (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="text-gray-600">{type}:</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {Math.round(((totalStudents - violationAlerts) / totalStudents) * 100)}%
                  </div>
                  <p className="text-sm text-gray-600">Students in compliance</p>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-secondary-500 h-2 rounded-full"
                      style={{ width: `${((totalStudents - violationAlerts) / totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Online Devices:</span>
                    <span className="font-medium text-secondary-600">
                      {studentLocations.filter(s => s.deviceInfo.isOnline).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Offline Devices:</span>
                    <span className="font-medium text-red-600">
                      {studentLocations.filter(s => !s.deviceInfo.isOnline).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Low Battery:</span>
                    <span className="font-medium text-accent-600">
                      {studentLocations.filter(s => s.deviceInfo.batteryLevel < 30).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Tracking Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Campus Presence - Hourly Trends</h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i;
                  const presence = Math.floor(Math.random() * 80) + 20;
                  return (
                    <div key={hour} className="text-center">
                      <div className="h-20 bg-gray-200 rounded relative mb-2">
                        <div 
                          className="bg-primary-500 rounded absolute bottom-0 w-full"
                          style={{ height: `${presence}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600">{hour.toString().padStart(2, '0')}:00</div>
                      <div className="text-xs font-medium text-gray-800">{presence}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Student Detail Modal */}
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Student Location Tracking</h2>
                  <p className="text-gray-600">{selectedStudent.name} • {selectedStudent.rollNumber}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Student Information */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Name:</span>
                            <p className="font-medium">{selectedStudent.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Roll Number:</span>
                            <p className="font-medium">{selectedStudent.rollNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Branch:</span>
                            <p className="font-medium">{selectedStudent.branch}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Semester:</span>
                            <p className="font-medium">{selectedStudent.semester}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Room:</span>
                            <p className="font-medium">{selectedStudent.block} - {selectedStudent.roomNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Emergency Contact:</span>
                            <p className="font-medium">{selectedStudent.emergencyContact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-600">Device ID:</span>
                            <p className="font-medium">{selectedStudent.deviceInfo.deviceId}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Battery Level:</span>
                            <div className="flex items-center">
                              <div className={`w-12 h-2 rounded-full mr-2 ${selectedStudent.deviceInfo.batteryLevel > 50 ? 'bg-secondary-500' : selectedStudent.deviceInfo.batteryLevel > 20 ? 'bg-accent-500' : 'bg-red-500'}`}>
                                <div 
                                  className="h-full bg-white rounded-full"
                                  style={{ width: `${100 - selectedStudent.deviceInfo.batteryLevel}%`, marginLeft: `${selectedStudent.deviceInfo.batteryLevel}%` }}
                                />
                              </div>
                              <span className="font-medium">{selectedStudent.deviceInfo.batteryLevel}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${selectedStudent.deviceInfo.isOnline ? 'bg-secondary-500' : 'bg-red-500'}`}></div>
                              <span className={`font-medium ${selectedStudent.deviceInfo.isOnline ? 'text-secondary-600' : 'text-red-600'}`}>
                                {selectedStudent.deviceInfo.isOnline ? 'Online' : 'Offline'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Seen:</span>
                            <p className="font-medium">{formatDateTime(selectedStudent.lastSeen)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-6">
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Location</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="text-gray-600">Coordinates:</span>
                          <p className="font-medium">
                            {selectedStudent.currentLocation.latitude.toFixed(6)}, {selectedStudent.currentLocation.longitude.toFixed(6)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="font-medium ml-2">{selectedStudent.currentLocation.accuracy}m</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Status:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedStudent.status)}`}>
                            {selectedStudent.status}
                          </span>
                        </div>
                        {selectedStudent.currentZone && (
                          <div>
                            <span className="text-gray-600">Current Zone:</span>
                            <p className="font-medium">{selectedStudent.currentZone}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Location Updated:</span>
                          <p className="font-medium">{formatDateTime(selectedStudent.currentLocation.timestamp)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Parent Notified:</span>
                          <span className={`font-medium ml-2 ${selectedStudent.parentNotified ? 'text-secondary-600' : 'text-red-600'}`}>
                            {selectedStudent.parentNotified ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 000 2.828l4.243 4.243a1.998 1.998 0 002.828 0L24.728 23.728a1.998 1.998 0 000-2.828l-4.243-4.243a1.998 1.998 0 00-2.828 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 019 9c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9z" />
                        </svg>
                        <p className="font-medium">Interactive Map View</p>
                        <p className="text-sm">Real-time location tracking</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Send Location Alert
                  </button>
                  <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Notify Parents
                  </button>
                  <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Call Student
                  </button>
                  {selectedStudent.status === 'In Restricted Area' && (
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                      Security Alert
                    </button>
                  )}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    View History
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeofencingManagement;
