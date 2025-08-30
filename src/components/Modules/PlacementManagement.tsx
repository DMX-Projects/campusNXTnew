import React, { useState } from 'react';
import { Plus, Calendar, Building, Users, TrendingUp, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { DataTable, Modal, DynamicForm } from '../Common/FormComponents';
import { FORM_CONFIGS } from '../../data/formConfigs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PlacementManagement: React.FC = () => {
  const [drives, setDrives] = useState([
    { id: 'PD001', companyName: 'TechCorp Solutions', position: 'Software Engineer', packageMin: 800000, packageMax: 1200000, driveDate: '2025-02-15', registrationDeadline: '2025-02-10', venue: 'Auditorium', status: 'Open', registered: 45, eligible: 78 },
    { id: 'PD002', companyName: 'Innovation Labs', position: 'Full Stack Developer', packageMin: 700000, packageMax: 1000000, driveDate: '2025-02-20', registrationDeadline: '2025-02-15', venue: 'Conference Hall', status: 'Upcoming', registered: 32, eligible: 65 }
  ]);

  const [placements, setPlacements] = useState([
    { id: 'PL001', studentId: 'CS2023001', studentName: 'Alex Wilson', company: 'TechCorp Solutions', position: 'Software Engineer', package: 850000, joiningDate: '2025-07-01', status: 'Placed' },
    { id: 'PL002', studentId: 'CS2023002', studentName: 'Emma Johnson', company: 'Innovation Labs', position: 'Frontend Developer', package: 750000, joiningDate: '2025-06-15', status: 'Placed' }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'drives', name: 'Placement Drives', icon: Building },
    { id: 'students', name: 'Student Database', icon: Users },
    { id: 'companies', name: 'Company Relations', icon: Building },
    { id: 'training', name: 'Training Programs', icon: Users },
    { id: 'reports', name: 'Analytics & Reports', icon: Download }
  ];

  const driveColumns = [
    { key: 'id', label: 'Drive ID', sortable: true },
    { key: 'companyName', label: 'Company', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { 
      key: 'package', 
      label: 'Package', 
      render: (value: any, item: any) => `₹${(item.packageMin / 100000).toFixed(1)}L - ₹${(item.packageMax / 100000).toFixed(1)}L`
    },
    { key: 'driveDate', label: 'Drive Date', sortable: true },
    { 
      key: 'registration', 
      label: 'Registration', 
      render: (value: any, item: any) => `${item.registered}/${item.eligible}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
          value === 'Completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const placementColumns = [
    { key: 'studentId', label: 'Student ID', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { 
      key: 'package', 
      label: 'Package', 
      sortable: true,
      render: (value: number) => `₹${(value / 100000).toFixed(1)}L`
    },
    { key: 'joiningDate', label: 'Joining Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Placed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
          value === 'Offer Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleAddDrive = (driveData: any) => {
    const newDrive = {
      ...driveData,
      id: `PD${String(drives.length + 1).padStart(3, '0')}`,
      status: 'Open',
      registered: 0,
      eligible: 50 // Mock eligible count
    };
    setDrives(prev => [...prev, newDrive]);
    setShowAddDriveModal(false);
  };

  const placementTrends = [
    { year: '2020', placements: 245, avgPackage: 5.8 },
    { year: '2021', placements: 267, avgPackage: 6.2 },
    { year: '2022', placements: 289, avgPackage: 6.8 },
    { year: '2023', placements: 312, avgPackage: 7.2 },
    { year: '2024', placements: 287, avgPackage: 7.2 }
  ];

  const companyTypes = [
    { type: 'IT Services', count: 18, color: '#3B82F6' },
    { type: 'Product Companies', count: 12, color: '#10B981' },
    { type: 'Startups', count: 8, color: '#F59E0B' },
    { type: 'Consulting', count: 5, color: '#EF4444' },
    { type: 'Others', count: 2, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Placement Management System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive placement drive management and student career services
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddDriveModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Drive</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Active Drives</p>
                      <p className="text-3xl font-bold">{drives.filter(d => d.status === 'Open').length}</p>
                    </div>
                    <Building className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Students Placed</p>
                      <p className="text-3xl font-bold">{placements.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Avg Package</p>
                      <p className="text-3xl font-bold">₹{(placements.reduce((sum, p) => sum + p.package, 0) / placements.length / 100000).toFixed(1)}L</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Placement Rate</p>
                      <p className="text-3xl font-bold">94%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">5-Year Placement Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={placementTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line type="monotone" dataKey="placements" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
                      <Line type="monotone" dataKey="avgPackage" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Company Types</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={companyTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="count"
                        label={({ type, count }) => `${type}: ${count}`}
                      >
                        {companyTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drives' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Placement Drives</h3>
                <button
                  onClick={() => setShowAddDriveModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule New Drive</span>
                </button>
              </div>
              
              <DataTable
                data={drives}
                columns={driveColumns}
                onEdit={(drive) => console.log('Edit drive:', drive)}
                onDelete={(drive) => {
                  if (window.confirm(`Are you sure you want to delete ${drive.companyName} drive?`)) {
                    setDrives(prev => prev.filter(d => d.id !== drive.id));
                  }
                }}
                onView={(drive) => console.log('View drive:', drive)}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Placed Students Database</h3>
              
              <DataTable
                data={placements}
                columns={placementColumns}
                searchable={true}
                exportable={true}
              />
            </div>
          )}

          {activeTab === 'training' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Training Programs</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { program: 'Aptitude Training', enrolled: 245, completed: 198, progress: 81 },
                  { program: 'Technical Skills', enrolled: 189, completed: 156, progress: 83 },
                  { program: 'Communication Skills', enrolled: 267, completed: 234, progress: 88 },
                  { program: 'Interview Preparation', enrolled: 156, completed: 142, progress: 91 },
                  { program: 'Resume Building', enrolled: 298, completed: 276, progress: 93 },
                  { program: 'Group Discussion', enrolled: 178, completed: 165, progress: 93 }
                ].map((training, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{training.program}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Enrolled</span>
                        <span className="font-medium text-gray-900 dark:text-white">{training.enrolled}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Completed</span>
                        <span className="font-medium text-gray-900 dark:text-white">{training.completed}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">{training.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${training.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Drive Modal */}
      <Modal isOpen={showAddDriveModal} onClose={() => setShowAddDriveModal(false)}>
        <DynamicForm
          config={FORM_CONFIGS.ADD_PLACEMENT_DRIVE}
          onSubmit={handleAddDrive}
          onCancel={() => setShowAddDriveModal(false)}
        />
      </Modal>
    </div>
  );
};

export default PlacementManagement;