import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Bed, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Home,
  Users,
  AlertCircle
} from 'lucide-react';

// --- Data Structures ---
type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  hostel: string;
  hostelBlock: string;
  roomNumber: string;
  bedNumber: string;
  floorNumber: number;
  isAttending: boolean;
  lastCheckIn: string;
  lastCheckOut: string;
  monthlyAttendance: {
    present: number;
    absent: number;
    totalDays: number;
  };
  guardianName: string;
  guardianPhone: string;
  emergencyContact: string;
};

type Roommate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: number;
  hometown: string;
  guardianPhone: string;
  isCurrentlyPresent: boolean;
};

type HostelInfo = {
  wardenName: string;
  wardenPhone: string;
  wardenEmail: string;
  assistantWardenName: string;
  assistantWardenPhone: string;
  messIncharge: string;
  messPhone: string;
  hostelAddress: string;
  facilities: string[];
  visitingHours: string;
  curfewTime: string;
};

// --- Mock Data ---
const mockStudent: Student = {
  id: 'S101',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@college.edu',
  phone: '+91-9876543210',
  hostel: 'Hostel A - Boys',
  hostelBlock: 'Block-A',
  roomNumber: '101',
  bedNumber: 'B1',
  floorNumber: 1,
  isAttending: true,
  lastCheckIn: '2025-09-01T08:30:00',
  lastCheckOut: '2025-08-31T22:15:00',
  monthlyAttendance: {
    present: 28,
    absent: 2,
    totalDays: 30
  },
  guardianName: 'Mr. Vijay Sharma',
  guardianPhone: '+91-9123456789',
  emergencyContact: '+91-9988776655'
};

const mockRoommates: Roommate[] = [
  {
    id: 'S102',
    name: 'Arjun Patel',
    email: 'arjun.patel@college.edu',
    phone: '+91-9876543211',
    course: 'Computer Science Engineering',
    year: 3,
    hometown: 'Ahmedabad, Gujarat',
    guardianPhone: '+91-9123456788',
    isCurrentlyPresent: true
  },
  {
    id: 'S103',
    name: 'Vikram Singh',
    email: 'vikram.singh@college.edu',
    phone: '+91-9876543212',
    course: 'Mechanical Engineering',
    year: 3,
    hometown: 'Jaipur, Rajasthan',
    guardianPhone: '+91-9123456787',
    isCurrentlyPresent: false
  }
];

const mockHostelInfo: HostelInfo = {
  wardenName: 'Dr. Rajesh Kumar',
  wardenPhone: '+91-9999888777',
  wardenEmail: 'warden.hostela@college.edu',
  assistantWardenName: 'Mr. Suresh Gupta',
  assistantWardenPhone: '+91-9999888778',
  messIncharge: 'Mr. Ramesh Yadav',
  messPhone: '+91-9999888779',
  hostelAddress: 'ABC Engineering College Campus, Sector-15, Gurgaon, Haryana - 122001',
  facilities: ['Wi-Fi', 'Laundry', 'Common Room', 'Study Hall', 'Mess', 'Medical Room', 'Sports Room', 'Parking'],
  visitingHours: '10:00 AM - 6:00 PM (Weekends only)',
  curfewTime: '11:00 PM'
};

// Attendance history for the last 7 days
const mockAttendanceHistory = [
  { date: '2025-09-01', status: 'Present', checkIn: '08:30', checkOut: '22:15' },
  { date: '2025-08-31', status: 'Present', checkIn: '09:00', checkOut: '21:45' },
  { date: '2025-08-30', status: 'Absent', checkIn: '-', checkOut: '-' },
  { date: '2025-08-29', status: 'Present', checkIn: '08:15', checkOut: '22:30' },
  { date: '2025-08-28', status: 'Present', checkIn: '08:45', checkOut: '21:30' },
  { date: '2025-08-27', status: 'Present', checkIn: '09:30', checkOut: '22:00' },
  { date: '2025-08-26', status: 'Present', checkIn: '08:00', checkOut: '21:45' }
];

