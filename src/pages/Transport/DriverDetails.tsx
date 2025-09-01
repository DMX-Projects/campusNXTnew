import React, { useState } from 'react';
import { UserCog, Search, Phone, Star, CheckCircle, XCircle, Award } from 'lucide-react';
import { drivers } from './data/mockData';

export default function DriverDetails() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.busAssigned.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attendanceColors = {
    present: 'text-green-600 bg-green-50',
    absent: 'text-red-600 bg-red-50',
  };

  const attendanceIcons = {
    present: CheckCircle,
    absent: XCircle,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => {
            const AttendanceIcon = attendanceIcons[driver.attendanceToday];
            
            return (
              <div key={driver.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserCog className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{driver.name}</h4>
                      <p className="text-sm text-gray-600">{driver.licenseNumber}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${attendanceColors[driver.attendanceToday]}`}>
                    <AttendanceIcon className="w-3 h-3" />
                    <span className="capitalize">{driver.attendanceToday}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Bus Assigned</span>
                    <span className="font-medium text-gray-800">{driver.busAssigned}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Experience
                    </span>
                    <span className="font-medium text-gray-800">{driver.experience} years</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </span>
                    <span className="font-medium text-gray-800">{driver.contact}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Rating
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-800">{driver.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(driver.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600 mb-2">Address</div>
                    <div className="text-sm text-gray-800">{driver.address}</div>
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}