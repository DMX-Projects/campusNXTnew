import React from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { liveLocations, buses } from './data/mockData';

export default function LiveLocation() {
  const statusColors = {
    moving: 'text-green-600 bg-green-50',
    stopped: 'text-yellow-600 bg-yellow-50',
    breakdown: 'text-red-600 bg-red-50',
  };

  const statusIcons = {
    moving: Navigation,
    stopped: Clock,
    breakdown: AlertTriangle,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Refresh Locations
        </button>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-6">
          <div className="text-center text-gray-600">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
            <p className="text-sm">Live GPS tracking would be displayed here</p>
            <p className="text-xs mt-2">Integration with Google Maps/OpenStreetMap required</p>
          </div>
        </div>
      </div>

      {/* Bus Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => {
          const location = liveLocations.find(loc => loc.busNumber === bus.busNumber);
          const StatusIcon = location ? statusIcons[location.status] : Clock;
          const statusColor = location ? statusColors[location.status] : 'text-gray-600 bg-gray-50';
          
          return (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{bus.busNumber}</h4>
                    <p className="text-sm text-gray-600">{bus.routeName}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColor}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="capitalize">{location?.status || 'offline'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Driver</span>
                  <span className="font-medium text-gray-800">{bus.driverName}</span>
                </div>

                {location && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Speed</span>
                      <span className="font-medium text-gray-800">{location.speed} mph</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-800">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Last Update
                      </span>
                      <span className="font-medium text-gray-800">
                        {new Date(location.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Track Live
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}