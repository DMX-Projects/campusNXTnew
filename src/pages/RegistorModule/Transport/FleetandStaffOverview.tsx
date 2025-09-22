import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  Car, 
  Users, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  MessageCircle,
  X,
  ChevronDown
} from 'lucide-react';

const FleetandStaffOverview = () => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState('fleet');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const fleetData = [
    {
      id: 'BUS-001',
      type: 'Bus',
      model: 'Mercedes Sprinter 2023',
      capacity: 50,
      status: 'active',
      driver: 'John Smith',
      route: 'Route A',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      mileage: '125,430 km',
      fuelLevel: 85
    },
    {
      id: 'BUS-002',
      type: 'Bus',
      model: 'Ford Transit 2022',
      capacity: 45,
      status: 'maintenance',
      driver: 'Sarah Johnson',
      route: 'Route B',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-01-25',
      mileage: '98,250 km',
      fuelLevel: 45
    },
    {
      id: 'VAN-001',
      type: 'Van',
      model: 'Toyota Hiace 2023',
      capacity: 12,
      status: 'active',
      driver: 'Mike Davis',
      route: 'Route C',
      lastMaintenance: '2023-12-15',
      nextMaintenance: '2024-01-30',
      mileage: '67,890 km',
      fuelLevel: 72
    }
  ];

  const staffData = [
    {
      id: 'DRV-001',
      name: 'John Smith',
      position: 'Senior Driver',
      license: 'CDL-A',
      experience: '8 years',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@transport.com',
      vehicle: 'BUS-001',
      route: 'Route A',
      status: 'active',
      workingHours: '06:00 - 14:00',
      licenseExpiry: '2025-06-15'
    },
    {
      id: 'DRV-002',
      name: 'Sarah Johnson',
      position: 'Driver',
      license: 'CDL-B',
      experience: '5 years',
      phone: '+1 (555) 234-5678',
      email: 'sarah.johnson@transport.com',
      vehicle: 'BUS-002',
      route: 'Route B',
      status: 'active',
      workingHours: '07:00 - 15:00',
      licenseExpiry: '2024-12-20'
    },
    {
      id: 'DRV-003',
      name: 'Mike Davis',
      position: 'Lead Driver',
      license: 'CDL-A',
      experience: '12 years',
      phone: '+1 (555) 345-6789',
      email: 'mike.davis@transport.com',
      vehicle: 'VAN-001',
      route: 'Route C',
      status: 'active',
      workingHours: '05:30 - 13:30',
      licenseExpiry: '2025-03-10'
    }
  ];

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getFilteredFleetData = () => {
    return fleetData.filter(vehicle => {
      const matchesSearch = vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const getFilteredStaffData = () => {
    return staffData.filter(staff => {
      const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           staff.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || staff.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleCall = (phone) => {
    // Show toast for calling
    showToast(`Calling ${phone}...`, 'success');
  };

  const handleEmail = (email) => {
    // Open mailto link like before
    window.open(`mailto:${email}`, '_self');
  };

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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fleet & Staff Overview
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive directory of vehicles and drivers for quick reference
            </p>
          </div>

          {/* View Toggle */}
          <div className={`inline-flex rounded-xl p-1 mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <button
              onClick={() => setViewMode('fleet')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                viewMode === 'fleet'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-4 h-4 inline mr-2" />
              Fleet View
            </button>
            <button
              onClick={() => setViewMode('staff')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
                viewMode === 'staff'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Staff View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search and Filter Bar */}
          <div className={`p-4 rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${viewMode === 'fleet' ? 'vehicles' : 'staff'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="training">Training</option>
                  <option value="inactive">Inactive</option>
                </select>
                
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setSearchTerm('');
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Fleet View */}
          {viewMode === 'fleet' && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Car className="w-5 h-5 mr-2 text-blue-500" />
                  Vehicle Directory ({getFilteredFleetData().length})
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {getFilteredFleetData().map((vehicle, index) => (
                  <VehicleCard 
                    key={index} 
                    vehicle={vehicle} 
                    onViewDetails={() => handleViewDetails(vehicle)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Staff View */}
          {viewMode === 'staff' && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-500" />
                  Staff Directory ({getFilteredStaffData().length})
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {getFilteredStaffData().map((staff, index) => (
                  <StaffCard 
                    key={index} 
                    staff={staff} 
                    onViewDetails={() => handleViewDetails(staff)}
                    onCall={() => handleCall(staff.phone)}
                    onEmail={() => handleEmail(staff.email)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Centered Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
              onClick={() => setShowDetailsModal(false)}
            />
            
            {/* Modal */}
            <div className={`relative w-full max-w-4xl transform rounded-2xl shadow-2xl transition-all ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              {/* Header */}
              <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {selectedItem?.name || selectedItem?.id || 'Details'}
                  </h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className={`p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                <DetailsContent item={selectedItem} isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
    <div className={`max-w-sm w-full rounded-lg shadow-lg overflow-hidden ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? <CheckCircle className="h-5 w-5 text-white" /> : <AlertTriangle className="h-5 w-5 text-white" />}
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

// Vehicle Card Component
const VehicleCard = ({ vehicle, onViewDetails, isDark }) => (
  <div className={`p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="text-lg font-bold">{vehicle.id}</h4>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{vehicle.model}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        vehicle.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      }`}>
        {vehicle.status}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
      <div>
        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type:</span>
        <span className="ml-2 font-medium">{vehicle.type}</span>
      </div>
      <div>
        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Capacity:</span>
        <span className="ml-2 font-medium">{vehicle.capacity}</span>
      </div>
      <div>
        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Driver:</span>
        <span className="ml-2 font-medium">{vehicle.driver}</span>
      </div>
      <div>
        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Route:</span>
        <span className="ml-2 font-medium">{vehicle.route}</span>
      </div>
    </div>

    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>Fuel Level</span>
        <span>{vehicle.fuelLevel}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            vehicle.fuelLevel > 60 ? 'bg-green-500' :
            vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${vehicle.fuelLevel}%` }}
        />
      </div>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm">
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Next Maintenance</p>
        <p className="font-medium">{vehicle.nextMaintenance}</p>
      </div>
      <button 
        onClick={onViewDetails}
        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
      >
        <Eye className="w-4 h-4 mr-1" />
        View
      </button>
    </div>
  </div>
);

// Staff Card Component
const StaffCard = ({ staff, onViewDetails, onCall, onEmail, isDark }) => (
  <div className={`p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="text-lg font-bold">{staff.name}</h4>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{staff.position}</p>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{staff.id}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        staff.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      }`}>
        {staff.status}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>License</p>
        <p className="font-medium">{staff.license}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Experience</p>
        <p className="font-medium">{staff.experience}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Vehicle</p>
        <p className="font-medium">{staff.vehicle}</p>
      </div>
      <div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Route</p>
        <p className="font-medium">{staff.route}</p>
      </div>
    </div>

    <div className="space-y-1 mb-3 text-sm">
      <div className="flex items-center">
        <Phone className="w-3 h-3 mr-2 text-gray-400" />
        <span>{staff.phone}</span>
      </div>
      <div className="flex items-center">
        <Mail className="w-3 h-3 mr-2 text-gray-400" />
        <span className="truncate">{staff.email}</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-3 h-3 mr-2 text-gray-400" />
        <span>{staff.workingHours}</span>
      </div>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm">
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>License Expires</p>
        <p className="font-medium">{staff.licenseExpiry}</p>
      </div>
      <div className="flex space-x-1">
        <button 
          onClick={onViewDetails}
          className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors duration-200"
        >
          <FileText className="w-4 h-4" />
        </button>
        <button 
          onClick={onCall}
          className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button 
          onClick={onEmail}
          className="p-1.5 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded transition-colors duration-200"
        >
          <Mail className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Details Content Component
const DetailsContent = ({ item, isDark }) => {
  if (!item) return null;

  return (
    <div className="space-y-6">
      {/* Vehicle Details */}
      {item.type && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-3 flex items-center">
              <Car className="w-4 h-4 mr-2 text-blue-500" />
              Vehicle Information
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">ID:</span> <span className="font-medium ml-2">{item.id}</span></p>
              <p><span className="text-gray-500">Type:</span> <span className="font-medium ml-2">{item.type}</span></p>
              <p><span className="text-gray-500">Model:</span> <span className="font-medium ml-2">{item.model}</span></p>
              <p><span className="text-gray-500">Capacity:</span> <span className="font-medium ml-2">{item.capacity} seats</span></p>
              <p><span className="text-gray-500">Mileage:</span> <span className="font-medium ml-2">{item.mileage}</span></p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-500" />
              Assignment & Status
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </p>
              <p><span className="text-gray-500">Driver:</span> <span className="font-medium ml-2">{item.driver}</span></p>
              <p><span className="text-gray-500">Route:</span> <span className="font-medium ml-2">{item.route}</span></p>
              <p><span className="text-gray-500">Last Maintenance:</span> <span className="font-medium ml-2">{item.lastMaintenance}</span></p>
              <p><span className="text-gray-500">Next Maintenance:</span> <span className="font-medium ml-2">{item.nextMaintenance}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Staff Details */}
      {item.position && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-500" />
              Personal Information
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">ID:</span> <span className="font-medium ml-2">{item.id}</span></p>
              <p><span className="text-gray-500">Name:</span> <span className="font-medium ml-2">{item.name}</span></p>
              <p><span className="text-gray-500">Position:</span> <span className="font-medium ml-2">{item.position}</span></p>
              <p><span className="text-gray-500">License:</span> <span className="font-medium ml-2">{item.license}</span></p>
              <p><span className="text-gray-500">Experience:</span> <span className="font-medium ml-2">{item.experience}</span></p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-green-500" />
              Contact & Assignment
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Phone:</span> <span className="font-medium ml-2">{item.phone}</span></p>
              <p><span className="text-gray-500">Email:</span> <span className="font-medium ml-2">{item.email}</span></p>
              <p><span className="text-gray-500">Vehicle:</span> <span className="font-medium ml-2">{item.vehicle}</span></p>
              <p><span className="text-gray-500">Route:</span> <span className="font-medium ml-2">{item.route}</span></p>
              <p><span className="text-gray-500">Working Hours:</span> <span className="font-medium ml-2">{item.workingHours}</span></p>
              <p><span className="text-gray-500">License Expiry:</span> <span className="font-medium ml-2">{item.licenseExpiry}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetandStaffOverview;
