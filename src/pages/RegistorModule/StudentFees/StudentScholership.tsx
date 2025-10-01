 // RegistrarScholarship.tsx
// Tailwind: darkMode: 'class'; Icons: npm i lucide-react
// Add/Edit modal uses free-text for Type and Category (no dropdowns). Filters auto-include newly typed values.

import React, { useMemo, useState } from 'react';
import { Plus, Search, Edit3, Trash2, X, Settings, Award, Percent } from 'lucide-react';

const RegistrarScholarship = () => {
  const [types, setTypes] = useState(['Merit', 'Need', 'Government', 'Private']);
  const [schemes, setSchemes] = useState([
    { id: 1, name: 'Merit Scholarship', type: 'Merit', category: 'General', reduction: 50, deadline: '2025-12-31', status: 'Active', description: 'Merit-based scholarship for high performers' },
    { id: 2, name: 'SC/ST Support', type: 'Government', category: 'SC', reduction: 75, deadline: '2025-11-30', status: 'Active', description: 'Government-funded support for SC/ST students' },
    { id: 3, name: 'OBC Welfare', type: 'Government', category: 'OBC', reduction: 60, deadline: '2025-10-15', status: 'Active', description: 'Fee reduction for OBC category students' }
  ]);

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [newType, setNewType] = useState('');
  const [form, setForm] = useState({
    name: '',
    type: '',
    category: '',
    reduction: 50,
    deadline: '',
    status: 'Active',
    description: ''
  });

  // Derived filter options: include any values typed in saved schemes
  const derivedTypes = useMemo(() => Array.from(new Set([...types, ...schemes.map(s => s.type)])), [types, schemes]);
  const derivedCategories = useMemo(
    () => Array.from(new Set([...schemes.map(s => s.category), 'General', 'OBC', 'SC', 'ST', 'EWS'])),
    [schemes]
  );

  const filtered = useMemo(() => {
    return schemes.filter(s => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterCat || s.category === filterCat;
      const matchType = !filterType || s.type === filterType;
      return matchName && matchCat && matchType;
    });
  }, [schemes, search, filterCat, filterType]);

  const stats = useMemo(
    () => ({
      total: schemes.length,
      active: schemes.filter(s => s.status === 'Active').length,
      avgReduction: schemes.length ? Math.round(schemes.reduce((a, s) => a + s.reduction, 0) / schemes.length) : 0
    }),
    [schemes]
  );

  const openCreate = () => {
    setEditId(null);
    setForm({ name: '', type: '', category: '', reduction: 50, deadline: '', status: 'Active', description: '' });
    setShowModal(true);
  };

  const openEdit = (s: any) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      type: s.type,
      category: s.category,
      reduction: s.reduction,
      deadline: s.deadline,
      status: s.status,
      description: s.description
    });
    setShowModal(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.deadline.trim()) return alert('Name and deadline are required');
    if (!form.type.trim()) return alert('Type is required (enter any custom label)');
    if (!form.category.trim()) return alert('Category is required (enter any custom label)');
    if (form.reduction < 1 || form.reduction > 100) return alert('Reduction must be 1-100%');

    if (editId) {
      setSchemes(prev => prev.map(s => (s.id === editId ? { ...form, id: editId } : s)));
    } else {
      setSchemes(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const remove = (id: number) => {
    if (confirm('Delete this scholarship?')) setSchemes(prev => prev.filter(s => s.id !== id));
  };

  const addType = () => {
    const t = newType.trim();
    if (t && !types.includes(t)) setTypes(prev => [...prev, t]);
    setNewType('');
  };

  const removeType = (t: string) => setTypes(prev => prev.filter(x => x !== t));

  const categoryColors: Record<string, string> = {
    General: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    OBC: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
    SC: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
    ST: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200',
    EWS: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="text-indigo-600 dark:text-indigo-400" size={32} />
              Scholarship Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage fee reduction scholarships</p>
          </div>
          <div className="flex gap-3">
            
            <button
              onClick={openCreate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 flex items-center gap-2 shadow-sm"
            >
              <Plus size={18} /> Add Scholarship
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Schemes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Award className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Schemes</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Award className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Reduction</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.avgReduction}%</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Percent className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Search scholarships..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">All Types</option>
              {derivedTypes.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">All Categories</option>
              {derivedCategories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(s => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[s.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {s.category}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {s.type}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    s.status === 'Active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {s.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fee Reduction</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{s.reduction}%</span>
                </div>

                <div className="text-sm space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Deadline:</span>{' '}
                    {new Date(s.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {s.description && <p className="text-gray-600 dark:text-gray-400 mt-2">{s.description}</p>}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => openEdit(s)}
                  className="flex-1 py-2 border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center justify-center gap-1 font-medium"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => remove(s.id)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-1 font-medium"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-sm text-center border border-gray-200 dark:border-gray-700 mt-6">
            <Award className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600 dark:text-gray-400">No scholarships found</p>
          </div>
        )}
      </div>

      {/* Scholarship Modal (Type & Category = free text) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editId ? 'Edit' : 'Create'} Scholarship</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scholarship Name *</label>
                <input
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Merit Scholarship"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                  <input
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Type (e.g., Merit, Need, Govt, Private, Category, Corporate)"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                  <input
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Category (e.g., General, OBC, SC, ST, EWS, Gen)"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reduction % *</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={form.reduction}
                    onChange={e => setForm({ ...form, reduction: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline *</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={form.deadline}
                    onChange={e => setForm({ ...form, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows={3}
                  placeholder="Brief description..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Save Scholarship
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Type Management Modal (optional, for top filter options) */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Scholarship Types</h2>
              <button
                onClick={() => setShowTypeModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Add new type..."
                  value={newType}
                  onChange={e => setNewType(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addType()}
                />
                <button onClick={addType} className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  Add
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Types:</p>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center gap-2">
                      {t}
                      <button onClick={() => removeType(t)} className="text-red-500 hover:text-red-600">
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTypeModal(false)}
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarScholarship;
