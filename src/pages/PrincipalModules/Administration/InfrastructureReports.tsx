import React, { useState, useEffect } from 'react';
import { 
  FileText,
  DollarSign,
  Calendar,
  Building,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Clock,
  AlertCircle,
  Download,
  Search,
  Filter
} from 'lucide-react';

const InfrastructureReports = () => {
  // Mock navigation and params for demo
  const navigate = (url) => {
    console.log('Navigate called with:', url);
    // In real app, this would be useNavigate() from react-router-dom
    window.history.pushState({}, '', url);
    // Trigger a re-render by updating state
    setCurrentPath(url);
  };
  
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Extract id from URL path manually
  const getIdFromPath = () => {
    const pathSegments = currentPath.split('/');
    const viewIndex = pathSegments.findIndex(segment => segment === 'View');
    return viewIndex !== -1 && viewIndex < pathSegments.length - 1 
      ? pathSegments[viewIndex + 1] 
      : null;
  };
  
  const id = getIdFromPath();
  const [activeTab, setActiveTab] = useState('new-assets');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Common departments array
  const commonDepartments = [
    'Computer Science & Engineering',
    'Mechanical Engineering', 
    'Electrical & Electronics Engineering',
    'Electronics & Communication Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Artificial Intelligence & Machine Learning',
    'Library',
 
  ];

  // Mock data for requests
  const newAssetRequests = [
    {
      id: 1,
      department: 'Computer Science & Engineering',
      title: 'High-Performance Computing Lab Setup',
      estimatedCost: 125000,
      dateSubmitted: '2024-09-15',
      priority: 'high',
      status: 'pending',
      description: 'Request for 20 high-end workstations, server rack, and networking equipment for new AI/ML lab',
      justification: 'The Computer Science department needs modern computing infrastructure to support advanced coursework in artificial intelligence and machine learning. Current equipment is 8 years old and cannot handle modern computational requirements.',
      specifications: [
        '20x High-performance workstations (32GB RAM, RTX 4070)',
        '1x Server rack with 2U server (128GB RAM, dual Xeon processors)',
        'Gigabit networking switches and cables',
        'Climate control system for server room'
      ],
      attachments: ['quote_dell_workstations.pdf', 'server_specifications.pdf', 'floor_plan.pdf']
    },
    {
      id: 2,
      department: 'Chemical Engineering',
      title: 'Fume Hood Replacement',
      estimatedCost: 45000,
      dateSubmitted: '2024-09-12',
      priority: 'medium',
      status: 'pending',
      description: 'Replacement of 6 outdated fume hoods in organic chemistry lab',
      justification: 'Current fume hoods are 15 years old and no longer meet safety standards. Recent safety inspection highlighted urgent need for replacement.',
      specifications: [
        '6x Modern ducted fume hoods with variable air volume',
        'Updated electrical connections',
        'Improved ventilation ductwork',
        'Safety compliance certification'
      ],
      attachments: ['safety_inspection_report.pdf', 'vendor_quote.pdf']
    },
    {
      id: 3,
      department: 'Library',
      title: 'Digital Learning Commons',
      estimatedCost: 75000,
      dateSubmitted: '2024-09-10',
      priority: 'low',
      status: 'pending',
      description: 'Modern collaborative learning space with smart displays and flexible furniture',
      justification: 'Students need modern collaborative spaces for group projects and digital learning activities. Current library setup is outdated.',
      specifications: [
        '4x 75-inch interactive displays',
        '20x Modular furniture pieces',
        'Wireless presentation technology',
        'Acoustic treatment panels'
      ],
      attachments: ['space_design.pdf', 'furniture_catalog.pdf']
    }
  ];

  const maintenanceRequests = [
    {
      id: 4,
      department: 'Facilities',
      title: 'HVAC System Overhaul - Building A',
      estimatedCost: 95000,
      dateSubmitted: '2024-09-14',
      priority: 'high',
      status: 'pending',
      description: 'Complete overhaul of aging HVAC system in main academic building',
      justification: 'HVAC system is 20 years old and frequently breaks down, affecting classroom temperatures and air quality.',
      specifications: [
        'Replace main air handling unit',
        'Update all ductwork on floors 1-3',
        'Install new digital thermostats',
        'Improve insulation and sealing'
      ],
      attachments: ['hvac_assessment.pdf', 'energy_audit.pdf', 'contractor_quotes.pdf']
    },
    {
      id: 5,
      department: 'Facilities',
      title: 'Parking Lot Resurfacing',
      estimatedCost: 32000,
      dateSubmitted: '2024-09-08',
      priority: 'medium',
      status: 'pending',
      description: 'Complete resurfacing and repainting of student parking lot',
      justification: 'Parking lot has multiple potholes and faded line markings, creating safety hazards.',
      specifications: [
        'Full asphalt resurfacing (5000 sq ft)',
        'New parking space line painting',
        'Updated signage installation',
        'Improved drainage system'
      ],
      attachments: ['lot_assessment.pdf', 'contractor_bid.pdf']
    }
  ];

  const allRequests = [...newAssetRequests, ...maintenanceRequests];

  // Get unique departments for filter dropdown
  const getAllDepartments = () => {
    const newAssetDepts = newAssetRequests.map(req => req.department);
    const maintenanceDepts = maintenanceRequests.map(req => req.department);
    const currentDataDepts = [...newAssetDepts, ...maintenanceDepts];
    
    // Combine common departments with departments from current data
    const allDepts = [...new Set([...commonDepartments, ...currentDataDepts])];
    return allDepts.sort();
  };

  // Debug current path and URL params
  useEffect(() => {
    console.log('Current pathname:', window.location.pathname);
    console.log('URL params - id:', id);
  }, [id]);

  // Determine which tab should be active based on current route
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log('Setting tab based on path:', currentPath);
    
    if (currentPath.includes('new-asset-requests')) {
      setActiveTab('new-assets');
    } else if (currentPath.includes('major-maintenance-requests')) {
      setActiveTab('maintenance');
    }
  }, []);

  // Load selected request based on URL parameter
  useEffect(() => {
    if (id) {
      const request = allRequests.find(req => req.id === parseInt(id));
      setSelectedRequest(request);
      console.log('Selected request:', request);
    } else {
      setSelectedRequest(null);
    }
  }, [id]);

  const currentTabRequests = activeTab === 'new-assets' ? newAssetRequests : maintenanceRequests;
  
  const filteredRequests = currentTabRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterStatus === 'all' || request.priority === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;
    return matchesSearch && matchesPriority && matchesDepartment;
  });

  const handleViewRequest = (request) => {
    console.log('Viewing request:', request);
    
    // Determine the correct path based on the request type
    const requestType = newAssetRequests.find(req => req.id === request.id) 
      ? 'new-asset-requests' 
      : 'major-maintenance-requests';
    
    console.log('Request type:', requestType);
    console.log('Request ID:', request.id);
    
    // Construct the URL
    const url = `/principal/infrastructure-reports/${requestType}/View/${request.id}`;
    console.log('Navigating to:', url);
    
    // Navigate to the appropriate URL
    navigate(url);
  };

  const handleBackToList = () => {
    // Navigate back to the list view
    const requestType = newAssetRequests.find(req => req.id === selectedRequest?.id) 
      ? 'new-asset-requests' 
      : 'major-maintenance-requests';
    
    console.log('Going back to list, request type:', requestType);
    navigate(`/principal/infrastructure-reports/${requestType}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const requestType = tab === 'new-assets' ? 'new-asset-requests' : 'major-maintenance-requests';
    console.log('Tab changed to:', tab, 'navigating to:', requestType);
    navigate(`/principal/infrastructure-reports/${requestType}`);
  };

  const handleApprove = (requestId) => {
    alert(`Request #${requestId} approved and forwarded to Registrar/Admin for final sanctioning.`);
    handleBackToList();
  };

  const handleReject = (requestId) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert(`Request #${requestId} rejected. Reason: ${reason}`);
      handleBackToList();
    }
  };

  const handleReturnForClarification = (requestId) => {
    const clarification = prompt('What clarification is needed?');
    if (clarification) {
      alert(`Request #${requestId} returned for clarification: ${clarification}`);
      handleBackToList();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (selectedRequest) {
    return (
      <div className="min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToList}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Back to Requests
              </button>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                {selectedRequest.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {selectedRequest.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {selectedRequest.department}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {formatCurrency(selectedRequest.estimatedCost)}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {selectedRequest.dateSubmitted}
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Description</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedRequest.description}
              </p>
            </div>

            {/* Justification */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Departmental Justification</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedRequest.justification}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Specifications</h2>
              <ul className="space-y-2">
                {selectedRequest.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Attachments */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Attachments</h2>
              <div className="space-y-2">
                {selectedRequest.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-blue-500 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">{attachment}</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve & Forward
                </button>
                <button
                  onClick={() => handleReturnForClarification(selectedRequest.id)}
                  className="flex items-center justify-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Return for Clarification
                </button>
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg--to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mb-6">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex">
              <button
                onClick={() => handleTabChange('new-assets')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'new-assets'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                New Asset Requests ({newAssetRequests.length})
              </button>
              <button
                onClick={() => handleTabChange('maintenance')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'maintenance'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                Major Maintenance Requests ({maintenanceRequests.length})
              </button>
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="all">All Departments</option>
                    {getAllDepartments().map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Request List */}
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => handleViewRequest(request)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                          {request.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {request.department}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {formatCurrency(request.estimatedCost)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {request.dateSubmitted}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                        {request.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                  No requests found
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  {searchTerm || filterStatus !== 'all' || filterDepartment !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'All requests have been processed.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureReports;
