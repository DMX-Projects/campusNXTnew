import React from 'react';
import { Bus, Users, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';
import { buses } from './data/mockData';

export default function BusDetails() {
  const statusColors = {
    active: 'text-green-600 bg-green-50',
    maintenance: 'text-yellow-600 bg-yellow-50',
    inactive: 'text-red-600 bg-red-50',
  };

  const statusIcons = {
    active: CheckCircle,
    maintenance: Wrench,
    inactive: AlertTriangle,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800"></h3>
          <p className="text-sm text-gray-600"></p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add New Bus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => {
          const StatusIcon = statusIcons[bus.status];
          const occupancyPercentage = (bus.currentStudents / bus.capacity) * 100;
          
          return (
            <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{bus.busNumber}</h4>
                    <p className="text-sm text-gray-600">{bus.routeName}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[bus.status]}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="capitalize">{bus.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Driver</span>
                  <span className="font-medium text-gray-800">{bus.driverName}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Occupancy
                  </span>
                  <span className="font-medium text-gray-800">
                    {bus.currentStudents}/{bus.capacity}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Capacity Used</span>
                    <span>{occupancyPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        occupancyPercentage > 90 ? 'bg-red-500' :
                        occupancyPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Last Maintenance</span>
                    <span>{bus.lastMaintenance}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                    <span>Next Maintenance</span>
                    <span>{bus.nextMaintenance}</span>
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