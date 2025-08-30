import React, { useState, useEffect } from 'react';

interface Assignment {
  id?: number;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  dueTime: string;
  maxMarks: number;
  instructions: string;
  type: string;
  status: 'Draft' | 'Active' | 'Graded' | 'Closed';
  allowLateSubmission: boolean;
  attachmentRequired: boolean;
}

interface AssignmentFormProps {
  assignment?: Assignment | null;
  onSave: (assignment: Assignment) => void;
  onCancel: () => void;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ assignment, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Assignment>({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    dueTime: '',
    maxMarks: 100,
    instructions: '',
    type: '',
    status: 'Draft',
    allowLateSubmission: false,
    attachmentRequired: false
  });

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const courses = ['CS-301 Data Structures', 'MATH-201 Calculus', 'PHY-101 Physics', 'CHEM-101 Chemistry'];
  const assignmentTypes = ['Individual', 'Group', 'Quiz', 'Project', 'Lab', 'Research'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter assignment title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Assignment description and objectives..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
          <select
            required
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type</label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {assignmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
          <input
            type="time"
            required
            value={formData.dueTime}
            onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Marks</label>
          <input
            type="number"
            required
            min="1"
            value={formData.maxMarks}
            onChange={(e) => setFormData({ ...formData, maxMarks: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
        <textarea
          rows={4}
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Detailed instructions for students..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="allowLateSubmission"
            checked={formData.allowLateSubmission}
            onChange={(e) => setFormData({ ...formData, allowLateSubmission: e.target.checked })}
            className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="allowLateSubmission" className="text-sm text-gray-700">
            Allow Late Submission
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="attachmentRequired"
            checked={formData.attachmentRequired}
            onChange={(e) => setFormData({ ...formData, attachmentRequired: e.target.checked })}
            className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="attachmentRequired" className="text-sm text-gray-700">
            Attachment Required
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Graded">Graded</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {assignment ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;