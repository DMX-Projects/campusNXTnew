import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Edit3, Trash2, Search, Filter, Eye, Save, X } from 'lucide-react';

export const HolidayManager = () => {
  const [holidays, setHolidays] = useState([
    { id: 1, code: 'AC_2425', year: '2024-2025', date: '2024-01-14', name: 'Sankrant', description: 'Traditional Hindu harvest festival', active: true },
    { id: 2, code: 'AC_2425', year: '2024-2025', date: '2024-01-26', name: 'Republic Day', description: 'National holiday celebrating the Constitution of India', active: true },
    { id: 3, code: 'AC_2425', year: '2024-2025', date: '2024-03-08', name: 'Maha Shivratri', description: 'Hindu festival dedicated to Lord Shiva', active: true },
    { id: 4, code: 'AC_2425', year: '2024-2025', date: '2024-03-25', name: 'Holi', description: 'Festival of colors', active: true },
    { id: 5, code: 'AC_2425', year: '2024-2025', date: '2024-04-09', name: 'Ugadi', description: 'Telugu and Kannada New Year', active: true },
    { id: 6, code: 'AC_2425', year: '2024-2025', date: '2024-05-29', name: 'Good Friday', description: 'Christian holiday commemorating the crucifixion of Jesus', active: true },
    { id: 7, code: 'AC_2425', year: '2024-2025', date: '2024-04-10', name: 'Ramzan Eid-ul-Fitr', description: 'Islamic festival marking the end of Ramadan', active: true },
    { id: 8, code: 'AC_2425', year: '2024-2025', date: '2024-04-14', name: 'Ambedkar Jayanti', description: 'Birthday of Dr. B.R. Ambedkar', active: true },
    { id: 9, code: 'AC_2425', year: '2024-2025', date: '2024-06-02', name: 'Telangana Formation Day', description: 'State formation day celebration', active: true },
    { id: 10, code: 'AC_2425', year: '2024-2025', date: '2024-06-17', name: 'Bakrid Eid-ul-Adha', description: 'Islamic festival of sacrifice', active: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const [formData, setFormData] = useState({
    code: 'AC_2425',
    year: '2024-2025',
    date: '',
    name: '',
    description: '',
    active: true
  });

  const years = [...new Set(holidays.map(h => h.year))];

  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = !filterYear || holiday.year === filterYear;
      const matchesActive = filterActive === 'all' || 
                          (filterActive === 'active' && holiday.active) ||
                          (filterActive === 'inactive' && !holiday.active);
      
      return matchesSearch && matchesYear && matchesActive;
    });
  }, [holidays, searchTerm, filterYear, filterActive]);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.date || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingHoliday) {
      setHolidays(holidays.map(h => 
        h.id === editingHoliday.id ? { ...formData, id: editingHoliday.id } : h
      ));
      setEditingHoliday(null);
    } else {
      const newHoliday = {
        ...formData,
        id: Math.max(...holidays.map(h => h.id)) + 1
      };
      setHolidays([...holidays, newHoliday]);
    }
    
    setShowAddModal(false);
    setFormData({
      code: 'AC_2425',
      year: '2024-2025',
      date: '',
      name: '',
      description: '',
      active: true
    });
  };

  const handleEdit = (holiday) => {
    setEditingHoliday(holiday);
    setFormData(holiday);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      setHolidays(holidays.filter(h => h.id !== id));
    }
  };

  const toggleActive = (id) => {
    setHolidays(holidays.map(h => 
      h.id === id ? { ...h, active: !h.active } : h
    ));
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingHoliday(null);
    setFormData({
      code: 'AC_2425',
      year: '2024-2025',
      date: '',
      name: '',
      description: '',
      active: true
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Holiday Management</h1>
          </div>
          <p className="text-gray-600">Manage academic calendar holidays and events</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={filterActive}
                  onChange={(e) => setFilterActive(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Holiday
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredHolidays.length} of {holidays.length} holidays
          </p>
        </div>

        {/* Content */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Calendar Code</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Academic Year</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Holiday</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHolidays.map((holiday) => (
                    <tr key={holiday.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {holiday.code}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{holiday.year}</td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{formatDate(holiday.date)}</div>
                          <div className="text-gray-500">{new Date(holiday.date).toLocaleDateString('en-IN', { weekday: 'long' })}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{holiday.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 max-w-xs truncate" title={holiday.description}>
                          {holiday.description}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleActive(holiday.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            holiday.active 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {holiday.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(holiday)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(holiday.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredHolidays.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No holidays found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHolidays.map((holiday) => (
              <div key={holiday.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{holiday.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        holiday.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {holiday.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{holiday.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(holiday.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Year:</span>
                    <span className="font-medium text-gray-900">{holiday.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Code:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{holiday.code}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleActive(holiday.id)}
                    className={`text-sm font-medium transition-colors ${
                      holiday.active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                    }`}
                  >
                    {holiday.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(holiday)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(holiday.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredHolidays.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No holidays found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingHoliday ? 'Edit Holiday' : 'Add New Holiday'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calendar Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2024-2025"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holiday Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holiday Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter holiday name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter holiday description"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Active Holiday
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {editingHoliday ? 'Update' : 'Add'} Holiday
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
