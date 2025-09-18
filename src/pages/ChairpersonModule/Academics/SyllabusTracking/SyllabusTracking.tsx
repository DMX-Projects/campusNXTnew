 // SyllabusTracker.tsx - Optimized Version
import React, { useState } from 'react';
import { Plus, Eye, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  faculty: string;
  totalHours: number;
  completedHours: number;
}

interface ProgressEntry {
  id: string;
  subjectId: string;
  date: string;
  topics: string;
  hours: number;
  attendance: string;
  method: string;
  remarks: string;
}

// Simplified Progress Modal
const ProgressModal: React.FC<{
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}> = ({ subject, isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    topics: '',
    hours: 1,
    studentsPresent: 50,
    totalStudents: 60,
    method: 'lecture',
    remarks: ''
  });

  if (!isOpen || !subject) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      subjectId: subject.id,
      attendance: `${form.studentsPresent}/${form.totalStudents}`,
      id: Date.now().toString()
    });
    setForm({
      date: new Date().toISOString().split('T')[0],
      topics: '',
      hours: 1,
      studentsPresent: 50,
      totalStudents: 60,
      method: 'lecture',
      remarks: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold">Update Progress - {subject.name}</h2>
        
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="text"
          placeholder="Topics covered (comma separated)"
          value={form.topics}
          onChange={(e) => setForm(prev => ({ ...prev, topics: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
        
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Hours"
            min="0.5"
            step="0.5"
            value={form.hours}
            onChange={(e) => setForm(prev => ({ ...prev, hours: parseFloat(e.target.value) }))}
            className="p-2 border rounded"
            required
          />
          <select
            value={form.method}
            onChange={(e) => setForm(prev => ({ ...prev, method: e.target.value }))}
            className="p-2 border rounded"
          >
            <option value="lecture">Lecture</option>
            <option value="practical">Practical</option>
            <option value="tutorial">Tutorial</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Students Present"
            value={form.studentsPresent}
            onChange={(e) => setForm(prev => ({ ...prev, studentsPresent: parseInt(e.target.value) }))}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Total Students"
            value={form.totalStudents}
            onChange={(e) => setForm(prev => ({ ...prev, totalStudents: parseInt(e.target.value) }))}
            className="p-2 border rounded"
            required
          />
        </div>
        
        <textarea
          placeholder="Remarks (optional)"
          value={form.remarks}
          onChange={(e) => setForm(prev => ({ ...prev, remarks: e.target.value }))}
          className="w-full p-2 border rounded"
          rows={2}
        />
        
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Progress
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Dashboard Component
const SyllabusTracker: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures',
      code: 'CS301',
      faculty: 'Dr. Smith',
      totalHours: 60,
      completedHours: 35
    },
    {
      id: '2',
      name: 'Thermodynamics',
      code: 'ME201',
      faculty: 'Prof. Johnson',
      totalHours: 45,
      completedHours: 20
    },
    {
      id: '3',
      name: 'Circuit Analysis',
      code: 'EE101',
      faculty: 'Dr. Brown',
      totalHours: 50,
      completedHours: 45
    }
  ]);

  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([
    {
      id: '1',
      subjectId: '1',
      date: '2025-09-01',
      topics: 'Arrays, Linked Lists',
      hours: 2,
      attendance: '58/60',
      method: 'lecture',
      remarks: 'Good participation'
    }
  ]);

  // Working button handler
  const handleUpdateProgress = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  // Working submit handler
  const handleSubmitProgress = (progressData: any) => {
    // Add new progress entry
    setProgressEntries(prev => [...prev, progressData]);
    
    // Update subject completed hours
    setSubjects(prev => prev.map(subject => 
      subject.id === progressData.subjectId 
        ? { ...subject, completedHours: subject.completedHours + progressData.hours }
        : subject
    ));
    
    console.log('Progress saved:', progressData);
    alert('Progress updated successfully!');
  };

  const getProgressPercentage = (subject: Subject) => {
    return Math.min((subject.completedHours / subject.totalHours) * 100, 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Syllabus Tracker</h1>
            <p className="text-gray-600">Track academic progress efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Total Subjects</h3>
              <div className="text-2xl font-bold text-gray-900">{subjects.length}</div>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Progress Entries</h3>
              <div className="text-2xl font-bold text-gray-900">{progressEntries.length}</div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500 uppercase">Avg Progress</h3>
              <div className="text-2xl font-bold text-gray-900">
                {(subjects.reduce((sum, s) => sum + getProgressPercentage(s), 0) / subjects.length).toFixed(0)}%
              </div>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {subjects.map(subject => {
          const progress = getProgressPercentage(subject);
          return (
            <div key={subject.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-blue-600">{subject.code}</p>
                  <p className="text-sm text-gray-600">{subject.faculty}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{progress.toFixed(0)}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{subject.completedHours}h / {subject.totalHours}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress >= 75 ? 'bg-green-500' :
                      progress >= 50 ? 'bg-blue-500' :
                      progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleUpdateProgress(subject)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Update Progress
              </button>
            </div>
          );
        })}
      </div>

      {/* Recent Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Progress Updates</h2>
        <div className="space-y-4">
          {progressEntries.slice(-5).reverse().map(entry => {
            const subject = subjects.find(s => s.id === entry.subjectId);
            return (
              <div key={entry.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{subject?.name}</div>
                  <div className="text-sm text-gray-600">
                    {entry.topics} • {entry.hours}h • {entry.attendance} attendance
                  </div>
                  <div className="text-xs text-gray-500">{entry.date}</div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                  {entry.method}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Modal */}
      <ProgressModal
        subject={selectedSubject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubject(null);
        }}
        onSubmit={handleSubmitProgress}
      />
    </div>
  );
};

export default SyllabusTracker;
