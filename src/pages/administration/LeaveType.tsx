import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Filter } from 'lucide-react';

const LeaveTypesManagement = () => {
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, leaveType: 'Sick Leave', maxDays: 12, role: 'Student' },
    { id: 2, leaveType: 'Casual Leave', maxDays: 15, role: 'Student' },
    { id: 3, leaveType: 'On Duty (OD)', maxDays: 30, role: 'Student' },
    { id: 4, leaveType: 'Special Leave', maxDays: 7, role: 'Student' },
    { id: 5, leaveType: 'Sick Leave', maxDays: 20, role: 'Faculty' },
    { id: 6, leaveType: 'Casual Leave', maxDays: 25, role: 'Faculty' },
    { id: 7, leaveType: 'On Duty (OD)', maxDays: 60, role: 'Faculty' },
    { id: 8, leaveType: 'Special Leave', maxDays: 14, role: 'Faculty' }
  ]);

  const [filters, setFilters] = useState({
    leaveType: 'All Leave Types',
    role: 'All Roles'
  });

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    leaveType: '',
    maxDays: '',
    role: 'Student'
  });

  const leaveTypeOptions = ['Sick Leave', 'Casual Leave', 'On Duty (OD)', 'Special Leave'];
  const roleOptions = ['Student', 'Faculty'];

  // Filter data based on selected filters
  const filteredData = leaveTypes.filter(item => {
    const matchesLeaveType = filters.leaveType === 'All Leave Types' || item.leaveType === filters.leaveType;
    const matchesRole = filters.role === 'All Roles' || item.role === filters.role;
    return matchesLeaveType && matchesRole;
  });

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({ leaveType: '', maxDays: '', role: 'Student' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ 
      leaveType: item.leaveType, 
      maxDays: item.maxDays.toString(), 
      role: item.role 
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave type?')) {
      setLeaveTypes(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.leaveType || !formData.maxDays) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingItem) {
      // Update existing item
      setLeaveTypes(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, leaveType: formData.leaveType, maxDays: parseInt(formData.maxDays), role: formData.role }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...leaveTypes.map(item => item.id), 0) + 1,
        leaveType: formData.leaveType,
        maxDays: parseInt(formData.maxDays),
        role: formData.role
      };
      setLeaveTypes(prev => [...prev, newItem]);
    }

    setShowModal(false);
    setFormData({ leaveType: '', maxDays: '', role: 'Student' });
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({ leaveType: '', maxDays: '', role: 'Student' });
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Leave Types Management</h1>
             
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filters:</span>
            
            <select
              value={filters.leaveType}
              onChange={(e) => setFilters(prev => ({ ...prev, leaveType: e.target.value }))}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Leave Types</option>
              {leaveTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Roles</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Leave Type
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">LEAVE TYPE</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">MAXIMUM DAYS</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">ROLE</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-500">
                      No leave types found matching the current filters
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-4 px-6 text-gray-800 font-medium">{item.leaveType}</td>
                      <td className="py-4 px-6">
                        <span className="text-green-600 font-semibold">{item.maxDays} days</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.role === 'Student' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:text-blue-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {leaveTypes.length} leave types
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingItem ? 'Edit Leave Type' : 'Add New Leave Type'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type *
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                    className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Maximum Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Days of Leave *
                  </label>
                  <input
                    type="number"
                    value={formData.maxDays}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxDays: e.target.value }))}
                    className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter maximum days"
                    min="1"
                    max="365"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypesManagement;