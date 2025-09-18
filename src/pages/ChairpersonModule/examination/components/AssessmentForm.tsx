import React, { useState } from 'react';

interface AssessmentFormProps {
  onClose: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    scheduledDate: '',
    scheduledTime: '',
    instructions: '',
    allowRetake: false,
    shuffleQuestions: true,
    showResults: 'immediate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating assessment:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Computer Networks Quiz 1"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Subject</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Database Management">Database Management</option>
            <option value="Operating Systems">Operating Systems</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="Quiz">Quiz</option>
            <option value="Assessment">Assessment</option>
            <option value="Mock Test">Mock Test</option>
            <option value="Practice Test">Practice Test</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
          <input
            type="number"
            value={formData.totalMarks}
            onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
          <input
            type="time"
            value={formData.scheduledTime}
            onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) => setFormData({...formData, instructions: e.target.value})}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter instructions for students..."
        />
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Assessment Settings</h4>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.allowRetake}
            onChange={(e) => setFormData({...formData, allowRetake: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Allow Retake</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.shuffleQuestions}
            onChange={(e) => setFormData({...formData, shuffleQuestions: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Shuffle Questions</span>
        </label>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Show Results</label>
          <select
            value={formData.showResults}
            onChange={(e) => setFormData({...formData, showResults: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="immediate">Immediately</option>
            <option value="after-deadline">After Deadline</option>
            <option value="manual">Manual Release</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Assessment
        </button>
      </div>
    </form>
  );
};

export default AssessmentForm;