// --- Main App Component ---
function ParentHostelPortal() {
  const [student] = useState<Student>(mockStudent);
  const [roommates] = useState<Roommate[]>(mockRoommates);
  const [hostelInfo] = useState<HostelInfo>(mockHostelInfo);
  const [activeTab, setActiveTab] = useState('overview');

  const attendancePercentage = Math.round((student.monthlyAttendance.present / student.monthlyAttendance.totalDays) * 100);

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parent Portal - Hostel Information</h1>
              <p className="text-gray-600 mt-1">Track your child's hostel accommodation and attendance</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString('en-IN')} {new Date().toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Student Quick Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-gray-600">Student ID: {student.id}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                student.isAttending 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {student.isAttending ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                {student.isAttending ? 'Currently Present' : 'Currently Absent'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="accommodation" 
            label="Accommodation Details" 
            isActive={activeTab === 'accommodation'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="roommates" 
            label="Roommates" 
            isActive={activeTab === 'roommates'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="attendance" 
            label="Attendance" 
            isActive={activeTab === 'attendance'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="contacts" 
            label="Important Contacts" 
            isActive={activeTab === 'contacts'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance</h3>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  attendancePercentage >= 75 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {attendancePercentage}%
                </div>
                <p className="text-gray-600">
                  {student.monthlyAttendance.present} present out of {student.monthlyAttendance.totalDays} days
                </p>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      attendancePercentage >= 75 ? 'bg-green-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Room Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Room Details</h3>
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hostel:</span>
                  <span className="font-medium">{student.hostel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block:</span>
                  <span className="font-medium">{student.hostelBlock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{student.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bed:</span>
                  <span className="font-medium">{student.bedNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Floor:</span>
                  <span className="font-medium">{student.floorNumber}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Check-in Today</p>
                    <p className="text-sm text-gray-600">
                      {new Date(student.lastCheckIn).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Last Check-out</p>
                    <p className="text-sm text-gray-600">
                      {new Date(student.lastCheckOut).toLocaleDateString('en-IN')} at{' '}
                      {new Date(student.lastCheckOut).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accommodation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Room Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Accommodation Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Hostel</p>
                    <p className="text-gray-600">{student.hostel}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Complete Address</p>
                    <p className="text-gray-600">{hostelInfo.hostelAddress}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Bed className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Room & Bed Assignment</p>
                    <p className="text-gray-600">
                      {student.hostelBlock}, Room {student.roomNumber}, Bed {student.bedNumber} (Floor {student.floorNumber})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hostel Facilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hostel Facilities</h3>
              <div className="grid grid-cols-2 gap-3">
                {hostelInfo.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visiting Hours:</span>
                    <span className="font-medium">{hostelInfo.visitingHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Curfew Time:</span>
                    <span className="font-medium">{hostelInfo.curfewTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roommates' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Roommates in Room {student.roomNumber}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roommates.map((roommate) => (
                  <div key={roommate.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{roommate.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        roommate.isCurrentlyPresent 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {roommate.isCurrentlyPresent ? 'Present' : 'Absent'}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>ID: {roommate.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{roommate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>{roommate.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{roommate.hometown}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-gray-700"><strong>Course:</strong> {roommate.course}</p>
                        <p className="text-gray-700"><strong>Year:</strong> {roommate.year}</p>
                        <p className="text-gray-700"><strong>Guardian:</strong> {roommate.guardianPhone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Attendance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {student.monthlyAttendance.present}
                </div>
                <div className="text-gray-600">Days Present</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {student.monthlyAttendance.absent}
                </div>
                <div className="text-gray-600">Days Absent</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {student.monthlyAttendance.totalDays}
                </div>
                <div className="text-gray-600">Total Days</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  attendancePercentage >= 75 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {attendancePercentage}%
                </div>
                <div className="text-gray-600">Attendance</div>
              </div>
            </div>

            {/* Recent Attendance History */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Recent Attendance History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-in Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-out Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockAttendanceHistory.map((record, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'Present' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkIn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkOut}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hostel Staff Contacts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Hostel Staff Contacts</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Hostel Warden</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.wardenName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.wardenPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.wardenEmail}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Assistant Warden</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.assistantWardenName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.assistantWardenPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mess Incharge</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.messIncharge}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{hostelInfo.messPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency & Parent Contacts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Emergency & Parent Contacts</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Parent/Guardian</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{student.guardianName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{student.guardianPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Emergency Contact</h4>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>{student.emergencyContact}</span>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Emergency Numbers
                  </h4>
                  <div className="text-sm text-red-700 space-y-1">
                    <p>College Security: +91-9999000111</p>
                    <p>Medical Emergency: +91-9999000222</p>
                    <p>Fire Emergency: 101</p>
                    <p>Police: 100</p>
                    <p>Ambulance: 108</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentHostelPortal;
