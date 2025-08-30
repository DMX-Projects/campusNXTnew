import React, { useState, useEffect } from 'react';

interface Grade {
  id?: number;
  studentId: string;
  studentName: string;
  course: string;
  assessment: string;
  assessmentType: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks: string;
  dateRecorded: string;
}

interface GradeFormProps {
  grade?: Grade | null;
  onSave: (grade: Grade) => void;
  onCancel: () => void;
}

const GradeForm: React.FC<GradeFormProps> = ({ grade, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Grade>({
    studentId: '',
    studentName: '',
    course: '',
    assessment: '',
    assessmentType: '',
    marksObtained: 0,
    maxMarks: 100,
    grade: '',
    remarks: '',
    dateRecorded: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (grade) {
      setFormData(grade);
    }
  }, [grade]);

  const calculateGrade = (obtained: number, max: number) => {
    const percentage = (obtained / max) * 100;
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'B+';
    if (percentage >= 80) return 'B';
    if (percentage >= 75) return 'C+';
    if (percentage >= 70) return 'C';
    if (percentage >= 65) return 'D+';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  useEffect(() => {
    if (formData.marksObtained && formData.maxMarks) {
      const calculatedGrade = calculateGrade(formData.marksObtained, formData.maxMarks);
      setFormData(prev => ({ ...prev, grade: calculatedGrade }));
    }
  }, [formData.marksObtained, formData.maxMarks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const courses = ['CS-301 Data Structures', 'MATH-201 Calculus', 'PHY-101 Physics', 'CHEM-101 Chemistry'];
  const assessmentTypes = ['Midterm', 'Final', 'Quiz', 'Assignment', 'Project', 'Lab'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
          <input
            type="text"
            required
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
          <input
            type="text"
            required
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student name"
          />
        </div>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
          <select
            required
            value={formData.assessmentType}
            onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            {assessmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Name</label>
        <input
          type="text"
          required
          value={formData.assessment}
          onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Midterm Exam, Assignment 1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Marks Obtained</label>
          <input
            type="number"
            required
            min="0"
            value={formData.marksObtained}
            onChange={(e) => setFormData({ ...formData, marksObtained: parseInt(e.target.value) || 0 })}
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
            onChange={(e) => setFormData({ ...formData, maxMarks: parseInt(e.target.value) || 100 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
          <input
            type="text"
            value={formData.grade}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
        <textarea
          rows={3}
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Additional remarks or feedback..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Recorded</label>
        <input
          type="date"
          required
          value={formData.dateRecorded}
          onChange={(e) => setFormData({ ...formData, dateRecorded: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          {grade ? 'Update Grade' : 'Record Grade'}
        </button>
      </div>
    </form>
  );
};

export default GradeForm;