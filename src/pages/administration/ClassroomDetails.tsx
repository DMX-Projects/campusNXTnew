import React, { useState } from 'react';
import { MapPin, Users, Monitor, Wifi, Calendar, Clock, BookOpen, Settings, Search, Filter, Plus, Edit } from 'lucide-react';

interface Classroom {
  id: string;
  roomNumber: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture' | 'lab' | 'seminar' | 'auditorium' | 'conference';
  facilities: string[];
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  currentClass?: string;
  nextClass?: string;
  nextClassTime?: string;
  equipment: string[];
  area: number;
  airConditioned: boolean;
  projector: boolean;
  smartBoard: boolean;
  wifiEnabled: boolean;
}

const ClassroomDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [buildingFilter, setBuildingFilter] = useState('all');

  const classrooms: Classroom[] = [
    {
      id: 'CR001',
      roomNumber: '101',
      building: 'Science Block',
      floor: 1,
      capacity: 60,
      type: 'lecture',
      facilities: ['Projector', 'Smart Board', 'AC', 'WiFi'],
      status: 'occupied',
      currentClass: 'Computer Science - Data Structures',
      nextClass: 'Mathematics - Calculus',
      nextClassTime: '14:00',
      equipment: ['Projector', 'Smart Board', 'Sound System', 'Podium'],
      area: 80,
      airConditioned: true,
      projector: true,
      smartBoard: true,
      wifiEnabled: true
    },
    {
      id: 'CR002',
      roomNumber: '205',
      building: 'Engineering Block',
      floor: 2,
      capacity: 40,
      type: 'lab',
      facilities: ['Computers', 'Projector', 'AC', 'WiFi'],
      status: 'available',
      nextClass: 'Programming Lab',
      nextClassTime: '15:30',
      equipment: ['30 Computers', 'Projector', 'Network Switch', 'Printer'],
      area: 100,
      airConditioned: true,
      projector: true,
      smartBoard: false,
      wifiEnabled: true
    },
    {
      id: 'CR003',
      roomNumber: '301',
      building: 'Arts Block',
      floor: 3,
      capacity: 25,
      type: 'seminar',
      facilities: ['Smart Board', 'AC', 'WiFi'],
      status: 'reserved',
      currentClass: 'Faculty Meeting',
      equipment: ['Smart Board', 'Conference Table', 'Chairs'],
      area: 50,
      airConditioned: true,
      projector: false,
      smartBoard: true,
      wifiEnabled: true
    },
    {
      id: 'CR004',
      roomNumber: 'Main Hall',
      building: 'Administrative Block',
      floor: 1,
      capacity: 300,
      type: 'auditorium',
      facilities: ['Stage', 'Sound System', 'Projector', 'AC', 'WiFi'],
      status: 'available',
      nextClass: 'Annual Function',
      nextClassTime: '18:00',
      equipment: ['Stage', 'Sound System', 'Lighting', 'Projector', 'Microphones'],
      area: 400,
      airConditioned: true,
      projector: true,
      smartBoard: false,
      wifiEnabled: true
    },
    {
      id: 'CR005',
      roomNumber: '102',
      building: 'Science Block',
      floor: 1,
      capacity: 50,
      type: 'lecture',
      facilities: ['Projector', 'AC'],
      status: 'maintenance',
      equipment: ['Projector', 'Whiteboard', 'Chairs', 'Tables'],
      area: 70,
      airConditioned: true,
      projector: true,
      smartBoard: false,
      wifiEnabled: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'seminar': return 'bg-green-100 text-green-800';
      case 'auditorium': return 'bg-orange-100 text-orange-800';
      case 'conference': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.currentClass?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || classroom.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || classroom.status === statusFilter;
    const matchesBuilding = buildingFilter === 'all' || classroom.building === buildingFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesBuilding;
  });

  const totalRooms = classrooms.length;
  const availableRooms = classrooms.filter(r => r.status === 'available').length;
  const occupiedRooms = classrooms.filter(r => r.status === 'occupied').length;
  const maintenanceRooms = classrooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Classroom Details</h1>
          <p className="text-gray-600">Manage classroom schedules, facilities, and availability</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Rooms</p>
                <p className="text-2xl font-bold text-blue-600">{totalRooms}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Occupied</p>
                <p className="text-2xl font-bold text-red-600">{occupiedRooms}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Users className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{maintenanceRooms}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by room number, building, or current class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="lecture">Lecture Hall</option>
                <option value="lab">Laboratory</option>
                <option value="seminar">Seminar Room</option>
                <option value="auditorium">Auditorium</option>
                <option value="conference">Conference Room</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="reserved">Reserved</option>
              </select>
              <select
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Buildings</option>
                <option value="Science Block">Science Block</option>
                <option value="Engineering Block">Engineering Block</option>
                <option value="Arts Block">Arts Block</option>
                <option value="Administrative Block">Administrative Block</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Room
              </button>
            </div>
          </div>
        </div>

        {/* Classroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClassrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{classroom.building}</h3>
                  <p className="text-2xl font-bold text-blue-600">Room {classroom.roomNumber}</p>
                  <p className="text-sm text-gray-500">Floor {classroom.floor}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classroom.status)}`}>
                    {classroom.status.charAt(0).toUpperCase() + classroom.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(classroom.type)}`}>
                    {classroom.type.charAt(0).toUpperCase() + classroom.type.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{classroom.capacity} seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{classroom.area} sq ft</span>
                </div>
              </div>

              {classroom.currentClass && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-medium text-red-800">Currently Occupied</p>
                  <p className="text-sm text-red-600">{classroom.currentClass}</p>
                </div>
              )}

              {classroom.nextClass && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Next Class</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600">{classroom.nextClass} at {classroom.nextClassTime}</span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {classroom.facilities.map((facility, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Monitor className={`w-4 h-4 ${classroom.projector ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={classroom.projector ? 'text-green-600' : 'text-gray-500'}>Projector</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className={`w-4 h-4 ${classroom.wifiEnabled ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={classroom.wifiEnabled ? 'text-green-600' : 'text-gray-500'}>WiFi</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClassrooms.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No classrooms found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomDetails;