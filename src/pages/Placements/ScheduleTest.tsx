import React, { useState } from 'react';
import { 
  CalendarDaysIcon,
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

const ScheduleTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedView, setSelectedView] = useState('list');
const navigate = useNavigate();

  // Form state for new test
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Aptitude',
    duration: '',
    date: '',
    time: '',
    venue: '',
    cgpaCutoff: '',
    description: '',
    instructions: '',
    departments: []
  });

  const [scheduledTests, setScheduledTests] = useState([
    {
      id: 1,
      title: 'TCS Aptitude Test',
      company: 'Tata Consultancy Services',
      type: 'Aptitude',
      date: '2025-09-15',
      time: '10:00 AM',
      duration: 60,
      venue: 'Computer Lab 1',
      eligibleStudents: 145,
      registeredStudents: 98,
      status: 'upcoming',
      coordinator: 'Prof. Sharma',
      description: 'Pre-placement aptitude test for TCS campus drive',
      instructions: 'Bring valid ID, No mobile phones allowed',
      cutoffCGPA: 7.0
    },
    {
      id: 2,
      title: 'Infosys Technical Assessment',
      company: 'Infosys Technologies',
      type: 'Technical',
      date: '2025-09-18',
      time: '02:00 PM',
      duration: 90,
      venue: 'Online Platform',
      eligibleStudents: 89,
      registeredStudents: 67,
      status: 'upcoming',
      coordinator: 'Dr. Patel',
      description: 'Technical assessment covering programming and system design',
      instructions: 'Stable internet required, Webcam mandatory',
      cutoffCGPA: 7.5
    },
    {
      id: 3,
      title: 'Mock Placement Test',
      company: 'Internal',
      type: 'Mock Test',
      date: '2025-09-05',
      time: '09:30 AM',
      duration: 120,
      venue: 'Auditorium',
      eligibleStudents: 234,
      registeredStudents: 189,
      status: 'completed',
      coordinator: 'Placement Cell',
      description: 'Practice test to prepare for upcoming placement drives',
      instructions: 'General placement preparation test',
      cutoffCGPA: 6.0
    },
    {
      id: 4,
      title: 'Wipro Communication Test',
      company: 'Wipro Limited',
      type: 'Communication',
      date: '2025-09-22',
      time: '11:00 AM',
      duration: 45,
      venue: 'Seminar Hall 2',
      eligibleStudents: 67,
      registeredStudents: 45,
      status: 'scheduled',
      coordinator: 'Ms. Singh',
      description: 'English communication and soft skills assessment',
      instructions: 'Presentation skills will be evaluated',
      cutoffCGPA: 6.5
    }
  ]);

  const stats = [
    { name: 'Scheduled Tests', value: scheduledTests.length.toString(), icon: CalendarDaysIcon, color: 'bg-blue-500' },
    { name: 'Total Registrations', value: '567', icon: UserGroupIcon, color: 'bg-green-500' },
    { name: 'Partner Companies', value: '15', icon: BuildingOfficeIcon, color: 'bg-purple-500' },
    { name: 'Completed Tests', value: '23', icon: AcademicCapIcon, color: 'bg-yellow-500' }
  ];

  const upcomingToday = scheduledTests.filter(test => 
    test.date === new Date().toISOString().split('T')[0] && test.status === 'upcoming'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Aptitude': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-green-100 text-green-800';
      case 'Communication': return 'bg-purple-100 text-purple-800';
      case 'Mock Test': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTests = scheduledTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || test.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      departments: checked 
        ? [...prev.departments, department]
        : prev.departments.filter(d => d !== department)
    }));
  };

  // Handle test scheduling
  const handleScheduleTest = () => {
    if (!formData.title || !formData.company || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newTest = {
      id: Math.max(...scheduledTests.map(t => t.id)) + 1,
      title: formData.title,
      company: formData.company,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration) || 60,
      venue: formData.venue || 'TBD',
      eligibleStudents: Math.floor(Math.random() * 100) + 50, // Random for demo
      registeredStudents: 0,
      status: 'upcoming',
      coordinator: 'Placement Cell', // Default
      description: formData.description || 'Test scheduled via system',
      instructions: formData.instructions || 'General test instructions',
      cutoffCGPA: parseFloat(formData.cgpaCutoff) || 6.0
    };

    setScheduledTests(prev => [...prev, newTest]);
    setShowScheduleModal(false);
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      type: 'Aptitude',
      duration: '',
      date: '',
      time: '',
      venue: '',
      cgpaCutoff: '',
      description: '',
      instructions: '',
      departments: []
    });

    alert('Test scheduled successfully!');
  };

  // Handle navigation to registrations page
const handleViewRegistrations = (testId: number) => {
  navigate(`/placements/placement-Companies/driver-registration`);
};

  // Handle Excel download
  const handleDownloadList = (test: any) => {
    // Create dummy Excel data
    const dummyData = [
      ['Student Name', 'Roll Number', 'Department', 'CGPA', 'Registration Date', 'Status'],
      ['John Doe', 'CS001', 'Computer Science', '8.5', '2025-09-01', 'Registered'],
      ['Jane Smith', 'IT002', 'Information Technology', '7.8', '2025-09-02', 'Registered'],
      ['Mike Johnson', 'EC003', 'Electronics', '8.2', '2025-09-02', 'Registered'],
      ['Sarah Wilson', 'CS004', 'Computer Science', '9.1', '2025-09-03', 'Registered'],
      ['David Brown', 'ME005', 'Mechanical', '7.6', '2025-09-03', 'Registered']
    ];

    // Convert to CSV format
    const csvContent = dummyData.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${test.title.replace(/\s+/g, '_')}_registrations.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Schedule Tests</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setSelectedView(selectedView === 'list' ? 'calendar' : 'list')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            {selectedView === 'list' ? 'Calendar View' : 'List View'}
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Schedule Test</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Tests Alert */}
      {upcomingToday.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 text-blue-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Tests Scheduled for Today</h3>
              <div className="mt-1 text-sm text-blue-700">
                {upcomingToday.map(test => test.title).join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option>All Companies</option>
            <option>TCS</option>
            <option>Infosys</option>
            <option>Wipro</option>
            <option>Internal</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option>All Types</option>
            <option>Aptitude</option>
            <option>Technical</option>
            <option>Communication</option>
            <option>Mock Test</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'upcoming', label: 'Upcoming Tests' },
              { key: 'scheduled', label: 'Scheduled' },
              { key: 'completed', label: 'Completed' },
              { key: 'all', label: 'All Tests' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedView === 'list' ? (
            <div className="space-y-6">
              {filteredTests.map((test) => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                          {test.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(test.type)}`}>
                          {test.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                          {test.company}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CalendarDaysIcon className="w-4 h-4 mr-2" />
                          {test.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          {test.time} ({test.duration} min)
                        </div>
                        <div className="flex items-center text-gray-600">
                          <UserGroupIcon className="w-4 h-4 mr-2" />
                          {test.registeredStudents}/{test.eligibleStudents}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{test.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-medium">Venue:</span> {test.venue}
                        </div>
                        <div>
                          <span className="font-medium">Coordinator:</span> {test.coordinator}
                        </div>
                        <div>
                          <span className="font-medium">CGPA Cutoff:</span> {test.cutoffCGPA}
                        </div>
                        <div>
                          <span className="font-medium">Registration:</span> {
                            Math.round((test.registeredStudents / test.eligibleStudents) * 100)
                          }% filled
                        </div>
                      </div>

                      {test.instructions && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                          <p className="text-sm text-yellow-700">
                            <span className="font-medium">Instructions:</span> {test.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* <div className="flex flex-col space-y-2 ml-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded" title="Edit">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Cancel">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div> */}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-4 text-sm">
                      <button 
                        onClick={() => handleViewRegistrations(test.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Registrations
                      </button>
                      {/* <button className="text-green-600 hover:text-green-800 font-medium">
                        Send Reminder
                      </button> */}
                      <button 
                        onClick={() => handleDownloadList(test)}
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        Download List
                      </button>
                    </div>
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(test.registeredStudents / test.eligibleStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <CalendarDaysIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">Calendar View</p>
                <p className="text-sm text-gray-500">Interactive calendar will be displayed here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Test Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Schedule New Test</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter test title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <select 
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Company</option>
                    <option value="TCS">TCS</option>
                    <option value="Infosys">Infosys</option>
                    <option value="Wipro">Wipro</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Aptitude">Aptitude</option>
                    <option value="Technical">Technical</option>
                    <option value="Communication">Communication</option>
                    <option value="Mock Test">Mock Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Computer Lab 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.cgpaCutoff}
                    onChange={(e) => handleInputChange('cgpaCutoff', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="7.0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Test description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  rows={2}
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Special instructions for students..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligible Departments</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Computer Science', 'Information Technology', 'Electronics', 'Mechanical'].map(dept => (
                    <label key={dept} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.departments.includes(dept)}
                        onChange={(e) => handleDepartmentChange(dept, e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="ml-2 text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-4">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleScheduleTest}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Schedule Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTest;