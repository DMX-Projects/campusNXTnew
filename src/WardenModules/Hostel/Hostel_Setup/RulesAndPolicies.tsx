// src/components/hostel/RulesAndPolicies.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Rule {
  id: number;
  title: string;
  description: string;
  category: 'Conduct' | 'Safety' | 'Maintenance' | 'Guests';
  status: 'Active' | 'Archived';
}

const initialRulesData: Rule[] = [
  { id: 1, title: 'Noise Regulations', description: 'Quiet hours are strictly enforced from 10:00 PM to 6:00 AM. Please be considerate of fellow residents.', category: 'Conduct', status: 'Active' },
  { id: 2, title: 'Guest & Visitor Policy', description: 'Guests are permitted only in common areas during visiting hours (4:00 PM - 8:00 PM). Overnight guests are not allowed without prior permission.', category: 'Guests', status: 'Active' },
  { id: 3, title: 'Cleanliness and Hygiene', description: 'Residents are responsible for keeping their rooms and common areas clean. A weekly cleaning schedule will be posted.', category: 'Maintenance', status: 'Active' },
  { id: 4, title: 'Safety and Security', description: 'Use of unauthorized electrical appliances is strictly forbidden. Always lock your room when leaving.', category: 'Safety', status: 'Active' },
  { id: 5, title: 'Common Area Usage', description: 'The common room TV and games must be switched off by 11:00 PM. Please clean up after use.', category: 'Conduct', status: 'Active' },
  { id: 6, title: 'Waste Disposal', description: 'All waste must be segregated into dry and wet categories and disposed of in the designated bins on each floor.', category: 'Maintenance', status: 'Archived' },
];

const RulesAndPolicies: React.FC = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState<Rule[]>(initialRulesData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const handleCreatePolicyClick = () => navigate('/hostel/create-policies');

  const handleEditClick = (rule: Rule) => {
    setEditingRule({ ...rule });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
      setRules(rules.filter(rule => rule.id !== id));
      // In a real app, you would also make an API call here.
    }
  };

  const handleUpdatePolicy = () => {
    if (!editingRule) return;
    
    // Simulate API Call for update
    console.log("Updating policy:", editingRule);
    setRules(rules.map(rule => (rule.id === editingRule.id ? editingRule : rule)));
    
    alert('Policy updated successfully!'); // Replace with a toast notification in production
    setIsEditModalOpen(false);
    setEditingRule(null);
  };

  const handleModalFieldChange = (field: keyof Omit<Rule, 'id'>, value: string) => {
    if (editingRule) {
      setEditingRule({ ...editingRule, [field]: value });
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Hostel Rules & Policies</h1>
          <button onClick={handleCreatePolicyClick} className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-full sm:w-auto transition-colors">
            <Plus size={20} /> Create New Policy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.length > 0 ? (
            rules.map((rule) => (
              <div key={rule.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{rule.title}</h2>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rule.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{rule.category}</p>
                  <p className="text-gray-600 dark:text-gray-300">{rule.description}</p>
                </div>
                <div className="flex-shrink-0 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2">
                  <button onClick={() => handleEditClick(rule)} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Edit policy"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(rule.id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors" aria-label="Delete policy"><Trash2 size={18} /></button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Policies Found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new rule or policy.</p>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && editingRule && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Policy</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400"><X size={24} /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input id="edit-title" type="text" value={editingRule.title} onChange={(e) => handleModalFieldChange('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="edit-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea id="edit-desc" rows={5} value={editingRule.description} onChange={(e) => handleModalFieldChange('description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select id="edit-category" value={editingRule.category} onChange={(e) => handleModalFieldChange('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Conduct</option><option>Safety</option><option>Maintenance</option><option>Guests</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select id="edit-status" value={editingRule.status} onChange={(e) => handleModalFieldChange('status', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Active</option><option>Archived</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                <button onClick={handleUpdatePolicy} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RulesAndPolicies;