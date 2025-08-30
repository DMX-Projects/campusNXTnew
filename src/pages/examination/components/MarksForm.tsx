import React, { useState } from 'react';

interface MarksFormProps {
  onClose: () => void;
}

const MarksForm: React.FC<MarksFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    examId: '',
    studentId: '',
    rollNo: '',
    subject: '',
    internalMarks: '',
    externalMarks: '',
    practicalMarks: '',
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving marks:', formData);
    onClose();
  };

  const totalMarks = (parseInt(formData.internalMarks) || 0) + 
                    (parseInt(formData.externalMarks) || 0) + 
                    (parseInt(formData.practicalMarks) || 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
          <select
            value={formData.examId}
            onChange={(e) => setFormData({...formData, examId: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Exam</option>
            <option value="EX001">Computer Networks - Mid Sem</option>
            <option value="EX002">Database Management - Final</option>
          </select>
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
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
          <input
            type="text"
            value={formData.rollNo}
            onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Internal Marks (20)</label>
          <input
            type="number"
            value={formData.internalMarks}
            onChange={(e) => setFormData({...formData, internalMarks: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="20"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">External Marks (80)</label>
          <input
            type="number"
            value={formData.externalMarks}
            onChange={(e) => setFormData({...formData, externalMarks: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="80"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Practical Marks (Optional)</label>
          <input
            type="number"
            value={formData.practicalMarks}
            onChange={(e) => setFormData({...formData, practicalMarks: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="50"
          />
        </div>
      </div>
      
      {totalMarks > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900">
            Total Marks: {totalMarks} / 100
          </p>
          <p className="text-xs text-blue-700">
            Grade: {totalMarks >= 90 ? 'A' : totalMarks >= 80 ? 'B' : totalMarks >= 70 ? 'C' : totalMarks >= 60 ? 'D' : 'F'}
          </p>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
        <textarea
          value={formData.remarks}
          onChange={(e) => setFormData({...formData, remarks: e.target.value})}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add any additional remarks..."
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
          Save Marks
        </button>
      </div>
    </form>
  );
};

export default MarksForm;