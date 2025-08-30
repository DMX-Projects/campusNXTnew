import React, { useState } from 'react';

interface SeatingPlanFormProps {
  onClose: () => void;
}

const SeatingPlanForm: React.FC<SeatingPlanFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    examId: '',
    room: '',
    course: '',
    semester: '',
    totalStudents: '',
    seatingPattern: 'alternate',
    startingSeat: 'A1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating seating plan:', formData);
    onClose();
  };

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
          <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
          <select
            value={formData.room}
            onChange={(e) => setFormData({...formData, room: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Room</option>
            <option value="Room 101">Room 101 (60 seats)</option>
            <option value="Room 102">Room 102 (45 seats)</option>
            <option value="Room 103">Room 103 (80 seats)</option>
          </select>
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seating Pattern</label>
          <select
            value={formData.seatingPattern}
            onChange={(e) => setFormData({...formData, seatingPattern: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="alternate">Alternate Seating</option>
            <option value="sequential">Sequential</option>
            <option value="random">Random</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Starting Seat</label>
          <input
            type="text"
            value={formData.startingSeat}
            onChange={(e) => setFormData({...formData, startingSeat: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A1"
            required
          />
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
          Generate Plan
        </button>
      </div>
    </form>
  );
};

export default SeatingPlanForm;