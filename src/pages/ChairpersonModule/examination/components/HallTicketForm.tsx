import React, { useState } from 'react';

interface HallTicketFormProps {
  onClose: () => void;
}

const HallTicketForm: React.FC<HallTicketFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    examSession: '',
    course: '',
    semester: '',
    subjects: [],
    eligibilityCriteria: 'attendance',
    minAttendance: '75',
    includePhoto: true,
    includeInstructions: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating hall tickets:', formData);
    onClose();
  };

  const availableSubjects = [
    'Computer Networks',
    'Database Management',
    'Operating Systems',
    'Software Engineering',
    'Web Technologies'
  ];

  const handleSubjectChange = (subject: string, isChecked: boolean) => {
    if (isChecked) {
      setFormData({...formData, subjects: [...formData.subjects, subject]});
    } else {
      setFormData({...formData, subjects: formData.subjects.filter(s => s !== subject)});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exam Session</label>
          <input
            type="text"
            value={formData.examSession}
            onChange={(e) => setFormData({...formData, examSession: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., December 2024"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
          <select
            value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Course</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="B.Tech ME">B.Tech ME</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
          <select
            value={formData.semester}
            onChange={(e) => setFormData({...formData, semester: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map(sem => (
              <option key={sem} value={sem.toString()}>{sem}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Attendance (%)</label>
          <input
            type="number"
            value={formData.minAttendance}
            onChange={(e) => setFormData({...formData, minAttendance: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="100"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Subjects</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {availableSubjects.map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={(e) => handleSubjectChange(subject, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{subject}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.includePhoto}
            onChange={(e) => setFormData({...formData, includePhoto: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Include Student Photo</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.includeInstructions}
            onChange={(e) => setFormData({...formData, includeInstructions: e.target.checked})}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Include Exam Instructions</span>
        </label>
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
          Generate Hall Tickets
        </button>
      </div>
    </form>
  );
};

export default HallTicketForm;