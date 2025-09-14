// src/components/hostel/CreatePolicies.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePolicies: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Conduct' | 'Safety' | 'Maintenance' | 'Guests'>('Conduct');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !description.trim() || !effectiveDate) {
      setError('Please fill out all required fields.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const newPolicy = { title, description, category, effectiveDate, status: 'Active' };
    console.log('Submitting new policy to the server:', newPolicy);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Policy created successfully!');
      // In a real app, you would add the new policy to your global state or refetch the list
      navigate('/hostel/rules');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-indigo-600 dark:text-indigo-400 hover:underline mb-4 inline-flex items-center">
          &larr; Back to Rules & Policies
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create a New Rule or Policy</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          New Policy Details
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500 rounded-lg text-sm">{error}</div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Policy Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g., Mandatory Study Hours" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Conduct</option><option>Safety</option><option>Maintenance</option><option>Guests</option>
              </select>
            </div>
            <div>
              <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Effective Date</label>
              <input type="date" id="effectiveDate" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Description</label>
            <textarea id="description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Provide a complete description of the rule, including any consequences for violations." required />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
            {isSubmitting ? 'Creating...' : 'Create Policy'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePolicies;
