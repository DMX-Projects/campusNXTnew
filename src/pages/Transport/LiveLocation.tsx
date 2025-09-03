import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

// Mock data - replace with your actual data imports
const buses = [
  {
    id: 1,
    busNumber: 'B001',
    routeName: 'Downtown Express',
    driverName: 'John Smith'
  },
  {
    id: 2,
    busNumber: 'B002',
    routeName: 'Airport Shuttle',
    driverName: 'Sarah Johnson'
  },
  {
    id: 3,
    busNumber: 'B003',
    routeName: 'University Route',
    driverName: 'Mike Wilson'
  }
];

const liveLocations = [
  {
    busNumber: 'B001',
    status: 'moving',
    speed: 35,
    latitude: 40.7128,
    longitude: -74.0060,
    lastUpdate: new Date()
  },
  {
    busNumber: 'B002',
    status: 'stopped',
    speed: 0,
    latitude: 40.7589,
    longitude: -73.9851,
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
  },
  {
    busNumber: 'B003',
    status: 'breakdown',
    speed: 0,
    latitude: 40.6892,
    longitude: -74.0445,
    lastUpdate: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  }
];

export default function LiveLocation() {
  const [currentView, setCurrentView] = useState('live-location');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [selectedBus, setSelectedBus] = useState(null);
  const [mapAction, setMapAction] = useState(null);

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

  const handleTrackLive = useCallback((busNumber) => {
    const bus = buses.find(b => b.busNumber === busNumber);
    setSelectedBus(bus);
    setCurrentView('live-tracking');
    setMapAction(null); // Reset map action when switching views
    console.log(`Opening maps for bus: ${busNumber}`);
  }, []);

  const handleHistory = useCallback((busNumber) => {
    const bus = buses.find(b => b.busNumber === busNumber);
    setSelectedBus(bus);
    setCurrentView('history');
    console.log(`Opening details for bus: ${busNumber}`);
  }, []);

  const handleMapAction = useCallback((action) => {
    setMapAction(action);
    console.log(`Map action triggered: ${action}`);
  }, []);

  const handleRefreshLocations = useCallback(async () => {
    setIsRefreshing(true);
    console.log('Refreshing locations...');
    
    // Simulate API call delay
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
      console.log('Locations refreshed successfully');
    }, 2000);
  }, []);

  const renderCurrentView = () => {
    const location = selectedBus ? liveLocations.find(loc => loc.busNumber === selectedBus.busNumber) : null;
    
    switch (currentView) {
      case 'live-tracking':
        return (
          <div className="space-y-6">
            {/* Maps Interface Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Live Tracking - {selectedBus?.busNumber}</h3>
                    <p className="text-sm text-gray-600">{selectedBus?.routeName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentView('live-location')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Back
                </button>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Map Action Overlay */}
                {mapAction && (
                  <div className="absolute inset-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
                    <div className="text-center max-w-md">
                      {mapAction === 'center' && (
                        <>
                          <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
                          <h3 className="text-xl font-semibold mb-2">Centering on Bus</h3>
                          <p className="text-gray-600 mb-4">GPS coordinates: {location?.latitude.toFixed(6)}, {location?.longitude.toFixed(6)}</p>
                          <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div><strong>Zoom Level:</strong> 15x</div>
                              <div><strong>Bearing:</strong> 45°</div>
                              <div><strong>Altitude:</strong> 125m</div>
                              <div><strong>Accuracy:</strong> ±3m</div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {mapAction === 'route' && (
                        <>
                          <Navigation className="w-16 h-16 mx-auto mb-4 text-green-600 animate-bounce" />
                          <h3 className="text-xl font-semibold mb-2">Route Information</h3>
                          <p className="text-gray-600 mb-4">{selectedBus?.routeName}</p>
                          <div className="bg-green-50 rounded-lg p-4 mb-4 text-left">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span><strong>Total Distance:</strong></span>
                                <span>24.5 km</span>
                              </div>
                              <div className="flex justify-between">
                                <span><strong>Total Stops:</strong></span>
                                <span>18 stops</span>
                              </div>
                              <div className="flex justify-between">
                                <span><strong>Route Type:</strong></span>
                                <span>Circular</span>
                              </div>
                              <div className="flex justify-between">
                                <span><strong>Average Speed:</strong></span>
                                <span>32 km/h</span>
                              </div>
                              <div className="flex justify-between">
                                <span><strong>Next Stop:</strong></span>
                                <span>Downtown Plaza (0.8 km)</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {mapAction === 'eta' && (
                        <>
                          <Clock className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
                          <h3 className="text-xl font-semibold mb-2">ETA Information</h3>
                          <p className="text-gray-600 mb-4">Estimated arrival times for upcoming stops</p>
                          <div className="bg-purple-50 rounded-lg p-4 mb-4 text-left">
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                                <div>
                                  <div className="font-medium">Downtown Plaza</div>
                                  <div className="text-xs text-gray-600">Stop #7</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-purple-600">3 min</div>
                                  <div className="text-xs">10:18 AM</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                                <div>
                                  <div className="font-medium">University Campus</div>
                                  <div className="text-xs text-gray-600">Stop #8</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-purple-600">8 min</div>
                                  <div className="text-xs">10:23 AM</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                                <div>
                                  <div className="font-medium">Shopping Center</div>
                                  <div className="text-xs text-gray-600">Stop #9</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-purple-600">15 min</div>
                                  <div className="text-xs">10:30 AM</div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <div>
                                  <div className="font-medium">Hospital District</div>
                                  <div className="text-xs text-gray-600">Stop #10</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-purple-600">22 min</div>
                                  <div className="text-xs">10:37 AM</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      <button 
                        onClick={() => setMapAction(null)}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-center z-10">
                  <div className="relative inline-block">
                    <MapPin className="w-20 h-20 mx-auto mb-4 text-blue-600 animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-Time GPS Map</h3>
                  <p className="text-sm text-gray-600 mb-4">Live tracking for {selectedBus?.busNumber}</p>
                  {location && !mapAction && (
                    <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 inline-block">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current Speed:</span>
                          <span className="font-semibold ml-2">{location.speed} mph</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <span className="font-semibold ml-2 capitalize">{location.status}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Coordinates:</span>
                          <span className="font-semibold ml-2">
                            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => handleMapAction('center')}
                className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors transform hover:scale-105"
              >
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Center on Bus</span>
              </button>
              <button 
                onClick={() => handleMapAction('route')}
                className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-colors transform hover:scale-105"
              >
                <Navigation className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Show Route</span>
              </button>
              <button 
                onClick={() => handleMapAction('eta')}
                className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-colors transform hover:scale-105"
              >
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">ETA Info</span>
              </button>
            </div>
          </div>
        );
      
      case 'history':
        const historyData = [
          { time: '09:00', location: 'Main Terminal', status: 'Departed', passengers: 24 },
          { time: '09:15', location: 'Oak Street Stop', status: 'Stopped', passengers: 28 },
          { time: '09:30', location: 'Downtown Plaza', status: 'Stopped', passengers: 31 },
          { time: '09:45', location: 'University Campus', status: 'Stopped', passengers: 19 },
          { time: '10:00', location: 'Shopping Center', status: 'Stopped', passengers: 22 },
          { time: '10:15', location: 'Hospital District', status: 'Current', passengers: 25 }
        ];

        return (
          <div className="space-y-6">
            {/* Details Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Bus Details - {selectedBus?.busNumber}</h3>
                    <p className="text-gray-600">{selectedBus?.routeName}</p>
                    <p className="text-sm text-gray-500">Driver: {selectedBus?.driverName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentView('live-location')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Back
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">8.2</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-gray-600">On Time</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">156</div>
                  <div className="text-sm text-gray-600">Total Trips</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1k</div>
                  <div className="text-sm text-gray-600">Passengers</div>
                </div>
              </div>
            </div>

            {/* Today's Route Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Today's Route Timeline
              </h4>
              <div className="space-y-4">
                {historyData.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-4 relative">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      stop.status === 'Current' ? 'bg-blue-600 animate-pulse' :
                      stop.status === 'Departed' ? 'bg-green-600' : 'bg-gray-400'
                    }`}></div>
                    {index < historyData.length - 1 && (
                      <div className="absolute left-2 top-6 w-0.5 h-8 bg-gray-300"></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{stop.location}</p>
                          <p className="text-sm text-gray-600">{stop.time} - {stop.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-800">{stop.passengers} passengers</p>
                          {stop.status === 'Current' && (
                            <p className="text-xs text-blue-600">● Live</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Weekly Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tuesday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wednesday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thursday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Friday</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '96%'}}></div>
                      </div>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Issues</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Minor Delay</p>
                      <p className="text-xs text-gray-600">Yesterday 2:30 PM - Traffic congestion</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Route Completed</p>
                      <p className="text-xs text-gray-600">Yesterday 6:45 PM - On schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Maintenance Check</p>
                      <p className="text-xs text-gray-600">2 days ago - All systems normal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
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
                          <button 
                            onClick={() => handleTrackLive(bus.busNumber)}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Track Live
                          </button>
                          <button 
                            onClick={() => handleHistory(bus.busNumber)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                          >
                            History
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
          </h3>
          <p className="text-sm text-gray-600">
          </p>
        </div>
        {currentView === 'live-location' && (
          <button 
            onClick={handleRefreshLocations}
            disabled={isRefreshing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Locations'}</span>
          </button>
        )}
      </div>

      {renderCurrentView()}
    </div>
  );
}