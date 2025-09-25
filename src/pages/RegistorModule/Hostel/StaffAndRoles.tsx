import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  X, 
  UserPlus,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  User,
  Crown,
  Building2
} from 'lucide-react';

const StaffAndRoles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showEditRole, setShowEditRole] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null);

  // Predefined roles with their permissions
  const roles = {
    'Chief Warden': {
      permissions: ['Full Access', 'Staff Management', 'Room Allocation', 'Financial Reports', 'System Settings'],
      color: 'purple',
      icon: Crown
    },
    'Block Warden': {
      permissions: ['Block Management', 'Room Allocation', 'Student Records', 'Maintenance Reports'],
      color: 'blue',
      icon: Building2
    },
    'Assistant Warden': {
      permissions: ['Room Allocation', 'Student Records', 'Basic Reports'],
      color: 'green',
      icon: User
    },
    'Security Officer': {
      permissions: ['Visitor Management', 'Security Reports', 'Emergency Response'],
      color: 'orange',
      icon: Shield
    },
    'Maintenance Staff': {
      permissions: ['Maintenance Reports', 'Room Inspection', 'Asset Management'],
      color: 'gray',
      icon: Settings
    }
  };

  // Sample staff data
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      designation: 'Chief Warden',
      role: 'Chief Warden',
      email: 'rajesh.kumar@college.edu',
      phone: '+91 9876543210',
      joinDate: '2020-06-15',
      assignedBlock: 'All Blocks',
      status: 'Active',
      avatar: null,
      employeeId: 'EMP001',
      shift: 'Day Shift',
      lastLogin: '2024-09-19'
    },
    {
      id: 2,
      name: 'Mrs. Priya Sharma',
      designation: 'Block Warden',
      role: 'Block Warden',
      email: 'priya.sharma@college.edu',
      phone: '+91 9876543211',
      joinDate: '2021-03-20',
      assignedBlock: 'Block B - Girls',
      status: 'Active',
      avatar: null,
      employeeId: 'EMP002',
      shift: 'Day Shift',
      lastLogin: '2024-09-18'
    },
    {
      id: 3,
      name: 'Mr. Amit Singh',
      designation: 'Assistant Warden',
      role: 'Assistant Warden',
      email: 'amit.singh@college.edu',
      phone: '+91 9876543212',
      joinDate: '2022-01-10',
      assignedBlock: 'Block A - Boys',
      status: 'Active',
      avatar: null,
      employeeId: 'EMP003',
      shift: 'Night Shift',
      lastLogin: '2024-09-17'
    },
    {
      id: 4,
      name: 'Mr. Ravi Patel',
      designation: 'Security Officer',
      role: 'Security Officer',
      email: 'ravi.patel@college.edu',
      phone: '+91 9876543213',
      joinDate: '2021-11-05',
      assignedBlock: 'Main Gate',
      status: 'On Leave',
      avatar: null,
      employeeId: 'EMP004',
      shift: 'Night Shift',
      lastLogin: '2024-09-15'
    },
    {
      id: 5,
      name: 'Ms. Sneha Gupta',
      designation: 'Assistant Warden',
      role: 'Assistant Warden',
      email: 'sneha.gupta@college.edu',
      phone: '+91 9876543214',
      joinDate: '2023-04-12',
      assignedBlock: 'Block C - Mixed',
      status: 'Active',
      avatar: null,
      employeeId: 'EMP005',
      shift: 'Day Shift',
      lastLogin: '2024-09-19'
    }
  ]);

  // Sample available staff from central database
  const [availableStaff] = useState([
    { id: 101, name: 'Dr. Vikash Tiwari', employeeId: 'EMP101' },
    { id: 102, name: 'Mrs. Kavita Jain',  employeeId: 'EMP102' },
    { id: 103, name: 'Mr. Suresh Kumar',  employeeId: 'EMP103' },
    { id: 104, name: 'Ms. Pooja Reddy', employeeId: 'EMP104' }
  ]);

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || member.role === filterRole;
    const matchesStatus = filterStatus === '' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const updateStaffRole = (staffId, newRole, newBlock, newShift) => {
    setStaff(prev => prev.map(member => 
      member.id === staffId ? { 
        ...member, 
        role: newRole,
        assignedBlock: newBlock || member.assignedBlock,
        shift: newShift || member.shift
      } : member
    ));
    setShowEditRole(false);
    setEditRoleData(null);
  };

  const StaffCard = ({ member }) => {
    const roleConfig = roles[member.role] || roles['Assistant Warden'];
    const IconComponent = roleConfig.icon;
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-slate-500 dark:text-slate-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{member.designation}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">ID: {member.employeeId}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {member.status}
                </span>
              </div>

              {/* Role Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-${roleConfig.color}-100 text-${roleConfig.color}-800 dark:bg-${roleConfig.color}-900 dark:text-${roleConfig.color}-200`}>
                  <IconComponent className="w-3 h-3" />
                  {member.role}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {member.shift}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Phone className="w-3 h-3" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{member.assignedBlock}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Joined</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{member.joinDate}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Last Login</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{member.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col gap-2 sm:items-end">
            <button
              onClick={() => setSelectedStaff(member)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View</span>
            </button>
            <button
              onClick={() => {
                setEditRoleData(member);
                setShowEditRole(true);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Role</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditRoleModal = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [assignedBlock, setAssignedBlock] = useState('');
    const [shift, setShift] = useState('');

    // Initialize form data when modal opens
    useEffect(() => {
      if (editRoleData) {
        setSelectedRole(editRoleData.role);
        setAssignedBlock(editRoleData.assignedBlock);
        setShift(editRoleData.shift);
      }
    }, [editRoleData]);

    const handleUpdateRole = () => {
      if (editRoleData && selectedRole) {
        updateStaffRole(editRoleData.id, selectedRole, assignedBlock, shift);
      }
    };

    if (!showEditRole || !editRoleData) return null;

    const currentRoleConfig = roles[editRoleData.role] || roles['Assistant Warden'];
    const selectedRoleConfig = roles[selectedRole] || roles['Assistant Warden'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Staff Role</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                  Update role and permissions for {editRoleData.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowEditRole(false);
                  setEditRoleData(null);
                }}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staff Info */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{editRoleData.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{editRoleData.designation} - {editRoleData.employeeId}</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-2">
                    <currentRoleConfig.icon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Current: {editRoleData.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-4">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Select New Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    {Object.keys(roles).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Block Assignment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Assigned Block/Area
                  </label>
                  <select
                    value={assignedBlock}
                    onChange={(e) => setAssignedBlock(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select block/area...</option>
                    <option value="Block A - Boys">Block A - Boys</option>
                    <option value="Block B - Girls">Block B - Girls</option>
                    <option value="Block C - Mixed">Block C - Mixed</option>
                    <option value="Block D - PG">Block D - PG</option>
                    <option value="Block E - Faculty">Block E - Faculty</option>
                    <option value="All Blocks">All Blocks</option>
                    <option value="Main Gate">Main Gate</option>
                  </select>
                </div>

                {/* Shift Assignment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Shift Assignment
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select shift...</option>
                    <option value="Day Shift">Day Shift (6 AM - 6 PM)</option>
                    <option value="Night Shift">Night Shift (6 PM - 6 AM)</option>
                    <option value="Full Time">Full Time</option>
                  </select>
                </div>
              </div>

              {/* Right Column - Role Details */}
              <div>
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Role Details & Permissions</h4>
                
                {/* Current Role */}
                <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <currentRoleConfig.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Role: {editRoleData.role}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {currentRoleConfig.permissions.map(permission => (
                      <span key={permission} className="px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                {/* New Role Preview */}
                {selectedRole && selectedRole !== editRoleData.role && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <selectedRoleConfig.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">New Role: {selectedRole}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedRoleConfig.permissions.map(permission => (
                        <span key={permission} className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Changes Summary */}
                {(selectedRole !== editRoleData.role || assignedBlock !== editRoleData.assignedBlock || shift !== editRoleData.shift) && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Changes to be applied:</h5>
                    <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
                      {selectedRole !== editRoleData.role && (
                        <li>• Role: {editRoleData.role} → {selectedRole}</li>
                      )}
                      {assignedBlock !== editRoleData.assignedBlock && (
                        <li>• Block: {editRoleData.assignedBlock} → {assignedBlock}</li>
                      )}
                      {shift !== editRoleData.shift && (
                        <li>• Shift: {editRoleData.shift} → {shift}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => {
                  setShowEditRole(false);
                  setEditRoleData(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                disabled={!selectedRole || !assignedBlock || !shift}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddStaffModal = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [assignedBlock, setAssignedBlock] = useState('');
    const [shift, setShift] = useState('');

    const handleAddStaff = () => {
      if (selectedEmployee && selectedRole) {
        const employee = availableStaff.find(emp => emp.id.toString() === selectedEmployee);
        if (employee) {
          const newStaffMember = {
            id: Math.max(...staff.map(s => s.id)) + 1,
            name: employee.name,
            designation: employee.designation,
            role: selectedRole,
            email: `${employee.name.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
            phone: '+91 9876543200',
            joinDate: new Date().toISOString().split('T')[0],
            assignedBlock: assignedBlock,
            status: 'Active',
            avatar: null,
            employeeId: employee.employeeId,
            shift: shift,
            lastLogin: 'Never'
          };
          setStaff(prev => [...prev, newStaffMember]);
          setShowAddStaff(false);
          setSelectedEmployee('');
          setSelectedRole('');
          setAssignedBlock('');
          setShift('');
        }
      }
    };

    if (!showAddStaff) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add Staff Member</h2>
              <button
                onClick={() => setShowAddStaff(false)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Select Employee */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Employee from Database
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Choose an employee...</option>
                  {availableStaff.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.designation} ({emp.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Assign Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Assign Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select a role...</option>
                  {Object.keys(roles).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Assigned Block */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Assigned Block/Area
                </label>
                <select
                  value={assignedBlock}
                  onChange={(e) => setAssignedBlock(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select block/area...</option>
                  <option value="Block A - Boys">Block A - Boys</option>
                  <option value="Block B - Girls">Block B - Girls</option>
                  <option value="Block C - Mixed">Block C - Mixed</option>
                  <option value="Block D - PG">Block D - PG</option>
                  <option value="Block E - Faculty">Block E - Faculty</option>
                  <option value="All Blocks">All Blocks</option>
                  <option value="Main Gate">Main Gate</option>
                </select>
              </div>

              {/* Shift */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Shift Assignment
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select shift...</option>
                  <option value="Day Shift">Day Shift (6 AM - 6 PM)</option>
                  <option value="Night Shift">Night Shift (6 PM - 6 AM)</option>
                  <option value="Full Time">Full Time</option>
                </select>
              </div>

              {/* Role Permissions Preview */}
              {selectedRole && (
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                    Permissions for {selectedRole}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {roles[selectedRole].permissions.map(permission => (
                      <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setShowAddStaff(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStaff}
                disabled={!selectedEmployee || !selectedRole || !assignedBlock || !shift}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StaffDetailModal = () => {
    if (!selectedStaff) return null;

    const roleConfig = roles[selectedStaff.role] || roles['Assistant Warden'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Staff Details</h2>
              <button
                onClick={() => setSelectedStaff(null)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-slate-500 dark:text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedStaff.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">{selectedStaff.designation}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Employee ID: {selectedStaff.employeeId}</p>
              </div>

              {/* Contact & Assignment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">{selectedStaff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">{selectedStaff.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-3">Assignment Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">{selectedStaff.assignedBlock}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">{selectedStaff.shift}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300">Joined: {selectedStaff.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role & Permissions */}
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Role & Permissions</h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <roleConfig.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <span className="font-medium text-slate-900 dark:text-white">{selectedStaff.role}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roleConfig.permissions.map(permission => (
                      <span key={permission} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status & Activity */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                  <p className={`font-medium ${selectedStaff.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    {selectedStaff.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Last Login</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedStaff.lastLogin}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSelectedStaff(null)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditRoleData(selectedStaff);
                  setShowEditRole(true);
                  setSelectedStaff(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Role
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Staff & Roles</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage hostel staff, assign roles, and configure permissions
              </p>
            </div>
            <button
              onClick={() => setShowAddStaff(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Staff</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{staff.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Active Staff</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {staff.filter(s => s.status === 'Active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {staff.filter(s => s.status === 'On Leave').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Roles Defined</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Object.keys(roles).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search staff by name, designation, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">All Roles</option>
                {Object.keys(roles).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="sm:w-32">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Staff List */}
        <div className="space-y-4">
          {filteredStaff.length > 0 ? (
            filteredStaff.map(member => (
              <StaffCard key={member.id} member={member} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-12 text-center">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No staff members found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {searchTerm || filterRole || filterStatus 
                  ? 'No staff members match your search criteria.' 
                  : 'Get started by adding your first staff member.'}
              </p>
              <button
                onClick={() => setShowAddStaff(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Add Staff Member
              </button>
            </div>
          )}
        </div>

        {/* Role Definitions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Role Definitions & Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(roles).map(([roleName, roleConfig]) => {
              const IconComponent = roleConfig.icon;
              return (
                <div key={roleName} className={`p-4 border border-${roleConfig.color}-200 dark:border-${roleConfig.color}-700 rounded-lg bg-${roleConfig.color}-50/50 dark:bg-${roleConfig.color}-900/10`}>
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className={`w-5 h-5 text-${roleConfig.color}-600 dark:text-${roleConfig.color}-400`} />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{roleName}</h3>
                    <span className={`ml-auto px-2 py-1 text-xs rounded-full bg-${roleConfig.color}-100 text-${roleConfig.color}-800 dark:bg-${roleConfig.color}-900 dark:text-${roleConfig.color}-200`}>
                      {staff.filter(s => s.role === roleName).length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {roleConfig.permissions.map(permission => (
                      <div key={permission} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <div className={`w-1.5 h-1.5 bg-${roleConfig.color}-500 rounded-full`}></div>
                        {permission}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddStaffModal />
      <StaffDetailModal />
      <EditRoleModal />
    </div>
  );
};

export default StaffAndRoles;