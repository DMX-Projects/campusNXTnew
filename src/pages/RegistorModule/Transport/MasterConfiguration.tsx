import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  Car, 
  Users, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  Search,
  Filter,
  Upload,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const MasterConfiguration = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sample data with relationships
  const [vehicles, setVehicles] = useState([
    { id: 'BUS-001', type: 'Bus', capacity: 50, status: 'active', route: 'RT-001', driver: 'DRV-001' },
    { id: 'BUS-002', type: 'Bus', capacity: 45, status: 'maintenance', route: 'RT-002', driver: 'DRV-002' },
    { id: 'VAN-001', type: 'Van', capacity: 12, status: 'active', route: 'RT-003', driver: 'DRV-003' },
    { id: 'BUS-003', type: 'Bus', capacity: 55, status: 'active', route: 'RT-004', driver: 'DRV-004' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'DRV-001', name: 'John Smith', license: 'CDL-A', experience: '8 years', status: 'active', vehicle: 'BUS-001' },
    { id: 'DRV-002', name: 'Sarah Johnson', license: 'CDL-B', experience: '5 years', status: 'active', vehicle: 'BUS-002' },
    { id: 'DRV-003', name: 'Mike Davis', license: 'CDL-A', experience: '12 years', status: 'active', vehicle: 'VAN-001' },
    { id: 'DRV-004', name: 'Emily Wilson', license: 'CDL-B', experience: '3 years', status: 'training', vehicle: 'BUS-003' },
    { id: 'DRV-005', name: 'Robert Brown', license: 'CDL-A', experience: '6 years', status: 'active', vehicle: '' },
    { id: 'DRV-006', name: 'Lisa Anderson', license: 'CDL-B', experience: '4 years', status: 'active', vehicle: '' }
  ]);

  const [routes, setRoutes] = useState([
    { id: 'RT-001', name: 'Route A', distance: '25 km', stops: 12, duration: '45 min', status: 'active' },
    { id: 'RT-002', name: 'Route B', distance: '18 km', stops: 8, duration: '35 min', status: 'active' },
    { id: 'RT-003', name: 'Route C', distance: '12 km', stops: 6, duration: '25 min', status: 'active' },
    { id: 'RT-004', name: 'Route D', distance: '30 km', stops: 15, duration: '55 min', status: 'inactive' }
  ]);

  // Determine current state from URL - Default to vehicles
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('vehicle-master')) return 'vehicles';
    if (path.includes('driver-master')) return 'drivers';
    if (path.includes('route-master')) return 'routes';
    return 'vehicles'; // default to vehicles
  };

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/add-')) return 'add';
    if (path.includes('/edit-')) return 'edit';
    return 'list';
  };

  const [activeSection, setActiveSection] = useState(getCurrentSection());
  const [currentView, setCurrentView] = useState(getCurrentView());
  const [editingItem, setEditingItem] = useState(null);

  // Update state when URL changes
  useEffect(() => {
    const newSection = getCurrentSection();
    const newView = getCurrentView();
    
    setActiveSection(newSection);
    setCurrentView(newView);
    
    // If editing, find the item
    if (newView === 'edit' && params.id) {
      const currentData = newSection === 'vehicles' ? vehicles :
                         newSection === 'drivers' ? drivers : routes;
      const item = currentData.find(item => item.id === params.id);
      setEditingItem(item);
    } else {
      setEditingItem(null);
    }
  }, [location.pathname, params.id, vehicles, drivers, routes]);

  // Default redirect effect - if user lands on base route, redirect to vehicle-master
  useEffect(() => {
    if (location.pathname === '/management/transport/master-configuration' || 
        location.pathname === '/management/transport/master-configuration/') {
      navigate('/management/transport/master-configuration/vehicle-master', { replace: true });
    }
  }, [location.pathname, navigate]);

  const sections = [
    { id: 'vehicles', label: 'Vehicle Master', icon: Car, path: 'vehicle-master' },
    { id: 'drivers', label: 'Driver Master', icon: Users, path: 'driver-master' },
    { id: 'routes', label: 'Route Master', icon: MapPin, path: 'route-master' }
  ];

  // Navigation functions with correct path structure
  const handleSectionChange = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    navigate(`/management/transport/master-configuration/${section.path}`);
  };

  const handleAdd = () => {
    const sectionPath = sections.find(s => s.id === activeSection)?.path;
    const addPath = activeSection === 'vehicles' ? 'add-vehicle' :
                   activeSection === 'drivers' ? 'add-driver' : 'add-route';
    navigate(`/management/transport/master-configuration/${sectionPath}/${addPath}`);
  };

  const handleEdit = (item) => {
    const sectionPath = sections.find(s => s.id === activeSection)?.path;
    const editPath = activeSection === 'vehicles' ? 'edit-vehicle' :
                     activeSection === 'drivers' ? 'edit-driver' : 'edit-route';
    navigate(`/management/transport/master-configuration/${sectionPath}/${editPath}/${item.id}`);
  };

  const handleBackToList = () => {
    const sectionPath = sections.find(s => s.id === activeSection)?.path;
    navigate(`/management/transport/master-configuration/${sectionPath}`);
  };

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getCurrentData = () => {
    switch (activeSection) {
      case 'vehicles': return vehicles;
      case 'drivers': return drivers;
      case 'routes': return routes;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getCurrentData();
    if (!searchTerm) return data;
    
    return data.filter((item) => {
      const searchFields = activeSection === 'vehicles' 
        ? [item.id, item.type, getDriverName(item.driver), getRouteName(item.route)]
        : activeSection === 'drivers'
        ? [item.id, item.name, item.license, item.vehicle]
        : [item.id, item.name, item.distance];
      
      return searchFields.some(field => 
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  // Helper functions to get names
  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : driverId;
  };

  const getRouteName = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.name : routeId;
  };

  const handleDelete = (item) => {
    switch (activeSection) {
      case 'vehicles':
        setVehicles(prev => prev.filter(v => v.id !== item.id));
        break;
      case 'drivers':
        setDrivers(prev => prev.filter(d => d.id !== item.id));
        break;
      case 'routes':
        setRoutes(prev => prev.filter(r => r.id !== item.id));
        break;
    }
    showToast(`${item.id} has been deleted successfully!`, 'success');
  };

  const handleSave = (formData) => {
    const newId = `${activeSection.toUpperCase().slice(0, 3)}-${String(getCurrentData().length + 1).padStart(3, '0')}`;
    
    switch (activeSection) {
      case 'vehicles':
        if (editingItem) {
          setVehicles(prev => prev.map(v => v.id === editingItem.id ? { ...formData, id: editingItem.id } : v));
          showToast(`Vehicle ${editingItem.id} updated successfully!`, 'success');
        } else {
          setVehicles(prev => [...prev, { ...formData, id: newId }]);
          showToast(`New vehicle ${newId} added successfully!`, 'success');
        }
        break;
      case 'drivers':
        if (editingItem) {
          setDrivers(prev => prev.map(d => d.id === editingItem.id ? { ...formData, id: editingItem.id } : d));
          showToast(`Driver ${editingItem.id} updated successfully!`, 'success');
        } else {
          setDrivers(prev => [...prev, { ...formData, id: newId }]);
          showToast(`New driver ${newId} added successfully!`, 'success');
        }
        break;
      case 'routes':
        if (editingItem) {
          setRoutes(prev => prev.map(r => r.id === editingItem.id ? { ...formData, id: editingItem.id } : r));
          showToast(`Route ${editingItem.id} updated successfully!`, 'success');
        } else {
          setRoutes(prev => [...prev, { ...formData, id: newId }]);
          showToast(`New route ${newId} added successfully!`, 'success');
        }
        break;
    }
    
    handleBackToList();
  };

  const renderActionButtons = () => (
    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3">
      <button 
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New
      </button>
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${activeSection}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 ${
            isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
        />
      </div>
    </div>
  );

  // Render Form Page
  if (currentView === 'add' || currentView === 'edit') {
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

        <div className="max-w-4xl mx-auto p-6">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToList}
              className={`flex items-center mb-4 px-4 py-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </button>
            
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentView === 'add' ? `Add New ${activeSection.slice(0, -1)}` : `Edit ${activeSection.slice(0, -1)}`}
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentView === 'add' ? `Create a new ${activeSection.slice(0, -1)} record` : `Update ${activeSection.slice(0, -1)} information`}
            </p>
          </div>

          {/* Form Card */}
          <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <MasterForm
              type={activeSection}
              data={editingItem}
              onSave={handleSave}
              onCancel={handleBackToList}
              isDark={isDark}
              drivers={drivers}
              routes={routes}
              vehicles={vehicles}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render List Page
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
              Master Configuration
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage foundational data for vehicles, drivers, and routes
            </p>
          </div>

          {/* Section Navigation */}
          <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <nav className="flex space-x-8" aria-label="Tabs">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeSection === section.id
                        ? `border-blue-500 ${isDark ? 'text-blue-400' : 'text-blue-600'}`
                        : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`rounded-xl shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              {/* Vehicles Section */}
              {activeSection === 'vehicles' && (
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Car className="w-5 h-5 mr-2 text-blue-500" />
                      Vehicle Master Data ({vehicles.length})
                    </h3>
                    {renderActionButtons()}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Vehicle ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Capacity</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Assigned Route</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Driver</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredData().map((vehicle, index) => (
                          <VehicleRow 
                            key={vehicle.id} 
                            vehicle={vehicle} 
                            onEdit={() => handleEdit(vehicle)}
                            onDelete={() => handleDelete(vehicle)}
                            isDark={isDark}
                            drivers={drivers}
                            routes={routes}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Drivers Section */}
              {activeSection === 'drivers' && (
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-500" />
                      Driver Master Data ({drivers.length})
                    </h3>
                    {renderActionButtons()}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Driver ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">License</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Experience</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Assigned Vehicle</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredData().map((driver, index) => (
                          <DriverRow 
                            key={driver.id} 
                            driver={driver} 
                            onEdit={() => handleEdit(driver)}
                            onDelete={() => handleDelete(driver)}
                            isDark={isDark}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Routes Section */}
              {activeSection === 'routes' && (
                <div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                      Route Master Data ({routes.length})
                    </h3>
                    {renderActionButtons()}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredData().map((route, index) => (
                      <RouteCard 
                        key={route.id} 
                        route={route} 
                        onEdit={() => handleEdit(route)}
                        onDelete={() => handleDelete(route)}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
            {type === 'success' ? <CheckCircle className="h-5 w-5 text-white" /> : <AlertCircle className="h-5 w-5 text-white" />}
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

// Vehicle Row Component
const VehicleRow = ({ vehicle, onEdit, onDelete, isDark, drivers, routes }) => {
  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : driverId;
  };

  const getRouteName = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.name : routeId;
  };

  return (
    <tr className={`border-b transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <td className="py-3 px-4 font-medium">{vehicle.id}</td>
      <td className="py-3 px-4">{vehicle.type}</td>
      <td className="py-3 px-4">{vehicle.capacity}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          vehicle.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {vehicle.status}
        </span>
      </td>
      <td className="py-3 px-4">{getRouteName(vehicle.route)}</td>
      <td className="py-3 px-4">{getDriverName(vehicle.driver)}</td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <button 
            onClick={onEdit}
            className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Driver Row Component
const DriverRow = ({ driver, onEdit, onDelete, isDark }) => (
  <tr className={`border-b transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
    isDark ? 'border-gray-700' : 'border-gray-200'
  }`}>
    <td className="py-3 px-4 font-medium">{driver.id}</td>
    <td className="py-3 px-4">{driver.name}</td>
    <td className="py-3 px-4">{driver.license}</td>
    <td className="py-3 px-4">{driver.experience}</td>
    <td className="py-3 px-4">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        driver.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      }`}>
        {driver.status}
      </span>
    </td>
    <td className="py-3 px-4">{driver.vehicle}</td>
    <td className="py-3 px-4">
      <div className="flex space-x-2">
        <button 
          onClick={onEdit}
          className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={onDelete}
          className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

// Route Card Component
const RouteCard = ({ route, onEdit, onDelete, isDark }) => (
  <div className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
    isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
  }`}>
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-semibold text-base">{route.name}</h4>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        route.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      }`}>
        {route.status}
      </span>
    </div>
    
    <div className="space-y-1 mb-4">
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">Distance:</span> {route.distance}
      </p>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">Stops:</span> {route.stops}
      </p>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">Duration:</span> {route.duration}
      </p>
    </div>

    <div className="flex space-x-2">
      <button 
        onClick={onEdit}
        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
        <Settings className="w-4 h-4 mr-1" />
        Configure
      </button>
      <button 
        onClick={onDelete}
        className="px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Master Form Component with Fixed Dropdowns
const MasterForm = ({ type, data, onSave, onCancel, isDark, drivers, routes, vehicles }) => {
  const [formData, setFormData] = useState(data || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getAvailableDrivers = () => {
    return drivers.filter(driver => 
      driver.status === 'active' && (
        !driver.vehicle || 
        driver.vehicle === '' || 
        (data && driver.vehicle === data.id)
      )
    );
  };

  const getAvailableVehicles = () => {
    return vehicles.filter(vehicle => 
      vehicle.status === 'active' && (
        !drivers.find(driver => driver.vehicle === vehicle.id) ||
        (data && drivers.find(driver => driver.vehicle === vehicle.id && driver.id === data.id))
      )
    );
  };

  const getAvailableRoutes = () => {
    return routes.filter(route => route.status === 'active');
  };

  const renderFields = () => {
    switch (type) {
      case 'vehicles':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type *</label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="">Select Type</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="Minibus">Minibus</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Capacity *</label>
              <input
                type="number"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || '' })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter capacity"
                min="1"
                max="100"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assigned Route</label>
              <select
                value={formData.route || ''}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select Route</option>
                {getAvailableRoutes().map(route => (
                  <option key={route.id} value={route.id}>
                    {route.name} ({route.id}) - {route.distance}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assigned Driver</label>
              <div className="relative">
                <select
                  value={formData.driver || ''}
                  onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                  className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Driver</option>
                  {getAvailableDrivers().length > 0 ? (
                    getAvailableDrivers().map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.id}) - {driver.license}
                      </option>
                    ))
                  ) : null}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {getAvailableDrivers().length === 0 && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  No active drivers available for assignment
                </p>
              )}
            </div>
          </>
        );
        
      case 'drivers':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">License Type *</label>
              <select
                value={formData.license || ''}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="">Select License</option>
                <option value="CDL-A">CDL-A (Commercial Driver's License Class A)</option>
                <option value="CDL-B">CDL-B (Commercial Driver's License Class B)</option>
                <option value="CDL-C">CDL-C (Commercial Driver's License Class C)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Experience *</label>
              <input
                type="text"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g., 5 years"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="training">Training</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assigned Vehicle</label>
              <div className="relative">
                <select
                  value={formData.vehicle || ''}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Vehicle</option>
                  {getAvailableVehicles().length > 0 ? (
                    getAvailableVehicles().map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.type} - {vehicle.id} (Capacity: {vehicle.capacity})
                      </option>
                    ))
                  ) : null}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {getAvailableVehicles().length === 0 && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  No active vehicles available for assignment
                </p>
              )}
            </div>
          </>
        );
        
      case 'routes':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Route Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter route name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Distance *</label>
              <input
                type="text"
                value={formData.distance || ''}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g., 25 km"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Number of Stops *</label>
              <input
                type="number"
                value={formData.stops || ''}
                onChange={(e) => setFormData({ ...formData, stops: parseInt(e.target.value) || '' })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="Enter number of stops"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Duration *</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="e.g., 45 min"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderFields()}
      </div>
      <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium"
        >
          <Save className="w-5 h-5 mr-2" />
          {data ? 'Update' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`flex-1 px-6 py-3 rounded-lg border transition-colors duration-200 font-medium ${
            isDark ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MasterConfiguration;
