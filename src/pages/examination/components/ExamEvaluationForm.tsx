import React, { useState } from 'react';

interface ExamEvaluationFormProps {
  evaluation?: any;
  onClose: () => void;
}

const ExamEvaluationForm: React.FC<ExamEvaluationFormProps> = ({ evaluation, onClose }) => {
  const [formData, setFormData] = useState({
    subject: evaluation?.subject || '',
    examType: evaluation?.examType || '',
    date: evaluation?.date || '',
    totalQuestions: evaluation?.totalQuestions || '',
    duration: evaluation?.duration || '',
    maxMarks: evaluation?.maxMarks || '',
    instructions: evaluation?.instructions || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving evaluation:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
          <select
            value={formData.examType}
            onChange={(e) => setFormData({...formData, examType: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="mid">Mid Semester</option>
            <option value="final">Final Exam</option>
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
          <input
            type="number"
            value={formData.totalQuestions}
            onChange={(e) => setFormData({...formData, totalQuestions: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Marks</label>
          <input
            type="number"
            value={formData.maxMarks}
            onChange={(e) => setFormData({...formData, maxMarks: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Exam Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) => setFormData({...formData, instructions: e.target.value})}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter exam instructions..."
        />
      </div>
      
      <div className="flex justify-end space-x-3">
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
          {evaluation ? 'Update' : 'Create'} Evaluation
        </button>
      </div>
    </form>
  );
};

export default ExamEvaluationForm;