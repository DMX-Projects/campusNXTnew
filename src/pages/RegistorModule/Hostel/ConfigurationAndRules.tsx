import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Settings, 
  Users,
  Wifi,
  Car,
  Utensils,
  Bed,
  Bath,
  Wind,
  Shield,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ConfigurationAndRules = () => {
  const [activeTab, setActiveTab] = useState('hostels');

  // Sample hostel data (read-only)
  const hostels = [
    {
      id: 1,
      name: 'Block A - Boys Hostel',
      type: 'Boys',
      floors: 4,
      totalRooms: 120,
      occupiedRooms: 95,
      warden: 'Dr. Rajesh Kumar',
      status: 'Active',
      facilities: ['Wi-Fi', 'Parking', 'Mess', 'Laundry']
    },
    {
      id: 2,
      name: 'Block B - Girls Hostel',
      type: 'Girls',
      floors: 3,
      totalRooms: 90,
      occupiedRooms: 78,
      warden: 'Dr. Priya Sharma',
      status: 'Active',
      facilities: ['Wi-Fi', 'Mess', 'Security', 'Common Room']
    },
    {
      id: 3,
      name: 'Block C - Mixed Hostel',
      type: 'Mixed',
      floors: 5,
      totalRooms: 150,
      occupiedRooms: 0,
      warden: 'Not Assigned',
      status: 'Inactive',
      facilities: ['Wi-Fi', 'Parking']
    }
  ];

  // Sample room types data (read-only)
  const roomTypes = [
    {
      id: 1,
      name: 'Single AC',
      capacity: 1,
      amenities: ['AC', 'Wi-Fi', 'Attached Bath', 'Study Table'],
      basePrice: 50000,
      description: 'Premium single occupancy room with air conditioning'
    },
    {
      id: 2,
      name: 'Single Non-AC',
      capacity: 1,
      amenities: ['Wi-Fi', 'Attached Bath', 'Study Table', 'Fan'],
      basePrice: 35000,
      description: 'Standard single occupancy room'
    },
    {
      id: 3,
      name: 'Double AC',
      capacity: 2,
      amenities: ['AC', 'Wi-Fi', 'Attached Bath', 'Study Tables'],
      basePrice: 40000,
      description: 'Shared AC room for two students'
    },
    {
      id: 4,
      name: 'Double Non-AC',
      capacity: 2,
      amenities: ['Wi-Fi', 'Attached Bath', 'Study Tables', 'Fan'],
      basePrice: 28000,
      description: 'Standard shared room for two students'
    }
  ];

  // Allotment rules state (read-only)
  const rules = {
    prioritizeByYear: true,
    allowInterBlockTransfer: false,
    autoAssignment: true,
    requireParentConsent: true,
    enableWaitingList: true,
    allowRoomChange: true,
    strictCapacityLimit: true,
    enableEmergencyAllotment: false
  };

  const tabs = [
    { id: 'hostels', label: 'Hostel & Blocks', icon: Building2 },
    { id: 'rooms', label: 'Room Types', icon: Home },
    { id: 'rules', label: 'Allotment Rules', icon: Settings }
  ];

  const facilityIcons = {
    'Wi-Fi': Wifi,
    'Parking': Car,
    'Mess': Utensils,
    'Laundry': Bath,
    'Security': Shield,
    'Common Room': Users
  };

  const amenityIcons = {
    'AC': Wind,
    'Wi-Fi': Wifi,
    'Attached Bath': Bath,
    'Study Table': Bed,
    'Study Tables': Bed,
    'Fan': Wind
  };

  const HostelCard = ({ hostel }) => {
    const occupancyRate = (hostel.occupiedRooms / hostel.totalRooms) * 100;
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{hostel.name}</h3>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  hostel.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {hostel.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{hostel.floors}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Floors</p>
              </div>
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{hostel.totalRooms}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Total Rooms</p>
              </div>
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{hostel.occupiedRooms}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Occupied</p>
              </div>
              <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{occupancyRate.toFixed(0)}%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Occupancy</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                <span className="font-medium">Warden:</span> {hostel.warden}
              </p>
              <div className="flex flex-wrap gap-2">
                {hostel.facilities.map((facility, index) => {
                  const IconComponent = facilityIcons[facility];
                  return (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                      {IconComponent && <IconComponent className="w-3 h-3" />}
                      {facility}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RoomTypeCard = ({ roomType }) => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{roomType.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{roomType.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-xl font-bold text-slate-900 dark:text-white">{roomType.capacity}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Max Occupancy</p>
              </div>
              <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="text-xl font-bold text-slate-900 dark:text-white">₹{roomType.basePrice.toLocaleString()}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Base Price</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {roomType.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity];
                  return (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                      {IconComponent && <IconComponent className="w-3 h-3" />}
                      {amenity}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RuleDisplay = ({ title, description, value }) => {
    return (
      <div className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
        <div className="flex-1 mr-4">
          <h4 className="font-medium text-slate-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex-shrink-0">
          {value ? (
            <div className="flex items-center gap-2">
              <ToggleRight className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Enabled</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ToggleLeft className="w-8 h-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-500">Disabled</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
         {/* Tabs Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Hostel & Blocks Tab */}
            {activeTab === 'hostels' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Hostel Blocks</h2>
                  <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                    {hostels.length} blocks configured
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {hostels.map(hostel => (
                    <HostelCard key={hostel.id} hostel={hostel} />
                  ))}
                </div>
              </div>
            )}

            {/* Room Types Tab */}
            {activeTab === 'rooms' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Room Types</h2>
                  <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                    {roomTypes.length} room types configured
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {roomTypes.map(roomType => (
                    <RoomTypeCard key={roomType.id} roomType={roomType} />
                  ))}
                </div>
              </div>
            )}

            {/* Allotment Rules Tab */}
            {activeTab === 'rules' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Allotment Rules & Policies</h2>
                  <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                    Read-only view
                  </div>
                </div>
                
                <div className="space-y-4">
                  <RuleDisplay
                    title="Prioritize by Academic Year"
                    description="Give priority to senior students during room allotment"
                    value={rules.prioritizeByYear}
                  />
                  
                  <RuleDisplay
                    title="Allow Inter-Block Transfers"
                    description="Enable students to transfer between different hostel blocks"
                    value={rules.allowInterBlockTransfer}
                  />
                  
                  <RuleDisplay
                    title="Automatic Room Assignment"
                    description="Automatically assign rooms based on availability and preferences"
                    value={rules.autoAssignment}
                  />
                  
                  <RuleDisplay
                    title="Require Parent Consent"
                    description="Mandatory parent approval for hostel allotment"
                    value={rules.requireParentConsent}
                  />
                  
                  <RuleDisplay
                    title="Enable Waiting List"
                    description="Maintain a waiting list when rooms are not available"
                    value={rules.enableWaitingList}
                  />
                  
                  <RuleDisplay
                    title="Allow Room Changes"
                    description="Permit students to change rooms after initial allotment"
                    value={rules.allowRoomChange}
                  />
                  
                  <RuleDisplay
                    title="Strict Capacity Limits"
                    description="Enforce maximum occupancy limits for all room types"
                    value={rules.strictCapacityLimit}
                  />
                  
                  <RuleDisplay
                    title="Emergency Allotment"
                    description="Allow emergency room allotments outside normal procedures"
                    value={rules.enableEmergencyAllotment}
                  />
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Rule Summary</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {Object.values(rules).filter(Boolean).length} out of {Object.keys(rules).length} rules are currently enabled.
                    These rules are configured by the system administrator.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationAndRules;
