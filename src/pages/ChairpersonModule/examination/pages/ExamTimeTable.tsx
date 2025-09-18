import React, { useState } from 'react';
import { Plus, Search, Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import TimeTableForm from '../components/TimeTableForm';

interface ExamSchedule {
  id: string;
  date: string;
  time: string;
  subject: string;
  course: string;
  semester: string;
  room: string;
  invigilator: string;
  totalStudents: number;
}

const ExamTimeTable: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([
    {
      id: 'EX001',
      date: '2024-12-15',
      time: '09:00 AM - 12:00 PM',
      subject: 'Computer Networks',
      course: 'B.Tech',
      semester: 'VI',
      room: 'Room 101',
      invigilator: 'Dr. Smith',
      totalStudents: 45,
    },
    {
      id: 'EX002',
      date: '2024-12-16',
      time: '02:00 PM - 05:00 PM',
      subject: 'Database Management',
      course: 'B.Tech',
      semester: 'VI',
      room: 'Room 102',
      invigilator: 'Prof. Johnson',
      totalStudents: 42,
    },
    {
      id: 'EX003',
      date: '2024-12-17',
      time: '09:00 AM - 12:00 PM',
      subject: 'Operating Systems',
      course: 'B.Tech',
      semester: 'V',
      room: 'Room 103',
      invigilator: 'Dr. Williams',
      totalStudents: 48,
    },
  ]);

  const [selectedSchedule, setSelectedSchedule] = useState<ExamSchedule | null>(null);

  // -----------------------------
  // Handlers
  // -----------------------------
  const openAddModal = () => {
    setSelectedSchedule(null);
    setShowAddModal(true);
  };

  const handleEdit = (id: string) => {
    const schedule = examSchedules.find((s) => s.id === id);
    if (!schedule) return;
    setSelectedSchedule(schedule);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setExamSchedules((prev) => prev.filter((s) => s.id !== id));
      if (selectedSchedule?.id === id) setSelectedSchedule(null);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedSchedule(null);
  };

  // -----------------------------
  // Filtering
  // -----------------------------
  const filteredSchedules = examSchedules.filter((exam) => {
    const term = searchTerm.toLowerCase();
    return (
      exam.subject.toLowerCase().includes(term) ||
      exam.course.toLowerCase().includes(term) ||
      exam.room.toLowerCase().includes(term)
    );
  });

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
      
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Schedule</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by subject, course, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current">Current Week</option>
              <option value="next">Next Week</option>
              <option value="upcoming">All Upcoming</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="p-6">
          <div className="grid gap-4">
            {filteredSchedules.length ? (
              filteredSchedules.map((exam) => (
                <div
                  key={exam.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <h2 className="text-lg font-semibold text-gray-900">{exam.subject}</h2>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {exam.course} - Sem {exam.semester}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-4 h-4" />
                        {exam.date}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Clock className="w-4 h-4" />
                        {exam.time}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <MapPin className="w-4 h-4" />
                        {exam.room}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Users className="w-4 h-4" />
                        {exam.totalStudents} students
                      </div>
                    </div>
                    <div className="mt-2 text-gray-700 text-sm">
                      <span className="font-medium">Invigilator:</span> {exam.invigilator}
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleEdit(exam.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      type="button"
                      aria-label={`Edit schedule for ${exam.subject}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                      type="button"
                      aria-label={`Delete schedule for ${exam.subject}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No schedules found.</p>
            )}
          </div>
        </div>
      </div>

      {/* FULL SCREEN MODAL OVERLAY - COVERS EVERYTHING */}
      {(showAddModal || showEditModal) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center p-4 z-[99999] m-0" 
             style={{ margin: 0, padding: '16px', position: 'fixed', inset: '0px' }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedSchedule ? 'Edit Exam Schedule' : 'Add Exam Schedule'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <TimeTableForm 
                examData={selectedSchedule} 
                onClose={closeModal}
                onSubmit={(data) => {
                  if (selectedSchedule) {
                    // Update existing schedule
                    setExamSchedules(prev => 
                      prev.map(schedule => 
                        schedule.id === selectedSchedule.id 
                          ? { ...schedule, ...data }
                          : schedule
                      )
                    );
                  } else {
                    // Add new schedule
                    const newSchedule: ExamSchedule = {
                      id: `EX${String(examSchedules.length + 1).padStart(3, '0')}`,
                      ...data
                    };
                    setExamSchedules(prev => [...prev, newSchedule]);
                  }
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTimeTable;
